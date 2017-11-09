
$(document).ready(function () {    

   init();
});

function init(){
	 $.get("http://localhost:8080/api/collaborateurs", function (data) {
        var tableau = $("#tableCollaborateurs")
        tableau.empty();
        data.forEach((collaborateur) => {
        	var ligneTableau = "<tr class=\"collaborateur\" id=\""+collaborateur.id+"\"><td>"+collaborateur.matricule+"</td><td>"+collaborateur.nom+"</td><td>"+collaborateur.prenom+"</td></tr>"
            $(ligneTableau).appendTo(tableau);
            $("tr#"+collaborateur.id).click(function(){
				lineSelected(data, collaborateur.id);
				})
	        })

	    });

}

function lineSelected(data, id){
	data.forEach((collaborateur) => {
		if(collaborateur.id == id){
			$("#nom").val(collaborateur.banque.nom);
			$("#bic").val(collaborateur.banque.bic);
			$("#iban").val(collaborateur.banque.iban);
			$("input#matricule").val(collaborateur.matricule);
		}
	});
}

function sauvegarder(event){
	event.preventDefault()

	var donnees = {};
	$('#form1').serializeArray().forEach(don => donnees[don.name] = don.value);
	var matricule = $("input#matricule").val();

	$.ajax({
		url: "http://localhost:8080/api/collaborateurs/" + matricule + "/banque",
		type: 'PUT',
		contentType: "application/json",
    	data: JSON.stringify(donnees),
		success: function(){
			console.log("No error");
			init();
		},
		error: function() {
			console.log("error");
		}
	});
}




