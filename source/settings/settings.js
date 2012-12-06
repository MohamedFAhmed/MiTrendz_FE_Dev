	enyo.kind({
	name: "MiTrendz.Settings",
	kind: "onyx.Popup",
	classes: "onyx settingsPopup",
	centered: true, 
	//floating: true,
	//scrim: true, 
	scrimWhenModal: false,
	components: [
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%;", components : [
		{content: "Settings", style:"font-size: 27px; color: rgba(255,255,255, 0.6); margin: 10px; margin-left:5px;"},
		{kind: "FittableRows", components : [
			{kind: "FittableColumns", style:"width:100%;", components: [
				{content : "Cloud Font", classes:"settingsColumn", style:"height:100%;"},
				{kind: "onyx.PickerDecorator", classes:"", style: "margin-left:20px; ", components: [
					{},
					{kind: "onyx.Picker", style: "width: 200px; margin-left:50px;", components: [
						{content: "Arial", active: true},
						{content: "Times New Roman"},
						{content: "Chunk Five"},
						{content: "Calibri"}
					]}
				]}
		]},
		{kind: "FittableColumns", style:"width:100%; margin-top: 10px; ", components: [
			{content : "Change Password", classes:"settingsColumn", style:"margin-top: auto; margin-bottom: auto;"},
			{kind: "FittableRows", components: [
				{kind: "onyx.InputDecorator", classes:"settings_input", style: "margin-left:20px; ", components: [
					{kind: "onyx.Input" , classes: "", placeholder: "Current password", type:"password",  onchange:"inputChanged"},
				]},
				{kind: "onyx.InputDecorator", classes:"settings_input", style: "margin-left:20px; ", components: [
					{kind: "onyx.Input" , classes: "", placeholder: "New password", type:"password",  onchange:"inputChanged"}
				]},
				{kind: "onyx.InputDecorator", classes:"settings_input", style: "margin-left:20px; ", components: [
					{kind: "onyx.Input" , classes: "", placeholder: "Confirm password", type:"password",  onchange:"inputChanged"}
				]}
			]},
		{kind: "FittableColumns", style:"width:100%; margin-top: 10px; ", components: [
			{content : "Change E-mail", classes:"settingsColumn", style:"margin-top: auto; margin-bottom: auto;"},
				{kind: "onyx.InputDecorator", classes:"settings_input", style: "margin-left:20px; ", components: [
					{kind: "onyx.Input" , classes: "", placeholder: "Current e-mail",  onchange:"emailChanged"}
				]}
				
			]}
		]}

			
		]},
		{kind:"onyx.Button", content :"Logout", ontap : "logoutTapped"}
		
		]}
	],
	statics: {
		saveUserLoginAndSettings : function(inResponse){
			if (inResponse.hasOwnProperty('LoginSecret')){
				MiTrendz.Utils.Storage.set("Login.loginSecret", inResponse.LoginSecret);
			}
			if (inResponse.hasOwnProperty('AuthorizedFacebook')){
				MiTrendz.Utils.Storage.set("Login.authorizedFacebook", inResponse.AuthorizedFacebook);
			}
			if (inResponse.hasOwnProperty('email')){
				MiTrendz.Utils.Storage.set("Login.email", inResponse.email);
			}
			if (inResponse.hasOwnProperty('FacebookID')){
				MiTrendz.Utils.Storage.set("Login.facebookId", inResponse.FacebookID);
			}
			if (inResponse.hasOwnProperty('ID')){
				MiTrendz.Utils.Storage.set("Login.userId", inResponse.ID);
			}
			if (inResponse.hasOwnProperty('Name')){
				MiTrendz.Utils.Storage.set("Login.name", inResponse.Name);
			}
			if (inResponse.hasOwnProperty('Settings')){
				var settings = inResponse.Settings;
				if (settings.hasOwnProperty('ColorScheme')){
					MiTrendz.Utils.Storage.set("Settings.colorScheme", settings.ColorScheme);
				}
				if (settings.hasOwnProperty('FontName')){
					MiTrendz.Utils.Storage.set("Settings.fontName", settings.FontName);
				}
				if (settings.hasOwnProperty('MaxFontSize')){
					MiTrendz.Utils.Storage.set("Settings.maxFontSize", settings.MaxFontSize);
				}
				if (settings.hasOwnProperty('MinFontSize')){
					MiTrendz.Utils.Storage.set("Settings.minFontSize", settings.MinFontSize);
				}
				if (settings.hasOwnProperty('MaxWordsNum')){
					MiTrendz.Utils.Storage.set("Settings.maxWordsNum", settings.MaxWordsNum);
				}				
			}
			if (inResponse.hasOwnProperty('TimeZone')){
				MiTrendz.Utils.Storage.set("Login.timeZone", inResponse.TimeZone);
			}
			if (inResponse.hasOwnProperty('ValidFacebookToken')){
				MiTrendz.Utils.Storage.set("Login.validFacebookToken", inResponse.ValidFacebookToken);
			}
			if (inResponse.hasOwnProperty('Verified')){
				MiTrendz.Utils.Storage.set("Login.verified", inResponse.Verified);
			}
			
			
		},
		retrieveUserLoginAndSettings : function(){
			var userSettings = new Object();
				userSettings.loginSecret = MiTrendz.Utils.Storage.get("Login.loginSecret");
				userSettings.authorizedFacebook = MiTrendz.Utils.Storage.get("Login.authorizedFacebook");
				userSettings.email = MiTrendz.Utils.Storage.get("Login.email");
				userSettings.facebookId = MiTrendz.Utils.Storage.get("Login.facebookId");
				userSettings.userId = MiTrendz.Utils.Storage.get("Login.userId");
				userSettings.name = MiTrendz.Utils.Storage.get("Login.name");
				userSettings.timeZone = MiTrendz.Utils.Storage.get("Login.timeZone");
				userSettings.validFacebookToken = MiTrendz.Utils.Storage.get("Login.validFacebookToken");
				userSettings.verified = MiTrendz.Utils.Storage.get("Login.verified");
				
				var settings = new Object();
				settings.colorScheme = MiTrendz.Utils.Storage.get("Settings.colorScheme");
				settings.fontName = MiTrendz.Utils.Storage.get("Settings.fontName");
				settings.maxFontSize = MiTrendz.Utils.Storage.get("Settings.maxFontSize");
				settings.minFontSize = MiTrendz.Utils.Storage.get("Settings.minFontSize");
				settings.maxWordsNum =MiTrendz.Utils.Storage.get("Settings.maxWordsNum");
				
				userSettings.settings = settings;
				
				return userSettings;
			
		},
		removeSettings : function(){
				MiTrendz.Utils.Storage.remove("Login.loginSecret");
				MiTrendz.Utils.Storage.remove("Login.authorizedFacebook");
				MiTrendz.Utils.Storage.remove("Login.email");
				MiTrendz.Utils.Storage.remove("Login.facebookId");
				MiTrendz.Utils.Storage.remove("Login.userId");
				MiTrendz.Utils.Storage.remove("Login.name");
				MiTrendz.Utils.Storage.remove("Login.timeZone");
				MiTrendz.Utils.Storage.remove("Login.validFacebookToken");
				MiTrendz.Utils.Storage.remove("Login.verified");
				
				
				MiTrendz.Utils.Storage.remove("Settings.colorScheme");
				MiTrendz.Utils.Storage.remove("Settings.fontName");
				MiTrendz.Utils.Storage.remove("Settings.maxFontSize");
				MiTrendz.Utils.Storage.remove("Settings.minFontSize");
				MiTrendz.Utils.Storage.remove("Settings.maxWordsNum");
		}
	},
	    constructor: function() {
        // low-level or esoteric initialization, usually not needed at all
        this.inherited(arguments);
    },
    create: function() {
        // create is called *after* the constructor chain is finished
        this.inherited(arguments);
        // this.$ hash available only *after* calling inherited create
    },
    destroy: function() {
        // do inherited teardown
        this.inherited(arguments);
    },
	
	rendered: function() {
    // important! must call the inherited method
		this.inherited(arguments);  
	},
	logoutTapped : function(){
		//Let's clean the local storage from the UserId & loginSecret.
		MiTrendz.Utils.Storage.remove("Login.loginSecret");
		MiTrendz.Utils.Storage.set("Login.userId");
		//Let's now send signal to terminate all current views and go the login page.
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "getStartedView";
		signalEvent.nextView.source = "mainCloudView";
		signalEvent.nextView.destroyViews = "allOthers";
		enyo.Signals.send("onChangeView", signalEvent);
		
	}
	
});