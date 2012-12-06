enyo.kind({
	name: "MiTrendz.FreindLike",
	kind: "Control",
	tag: "div",
	fit: true,
	allowHTML: true, 
	classes:"friendLike",
	components: [
	{kind: "onyx.TooltipDecorator", style : "display:inline;" , components: [
		{kind : "Image", src:"assets/mockups/friend_pic.jpg", classes:"friendPicture"},
		{kind: "onyx.Tooltip", content: "around 5 minutes ago"}
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
