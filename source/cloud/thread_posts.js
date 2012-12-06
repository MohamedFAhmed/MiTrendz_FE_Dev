

addEventListener("message", onStart, false);

function onStart (e){
//Let's iterate through posts
	var relatedPostsNum = 0;
	var relatedPosts = e.data.relatedPosts;
	var suggestedArticles = e.data.suggestedArticles;
	var suggrstedArticlesNum = 0;
		for (var key in relatedPosts) {
			if (key in e.data.cloudInfo.Facebook.SharedPhotos) {
				relatedPosts[key] = e.data.cloudInfo.Facebook.SharedPhotos[key];
				relatedPosts[key].postType = "photo";
				relatedPostsNum++;
				continue;
				//relatedPhotos.push();
			}
			if (key in e.data.cloudInfo.Facebook.SocialPosts) {
				relatedPosts[key] = e.data.cloudInfo.Facebook.SocialPosts[key];
				relatedPosts[key].postType = "socialPost";
				relatedPostsNum++;
				continue;
				//relatedPhotos.push();
			}
			if (key in e.data.cloudInfo.Facebook.SharedVideos) {
				relatedPosts[key] = e.data.cloudInfo.Facebook.SharedVideos[key];
				relatedPosts[key].postType = "video";
				relatedPostsNum++;
				continue;
			}
		}
	for(var articleId in suggestedArticles){
		if (articleId in e.data.cloudInfo.Facebook.SuggestedArticles){
			suggestedArticles[articleId] = e.data.cloudInfo.Facebook.SuggestedArticles[articleId];
			suggestedArticles[articleId].postType = "suggestedArticle";
			suggrstedArticlesNum++;
		}
	}
	var result = new Object();
	result.relatedPosts = relatedPosts;
	result.postsNumber = relatedPostsNum;
	result.suggestedArticles= suggestedArticles;
	result.suggestedArticlesNum = suggrstedArticlesNum;
	//result.objref = objref;
	postMessage(result);
	
}