/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.FriendSelector",
	kind: "enyo.Control",
	//layoutKind: "FittableRowsLayout",
	//tag: "div",
	//fit: true,
	//allowHTML: true, 
	classes: "friendSelector",
	handlers: {
		ontap: "controlTapped"
	},
    style: "",
	components : [
		{kind: "FittableColumns", fit: true, style:"height:40px; margin-top: auto; margin-bottom:auto;", components: [
			{kind:"onyx.Checkbox", name: "selectCheckBox",  style: "height:30px;", onchange:"checkboxChanged"},
			{kind : "Image", name:"friendImage", classes:"friendSelectorImage",  src : "assets/mockups/friend_pic.jpg" },
			{content : "Friend Name", fit: true, classes: "friendName", style:""}
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
	controlTapped : function(){
	
	
	// if (this.$.selectCheckBox.checked  == false){
	// this.$.selectCheckBox.checked = true;
	// } else{
	// this.$.selectCheckBox.checked = false;
	// }
	this.$.selectCheckBox.setChecked(!this.$.selectCheckBox.checked);
	//this.$.selectCheckBox.render();
	}
	
});
