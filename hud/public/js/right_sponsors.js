$(document).ready(function(){
    let id = null;

    listRightSponsors();

    $("#right_sponsors").change(function(){
        let i = $(this).val();
        loadRightSponsor(right_sponsorsOverall[i]);

        console.log(right_sponsorsOverall[i])

        if(right_sponsorsOverall[i]) id = right_sponsorsOverall[i]._id;

    });
    $("#save_right_sponsor").click(function(e){
        e.preventDefault();
        let form = $('form')[4];
        let form_data = new FormData(form);
        let localId = $("#right_sponsors").val();


        console.log(form_data);
        if(localId == "default"){
            addRightSponsor(form_data);
        } else {
            form_data.set("_id", id);
            updateRightSponsor(form_data, id);
        }
    });
    $("#delete_right_sponsor").click(function(){
        deleteRightSponsor(id);
    });
    $("#delete_right_sponsor_logo").click(function(){
        deleteRightSponsorLogo(id);
    });

});
