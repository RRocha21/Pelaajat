var teamsOverall;
var playersOverall;
var bottom_sponsorsOverall;
var left_sponsorsOverall;
var right_sponsorsOverall;
var video_sponsorsOverall;

function addTeam(team){
    $.ajax({
        type: "POST",
        url: "/api/teams",
        data: team,
        cache:false,
        contentType:false,
        processData:false,
        success: function(res){
            listTeams(res.id)
        }
    });
}

function deleteTeam(teamId){
    $.ajax({
        type: "DELETE",
        url: "/api/teams",
        data: {teamId:teamId},
        success: function(res){
            listTeams();
            loadTeam();
            $("#delete_team").addClass("disabled")
        }
    });
}

function deleteLogo(teamId){
    $.ajax({
        type: "DELETE",
        url: "/api/teams_logo",
        data: {teamId:teamId},
        success: function(res){
            listTeams(teamId);
            $("#team_logo_img").attr("src", "").hide();
        }
    });
}

function updateTeam(team, teamId){
    $.ajax({
        type: "PATCH",
        url: "/api/teams",
        data: team,
        cache:false,
        contentType:false,
        processData:false,
        success: function(){
            listTeams(teamId)
        }
    });
}

function listTeams(defaultTeam){

    loadTeams(function(teams){
        $teamList = $("#teams");
        $teamList.html("<option value='default'>New team</option>");

        teams.forEach(function(team, id) {
            let $option = $("<option value='" + id + "'>" + team.team_name + "</option>");
            if(defaultTeam && defaultTeam == team._id) $option.prop("selected","selected");
            $("#teams").append($option);
        }, this);

        $('#teams').formSelect();
    });
}
function loadTeams(callback){
    $.get("/api/teams", function (data) {
        teamsOverall = data.teams;
        callback(teamsOverall);
    });
}

function loadTeam(team){
    $("#team_name").val(team ? team.team_name : "");
    $("#delete_team").removeClass("disabled").addClass(!team ? "disabled" : "");
    $("#id").val(team ? team._id : "");
    $("#team_logo_img").attr("src", (team && team.logo ? "/teams/" + team.logo : "")).hide();
    if(team && team.logo) $("#team_logo_img").show();
}

// --------------------------------- Bottom Sponsors ---------------------------------

function addBottomSponsor(bottom_sponsor){
    $.ajax({
        type: "POST",
        url: "/api/bottom_sponsors",
        data: bottom_sponsor,
        cache:false,
        contentType:false,
        processData:false,
        success: function(res){
            listBottomSponsors(res.id)
        }
    });
}

function deleteBottomSponsor(bottom_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/bottom_sponsors",
        data: {bottom_sponsorId:bottom_sponsorId},
        success: function(res){
            listBottomSponsors();
            loadBottomSponsor();
            $("#delete_bottom_sponsor").addClass("disabled")
        }
    });
}

function deleteBottomLogo(bottom_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/bottom_sponsors",
        data: {bottom_sponsorId:bottom_sponsorId},
        success: function(res){
            listBottomSponsors(bottom_sponsorId);
            $("#bottom_sponsor_logo_img").attr("src", "").hide();
        }
    });
}

function updateBottomSponsor(bottom_sponsor, bottom_sponsorId){
    $.ajax({
        type: "PATCH",
        url: "/api/bottom_sponsors",
        data: bottom_sponsor,
        contentType:false,
        processData:false,
        success: function(){
            listBottomSponsors(bottom_sponsorId)
        }
    });
}

function listBottomSponsors(defaultSponsor){

    loadBottomSponsors(function(bottom_sponsors){
        $bottom_sponsorList = $("#bottom_sponsors");
        $bottom_sponsorList.html("<option value='default'>New Sponsor</option>");

        bottom_sponsors.forEach(function(bottom_sponsor, id) {
            let $option = $("<option value='" + id + "'>" + bottom_sponsor.bottom_sponsor_name + "</option>");
            if(defaultSponsor && defaultSponsor == bottom_sponsor._id) $option.prop("selected","selected");
            $("#bottom_sponsors").append($option);
        }, this);

        $('#bottom_sponsors').formSelect();
    });
}
function loadBottomSponsors(callback){
    $.get("/api/bottom_sponsors", function (data) {
        bottom_sponsorsOverall = data.bottom_sponsors;
        callback(bottom_sponsorsOverall);
    });
}

