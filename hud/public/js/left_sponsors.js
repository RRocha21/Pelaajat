$(document).ready(function(){
    let id = null;

    listLeftSponsors();

    $("#left_sponsors").change(function(){
        let i = $(this).val();
        loadLeftSponsor(left_sponsorsOverall[i]);

        console.log(left_sponsorsOverall[i])

        if(left_sponsorsOverall[i]) id = left_sponsorsOverall[i]._id;

    });
    $("#save_left_sponsor").click(function(e){
        e.preventDefault();
        let form = $('form')[3];
        let form_data = new FormData(form);
        let localId = $("#left_sponsors").val();

        if(localId == "default"){
            addLeftSponsor(form_data);
        } else {
            form_data.set("_id", id);
            updateLeftSponsor(form_data, id);
        }
    });
    $("#delete_left_sponsor").click(function(){
        deleteLeftSponsor(id);
    });
    $("#delete_left_sponsor_logo").click(function(){
        deleteLeftSponsorLogo(id);
    });

});
