enyo.kind({
	name: "MiTrendz.Forms.ValidationResult",
	kind: "Control",
	tag: "div",
	classes:"input_validation_control",
	published :{
		validInput : false,
		showIcon : true
	},
	components: [
		{name: "validationIcon", kind:"Image", src :"", classes: "input_validation_icon"},
		{name: "evalMessage", Content :"", classes: "input_validation_message"},
	],
	 create: function() {
        // create is called *after* the constructor chain is finished
        this.inherited(arguments);
        // this.$ hash available only *after* calling inherited create
    },
    destroy: function() {
        // do inherited teardown
        this.inherited(arguments);
    },
	render : function(){
		this.inherited(arguments);  
		this.$.validationIcon.hide();
		//this.$.evalMessage.hide();
	},
	rendered: function() {
    // important! must call the inherited method
		this.inherited(arguments);  
		this.$.validationIcon.hide();
	},
	setValidInputMessage : function(Message){
		
		if (this.showIcon){
			this.$.validationIcon.show();
			this.$.validationIcon.setSrc("assets/accept.png");
		}
		this.$.evalMessage.setContent(Message);
		this.$.evalMessage.addClass("valid_input_validation_message");
		this.$.evalMessage.removeClass("invalid_input_validation_message");
		this.validInput = true;
	},
	setInvalidInputMessage : function(Message){
		if (this.showIcon){
			this.$.validationIcon.setSrc("assets/cancel.png");
			this.$.validationIcon.show();
		}
		this.$.evalMessage.addClass("invalid_input_validation_message");
		this.$.evalMessage.removeClass("valid_input_validation_message");
		this.$.evalMessage.setContent(Message);
		this.validInput = false;
	},
	setInputValidationMessage : function(Message){
		this.$.validationIcon.hide();
		this.$.evalMessage.setContent(Message);
		this.$.evalMessage.removeClass("valid_input_validation_message");
		this.$.evalMessage.removeClass("invalid_input_validation_message");
		this.$.evalMessage.addClass("input_validation_message");
	},
	resetValidationMessage : function(){
		this.$.validationIcon.hide();
		this.$.evalMessage.setContent("");
		this.$.evalMessage.removeClass("valid_input_validation_message");
		this.$.evalMessage.removeClass("invalid_input_validation_message");
		this.validInput = false;
	},
	setInputValidity : function(flag){
		this.validInput = flag;
	}
	
});