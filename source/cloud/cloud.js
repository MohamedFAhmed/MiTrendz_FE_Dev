/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.Cloud",
	kind: "Control",
	tag: "div",
	fit: true,
	//allowHTML: true, 
	classes: "mainCloud",
	cloudTags : null,
	cloudInfo : null,
	CloudCanvas : null,
	HighlightedKws : [],
    DrilledDown : false,
    fontName : "HaettenschweilerRegular",
	minFontSize : 10,
	fontSizeStep: 7,
    HighlightedKws : [],
    canvasWidth : 600,
    canvasHeight : 600,
    padding : 10,
	fontSizeBuffer : 15,
	trendsWorkerThread : null,
	viewRendered : false,
	colorsTheme : ['#4D4200','#433B08','#3F3600','#796A0F','#796C1B','#003911', '#063213','#002F0E','#0D6A29','#186A31','#4D0A00','#431008','#3F0900', '#791E0F','#79281B','#110034', '#12062E', '#0E002B', '#290D67', '#301767'],
    colorsTheme1 : ['#CA860A', '#C0910A', '#B35E00', '#CA530A', '#C0340A'],
    colorsTheme2 : ['#B99CB3', '#B499AF', '#B38FAC', '#F8E2F4', '#F8F1F7'],
	d3Vis : null,
    published :{
		curView : null,
	},
	events: {
		onCloudTapped:""
	},
	handlers : {
		onresize: "resizeHandler"
	},
	components : [
	{name: "mainCloudView", kind: "FittableRows", style:"height:100%; width:100%;", components: [
		{kind: "Scroller", classes:"onyx-toolbar", touchOverscroll:true, touch:true, vertical:"hidden", style:"margin:0px; height:60px; padding: 5px;", thumb:false, components: [
			{classes: "onyx-toolbar-inline onyx-menu-toolbar", style: "white-space: nowrap; height:50px; margin-left: 5px; margin-right: 30px; padding:0px;", components: [
			
				{kind: "onyx.TooltipDecorator", style: "vertical-align: middle;", components: [
					{kind: "onyx.IconButton",src: "assets/settings.png", ontap: "settingsTapped"},
					{kind: "onyx.Tooltip", content: "Change Settings"}
				]},
				{kind: "Group", name:"cloudsNames", onActivate:"buttonActivated", classes: "onyx-sample-tools group", defaultKind: "Control", highlander: true, style: "white-space: nowrap; height:50px; margin 0px; padding:0px;", components: [
					{content: "Home", active: true, classes: "cloudName", style: "", ontap : "cloudChangeTapped"},
					{content: "Family", active: false,  classes: "cloudName", ontap : "cloudChangeTapped"},
					{content: "News" , active: false,  classes: "cloudName", ontap : "cloudChangeTapped"}
				]},
				{kind: "onyx.TooltipDecorator", style: "margin-left: 30px; margin-top:auto; margin-bottom:auto;",components: [
						{kind: "onyx.IconButton", src: "assets/add.png", style: "margin-left: 30px; margin: 0px;", ontap: "addCloudTapped"},
						{kind: "onyx.Tooltip", content: "Change Settings"}
				]},
				{kind : "MiTrendz.AddCloud", name : "addCloudPopup", onCloudAdded : "cloudAdded"}
			]}
		]},
		// {kind: "FittableColumns", name:"cloudActionBar", classes: "onyx-menu-toolbar cloudActionGroup", defaultKind: "onyx.IconButton", style:"text-align: right;", components: [
			// {kind: "onyx.TooltipDecorator", style:"margin:5px;", components: [
					// {kind: "onyx.IconButton", src: "assets/edit.png", ontap: "editTapped"},
					// {kind: "onyx.Tooltip", content: "edit the cloud"}
			// ]},
			// {kind: "onyx.TooltipDecorator", style:"margin:5px;", components: [
				// {kind: "onyx.IconButton", src: "assets/remove.png", ontap: "deleteTapped"},
				// {kind: "onyx.Tooltip", content: "delete the cloud"}
			// ]} 
		// ]},
		{name:"cloudScrollContainer", kind:"Control" , fit:true, style :"width: 100%; height: 100%; position:relative; ", components: [
			{name: "cloudScroller", kind: "Scroller",   vertical:"hidden", horizontal:"auto", style :"width: 100%; height: 100%;", components: [
				{name: "mainCloudCanvas", kind: "Control", tag:"div", style:"width: 150%; height:100%;", allowHTML: true},
			]},
			{kind: "Control", tag:"div", classes:"rightSideGradient"},
			{kind: "Control", tag:"div", classes:"leftSideGradient"},
		]},
		{name: "trendingBar", kind: "Scroller",   vertical:"hidden", horizontal:"auto", classes: "trendingBar", components: [
			{kind:"FittableColumns", style :"white-space: nowrap; display:inline; height: 100px; width:500px;", noStretch:true, components: [
				{kind :"Control", style: "width:100px;" , components :[
					{name:"totalShared", content: "", noStretch:true, style : "font-size:40px; color:white; text-align:center;  height: 80px; line-height:100px;"},
					{content: "Shared Posts\n since yesterday", noStretch:true, style : "font-size:12px; text-align: center; height:20px; color: rgba(255,255,255,0.6);"},
						
						
				]},
				
				{name: "trendingVideos" , kind:"FittableRows", style:"margin-left: 20px; width: 250px;",   components: [
					{kind:"FittableColumns", noStretch:true, components : [
						{content: "Videos",  classes : "trendingTitle"},
						{name: "videosCount", content: "",  style: "margin-left: 5px;", classes : "trendingTitle"}
					]},
					{kind: "Scroller", classes:"", touchOverscroll:true, touch:true, vertical:"hidden", style:"margin:0px;  padding: 0px;", thumb:false, components : [
							{name: "videosList" , kind: "FittableColumns", style:"white-space: noWrap;", components: [
						]}
					]}
				]},
				{kind:"FittableRows", style:"margin-left: 30px; width: 250px;", components: [
					{kind:"FittableColumns", noStretch:true, components : [
						{content: "Images",  classes : "trendingTitle"},
						{name: "photosCount", content: "",  style: "margin-left: 5px;", classes : "trendingTitle"}
					]},
					
					{ kind: "Scroller", classes:"", touchOverscroll:true, touch:true, vertical:"hidden", style:"margin:0px;  padding: 0px; -webkit-border-left-image: -webkit-gradient(linear, left right from(#00abeb), to(#fff)); -webkit-border-left-width : 5px;", thumb:false, components : [
							{name: "photosList", kind: "FittableColumns", style:"white-space: noWrap;", components: [							
						]}
					]}
						
				]},
				//]},
				{kind:"FittableRows", style:"margin-left: 30px; width: 250px;", components: [
					{kind:"FittableColumns", noStretch:true, components : [
						{content: "Contributing Friends",  classes : "trendingTitle"},
						{name: "friendsCount", content: "",  style: "margin-left: 5px;", classes : "trendingTitle"}
					]},
					{kind: "Scroller", classes:"", touchOverscroll:true, touch:true, vertical:"hidden", style:"margin:0px;  padding: 0px;", thumb:false, components : [
							{name: "friendsList" , kind: "FittableColumns", style:"white-space: noWrap;", components: [
							// {kind:"FittableColumns", noStretch:true, components : [
								// {name: "firstFriend", kind:"Image" , src: "assets/mockups/friend_pic1.jpg", classes: "topFriendPicture" , ontap : "friendPictureTapped"},
								// {name: "secondFriend", kind:"Image" , src: "assets/mockups/friend_pic2.jpg", classes: "topFriendPicture" , ontap : "friendPictureTapped"}
							// ]}
						]}
					]}
				]},
			]},
		]}
	]},
	{kind : "MiTrendz.Settings", name : "settingsPopup"},
	{name: "cloudDeleteConfirm", kind: "enyo.Popup", style:"background: rgba(0,0,0,0.95); border-radius: 5px; padding: 20px; text-align: center;" ,autoDismiss: false, centered: true, floating: true, scrim: false, components: [
				{content: "Are you sure want to delete this cloud?", style :"color:white; font-size: 30px;"},
				{tag: "br"},
				{kind: "onyx.IconButton", src: "assets/accept.png", style:"margin: 5px; margin-right: 20px;", ontap: "confirmCloudDelete"},
					{kind: "onyx.IconButton", src: "assets/cancel.png", style:"margin: 5px; margin-left: 20px;", ontap: "cancelCloudDelete"}
	]},	
	{kind : "MiTrendz.AddCloud", name : "modifyCloudPopup"},
	{name: "cloudLoadingSpinner", kind: "enyo.Popup", classes:"loadingPopup" ,autoDismiss: false, centered: true, floating: true, scrim: false, components: [
		{kind: "onyx.Spinner"},
		{content : "Loading", style:"color: white; font-size: 30px; text-align: center;"}
	]}
	],
	create: function(){
		this.inherited(arguments);
		// var userId = MiTrendz.Utils.Storage.get("Login.UserId");
		// this.loadUserSettings(userId);
		// this.getCloud(userId);
	},
	loadUserSettings: function(userId){
		
	},
	getCloud : function(userId){
			var now = new Date();
			var startTime = new Date();
            startTime.setDate(now.getDate() - 1);
			//var timestring = new Date(startTime.toISOString());
			var jsonp = new enyo.JsonpRequest({
			url: "http://98.225.46.100:20000/Cloud?" + 'StartTime=' + startTime.toISOString() + '&EndTime=' + now.toISOString() + '&MaxWordsNum=50&UserId=' + userId +'&CombinedResults=false&SortByAltWeight=false', 
			callbackName: "callback"
		});
		// send parameters the remote service using the 'go()' method
		jsonp.go({
			
		
			//'StartTime=' + '9//7//2012' + '&EndTime=' + '9//8//2012'  + '&MaxWordsNum=' + '20' + '&UserId=' + '7' + '&CombinedResults=false&SortByAltWeight=false'
		});
		// attach responders to the transaction object
		jsonp.response(this, "CloudDataReceived");
	
	
	  //var qString = 'StartTime=' + startTime + '&EndTime=' + endTime + '&MaxWordsNum=' + maxwords + '&UserId=' + userId + '&CombinedResults=false&SortByAltWeight=false&callback=?';
       //     $.getJSON('http://98.225.46.100:20000/api/WebApis/GetUserCloud', qString, CloudDataReceived).error(onCloudRetreivalError);
	},
	CloudDataReceived: function (inSender, inResponse) {	
		this.cloudInfo  = inResponse;
		this.renderView();
    },
	render: function(inData){
		this.inherited(arguments);
		//this.cloudInfo = cloudData;
		if (inData != null){
			this.getCloud(inData.userId);
			
		}
		this.$.cloudLoadingSpinner.show();
		this.curView = new Object();
		this.curView.name = this.name;
		this.curView.source = this.name;
		this.curView.destroyViews = "none";
		//let's read from our stored settings
		this.fontName = MiTrendz.Utils.Storage.get("settings.cloud.fontName");
		if (this.fontName == "undefined"){
			this.fontName = "HaettenschweilerRegular";
		}
		this.minFontSize = parseInt(MiTrendz.Utils.Storage.get("settings.cloud.minFontSize"));
		if (this.minFontSize == "undefined"){
			this.minFontSize = 15;
		}
		
		this.fontSizeStep = parseInt(MiTrendz.Utils.Storage.get("settings.cloud.fontSizeStep"));
		if (this.fontSizeStep == "undefined"){
			this.fontSizeStep = 7;
		}
		
	},
	
	renderView : function(){
		if (this.viewRendered == true){
			return;
		}
		if (this.cloudInfo != null){
		
			
			var scrollBounds = this.$.cloudScroller.getScrollBounds();
			this.$.cloudScroller.scrollTo(scrollBounds.maxLeft/2, 0);
			this.draw();
			this.calcTrends();
			this.viewRendered = true;
		}
		
		
		
	},
	rendered : function(){
		this.inherited(arguments);
		//this.$.cloudActionBar.removeClass("onyx-toolbar");
		this.$.cloudLoadingSpinner.show();
	},
	settingsTapped : function(){
		this.$.settingsPopup.show();
	},
	addCloudTapped : function(){
		this.$.addCloudPopup.show();
	},
	cloudChangeTapped : function (inSender, inEvent){
		var groupItms = this.$.cloudsNames.getControls();
		for(var i=0; i < groupItms.length; i++){
			groupItms[i].removeClass("activeCloudName");
		}
		
		inSender.addClass("activeCloudName");
		
		this.$.cloudLoadingSpinner.show();
		this.$.mainCloud.clearCloud();
		this.$.mainCloud.draw(this.CloudInfo.Facebook.Tags);
			this.$.cloudLoadingSpinner.hide();
		return true;
	},
	cloudAdded : function(inSender, inEvent){
		this.$.cloudsNames.createComponent({content: inEvent.name, active: false,  classes: "cloudName", ontap : "cloudChangeTapped"}).render();
	},
	deleteTapped : function(){
		this.$.cloudDeleteConfirm.show();
	},
	editTapped : function (){
		this.$.modifyCloudPopup.show();
	},
	confirmCloudDelete : function(){
		this.$.cloudDeleteConfirm.hide();
	},
	cancelCloudDelete : function(){
		this.$.cloudDeleteConfirm.hide();
	},
	draw : function(cloudData){
		
		var tags = this.cloudInfo.Facebook.Tags;
		this.cloudTags = tags;
		this.getFontSize(tags);
		this.canvasWidth = parseInt(this.$.mainCloudCanvas.getComputedStyleValue('width'));
		this.canvasHeight = parseInt(this.$.mainCloudCanvas.getComputedStyleValue('height'));
		this.width = this.canvasWidth;
		this.height = this.canvasHeight;
		
		// if (this.CloudCanvas == null){
			// this.CloudCanvas = new Kinetic.Stage({
			// container: this.$.mainCloudCanvas.id,
			// width: this.canvasWidth,
			// height: this.canvasHeight
			// });
		// }
		// if (this.CloudCanvas.MainCloudLayer == null){
			// this.CloudCanvas.MainCloudLayer  = new Kinetic.Layer();
			// this.CloudCanvas.add(this.CloudCanvas.MainCloudLayer);
		// }
			var w = this.canvasWidth,
					h = this.canvasHeight;
			var svg = d3.select("#"+this.$.mainCloudCanvas.id).append("svg")
			.attr("width", this.canvasWidth)
			.attr("height", this.canvasHeight);
			var background = svg.append("g");
				this.d3Vis = svg.append("g")
			.attr("transform", "translate(" + [0 , 0 ] + ")");
		
        d3.layout.cloud(this).size([this.canvasWidth, this.canvasHeight])
                .words(tags.map(function (tag) {
                    return { text: tag.Keyword, size: tag.FontSize}; //10 + Math.random() * 20 
                }))                
                .font(this.fontName)
                .fontSize(function (d) { return d.size ; })
				.rotate(function (tag) { return 0; }) //~~(Math.random() * 2) * 90; 
				.padding(this.padding)
				.timeInterval(400)
				.on("word", this.d3visualizeOneTag)
                //.on("end",  this.d3draw)
                .start();
	},
	getFontSize : function(Tags, event){
	var horizontal = false;
        var maxNum = Tags.length;
		// var fontIncrement = this.fontSizeStep;
		// var minFont = this.minFontSize;

        for (var i = 0; i < maxNum; i++) {
            Tags[i].FontSize = ((this.fontSizeStep * Tags[i].FontSizeBucket) + this.minFontSize) + this.fontSizeBuffer;
            if (horizontal) {
                Tags[i].orientation = 0;
                horizontal = false;
            } else {
                Tags[i].orientation = 90;
                horizontal = true;
            }

        }
	},
	d3draw: function (data, objref) {
	var centerX = this.canvasWidth/2;
	var centerY = this.canvasHeight/2;
	var scale = 1;
	var w = this.canvasWidth,
		h = this.canvasHeight;
	var fill = d3.scale.category20b();
	var svg = d3.select("#"+objref.$.mainCloudCanvas.id).append("svg")
			.attr("width", this.canvasWidth)
			.attr("height", this.canvasHeight);
		var background = svg.append("g"),
			vis = svg.append("g")
			.attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
	  // scale = bounds ? Math.min(
		  // w / Math.abs(bounds[1].x - w / 2),
		  // w / Math.abs(bounds[0].x - w / 2),
		  // h / Math.abs(bounds[1].y - h / 2),
		  // h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
	  words = data;
	  var text = vis.selectAll("text")
		  .data(words, function(d) { return d.text.toLowerCase(); });
	  text.transition()
		  .duration(500)
		  .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
		  .style("font-size", function(d) { return d.size + "px"; });
	  text.enter().append("text")
		  .attr("text-anchor", "middle")
		  .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
		  .style("font-size", function(d) { return d.size + "px"; })
		  .on("click", function(d) {
			load(d.text);
		  })
		  .style("opacity", 1e-6)
		.transition()
		  .duration(1000)
		  .style("opacity", 1);
	  text.style("font-family", function(d) { return d.font; })
		  .style("fill", function(d) { return fill(d.text.toLowerCase()); })
		  .text(function(d) { return d.text; });
	  var exitGroup = background.append("g")
		  .attr("transform", vis.attr("transform"));
	  var exitGroupNode = exitGroup.node();
	  text.exit().each(function() {
		exitGroupNode.appendChild(this);
	  });
	  exitGroup.transition()
		  .duration(1000)
		  .style("opacity", 1e-6)
		  .remove();
	   vis.transition()
		   .delay(1000)
		   .duration(750)
		   .attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
	},
	d3visualizeOneTag : function(tag, objref){
	  var text = objref.d3Vis.append("text");
	  var color = objref.colorsTheme[~~(MiTrendz.Utils.Numbers.randomXToY(0, objref.colorsTheme.length-1))]; //'black';
	  text.transition()
		  .duration(300)
		  .attr("transform", "translate(" + [tag.x, tag.y] + ")rotate(" + tag.rotate + ")")
		  .style("font-size", tag.size + "px");
	  text.attr("text-anchor", "middle")
		  .attr("transform", "translate(" + [tag.x, tag.y] + ")rotate(" + tag.rotate + ")")
		  .style("font-size", tag.size - objref.fontSizeBuffer + "px")
		  .on("click", function(tag){
				objref.onTagTouchEnd(tag);
			})
		  .style("opacity", 1e-6)
		.transition()
		  .duration(400)
		  .style("opacity", 1);
	  text.style("font-family", tag.font)
		  .style("fill", color)
		  .text(tag.text);
		objref.$.cloudLoadingSpinner.hide();
	},
	visualizeTagsCanvas : function (Tags, objref){
		var cControl = document.getElementById(objref.$.mainCloudCanvas.id);
		
	  var canvas = document.createElement("canvas"); 
	  cControl.appendChild(canvas);
      c = canvas.getContext("2d");
		  canvas.width = objref.width;
		  canvas.height = objref.height;
		  c.translate(objref.width >> 1, objref.height >> 1);
		  c.scale(1, 1);
		   for (var i = 0; i < Tags.length; i++) {
            var keyword = Tags[i];
            var xPoint = keyword.x;// + centerX ;
            var yPoint = keyword.y;// + centerY;
            var color = 'black';//colorsTheme2[~~(randomXToY(0, colorsTheme2.length-1))];
			c.save();
			c.translate(keyword.x, keyword.y);
			c.rotate(keyword.rotate * Math.PI / 180);
			c.textAlign = "center";
			c.textBaseline="bottom"; 
			// c.fillStyle = fill(word.text.toLowerCase());
			c.font = keyword.size + "px " + keyword.font;
			c.shadowOffsetX = 0;
			c.shadowOffsetY = 0;
			c.shadowBlur = 7;
			c.shadowColor = "rgba(0,0,0,0.5)";
			c.fillText(keyword.text, 0, 0);
			c.restore();
			c.save();
			c.fillStyle = "rgba(0,0,0,0.2)";
			c.fillRect(xPoint - (keyword.width/2), yPoint- (keyword.height/2), keyword.width/2, keyword.height/2);
			c.restore();
			}
	},
	visualizeOneTag : function(tag, objref){
		var keyword = tag;
		var xPoint = keyword.x;// + centerX ;
		var yPoint = keyword.y;// + centerY;
		var color = objref.colorsTheme[~~(MiTrendz.Utils.Numbers.randomXToY(0, objref.colorsTheme.length-1))]; //'black';
		var tagText = new Kinetic.Text({
			x: xPoint,//- (keyword.width/2),
			y: yPoint,//- (keyword.height/2),
			text: keyword.text,
			fontSize: keyword.size - objref.fontSizeBuffer,
			lineHeight: 1,
			fontFamily: objref.fontName,
			textFill: color,
			fontStyle: 'normal',
			draggable: false,
			opacity : 0,
			//align: "left",
			rotation: (keyword.rotate * Math.PI / 180),
			//verticalAlign: "bottom",
			//padding: objref.padding,
			id: keyword.text, 
			name: "tag",
			 shadow: {
				color: 'rgba(0,0,0,0.6)',
				blur: 7,
				offset: [0, 0],
				opacity: 0.2
				}
		});
		tagText.origColor = color;
		tagText.tagElement = objref.getTagElement(keyword.text, objref);
		tagText.cloudInfo = objref.cloudInfo;
		// tagText.x = xPoint;
		// tagText.y = yPoint;
		// tagText.origX = xPoint;
		// tagText.origY = yPoint;
		//tagText.isDisabled = false;
		// if (Modernizr.touch) {
		tagText.on("tap mouseup",  objref.onTagTouchEnd);
		//tagText.on("touchmove",  objref.onTagSwiped);
		//tagText.on("touchstart mouseover",  objref.onTagTouchStart);
		
		objref.CloudCanvas.MainCloudLayer.add(tagText);
	
		objref.CloudCanvas.MainCloudLayer.draw();
		tagText.transitionTo({
			opacity : 1,
			duration: 1, //time to transition in second
			easing: 'strong-ease-in'
		});
		objref.$.cloudLoadingSpinner.hide();
	},
	visualizeTags : function(Tags, objref){		
		var layer = null;
		
		if (objref.CloudCanvas == null){
			objref.CloudCanvas = new Kinetic.Stage({
			container: objref.$.mainCloudCanvas.id,
			width: objref.canvasWidth,
			height: objref.canvasHeight
			});
		}
		if (objref.CloudCanvas.MainCloudLayer == null){
			layer = new Kinetic.Layer();
			//objref.CloudCanvas.add(layer);
			//objref.CloudCanvas.MainCloudLayer = layer;
		}
		else{
			layer = objref.CloudCanvas.MainCloudLayer;
		}
        var centerX = (objref.canvasWidth / 2);
        var centerY = (objref.canvasHeight / 2);
        for (var i = 0; i < Tags.length; i++) {
             var keyword = Tags[i];
            var xPoint = keyword.x + centerX ;
            var yPoint = keyword.y + centerY;
            var color = 'black';//colorsTheme2[~~(randomXToY(0, colorsTheme2.length-1))];
            var tagText = new Kinetic.Text({
                x: xPoint ,//- (keyword.width/2),
                y: yPoint ,//- (keyword.height/2),
                text: keyword.text.toUpperCase(),
                fontSize: keyword.size,
				lineHeight: 1,
                fontFamily: objref.fontName,
                textFill: color,
				fontStyle: 'normal',
                draggable: false,
                //align: "center",
                rotationDeg: keyword.rotate,
                //verticalAlign: "bottom",
				//padding: objref.padding,
                id: keyword.text, 
                name: "tag",
				 shadow: {
					color: 'rgba(0,0,0,0.1)',
					blur: 2,
					offset: [0, 0],
					opacity: 0.2
					}
            });
            tagText.origColor = color;
            tagText.tagElement = objref.getTagElement(keyword.text, objref);
			tagText.cloudInfo = objref.cloudInfo;
            tagText.x = xPoint;
            tagText.y = yPoint;
            tagText.origX = xPoint;
            tagText.origY = yPoint;
            tagText.isDisabled = false;
            // if (Modernizr.touch) {
            tagText.on("touchend mouseout",  objref.onTagTouchEnd);
			tagText.on("touchmove",  objref.onTagSwiped);
			tagText.on("touchstart mouseover",  objref.onTagTouchStart);
			//tagText.on("tap click",  objref.onTagTapped);
			// var rect = new Kinetic.Rect({
					// x: xPoint - (keyword.width/2),
					// y: yPoint - (keyword.height/2),
					  // width: keyword.width,
					  // height: keyword.height,
					  // fill: 'rgba(0,0,0,0.3)',
					  // stroke: 'rgba(0,0,0,0)',
					  // strokeWidth: 0
					// });
			//tagText.on("click",  objref.onTagTapped);
			//tagText.on("click", MouseClickTag);
            // } else {
            //tagText.on("mouseover", objref.onTagTouchStart);
            //tagText.on("mouseout", objref.onTagTouchEnd);
                // tagText.on("click", MouseClickTag);
            // }
			//layer.add(rect);
            layer.add(tagText);
        }
		if (objref.CloudCanvas.MainCloudLayer == null){	
			objref.CloudCanvas.add(layer);
			objref.CloudCanvas.MainCloudLayer = layer;
		}
        layer.draw();
		objref.$.cloudLoadingSpinner.hide();
		//objref.$.cloudLoadingSpinner.hide();
	},
	onTagSwiped : function(evt){
	evt.shape.attrs.shadow =  {
					color: 'rgba(255,0,0,0.9)',
					blur: 15,
					offset: [0, 0],
					opacity: 0.8
					};
	},
	getTagElement: function(keyword, objref) {
        var maxNum = objref.cloudTags.length;
        for (var i = 0; i < maxNum; i += 1) {
            if (objref.cloudTags[i].Keyword.toLowerCase() == keyword.toLowerCase()) {
                return objref.cloudTags[i];
            }
        }
    },
	onTagTouchStart : function(evt){
	evt.shape.attrs.shadow =  {
					color: 'rgba(0,0,0,0.6)',
					blur: 50,
					offset: [0, 0],
					opacity: 0.8
					};
		//evt.shape.setFontSize(evt.shape.getFontSize()*1.2);
		evt.shape.getLayer().draw();
	
	},
	onTagTouchEnd : function(evt){
		var keyword = d3.event.currentTarget
	// evt.shape.attrs.shadow =  {
					// color: 'rgba(0,0,0,0.3)',
					// blur: 50,
					// offset: [0, 0],
					// opacity: 0.8
					// };
					
		//evt.shape.setFontSize(evt.shape.getFontSize()/1.2);
		// evt.shape.setTextFill('gray');
		// evt.shape.getLayer().draw();
		
		var signalEvent = new Object();
		signalEvent.nextView = new Object();
		signalEvent.nextView.name = "subCloudView";
		signalEvent.nextView.source = "mainCloudView";
		signalEvent.nextView.destroyViews = "none";
		
		signalEvent.inData = new Object();
		signalEvent.inData.tagElement = this.getTagElement(keyword.textContent, this);
		signalEvent.inData.cloudInfo = this.cloudInfo;
		//signalEvent.data.minFontSize = this.
		enyo.Signals.send("onChangeView", signalEvent);
		return true;
		//next steps:
		//1- move a handle to this keyword to the next page.
		
	},
	onTagTapped : function(evt){
	
	},
	keywordTouched : function(){
	
	},    
	clearCloud : function (){
		if(this.CloudCanvas != null)
		{
			if (this.CloudCanvas.MainCloudLayer != null){
				this.CloudCanvas.MainCloudLayer.removeChildren();
				this.CloudCanvas.MainCloudLayer.draw();
			}
		}
		
	},
	calcTrends : function(){
		if (this.trendsWorkerThread == null){
			this.trendsWorkerThread = new Worker("source/cloud/thread_trends.js");
			this.trendsWorkerThread.addEventListener("message", this.onDoneTrendCalc, false);
			this.trendsWorkerThread.objref = this;
			this.trendsWorkerThread.postMessage({cloudInfo : this.cloudInfo});
		}
		this.$.totalShared.setContent(this.getTotalPosts());
	},
	onDoneTrendCalc : function(e) {
		for(var i=0; i < e.data.friendsArray.length; i++){
			var friendImage = this.objref.$.friendsList.createComponent({kind:"MiTrendz.FreindImage"/*, ontap:"friendPictureTapped"*/ } ); //src : e.data.friendsArray[i].ProfileImageUrl, noStretch: true, classes: "friendSelectorImage", ontap : "trendingPictureTapped"});
			var inData = new Object();
			inData.friendObject = e.data.friendsArray[i];
			inData.cloudInfo = this.objref.cloudInfo;
			friendImage.render(inData, this.objref.curView);
		}
		this.objref.$.friendsCount.setContent(e.data.friendsArray.length);
		
		for(var i=0; i < e.data.photosArray.length; i++){
			var trendImage = this.objref.$.photosList.createComponent({kind:"MiTrendz.TrendingPhoto"/*, ontap: "trendingPictureTapped"*/} ); //src : e.data.friendsArray[i].ProfileImageUrl, noStretch: true, classes: "friendSelectorImage", ontap : "trendingPictureTapped"});
			//trendImage.ontap = this.objref.trendingPictureTapped;
			trendImage.photoObject = e.data.photosArray[i];
			trendImage.friendInfo = e.data.friendsArray[i];
			trendImage.cloudInfo = this.objref.cloudInfo;
			trendImage.render();
		}
		this.objref.$.photosCount.setContent(e.data.photosArray.length);
		
		if (e.data.videosArray.length == 0){
			this.objref.$.trendingBar.removeComponent(this.objref.$.trendingVideos);
			this.objref.$.trendingVideos.destroy();
		}
		else{
			for(var i=0; i < e.data.videosArray.length; i++){
				var trendVideo = this.objref.$.videosList.createComponent({kind:"MiTrendz.TrendingPhoto"} ); //src : e.data.friendsArray[i].ProfileImageUrl, noStretch: true, classes: "friendSelectorImage", ontap : "trendingPictureTapped"});
				trendVideo.photoObject = e.data.videosArray[i];
				trendVideo.friendInfo = e.data.friendsArray[i];
				trendVideo.cloudInfo = this.objref.cloudInfo;
				trendVideo.render();
			}
			this.objref.$.videosCount.setContent(e.data.videosArray.length);
		}
		
		
		//this.objref.$.firstFriend.setSrc(e.data.firstFriend.ProfileImageUrl);
		//this.objref.$.secondFriend.setSrc(e.data.secondFriend.ProfileImageUrl);
	},
	friendPictureTapped : function(){
		this.moveToView("fullFriendView", "mainCloudView");
	},
	trendingPictureTapped : function (inSender, inEvent){
		this.moveToView("fullPostView", "mainCloudView");
	},
	resizeHandler : function (){
		 // this.reflow();
		 // this.clearCloud();
		 // this.draw();
	},
	getTotalPosts : function(){
		var totalPosts = this.cloudInfo.Facebook.PostsNumber;
		for(var photokey in this.cloudInfo.Facebook.SharedPhotos) totalPosts++;
		for(var videokey in this.cloudInfo.Facebook.SharedVideos) totalPosts++;
		
		return totalPosts;
	},
	cloudScrolled : function(inSender, inEvent){
		if (inEvent.srcElement.scrollLeft > 0){
			// var leftGradient = inSender.parent.createComponent({kind:"Control", classes :"rightSideGradient"});
			// leftGradient.render();
			
		}
		return true;
	},
	
	});
