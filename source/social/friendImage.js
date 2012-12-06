enyo.kind({
	name: "MiTrendz.FreindImage",
	kind: "Control",
	tag: "div",
	fit: true,
	classes: "friendLike",
	curView : null,
	friendObject : null,
	cloudInfo : null,
	handlers: {
		ontap: "friendImageTapped"
	},
	components: [
	{kind: "onyx.TooltipDecorator", style : "display:inline;" , components: [
		{name: "friendPhoto", classes:"friendPicture", kind : "Image", src:"assets/icons/trend_image_loader.gif"},
		{name: "postsCount" , kind: "onyx.Tooltip", content: ""}
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
	
		if (inData != null){
		}
		
		this.curView = new Object();
		if (sourceView != null){
			this.curView.source = sourceView.name;
		}
		else{
			this.curView.source = "mainCloudView";
		}
		this.curView.name = sourceView.name;
		this.curView.destroyView = sourceView.destroyView;
		
		this.friendObject = inData.friendObject;
		this.cloudInfo = inData.cloudInfo;
		
		this.$.friendPhoto.setSrc(this.friendObject.ProfileImageUrl);
		this.$.postsCount.setContent("Total posts: " + this.friendObject.postsCount);
	},
	rendered: function() {
		// important! must call the inherited method
		this.inherited(arguments);  
		
	},
	friendImageTapped : function(){
		var signalEvent = new Object();
			signalEvent.nextView = new Object();
			signalEvent.nextView.name = "fullfriendView";
			signalEvent.nextView.source = "mainCloudView";
			signalEvent.nextView.destroyViews = "none";
			signalEvent.inData = new Object();;
			signalEvent.inData.friendInfo = this.friendObject;
			signalEvent.inData.cloudInfo = this.cloudInfo;
			enyo.Signals.send("onChangeView", signalEvent);

	}
	
	
});