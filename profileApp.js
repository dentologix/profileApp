var ProfileApp = function (){


	var thisApp = this;

 	var options = {};
	options.userId = false;

	var service = new Service({
	  "serviceURL" : 'apps/profileApp/profileApp.php'
	  });

thisApp.show = function(showOptions){

	$.extend(options, showOptions);
	//uid je jedna od varijabli koje su dostupne u svim aplikacijama uid je user id 
	if( options.userId == uid ){
		$(".profile-private").show();
	} else {
		$(".profile-private").hide();
	}

	service.post("load", [options.userId], function(rec){

			rec = JSON.parse(rec);
			seedData(".profile-data", "profile-", rec);
			$("#profile-modal").modal("show");
	});

	

}

/* */
thisApp.hide = function(){
 $("#profile-modal").modal("hide");

}




/* */
thisApp.init = function(){

	guiApp.registerLink("My profile", function(){
		profileApp.show({"userId" : uid});
	}, "app");

	scroll($(".profile-data-list"));
	  thisApp.events();

}

thisApp.changePassword = function(){

	var oldPass = $("#old-pass").val();
	var newPass = $("#new-pass").val();
	var newPass2 = $("#new-pass2").val();
	
	if(newPass2 != newPass){
		guiApp.infoAlert("New passwords are not the same, please check and try again!");
	$("#new-pass2").focus();
	return;
	}

	$("#btn-pass-change").attr("disabled", true);


	service.post("changePassword", new Array(oldPass, newPass), function(rec){

				if( rec === true ){
					$(".pass-reset").val('');
				$("#btn-pass-change").attr("disabled", false);
					guiApp.infoAlert("Your password has been reseted!");
				} else {
					$("#btn-pass-change").attr("disabled", false);
					guiApp.toast(rec,10000);
				};

	});
}
thisApp.saveProfile = function(){


	var data=harvestData(".profile-data", "profile-");
			
	service.post("save", [data], function(rec){

				

	});
}

/* */
thisApp.events = function(){

	$("#btn-pass-change").click(function(e){
		thisApp.changePassword();
	});

	$(".btn-profile-save").click(function(e){
		thisApp.saveProfile();
		guiApp.infoAlert("Spremljen profil");
	});

	
    
}

thisApp.init();


}
