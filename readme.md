# TV Cross Over
> Find actors in two TV Shows

A Node module that finds actors that play in a set of TV shows.
Works as Node module and CLI command.


### Installing
```
$ npm install --global tvco
```


## Usage
As command-line app, it takes two arguments

```
$ tvco 'game of thrones' 'the wire'
Aidan Gillen:
  Plays Petyr Baelish in Game of Thrones
  Plays Councilman Thomas "Tommy" Carcetti in The Wire
```

As Node module, a promise is returned with an object containing more details about the TV shows and a list of matched actors and their roles.
```js
const tvco = require('tvco');

tvco('game of thrones', 'the wire')
.then((data)  => {
  data.matches.forEach((match) => {
    console.log((`${match.actor.name}:`));
    match.roles.forEach((role) => {
      console.log((`  Plays ${role.name} in ${role.show}`));
    });
  });
})
```
## Tasks
  * [ ] Enhance the match finding method greatly
  * [ ] Searching with IMDB id

## Authors

* **Fabio Pigagnelli** - *Initial work*

## License

This project is licensed under the MIT License

## Acknowledgments

* The public API from [TVmaze.com](http://www.tvmaze.com) is used to query data
