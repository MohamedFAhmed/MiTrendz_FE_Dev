/* File Created: July 7, 2012 */

function SharedMediaDetails(mediaDetails, friendInfo, mediaType) {
    var maxWidth = 600;
    this.MediaInfo = mediaDetails;
    this.MediaType = mediaType;
    this.FriendInfo = friendInfo;


    this.getPhotoDetailsHtml = function () {
        var htmlTemplate = "";
        //Let's first get the html template
        //Let's get first the photo's skeleton
        $.ajax({
            type: 'GET',
            async: false,
            url: '../../templates/common/SharedMediaDetails.htm',
            success: function(data) {
                htmlTemplate = data;
            }
        });
        $.ajaxSetup({
            async: false
        });
        //        $.get('../../templates/common/SharedMediaDetails.htm', function (data) {
        //            htmlTemplate = data;
        //            formatSharedMediaDetails(data);
        //        });
        return htmlTemplate;

    };
    //Let's then populate the data.
    this.formatSharedMediaDetails = function (htmlTemplate) {



        
        var template = this.fillPhotoDetails(htmlTemplate);
        //Let's then call the social actions posts to get the html content
        var dialogDimensions = this.getDialogDimensions();

        //let's add to the dialog box and display
        var $dialog = $("<div></div>")
            .html(template)
            .dialog({
                autoOpen: true,
                modal: true,
                draggable: false,
                width: dialogDimensions.width ,
                height: dialogDimensions.height,
                close: removeDialog
            });
        $(".ui-widget-overlay").click(function () {
            $(".ui-dialog-titlebar-close").trigger('click');
            $(this).dialog('destroy');
        });
        $(".ui-dialog-titlebar").hide();
        setfullViewImage(dialogDimensions, $dialog);
        if (this.MediaType == 'video') {
            removeImageDisplay($dialog);
        } else if (this.MediaType == 'photo') {
            removeVideoDisplay($dialog);
        }
    };

    function removeDialog() {
        $(this).dialog('destroy').remove();
    }
    function removeImageDisplay(dialogDomObj) {
        var container = $(dialogDomObj).find('.SharedMediaDetailsContainer');
        $('img.SMDSharedImage').remove();
    }

    function removeVideoDisplay(dialogDomObj) {
        var container = $(dialogDomObj).find('.SharedMediaDetailsContainer');
        $('iframe.SMDVideo').remove();
    }
    
    function setfullViewImage(imageDimensions, dialogDomObj) {
        //Let's set the image
        var imgRef = dialogDomObj.find('.SMDImgContainer');
        imgRef.css('width', imageDimensions.width);
        imgRef.css('height', imageDimensions.height);
        //let's set the info panel width
        var infoContainer = dialogDomObj.find('.SMDInfoContainer');
        var socialActionsContainer = dialogDomObj.find('.SocialActionsContainer');
        var postText = dialogDomObj.find('.SMDSharedMediaSummary');
        infoContainer.css('width', imageDimensions.width);
        infoContainer.css('height', ($(postText).height() + 35) + 'px');
        socialActionsContainer.css('width', imageDimensions.width);
        //infoContainer.css('height', imageDimensions.height);
        

    };
    this.fillPhotoDetails = function(htmlTemplate) {
        var template = $('.root', htmlTemplate).html();
        var videoUrl = "";
        var photoInfo = this.MediaInfo;
        var photoDimensions = this.getLargeDisplayPhotoDimensions();
        var photoUrl = "";
        if (photoInfo.hasOwnProperty('PreviewImageUrl')) {
            //photoUrl = photoInfo.PreviewImageUrl;
            videoUrl = formatVideoUrl(photoInfo.LinkToSharedResource);
        }
        if (photoInfo.hasOwnProperty('IconUrl')) {
            photoUrl = photoInfo.IconUrl;

        }

        var view = {
            PhotoUrl: photoUrl,
            VideoUrl: videoUrl,
            Height: photoDimensions.height,
            Width: photoDimensions.width,
            FriendPhotoUrl: this.FriendInfo.ProfileImageUrl,
            FriendName: this.FriendInfo.Name,
            Summary: photoInfo.OriginalComment,
            Time: prettyDate(photoInfo.PostDate)
        };
        var output = Mustache.render(template, view);
        return output;
    };

    function formatVideoUrl(str) {
        return str.replace("watch?v=", "embed/");
    }

    this.getDialogDimensions = function() {
        var dialogDimensions = this.getLargeDisplayPhotoDimensions();
        if (dialogDimensions.height > $(window).height()) {
            dialogDimensions.height = $(window).height() - 50;
        }
        if (dialogDimensions.width > maxWidth) {
            dialogDimensions.width = maxWidth;
        }
        return dialogDimensions;
    };
    this.getLargeDisplayPhotoDimensions = function() {
        var photostruct = this.MediaInfo;
        var fullWidth = 400, fullHeight = 324;
        var photoDimensions = { height: fullHeight, width: fullWidth };

        
        //only initial dummy values
        photoDimensions.height = fullHeight;
        photoDimensions.width = fullWidth;

        if (photostruct != null) {
            if (photostruct.hasOwnProperty('Width')) {
                fullWidth = photostruct.Width;
            } else {
                if (photostruct.hasOwnProperty('PreviewImageWidth')) {
                    fullWidth = 400;
                }

            }
            if (photostruct.hasOwnProperty('Height')) {
                fullHeight = photostruct.Height;
            } else {
                if (photostruct.hasOwnProperty('PreviewImageHeight')) {
                    fullHeight = 324;
                }

            }
            if (fullWidth > maxWidth) {
                photoDimensions.width = maxWidth;
                photoDimensions.height = fullHeight * (maxWidth / fullWidth);
            } else {
                photoDimensions.width = fullWidth;
                photoDimensions.height = fullHeight;
            }

        }
        return photoDimensions;
    };
}


SharedMediaDetails.prototype.Display = function () {
    var htmlTemplate = this.getPhotoDetailsHtml();
    this.formatSharedMediaDetails(htmlTemplate);
};
SharedMediaDetails.prototype.Hide = function() {
    $(".ui-dialog-titlebar-close").trigger('click');
    $(this).dialog('destroy');
};