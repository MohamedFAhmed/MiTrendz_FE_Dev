enyo.kind({
    name: "App",
    kind: "Control",
    fit: true,
    narrowFit: false,
    classes: "app-panels",
    arrangerKind: "CollapsingArranger",
	draggable: true,
	activePanelIndex : 0,
	navigationStack : null,
	toBeDestroyedViews : null,
	published : {
		CloudInfo : null,
		UserSettings : null,
	},
	handlers: {
		
	},
	components: [
	{name: "panels", kind : "Panels",  realtimeFit: true, style :"height:100%; width:100%; margin: 0px;",  arrangerKind: "CarouselArranger", margin: 0, fit: true, 
		onTransitionFinish: "viewsTransitionEnd", components: [
			{name: "splashView", kind:"MiTrendz.Splash"},
	]},
		{kind: "Signals", ondeviceready: "deviceReady"},
		{kind: "Signals", onChangeView: "changeView"}
        
    ],
	viewsTransitionStart : function (){
		//this.$.MainPanel.setBounds({width: 100}, "px");
	},
	deviceReady: function() {
	// respond to deviceready event
	},
	viewsTransitionEnd : function (inSender, inEvent){
		var curPanel =  this.$.panels.getActive(); 

		if (curPanel != null){
			if (curPanel.renderView != null){
					curPanel.renderView();
			}
		}

		if (inEvent.fromIndex > inEvent.toIndex){
				var oldPanel = this.$.panels.getPanels()[inEvent.fromIndex];
				if (oldPanel != null){
					this.$.panels.removeComponent(oldPanel);
					oldPanel.destroy();
				}
			
		}
		this.$.panels.reflow();
		return true;
		
	},
	create : function(){
		this.inherited(arguments);
		this.initializeSettings();
		
	},
	initializeSettings : function(){
		MiTrendz.Utils.Storage.set("settings.cloud.fontName", "HaettenschweilerRegular");
		MiTrendz.Utils.Storage.set("settings.cloud.minFontSize", 5);
		MiTrendz.Utils.Storage.set("settings.cloud.fontSizeStep", 10);
		MiTrendz.Utils.Storage.set("settings.subcloud.minFontSize", 8);
		MiTrendz.Utils.Storage.set("settings.subcloud.fontSizeStep", 10);
	},
    statics: {
        isScreenNarrow: function() {
            return enyo.dom.getWindowWidth() <= 1200;
        }
    },
	rendered : function(){
		this.inherited(arguments);
		var nextView = new Object();
		nextView.source = "splashView";
		nextView.destroyView = "allOthers";
		//let's check first if the user has login secret credentials stored in the local storage
		var loginData = MiTrendz.Settings.retrieveUserLoginAndSettings();
		
		if (loginData.loginSecret == null){
			//we should go to the registration page.
			nextView.name= "getStartedView";
			this.moveToView(nextView, null);
		 }
		 else{
			if (loginData.authorizedFacebook == "false"){
				nextView.name= "facebookLinkView";
			}
			if (loginData.validFacebookToken == "false"){
				nextView.name= "facebookLinkView";	//should be a different page..... later
			}
			else if ((loginData.validFacebookToken == "true") && (loginData.authorizedFacebook == "true")){
				nextView.name= "mainCloudView";
			}
			 this.moveToView(nextView, loginData);
		 }
	},
	getViewIndex : function(viewName){
		var createdPanels = this.$.panels.getPanels();
		var maxCount = createdPanels.length;
		for(var i=0; i < maxCount; i++)
		{
			if (createdPanels[i].name.toLowerCase() == viewName.toLowerCase()){
				return i;
			}
		}
		
		return -1;
	},
	
	removeViewsButThis: function(viewName){
		var activePanels = this.$.panels.getPanels();
		var panelsCount = activePanels.length;
		var victimPanels = new Array();
		for(var i=0; i < panelsCount; i++){
			if (activePanels[i] != null){
				if (activePanels[i].name.toLowerCase() != viewName.toLowerCase()){
					victimPanels.push(activePanels[i]);
				}
			}
		}
		for(var i=0; i< victimPanels.length; i++){
			this.$.panels.removeComponent(victimPanels[i]);
			victimPanels[i].destroy();
		}
	},
	removeView: function(viewName){
	var activePanels = this.$.panels.getPanels();
		var panelsCount = activePanels.length;
		for(var i=0; i < panelsCount; i++){
			if (activePanels[i] != null){
				if (activePanels[i].name.toLowerCase() == viewName.toLowerCase()){
					this.$.panels.removeComponent(activePanels[i]);
					activePanels[i].destroy();
				}
			}
		}
	},
	moveToView : function(nextView, inData){
		var targetViewIndex = this.getViewIndex(nextView.name);
		if (targetViewIndex == -1){
			var targetView = null;
			if (nextView.name == "getStartedView"){
				targetView = this.$.panels.createComponent({name: "getStartedView", fit:true,  kind: "MiTrendz.GetStarted"});
				this.removeViewsButThis(nextView.name);
			}
			if (nextView.name == "loginView"){
				targetView = this.$.panels.createComponent({name: "loginView", fit:true,  kind: "MiTrendz.Login"});
				
			}
			if (nextView.name == "facebookLinkView"){
				targetView = this.$.panels.createComponent({name: "facebookLinkView", fit:true,  kind: "MiTrendz.FacebookLink"});
				this.removeViewsButThis(nextView.name);
			}
			if (nextView.name == "mainCloudView"){
				targetView = this.$.panels.createComponent({name: "mainCloudView", fit:true,  kind: "MiTrendz.Cloud"});
				this.removeViewsButThis(nextView.name);
			}
			if(nextView.name == "fullfriendView"){
				targetView= this.$.panels.createComponent({name: "fullfriendView", kind: "MiTrendz.FriendFullView"});
			}
			if(nextView.name == "subCloudView"){
				targetView = this.$.panels.createComponent({name: "subCloudView", kind: "MiTrendz.SubCloud"});
			}
			if(nextView.name == "fullPostView"){
				targetView = this.$.panels.createComponent({name: "fullPostView", kind: "MiTrendz.FullPost"});
			}
			if(nextView.name == "RegistrationView"){
				targetView = this.$.panels.createComponent({name: "registrationView", fit:true,  kind: "MiTrendz.Registration"});
			}
			if(nextView.name == "forgotPasswordView"){
				targetView = this.$.panels.createComponent({name: "forgotPasswordView", fit:true,  kind: "MiTrendz.ForgotPassword"});
			}
			if (nextView.name == "facebookLoginView"){
				targetView = this.$.panels.createComponent({name: "facebookLoginView", fit:true,  kind: "MiTrendz.FacebookLogin"});
			}
		
			targetView.name = nextView.name;
			targetView.render(inData, nextView);			
			this.$.panels.setIndex(this.$.panels.getPanels().length -1);
		}
		else{
			this.$.panels.setIndex(targetViewIndex);	
		}
	},
	changeView : function(inSender, inEvent){
		if (inEvent.nextView != null){
			this.nextView = inEvent.nextView;
			this.moveToView(inEvent.nextView, inEvent.inData);
			return;
		}
	}
});