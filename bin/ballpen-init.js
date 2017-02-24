#!/usr/bin/env node

var download = require('download-git-repo');
var program = require('commander');
var exists = require('fs').existsSync;
var path = require('path');
var ora = require('ora');
var home = require('user-home');
var tildify = require('tildify');
var chalk = require('chalk');
var inquirer = require('inquirer');
var generate = require('../lib/generate');
var checkVersion = require('../lib/check-version');
var logger = require('../lib/logger');


program
  .usage('[path/project-folder-name]');


program.on('--help', function () {
  console.log('  Examples:');
  console.log();
  console.log(chalk.gray('    # create a new project straight from an official github template'));
  console.log('    $ ballpen init [path/project-folder-name]');
  console.log();
});


function help () {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();


var rawName = program.args[0];
// Current folder?
var inPlace = !rawName || rawName === '.';
var name = inPlace ? path.relative('../', process.cwd()) : rawName; 
var to = path.resolve(rawName || '.');
var tmp = path.join(home, '.ballpen-templates');

/**
 * Padding.
 */

console.log();
process.on('exit', function () {
  console.log();
});

if (exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }], function (answers) {
    if (answers.ok) {
      run();
    }
  })
} else {
  run();
}

/**
 * Check, download and generate the project.
 */

function run () {
  // check if template is local
  checkVersion(function () {
  	var template = 'Ballpenjs/ballpen-webpack-template';
  	var spinner = ora('downloading template ...');
    spinner.start();

    download(template, tmp, { clone: false }, function (err) {
      spinner.stop();
      if (err) logger.fatal('Failed to download template repo ' + template + ': ' + err.message.trim());
      // Generate template project
      generate(name, tmp, to, function (err) {
        if (err) logger.fatal(err);
        console.log();
        logger.success('Generated "%s".', name);
      });
    });
  });
}
