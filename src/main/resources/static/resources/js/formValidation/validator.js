'use strict';

var Validator = {

    init: function() {

        this.Forms.init();

    },
    Forms: {

        init: function() {

            self = this;
            self.forms();

        },
        forms: function() {

            var $formAlert, $formError;

            // Basic Form 

            var $form               = $('.jsValidateForm');
            var $errorContainer     = $($form.attr('data-result-element'));
            var $errorLabelContainer= $errorContainer.find('.form-error ul');
            
            var options             = {

                ignore              : '[type="hidden"], [readonly="readonly"], [disabled="disabled"]',

                errorElement        : 'span',

                errorClass          : 'has-error',

                errorContainer      : $errorContainer,

                errorLabelContainer : $errorLabelContainer,

                wrapper             : "li",

                validClass          : "has-success",

                highlight           : function(element, errorClass) {

                    if ($(element).is('select')) {
                        $(element).closest('.form-group').addClass(errorClass);
                    } else {
                        $(element).closest('.form-group').find('span.glyphicon').remove();
                        if ($(element).attr("type") == "file") {
                        	$(element).closest('.form-group').addClass(errorClass);
                        } else {
                        	$(element).closest('.form-group').addClass(errorClass).append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
                        }
                    }

                },

                unhighlight         : function(element, errorClass, validClass) {

                    if ($(element).is('select')) {
                        $(element).closest('.form-group').removeClass(errorClass).addClass(validClass);
                    } else {
                        $(element).closest('.form-group').find('span.glyphicon').remove();
                        if ($(element).attr("type") == "file") {
                        	$(element).closest('.form-group').removeClass(errorClass).addClass(validClass);
                        } else {
                        	$(element).closest('.form-group').removeClass(errorClass).addClass(validClass).append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
                        }
                    }

                }
            };
            
            // default options
            $.validator.setDefaults( options );
            
            $form.each(function() {
                
                $( this ).validate();
            });
            
            
            $form.find('input, select, textarea').each(function(index) {

                if (!$(this).is(':hidden') && !$(this).hasAttr("readonly") && !$(this).hasAttr("disabled")) {

                    if ($(this).hasAttr('required')) {

                        var attrName= formatName($(this).attr("name"));
                        var reqMsg  = ($(this).hasAttr("data-val-msg"))     ? $(this).attr("data-val-msg")  : "Please enter " + attrName;
                        var type    = ($(this).hasAttr("data-val-type"))    ? $(this).attr("data-val-type") : $(this).attr("type");
                        var rules   = {
                            required : true,
                            messages : {
                                required : reqMsg
                            }
                        };
                        
                        // check input type
                        switch (type) {

                            // validate email address
                            case "email" :
                                var emailMsg            = ($(this).hasAttr("data-val-msg")) ? $(this).attr("data-val-msg") : "Please enter a valid " + attrName;
                                rules.email             = true;
                                rules.messages.email    = emailMsg;
                                break;

                            // validate url
                            case "url" :
                                var urlMsg              = ($(this).hasAttr("data-val-msg")) ? $(this).attr("data-val-msg") : "Please enter a valid " + attrName;
                                rules.url               = true;
                                rules.messages.url      = urlMsg;
                                break;

                            // validate url
                            case "number" :
                                var numberMsg           = ($(this).hasAttr("data-val-msg")) ? $(this).attr("data-val-msg") : "Please enter a valid " + attrName;
                                rules.number            = true;
                                rules.messages.number   = numberMsg;
                                break;

                            // validate password confirmation field
                            case "confirmPassword" :
                                if ($(this).hasAttr("data-val-equalto")) {
                                    var passMsg             = ($(this).hasAttr("data-val-msg")) ? $(this).attr("data-val-msg") : "Passwords do not match";
                                    rules.equalTo           = $(this).attr("data-val-equalto");
                                    rules.messages.equalTo  = passMsg;
                                }
                                break;

                            // validate RSA ID number
                            case "rsaid" :
                                var rsaidMsg            = ($(this).hasAttr("data-val-msg")) ? $(this).attr("data-val-msg") : "A valid RSA ID Number is required.";
                                rules.rsaid             = true;
                                rules.messages.rsaid    = rsaidMsg;
                                break;
                        }

                        // validate minimum length
                        if ($(this).hasAttr("minlen")) {
                            rules.minlength             = $(this).attr("minlen");
                            rules.messages.minlength    = jQuery.validator.format("At least {0} characters required on the " + attrName);
                        }

                        // validate maximum length
                        if ($(this).hasAttr("maxlength")) {
                            rules.maxlength             = $(this).attr("maxlength");
                            rules.messages.maxlength    = jQuery.validator.format("Enter no more than {0} characters on the " + attrName);
                        }

                        $(this).rules("add", rules);
                    }
                }
            });

        }

    }

};

// Validation Method
$.validator.addMethod("rsaid", function (value, element, param) {

    var idnumber = value;
 
    //1. numeric and 13 digits
    if (isNaN(idnumber) || (idnumber.length != 13)) {
        return false;
    }

    //2. first 6 numbers is a valid date
    var day         = idnumber.substring(4, 6);
    var month       = idnumber.substring(3, 2);
    var year        = idnumber.substring(0, 2);
    var tempDate    = new Date(year, month, day);

    if (!((tempDate.getYear() == year) &&
        (tempDate.getMonth() == month) &&
        (tempDate.getDate() == day))) {
        return false;
    }
 
    //3. luhn formula
    var tempTotal   = 0; 
    var checkSum    = 0; 
    var multiplier  = 1;

    for (var i = 0; i < 13; ++i) {
        tempTotal = parseInt(idnumber.charAt(i)) * multiplier;
        if (tempTotal > 9) {
            tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
        }
        checkSum    = checkSum + tempTotal;
        multiplier  = (multiplier % 2 == 0) ? 1 : 2;
    }
    if ((checkSum % 10) == 0) {
        return true;
    };
    return false;
});

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

function formatName(str) {
    return str.replace('_', ' ');
}

$(document).ready(function() {

    Validator.init();

});