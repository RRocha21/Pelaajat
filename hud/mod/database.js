const Datastore = require('nedb');
let database = {};
database.players = new Datastore({ filename: './databases/players' });
database.teams = new Datastore({ filename: './databases/teams' });
database.huds = new Datastore({ filename: './databases/huds' });
database.bottom_sponsors = new Datastore({ filename: './databases/bottom_sponsors' });
module.exports = database;