var gulp = require('gulp');
var fs = require('fs');

var awsProfiler = require('aws-profile-handler');

// AWS credentials file path is optional as the last parameter. Default to ~/.aws/credentials
var creds = awsProfiler.getProfileCredentials('personal');

var awsConfig = {
  accessKeyId: creds.aws_access_key_id,
  secretAccessKey: creds.aws_secret_access_key
};

var s3 = require('gulp-s3-upload')(awsConfig);
var exec = require('child_process').exec;


gulp.task('build', function (cb) {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task("deploy", ['build'], function() {
  gulp.src("./dist/**")
    .pipe(s3({
      Bucket: 'math.tombartolucci.io', //  Required
      ACL:    'public-read'       //  Needs to be user-defined
    }, {
      // S3 Constructor Options, ie:
      maxRetries: 5
    }))
  ;
});


gulp.task('default',['build']);
