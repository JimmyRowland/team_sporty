const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
    // this is to add Creative Tim licenses in the production mode for the minified js
    gulp.src("build/static/js/*chunk.js", { base: "./", allowEmpty: true })
        .pipe(
            gap.prependText(`/*!

=========================================================
* team-sporty
=========================================================

* Copyright 2020 team-sporty

* Coded by team-sporty

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`),
        )
        .pipe(gulp.dest("./", { overwrite: true }));

    gulp.src("build/index.html", { base: "./", allowEmpty: true })
        .pipe(
            gap.prependText(`<!--

=========================================================
* team-sporty- v1.0.0
=========================================================

* Copyright 2020 team-sporty

* Coded by team-sporty

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`),
        )
        .pipe(gulp.dest("./", { overwrite: true }));

    gulp.src("build/static/css/*chunk.css", { base: "./" })
        .pipe(
            gap.prependText(`/*!

=========================================================
* team-sporty - v1.0.0
=========================================================

* Copyright 2020 team-sporty

* Coded by team-sporty

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`),
        )
        .pipe(gulp.dest("./", { overwrite: true }));
    return;
});
