var links_keys = require('utils/links_keys');
var toast = require('utils/toast');

exports.delete_birthday=function(name){
	function get_id(name){
			var xhr = Ti.Network.createHTTPClient({
			    onload: function onLoad(){ 
			    	Ti.API.info("Loaded: " + this.status + ": " + this.responseText);		
			        var json_resp = this.responseText;
			        var JSONdata = JSON.parse(json_resp);
			        //check if any devices found by checking the devices.length
			        if(JSONdata.birthdays.length>0){
				        for (var i=0;i<JSONdata.birthdays.length;i++){
				        	var birthdays = JSONdata.birthdays[i];    	
				     		Ti.API.info(JSONdata.birthdays.length+'birthday/s found');
				     		//Call the delete fuction
							delete_birthday(birthdays.id);
				        }				        
				       }
				       else{
				       	Ti.API.info('No birthday for '+name+'found in DB');
				       }			
			    },
			    onerror: function onError() {
			        alert("Errored: " + this.status + ": " + this.responseText);
			    }
			});
				
				xhr.open("GET",links_keys.query_birthday_url+'where='+'{'+'"name"'+':'+'"'+name+'"'+'}');
				var authstr = 'Basic ' + Ti.Utils.base64encode(links_keys.prod_key);
				xhr.setRequestHeader("Authorization", authstr);
				xhr.send();
	}
	
	function delete_birthday(id){
		var xhr = Ti.Network.createHTTPClient({
			    onload: function onLoad() {
			        toast.show_toast('Birthday deleted successfully',Ti.UI.NOTIFICATION_DURATION_LONG);
			    },
			    onerror: function onError() {
			        alert("Errored: " + this.status + ": " + this.responseText);
			    }
			});
			
		xhr.open("DELETE",links_keys.delete_birthday_url+id);
		var authstr = 'Basic ' + Ti.Utils.base64encode(links_keys.prod_key);
		xhr.setRequestHeader("Authorization", authstr);
		xhr.send();
	};
	
	//calling get_id
	get_id(name);
};