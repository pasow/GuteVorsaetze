(function() {
	'use strict';

	 function displayJSON(person, json, container){

	 	var obj = {};
	 	$(container).empty();

	 	$.ajax({
	        url: "json/"+json+".json",
	        async: false,
	        dataType: 'json',
	        success: function(data) {
	        	obj = data;
	        	var items = [];
			  $.each( data, function( key, val ) {
			  	if("s" in val){ //push those subtasks to the list
			  		items.push("<li id='" + key + "'>");
			  		$.each( val.s, function( key2, val2 ) {
			  			items.push("<input class='s' id='"+key2+"' type='checkbox'"+val2[person]+"/>");
			  		});
			  		items.push(val.name + "</li>" );
			  	}else{
			    	items.push( "<li id='" + key + "'><input type='checkbox'"+val[person]+"/>" + val.name + "</li>" );
			    }
			  });
			 
			  $( "<ul/>", {
			    html: items.join( "" )
			  }).appendTo(container);
	        }
    	});
    	return obj;

    }

    function countCompleted(person, json){
    	var i = 0;
    	var j = 0;
	 	$.ajax({
	        url: "json/"+json+".json",
	        async: false,
	        dataType: 'json',
	        success: function(data) {
			  $.each( data, function( key, val ) {
			  	if(val[person]=="checked"){
			  		i=i+1;
			  	}
				if("s" in val){ //checking if there are subtasks and giving three points if all are completed
					var stay = true;
					$.each( val.s, function( key2, val2 ) {
			  			if(val2[person]=="checked" && stay){
			  				j=3;
			  			}else{
			  				j=0;
			  				stay = false;
			  			}
			  		});
			  	i=i+j;
				}
			  });
	        }
    	});
	 	return i;
    }

    function setCounter(person, json){
    	var completed = countCompleted(person, person) + countCompleted(person, json);
    	$(".completed").html(completed);

    }


    function saveJSON(person, container, obj, json){

    	$(container).find('input[type="checkbox"]').each(function (j) {
			    
			    var sThisVal = (this.checked ? "checked" : "");
    			var id = $(this).parent().attr('id');
    			var task = obj[id];
    			console.log(task);
    			if($(this).attr('class')=="s"){
    				var sid = $(this).attr('id');
    				console.log(sid);
    				var subtasks= task.s;  // o down multiple levels, no idea how to do this correctly
    				var subtask = subtasks[sid];
    				subtask[person] = sThisVal;
    			} else{
    				task[person] = sThisVal;
    			}

			});
			var params = JSON.stringify(obj);


	        $.ajax({
	            type: "POST",
	            url: "../scripts/save.php",
	            async: false,
	            data: {'params': params, "json": json},            
	            success: function(response){  
	            	console.log("Suceess");
			    }

			});



    }




	$(function() {



		
	// load json depending on person
			var person = $( ".person" ).val();
			var personobj = displayJSON(person, person,".mycontainer"); // get person from select
			var restobj = displayJSON(person, "rest",".restcontainer");
			setCounter(person, "rest");

//change person
		$( ".person" ).change(function() {
  			
			person = $( ".person" ).val();
			personobj = displayJSON(person, person,".mycontainer"); // get person from select
			restobj = displayJSON(person, "rest",".restcontainer");
			setCounter(person, "rest");
			
			//console.log(restobj);

		});


		


//Saving functionality
		$( ".save" ).click(function() {
 			saveJSON(person, ".restcontainer", restobj, "rest");
 			saveJSON(person, ".mycontainer", personobj, person);
 			setCounter(person, "rest");

		});

	})




}());