var gulp = require('gulp');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./awsaccess.json'));

var s3 = require('gulp-s3-upload')(config);
var exec = require('child_process').exec;

gulp.task('build', function (cb) {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task("deploy", function() {
  gulp.src("./dist/**")
    .pipe(s3({
      Bucket: 'kids.tombartolucci.io', //  Required
      ACL:    'public-read'       //  Needs to be user-defined
    }, {
      // S3 Constructor Options, ie:
      maxRetries: 5
    }))
  ;
});
