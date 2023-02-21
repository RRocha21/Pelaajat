const db = require('./database.js').right_sponsors;
const fs = require('fs');

db.loadDatabase();

exports.getRightSponsors = (req, res) => {
    db.find({}, (err, right_sponsorList) => {
        if (err) return res.sendStatus(500);
        res.setHeader('Content-Type', 'application/json');
        return res.json({right_sponsors: right_sponsorList});
    });
};

exports.addRightSponsor = (req, res) => {

    let right_sponsor = req.body;
    delete right_sponsor._id;

    if(req.file) right_sponsor.logo = req.file.filename;
    
    db.insert(right_sponsor, (err, right_newSponsor) => {
        if (err) return res.sendStatus(500);
        return res.status(200).json({id:right_newSponsor["_id"]});
    });
};

exports.updateRightSponsor = (req, res) => {

    let right_sponsor = req.body;
    let right_sponsorId = right_sponsor._id;

    delete right_sponsor._id;

    if(req.file) right_sponsor.logo = req.file.filename;

    function removeLogoFile(err, right_sponsorList){
    
        if(err) return res.sendStatus(500);
        if(!right_sponsorList[0]) return res.sendStatus(200);

        if (right_sponsor.logo == undefined) {
            right_sponsor.logo = right_sponsorList[0].logo;
        } else {
            if(fs.existsSync('./public/right_sponsors/' + right_sponsorList[0].logo)) fs.unlinkSync('./public/right_sponsors/' + right_sponsorList[0].logo);
        }

        db.update({ _id: right_sponsorId }, { $set: { right_sponsor_name: right_sponsor.right_sponsor_name, logo: right_sponsor.logo } }, {}, (err, numReplaced) => {
            if (err) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }

    
    db.find({_id:right_sponsorId}, removeLogoFile);
};
exports.deleteRightSponsor = (req,res) => {
    
    let right_sponsorId = req.body.right_sponsorId;

    function removeSponsor(err, right_sponsorList) {
        if(err) return res.sendStatus(500);
        if(!right_sponsorList[0]) return res.sendStatus(200);

        if(fs.existsSync('./public/right_sponsors/' + right_sponsorList[0].logo)) fs.unlinkSync('./public/right_sponsors/' + right_sponsorList[0].logo);

        db.remove({_id:right_sponsorId}, {}, (err, numRemoved) => {
            if(err || numRemoved != 1) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }

    db.find({_id:right_sponsorId}, removeSponsor);
};
exports.deleteRightLogo = (req,res) => {
    let right_sponsorId = req.body.sponsorId;

    function removeLogoFile(err, right_sponsorList){
        if(err) return res.sendStatus(500);
        if(!right_sponsorList[0]) return res.sendStatus(200);

        if(fs.existsSync('./public/right_sponsors/' + right_sponsorList[0].logo)) fs.unlinkSync('./public/right_sponsors/' + right_sponsorList[0].logo);

        db.update({ _id: right_sponsorId }, { $set: {logo:null}}, {}, (err, numReplaced) => {
            if(err) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }
    db.find({_id:right_sponsorId}, removeLogoFile);
};

exports.render = (req,res) => {
    return res.render('right_sponsors', {
        ip: address,
        port: hud_port,
        flags: getFlags()
    });
};