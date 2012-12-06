enyo.kind({
	name: "MiTrendz.Tag",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes: "tagUnselected",	
	keyword : "",
	published :{
		selected : false
	},
	
    handlers: {
        ontapped: "keywordTapped",

    },
	components : [
	{kind:"Control", style:"white-space: nowrap; display:inline;", ontap:"", components: [
			{kind:"Image", classes:"", src: "assets/tags.png", style: "white-space: nowrap; margin-left: 5px; width:22px; height:22px;" },
			{name: "keyword", content:"keyword", style:"display:inline; color:rbga(0,0,0,0.6); white-space: nowrap; margin-left: 5px;"}
		]},
	],
    create: function() {
        this.inherited(arguments);
    },
	
	
	render: function(inData){
		this.keyword = inData.keyword;
		this.$.keyword.setContent(this.keyword)
		this.inherited(arguments);
	},
	rendered : function(){
		this.inherited(arguments);
	},
	keywordTapped : function(inSender, inEvent){
		if (this.selected){
			this.selected = false;
			this.removeClasses("tagSelected");
			this.addClasses("tagUnselected");
		}
		else{
			this.selected = true;
			this.removeClasses("tagUnselected");
			this.addClasses("tagSelected");
		}
	}
	
});
