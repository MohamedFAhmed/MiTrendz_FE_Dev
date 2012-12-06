

addEventListener("message", onStart, false);

function onStart (e){
//Let's iterate through posts
	var friendPostsNum = 0;
	var friendPosts = e.data.friendPosts;
	//var suggestedArticles = e.data.suggestedArticles;
	//var suggrstedArticlesNum = 0;
		for (var key in friendPosts) {
			if (key in e.data.cloudInfo.Facebook.SharedPhotos) {
				friendPosts[key] = e.data.cloudInfo.Facebook.SharedPhotos[key];
				friendPosts[key].postType = "photo";
				friendPostsNum++;
				continue;
				//relatedPhotos.push();
			}
			if (key in e.data.cloudInfo.Facebook.SocialPosts) {
				friendPosts[key] = e.data.cloudInfo.Facebook.SocialPosts[key];
				friendPosts[key].postType = "socialPost";
				friendPostsNum++;
				continue;
				//relatedPhotos.push();
			}
			if (key in e.data.cloudInfo.Facebook.SharedVideos) {
				friendPosts[key] = e.data.cloudInfo.Facebook.SharedVideos[key];
				friendPosts[key].postType = "video";
				friendPostsNum++;
				continue;
			}
		}
	// for(var articleId in suggestedArticles){
		// if (articleId in e.data.cloudInfo.Facebook.SuggestedArticles){
			// suggestedArticles[articleId] = e.data.cloudInfo.Facebook.SuggestedArticles[articleId];
			// suggestedArticles[articleId].postType = "suggestedArticle";
			// suggrstedArticlesNum++;
		// }
	// }
	var result = new Object();
	result.friendPosts = friendPosts;
	result.friendPostsNumber = friendPostsNum;
	// result.suggestedArticles= suggestedArticles;
	// result.suggestedArticlesNum = suggrstedArticlesNum;
	//result.objref = objref;
	postMessage(result);
	
}