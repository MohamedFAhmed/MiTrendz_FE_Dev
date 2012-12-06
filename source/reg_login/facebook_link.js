enyo.kind({
	name: "MiTrendz.FacebookLink",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes:"registrationPage",
	components: [
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%; text-align:center;", components : [	
		{kind: "FittableRows", fit: true, style :"height:100%; background:black; text-align:center;", components:[
			{tag : "br"},{tag : "br"},{tag : "br"},{tag : "br"},
			{content :"Almost there - Last Step", classes:"reg_title"},
			{tag : "br"},{tag : "br"},{tag : "br"},
			//{kind:"FittableColumns", style:"width: 400px; text-align:center;", components :[
			{kind : "Image", classes:"", src : "assets/images/facebook_logo.jpg", style: "height:75px; width:75px;"},
			{content :"To start rediscovering what your friends are talking about and get more out of their topics  you need to link your Facebook account with ours. We don't see or get access your Facebook password!", allowHTML: true, style:"color: white; font-size:20px; width:400px;text-align:center; margin-left:auto; margin-right:auto;", classes: ""},
			//]},
			{tag : "br"},{tag : "br"},
			{kind:"onyx.Button", content: "Sure, let's do it", classes:"reg_button", ontap:"fblinkTapped"},
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
        
		// console.log('loaded'); // this gets called when dynamic1.js is loaded
//});
        // this.$ hash available only *after* calling inherited create
    },
    destroy: function() {
        // do inherited teardown
        this.inherited(arguments);
    },
	render : function(nextView, inData){
		this.inherited(arguments);
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
		MiTrendz.Utils.Storage.set("Login.loginSecret", inResponse.LoginSecret);
		MiTrendz.Utils.Storage.set("Login.UserId", inResponse.ID);
		var loginUrl = 'https://www.facebook.com/dialog/oauth?client_id=123833051027242&redirect_uri=http://www.MiTrendz.com/SilverlightFacebookCallback.aspx&state=30'
		var scope = 'user_about_me,read_stream,publish_stream,offline_access,read_insights,user_photos,friends_photos,user_videos,user_likes,user_interests,user_location,read_friendlists';
		loginUrl += '&scope=' + scope;
		top.location.href= loginUrl; 
		// var signalEvent = new Object();
		// signalEvent.nextView = new Object();
		// signalEvent.nextView.name = "facebookLoginView";
		// signalEvent.nextView.source = "facebookLinkView";
		// signalEvent.nextView.destroyViews = "allOthers";
		// enyo.Signals.send("onChangeView", signalEvent);
		
	}
	
	
});
