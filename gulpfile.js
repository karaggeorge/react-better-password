import gulp from 'gulp';
import initGulpTasks from 'react-component-gulp-tasks';

/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

const taskConfig = {

  component: {
    name: 'ReactBetterPassword',
    dependencies: [
      'classnames',
      'react',
      'react-dom'
    ],
    lib: 'lib'
  },

  example: {
    src: 'example/src',
    dist: 'example/dist',
    files: [
      'index.html',
      '.gitignore'
    ],
    scripts: [
      'example.js'
    ],
    less: [
      'example.less'
    ]
  }

};

initGulpTasks(gulp, taskConfig);