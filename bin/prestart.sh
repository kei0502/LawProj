#!/bin/sh
browserify -t babelify --standalone main views/index/main.js -o public/js/index/main.js
browserify -t babelify --standalone main views/company/management/main.js -o public/js/company/management/main.js
browserify -t babelify --standalone main views/company/apply/main.js -o public/js/company/apply/main.js
browserify -t babelify --standalone main views/claim/edit/main.js -o public/js/claim/edit/main.js
browserify -t babelify --standalone main views/claim/list/main.js -o public/js/claim/list/main.js