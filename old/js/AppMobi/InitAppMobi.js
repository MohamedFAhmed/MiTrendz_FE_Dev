/* File Created: July 20, 2012 */


function InitAppMobi() {
    
      //*** Webview Maintenance ********
        /* This code prevents the webview from moving on a swipe */
        preventDefaultScroll = function(event) {
            // Prevent scrolling on this element
            event.preventDefault();
            window.scroll(0,0);
            return false;
        };
    
    
    //*** Device Ready Code **********
        //This event handler is fired once the AppMobi libraries are ready
        //AppMobi is ready to roll
    function onDeviceReady() {
        if (AppMobi.isnative == true) {
            // Application is running on native device
            console.log("Running on a native device");
            if (AppMobi.istablet == true) {
                console.log("Native device is a tablet");
                //use AppMobi viewport to allow this iPad-designed application to size down to an iPhone //or an Android handset device with a resolution lower than 1024x768.
                var iPortraitWidth = 768;
                var iLandscapeWidth = 1024;

                //use AppMobi viewport
                AppMobi.display.useViewport(iPortraitWidth, iLandscapeWidth);

                //lock orientation
                AppMobi.device.setRotateOrientation("landscape");
                AppMobi.device.setAutoRotate(true);

                //manage power
                AppMobi.device.managePower(true, false);

                //hide splash screen
                AppMobi.device.hideSplashScreen();
                window.document.addEventListener('touchmove', preventDefaultScroll, false);
                
            }
        }

        getData();
			
        }
        
        //initial event handler to detect when appMobi is ready to roll
		document.addEventListener("appMobi.device.ready",onDeviceReady,false); 
        
        
      
        
    
		
        
        /* This sample function records an event ID, as well as an optional
        set of name/value pairs as a query string to the statMobi Analytics
        logs.*/
        function addAnalyticsDataPoint(eventID,queryString)
        {
           try
           {
               if (queryString==null) { queryString = ""; }
               AppMobi.analytics.logPageEvent("/application/" + eventID +
        ".event", queryString, "", "", 0, "index.html");
           }
           catch(e) {}
        }
        /* Drop this javascript function into the <head> element of your
        application's index.html page and call it everywhere you want to
        record an analytics event. It takes two parameters. The first is an
        event identifier string and the second is an optional key/value query
        string parameter. */
 
        /* Live Updates */

        /* If you decide to allow your application to handle Live Updates itself, 
        this snippet will give you a starting point. Drop this javascript code 
        into your application's <body> HTML tag to detect if an update has been 
        successfully downloaded. */

        /* This event handler captures the event thrown when an update becomes available while an application is running */
        document.addEventListener("appMobi.device.update.available",onUpdateAvailable,false); 
        function onUpdateAvailable(evt) {
          /* test to see if the event is appMobi.device.update.available */
          if (evt.type == "appMobi.device.update.available") {
            /* there is an update available *while* the application is running - decide what to do */
            if (confirm(evt.updateMessage)==true) {
              updateApplication();
            }
            else {
              updateApplicationLater();
            }
          }
        }

        document.addEventListener("appMobi.device.ready",onDeviceReadyTestForUpdate,false);
        function onDeviceReadyTestForUpdate(evt)
        {
          /* appMobi.updateAvailable indicates whether or not an over the air update is available or not. */
          if (AppMobi.updateAvailable==true)
          {
            //there is an application update available at startup
            if (confirm(AppMobi.updateMessage)==true) {
              updateApplication();
            }
            else {
              updateApplicationLater();
            }
          }
        }

        function updateApplication() {
            /* installs an update if one is available */
            AppMobi.device.installUpdate();
        }
            
        function updateApplicationLater() {
            /* add any code to indicate that the update has been postponed */
            alert("The update has been postponed");
        }
}

  
