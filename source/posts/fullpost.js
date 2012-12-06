enyo.kind({
	name: "MiTrendz.FullPost",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "postFullView",	
	viewRendered  : false,
	published: {
		prevViewName : "subCloudView",
		postObject : null,
		friendInfo : null,
		curView : null,
	},
	components : [
	{kind: "Control",  style: "width: 100%; height: 30px; background: rgba(255,255,255,1); position:absolute; bottom:0px; z-index: 100; -webkit-box-shadow: 0px 0px 20px rgba(0,0,0,0.5);", components: [
		{kind:"FittableColumns", style: "text-align:right; width: 100%;",  classes:"", components: [
			{kind:"MiTrendz.SocialBar", fit: true}
		]},
			//{Content : "50 Likes" , style: "margin: 5px; margin-left:10px;"},
			//{Content : "Social Bar Goes here!", style :"margin-left: 20px;"}
	]},
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%;", components : [	
		{kind: "Control" , style:"height:100%; width:100%; margin: 0px;", components :[
			{kind : "FittableRows", fit: true, classes:"", components : [
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
				{kind:"Control", name:"fullPostContainer", style: "margin:10px; ", components : []}
			]},		
	
		]},
		
			// {name: "socialDrawer", kind: "onyx.Drawer", open: false, components :[
				// {content :"Likes", classes:"socialTitle",style: "width:100%; margin-top :20px; margin-bottom: 20px;"},
				// {kind: "Scroller",vertical:"hidden", vertical:"hidden", horizontal:"auto", style: "width:100%;  margin-bottom: 20px;", components :[
					// {kind: "Repeater", style:"white-space: noWrap;", count: 10, components: [
						// {kind:"MiTrendz.FreindLike"}
					// ]}
				// ]},
				// {content :"Comments", classes:"socialTitle",style: "width:100%; margin-top :20px; margin-bottom: 20px;"},
				// {kind: "Scroller", horizontal:"hidden", style:"", components : [
					// {kind: "Repeater", style:"white-space: noWrap;", count: 7, components: [
						// {kind:"MiTrendz.FreindComment"}
					// ]}
				// ]}
			// ]}
		
	]}
	
	],
    create: function() {
        this.inherited(arguments);
		//this.$.cloudLoadingSpinner.show();
       
    },
	ActivateSocialDrawer : function(){
		this.$.socialDrawer.setOpen(!this.$.socialDrawer.open);
	},
	
	render: function(inData, sourceView){
		this.inherited(arguments);
		if (inData != null){
			this.postObject = inData.postObject;
			this.friendInfo = inData.friendInfo;
		}
		this.curView = new Object();
		if (sourceView != null){
			this.curView.source = sourceView.source;
		}
		else{
			this.curView.source = "mainCloudView";
		}
		this.curView.name = this.name;
		this.curView.destroyViews = "source";
	},
	rendered : function(){
		this.inherited(arguments);
	

	},
	renderView : function(){
		if (this.viewRendered == true){
			return;
		}
		if ((this.postObject.postType == "photo") || (this.postObject.postType == "video")){
			var fullMediaView = this.$.fullPostContainer.createComponent({name:"fullMediaView", kind: "MiTrendz.FullMediaView", style: "text-align: center;"});
			fullMediaView.mediaObject = this.postObject;
			fullMediaView.friendInfo = this.friendInfo;
			fullMediaView.render();
		}
		else{
			var fullMediaView = this.$.fullPostContainer.createComponent({name:"fullLinkView", kind: "MiTrendz.FullLinkView", style: "text-align: center;"});
			fullMediaView.postObject = this.postObject;
			fullMediaView.friendInfo = this.friendInfo;
			fullMediaView.render();
		}
		if (this.friendInfo != null){
			this.$.friendPic.setSrc(this.friendInfo.ProfileImageUrl);
			this.$.friendName.setContent(this.friendInfo.Name);
		}
		this.viewRendered = true;
	},
	goBackTapped : function(){
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = this.curView.source;
		signalEvent.nextView.source = this.curView.name;
		signalEvent.nextView.destroyViews = this.curView.destroyViews;
		
		enyo.Signals.send("onChangeView", signalEvent);
	
	}
	
});
