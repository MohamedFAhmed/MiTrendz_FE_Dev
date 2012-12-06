

addEventListener("message", onStart, false);

function onStart (e){
//Let's iterate through posts
	//var friendPostsNum = 0;
	var friendTags = [];
	//var suggestedArticles = e.data.suggestedArticles;
	//var suggrstedArticlesNum = 0;
	for (var i=0; i < e.data.cloudInfo.Facebook.Tags.length; i++){
		var currTag = e.data.cloudInfo.Facebook.Tags[i];
		for(var postId in currTag.PostsIds){
			if (postId in e.data.friendPosts){
				friendTags.push(currTag);
				break; //no need to include the tag more than once :)
			}
		}
	}
	
		friendTags.sort(function (a, b) {
            if (b.FontSizeBucket < a.FontSizeBucket)
                return -1;
            if (b.FontSizeBucket > a.FontSizeBucket)
                return 1;
            return 0;

        }); 
	// for(var articleId in suggestedArticles){
		// if (articleId in e.data.cloudInfo.Facebook.SuggestedArticles){
			// suggestedArticles[articleId] = e.data.cloudInfo.Facebook.SuggestedArticles[articleId];
			// suggestedArticles[articleId].postType = "suggestedArticle";
			// suggrstedArticlesNum++;
		// }
	// }
	var result = new Object();
	result.friendTags = friendTags;
	//result.friendPostsNumber = friendPostsNum;
	// result.suggestedArticles= suggestedArticles;
	// result.suggestedArticlesNum = suggrstedArticlesNum;
	//result.objref = objref;
	postMessage(result);
	
}