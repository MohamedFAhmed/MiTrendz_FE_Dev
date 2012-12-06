enyo.kind({
	name: "MiTrendz.FreindComment",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes:"friendComment",
	components: [
	{kind: "FittableColumns", fit: true, noStretch: true, style :"width: 100%; background:white;", components:[			
			{kind: "Image", src:"assets/mockups/friend_pic.jpg",  classes:"friendPicture"},
			{kind:"FittableRows", fit: true, style:"width:500px;", components: [
				{kind: "FittableColumns", fit: false, style :"height:100%; width: 100%; margin-top: 10px;", components:[
					{name: "friendName", content : "friend name", classes :"commentTime"},
					{name: "commentTime", content : "5 minutes ago", classes :"commentTime"}
				]},
				{name: "commentText", content : "I like it!", classes : "commentText"}	
			]}			
	]}
	],
	    constructor: function() {
        // low-level or esoteric initialization, usually not needed at all
        this.inherited(arguments);
    },
    create: function() {
        // create is called *after* the constructor chain is finished
        this.inherited(arguments);
        // this.$ hash available only *after* calling inherited create
    },
    destroy: function() {
        // do inherited teardown
        this.inherited(arguments);
    },
	rendered: function() {
    // important! must call the inherited method
    this.inherited(arguments);  
	}
	
	
});
