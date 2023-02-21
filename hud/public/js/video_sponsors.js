$(document).ready(function(){
    let id = null;

    listVideoSponsors();

    $("#video_sponsors").change(function(){
        let i = $(this).val();
        loadVideoSponsor(video_sponsorsOverall[i]);

        console.log(video_sponsorsOverall[i])

        if(video_sponsorsOverall[i]) id = video_sponsorsOverall[i]._id;

    });
    $("#save_video_sponsor").click(function(e){
        e.preventDefault();
        let form = $('form')[5];
        let form_data = new FormData(form);
        let localId = $("#video_sponsors").val();

        if(localId == "default"){
            addVideoSponsor(form_data);
        } else {
            form_data.set("_id", id);
            updateVideoSponsor(form_data, id);
        }
    });
    $("#delete_video_sponsor").click(function(){
        deleteVideoSponsor(id);
    });
    $("#delete_video_sponsor_logo").click(function(){
        deleteVideoSponsorLogo(id);
    });

});
