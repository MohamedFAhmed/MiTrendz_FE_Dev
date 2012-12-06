/* File Created: July 9, 2012 */

function SocialPost(pDetails) {
    this.PostDetails = pDetails;
    
    

    this.getfilledTemplate = function (htmlTemplate) {
        //var html = getHtmlTemplate();
        var view =
            {
                friendComment: this.PostDetails.FriendMessage,
                PostImage: this.PostDetails.LinkThumpImage,
                PostTime: prettyDate(this.PostDetails.PostDate),
                LinkToSharedResource: this.PostDetails.LinkToSharedResource,
                postImage: this.PostDetails.LinkThumpImage

            };
            var output = Mustache.render(htmlTemplate, view);
        return output;
    };
    

}

SocialPost.prototype.getHtml = function (htmlTemplate) {
    return this.getfilledTemplate(htmlTemplate);
}