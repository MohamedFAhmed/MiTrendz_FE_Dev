
//Steps:
//1- Sort them by weight
//2- Place the first image in page at the center
//3- Place the four remaining photos as in the original algorithm


function MediaViewer(photos, frnds, contName, prntContainer, PhotoSelCallBack, PhotoDeselCallBack, mediaType, windowSide) {

    this.InfoDiv = "<div> </div>";
    this.containerName = '#' + contName;
    this.parentContainer = '#' + prntContainer;
    this.contrName = this.containerName;
    this.photoViewerWidth = parseInt($(this.containerName).css('width'));
    this.photosDic = photos;
    this.friends = frnds;
    this.CurrentMedia = null;
    this.MediaType = mediaType;
    var PhotoSelectedCallBack = PhotoSelCallBack;
    var PhotoDeSelectedCallBack = PhotoDeselCallBack;
    this.allSortedPhotos = [];
    this.WindowSide = windowSide;
    this.Visible = false;
    this.initialized = false;
    this.ToBeDisplayedPhotos = null;

    this.Initialize = function () {

        if (!this.initialized) {
     
            this.initialized = true;
        }
    };

    this.RemoveAll = function (containerName) {
        $(containerName).empty();
    };
    this.calculatePhotosPosition = function (sortedPhotos) {
        var centery = 0;
        var startPosition = 50;
        var centerx = this.photoViewerWidth / 2;
        for (var i = 0; i < sortedPhotos.length; i += 5) {
            if (i >= sortedPhotos.length) break;
            if ((i < sortedPhotos.length) && ((i + 1) < sortedPhotos.length)) {
                var secondPhotoHeight = 0;
                if (sortedPhotos[i + 2] != null) secondPhotoHeight = sortedPhotos[i + 2].DisplayHeight;
                centery = startPosition + Math.max(sortedPhotos[i + 1].DisplayHeight, secondPhotoHeight) + sortedPhotos[i].DisplayHeight / 2;
            } else {
                centery = startPosition + sortedPhotos[i].DisplayHeight / 2;
            }

            var centerPhoto = sortedPhotos[i];
            sortedPhotos[i].x = centerx - (centerPhoto.DisplayWidth / 2);
            sortedPhotos[i].y = centery - (centerPhoto.DisplayHeight / 2);
            sortedPhotos[i].zIndex = i + 5;

            if (i + 1 >= sortedPhotos.length) break;
            sortedPhotos[i + 1].y = (centerPhoto.y + randomXToY(-10, 10)) - sortedPhotos[i + 1].DisplayHeight;
            sortedPhotos[i + 1].x = (centerPhoto.x + centerPhoto.DisplayWidth / 2 + randomXToY(-10, 10));
            //sortedPhotos[i + 1].y = randomXToY(sortedPhotos[i + 1].y, sortedPhotos[i + 1].y - 30);
            if (sortedPhotos[i + 1].x + sortedPhotos[i + 1].DisplayWidth > this.photoViewerWidth) {
                sortedPhotos[i + 1].x -= (sortedPhotos[i + 1].x + sortedPhotos[i + 1].DisplayWidth) - this.photoViewerWidth;
            }
            sortedPhotos[i + 1].zIndex = i + 4;

            if (i + 2 >= sortedPhotos.length) break;
            sortedPhotos[i + 2].y = (centerPhoto.y + randomXToY(-10, 10)) - sortedPhotos[i + 2].DisplayHeight;
            sortedPhotos[i + 2].x = (centerPhoto.x + centerPhoto.DisplayWidth / 2 - sortedPhotos[i + 2].DisplayWidth);
            if (sortedPhotos[i + 2].x < 0) {
                sortedPhotos[i + 2].x = randomXToY(0, 10);
            }
            sortedPhotos[i + 2].zIndex = i + 3;

            if (i + 3 >= sortedPhotos.length) break;
            sortedPhotos[i + 3].y = (centerPhoto.y + centerPhoto.DisplayHeight) + randomXToY(-10, 20);
            sortedPhotos[i + 3].x = (centerPhoto.x - centerPhoto.DisplayWidth / 2) + randomXToY(-10, 10);
            if (sortedPhotos[i + 3].x < 0) {
                sortedPhotos[i + 3].x = randomXToY(0, 10);
                ;
            }
            sortedPhotos[i + 3].zIndex = i + 2;

            if (i + 4 >= sortedPhotos.length) break;
            sortedPhotos[i + 4].y = (centerPhoto.y + centerPhoto.DisplayHeight) + randomXToY(-10, 20);
            sortedPhotos[i + 4].x = (centerPhoto.x + centerPhoto.DisplayWidth / 2) + randomXToY(-10, 10);
            if (sortedPhotos[i + 4].x + sortedPhotos[i + 4].DisplayWidth > this.photoViewerWidth) {
                sortedPhotos[i + 4].x -= (sortedPhotos[i + 4].x + sortedPhotos[i + 4].DisplayWidth) - this.photoViewerWidth;
            }
            sortedPhotos[i + 4].zIndex = i + 1;
            // currentWindow++;
            startPosition = Math.max(sortedPhotos[i + 4].DisplayHeight + sortedPhotos[i + 4].y, sortedPhotos[i + 3].DisplayHeight + sortedPhotos[i + 3].y);
            //centery = windowSize / 2 + (windowSize * currentWindow);
            //centerx = PhotoViewerWidth / 2;
        }
    };
    this.CalcDisplaySize = function (sortedPhotos) {
        var containerWidth = $(this.containerName).css('width');

        var smallestWidth = containerWidth/3;
        var stepSize = 25;
        var bucketsSizes = {
            1: smallestWidth,
            2: smallestWidth * 2,
            3: smallestWidth * 3,
        };
        for (var i = 0; i < sortedPhotos.length; i++) {
            sortedPhotos[i].DisplayWidth = bucketsSizes[sortedPhotos[i].Bucket];

            var actualHeight = 0, actualWidth = 0;
            if (sortedPhotos[i].hasOwnProperty('Width')) {
                actualWidth = sortedPhotos[i].Width;
            }
            if (sortedPhotos[i].hasOwnProperty('Height')) {
                actualHeight = sortedPhotos[i].Height;
            }

            if (sortedPhotos[i].hasOwnProperty('PreviewImageWidth')) {
                actualWidth = sortedPhotos[i].PreviewImageWidth;
            }
            if (sortedPhotos[i].hasOwnProperty('PreviewImageHeight')) {
                actualHeight = sortedPhotos[i].PreviewImageHeight;
            }

            sortedPhotos[i].DisplayHeight = 150;
        }

    };
    this.GetPhotosSortedByWeight = function (photosDic) {
        var photosArray = [];
        for (var key in photosDic) {
            photosDic[key].id = key;
            photosArray.push(photosDic[key]);
        }
        photosArray = photosArray.sort(function (a, b) { return b.Weight - a.Weight; });
        return photosArray;

    };

    this.DisplayPhotos = function (sortedPhotos, friends, containerName, parentContainer) {
        var objRef = this;

        //Let's get first the photo's skeleton
        $.get('../../../html/templates/slates/SharedMedia.htm', function (data) {
            FormatAndShow(data, objRef);
        });


        function FormatAndShow(data, objRef) {
            var elements = [];
            var docfrag = document.createDocumentFragment();
            for (var i = 0; i < sortedPhotos.length; i++) {
                var photoInfo = sortedPhotos[i];
                var friendInfo = friends[photoInfo.FriendIDInNetwork];
                var photoUrl = "";
                if (photoInfo.hasOwnProperty('PreviewImageUrl')) {
                    photoUrl = photoInfo.PreviewImageUrl;
                }
                if (photoInfo.hasOwnProperty('IconUrl')) {
                    photoUrl = photoInfo.IconUrl;
                }

                var template = $('.root', data).html();
                var view = {
                    PhotoUrl: photoUrl,
                    Height: photoInfo.Height,
                    Width: photoInfo.Width,
                    FriendPhotoUrl: friendInfo.ProfileImageUrl,
                    FriendName: friendInfo.Name,
                    Summary: photoInfo.OriginalComment,
                    Time: prettyDate(photoInfo.PostDate)
                };
                var output = Mustache.render(template, view);
                photoInfo.html = output;
                elements.push(photoInfo);
                var domElement = AnimateAppearance(output, photoInfo, containerName, objRef);
                docfrag.appendChild(domElement);
            }
            $(containerName).append(docfrag);
            $("div.SharedMediaContainer").lazyload({
                newelements: elements,
                container: $(parentContainer),
                showCallBack: show,
                failure_limit: 20
            });
        };

        function show(domobj) {
            var images = $(domobj).find('img');
            for (var i = 0; i < images.length; i++) {
                $(images[i]).attr('src', $(images[i]).data("original"));
            }


            var x = $(domobj).data("x");
            var y = $(domobj).data("y");

            $(domobj).animate({
                opacity: '1',
                left: x + 'px',
                top: y + 'px'
            }, {
                duration: 500,
                specialEasing: {
                    width: 'linear',
                    height: 'easeOutBounce'
                },
                complete: function () {
                    //$(this).after('<div>Animation complete.</div>');
                }
            });
        };
    };
    function AnimateAppearance(htmltext, photoInfo, containerName, objRef) {
        //steps
        //1- Add it to the container
        //2- Set the position

        var domobj = document.createElement('div');
        $(domobj).append(htmltext);
        domobj = domobj.children[0];

        //$(htmltext).appendTo(containerName);
        $(domobj).id = photoInfo.id;
        $(domobj).css('opacity', 0);
        $(domobj).css('left', randomXToY(photoInfo.x, photoInfo.x - 30) + 'px');
        $(domobj).css('top', randomXToY(photoInfo.y, photoInfo.y - 30) + 'px');
        $(domobj).css('height', photoInfo.DisplayHeight);
        $(domobj).css('width', photoInfo.DisplayWidth);
        $(domobj).find('.SharedImage').css('height', photoInfo.DisplayHeight);
        $(domobj).find('.SharedImage').css('width', photoInfo.DisplayWidth);
        $(domobj).find('.InfoContainer').css('width', photoInfo.DisplayWidth);
        var infoContHeight = $(domobj).find('.InfoContainer').css('height');
        var infContLoc = photoInfo.DisplayHeight - parseInt(infoContHeight);
        $(domobj).find('.SharedMediaSummary').css('width', (photoInfo.DisplayWidth - 35) + 'px');
        $(domobj).find('.FriendName').css('width', (photoInfo.DisplayWidth - 35) + 'px');
        $(domobj).css('z-Index', photoInfo.zIndex);
        $(domobj).data('zIndex', photoInfo.zIndex);
        $(domobj).data('x', photoInfo.x);
        $(domobj).data('y', photoInfo.y);
        $(domobj).data('id', photoInfo.id);


        $(domobj).css({ WebkitTransform: 'rotate(' + randomXToY(-10, 10) + 'deg)' });


        $(domobj).bind('click', { objRef: objRef }, MouseClick);
        $(domobj).bind('mouseover', MouseOver);
        $(domobj).bind('mouseleave', MouseLeave);


        //    }

        return domobj;

    };
    function Tab(event) {

        MouseClick.call(this, event);

    };
    function MouseClick(event) {
        var photoId = $(this).data('id');
        var mediaDetails = event.data.objRef.photosDic[photoId];
        var friendInfo = event.data.objRef.friends[mediaDetails.FriendIDInNetwork];
        event.data.objRef.CurrentMedia = new SharedMediaDetails(mediaDetails, friendInfo, event.data.objRef.MediaType);
        event.data.objRef.CurrentMedia.Display();
    };
    function MouseOver(event) {
        document.body.style.cursor = "pointer";
        // var zIndex = $(this).data('zIndex' );
        $(this).css('z-Index', 500);
        PhotoSelectedCallBack($(this).data('id'));
    };
    function MouseLeave(event) {
        document.body.style.cursor = "default";
        $(this).css('z-Index', $(this).data('zIndex'));
        PhotoDeSelectedCallBack();
    };
    this.UpdateInfoDiv = function () {
        if (this.allSortedPhotos.length > 8) {
            $(this.parentContainer).append("<div id=\"InfoDiv\">Scroll for more N photos</div>");
            var domobj = $(this.parentContainer).find('#InfoDiv');
            $(domobj).css('width', this.photoViewerWidth);
            $(domobj).css('text-align', 'center');
            $(domobj).css('color', 'White');
            $(domobj).css('height', '20px');
            $(domobj).css('background', 'rgba(0,0,0,0.7)');
            $(domobj).css('position', 'fixed');
            $(domobj).css('bottom', 0);
            $(domobj).css('z-index', 1000);
            $(domobj).id = '';
        }
    };
}

