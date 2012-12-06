enyo.kind({
	name: "MiTrendz.ForgotPassword",
	kind: "Control",
	tag: "div",
	classes:"registrationPage",
	components: [
	{kind: "FittableColumns", fit: true, style: "height:100%, width:100%;", components :[
		{kind : "FittableRows", style : "height:100%; width:60%;", components: [ 
			{kind: "onyx.TooltipDecorator", style: "margin: 3px; height:10%;",components: [
				{kind: "onyx.IconButton",
					src: "assets/back.png", style: "", ontap: "goBackTapped"},
				{kind: "onyx.Tooltip", content: "Back"}
			]},
			{kind : "Control", style : "height:90%; margin: 30px; text-align:center; font-size:40px;", Content : "Recover your password"}
		]},
		{kind: "FittableRows",  style :"height:100%; width: 40%; text-align:center;", components:[
			{kind: "Control", style :"height: 40%;", content :"Recover your password" },
			{name: "forgotPasswordValidation", showIcon : false, kind:"MiTrendz.Forms.ValidationResult"},
			{kind:"Control", style :"height:60%; width:100%;", components :[
				{kind: "onyx.InputDecorator", classes: "reg_input_decorator", components: [
					{name:"email", kind: "onyx.Input" , classes: "reg_input", placeholder: "Enter your e-mail", onchange:"emailInputChanged"}
				]},
				{name: "emailValidation", kind:"MiTrendz.Forms.ValidationResult"},
				{tag : "br"},
				{kind:"onyx.Button", content: "e-mail my password", classes:"reg_button", ontap:"forgotPasswordButtonTapped"},
			]}
		]}		
	]},
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
	render : function(inData, nextView){
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
	emailInputChanged : function(inSender, inEvent){
		if (this.$.email.getValue().length == 0){
			this.$.emailValidation.resetValidationMessage();
			return;
		}
		if (!this.validEmail(this.$.email.getValue())){
			this.$.emailValidation.setInvalidInputMessage("Invalid e-mail address!");
			return;
		}
		else{
			this.$.emailValidation.setValidInputMessage("E-mail looks good");
			
		}
	},
	validEmail: function (email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	forgotPasswordDone : function(inSender, inResponse){
		if (inResponse == true){
			this.$.forgotPasswordValidation.setValidInputMessage("password sent to your e-mail address");
		}
		else{
			this.$.forgotPasswordValidation.setInvalidInputMessage("we don't have this e-mail in our records");
		}
	},
	goBackTapped : function(){
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "loginView";
		signalEvent.nextView.source = "forgotPasswordView";
		signalEvent.nextView.destroyViews = "source";
		enyo.Signals.send("onChangeView", signalEvent);
		return true;
	},
	forgotPasswordButtonTapped : function(inSender, inEvent){
		if (this.$.emailValidation.validInput){
			var emailcheckAjax = new enyo.JsonpRequest({
				url: 'http://98.225.46.100:20000/Users?email=' +  this.$.email.getValue() + '&password=&format=json', 
				callbackName: "callback"
			});
			// send parameters the remote service using the 'go()' method
			emailcheckAjax.go();
			// attach responders to the transaction object
			emailcheckAjax.response(this, "forgotPasswordDone");
		}
	}
});
