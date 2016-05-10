#!/bin/sh
browserify -t babelify --standalone main views/index/main.js -o public/js/index/main.js
browserify -t babelify --standalone main views/company/management/main.js -o public/js/company/management/main.js
browserify -t babelify --standalone main views/company/apply/main.js -o public/js/company/apply/main.js