/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.AddCloud",
	kind: "onyx.Popup",
	classes: "onyx addCloud",
	centered: true, 
	floating: true,
	//scrim: true, 
	scrimWhenModal: false,
	events: {
		onCloudAdded:""
	},
	components: [
	{kind:"FittableRows" , components :[
		{content : "ADD CLOUD", classes :"addCloudTitle"},
		//{content : "select friends you want to follow topics they discuss", classes :"", style:"font-size:10px; color: rgba(255,255,255,0.5);"},
		//{tag : "hr", allowHTML: true, style:"width: 90%; color: rgba(255,255,255, 0.1); margin:5px; height: 1px;"},
		{kind: "onyx.InputDecorator", fit: true, style:"margin-left: 5px; margin-buttom: 10px; margin-top:5px; margin-right: 5px; ", components: [
				{kind: "onyx.Input", name: "cloudName", placeholder: "Enter Cloud Name", style:"", onchange:"inputChanged"}
		]},
		{name:"postsSummaries", kind:"Scroller",  classes: "friendsListScroller", style: "", 
		vertical:"auto", horizontal: "hidden", strategyKind: "TouchScrollStrategy", classes: "friendsListScroller",   components:[
			{name:"temprep", kind:"Repeater", style:"white-space: nowrap;",count: 50, components:[
				{kind: "MiTrendz.FriendSelector", style:"float:left;"}
			]}
		]},
		{kind: "Control", style:"width100%; margin: 10px; margin-top: 20px; text-align: center;", components: [
			{kind:"onyx.Button", content: "Add Cloud", style:"  margin-left: auto; margin-right: auto;", ontap:"createCloudTapped"},
			{kind:"onyx.Button", content: "Cancel", style:"  margin-left: 20px; margin-right: auto;", ontap:"cancelCreateCloudTapped"}
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
	},
	createCloudTapped : function(){
		var newCloud = new Object();
		newCloud.name = this.$.cloudName.getValue();
		this.doCloudAdded(newCloud);
		this.hide();
	},
	cancelCreateCloudTapped : function(){
		this.hide();
	}
	
	
});
