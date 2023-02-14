const db = require('./database.js').sponsors;
const fs = require('fs');

db.loadDatabase();

exports.addSponsor = (req, res) => {
    let user = req.body;
    delete user.id;

    if (req.file) user.avatar = req.file.filename;
    
    db.insert(user, (err, newSponsor) => {
        if (err) return res.sendStatus(500);
        return res.status(200).json({
            id:newSponsor["_id"]
        });
    });
    // return user.sid;
};