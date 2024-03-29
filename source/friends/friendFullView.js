enyo.kind({
	name: "MiTrendz.FriendFullView",
	kind: "Control",
	tag: "div",
	fit: true,
	//allowHTML: true, 
	classes: "postFullView",	
	//style : "display:inline;",
	friendPostsWorker : null,
	friendCloudWorker : null,
	friendcloudTags : null,
	friendCloudWidth : 0,
	friendCloudHeight : 0,
	friendCloudCanvas : null,
	colorsTheme : ['#4D4200','#433B08','#3F3600','#796A0F','#796C1B','#003911', '#063213','#002F0E','#0D6A29','#186A31','#4D0A00','#431008','#3F0900', '#791E0F','#79281B','#110034', '#12062E', '#0E002B', '#290D67', '#301767'],
	fontSizeBuffer : 5,
	friendCloudfontName : "HaettenschweilerRegular",	
	
    handlers: {
      //  ondown: "downHandler",
       // onup: "upHandler"
	   //ondragstart :"",
	   //ondragfinish : "goBackTapped"
    },
	published :{
		friendInfo : null,
		cloudInfo : null,
		curView : null,
	},
	components : [
	
	{kind : "FittableRows",  classes:"", style:"height:100%; width:100%;", components : [
		{kind: "onyx.Toolbar",classes:"onyx-menu-toolbar", components: [
			{kind: "FittableColumns", style:"width:100%", components: [
				{kind: "onyx.TooltipDecorator", style: "margin: 3px;",components: [
						{kind: "onyx.IconButton",
							src: "assets/back.png", style: "", ontap: "goBackTapped"},
						{kind: "onyx.Tooltip", content: "Back"}
				]},
				{kind: "Control", fit: true, style:" width:100%; height: 40px; text-align:center;", components: [
						{name: "friendPic", kind:"Image", classes: "smallFriendPic", src :"assets/icons/frnd_pic_loader.gif",  style: ""},
						{name: "friendName", content:"Venture Beat", style: "display: inline; vertical-align: middle; white-space: nowrap; font-size: 25px; color:rgba(255,255,255,0.7); margin-left: 10px;"}
				]},
			]}
		]},
		{kind:"FittableColumns", style:"width:100%; height:100%;", components :[
			{name: "friendCloud", kind:"Control",  style: "width: 50%; height:100%;"},
			{kind: "FittableRows", style:"width:50%; height:100%; background: rgba(0,0,0,0.8);", components : [ 		
				{name : "friendPosts", fit: true, kind:"MiTrendz.PostsList", style:"width: 100%; height:100%; box-shadow: 0px 0px 20px rgba(0,0,0,0.8);"}
			
			]}
		]}
	]} 
	
	
	],
    create: function() {
        this.inherited(arguments);
    },
	
	
	render: function(inData, sourceView){
		this.inherited(arguments);
		
		if (inData != null){
			this.friendInfo = inData.friendInfo;
			this.cloudInfo = inData.cloudInfo;
			
			this.curView = new Object();
			if (sourceView != null){
				this.curView.source = sourceView.source;
			}
			else{
				this.curView.source = "mainCloudView";
			}
			this.curView.name = this.name;
			this.curView.destroyViews = "source";
		}
		
	},
	rendered : function(){
		this.inherited(arguments);

	},
	renderView :function (){
		
		//calculate tags friend generated
		this.drawFriendCloud();
		//calcuate posts generated by the friend
		this.displayRelatedPosts();
		
		//let's show friend info as well
		if (this.friendInfo != null){
			this.$.friendPic.setSrc(this.friendInfo.ProfileImageUrl);
			this.$.friendName.setContent(this.friendInfo.Name);
		}
	},
	drawFriendCloud : function(){
		
		if (this.friendCloudWorker == null){
			this.friendCloudWorker = new Worker("source/friends/thread_friend_cloud.js");
			this.friendCloudWorker.addEventListener("message", this.doneFriendCloudCalc, false);
			this.friendCloudWorker.objref = this;
			this.friendCloudWorker.postMessage({friendPosts : this.friendInfo.Posts, 
				cloudInfo : this.cloudInfo
				});
		}
	},
	doneFriendCloudCalc : function (e){
				this.objref.drawCloud(e.data.friendTags, this.objref);
	},
	drawCloud : function(tags, objref){
		//let's get the list of related tags.
	
		objref.friendcloudTags = tags;
		//this.getFontSize(tags);
		objref.friendCloudWidth = parseInt(objref.$.friendCloud.getComputedStyleValue('width'));
		objref.friendCloudHeight = parseInt(objref.$.friendCloud.getComputedStyleValue('height'));
		
		
		if (objref.friendCloudCanvas == null){
			objref.friendCloudCanvas = new Kinetic.Stage({
			container: objref.$.friendCloud.id,
			width: objref.friendCloudWidth,
			height: objref.friendCloudHeight
			});
		}
		if (objref.friendCloudCanvas.MainCloudLayer == null){
			this.friendCloudCanvas.MainCloudLayer  = new Kinetic.Layer();
			this.friendCloudCanvas.add(this.friendCloudCanvas.MainCloudLayer);
		}
		
        d3.layout.cloud(objref).size([objref.friendCloudWidth, objref.friendCloudHeight])
                .words(tags.map(function (tag) {
                    return { text: tag.Keyword, size: tag.FontSize }; //10 + Math.random() * 20 
                }))
                .rotate(function (tag) { return ~~(Math.random() * 2) * 90;  })
                .font(objref.subCloudfontName)
                .padding(10)
                .fontSize(function (d) { return d.size; })
				.timeInterval(200)
				.on("word", this.visualizeOneTag)
                .start();
	},
	visualizeOneTag : function(tag, objref){
		 var keyword = tag;
		var xPoint = keyword.x;
		var yPoint = keyword.y;
		var color = objref.colorsTheme[~~(MiTrendz.Utils.Numbers.randomXToY(0, objref.colorsTheme.length-1))];
		var tagText = new Kinetic.Text({
			x: xPoint,// - (keyword.width/2),
			y: yPoint,// - (keyword.height/2),
			text: keyword.text.toUpperCase(),
			fontSize: keyword.size - objref.fontSizeBuffer,
			fontFamily: objref.friendCloudfontName,
			LineHeight : 1,
			textFill: color,
			fontStyle: 'normal',
			draggable: false,
			opacity: 0,
			//align: "center",
			rotationDeg: keyword.rotate,
			verticalAlign: "bottom",
			//padding: objref.padding,
			id: keyword.text, 
			name: "tag",
			 shadow: {
				color: 'rgba(0,0,0,0.3)',
				blur: 5,
				offset: [0, 0],
				opacity: 0.2
				}
		});
		tagText.origColor = color;
		tagText.cloudInfo = objref.cloudInfo;
   
		objref.friendCloudCanvas.MainCloudLayer.add(tagText);
		objref.friendCloudCanvas.MainCloudLayer.draw();
		tagText.transitionTo({
			opacity : 1,
			duration: 1, //time to transition in second
			easing: 'strong-ease-in'
		});
    },
	displayRelatedPosts : function(){
		if (this.friendPostsWorker == null){
			this.friendPostsWorker = new Worker("source/friends/thread_friend_posts.js");
			this.friendPostsWorker.addEventListener("message", this.doneFindFriendPosts, false);
			this.friendPostsWorker.objref = this;
			this.friendPostsWorker.postMessage({friendPosts : this.friendInfo.Posts, 
				cloudInfo : this.cloudInfo
				});
		}
	},
	doneFindFriendPosts : function(e){
		this.objref.$.friendPosts.displayPosts(e.data.friendPosts, e.data.friendPostsNumber, null, 0,  this.objref.cloudInfo, this.objref.name);
	},
	goBackTapped : function(){
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = this.curView.source;
		signalEvent.nextView.source = this.name;
		signalEvent.nextView.destroyViews = this.curView.destroyViews;
		enyo.Signals.send("onChangeView", signalEvent);
		return true;
	}
	
});
