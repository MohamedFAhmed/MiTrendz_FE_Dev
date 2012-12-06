enyo.kind({
	name: "MiTrendz.Login",
	kind: "Control",
	tag: "div",
	fit: true,
	classes:"registrationPage",
	components: [
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%; text-align:center;", components : [	
		{kind: "FittableRows", fit: true, style :"height:100%; background:black; text-align:center;", components:[
				{kind: "onyx.TooltipDecorator", style: "margin: 3px;",components: [
					{kind: "onyx.IconButton",
						src: "assets/back.png", style: "", ontap: "goBackTapped"},
					{kind: "onyx.Tooltip", content: "Back"}
				]},
				{tag : "br"},{tag : "br"},
				{content :"Already have an account!", classes:"reg_title"},
				{tag : "br"},
				{name: "loginValidation", showIcon : false, kind:"MiTrendz.Forms.ValidationResult"},
				{tag : "br"},
				{kind: "onyx.InputDecorator", name:"username_decorator", classes: "reg_input_decorator", style:"", components: [
					{name: "email", kind: "onyx.Input", classes: "reg_input", placeholder: "Enter a Username or e-mail", onfocus: "username_focused", onblur:"username_focused", onchange:"emailInputChanged"}
				]},
				{name: "emailValidation", kind:"MiTrendz.Forms.ValidationResult"},
				{tag : "br"},
				{kind: "onyx.InputDecorator", classes: "reg_input_decorator", components: [
					{name: "password", kind: "onyx.Input" , classes: "reg_input", placeholder: "Enter password", type:"password",  onchange:"inputChanged"}
				]},
				{name: "passwordValidation", kind:"MiTrendz.Forms.ValidationResult"},
				{tag : "br"},
				{kind:"onyx.Button", content: "Login", classes:"reg_button", ontap:"loginTapped"},
				{tag : "br"},
				{kind:"onyx.Button", content: "Recover Password", classes:"reg_button", ontap:"recoverPasswordTapped"},
				
		]}
	]}
	],
	    constructor: function() {
        // low-level or esoteric initialization, usually not needed at all
        this.inherited(arguments);
    },
    create: function() {
        // create is called *after* the constructor chain is finished
        this.inherited(arguments);
        // this.$ hash available only *after* calling inherited create
    },
	render : function(inData, sourceView){
		this.inherited(arguments);
	  	this.nextView = new Object();
		if (sourceView != null){
			this.nextView.name = sourceView.source;
		}
		else{
			this.nextView.name = "getStartedView";
		}
		this.nextView.source = this.name;
		this.nextView.destroyViews = "allOthers";
	},
    destroy: function() {
      this.inherited(arguments);
    },
	rendered: function() {
		// important! must call the inherited method
		this.inherited(arguments);  
	},
	emailInputChanged : function(inSender, inEvent){
		
		if (this.$.email.getValue().length == 0){
			this.$.emailValidation.resetValidationMessage();
			return;
		}
		if (!this.validEmail(this.$.email.getValue())){
			this.$.emailValidation.setInvalidInputMessage("Invalid e-mail address!");
		}
		else{
			this.$.emailValidation.resetValidationMessage();
			this.$.emailValidation.setInputValidity(true);
		}
	},
	validEmail: function (email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	loginTapped : function(){
		this.emailInputChanged(); //just in case user inserted valid e-mail and directly clicked on login button
		if (this.allInputsValid()){
			var jsonp = new enyo.JsonpRequest({
				url: 'http://98.225.46.100:20000/Users?email=' + this.$.email.getValue() + '&password=' + this.$.password.getValue() + '&format=json', 
				callbackName: "callback"});
			jsonp.go();
			jsonp.response(this, "userLoginDone");
		}
	},
	allInputsValid : function(){
		var allValid = false;
		if (this.$.emailValidation.validInput){
			allValid = true;
		}
		return allValid; 
	},
	userLoginDone : function(inSender, inResponse){
		if (inResponse.LoginSecret == null){
			this.$.loginValidation.setInvalidInputMessage("incorrect username or password!");
		}
		else{
			//save user settings to the localstorage
			// MiTrendz.Utils.Storage.set("Login.loginSecret", inResponse.LoginSecret);
			// MiTrendz.Utils.Storage.set("Login.userId", inResponse.ID);
			
			MiTrendz.Settings.saveUserLoginAndSettings(inResponse);
			
			var userSettings = MiTrendz.Settings.retrieveUserLoginAndSettings();
			if (userSettings.authorizedFacebook == "true"){
				var signalEvent = new Object();
				signalEvent.nextView = new Object();
				signalEvent.nextView.name = "mainCloudView";
				signalEvent.nextView.source = "loginView";
				signalEvent.nextView.destroyViews = "source";
				signalEvent.inData = userSettings;
				enyo.Signals.send("onChangeView", signalEvent);
			}
			if (userSettings.authorizedFacebook == "false"){	
				var signalEvent = new Object();
				signalEvent.nextView = new Object();
				signalEvent.nextView.name = "facebookLinkView";
				signalEvent.nextView.source = "loginView";
				signalEvent.nextView.destroyViews = "source";
				signalEvent.inData = userSettings;
				enyo.Signals.send("onChangeView", signalEvent);
			}
			if (userSettings.validFacebookToken == "false"){
				//should go to a page to reauthorize facebook access.
			}
			
			
			// var signalEvent = new Object();
			// signalEvent.viewName = "";
			
		}
	},
	goBackTapped : function(){
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "getStartedView";
		signalEvent.nextView.source = "loginView";
		signalEvent.nextView.destroyViews = "allOthers";
		enyo.Signals.send("onChangeView", signalEvent);
		return true;
	},
	recoverPasswordTapped : function(inSender, inEvent){
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "forgotPasswordView";
		signalEvent.nextView.source = "loginView";
		signalEvent.nextView.destroyViews = "none";
		enyo.Signals.send("onChangeView", signalEvent);
	},
	
	
});
