const db = require('./database.js').video_sponsors;
const fs = require('fs');

db.loadDatabase();

exports.getVideoSponsors = (req, res) => {
    db.find({}, (err, video_sponsorList) => {
        if (err) return res.sendStatus(500);
        res.setHeader('Content-Type', 'application/json');
        return res.json({video_sponsors: video_sponsorList});
    });
};

exports.addVideoSponsor = (req, res) => {
    let video_sponsor = req.body;
    delete video_sponsor._id;

    if(req.file) video_sponsor.logo = req.file.filename;
    
    db.insert(video_sponsor, (err, video_newSponsor) => {
        if (err) return res.sendStatus(500);
        return res.status(200).json({id:video_newSponsor["_id"]});
    });
};

exports.updateVideoSponsor = (req, res) => {
    let video_sponsor = req.body;
    let video_sponsorId = video_sponsor._id;

    delete video_sponsor._id;

    if(req.file) video_sponsor.logo = req.file.filename;

    function removeLogoFile(err, video_sponsorList){
    
        if(err) return res.sendStatus(500);
        if(!video_sponsorList[0]) return res.sendStatus(200);

        if (video_sponsor.logo == undefined) {
            video_sponsor.logo = video_sponsorList[0].logo;
        } else {
            if(fs.existsSync('./public/video_sponsors/' + video_sponsorList[0].logo)) fs.unlinkSync('./public/video_sponsors/' + video_sponsorList[0].logo);
        }

        db.update({ _id: video_sponsorId }, { $set: { video_sponsor_name: video_sponsor.video_sponsor_name, logo: video_sponsor.logo, video_duration: video_sponsor.video_duration } }, {}, (err, numReplaced) => {
            if (err) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }

    
    db.find({_id:video_sponsorId}, removeLogoFile);
};
exports.deleteVideoSponsor = (req,res) => {
    
    let video_sponsorId = req.body.video_sponsorId;

    function removeSponsor(err, video_sponsorList) {
        if(err) return res.sendStatus(500);
        if(!video_sponsorList[0]) return res.sendStatus(200);

        if(fs.existsSync('./public/video_sponsors/' + video_sponsorList[0].logo)) fs.unlinkSync('./public/video_sponsors/' + video_sponsorList[0].logo);

        db.remove({_id:video_sponsorId}, {}, (err, numRemoved) => {
            if(err || numRemoved != 1) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }

    db.find({_id:video_sponsorId}, removeSponsor);
};
exports.deleteVideoLogo = (req,res) => {
    let video_sponsorId = req.body.sponsorId;

    function removeLogoFile(err, video_sponsorList){
        if(err) return res.sendStatus(500);
        if(!video_sponsorList[0]) return res.sendStatus(200);

        if(fs.existsSync('./public/video_sponsors/' + video_sponsorList[0].logo)) fs.unlinkSync('./public/video_sponsors/' + video_sponsorList[0].logo);

        db.update({ _id: video_sponsorId }, { $set: {logo:null}}, {}, (err, numReplaced) => {
            if(err) return res.sendStatus(500);
            return res.sendStatus(200);
        });
    }
    db.find({_id:video_sponsorId}, removeLogoFile);
};

exports.render = (req,res) => {
    return res.render('video_sponsors', {
        ip: address,
        port: hud_port,
        flags: getFlags()
    });
};