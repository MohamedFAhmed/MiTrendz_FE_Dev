/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.PostSummary",
	kind: "Control",
	//layoutKind: "FittableRowsLayout",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "postSummary",
	curViewName : "subCloudView",
	handlers: {
		ontap: "controlTapped"
	},
	published :{
		postObject : null,
		friendInfo : null
	},
    style: "",
	components : [
	{kind :"FittableRows", fit: true, components : [
		{name: "postTitle", classes :"postTitle", allowHtml: true, content :""},
		{kind: "FittableColumns",  fit : true, style: "vertical-align:middle; line-height:25px;", components: [
			
			{kind : "Image", name:"friendImage", classes:"friendImage", style:"width:25px; height:25px;", src : "assets/mockups/friend_pic.jpg" },
			{name: "friendName", classes:"friendName", content : "Friend Name"},
			{name: "postTime", classes:"postTime", fit: true, content : "20 minutes ago"},

		]},
		
		{name: "imageContainer", kind : "FittableColumns", noStretch:true, style: "width: 100%;", components : [
			{kind:"Control", name:"postImage", fit:true, classes:"postImage",},
			{kind:"FittableRows", style: "width:60%;", components: [
				{name: "friendComment", classes: "friendComment", allowHtml: true, content : "Friend's Comment"}]},
				{name:"postSnipit", classes:"postSnipit",  allowHtml: true, content: ""},
		]}
	]}
	//{kind:"MiTrendz.SocialBar"}
	],
    // create: function() {
        // this.inherited(arguments);
		// //this.$.cloudLoadingSpinner.show();
       
    // },
	
	 render: function(inData, curView){
		this.curViewName = curView.name;
		this.postObject = inData.postObject;
		this.friendInfo = inData.friendInfo;
		this.postIdInNetwork = inData.postIdInNetwork;
		
		this.inherited(arguments);
		
	 },
	rendered : function(){
		this.inherited(arguments);
		if (this.postObject != null){
			if (this.postObject.postType == "socialPost"){
				if (this.postObject.hasOwnProperty('LinkThumpImage')){
					this.$.postImage.addStyles("background-image: url(" + this.postObject.LinkThumpImage + ")");
				}
				else{
				 this.$.postImage.hide();
				}
				if (this.postObject.hasOwnProperty('LinkSummary')){
					if (this.postObject.LinkSummary.length > 0){
						var postSummary = this.postObject.LinkSummary.replace( /(http:\/\/[^\s]+)/gi , '' );
						postSummary = MiTrendz.Utils.Strings.truncate(postSummary, 300, true);
						this.$.postSnipit.setContent(postSummary);
					}
					else{
						if (this.$.postSnipit != null){
							this.removeComponent(this.$.postSnipit);
						}
						//this.$.imageContainer.setAttribute('text-align': center;
						
				}
				}
				
				if (this.postObject.hasOwnProperty('LinkTitle')){
					if (this.postObject.LinkTitle.length > 0){
						var postTitle = this.postObject.LinkTitle.replace( /(http:\/\/[^\s]+)/gi , '' );
						var postTitle = MiTrendz.Utils.Strings.truncate(postTitle, 35, false);
						this.$.postTitle.setContent(postTitle);
					}
					else{
						if (this.$.postTitle != null){
							this.$.postTitle.destroy();
						}
					}
				}
				if (this.postObject.hasOwnProperty('FriendMessage')){
					if (this.postObject.FriendMessage.length > 0){
						var friendMsg = this.postObject.FriendMessage.replace( /(http:\/\/[^\s]+)/gi , '' );
						friendMsg = MiTrendz.Utils.Strings.truncate(friendMsg, 80, true);
						this.$.friendComment.setContent(friendMsg);
					}
					else{
						if (this.$.friendComment != null){
							this.$.friendComment.destroy();
						}
					}
				}
			}
			
			if (this.postObject.postType == "suggestedArticle"){
				if (this.postObject.hasOwnProperty('ImageLink')){
					this.$.postImage.setSrc(this.postObject.ImageLink);
				}
				else{
				 this.$.postImage.hide();
				}
				if (this.postObject.hasOwnProperty('Summary')){
					if (this.postObject.Summary.length > 0){
						this.$.postSnipit.setContent(this.postObject.Summary.replace( /(http:\/\/[^\s]+)/gi , '<a href="$1" target="_blank">$1</a>' ));
					}
					else{
						if (this.$.postSnipit != null){
							this.removeComponent(this.$.postSnipit);
							//this.$.imageContainer.setAttribute('text-align': center;
						}
					}
				}
				if (this.postObject.hasOwnProperty('Title')){
					if (this.postObject.Title.length > 0){
						this.$.friendComment.setContent(this.postObject.Title.replace( /(http:\/\/[^\s]+)/gi , '<a href="$1" target="_blank">$1</a>' ));
					}
					else{
						if (this.$.friendCommment != null){
							this.removeComponent(this.$.friendComment);
							//this.$.imageContainer.setAttribute('text-align': center;
						}
						
					}
				}
				
				
			}
			
		}
		
		if (this.friendInfo != null){
			this.$.friendImage.setSrc(this.friendInfo.ProfileImageUrl);
			this.$.friendName.setContent(this.friendInfo.Name);
		}
		//this.$.socialBar.postObject = this.postObject;
		//this.$.socialBar.initializeBar();
		//this.$.cloudLoadingSpinner.show();

	},
	animatedHide : function(){
		// this.removeClass('postSummary');
		// this.addClass('postSummaryHidden');
		this.addStyles("width: 0px");
		this.addStyles("height: 0px");
		//this.hide();
		
	},
	controlTapped : function(){
	
	var signalEvent = new Object();
		signalEvent.nextView =  new Object();
		signalEvent.nextView.name = "fullPostView";//this.nextView.name;
		signalEvent.nextView.source= this.curViewName; //this.nextView.source;
		signalEvent.nextView.destroyView = "source"; //this.nextView.destroyView;
		signalEvent.inData = new Object();
		signalEvent.inData.postObject = this.postObject;
		signalEvent.inData.friendInfo = this.friendInfo;
		enyo.Signals.send("onChangeView", signalEvent);
		return; 
	}
	
});
