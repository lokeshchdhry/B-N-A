var links_keys = require('utils/links_keys');
var toast = require('utils/toast');

exports.delete_anniversary=function(name){
	function get_id(name){
			var xhr = Ti.Network.createHTTPClient({
			    onload: function onLoad(){ 
			    	Ti.API.info("Loaded: " + this.status + ": " + this.responseText);		
			        var json_resp = this.responseText;
			        var JSONdata = JSON.parse(json_resp);
			        //check if any devices found by checking the devices.length
			        if(JSONdata.anniversaries.length>0){
				        for (var i=0;i<JSONdata.anniversaries.length;i++){
				        	var anniversaries = JSONdata.anniversaries[i];    	
				     		Ti.API.info(JSONdata.anniversaries.length+'anniversary/s found');
				     		//Call the delete fuction
							delete_anniversary(anniversaries.id);
				        }				        
				       }
				       else{
				       	Ti.API.info('No anniversary for '+name+'found in DB');
				       }			
			    },
			    onerror: function onError() {
			        alert("Errored: " + this.status + ": " + this.responseText);
			    }
			});
				
				xhr.open("GET",links_keys.query_anniversary_url+'where='+'{'+'"name"'+':'+'"'+name+'"'+'}');
				var authstr = 'Basic ' + Ti.Utils.base64encode(links_keys.prod_key);
				xhr.setRequestHeader("Authorization", authstr);
				xhr.send();
	}
	
	function delete_anniversary(id){
		var xhr = Ti.Network.createHTTPClient({
			    onload: function onLoad() {
			        toast.show_toast('Anniversary deleted successfully',Ti.UI.NOTIFICATION_DURATION_LONG);
			    },
			    onerror: function onError() {
			        alert("Errored: " + this.status + ": " + this.responseText);
			    }
			});
			
		xhr.open("DELETE",links_keys.delete_anniversary_url+id);
		var authstr = 'Basic ' + Ti.Utils.base64encode(links_keys.prod_key);
		xhr.setRequestHeader("Authorization", authstr);
		xhr.send();
	};
	
	//calling get_id
	get_id(name);
};
