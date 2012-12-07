enyo.kind({
	name: "MiTrendz.TrendingPhoto",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes:"friendLike",
	published : {
		photoObject : null,
		friendInfo : null,
		cloudInfo : null
	},
	handlers: {
		ontap: "trendingPhotoTapped"
	},
	components: [
	{kind: "onyx.TooltipDecorator", style : "display:inline;" , components: [
		{name: "trendPhoto", classes:"trendingPhoto", kind : "Image", src:"assets/icons/trend_image_loader.gif"},
		//{name: "postsCount" , kind: "onyx.Tooltip", content: ""}
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
	rendered: function() {
		// important! must call the inherited method
		this.inherited(arguments);  
		if (this.photoObject.hasOwnProperty("IconUrl")){
			this.$.trendPhoto.setSrc(this.photoObject.IconUrl);
		}
		if (this.photoObject.hasOwnProperty("LinkThumpImage")){
			this.$.trendPhoto.setSrc(this.photoObject.LinkThumpImage);
		}
		//this.$.postsCount.setContent("Total Likes: " + this.photoObject.LikesCount);
	},
	trendingPhotoTapped : function(){
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "fullPostView";
		signalEvent.nextView.source = "mainCloudView";
		signalEvent.nextView.destroyViews = "none";
		signalEvent.inData = new Object();;
		signalEvent.inData.postObject = this.photoObject;
		signalEvent.inData.friendInfo = this.friendInfo;
		
		// signalEvent.viewName = "fullPostView";
		// signalEvent.prevViewName = "mainCloudView";
		// signalEvent.data = new Object();
		// signalEvent.data.postObject = this.photoObject;
		// signalEvent.data.friendInfo = this.friendInfo;
		enyo.Signals.send("onChangeView", signalEvent);
		return true;
	}
	
	
});