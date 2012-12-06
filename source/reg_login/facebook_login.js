enyo.kind({
	name: "MiTrendz.FacebookLogin",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes:"registrationPage",
	components: [
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%; text-align:center;", components : [	
		{kind: "FittableRows", fit: true, style :"height:100%; background:black; text-align:center;", components:[
			{name: "fbLogin", kind:"Control", tag: "iframe",	classes: "", style: "border: none; width:100%; height:100%;"},
			{tag : "br"},{tag : "br"},
			{kind:"onyx.Button", content: "Logout", classes:"reg_button", ontap:"logoutTapped"},
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
    },
    destroy: function() {
        // do inherited teardown
        this.inherited(arguments);
    },
	render : function(nextView, inData){
		this.inherited(arguments);
		
			//this.$.fbLogin.setSrc(loginUrl);
		
	},
	logoutTapped : function (){
		MiTrendz.Settings.removeSettings();
		//Let's now send signal to terminate all current views and go the login page.
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "getStartedView";
		signalEvent.nextView.source = "facebookLinkView";
		signalEvent.nextView.destroyViews = "allOthers";
		enyo.Signals.send("onChangeView", signalEvent);
	},
	facebookAPIsLoaded : function(){
		var i=0;

	},
	rendered: function() {
    // important! must call the inherited method
    this.inherited(arguments);  
	},
	fblinkTapped : function(){
		var signalEvent = new Object();
		signalEvent.viewName = "mainCloudView";
	enyo.Signals.send("onChangeView", signalEvent);
		//this.parent.setIndex(3);
	}
	
	
});
