

addEventListener("message", onStart, false);

function onStart (e){
//Let's iterate through posts
	var cloudInfo = e.data.cloudInfo;
	var result = new Object();
	//result.relatedPosts = relatedPosts;
	//Let's get the top two friends
	var friendsArray = [];
	var photosArray = [];
	var videosArray = [];
	
	for (var key in cloudInfo.Facebook.Friends) {
		cloudInfo.Facebook.Friends[key].postsCount = getSize(cloudInfo.Facebook.Friends[key].Posts);
		friendsArray.push(cloudInfo.Facebook.Friends[key]);
		
	}
	
	friendsArray.sort(function (a, b) {
            if (b.postsCount < a.postsCount)
                return -1;
            if (b.postsCount > a.postsCount)
                return 1;
            return 0;

        }); 
	
	for (var key in cloudInfo.Facebook.SharedPhotos) {
		cloudInfo.Facebook.SharedPhotos[key].postType = "photo";
		photosArray.push(cloudInfo.Facebook.SharedPhotos[key]);
	}
	photosArray.sort(function (a, b) {
            if (b.LikesCount < a.LikesCount)
                return -1;
            if (b.LikesCount > a.LikesCount)
                return 1;
            return 0;

        }); 
	
	for (var key in cloudInfo.Facebook.SharedVideos) {
		cloudInfo.Facebook.SharedVideos[key].postType = "video";
		videosArray.push(cloudInfo.Facebook.SharedVideos[key]);
	}
	videosArray.sort(function (a, b) {
            if (b.LikesCount < a.LikesCount)
                return -1;
            if (b.LikesCount > a.LikesCount)
                return 1;
            return 0;

        }); 
	result.friendsArray = friendsArray;
	result.photosArray = photosArray;
	result.videosArray = videosArray;
//	result.secondFriend = friendsArray[1];
	
	postMessage(result);
	
	function getSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
}