function loadBottomSponsor(bottom_sponsor){
    $("#bottom_sponsor_name").val(bottom_sponsor ? bottom_sponsor.bottom_sponsor_name : "");
    $("#delete_bottom_sponsor").removeClass("disabled").addClass(!bottom_sponsor ? "disabled" : "");
    $("#id").val(bottom_sponsor ? bottom_sponsor._id : "");
    $("#bottom_sponsor_logo_img").attr("src", (bottom_sponsor && bottom_sponsor.logo ? "/bottom_sponsors/" + bottom_sponsor.logo : "")).hide();
    if(bottom_sponsor && bottom_sponsor.logo) $("#bottom_sponsor_logo_img").show();
}

// ------------------------------------------------------ End Bottom Sponsors ------------------------------------------------------

// --------------------------------- Left Sponsors ---------------------------------

function addLeftSponsor(left_sponsor){
    $.ajax({
        type: "POST",
        url: "/api/left_sponsors",
        data: left_sponsor,
        cache:false,
        contentType:false,
        processData:false,
        success: function(res){
            listLeftSponsors(res.id)
        }
    });
}

function deleteLeftSponsor(left_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/left_sponsors",
        data: {left_sponsorId:left_sponsorId},
        success: function(res){
            listLeftSponsors();
            loadLeftSponsor();
            $("#delete_left_sponsor").addClass("disabled")
        }
    });
}

function deleteLeftLogo(left_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/left_sponsors",
        data: {left_sponsorId:left_sponsorId},
        success: function(res){
            listLeftSponsors(left_sponsorId);
            $("#left_sponsor_logo_img").attr("src", "").hide();
        }
    });
}

function updateLeftSponsor(left_sponsor, left_sponsorId){
    $.ajax({
        type: "PATCH",
        url: "/api/left_sponsors",
        data: left_sponsor,
        contentType:false,
        processData:false,
        success: function(){
            listLeftSponsors(left_sponsorId)
        }
    });
}

function listLeftSponsors(defaultSponsor){

    loadLeftSponsors(function(left_sponsors){
        $left_sponsorList = $("#left_sponsors");
        $left_sponsorList.html("<option value='default'>New Sponsor</option>");

        left_sponsors.forEach(function(left_sponsor, id) {
            let $option = $("<option value='" + id + "'>" + left_sponsor.left_sponsor_name + "</option>");
            if(defaultSponsor && defaultSponsor == left_sponsor._id) $option.prop("selected","selected");
            $("#left_sponsors").append($option);
        }, this);

        $('#left_sponsors').formSelect();
    });
}
function loadLeftSponsors(callback){
    $.get("/api/left_sponsors", function (data) {
        left_sponsorsOverall = data.left_sponsors;
        callback(left_sponsorsOverall);
    });
}

function loadLeftSponsor(left_sponsor){
    $("#left_sponsor_name").val(left_sponsor ? left_sponsor.left_sponsor_name : "");
    $("#delete_left_sponsor").removeClass("disabled").addClass(!left_sponsor ? "disabled" : "");
    $("#id").val(left_sponsor ? left_sponsor._id : "");
    $("#left_sponsor_logo_img").attr("src", (left_sponsor && left_sponsor.logo ? "/left_sponsors/" + left_sponsor.logo : "")).hide();
    if(left_sponsor && left_sponsor.logo) $("#left_sponsor_logo_img").show();
}

// ------------------------------------------------------ End Left Sponsors ------------------------------------------------------

// --------------------------------- Right Sponsors ---------------------------------

function addRightSponsor(right_sponsor){
    $.ajax({
        type: "POST",
        url: "/api/right_sponsors",
        data: right_sponsor,
        cache:false,
        contentType:false,
        processData:false,
        success: function(res){
            listRightSponsors(res.id)
        }
    });
}

function deleteRightSponsor(right_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/right_sponsors",
        data: {right_sponsorId:right_sponsorId},
        success: function(res){
            listRightSponsors();
            loadRightSponsor();
            $("#delete_right_sponsor").addClass("disabled")
        }
    });
}

function deleteRightLogo(right_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/right_sponsors",
        data: {right_sponsorId:right_sponsorId},
        success: function(res){
            listRightSponsors(right_sponsorId);
            $("#right_sponsor_logo_img").attr("src", "").hide();
        }
    });
}

function updateRightSponsor(right_sponsor, right_sponsorId){
    $.ajax({
        type: "PATCH",
        url: "/api/right_sponsors",
        data: right_sponsor,
        contentType:false,
        processData:false,
        success: function(){
            listRightSponsors(right_sponsorId)
        }
    });
}

function listRightSponsors(defaultSponsor){

    loadRightSponsors(function(right_sponsors){
        $right_sponsorList = $("#right_sponsors");
        $right_sponsorList.html("<option value='default'>New Sponsor</option>");

        right_sponsors.forEach(function(right_sponsor, id) {
            let $option = $("<option value='" + id + "'>" + right_sponsor.right_sponsor_name + "</option>");
            if(defaultSponsor && defaultSponsor == right_sponsor._id) $option.prop("selected","selected");
            $("#right_sponsors").append($option);
        }, this);

        $('#right_sponsors').formSelect();
    });
}
function loadRightSponsors(callback){
    $.get("/api/right_sponsors", function (data) {
        right_sponsorsOverall = data.right_sponsors;
        callback(right_sponsorsOverall);
    });
}

