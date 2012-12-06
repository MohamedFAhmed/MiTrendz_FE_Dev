enyo.kind({
	name: "MiTrendz.Registration",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes:"registrationPage",
	components: [
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%; text-align:center;", components : [	
		{kind: "FittableRows", style :"height:100%; width: 800px; text-align:left; margin-left: auto; margin-right:auto;", components:[
			{tag : "br"},{tag : "br"},
			{content :"First Time to Use it?", classes:"reg_title"},
			{tag : "br"},
			{content :"We think you will like it!", classes:"reg_title"},
			{kind: "onyx.InputDecorator", name:"username_decorator", classes: "reg_input_decorator", style:"", components: [
				{name: "realName", kind: "onyx.Input", classes: "reg_input", placeholder: "Enter your name", onfocus: "username_focused",onblur:"username_lostfocus", onchange:"nameInputChanged"}
			]},
			{name: "realNameValidation", kind: "MiTrendz.Forms.ValidationResult" },
			{tag : "br"},
			//{kind :"FittableColumns", fit: false, style:"position: relative; text-align:center;", components: [
				{name: "emailDecorator", kind: "onyx.InputDecorator",  classes: "reg_input_decorator", components: [
					{name :"email", kind: "onyx.Input" , style:"", classes: "reg_input", placeholder: "Enter your e-mail address", type:"email", onchange:"onEmailEntered"},
					
				]},
				{name: "emailValidation", kind: "MiTrendz.Forms.ValidationResult" },
			//]},
			{tag : "br"},
			{kind: "onyx.InputDecorator", classes: "reg_input_decorator", components: [
				{name:"password",kind: "onyx.Input" , classes: "reg_input", placeholder: "Enter password", type:"password",  oninput:"onPasswordInput"},
			]},
			{name: "passwordValidation", kind: "MiTrendz.Forms.ValidationResult" },
			{tag : "br"},
			{kind:"onyx.Button", content: "Register", classes:"reg_button", ontap:"registrationButtonTapped"},

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
    destroy: function() {
        // do inherited teardown
        this.inherited(arguments);
    },
	render: function(){
		this.inherited(arguments);  
	},
	rendered: function() {
    // important! must call the inherited method
    this.inherited(arguments);  
	},
	createCloudTapped : function(){
		this.hide();
	},
	username_focused : function(){
	this.$.username_decorator.addClass("reg_input_decorator_focused");
	},
	
	username_lostfocus : function(){
		this.$.username_decorator.removeClass("reg_input_decorator_focused");
	},
	nameInputChanged : function(){
		this.$.realNameValidation.setValidInputMessage("Name looks greate!");
	},
	onEmailEntered : function(){
		//Let's check the availability of this one
		var email = this.$.email.getValue();
		if (email.length == 0){
			this.$.emailValidation.resetValidationMessage();
			return;
		}
		if (!this.validEmail(email)){
			this.$.emailValidation.setInvalidInputMessage("Invalid e-mail address!");
			return;
		}
		else{
			this.$.realNameValidation.setValidInputMessage("e-mail looks good!");
		}
		var ajaxloader = this.$.emailDecorator.createComponent({name:"ajaxLoader", kind: "Image", src: "assets/icons/ajax_loader_white_background.gif"});
		ajaxloader.render();
		
		var emailcheckAjax = new enyo.JsonpRequest({
			url: 'http://98.225.46.100:20000/Users?email=' +  email + '&format=json', 
			callbackName: "callback"
		});
		// send parameters the remote service using the 'go()' method
		emailcheckAjax.go();
		// attach responders to the transaction object
		emailcheckAjax.response(this, "onEmailChecked");
    // do something in response
	},
	onEmailChecked : function(inSender, inResponse){
		if (inResponse == true){
			this.$.emailDecorator.addClass("reg_input_decorator_error");
			this.$.emailDecorator.$.ajaxLoader.destroy();
			this.$.emailValidation.setInvalidInputMessage("E-mail already used");
			
		}
		else{
			this.$.emailDecorator.removeClass("reg_input_decorator_error"); //just in case we previously added it
			this.$.emailDecorator.addClass("reg_input_decorator_ok"); //just in case we previously added it
			this.$.emailValidation.setValidInputMessage("E-mail looks good!");
			this.$.emailDecorator.$.ajaxLoader.destroy();
		}
		
		
	},
	onPasswordInput : function(inSender, inEvent){
		var password = this.$.password.getValue();
		
		if (password == null){
			this.$.passwordEval.setContent("");
			this.$.passwordValidation.resetValidationMessage();
			return;
		}
		else{
			var evalResult = MiTrendz.Utils.Password.testPassword(password);
			if (evalResult.score < 16){
				this.$.passwordValidation.setInvalidInputMessage(evalResult.verdict);	
				return;
			}
			if ((evalResult.score > 15) && (evalResult.score <= 25)){
				this.$.passwordValidation.setInputValidationMessage(evalResult.verdict);	
				return;
			}
			else{
				this.$.passwordValidation.setValidInputMessage(evalResult.verdict);	
				return;
			}
			
		}
		
	},
	registrationButtonTapped : function(){
		//steps:
		//1- Get form's data
		//2- make ajax call to the server
		//3- once call is successful, move to the facebooklinkView
		//string name, string email, string password)
		if (this.allInputsValid()){

			var jsonp = new enyo.Ajax({
			url: 'http://98.225.46.100:20000/Users?name=' +  this.$.realName.getValue() + '&email=' + this.$.email.getValue() + '&password=' + this.$.password.getValue() + '&format=json', 
			method: "POST"});
			jsonp.go();
			jsonp.response(this, "userRegistrationDone");
		}
	},
	allInputsValid : function(){
		var allValid = false;
		if ((this.$.passwordValidation.validInput) && (this.$.realNameValidation.validInput) && (this.$.emailValidation.validInput)){
			allValid = true;
		}
		
		
		return allValid; 
	},
	userRegistrationDone : function(inSender, inResponse){
		var i=0;
		//let's now save login data to the local storage
		if (inResponse != null){
			var signalEvent = new Object();
			 signalEvent.nextView = new Object();
			 signalEvent.nextView.name = "facebookLinkView";
			 signalEvent.nextView.source = this.name;
			 signalEvent.nextView.destroyView = "allOthers";
		}
		
		
		//enyo.Signals.send("onChangeView", signalEvent);
	},
	goToLoginButtonTapped : function (){
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "loginView";
		signalEvent.nextView.source = this.name;
		signalEvent.nextView.destroyView = "source";
		
		enyo.Signals.send("onChangeView", signalEvent);

	},
	validEmail: function (email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
	
});
