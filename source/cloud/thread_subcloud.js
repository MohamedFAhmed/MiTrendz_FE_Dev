//importScripts("../../lib/d3/d3.js", "../../lib/d3/d3.layout.cloud.js");

addEventListener("message", onStart, false);

function onStart (e){
	this.tagElement = e.data.tagElement;
	this.subCloudWidth = e.data.subCloudWidth;
	this.subCloudHeight = e.data.subCloudHeight;
	this.fontName = e.data.fontName;
	
	var clusteredKws = getClusteredKeywords();
	//Let's add the center keyword (the selected one).
	var selectedTag = new Object();
	selectedTag.keyword = this.tagElement.Keyword;
	selectedTag.FontSize = 5;
	selectedTag.FontBucket = 7;
	clusteredKws.push(selectedTag);
	///////////
	getFontSize(clusteredKws);
	//doneCalc(clusteredKws);
	var result = new Object();
	result.tags = clusteredKws;
	postMessage(result);
	
	function getClusteredKeywords() {
		var clusteredKws = [];
		for (var key in this.tagElement.ClusterKeywords) {
			clusteredKws.push(this.tagElement.ClusterKeywords[key]);
		}

		return clusteredKws;
	};
	
	function getFontSize(Tags){
		var horizontal = false;
        var maxNum = Tags.length;
		var fontIncrement = 5;
		var minFont = 10;
		var MaxBucketNum = 7;
		
        for (var i = 0; i < maxNum; i++) {
			if (Tags[i].keyword.toLowerCase() == this.tagElement.Keyword.toLowerCase())
			{
				Tags[i].FontSize = (fontIncrement * 7) + minFont;
			}
			else{
				Tags[i].FontSize = (fontIncrement * Tags[i].FontSizeBucket) + minFont;
			}
            if (horizontal) {
                Tags[i].orientation = 0;
                horizontal = false;
            } else {
                Tags[i].orientation = 90;
                horizontal = true;
            }

        }
	};
	
	
	
	
}



