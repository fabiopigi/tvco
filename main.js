const axios = require('axios');
const Q = require('q');
const chalk = require('chalk');

module.exports = (...list) => {

  return Q.promise((resolve, reject) => {

    if(list.length > 2) {
      reject(chalk.red("No more than two TV Shows"));
    }

    let shows = [];
    let callbackCounter = list.length;

    (list).forEach((arg, idx) => {

      let show = {}

      if ((/^\d$/).test(arg)) {
        //TODO, request with searchType by TvMaze ID
      } else if ((/'^tt\d{7,}$/).test(arg)) {
        //TODO, request with searchType by IMDB ID
      } else {
        show._searchType = 'byName';
        show._searchQuery = arg;
        show._searchUrl = `http://api.tvmaze.com/singlesearch/shows?q=${encodeURI(arg)}`;
      }

      axios.get(show._searchUrl)
      .then((response) => {
        show.id = response.data.id;
        show.name = response.data.name;
        return axios.get(`http://api.tvmaze.com/shows/${show.id}/cast`)
      })
      .then((response) => {
        show.cast = response.data.map(roleMapper);
        shows[idx] = show;
        checkCallback();
      }).catch((error) => {
        reject(`${chalk.red(error)}`)
      })
    });

    const roleMapper = (data) => {
      let role = {};
      role.actorId = data.person.id;
      role.actorName = data.person.name;
      role.actorUrl = data.person.url;
      role.roleId = data.character.id;
      role.roleName = data.character.name;
      role.roleUrl = data.character.url;
      return role;
    };

    const checkCallback = () => {
      callbackCounter--;

      if(callbackCounter === 0) {
        findMatches();
      }
    }

    const findMatches = () => {
      let matches = [];
      //TODO Needs much better algorithms
      shows[0].cast.forEach((castA,idxA) => {
        shows[1].cast.forEach((castB,idxB) => {
          if (castA.actorId === castB.actorId) {
            let match = {
              actor : {
                id: castA.actorId,
                name: castA.actorName
              },
              roles: [
                {
                  id: castA.roleId,
                  name: castA.roleName,
                  show: shows[0].name
                },
                {
                  id: castB.roleId,
                  name: castB.roleName,
                  show: shows[1].name
                }
              ]
            };
            matches.push(match);
          }
        });
      });

      if(matches.length > 0) {
        resolve({matches: matches, shows: shows});
      } else {
        reject(chalk.yellow("No matches found"));
      }
    }
  });
}
