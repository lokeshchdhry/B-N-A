var links_keys = require('utils/links_keys');
var toast = require('utils/toast');

exports.add_anniversary=function(){
	var add_anniversary_win = Ti.UI.createWindow({title:'Add Anniversary'});
	var name_lbl = Ti.UI.createLabel({text:'Name: ',top:30,left:20});
	var name_txtfld = Ti.UI.createTextField({top:20,left:70,width:250});
	var date_but = Ti.UI.createButton({title:'Pick date',top:75,left:20});
	var date_lbl = Ti.UI.createLabel({left:120,top:88,font:{fontWeight:'bold',fontSize:20}});
	var check_box = Ti.UI.createSwitch({top:130,left:20,style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX});
	var calendar_lbl = Ti.UI.createLabel({top:135,left:50,text:'Add To Calendar?'});
	var add_but = Ti.UI.createButton({title:'Add Anniversary',top:180,left:'35%'});
	
	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		value:new Date()
	});
	
	date_but.addEventListener('click',function(){
		picker.showDatePickerDialog({
			callback:function(e){
				if(e.cancel){
					
				}
				else{
					var value=e.value.toString();
					date_lbl.text=value.substring(4,16);
				}
			}
		});
	});
	
	function check_permissions(){
		if (Ti.Calendar.hasCalendarPermissions()) {
		       return true;
		    } else {
		       Ti.Calendar.requestCalendarPermissions(function(e) {
			           if (e.success === true) {
			              //alert("Access granted");
			              return true;
			           } else {
			              alert("Access denied, error: " + e.error);
			              console.log('Ti.Calendar.requestCalendarPermissions ' + JSON.stringify(e, null, 2));
			           }
			       });
		       }
	}
	
	function getMonth(monthStr){
	    return new Date(monthStr+'-1-01').getMonth()+1;
	}
	
	function check_box_value_txt(input){
		Ti.API.info(input);
		if(input===undefined||input===false){
			return 'No';
		}
		else{
			return 'Yes';
		}
	}
	
	//Add function
	 function add(){
		var xhr = Ti.Network.createHTTPClient({	
		    onload: function onLoad() {
		        Ti.API.info("Loaded: " + this.status + ": " + this.responseText);
		        if((this.status) == 201){
		        	//alert("Device added successfully");
		        	toast.show_toast("Anniversary added successfully",Ti.UI.NOTIFICATION_DURATION_SHORT);
		        	add_anniversary_win.close();
		        }
		    },
		    onerror: function onError() {
		        alert("Errored: " + this.status + ": " + this.responseText); 
		    }
		});		
		xhr.open("POST", links_keys.create_anniversary_url);
		var authstr = 'Basic ' + Ti.Utils.base64encode(links_keys.prod_key);
		xhr.setRequestHeader("Authorization", authstr);
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.send(JSON.stringify({
			"name": name_txtfld.value.toLowerCase(),
			"date": date_lbl.text.toLowerCase(),
			"to_calendar": check_box_value_txt(check_box.value)
		    // "make": make_txtfld.value.toLowerCase(),
		    // "model": model_txtfld.value.toLowerCase(),
		    // "serial_number": ser_no_txtfld.value.toLowerCase(),
		    // "IMEI": IMEI_txtfld.value.toLowerCase(),
		    // "phone_no": phoneno_txtfld.value.toLowerCase(),
		    // "notes": notes_txtfld.value.toLowerCase(),
		    // "network": network_txtfld.value.toLowerCase(),
		    // "arch": arch_txtfld.value.toLowerCase(),
			// "registered": registered_txtfld.value.toLowerCase(),
			// "devicetype": devicetype_txtfld.value.toLowerCase(),
			// "tag_id": tagid_txtfld.value
		 }));
	};
	
	// function add_reminder(){
		// var calendar_id = '';
// 		
		// var month = date_lbl.text.substring(0,4);
		// var date = date_lbl.text.substring(4,7);
		// Ti.API.info(month);
		// Ti.API.info('*********'+date);
		// Ti.API.info('############'+getMonth(month));
// 				
		// function showCalendars(calendars) {
		    // for (var i = 0; i < calendars.length; i++) {
		        // Ti.API.info(i+' : '+calendars[i].name);
		        // calendar_id = calendars[0].id;
		    // }
		// }
		// showCalendars(Ti.Calendar.allCalendars);
// 		
		// var CALENDAR_TO_USE = calendar_id;
		// var calendar = Ti.Calendar.getCalendarById(CALENDAR_TO_USE);
// 		
		// Ti.API.info('***********'+JSON.stringify(calendar));
// 		
		// // Create the event
		// var eventBegins = new Date(2016,getMonth(month), date, 6, 0, 0);
		// var eventEnds = new Date(2016,getMonth(month), date, 23, 0, 0);
		// var details = {
		    // title: 'Happy Birthday '+name_txtfld.value,
		    // description: name_txtfld.value+"'s birthday today !!!",
		    // begin: eventBegins,
		    // end: eventEnds,
		    // allDay:true
		// };
// 		
		 // calendar.createEvent(details);
// 		
		// // Now add a reminder via e-mail for 10 minutes before the event.
		// var reminderDetails = {
		    // minutes: 10,
		    // method: Ti.Calendar.METHOD_EMAIL
		// };
// 		
		// event.createReminder(reminderDetails);
// 		
		// Ti.API.info('$$$$$$$$$$$$$'+JSON.stringify().event.getReminders());
	// }
	
	check_box.addEventListener('change',function(){
		if(check_box.value===true){
			if(check_permissions()){
				function showCalendars(calendars) {
			    for (var i = 0; i < calendars.length; i++) {
			        Ti.API.info(i+' : '+calendars[i].name);
			    }
			}
			Ti.API.info('ALL CALENDARS:');
			showCalendars(Ti.Calendar.allCalendars);
			if (Ti.Platform.osname === 'android') {
			    Ti.API.info('SELECTABLE CALENDARS:');
			    showCalendars(Ti.Calendar.selectableCalendars);
				}
			}
		}
	});
	
	add_but.addEventListener('click',function(){
		if(name_lbl.text!=''&& date_lbl.text!=''){
			//Call the add function
			add();
		}
		else{
			alert('Please fill in all details');
		}
	});
	
	add_anniversary_win.add(name_lbl);
	add_anniversary_win.add(name_txtfld);
	add_anniversary_win.add(date_but);
	add_anniversary_win.add(date_lbl);
	add_anniversary_win.add(check_box);
	add_anniversary_win.add(calendar_lbl);
	add_anniversary_win.add(add_but);
	add_anniversary_win.open();
};
