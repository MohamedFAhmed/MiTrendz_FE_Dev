enyo.kind({
	name: "MiTrendz.FullLinkView",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "postFullView",	
    handlers: {
    },
	published: {
		postObject : null, 
		friendInfo : null
	},
	components : [
	{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height:100%;", components : [
		{ kind : "FittableRows", fit: true, classes:"", style:"height: 100%; width:100%;", components : [
			{name : "mediaContainer", fit: true, kind: "Control", style:"height: 70%; margin:10px;	text-align: center;", components : []},
			//{kind: "FittableColumns", fit :true, components: [
				{name :"friendComment", style: "font-size: 30px; margin:5px; margin-bottom: 20px; font-color:rgba(0,0,0,0.8);", Content: ""},
				{name :"postTime", style: "font-size: 12px; margin:5px;", Content: "20 minutes ago"},
			//]},
			{kind : "enyo.Scroller", horizontal: "hidden", vertical: "default", style:"width:100%; height: 100%;", components : [	
				{name: "linkContent", kind:"Control", tag: "iframe",	classes: "", style: "border: none; width:100%; height:400px;"}
			]}
		]},
		
	]}, 
	
	
	],
    create: function() {
        this.inherited(arguments);
    },
	
	
	render: function(){
		this.inherited(arguments);
		
	},
	rendered : function(){
		this.inherited(arguments);
		if (this.postObject != null){
			if (this.postObject.hasOwnProperty('LinkToSharedResource')){
				 this.$.linkContent.setSrc(this.postObject.LinkToSharedResource);
			}
			if (this.postObject.hasOwnProperty('FriendMessage')){
				this.$.friendComment.setContent(this.postObject.FriendMessage);
			}

		}
		
	},
	formatVideoUrl : function (str) {
        return str.replace("watch?v=", "embed/");
    }
	
});
