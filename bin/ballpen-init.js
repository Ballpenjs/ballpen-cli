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

program
  .usage('[project-name]')


program.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project straight from an official github template'))
  console.log('    $ ballpen init [project-name]')
  console.log()
})


function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}
help()

