enyo.kind({
	name: "MiTrendz.Utils.DateTime",
	kind: "Component",
	published :{
	},
	statics: {
		///////////////////TIME UTILITIES////////////////////////
        // Takes an ISO time and returns a string representing how
        // long ago the date represents.
        prettyDate : function (time) {
            var date = new Date((time || "").replace( /-/g , "/").replace( /[TZ]/g , " ")),
                diff = (((new Date()).getTime() - date.getTime()) / 1000), 
             dayDiff = Math.floor(diff / 86400);

            if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 1000)
                return;

            return dayDiff == 0 && (
                diff < 60 && "just now" ||
                    diff < 120 && "1 minute ago" ||
                        diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
                            diff < 7200 && "1 hour ago" ||
                                diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
                                    dayDiff == 1 && "Yesterday" ||
                                        dayDiff < 7 && dayDiff + " days ago" ||
                                            dayDiff < 31 && Math.ceil(dayDiff / 7) + " weeks ago" ||
											dayDiff > 31 && Math.ceil(dayDiff / 31) + " months ago" ||
											dayDiff > 365 && Math.ceil(dayDiff / 365) + " years ago";
		},
		
	ISODateString: function (d){
		function pad(n){return n<10 ? '0'+n : n}
		return d.getUTCFullYear()+'-'
			  + pad(d.getUTCMonth()+1)+'-'
			  + pad(d.getUTCDate())+'T'
			  + pad(d.getUTCHours())+':'
			  + pad(d.getUTCMinutes())+':'
			  + pad(d.getUTCSeconds())+'Z'
		}

		
		
		
	}

});