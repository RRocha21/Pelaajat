$(document).ready(function(){
    let id = null;

    console.log("vnrijhsdf");
    loadSponsor();
    $("#save_sponsor").click(function(e){
        e.preventDefault();
        let form = $("form")[2];
        let form_data = new FormData(form);

        // let localId = $("#players").val();
        // if(localId == "default"){
            let r = (Math.random() + 1).toString(36);
            form_data.set("_id", r);
            for (const value of form_data.values()) {
                console.log(value);
              }
            addSponsor(form_data);
            
        // } else {
        //     form_data.set("_id", id);
        //     updatePlayer(form_data, id);
        // }
    });

});
