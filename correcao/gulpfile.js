const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCSS = require('gulp-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
/* 
  O gulp-purgecss entra no meu html,
  procura as classes que estão sendo utilizadas,
  e retira as que não estão sendo utilizadas para economizar no tamanho final do bundle
*/
const purgecss = require('gulp-purgecss'); 

function scss() {
  return src('frontend/scss/app.scss')
    .pipe(sass())
    .pipe(purgecss({
      content: ['dist/**/*.html'] // uso do purgecss
    }))
    .pipe(minifyCSS())
    .pipe(dest('dist/assets/css'))
}

function js() {
  return src('frontend/js/*.js')
    .pipe(concat('app.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(minify())
    .pipe(dest('dist/assets/js'))
}

/* 
  Exportando somente os watchers eu consigo apenas rodar o comando "gulp" 
  no terminal e ele já escuta os arquivos e faz a preparação de todo meu css e html
*/
exports.default = function() {
  watch('dist/**/*.html', scss);
  watch('frontend/scss/*', scss);
  watch('frontend/js/*', js);
};

/* Exportando somente os watchers eu consigo apenas rodar o comando "gulp" no terminal e ele já escuta os arquivos */

js();
scss();
