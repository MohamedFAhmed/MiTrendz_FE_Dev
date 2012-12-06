enyo.kind({
	name: "MiTrendz.GetStarted",
	kind: "Control",
	classes : "getStartedPanel",
	components: [
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%; text-align:center;", components : [	
		{kind: "FittableColumns", fit: true, components :[
			{kind: "Control" , style: "width: 60%;", components: [
				{kind:"Control", style :"color:black; font-size:40px; margin:20px; margin-top: 100px; height:100%;", Content :"Getting Started"},
			]},
			{kind: "FittableRows", style :"height:100%; width: 40%; text-align:left; margin-left: auto; margin-right:auto;", components:[
				{Content:"", style : "height: 200px"},
				{tag : "br"},
				{kind:"onyx.Button", content: "Register", classes:"reg_button", ontap:"RegistrationButtonTapped"},
				{tag : "br"},
				{kind:"onyx.Button", content: "Login", classes:"reg_button", ontap:"goToLoginButtonTapped"}
			]}
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
		this.nextView.destroyViews = "source";
	},
	rendered: function() {
    // important! must call the inherited method
    this.inherited(arguments);  
	},
	goToLoginButtonTapped : function (){
	
		var signalEvent = new Object();
		signalEvent.nextView =  new Object();
		signalEvent.nextView.name = "loginView"
		signalEvent.nextView.source= this.name;
		signalEvent.nextView.destroyView = "none";
		enyo.Signals.send("onChangeView", signalEvent);
		
	},
	RegistrationButtonTapped : function (){
	
		var signalEvent = new Object();
		signalEvent.nextView =  new Object();
		signalEvent.nextView.name = "RegistrationView"
		signalEvent.nextView.source= this.name;
		signalEvent.nextView.destroyView = "none";
		enyo.Signals.send("onChangeView", signalEvent);
		
	},
	
});
