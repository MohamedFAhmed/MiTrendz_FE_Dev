    enyo.kind({
	name: "MiTrendz.Utils.Numbers",
	kind: "Component",
	
	published :{
	},
	
	statics: {
		randomXToY : function (minVal, maxVal) {
				var randVal = minVal + (Math.random() * (maxVal - minVal));
				return Math.round(randVal);
			},
	}

});