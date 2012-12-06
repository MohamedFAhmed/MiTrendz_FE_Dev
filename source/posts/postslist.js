/* File Created: June 12, 2012 */
enyo.kind({
	name: "MiTrendz.PostsList",
	kind: "FittableRows",
	
	//classes: "postsScroller",
	fit: true,
	draggable: false,
	postsList : null,
	cloudInfo : null,
	loadingTimer : null,
	postsDic : null,
	postsNumber : 0,
	relatedArticles : null,
	relatedArticlesNum : 0,
	childPosts : [],
	curView : null,
	curViewName : "subCloudView",
	components : [
			{name: "listInfo", kind: "Control", style : "bottom : 0px; position : absolute;  background :rgba(0,0,0,0.6); height: 35px; width: 100%; z-index: 100;", components : [
				{kind: "FittableColumns", style: "margin-left: 10px;", components :[
					{content :"friends posts ", style :"color:white; font-size: 15px;"},
					{name: "postsNum", content :"", style :"color:white; font-size: 15px; font-weight: bold; margin-left: 5px;"},
					{name: "relArticlesInfo", kind:"Control", style: "margin-left : 15px;", components : [
						{content :"Our picks", style :"color:white; font-size: 15px;"},
						{name: "relArticlesNum", content :"", style :"color:white; font-size: 15px; font-weight: bold; margin-left: 5px;"},
					]}
				]},
			]},
			{name:"postsScroller", kind:"Scroller",  vertical:"auto", horizontal: "hidden", strategyKind: "TouchScrollStrategy", classes: "postsScroller",   components:[
				{name: "postsList", kind: "com.Pre101.Masonry", style :"width:100%; height :100%; " , components :[
					{name: "waitSpinner", style:"background:transparent; border-radius:5px; padding:15px; position: absolute; top:50%; left: 50%; z-index: 1; width:100%;", components: [
						//{kind :"Image" , src : "assets/ajax-loader.gif"}
						{kind: "onyx.Spinner"}
					]},
					
				]},
				
				// {name:"temprep", kind:"Repeater", count: 5, components:[
					// {name: "frndimg", kind:"MiTrendz.PostSummary"}
				// ]}
			]},
			
		//]}
						
	],
    // create: function() {
        // this.inherited(arguments);
		// //this.$.cloudLoadingSpinner.show();
       
    // },
	 render: function(){
		 this.inherited(arguments);
		 
		// //this.$.cloudLoadingSpinner.show();
	 },
	// rendered : function(){
		// this.inherited(arguments);
	// }, 
	displayPosts : function (postsDic, postsNumber, relatedArticles, relatedArticlesNum, cloudInfo, sourceView){
	
		this.nextView = Object();
		this.cloudInfo = cloudInfo;
		this.postsDic = postsDic;
		this.postsNumber = postsNumber;
		this.relatedArticles = relatedArticles;
		this.relatedArticlesNum = relatedArticlesNum;
		//let's do cleanup first
		var initialRendered = 0;
		this.curView = sourceView;
		
		this.$.postsList.destroyComponents();
		for(var key in postsDic){
			if (initialRendered < 2){
				var postobj = postsDic[key];
				var postControl = null;
				if ((postobj.postType == "photo") || (postobj.postType == "video")){
					postControl = this.$.postsList.createComponent({kind : "MiTrendz.MediaQuickView"}, {owner: this.$.postsList});
				}
				if (postobj.postType == "socialPost"){
					postControl = this.$.postsList.createComponent({kind : "MiTrendz.PostSummary"}, {owner: this.$.postsList});
				}
				var inData = new Object();
				inData.postObject = this.postsDic[key];
				inData.friendInfo = this.cloudInfo.Facebook.Friends[this.postsDic[key].FriendIDInNetwork];
				inData.postIdInNetwork = key;
				postControl.render(inData, this.curView);
				this.childPosts.push(postControl);
				initialRendered++;
			}
			else{
				break;
			}
		}
		
		this.$.postsList.removeComponent(this.$.waitSpinner);
		this.$.postsNum.setContent(postsNumber);
		if (relatedArticlesNum == 0){
			this.$.listInfo.removeComponent(this.$.relArticlesInfo);
			this.$.relArticlesInfo.destroy();
		}
		else{
			this.$.relArticlesNum.setContent(relatedArticlesNum);
		}
		this.$.waitSpinner.destroy();
		this.loadingTimer=setInterval(this.displayRemaining,300, this);
		this.$.postsList.reflow();
		
	},
	displayRemaining : function(objref){
	var initialRendered = 0;
	for(var key in objref.postsDic){
			if (initialRendered >= 2){
				var postobj = objref.postsDic[key];
				var postControl = null;
				if ((postobj.postType == "photo") || (postobj.postType == "video")){
					postControl = objref.$.postsList.createComponent({kind : "MiTrendz.MediaQuickView"});
				}
				if (postobj.postType == "socialPost"){
					postControl = objref.$.postsList.createComponent({kind : "MiTrendz.PostSummary"});
				}
				var inData = new Object();
				inData.postObject = objref.postsDic[key];
				inData.friendInfo = objref.cloudInfo.Facebook.Friends[objref.postsDic[key].FriendIDInNetwork];
				inData.postIdInNetwork = key;
				postControl.render(inData, objref.curView);
				objref.childPosts.push(postControl);
				initialRendered++;
				continue;
			}
			initialRendered++;
			
		}
	if (objref.relatedArticles != null){
		for(var articleKey in objref.relatedArticles){
			var relArticle = objref.$.postsList.createComponent({kind : "MiTrendz.PostSummary"});
						relArticle.postObject = objref.relatedArticles[articleKey];
						relArticle.render();
		}
		
	}
	objref.$.postsList.reflow();
	clearInterval(objref.loadingTimer);
	},
	showAndHideOthers : function(showList) {
		var relatedCount = 0;
		for(var i=0; i < this.childPosts.length; i++){
			if (this.childPosts[i].hasOwnProperty('postIdInNetwork')){
				if (this.childPosts[i].postIdInNetwork in showList){
					relatedCount++;
					continue;
					
				}
				else{
					//Let's now remove it from the visible list	
					//this.childPosts[i].animatedHide();
					this.childPosts[i].destroy();
					//this.$.postsList.removeComponent(this.childPosts[i]);
				}
			}
		}
		this.$.postsList.render();
		this.$.postsList.reflow();
		this.$.postsScroller.scrollTo(0,0);
		//Let's update the count
		this.$.postsNum.setContent(relatedCount);
	},
	showAll : function(){
		for(var i=0; i < this.childPosts.length; i++){
			this.childPosts[i].show();
		}
		this.$.postsList.reflow();
		this.$.postsScroller.scrollTo(0,0);
		this.$.postsNum.setContent(this.childPosts.length);
	},
	
	
	
});
