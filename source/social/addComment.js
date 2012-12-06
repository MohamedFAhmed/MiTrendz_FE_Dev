enyo.kind({
	name: "MiTrendz.AddComment",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "addComment",	
	//style : "display:inline;",
    handlers: {
        ondown: "downHandler",
        onup: "upHandler"
    },
	components : [
		{content: "Add your comment", style: "margin:5px;"},
		
		{kind: "onyx.InputDecorator", style:"width:90%; margin: 5px; height: 120px;", components: [
				{kind: "onyx.TextArea", style:"width:100%; height:100%;", placeholder: "Enter comment here", onchange:"inputChanged"}
		]},
		{kind: "Control", style:"width100%; margin: 10px;text-align: center;", components: [
			{kind:"onyx.Button", content: "Comment", style:"text-align: center; margin-left: auto; margin-right: auto;", ontap:"CommentTapped"}
		]}
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
	CommentTapped : function(){
	
	}
	
});
