  enyo.kind({
	name: "MiTrendz.Utils.Strings",
	kind: "Component",
	
	published :{
	},
	statics: {
		truncate: function(str,n,useWordBoundary){
         toLong = str.length>n,
             s_ = toLong ? str.substr(0,n-1) : str;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '&hellip;' : s_;
		},

	}

});