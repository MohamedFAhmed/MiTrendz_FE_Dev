enyo.kind({
	name: "MiTrendz.SocialBar",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "socialBar",	
	published :{
		expandable : false
	},
	
    handlers: {
        ondown: "downHandler",
        onup: "upHandler"
    },
	components : [
	{kind:"FittableColumns", classes:"socialBar", components :[	
		{kind: "onyx.TooltipDecorator", style: "margin-left: 30px; margin-top:auto; margin-bottom:auto;",components: [
			{kind: "onyx.IconButton", name:"likeItBotton",
			src: "assets/like.png", style: "margin-left: 30px; margin: 0px;", ontap: "addCloudTapped"},
			{kind: "onyx.Tooltip", content: "like post"}
		]},
		{name:"likesCount", classes: "socialBarText", style: "", content :"23"},
		{kind: "onyx.TooltipDecorator", style: "margin-left: 30px; margin-top:auto; margin-bottom:auto;",components: [
					{kind: "onyx.IconButton",
						src: "assets/comment_add.png", style: "margin-left: 30px; margin: 0px;", ontap: "addCommentTapped"},
					{kind: "onyx.Tooltip", content: "Comment this post"}
		]},					
		{name:"commentsCount", classes: "socialBarText", style: "", content :"23"},
		{kind: "onyx.TooltipDecorator", style: "margin-left: 30px; margin-top:auto; margin-bottom:auto;",components: [
			{kind: "onyx.IconButton",
				src: "assets/share.png", style: "margin-left: 30px; margin: 0px;", ontap: "sharePostTapped"},
			{kind: "onyx.Tooltip", content: "Share this post"}
		]}, 
		{content: "4 hours ago", classes:"socialBarText", style:"margin-left: 40px;"}
		
		
	]},
	{name: "commentPopup", kind: "onyx.Popup", centered: true, floating: true, classes:"onyx-sample-popup", style: "padding: 10px;", components :[
		{kind:"MiTrendz.AddComment"}
	]},
	{name: "postSharePopup", kind: "onyx.Popup", centered: true, floating: true, classes:"onyx-sample-popup", style: "padding: 10px;", components :[
		{kind:"MiTrendz.PostShare"}
	]},
	],
    create: function() {
        this.inherited(arguments);
		//this.$.cloudLoadingSpinner.show();
    },
	
	
	render: function(){
		this.inherited(arguments);
		//this.$.cloudLoadingSpinner.show();
	},
	rendered : function(){
	this.inherited(arguments);

	},
	addGoBackTapped : function(){
	
	},
	addCommentTapped : function(){
		this.$.commentPopup.show();
	},
	likeItTapped : function(){
		this.$.likeItBotton.src = "";
	},
	sharePostTapped : function(){
		this.$.postSharePopup.show();
	}
	
	
	
});
