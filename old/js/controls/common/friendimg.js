/* File Created: June 16, 2012 */


function FriendsPicturesManager(containerName, cloudInfo) {

    this.ShowFriendsPictures = _ShowFriendsPictures;
    this.HideFriendsPictures = _HideFriendsPictures;
    containerName = '#' + containerName;
    var DisplayedFriendsPictures = [];

    function _ShowFriendsPictures(tagElement) {
        var docfrag = document.createDocumentFragment();
        var friendsIds = getListofFriends(tagElement);
        var htmlDiv = getFriendImgHtmlTemplate();
        var centerX = CloudViewer.getWidth() / 2;
        var centerY = CloudViewer.getHeight() / 2;
        var startPoint = new Point(centerX, centerY);
        var diam = 250;
        var imageAngleStep = 95 * (180 / (Math.PI * diam));
        var angle = 0;
        for (var key in friendsIds.items) {

            if ((angle >= 75) && (angle <= 95)) {
                angle = 95;
            }
            
            var endX = centerX + (diam * Math.cos(toRadian(angle)));
            var endY = centerY + (diam * Math.sin(toRadian(angle)));
            var endPoint = new Point(endX, endY);
            
            var friendInfo = cloudInfo.Facebook.Friends[key];
            var postsIdsDic = friendsIds.getItem(key);
            //var firstPostInfo = getFriendRelatedPosts(friendInfo.Posts, cloudInfo);
            var friendPic = new FriendPicture(startPoint, endPoint, friendInfo, postsIdsDic, containerName, htmlDiv, cloudInfo, angle);

            var domElement = friendPic.Show();
            docfrag.appendChild(domElement);
            
            DisplayedFriendsPictures.push(friendPic);
            angle += imageAngleStep;
        }
        $(containerName).append(docfrag);

        function toRadian(angle) {
            return angle* Math.PI / 180;
        }
    
  function getFriendImgHtmlTemplate() {
            var htmlTemplate = "";
            //Let's first get the html template
            //Let's get first the photo's skeleton
            $.ajax({
                type: 'GET',
                async: false,
                url: '../../../html/templates/slates/friendPhoto.htm',
                success: function (data) {
                    htmlTemplate = data;
                }
            });
//            $.ajaxSetup({
//                 async: false
//                 });
            return htmlTemplate;
  
        }
  function getListofFriends(tagElement) {
    //Let's find all friends caused this tag to appear.
    var friendsIds = new HashTable();
    for (var key in tagElement.PostsIds) {
        var postStruct = CloudInfo.Facebook.SocialPosts[key];
        if (postStruct != null) {
            if (!friendsIds.hasItem(key)) {
                var postsDic = [];
                postsDic[key] = key;
                friendsIds.setItem(postStruct.FriendIDInNetwork, postsDic);
            }else {
                if (friendsIds.getItem(postStruct.FriendIDInNetwork)[key] == null) {
                    friendsIds.getItem(postStruct.FriendIDInNetwork)[key] = key;
                }
            }
                

        }
    }
      return friendsIds;


}
function getFirstPost(postsIds, cloudInfo) {
    for (var postId in postsIds) {
        var postInfo = cloudInfo.Facebook.SocialPosts[postId];
        if (postInfo != null) {
            return postInfo;
        }

    }
    return null;
}
}

    
function _HideFriendsPictures() {
    $('div').remove('.friendPhotoContainer');
}

}


function FriendPicture(startPoint, endPoint, friendInfo, postsIdsDic, containerName, htmlTemplate, cloudInfo, angle) {
    //this.Posts = posts;
    this.StartingPoint = startPoint;
    this.EndPoint = endPoint;
    this.friendInfo = friendInfo;
    this.postsIdsDic = postsIdsDic;
    this.cloudInfo = cloudInfo;
    this.angle = angle;
    //var ContainerName = '#' + ContainerName;


    this.DisplayPicture = function () {
        //steps
        //1- Add it to the container
        //2- Set the position
        var htmltext = filloutFrindTemplate();

        var domobj = document.createElement('div');
        $(domobj).append(htmltext);
        domobj = domobj.children[0];
        //var domobj = $(htmltext).appendTo(containerName);
        if ((this.angle >= 95) && (this.angle <= 260)) {
            $(domobj).find('.imgContainerLeft').attr("class", ".imgContainerRight");
            $(domobj).find('.postsSummaryContainerLeft').attr("class", ".postsSummaryContainerRight");
        }
        $(domobj).css('left', randomXToY(endPoint.x - 10, endPoint.x + 10) + 'px');
        $(domobj).css('top', randomXToY(endPoint.y - 10, endPoint.y + 10) + 'px');

        //        if (Modernizr.touch) {
        //            // bind to touchstart, touchmove, etc and watch `event.streamId`
        //            $(domobj).bind('tap', MouseClick);
        //        } else {
        // bind to normal click, mousemove, etc
        $(domobj).bind('click', { objRef: this }, MouseClick);
        //       $(domobj).bind('mouseover', MouseOver);
        //        $(domobj).bind('mouseleave', MouseLeave);


        //     }


        $(domobj).animate({
            opacity: '1',
            left: endPoint.x + 'px',
            top: endPoint.y + 'px'
        }, {
            duration: 300,
            specialEasing: {
                width: 'linear',
                height: 'easeOutBounce'
            },
            complete: function () {
                //$(this).after('<div>Animation complete.</div>');
            }
        });

        return domobj;


    };

    function filloutFrindTemplate() {

        var template = $('.root', htmlTemplate).html();

        var firstPost = null;
        for (var key in postsIdsDic) {
            firstPost = cloudInfo.Facebook.SocialPosts[key];    
            break;
        }
        var view = {
            Name: friendInfo.Name,
            friendImg: friendInfo.ProfileImageUrl,
            postsSummary: firstPost.FriendMessage,
            PostTime: prettyDate(firstPost.PostDate)
        };
        var output = Mustache.render(template, view);
        return output;
    }
        
    
 
    function MouseOver(event) {
        document.body.style.cursor = "pointer";
    }
    function MouseLeave(event) {
        document.body.style.cursor = "default";
    }
    function MouseClick(event) {
        var objRef = event.data.objRef;
        var postsIds = objRef.postsIdsDic;
        var postsArray = [];
        for (var key in postsIds) {
            postsArray.push(objRef.cloudInfo.Facebook.SocialPosts[key]);
        }
        var friendPosts = new FriendPosts(postsArray, objRef.friendInfo);
        friendPosts.Show();
    }
    
}
;

FriendPicture.prototype.Show = function () {
   return this.DisplayPicture();
};

FriendPicture.prototype.Hide = function() {

};
