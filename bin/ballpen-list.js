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
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('--offline', 'use cached template')


program.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with an official template'))
  console.log('    $ vue init webpack my-project')
  console.log()
  console.log(chalk.gray('    # create a new project straight from a github template'))
  console.log('    $ vue init username/repo my-project')
  console.log()
})


function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}
help()