function loadRightSponsor(right_sponsor){
    $("#right_sponsor_name").val(right_sponsor ? right_sponsor.right_sponsor_name : "");
    $("#delete_right_sponsor").removeClass("disabled").addClass(!right_sponsor ? "disabled" : "");
    $("#id").val(right_sponsor ? right_sponsor._id : "");
    $("#right_sponsor_logo_img").attr("src", (right_sponsor && right_sponsor.logo ? "/right_sponsors/" + right_sponsor.logo : "")).hide();
    if(right_sponsor && right_sponsor.logo) $("#right_sponsor_logo_img").show();
}

// ------------------------------------------------------ End Right Sponsors ------------------------------------------------------

// --------------------------------- Video Sponsors ---------------------------------

function addVideoSponsor(video_sponsor){
    $.ajax({
        type: "POST",
        url: "/api/video_sponsors",
        data: video_sponsor,
        cache:false,
        contentType:false,
        processData:false,
        success: function(res){
            listVideoSponsors(res.id)
        }
    });
}

function deleteVideoSponsor(video_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/video_sponsors",
        data: {video_sponsorId:video_sponsorId},
        success: function(res){
            listVideoSponsors();
            loadVideoSponsor();
            $("#delete_video_sponsor").addClass("disabled")
        }
    });
}

function deleteVideoLogo(video_sponsorId){
    $.ajax({
        type: "DELETE",
        url: "/api/video_sponsors",
        data: {video_sponsorId:video_sponsorId},
        success: function(res){
            listVideoSponsors(video_sponsorId);
            $("#video_sponsor_logo_img").attr("src", "").hide();
        }
    });
}

function updateVideoSponsor(video_sponsor, video_sponsorId){
    $.ajax({
        type: "PATCH",
        url: "/api/video_sponsors",
        data: video_sponsor,
        contentType:false,
        processData:false,
        success: function(){
            listVideoSponsors(video_sponsorId)
        }
    });
}

function listVideoSponsors(defaultSponsor){

    loadVideoSponsors(function(video_sponsors){
        $video_sponsorList = $("#video_sponsors");
        $video_sponsorList.html("<option value='default'>New Sponsor</option>");

        video_sponsors.forEach(function(video_sponsor, id) {
            let $option = $("<option value='" + id + "'>" + video_sponsor.video_sponsor_name + "</option>");
            if(defaultSponsor && defaultSponsor == video_sponsor._id) $option.prop("selected","selected");
            $("#video_sponsors").append($option);
        }, this);

        $('#video_sponsors').formSelect();
    });
}
function loadVideoSponsors(callback){
    $.get("/api/video_sponsors", function (data) {
        video_sponsorsOverall = data.video_sponsors;
        callback(video_sponsorsOverall);
    });
}

function loadVideoSponsor(video_sponsor){
    $("#video_sponsor_name").val(video_sponsor ? video_sponsor.video_sponsor_name : "");
    $("#video_duration").val(video_sponsor ? video_sponsor.video_duration : "");
    $("#delete_video_sponsor").removeClass("disabled").addClass(!video_sponsor ? "disabled" : "");
    $("#id").val(video_sponsor ? video_sponsor._id : "");
    $("#video_sponsor_logo_img").attr("src", (video_sponsor && video_sponsor.logo ? "/video_sponsors/" + video_sponsor.logo : "")).hide();
    if(video_sponsor && video_sponsor.logo) $("#video_sponsor_logo_img").show();
}

// ------------------------------------------------------ End Video Sponsors ------------------------------------------------------

 
function addPlayer(player){
    $.ajax({
        type: "POST",
        url: "/api/players",
        data: player,
        cache: false,
        contentType: false,
        processData: false,
        success: function (res) {
            listPlayers(res.id)
        }
    });
}


function deletePlayer(playerId){
    $.ajax({
        type: "DELETE",
        url: "/api/players",
        data: {userId:playerId},
        success: function(res){  
            listPlayers();
            loadPlayer();
            $("#delete_player").addClass("disabled")
        }
    });
}

function deleteAvatar(playerId) {
    $.ajax({
        type: "DELETE",
        url: "/api/players_avatar",
        data: {userId:playerId},
        success: function (res) {
            listPlayers(playerId);
            $("#avatar_img").attr("src", "").hide();
        }
    });
}

