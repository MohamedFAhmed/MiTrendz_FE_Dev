enyo.kind({
	name: "MiTrendz.PostShare",
	kind: "onyx.Popup",
	classes: "onyx PostShare settingsPopup",
	postObject : null,
	cloudInfo : null,
	published :{
	},
	
    handlers: {
        ondown: "downHandler",
        onup: "upHandler"
    },
	components : [
	{content: "Get your words heared"},
		{tag: "br"},
		{kind: "onyx.InputDecorator", style:"width:90%; margin: 5px;", components: [
				{kind: "onyx.TextArea", style:"width:100%;", placeholder: "your thoughts!", onchange:"inputChanged"}
		]},
		{tag : "hr", style:"margin:3px; width: 90%; border:1px; color:rgba(0,0,0,0.5);"},
		{content: "Suggested Tags"},
		{name: "keywordsContainer", kind: "Scroller",   vertical:"auto", horizontal:"hidden", classes: "", style: "height:55px; width:95%; white-space: nowrap; height: 55px; width:100%;", components: [
			//{kind:"enyo.Repeater", style:"white-space: nowrap; height: 55px; width:100%;", count : 5, components :[
				{kind:"MiTrendz.Tag", style:"white-space: nowrap; margin-left: 5px;" }
				// {kind:"Image", classes:"", src: "assets/tags.png", style: "white-space: nowrap; margin-left: 5px; width:22px; height:22px;" },
				// {content:"keyword", style:"display:inline; color:rbga(0,0,0,0.6); white-space: nowrap; margin-left: 5px;"}
			//]}
		]},
		{kind: "onyx.InputDecorator", style:"width:90%; margin: 5px;", components: [
			{kind: "onyx.TextArea", style:"width:100%;" ,placeholder: "Tag it! Type and separate them with comma, or select from below", onchange:"inputChanged"}
		]},
		
		{kind:"FittableColumns", style:"width:250px;", components: [
			{content: "Share with other MiTrendz Taggers!"},
			{kind:"onyx.Checkbox", onchange:"checkboxChanged", style:"margin-left: 20px; width:30px; height:30px;", checked: true}
		]},
		{tag: "br"},
		{kind: "Control", style:"width100%; margin: 10px;text-align: center;", components: [
			{kind:"onyx.Button", content: "Share", style:"  margin-left: auto; margin-right: auto;", ontap:"CommentTapped"}
		]}
	],
    create: function() {
        this.inherited(arguments);
		//this.$.cloudLoadingSpinner.show();
    },
	
	
	render: function(inData, curView){
		this.inherited(arguments);
		//this.$.cloudLoadingSpinner.show();
	},
	rendered : function(){
	this.inherited(arguments);

	},
	addGoBackTapped : function(){
	
	}
	
});
