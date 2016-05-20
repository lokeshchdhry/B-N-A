var links_keys = require('utils/links_keys');
var toast = require('utils/toast');
var delete_birthday = require('birthday/delete_birthday');

var birthday_win = Ti.UI.createWindow();
	
//Search bar for the table view
var search = Titanium.UI.createSearchBar({
    showCancel:true,
    hintText:'Search',
    height:45,
    top:0,
});

search.addEventListener('change', function(e){
	e.value; // search string as user types
});
	
search.addEventListener('return', function(e){
	search.blur(); //Blur the search bar when return is hit on the keyboard
});
	
search.addEventListener('cancel', function(e){
	search.blur(); //Blur the search bar when cancel is hit on the keyboard
});

birthday_win.addEventListener('focus',function(){
	search.blur(); //Blur the search bar when window is focused
});

var myTemplate = {
    childTemplates: [
        {                            
            type: 'Ti.UI.Label',     
            bindId: 'name',          
            properties: {            
                //color: 'white',
                font: { fontWeight:'bold' },
                left: 10, top: 10,
            }
        },
        {                            
            type: 'Ti.UI.Label',     
            bindId: 'date',     
            properties: {           
                //color: 'white',
                font: { fontWeight:'bold' },
                left: 10, top: 30,
            }
        },
        {                           
            type: 'Ti.UI.Label',     
            bindId: 'to_calendar',          
            properties: {          
                //color: 'white',
                font: { fontWeight:'bold' },
                left: 10, top: 50,
            }
        },
        // {                           
            // type: 'Ti.UI.Label',     
            // bindId: 'name',         
            // properties: {           
                // //color: 'white',
                // left: 10, top: 70,
            // }
        // },
        // {                            
            // type: 'Ti.UI.ImageView', 
            // bindId: 'pic',           
            // properties: {          
                // top:30,left:'69%',width:20,height:20
            // }
        // },
        {                            
            type: 'Ti.UI.ImageView', 
            bindId: 'fbpic',           
            properties: {          
                top:30,left:'80%',width:17,height:17
            },
            //Event listener for edit 
            events: {
                click: function (e) {
                    var item = listSection.getItemAt(e.itemIndex);
                    var b = item.name.text;
					var device_name = b.substring(9);
					//Call the required update device function & pass the device name as argument to the function
                    //editdevice.update_device(device_name);
                    Titanium.Platform.openURL('fb://root');
                }
            }
        },
        {                            
            type: 'Ti.UI.ImageView', 
            bindId: 'deletepic',           
            properties: {          
                top:30,left:'90%',width:16,height:16
            },
            //Event listener for delete 
            events: {
                click: function (e) {
                    var item = listSection.getItemAt(e.itemIndex);
                    var b = item.name.text;
					var person_name = b.substring(9);
					Ti.API.info('*********'+person_name);
					var dialog = Ti.UI.createAlertDialog({
				        title : 'Are you sure want to delete '+person_name+'s birthday?',
				        buttonNames : ['Yes','No']
				    });
				    dialog.addEventListener('click', function(e){
				        if(e.index == 0){
				        	//Call the required delete device function & pass the device name as argument to the function
				        	delete_birthday.delete_birthday(person_name);
				            listSection.deleteItemsAt(e.itemIndex,1);
				        }
				    });
				    dialog.show();
                }
            }
        }
    ]
};

var listView = Ti.UI.createListView({
    templates: { 'template': myTemplate },
    separatorColor:'#D87373',
    defaultItemTemplate: 'template',
    searchView: search,
    caseInsensitiveSearch : true,
});

var sections = [];

var listSection = Ti.UI.createListSection({});

var listDataSet = [];

var name_lbl = Ti.UI.createLabel({});
var date_lbl = Ti.UI.createLabel({});
var to_calendar_lbl = Ti.UI.createLabel({});
var delete_imageview = Ti.UI.createImageView({backgroundImage:'/images/delete.png'});
var fb_imageview = Ti.UI.createImageView({backgroundImage:'/images/fb.png'});

function getdata(){
	var xhr = Ti.Network.createHTTPClient({
	    onload: function onLoad() {
	        Ti.API.info("Loaded: " + this.status + ": " + this.responseText);
	  
	        var json_resp = this.responseText;
	        var JSONdata = JSON.parse(json_resp);
	        Ti.API.info("Birthday Count: "+JSONdata.birthdays.length);
	        for (var i=0;i<JSONdata.birthdays.length;i++){
	        	var birthdays = JSONdata.birthdays[i];    	
	        		        	
	        	name_lbl.text = "Name:    "+birthdays.name;
	        	date_lbl.text = "B'day Date:    "+birthdays.date;
	        	to_calendar_lbl.text = "Added To Calendar:    "+birthdays.to_calendar;
	        	
	        	listDataSet.push({ name: {text: name_lbl.text,height:50}, 
					date: {text: date_lbl.text,height:46}, 
					to_calendar: {text: to_calendar_lbl.text,height:45},
					fbpic: {image: fb_imageview.backgroundImage}, 
					deletepic: {image: delete_imageview.backgroundImage}, 
					properties:{title:birthdays.name,itemID:birthdays.name,searchableText:birthdays.name+birthdays.date,height:110}
					});
				
				listSection.setItems(listDataSet);
				sections.push(listSection);
				listView.setSections(sections);
	        	
	        	//Change the header of the table view	
	        	listSection.headerTitle=JSONdata.birthdays.length+" birthday/s found";	           
	        } 
	        //Show toast  
	        //toast.show_toast("Found "+JSONdata.birthdays.length+" birthday/s.",Ti.UI.NOTIFICATION_DURATION_SHORT);
	        
	    },
	    onerror: function onError() {
	        alert("Errored: " + this.status + ": " + this.responseText);
	    }
	});
	
	xhr.open("GET",links_keys.get_all_url_birthday);
	var authstr = 'Basic ' + Ti.Utils.base64encode(links_keys.prod_key);
	xhr.setRequestHeader("Authorization", authstr);
	xhr.send();
}

birthday_win.addEventListener('focus',function(){
	//Empty the list data set so that the list view can be reloaded
	listDataSet = [];
	//call function getdata
	getdata();
});

//Adding listview to birthday window
birthday_win.add(listView);

//Export the birthday window
exports.birthday_window = birthday_win;
