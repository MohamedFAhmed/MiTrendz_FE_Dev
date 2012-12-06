enyo.kind({
	name: "MiTrendz.SocialBar",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "socialBar",	
	published :{
		expandable : false,
		postObject : null
	},
	
	components : [
	{kind:"FittableColumns", classes:"socialBar", components :[	
		{kind: "onyx.TooltipDecorator", style: "margin-left: 30px; margin-top:auto; margin-bottom:auto;",components: [
			{kind: "onyx.IconButton", name:"likeItBotton",
			src: "assets/like.png", style: "margin-left: 30px; margin: 0px;", ontap: "addCloudTapped"},
			{kind: "onyx.Tooltip", content: "like post"}
		]},
		{name:"likesCount", classes: "socialBarText", style: "", content :""},
		{kind: "onyx.TooltipDecorator", style: "margin-left: 30px; margin-top:auto; margin-bottom:auto;",components: [
					{kind: "onyx.IconButton",
						src: "assets/comment_add.png", style: "margin-left: 30px; margin: 0px;", ontap: "addCommentTapped"},
					{kind: "onyx.Tooltip", content: "Comment this post"}
		]},					
		{name:"commentsCount", classes: "socialBarText", style: "", content :""},
		{kind: "onyx.TooltipDecorator", style: "margin-left: 30px; margin-top:auto; margin-bottom:auto;",components: [
			{kind: "onyx.IconButton",
				src: "assets/share.png", style: "margin-left: 30px; margin: 0px;", ontap: "sharePostTapped"},
			{kind: "onyx.Tooltip", content: "Share this post"}
		]}, 
		{name: "postTime", content: "", classes:"socialBarText", style:"margin-left: 40px;"}
		
		
	]},
	],
    create: function() {
        this.inherited(arguments);
    },
	
	
	render: function(inData, curView){
		//this.expandable = inData.expandable
		this.postObject = inData.postObject;
		
		this.inherited(arguments);
		this.initializeBar();
	},
	rendered : function(){
		this.inherited(arguments);
	

	},
	addCommentTapped : function(){
		var commentPopup = this.createComponent({kind:"MiTrendz.AddComment"});
		commentPopup.render();
		commentPopup.show();
	},
	likeItTapped : function(){
		this.$.likeItBotton.src = "";
	},
	sharePostTapped : function(){
		var postSharePopup = this.createComponent({kind:"MiTrendz.AddComment"});
		postSharePopup.render();
		postSharePopup.show();
		
	},
	initializeBar : function(){
		if (this.postObject.hasOwnProperty('PostDate')){
			this.$.postTime.setContent(MiTrendz.Utils.DateTime.prettyDate(this.postObject.PostDate));
		}
		if (this.postObject.hasOwnProperty('publishTime')){
			this.$.postTime.setContent(MiTrendz.Utils.DateTime.prettyDate(this.postObject.publishTime));
		}
		if (this.postObject.hasOwnProperty('LikesCount')){
			if (this.postObject.LikesCount > 0){
				this.$.likesCount.setContent(this.postObject.LikesCount);
			}
		}
		if (this.postObject.hasOwnProperty('CommentsCount')){
			if (this.postObject.CommentsCount > 0){
				this.$.commentsCount.setContent(this.postObject.CommentsCount);
			}
		}
	}
	
	
	
});
