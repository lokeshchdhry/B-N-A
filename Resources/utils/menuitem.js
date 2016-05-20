var add_birthday = require('birthday/add_birthday');
var add_anniversary = require('anniversary/add_anniversary');

exports.showmenuitems=function(window){
	var activity = window.activity;

	activity.onCreateOptionsMenu = function(e){
	  var menu = e.menu;
	  var birthday = menu.add({
	    title: "Birthday",
	    itemID: birthday,
	    icon:  "/images/birthday.png",
	    showAsAction: Titanium.Android.SHOW_AS_ACTION_ALWAYS
	  });
	  
	  var anniversary = menu.add({
	    title: "Anniversary",
	    icon:  "/images/anniversary.png",
	    showAsAction: Titanium.Android.SHOW_AS_ACTION_ALWAYS
	  });
	    
	  birthday.addEventListener("click", function(e) {
	    //alert('Birthday menuitem clicked');
	    add_birthday.add_birthday();
	  });
	  
	   anniversary.addEventListener("click", function(e) {
	    //alert('Birthday menuitem clicked');
	    add_anniversary.add_anniversary();
	  });

	};
};
