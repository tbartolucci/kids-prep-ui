
variable "ng_ui_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "123972417721.dkr.ecr.us-east-1.amazonaws.com/ng-ui:v3"
}

variable "ng_ui_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 80
}

resource "aws_iam_role" "ngui_task_execution_role" {
  name = "ngui-task-execution-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    },
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ngui-task-execution-attach" {
  role       = "${aws_iam_role.ngui_task_execution_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ngui_log_policy_attach" {
  role = "${aws_iam_role.ngui_task_execution_role.name}"
  policy_arn = "${aws_iam_policy.ecs_cloudwatch_logs.arn}"
}

resource "aws_alb_target_group" "ngui" {
  name        = "tf-ecs-ng-ui"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = "${aws_vpc.main.id}"
  target_type = "ip"

  health_check {
    port = 80
    protocol = "HTTP"
    path = "/health.html"
  }
}

resource "aws_ecs_task_definition" "ngui" {
  family                   = "ng-ui"
  network_mode             = "awsvpc"
  execution_role_arn = "${aws_iam_role.ngui_task_execution_role.arn}"
  container_definitions = <<DEFINITION
[
  {
    "cpu": ${var.fargate_cpu},
    "image": "${var.ng_ui_image}",
    "memory": ${var.fargate_memory},
    "name": "ng-ui",
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": ${var.ng_ui_port},
        "hostPort": ${var.ng_ui_port}
      }
    ]
  }
]
DEFINITION
}

resource "aws_ecs_service" "ng_ui" {
  name            = "tf-ecs-ng-ui"
  cluster         = "${aws_ecs_cluster.main.id}"
  task_definition = "${aws_ecs_task_definition.ngui.arn}"
  desired_count   = "${var.container_count}"
  launch_type     = "EC2"

  network_configuration {
    security_groups = ["${aws_security_group.ecs_tasks.id}"]
    subnets         = ["${aws_subnet.private.*.id}"]
  }

  load_balancer {
    target_group_arn = "${aws_alb_target_group.ngui.id}"
    container_name   = "ng-ui"
    container_port   = "${var.ng_ui_port}"
  }

  depends_on = [
    "aws_alb_listener.ssl_front_end",
  ]
}