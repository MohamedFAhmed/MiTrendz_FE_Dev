enyo.kind({
	name: "MiTrendz.FriendSummary",
	kind: "Control",
	tag: "div",
	//fit: true,
	//allowHTML: true, 
	classes: "friendSummary",	
	//style : "display:inline;",
    handlers: {
        ondown: "downHandler",
        onup: "upHandler"
    },
	components : [
		//{kind : "FittableRows", noStretch: true, style:"width:50px; height:60px;",components : [
				{name: "friendImage", kind: "Image", src: "assets/mockups/friend_pic.jpg" },
				//{kind : "FittableColumns",  noStretch: true, components :[
					{name: "vIcon", kind: "Image", src: "https://github.com/enyojs/enyo/wiki/assets/remove-icon.png" , classes: "" },
					//{name: "VidoesNum", content:"#"},
					//]},
				//{kind : "FittableColumns",  noStretch: true, components :[
					{name: "iIcon", kind: "Image", src: "https://github.com/enyojs/enyo/wiki/assets/remove-icon.png" , classes: "" }//,
				//{name: "ImagesNum", classes:"", content:"#"}
				//]}
		//]}
						
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

	}
	
});
