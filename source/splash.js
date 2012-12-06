/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.Splash",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	style :"background: black;",
	published : {
		nextView : null,
		name : "splashView"
	},
    
	components : [
	{name: "cloudLoadingSpinner", kind: "enyo.Popup", classes:"loadingPopup" ,autoDismiss: false, centered: true, floating: true, scrim: false, components: [
		{kind: "onyx.Spinner"},
		{content : "Loading", style:"color: white; font-size: 30px; text-align: center;"}
	]},
	{content : "font loading", style : "font-family: 'HaettenschweilerRegular'; color: transparent;"}
	],
    create: function() {
        this.inherited(arguments);
    },
	
	render: function(){
		this.inherited(arguments);
		//this.$.cloudLoadingSpinner.show();
		
	},
	rendered : function(){
		this.inherited(arguments);
		this.$.cloudLoadingSpinner.show();
		// var loginData = this.getLoginData();
		// if (loginData == null){
			// //we should go to the registration page.
			// var signalEvent = new Object();
			// signalEvent.nextView = new Object();
			// signalEvent.nextView.name = "getStartedView";
			// signalEvent.nextView.source = "splashView";
			// signalEvent.nextView.destroyViews = "allOthers";
			// this.nextView = signalEvent.nextView;
			// enyo.Signals.send("onChangeView", signalEvent);
		// }
		// else{
			// //this.getCloud(loginData.userId);
			// var signalEvent = new Object();
			// signalEvent.nextView = new Object();
			// signalEvent.nextView.name = "mainCloudView";
			// signalEvent.nextView.source = "splashView";
			// signalEvent.nextView.destroyViews = "allOthers";
			// signalEvent.inData = loginData;
			// this.nextView = signalEvent.nextView;
			// enyo.Signals.send("onChangeView", signalEvent);
		// }		
	},
	renderView : function(){
		this.$.cloudLoadingSpinner.show();

	},
	getLoginData : function(){
		//steps:
		//1- Check if we have the login secret and userID
		//2- return true if we have them
		//3- otherwise return false
		var loginData = new Object();
		loginData.loginSecret = MiTrendz.Utils.Storage.get("Login.loginSecret");
		if (loginData.loginSecret != null){
			loginData.userId = MiTrendz.Utils.Storage.get("Login.userId");
		}
		else{
			return null;
		}
		
		return loginData;
	},
	controlTapped : function(){
	},
	hideLoadingSpinner : function(){
		this.$.cloudLoadingSpinner.hide();
	}
	
});
