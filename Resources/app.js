var menuitem = require('utils/menuitem');
var birthday_win = require('birthday/birthday_win');
var anniversary_win = require('anniversary/anniversary_win');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:"Birthdays",
    backgroundColor:'#EBF4FF',
});
var tab1 = Titanium.UI.createTab({  
    icon:'/images/birthday_hdpi.png',
    title:"Birthdays",
    window:birthday_win.birthday_window
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:"Anniversaries",
    backgroundColor:'#EBF4FF'
});
var tab2 = Titanium.UI.createTab({  
    icon:'/images/anniversary_hdpi.png',
    title:"Anniversaries",
    window:anniversary_win.anniversary_window
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

menuitem.showmenuitems(tabGroup);


// open tab group
tabGroup.open();
