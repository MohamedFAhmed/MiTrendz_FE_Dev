/* File Created: July 9, 2012 */


function FriendPosts(posts, friendInfo) {
    this.Posts = posts;
    this.FriendInfo = friendInfo;
    this.getFriendPostsHtml = function () {
            var htmlTemplate = "";
            //Let's first get the html template
            //Let's get first the photo's skeleton
            $.ajax({
                type: 'GET',
                async: false,
                url: '../../../html/templates/slates/friendPosts.htm',
                success: function (data) {
                    htmlTemplate = data;
                }
            });
            $.ajaxSetup({
                async: false
            });
            return htmlTemplate;

        };
        this.fillHtmlTemplate = function (template) {
            template = $('.root', template).html();
            var view = {
                FriendName: this.FriendInfo.Name,
                FriendImgUrl: this.FriendInfo.ProfileImageUrl
            };
            return Mustache.render(template, view);
            
        };
    this.GetpostsDetails = function() {

    };
    this. getSocialPostHtmlTemplate = function () {
        var htmlTemplate = "";    
        //Let's first get the html template
        if (htmlTemplate == "") {
            $.ajax({
                type: 'GET',
                async: false,
                url: '../../../html/templates/slates/PostDetails.htm',
                success: function(data) {
                    htmlTemplate = data;
                    htmlTemplate = $('.root', data).html();
                }
            });
        }
        
        return htmlTemplate;
    };
    
}

FriendPosts.prototype.Show = function () {
    //Steps:
    //1- Get the template
    //2- Fill the template with data
    //3- Create a dialog
    //4- Add generated details to the dialog

    var htmlTemplate = this.getFriendPostsHtml();
    var friendPostsHtml = this.fillHtmlTemplate(htmlTemplate);
    var domobj = document.createElement('div');
    $(domobj).append(friendPostsHtml);
    domobj = domobj.children[0];
    var postsContainer = $(domobj).find('.postsContainer');
    var max_value = this.Posts.length;
    var socialPostTemplate = this.getSocialPostHtmlTemplate();
    for (var i = 0; i < max_value; i++) {
        //Let's create the post html
        var postobj = new SocialPost(this.Posts[i]);
        var postHtml = postobj.getHtml(socialPostTemplate);
        //Let's add it to the overall posts html fragment.
        $(postsContainer).append(postHtml);
    }
    var docfrag = document.createDocumentFragment();
    docfrag.appendChild(domobj);
    //let's add to the dialog box and display
    var $dialog = $("<div></div>")
            .html(docfrag.firstChild.innerHTML)
            .dialog({
                autoOpen: true,
                modal: true,
                draggable: false,
                width: 430,
                height: 500,
                close: removeDialog
                
            });
            $(".ui-widget-overlay").click(function () {
                $(".ui-dialog-titlebar-close").trigger('click');
                $(this).dialog('destroy');
            });
            function removeDialog() {
                $(this).dialog('destroy').remove();
            }
}
;

FriendPosts.prototype.Hide = function(){
    
}