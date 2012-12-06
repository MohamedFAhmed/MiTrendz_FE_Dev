/* File Created: July 20, 2012 */


        ////////// GLOBAL VARIABLES //////////////
        var CloudInfo = null;
        var SharedPhotosViewer = null;
        var SharedVideosViewer = null;
        var CloudViewer = null;
        var SelectedNetwork = 'Facebook';

        var CloudFrozen = false;
        var FriendsPicManager = null;
        var backgroundImages = ['background1.jpg', 'background2.jpg', 'background3.jpg', 'background4.jpg', 'background5.jpg', 'background6.jpg', 'background7.jpg',
            'background8.jpg', 'background9.jpg', 'background10.jpg', 'background11.jpg', 'background12.jpg', 'background13.jpg', 'background14.jpg', 'background16.jpg',
            'background17.jpg', 'background18.jpg', 'background19.jpg', 'background20.jpg', 'background21.jpg', 'background22.jpg', 'background23.jpg', 'background24.jpg', ];
        ////////// END OF GLOBAL VARIABLES //////////////
        //Document Ready Steps:
        //1- Get the cloud for the specified date
        //2- Show the busy indicator
        //3- Visualize Cloud data
        //  A- Place keywords on the canvas, which requires: keeping a handle for, reference the tag element
        //      1- We have the x & y set from the server
        //      2- We'll just place them in the canvas as stated by the server by applying: font size, type, rotation.
        //      3- Add an event handler to handle mouse over (or click in case of mobile devices).
        //  B- Place videos at the right side
        //  C- Place photos at the left side 
        //  D- Update the cloud info call out.

        function InitializeApp() {
         
            
            //Tsting integration with AppMobi Framework
            //InitAppMobi();
            setBackgroundImage();
            getData();

        }
        function setBackgroundImage() {
            $('body').css('background', "url(../../imgs/backgrounds/" + backgroundImages[~ ~(randomXToY(0, backgroundImages.length - 1))] + ") no-repeat");
        }
        function getData() {

            setPageElementsDimensions();

            var now = new Date();
            var userId = GetQueryStringParams('uid');
            if (userId == null) {
                userId = 7;
            }
            var startTime = new Date();
            startTime = startTime.setDate(now.getDate() - 1);
            GetCloud(dateFormat(startTime, "isoDateTime"), dateFormat(now, "isoDateTime"), userId, 'facebook', 40);

//            $(window).resize(windowResized);
//            $(window).bind('orientationchange', deviceOrientationChanged);
        }
        //////////////GENERAL UI RELATED FUNCTIONS///////////////////
        function windowResized() {
            //LEt's resize all controls
            setPageElementsDimensions();
        }
        function setPageElementsDimensions() {
            var windowHeight = $(document).height();
            windowHeight -= 30 + 50;
            $('#PhotosViewer,#PhotosContainer,#CloudContainer,#VideosContainer,#VideosViewer').css('height', windowHeight);

        }
        function deviceOrientationChanged(event) {
            if ((orientation == 0)  || (orientation == 180)){
                
            }
            else if ((orientation == 90) || (orientation == -90)){
                
            }
            setPageElementsDimensions();
            
        }
        //Calls the server to get user's cloud
        function GetCloud(startTime, endTime, userId, networks, maxwords) {


            var qString = 'StartTime=' + startTime + '&EndTime=' + endTime + '&MaxWordsNum=' + maxwords + '&UserId=' + userId + '&CombinedResults=false&SortByAltWeight=false&callback=?';
            $.getJSON('http://98.225.46.100:20000/api/WebApis/GetUserCloud', qString, CloudDataReceived).error(onCloudRetreivalError);
        }
        //Get called when cloud retrieved successfuly from the server
        function CloudDataReceived(cloud) {
            CloudInfo = cloud;
            FriendsPicManager = new FriendsPicturesManager('CloudContainer', CloudInfo);
            VisualizeVideos();
            VisualizePictures();
            VisualizeCloud(CloudInfo.Facebook.Tags);
        }
        
        function VisualizeCloud(tags) {
            CloudViewer = new MiTrendzCloud(tags, tagSelected);
            CloudViewer.drawCloud();
        }
        function tagSelected(tagElement) {
            ShowFrindsPhotos(tagElement);
            ShowRelatedPictures(tagElement);
            ShowRelatedVideos(tagElement);
        }
       
        //informs the user that something went wrong
        function onCloudRetreivalError(error)
        { }
        function MouseClickAnywhere(event) {
           
                
                ResetCloud();
                ResetKeywordsPositions();
                FriendsPicManager.HideFriendsPictures();
                SharedPhotosViewer.Reset();
                SharedVideosViewer.Reset();
           
        }
        function ShowRelatedPictures(tagElement) {
            SharedPhotosViewer.ShowRelatedPhotos(tagElement.PostsIds);
        }
        function ShowRelatedVideos(tagElement) {
            SharedVideosViewer.ShowRelatedPhotos(tagElement.PostsIds);
        }
        /////////////////START OF DATA STRUCTURE //////////////////////
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        //////////END OF DATA STRUCTURES/////////////////////////
        //displaying friends photos caused a keyword to appear in the cloud.
        function ShowFrindsPhotos(tagElement) {
            FriendsPicManager.ShowFriendsPictures(tagElement, CloudInfo);
           
        }
        
        //place  initial pictures in the pictures view area
        function VisualizePictures() {
            SharedPhotosViewer = new PhotosViewer(CloudInfo.Facebook.SharedPhotos, CloudInfo.Facebook.Friends, 'PhotosViewer', 'PhotosContainer', MediaActivated, MediaDeActivated, 'photo', 'left');
            SharedPhotosViewer.ShowMedia();
            var contrname = SharedPhotosViewer.contrName;
            var x = SharedPhotosViewer.getContainer();

        }
        //places initial videos in the videos view area
        function VisualizeVideos(videos) {
            SharedVideosViewer = new PhotosViewer(CloudInfo.Facebook.SharedVideos, CloudInfo.Facebook.Friends, 'VideosViewer', 'VideosContainer', MediaActivated, MediaDeActivated, 'video', 'right');
            SharedVideosViewer.ShowMedia();
            var containerName = SharedVideosViewer.contrName;
            var y = SharedVideosViewer.getContainer();

        }
        //updates the cloud info
        function UpdateCloudInfo(cloudInfo) { }
        //////////INTERACTION FUNCTIONS//////////////
        //Highlight related tags in the tags cloud
        function MediaActivated(postId) {
            //Let's get the id.
            var max = 0;
            //Let's find all related tags

            var relatedTags = GetRelatedTagsToPost(postId);
            max = relatedTags.length;
            for (var i = 0; i < max; i += 1) {
                HighlightKeyword(relatedTags[i], 'red');

            }
        }
        function MediaDeActivated() {
            if (!CloudFrozen) {
                ResetHighlightedKws();
            }
        }

        function GetRelatedTagsToPost(postId) {
            var tagsNames = [];
            var maxNum = CloudInfo.Facebook.Tags.length;
            for (var i = 0; i < maxNum; i += 1) {
                for (var key in CloudInfo.Facebook.Tags[i].PostsIds) {
                    //var tagPostid = CloudInfo.Facebook.Tags[i].PostsIds[key];
                    if (key == postId) {
                        tagsNames.push(CloudInfo.Facebook.Tags[i].Keyword);
                    }
                }
            }
            return tagsNames;

        };

        ///////////END OF INTERACTION function///////

    