/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.SubCloud",
	kind: "Control",
	tag: "div",
	fit: true,
	//allowHTML: true, 
	classes: "mainCloud",
	cloudTags : null,
	CloudCanvas : null,
	viewRendered : false,
	colorsTheme : ['#4D4200','#433B08','#3F3600','#796A0F','#796C1B','#003911', '#063213','#002F0E','#0D6A29','#186A31','#4D0A00','#431008','#3F0900', '#791E0F','#79281B','#110034', '#12062E', '#0E002B', '#290D67', '#301767'],
	fontSizeBuffer : 5,
	fontName : "HaettenschweilerRegular",
	d3Vis : null,
    published: {
		HighlightedKws : [],
		DrilledDown : false,
		SubCloudWidth : 0,
		SubCloudHeight : 0,
		subCloudWorkerThread : null,
		relPostsWorker : null,
		prevViewName : "mainCloudView",
		tagElement : null,
		subCloudfontName : "HaettenschweilerRegular",	
		cloudInfo : null,
		minFontSize : 10,
		fontSizeStep: 7,
		curView : null,
	},
	events: {
		onCloudTapped:""
	},
	handlers: {
		ontap : "controlTapped"
	},
	components : [
		{kind : "Control", style: "height: 100%; width: 100%; margin: 0px;", components : [
			{kind : "FittableRows", fit: true, style : "height:100%;", classes:"", components : [
				{kind: "onyx.Toolbar",classes:"onyx-menu-toolbar", style:"height:50px; background: rgba(0,0,0,1);", components: [
					{kind: "FittableColumns", style:"width:100%", components: [
						{kind: "onyx.TooltipDecorator", style: "margin: 3px;",components: [
								{kind: "onyx.IconButton",
									src: "assets/back.png", style: "", ontap: "goBackTapped"},
								{kind: "onyx.Tooltip", content: "Back"}
						]}
					]}
				]},
				{kind:"FittableColumns", style:"width: 100%; height:100%; margin: 0px;", fit: true, components: [
						{name : "subCloud", kind: "Control", style:"width: 40%; height: 100%; "/*, ontap : "resetSubcloud"*/},
						{name : "subCloudPosts", fit: true, kind:"MiTrendz.PostsList", style:"width: 60%; height:100%; box-shadow: 0px 0px 20px rgba(0,0,0,0.8);"}
				]}
			]}
		]}
	],
    create: function() {
        this.inherited(arguments);
		
    },
	
	render: function(inData, sourceView){	
		this.inherited(arguments);
		//this.cloudTags = Tags;
		//this.$.cloudLoadingSpinner.show();
		if (inData != null){
			this.tagElement = inData.tagElement;
			this.cloudInfo = inData.cloudInfo;
			this.curView = new Object();
			if (sourceView != null){
				this.curView.source = sourceView.source;
			}
			else{
				this.curView.source = "mainCloudView";
			}
			
			this.curView.name = "subCloudView";
			this.curView.destroyViews = "source";
		}
		
		this.fontName = MiTrendz.Utils.Storage.get("settings.cloud.fontName");
		if (this.fontName == "undefined"){
			this.fontName = "HaettenschweilerRegular";
		}
		this.minFontSize = parseInt(MiTrendz.Utils.Storage.get("settings.subcloud.minFontSize"));
		if (this.minFontSize == "undefined"){
			this.minFontSize = 15;
		}
		
		this.fontSizeStep = parseInt(MiTrendz.Utils.Storage.get("settings.subcloud.fontSizeStep"));
		if (this.fontSizeStep == "undefined"){
			this.fontSizeStep = 7;
		}
	},
	rendered : function(){
		this.inherited(arguments);
		//this.$.cloudActionBar.removeClass("onyx-toolbar");
	},
	renderView : function(){
		if (this.viewRendered == true){
			return;
		}
		if (this.subCloudWorkerThread == null){
			this.subCloudWorkerThread = new Worker("source/cloud/thread_subcloud.js");
			this.subCloudWorkerThread.addEventListener("message", this.onDoneCloudCalc, false);
			this.subCloudWorkerThread.objref = this;
			this.subCloudWorkerThread.postMessage({tagElement : this.tagElement, 
				subCloudWidth : parseInt(this.$.subCloud.getComputedStyleValue('width')), 
				subCloudHeight: parseInt(this.$.subCloud.getComputedStyleValue('height')),
				fontName : this.subCloudfontName
				});
		}
		//Let's now get related posts
		this.displayRelatedPosts();
		this.viewRendered = true;
	},
	 onDoneCloudCalc : function(e){
		this.objref.drawSubCloud(e.data.tags, this.objref);
	 },
	displayRelatedPosts : function(){
		//var relatedPosts = this.tagElement.PostsIds;
		if (this.relPostsWorker == null){
			this.relPostsWorker = new Worker("source/cloud/thread_posts.js");
			this.relPostsWorker.addEventListener("message", this.doneFindRelatedPosts, false);
			this.relPostsWorker.objref = this;
			this.relPostsWorker.postMessage({relatedPosts : this.tagElement.PostsIds, 
				cloudInfo : this.cloudInfo,
				suggestedArticles : this.tagElement.SuggestedArticles
				});
		}
		//Let's iterate through posts
		// for (var key in relatedPosts) {
			// if (key in this.cloudInfo.Facebook.SharedPhotos) {
				// relatedPosts[key] = this.cloudInfo.Facebook.SharedPhotos[key];
				// relatedPosts[key].postType = "photo";
				// continue;
				// //relatedPhotos.push();
			// }
			// if (key in this.cloudInfo.Facebook.SocialPosts) {
				// relatedPosts[key] = this.cloudInfo.Facebook.SocialPosts[key];
				// relatedPosts[key].postType = "socialPost";
				// continue;
				// //relatedPhotos.push();
			// }
			// if (key in this.cloudInfo.Facebook.SharedVideos) {
				// relatedPosts[key] = this.cloudInfo.Facebook.SharedVideos[key];
				// relatedPosts[key].postType = "video";
				// continue;
			// }
		// }
		
		//We need to sort them by date & time first 
		
		//Let's now show them
		//this.$.subCloudPosts.displayPosts(relatedPosts, this.cloudInfo);

	},
	doneFindRelatedPosts : function(e){
		this.objref.$.subCloudPosts.displayPosts(e.data.relatedPosts, e.data.postsNumber, e.data.suggestedArticles, e.data.suggestedArticlesNum,  this.objref.cloudInfo, this.objref.curView);
	},
	drawSubCloud : function(tags, objref){
		//let's get the list of related tags.
		tags.sort(function (a, b) {
            if (b.FontSizeBucket < a.FontSizeBucket)
                return -1;
            if (b.FontSizeBucket > a.FontSizeBucket)
                return 1;
            return 0;

        }); 
		objref.cloudTags = tags;
		objref.getFontSize(tags);
		objref.SubCloudWidth = parseInt(objref.$.subCloud.getComputedStyleValue('width'));
		objref.SubCloudHeight = parseInt(objref.$.subCloud.getComputedStyleValue('height'));
		
		
		// if (objref.CloudCanvas == null){
			// objref.CloudCanvas = new Kinetic.Stage({
			// container: objref.$.subCloud.id,
			// width: objref.SubCloudWidth,
			// height: objref.SubCloudHeight
			// });
		// }
		// if (objref.CloudCanvas.MainCloudLayer == null){
			// this.CloudCanvas.MainCloudLayer  = new Kinetic.Layer();
			// this.CloudCanvas.add(this.CloudCanvas.MainCloudLayer);
		// }
		
		var w = objref.SubCloudWidth,
					h = objref.SubCloudHeight;
			var svg = d3.select("#"+objref.$.subCloud.id).append("svg")
			.attr("width", objref.SubCloudWidth)
			.attr("height", objref.SubCloudHeight);
			var background = svg.append("g");
				this.d3Vis = svg.append("g")
			.attr("transform", "translate(" + [0 , 0 ] + ")");
		
        d3.layout.cloud(objref).size([objref.SubCloudWidth, objref.SubCloudHeight])
                .words(tags.map(function (tag) {
                    return { text: tag.keyword, size: tag.FontSize }; //10 + Math.random() * 20 
                }))
                .rotate(function (tag) { 
					 if (tag.text == objref.tagElement.Keyword){
					 return 0;
					 }
					else{
						return ~~(Math.random() * 2) * 90;  
					}
				})
                .font(objref.subCloudfontName)
                .padding(10)
                .fontSize(function (d) { return d.size; })
				.timeInterval(200)
				.on("word", this.d3VisualizeOneTag)
                //.on("end",  objref.visualizeTags)
                .start();
	},
	getClusteredKeywords: function () {
        var clusteredKws = [];
        for (var key in this.tagElement.ClusterKeywords) {
            clusteredKws.push(this.tagElement.ClusterKeywords[key]);
        }

        return clusteredKws;
    },
	getFontSize : function(Tags){
	var horizontal = false;
        var maxNum = Tags.length;
		
        for (var i = 0; i < maxNum; i++) {
			if (Tags[i].keyword.toLowerCase() == this.tagElement.Keyword.toLowerCase())
			{
				Tags[i].FontSize = (this.fontSizeStep * 5) + this.minFontSize;
			}
			else{
				//Tags[i].FontSize = (fontIncrement * Tags[i].FontSizeBucket) + minFont + this.fontSizeBuffer;
				Tags[i].FontSize = ((this.fontSizeStep * Tags[i].FontSizeBucket) + this.minFontSize) + this.fontSizeBuffer;
			}
            if (horizontal) {
                Tags[i].orientation = 0;
                horizontal = false;
            } else {
                Tags[i].orientation = 90;
                horizontal = true;
            }

        }
	},
	d3VisualizeOneTag : function(tag, objref){
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
		// text.tagElement = objref.getTagElement(tag.text, objref);
		// text.cloudInfo = objref.cloudInfo;
		// objref.$.cloudLoadingSpinner.hide();
	},
	visualizeOneTag : function(tag, objref){
		 var keyword = tag;
		var xPoint = keyword.x;
		var yPoint = keyword.y;
		var color = ""; 
		var kwShadow = {
				color: 'rgba(0,0,0,0.3)',
				blur: 5,
				offset: [0, 0],
				opacity: 0.2
				};
		if (tag.text == objref.tagElement.Keyword){
			color = "red";
			kwShadow = {
				color: 'rgba(0,0,0,0.8)',
				blur: 7,
				offset: [0, 0],
				opacity: 0.6
				};
		}
		else{
			color = objref.colorsTheme[~~(MiTrendz.Utils.Numbers.randomXToY(0, objref.colorsTheme.length-1))];
		}
		
		var tagText = new Kinetic.Text({
			x: xPoint,// - (keyword.width/2),
			y: yPoint,// - (keyword.height/2),
			text: keyword.text.toUpperCase(),
			fontSize: keyword.size - objref.fontSizeBuffer,
			fontFamily: objref.subCloudfontName,
			LineHeight : 1,
			textFill: color,
			fontStyle: 'normal',
			draggable: false,
			opacity: 0,
			//align: "center",
			rotationDeg: keyword.rotate,
			verticalAlign: "bottom",
			//padding: objref.padding,
			id: keyword.text, 
			name: "tag",
			shadow: kwShadow
		});
		tagText.origColor = color;
		
		if(keyword.text != objref.tagElement.Keyword){
			tagText.cloudInfo = objref.cloudInfo;
			tagText.clusterKwObject = objref.tagElement.ClusterKeywords[keyword.text];
			tagText.on("touchend mouseup",  objref.onTagTouchEnd);
			tagText.objref = objref;
			//tagText.on("touchmove",  objref.onTagSwiped);
			//tagText.on("touchstart mouseover",  objref.onTagTouchStart);
		}
		objref.CloudCanvas.MainCloudLayer.add(tagText);
		objref.CloudCanvas.MainCloudLayer.draw();
		tagText.transitionTo({
			opacity : 1,
			duration: 1, //time to transition in second
			easing: 'strong-ease-in'
		});
    },
	
	getTagElement: function(keyword, objref) {
        var maxNum = objref.cloudTags.length;
        for (var i = 0; i < maxNum; i += 1) {
            if (objref.cloudTags[i].keyword.toLowerCase() == keyword.toLowerCase()) {
                return objref.cloudTags[i];
            }
        }
    },
	onTagTouchEnd : function(){
		//Highlight related keywords (expensive for now)
		var keyword = d3.event.currentTarget;
		var tagElement = this.getTagElement(keyword.textContent, this);
		
		// for(var key in tagElement.clusterKwObject.PostsIDs){
			// this.highlightRelatedKws(key, this);
		// }
		this.$.subCloudPosts.showAndHideOthers(this.tagElement.ClusterKeywords[keyword.textContent].PostsIDs);
	},
	highlightRelatedKws : function(postId, objref){
		var kws = objref.CloudCanvas.MainCloudLayer.getChildren();
		for(var i=0; i < kws.length; i++){
			if (kws[i].hasOwnProperty('clusterKwObject')){
				if(postId in kws[i].clusterKwObject.PostsIDs){
					kws[i].attrs.shadow =  {
						color: 'rgba(0,0,0,1)',
						blur: 10,
						offset: [0, 0],
						opacity: 0.8
						};
					kws[i].setTextFill('rgba(0,0,0,0.5)');
				}
			}
		}
	},
	resetHighlightedKws : function(){
		var kws = this.CloudCanvas.MainCloudLayer.getChildren();
		for(var i=0; i < kws.length; i++){
			if (kws[i].hasOwnProperty('origColor')){
				kws[i].setTextFill(kws[i].origColor);
			}
		}
		this.CloudCanvas.MainCloudLayer.draw();
	},
	resetSubcloud : function(){
		this.$.subCloudPosts.showAll();
	},
	keywordTouched : function(){
	
	},    
    goBackTapped : function () {
		var signalEvent = new Object();
		signalEvent.nextView =  new Object();
		signalEvent.nextView.name = this.curView.source;
		signalEvent.nextView.source= this.name;
		signalEvent.nextView.destroyView = this.curView.destroyView;
		enyo.Signals.send("onChangeView", signalEvent);
		return true;
	}, 
	clearCloud : function (){
		if (this.CloudCanvas != null){
			if (this.CloudCanvas.MainCloudLayer != null){
				this.CloudCanvas.MainCloudLayer.removeChildren();
				this.CloudCanvas.MainCloudLayer.draw();
			}
		}
		
	},
	controlTapped : function(inSender, inEvent){
		if (inEvent.originator.name == "subCloud"){
			inSender.parent.resetHighlightedKws();
			inSender.parent.resetSubcloud();
		}
	}
	
});
