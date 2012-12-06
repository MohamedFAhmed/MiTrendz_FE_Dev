/* File Created: June 12, 2012 */

function MiTrendzCloud(tags,tagSelectedEventHandler) {
    var CloudCanvas = null;
    this.HighlightedKws = [];
    var DrilledDown = false;
    var fontName = "HaettenschweilerRegular";
    var HighlightedKws = [];
    var canvasWidth = 0;
    var canvasHeight = 0;
    var colorsTheme = ['#4D4200','#433B08','#3F3600','#796A0F','#796C1B',
        '#003911', '#063213','#002F0E','#0D6A29','#186A31',
        '#4D0A00','#431008','#3F0900', '#791E0F','#79281B',
    '#110034', '#12062E', '#0E002B', '#290D67', '#301767'];
    var colorsTheme1 = ['#CA860A', '#C0910A', '#B35E00', '#CA530A', '#C0340A'];
    var colorsTheme2 = ['#B99CB3', '#B499AF', '#B38FAC', '#F8E2F4', '#F8F1F7'];
    var minFont = 15;
    var fontIncrement = 7;


    this.draw = function () {
        //Let's first get their font size
        getFontSize(tags);
        d3.layout.cloud().size([parseInt($('#' + "CloudContainer").css('width')), parseInt($('#' + "CloudContainer").css('height'))])
                .words(tags.map(function (tag) {
                    return { text: tag.Keyword, size: tag.FontSize }; //10 + Math.random() * 20 
                }))
                .rotate(function (tag) { return 0; }) //~~(Math.random() * 2) * 90; 
                .font(fontName)
                .padding(0)
                .fontSize(function (d) { return d.size; })
                .on("end", this.visualizeTags)
                .start();    
    };

    function getFontSize(Tags) {
        var horizontal = false;
        var maxNum = Tags.length;

        for (var i = 0; i < maxNum; i++) {
            Tags[i].FontSize = (fontIncrement * Tags[i].FontSizeBucket) + minFont;
            if (horizontal) {
                Tags[i].orientation = 0;
                horizontal = false;
            } else {
                Tags[i].orientation = 90;
                horizontal = true;
            }

        }
    }
    this.visualizeTags = function (Tags) {

        CloudCanvas = new Kinetic.Stage({
            container: "CloudContainer",
            width: parseInt($('#' + "CloudContainer").css('width')),
            height: parseInt($('#' + "CloudContainer").css('height'))
        });
        var layer = new Kinetic.Layer();


        $(layer.getCanvas()).css("-webkit-transform", "translateZ(0)");
        CloudCanvas.add(layer);
        var centerX = (CloudCanvas.getWidth() / 2);
        var centerY = (CloudCanvas.getHeight() / 2);
        for (var i = 0; i < Tags.length; i++) {
            var keyword = Tags[i];
            var xPoint = keyword.x + centerX;
            var yPoint = keyword.y + centerY;
            var color = colorsTheme2[~~(randomXToY(0, colorsTheme2.length-1))];
            var tagText = new Kinetic.Text({
                x: xPoint,
                y: yPoint,
                text: keyword.text,
                fontSize: keyword.size,
                fontFamily: fontName,
                textFill: color,
                draggable: false,
                align: "center",
                rotationDeg: keyword.rotate,
                verticalAlign: "middle",
                id: keyword.text,
                name: "tag"
            });
            tagText.origColor = color;
            tagText.tagElement = getTagElement(keyword.text);
            tagText.x = xPoint;
            tagText.y = yPoint;
            tagText.origX = xPoint;
            tagText.origY = yPoint;
            tagText.isDisabled = false;
            if (Modernizr.touch) {
                tagText.on("touchstart", MouseClickTag);
            } else {
                tagText.on("mouseover", MouseOverTag);
                tagText.on("mouseout", MouseLeaveTag);
                tagText.on("click", MouseClickTag);
            }
            layer.add(tagText);
        }
        layer.draw();
    };

    function getTagElement(keyword) {
        var maxNum = CloudInfo.Facebook.Tags.length;
        for (var i = 0; i < maxNum; i += 1) {
            if (CloudInfo.Facebook.Tags[i].Keyword == keyword) {
                return CloudInfo.Facebook.Tags[i];
            }
        }
    }
    function ResetCloud() {
        //steps:
        //1- Remove Words highlighting
        //2- Remove frinds images
        //3- Reset pictures view
        //4- Reset Videos view.
        ResetHighlightedKws();

    }
    function TouchedTag(even) {
        ResetCloud();
        FriendsPicManager.HideFriendsPictures();
        //ToggleCloudFreez();
        //MouseClickTag(event);
        MouseOverTag(event);
    }
    function MouseLeaveTag(event) {
        document.body.style.cursor = "default";
        //            if (CloudFrozen) {
        //                return;
        //            }
        //            ResetHighlightedKws();
        //            FriendsPicManager.HideFriendsPictures();
        //            SharedPhotosViewer.Reset();
        //            SharedVideosViewer.Reset();

    }
    function MouseOverTag(event) {
        //Algorithm:
        //1- Find this keyword corresponding tag in the cloud structure.
        //2- Find all other tags linked to this one
        //3- Change the color of this keyword and other related.
        //4- Show friend's pictures with the summary.
        //5- Show all pictures.
        //$('#data').append(event.shape.attrs.x + '     ' + event.shape.attrs.y + '<br>');
        if (event.shape.isDisabled) {
            return;
        }
        document.body.style.cursor = "pointer";
        if (CloudFrozen) {
            return;
        }



    }
    function MouseClickTag(event) {
        if (DrilledDown) {
            ResetKeywordsPositions();
            ResetHighlightedKws();
            FriendsPicManager.HideFriendsPictures();
            SharedPhotosViewer.Reset();
            SharedVideosViewer.Reset();
            DrilledDown = false;
            return;
        }

        var tagElement = event.shape.tagElement; // GetTag(event.shape.getName(), SelectedNetwork);
        //var relatedkws = GetRelatedTextBoxes(tagElement);
        if (tagElement != null) {
            HighlightKeyword(event.shape.attrs.id, 'red');
        }
//        for (var i = 0; i < relatedkws.length; i++) {
//            HighlightKeyword(relatedkws[i], 'blue');
//        }


        var clusteredKeywords = getClusteredKeywords(tagElement);
        getFontSize(clusteredKeywords);
        for (var x = 0; x < HighlightedKws.length; x++) {
            clusteredKeywords.push(HighlightedKws[x].tagElement);
        }


        generateSelectedTagCloud(clusteredKeywords);
        tagSelectedEventHandler(tagElement);
        return false;
    }

    function getClusteredKeywords(tagElement) {
        var clusteredKws = [];
        for (var key in tagElement.ClusterKeywords) {
            clusteredKws.push(tagElement.ClusterKeywords[key]);
        }

        return clusteredKws;
    }
    function generateSelectedTagCloud(selectedTags) {
        selectedTags.sort(function (a, b) {
            if (b.FontSizeBucket < a.FontSizeBucket)
                return -1;
            if (b.FontSizeBucket > a.FontSizeBucket)
                return 1;
            return 0;

        });
        d3.layout.cloud().size([parseInt($('#' + "CloudContainer").css('width')) / 2, parseInt($('#' + "CloudContainer").css('height')) / 2])
      .words(selectedTags.map(function (tag) {
          var keyword = "";
          if (tag.hasOwnProperty('keyword')) {
              keyword = tag.keyword;

          } else {
              keyword = tag.Keyword;
          }
          return { text: keyword, size: tag.FontSize }; //10 + Math.random() * 20 
      }))
      .rotate(function (tag) { return 0; }) //~~(Math.random() * 2) * 90; 
	  .font(fontName)
	  .padding(0)
      .fontSize(function (d) { return d.size; })
      .on("end", drawSelectedTags)
      .start();
    }
    function drawSelectedTags(selectedTags) {

        var movedTags = {};
        var clusteredKwsLayer = CloudCanvas.ClusteredKwsLayer;

        if (clusteredKwsLayer == null) {
            clusteredKwsLayer = new Kinetic.Layer();
            CloudCanvas.ClusteredKwsLayer = clusteredKwsLayer;
            CloudCanvas.add(clusteredKwsLayer);
        }

        $(clusteredKwsLayer.getCanvas()).css("-webkit-transform", "translateZ(0)");
        var centerX = (CloudCanvas.getWidth() / 2);
        var centerY = (CloudCanvas.getHeight() / 2);
        for (var i = 0; i < selectedTags.length; i++) {
            var keyword = selectedTags[i];
            var tag = CloudCanvas.get('#' + keyword.text)[0];
            if (tag != null) {
                movedTags[keyword.text] = tag;
                tag.transitionTo({
                    x: keyword.x + centerX,
                    y: keyword.y + centerY,
                    alpha: 1,
                    duration: 0.2
                });
                tag.isDisabled = true;
            } else {

                var newTagText = new Kinetic.Text({
                    x: keyword.x + centerX,
                    y: keyword.y + centerY,
                    text: keyword.text,
                    fontSize: keyword.size,
                    fontFamily: fontName,
                    textFill: "grey",
                    draggable: true,
                    align: "center",
                    rotationDeg: keyword.rotate,
                    verticalAlign: "middle",
                    id: keyword.text,
                    name: "clusterTag"
                });
                newTagText.origColor = 'grey';
                newTagText.isDsabled = true;
                if (Modernizr.touch) {
                    newTagText.on("touchstart", MouseClickTag);
                } else {
                    newTagText.on("mouseover", MouseOverTag);
                    newTagText.on("mouseout", MouseLeaveTag);
                    newTagText.on("click", MouseClickTag);
                }

                clusteredKwsLayer.add(newTagText);
            }

        }
        clusteredKwsLayer.draw();
        moveAwayOtherTags(movedTags);
        DrilledDown = true;
    }
    function moveAwayOtherTags(selectedTags) {
        //var selectedTagsDic = {};
        var moveX = 150;
        var moveY = 150;
        var centerX = parseInt($('#' + "CloudContainer").css('width')) / 2;
        var centerY = parseInt($('#' + "CloudContainer").css('height')) / 2;

        var tags = CloudCanvas.get('.tag');
        var maxVal = tags.length;
        for (var i = 0; i < maxVal; i++) {
            var tag = tags[i];
            if (selectedTags[tag.tagElement.Keyword] != null) {
                continue;
            }
//            if (tag.x >= centerX) {
//                tag.x += moveX;
//            } else {
//                tag.x -= moveX;
//            }
//            if (tag.y >= centerY) {
//                tag.y += moveY;
//            } else {
//                tag.y -= moveY;
//            }
            tag.transitionTo({
//                x: tag.x,
//                y: tag.y,
                alpha: 0,
                duration: 0.3,
                easing: 'ease-out'
            });
            tag.isDisabled = true;
        }
    }
    function ResetKeywordsPositions() {
        var clusteredKwsLayer = CloudCanvas.ClusteredKwsLayer;
        if (clusteredKwsLayer != null) {
            clusteredKwsLayer.removeChildren();
        }
        clusteredKwsLayer.draw();
        var cloudTags = CloudCanvas.get('.tag');
        var maxVal = cloudTags.length;
        for (var i = 0; i < maxVal; i++) {
            var tag = cloudTags[i];
            tag.x = tag.origX;
            tag.y = tag.origY;
            tag.transitionTo({
                x: tag.x,
                y: tag.y,
                alpha: 1,
                duration: 0.3,
                easing: 'ease-out'
            });
            tag.isDisabled = false;
        }
    }
//    //get the corresponding tag of the passed keyword
//    function GetTag(keyword, network) {
//        for (var counter in CloudInfo.Facebook.Tags) {
//            if (keyword == CloudInfo.Facebook.Tags[counter].Keyword) {
//                return CloudInfo.Facebook.Tags[counter];
//            }
//        }

//        return null;
//    }
    //returns array of keywords related to the highlighted one.
    function GetRelatedTextBoxes(tagElement) {
        var relatedKeywords = [];
        for (var clusterkw in tagElement.ClusterKeywords) {
            var relkw = tagElement.ClusterKeywords[clusterkw];
            var textbox = CloudCanvas.ids[relkw.keyword];
            if (textbox != null) {
                relatedKeywords.push(textbox.attrs.id);
            }
        }
        return relatedKeywords;
    }
//    function GetDisplayedTag(keyword) {
//        for (var i in CloudInfo.Facebook.Tags) {
//            if (CloudInfo.Facebook.Tags[i].Keyword == keyword) {
//                return CloudInfo.Facebook.Tags[i];
//            }
//        }
//    }
    //Highlights the keyword in the cloud
    function HighlightKeyword(cloudKeywordId, color) {
        var cloudKeyword = CloudCanvas.ids[cloudKeywordId];
        cloudKeyword.setTextFill(color);
        cloudKeyword.parent.draw();
        HighlightedKws.push(cloudKeyword);
    }
    //Returns keywords into their original colors
    function ResetHighlightedKws() {
        for (var i = 0; i < HighlightedKws.length; i++) {
            var highlightedkw = HighlightedKws[i];
            highlightedkw.setTextFill(highlightedkw.origColor);
            var layer = highlightedkw.parent;
            layer.draw();
        }
        HighlightedKws = [];
    }
    //Set's the interface when the cloud is basically with no keywords
    //However, we may still have keywords and videos to display.
    function DisplayEmptyCloud(cloud) {
    }

    this.getWidth = function () {
        if (canvasWidth == 0) {
            canvasWidth = CloudCanvas.getWidth();
        }
        return canvasWidth;
    };
    this.getHeight = function () {
        if (canvasHeight == 0) {
            canvasHeight = CloudCanvas.getHeight();
        }
        return canvasHeight;
    };
}
MiTrendzCloud.prototype.drawCloud = function () {
    this.draw();
};

