const Datastore = require('nedb');
let database = {};
database.players = new Datastore({ filename: './databases/players' });
database.teams = new Datastore({ filename: './databases/teams' });
database.huds = new Datastore({ filename: './databases/huds' });
database.sponsors = new Datastore({ filename: './databases/sponsors' });
module.exports = database;