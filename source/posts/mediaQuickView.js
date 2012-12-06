/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.MediaQuickView",
	kind: "Control",
	layoutKind: "FittableRowsLayout",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "quickMediaView",
	showFriendImage : true,
	curView : null,
	handlers: {
		ontap: "controlTapped"
	},
	published :{
		mediaObject : null,
		friendInfo : null,
		postIdInNetwork : 0,
	},
    style: "",
	components : [
	//{name: "postTitle", classes :"postTitle", content :""},
	//{kind : "FittableColumns", noStretch:true, style: "width: 100%; padding: 5px; text-align: center; ", components : [
		{name :"imageContainer", classes: "imageContainer", kind :"Control", components : [
			//{kind:"Image", name:"postImage", classes:"mediaImage", fit : true, src : "assets/mockups/post_pic.jpg" },
			{kind :"Control", style:"position: absolute; bottom:0; width:100%; background: rgba(0,0,0,0.8);", components :[
				{kind: "FittableColumns",  style: "", components: [
					{kind : "Image", name:"friendImage", classes:"friendImage", style:"width:40px; height:40px;", src : "assets/mockups/friend_pic.jpg" },
					{kind: "FittableRows", fit: true, style : "margin: 4px;", components: [
						{name: "friendName", classes:"whitefriendName", content : "Friend Name"},
						{name: "friendComment", classes: "whitefriendComment", allowHtml: true, content : ""}
					]}
				]},
			]},
		]}
		//{name:"postSnipit", classes:"postSnipit", 
		//content: "If you weren’t up at midnight last night to pre-order your iPhone 5, you may have to wait up to two weeks after the phone’s  September 21 release date to receive it. It only took an hour after iPhone 5 pre-orders began for Apple’s website to show the two week shipping estimate, according to MacRumors."}
	//]},
	//{name: "socialBar", kind:"MiTrendz.SocialBar"}
	],

	
	 render: function(inData, curView){
		if (inData != null){
			this.mediaObject = inData.postObject;
			this.friendInfo = inData.friendInfo;
			this.postIdInNetwork = inData.postIdInNetwork;
		}
		if (curView != null){
			this.curView = curView;
		}
	 
		this.inherited(arguments);
		
		
	 },
	rendered : function(){
		this.inherited(arguments);
		if (this.mediaObject != null){
			if (this.mediaObject.postType == "photo"){
				this.$.imageContainer.addStyles("background-image: url(" + this.mediaObject.IconUrl + ")");
				//this.$.postImage.setSrc();
			}
			else{ //it's a video
				this.$.imageContainer.addStyles("background-image: url(" + this.mediaObject.IconUrl + ")");
				//this.$.postImage.setSrc(this.mediaObject.PreviewImageUrl);
				var playIcon = this.$.imageContainer.createComponent({kind:"Image", src : "assets/icons/play.png", style: "position: absolute; top:50%; left: 50%; width:32px; height:32px; z-index: 100; opacity:0.4;  margin-top: -16px;    margin-left: -16px;"});
				playIcon.render();
			}
			if (this.mediaObject.postType == "video"){
				
			}
			if (this.mediaObject.hasOwnProperty('FriendComment')){
				if(this.mediaObject.FriendComment.length > 0){
					var friendComment = this.mediaObject.FriendComment.replace( /(http:\/\/[^\s]+)/gi , '' );
					//friendComment = friendComment.replace( /(http:\/\/[^\s]+)/gi , '<a href="$1" target="_blank">$1</a>' );
					friendComment = MiTrendz.Utils.Strings.truncate(friendComment, 60, true);
					
					this.$.friendComment.setContent(friendComment);
				}
				else{
					var frndComment = this.$.friendComment;
					if (frndComment != null){
						this.removeComponent(this.$.friendComment);
					}
				}
			}
			//this.$.postImage.render();
		}
		if (this.friendInfo != null){
			this.$.friendImage.setSrc(this.friendInfo.ProfileImageUrl);
			this.$.friendName.setContent(this.friendInfo.Name);
		}
		//this.$.socialBar.postObject = this.mediaObject;
		//this.$.socialBar.initializeBar();
		//this.$.cloudLoadingSpinner.show();
	},
	animatedHide : function(){
		//this.removeClass('postSummary');
		//this.addClass('postSummaryHidden');
		this.hide();
		
	},
	controlTapped : function(){
		var signalEvent = new Object();
		signalEvent.nextView =  new Object();
		signalEvent.nextView.name = "fullPostView";
		signalEvent.nextView.source= this.curView.name;
		signalEvent.nextView.destroyView = "source";
		
		signalEvent.inData = new Object();
		signalEvent.inData.postObject = this.mediaObject;
		signalEvent.inData.friendInfo = this.friendInfo;
		enyo.Signals.send("onChangeView", signalEvent);
		return; 

	}
	
});