function updatePlayer(player, userId){
    $.ajax({
        type: "PATCH",
        url: "/api/players",
        data: player,
        cache: false,
        contentType: false,
        processData: false,
        success: function(){
            listPlayers(userId)
        }
    });
}

function listPlayers(defaultPlayer){

    loadPlayers(function(players){
        $playerList = $("#players");
        $playerList.html("<option value='default'>New player</option>");

        players.forEach(function(player, id) {
            let $option = $("<option value='" + id + "'>" + player.displayed_name + "</option>");
            // let $option = $("<option value=>" + player.displayed_name + "</option>");
            if(defaultPlayer && defaultPlayer == player._id) $option.prop("selected","selected");
            $("#players").append($option);
        }, this);

        $("#players").formSelect();
    });
}
function loadPlayers(callback){
    $.get("/api/players", function (data) {
        playersOverall = data.players;
        callback(playersOverall);
    });
}

function loadPlayer(player){
    $("#sid").val(player ? player.sid : "");
    $("#vis_name").val(player ? player.displayed_name : "");
    $("#avatar_img").attr("src", (player && player.avatar ? "/av/" + player.avatar.slice(0, -4)  : "")).hide();
    if(player && player.avatar){
        $("#avatar_img").show(); 
    } 
    // $("#avatar").val(player ? player.avatar : "");
    $("#delete_player").removeClass("disabled").addClass(!player ? "disabled" : "");
}




function loadHUDs(callback){
    $.get("/api/huds", function (data) {
        callback(data);
    });
}

function addHUD(data, callback){
    $.ajax({
        type: "POST",
        url: "/api/huds",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(res){
            listHUDs(callback);
        }
    });
}
function deleteHUD(instanceId, callback){
    $.ajax({
        type: "DELETE",
        url: "/api/huds",
        data: {id:instanceId},
        success: function(res){
            listHUDs(callback);
        }
    });
}

function listHUDs(cb){
    loadHUDs(function(res){
        let huds = res.huds;
        let instances = res.instances;
        let files = res.files;

        let $instance_example, $hud_example;
        
        $instance_example = $("#instance").clone();
        $hud_example = $("#hud").clone();
        let $instance = $("#instance").clone().attr("id", "");
        let $hud = $("#hud").clone().attr("id", "");

        let hudList = {};

        instances.forEach(function(el) {
            if(!hudList[el.hud]) hudList[el.hud] = [];
            hudList[el.hud].push(el);
        }, this);

        $hudsTable = $("#huds tbody");
        $hudsTable.html("");
        $hudsTable.append($instance_example.hide());
        $hudsTable.append($hud_example.hide());
        
        huds.forEach(function(hud) {
            let $hudRow = $hud.clone().show().appendTo("<tr></tr>");
            $hudRow.find("th:eq(0)").text(hud)

            $hudsTable.append($hudRow);
            if(hudList[hud]){
                hudList[hud].forEach(function(inst) {
                    let $temp = $instance.clone();
                    
                    $temp.show();
                    $temp.find("#name").val(inst.name);
                    $temp.appendTo($("<tr></tr>")).attr("data-hid", inst._id).appendTo($hudsTable);
                    $temp.find('#delay').val(inst.delay);
                    $temp.find("td:eq(3)").html("<a href='/huds/" + inst._id + "'>/huds/" + inst._id + "</a>");
                    $temp.find("#warnings").html('<i class="material-icons">done</i>')

                    if(inst.enabled == true) $temp.find("input[type='checkbox']").prop("checked","true");
                }, this);
            }
            let $status = $hudRow.find("#warnings i");
            if(!files[hud].includes("template.pug") ||  !files[hud].includes("index.js") || !files[hud].includes("style.css")){
                let tip = "Missing files:" + (!files[hud].includes("template.pug") ? ' template.pug,' : "") + (!files[hud].includes("index.js") ? ' index.js,' : "") + (!files[hud].includes("style.css") ? ' style.css,' : "");
                $status.addClass("tooltipped").attr({"data-position":"top", "data-tooltip":tip.substr(0, tip.length -1)}).text("warning")
            } else {
                $status.removeClass("tooltipped").text("done_all");
            }
        }, this);
        if(typeof cb == "function") cb();
    });
}

function setHUD(data){
    $.ajax({
        type: "PATCH",
        url: "/api/huds",
        contentType: 'application/json',
        data: JSON.stringify(data),
        error: function(){
            $("tr[data-hid='" + data.id + "']").find("#warnings").html('<i class="material-icons tooltipped" data-position="top" data-tooltip="Error during request">error_outline</i>');
        },
        success: function(){
            $("tr[data-hid='" + data.id + "']").find("#warnings").html('<i class="material-icons">done</i>');
        }
    });
}

