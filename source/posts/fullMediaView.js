enyo.kind({
	name: "MiTrendz.FullMediaView",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "postFullView",	
	//style : "display:inline;",
    handlers: {
		//ondrag : "goBackTapped"
      //  ondown: "downHandler",
       // onup: "upHandler"
    },
	published: {
		prevViewName : "mainCloudView",
		mediaObject : null, 
		friendInfo : null
	},
	components : [
	//{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%;", components : [
		{ kind : "FittableRows", fit: true, classes:"", components : [
			{name : "mediaContainer", fit: true, kind: "Control", style:"height: 70%; margin:10px;	text-align: center;", components : []},
			//{kind: "FittableColumns", fit :true, components: [
				{name :"friendComment", style: "font-size: 12px; margin:5px;", allowHtml: true, Content: ""},
				{name :"postTime", style: "font-size: 12px; margin:5px;", Content: ""},
			//]},
			
			
		]},
		
	//]}, 
	
	
	],
    create: function() {
        this.inherited(arguments);
		//this.$.cloudLoadingSpinner.show();
       
    },
	
	
	render: function(){
		this.inherited(arguments);
		
	},
	rendered : function(){
		this.inherited(arguments);
		if (this.mediaObject != null){
			if (this.mediaObject.postType == "photo"){
				var photo = this.$.mediaContainer.createComponent({name: "mediaImage", kind:"Image", src : this.mediaObject.IconUrl, classes :"fullPhoto"});
				photo.render();
				if (this.mediaObject.FriendMessage.length == 0){
					if (this.mediaObject.OriginalComment.length == 0){
						this.removeComponent(this.$.friendComment);
					}
					else{
						this.$.friendComment.setContent(this.mediaObject.OriginalComment.replace( /(http:\/\/[^\s]+)/gi , '<a href="$1" target="_blank">$1</a>' ));
					}
				}
				else{
					this.$.friendComment.setContent(this.mediaObject.FriendMessage.replace( /(http:\/\/[^\s]+)/gi , '<a href="$1" target="_blank">$1</a>' ));
				}
				
			this.$.postTime.setContent(MiTrendz.Utils.DateTime.prettyDate(this.mediaObject.PostDate));
			}
			else{ //media is video
				var videoUrl = "";
				if (this.mediaObject.hasOwnProperty('PreviewImageUrl')) {
					videoUrl = this.formatVideoUrl(this.mediaObject.LinkToSharedResource);
				}
				var videoString =   '<iframe class="SMDVideo" src="' + videoUrl + '" height="224" width="400" frameborder="0" allowfullscreen></iframe>';
				var videoComponent = this.$.mediaContainer.createComponent({name :"sharedVideo", allowHtml: true, content : videoString, style :"height=224px; width=400px;"});
				videoComponent.render();
			}
		}
		
	},
	formatVideoUrl : function (str) {
        return str.replace("watch?v=", "embed/");
    },
	goBackTapped : function(){
		var signalEvent = new Object();
		signalEvent.viewName = this.prevViewName;
		signalEvent.prevViewName = "";
		enyo.Signals.send("onChangeView", signalEvent);
	
	}
	
});