PhotosViewer.prototype.getContainer = function () {

    return this.contrName;
};



PhotosViewer.prototype.ShowRelatedPhotos = function (postsIds) {
    var relatedPhotos = [];


    for (var key in postsIds) {
        if (key in this.photosDic) {
            relatedPhotos[key] = this.photosDic[key];
            //relatedPhotos.push();
        }

    }

    relatedPhotos = this.GetPhotosSortedByWeight(relatedPhotos);

    //We already have their display size, so let's calculate their position
    this.calculatePhotosPosition(relatedPhotos);
    this.UpdatePhotosCount(relatedPhotos.length);
    //Let's clean existing photos
    this.RemoveAll(this.containerName);
    if (this.Visible) {
        //Let's then display them
        this.DisplayPhotos(relatedPhotos, this.friends, this.containerName, this.parentContainer);
    } else {
        this.ToBeDisplayedPhotos = relatedPhotos;
    }

};

PhotosViewer.prototype.Reset = function () {
    this.RemoveAll(this.containerName);
    if (this.initialized) {
        this.calculatePhotosPosition(this.allSortedPhotos);
        this.UpdatePhotosCount(this.allSortedPhotos.length);
        if (this.Visible) {
            this.DisplayPhotos(this.allSortedPhotos, this.friends, this.containerName, this.parentContainer);
        } else {
            this.ToBeDisplayedPhotos = this.allSortedPhotos;
        }

    } else {
        this.ShowMedia();
    }

};

PhotosViewer.prototype.ShowMedia = function () {

    this.Initialize();
    this.allSortedPhotos = this.GetPhotosSortedByWeight(this.photosDic);
    this.CalcDisplaySize(this.allSortedPhotos);
    this.calculatePhotosPosition(this.allSortedPhotos);
    this.UpdatePhotosCount(this.allSortedPhotos.length);
    if (this.Visible) {
        this.DisplayPhotos(this.allSortedPhotos, this.friends, this.containerName, this.parentContainer);
        this.UpdateInfoDiv();

    } else {
        this.ToBeDisplayedPhotos = this.allSortedPhotos;
    }



};

PhotosViewer.prototype.UpdatePhotosCount = function (count) {
    var selector = ".MediaViewerInfo";
    $(selector).find('.MediaCount').html(count);
};


