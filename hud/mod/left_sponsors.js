const db = require('./database.js').left_sponsors;
const fs = require('fs');

db.loadDatabase();

exports.getLeftSponsors = (req, res) => {
    db.find({}, (err, left_sponsorList) => {
        if (err) return res.sendStatus(500);
        res.setHeader('Content-Type', 'application/json');
        return res.json({left_sponsors: left_sponsorList});
    });
};

exports.addLeftSponsor = (req, res) => {

    let left_sponsor = req.body;
    delete left_sponsor._id;

    if(req.file) left_sponsor.logo = req.file.filename;
    
    db.insert(left_sponsor, (err, left_newSponsor) => {
        if (err) return res.sendStatus(500);
        return res.status(200).json({id:left_newSponsor["_id"]});
    });
};

exports.updateLeftSponsor = (req, res) => {

    let left_sponsor = req.body;
    let left_sponsorId = left_sponsor._id;

    delete left_sponsor._id;

    if(req.file) left_sponsor.logo = req.file.filename;

    function removeLogoFile(err, left_sponsorList){
    
        if(err) return res.sendStatus(500);
        if(!left_sponsorList[0]) return res.sendStatus(200);

        if (left_sponsor.logo == undefined) {
            left_sponsor.logo = left_sponsorList[0].logo;
        } else {
            if(fs.existsSync('./public/left_sponsors/' + left_sponsorList[0].logo)) fs.unlinkSync('./public/left_sponsors/' + left_sponsorList[0].logo);
        }

        db.update({ _id: left_sponsorId }, { $set: { left_sponsor_name: left_sponsor.left_sponsor_name, logo: left_sponsor.logo } }, {}, (err, numReplaced) => {
            if (err) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }

    
    db.find({_id:left_sponsorId}, removeLogoFile);
};
exports.deleteLeftSponsor = (req,res) => {
    
    let left_sponsorId = req.body.left_sponsorId;

    function removeSponsor(err, left_sponsorList) {
        if(err) return res.sendStatus(500);
        if(!left_sponsorList[0]) return res.sendStatus(200);

        if(fs.existsSync('./public/left_sponsors/' + left_sponsorList[0].logo)) fs.unlinkSync('./public/left_sponsors/' + left_sponsorList[0].logo);

        db.remove({_id:left_sponsorId}, {}, (err, numRemoved) => {
            if(err || numRemoved != 1) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }

    db.find({_id:left_sponsorId}, removeSponsor);
};
exports.deleteLeftLogo = (req,res) => {
    let left_sponsorId = req.body.sponsorId;

    function removeLogoFile(err, left_sponsorList){
        if(err) return res.sendStatus(500);
        if(!left_sponsorList[0]) return res.sendStatus(200);

        if(fs.existsSync('./public/left_sponsors/' + left_sponsorList[0].logo)) fs.unlinkSync('./public/left_sponsors/' + left_sponsorList[0].logo);

        db.update({ _id: left_sponsorId }, { $set: {logo:null}}, {}, (err, numReplaced) => {
            if(err) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }
    db.find({_id:left_sponsorId}, removeLogoFile);
};

exports.render = (req,res) => {
    return res.render('left_sponsors', {
        ip: address,
        port: hud_port,
        flags: getFlags()
    });
};