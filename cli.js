#! /usr/bin/env node
const tvco = require('.');
const chalk = require('chalk');

var list = require('minimist')(process.argv.slice(2))._;

tvco(...list)
.then((data)  => {
  data.matches.forEach((match) => {
    console.log((`${chalk.blue(match.actor.name)}:`));
    match.roles.forEach((role) => {
      console.log((`  Plays ${chalk.green(role.name)} in ${chalk.yellow(role.show)}`));
    });
  });
})
.catch((error) => {
  console.log(error);
});
