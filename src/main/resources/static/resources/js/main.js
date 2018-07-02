/* *********************************************************************************
 * File for global JavaScript that is used throughout the project
 * 
 * File         : Global JavaScript file
 * Created on   : Aug 18, 2016
 * Author       : Rodney
 * *********************************************************************************/
/**
 * DataTable
 */
var oDataTable = {
    init: function (elem, obj) {
        if (obj !== undefined && typeof obj == "object") {
            console.log(obj)
            return elem.DataTable(obj);
        } else {
            return elem.DataTable({
            	destroy: true,
                "dom": '<"top"f>rt<"bottom"lip><"clear">',
                "oLanguage": {
                    "sLengthMenu": "Show _MENU_",
                    "oPaginate": {
                        "sPrevious": "←",
                        "sNext": "→"
                    }
                }
            });
        }
    }
}
var aceEditor = {
    init: function (id, theme, mode, autoscroll, minlines) {
        var id = (id === undefined) ? "editor" : id;
        var theme = (theme === undefined) ? "ace/theme/textmate" : theme;
        var mode = (mode === undefined) ? "ace/mode/handlebars" : mode;
        var autoscroll = (autoscroll === undefined) ? true : autoscroll;
        var minlines = (minlines === undefined) ? 100 : minlines;
        var editor = ace.edit(id);

        editor.setTheme(theme);
        editor.getSession().setMode(mode);
        editor.setAutoScrollEditorIntoView(autoscroll);
        editor.setOption("minLines", minlines);

        return editor;
    }
}
/**
 * App 
 */
var AdminApp = {
    init: function () {
        this.Menu.init();
    },
    Menu: {
        init: function () {
            self = this;
            self.menu();
        },
        menu: function () {
            var path = window.location.pathname.substr(1);
            var id = path.replace(/\//g, '_');
            if (id.indexOf("brand") >= 0 && id.indexOf("reseller") < 0) {
                $('ul.sidebar-menu li[data-id="admin_brand"]').addClass('active');
                $('ul.sidebar-menu li[data-id="admin_brand"]').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("admin_account") >= 0) {
                $('ul.sidebar-menu li[data-id="admin_account"]').addClass('active');
                $('ul.sidebar-menu li[data-id="admin_account"]').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("admin_user") >= 0) {
                $('ul.sidebar-menu li[data-id="admin_account"]').addClass('active');
                $('ul.sidebar-menu li[data-id="admin_account"]').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("profile_account_user") >= 0) {
                $('ul.sidebar-menu li[data-id="profile_account"]').addClass('active');
                $('ul.sidebar-menu li[data-id="profile_account"]').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("package") >= 0) {
                $('ul.sidebar-menu li[data-id="admin_package"]').addClass('active');
                $('ul.sidebar-menu li[data-id="admin_package"]').addClass('active');
                $('ul.sidebar-menu li[data-id="admin_package"]').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("controller") >= 0) {
                $('#con-tree').css('border-left', '3px solid #f16822');
                $('#con-tree').css('background', 'rgba(40, 57, 67, 1)');
                $('#con-tree a').css('color', 'white');
                $('#con-tree').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("gateway") >= 0) {
                $('#admin-tree').css('border-left', '3px solid #f16822');
                $('#admin-tree').css('background', 'rgba(40, 57, 67, 1)');
                $('#admin-tree a').css('color', 'white');
                $('#admin-tree').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("reseller") >= 0) {
                $('#reseller-tree').css('border-left', '3px solid #f16822');
                $('#reseller-tree').css('background', 'rgba(40, 57, 67, 1)');
                $('#reseller-tree a').css('color', 'white');
                $('#reseller-tree').find("i").addClass("icon-hover-text-load");
                if (id.indexOf("client") >= 0) {
                    $('#reseller_client_tree').find("i").addClass("icon-hover-text-load");
                } else if (id.indexOf("brand") >= 0) {
                    $('#reseller_brand_tree').find("i").addClass("icon-hover-text-load");
                }
            } else if (id.indexOf("isp") >= 0) {
                $('#isp_tree').css('border-left', '3px solid #f16822');
                $('#isp_tree').css('background', 'rgba(40, 57, 67, 1)');
                $('#isp_tree a').css('color', 'white');
                $('#isp_tree').find("i").addClass("icon-hover-text-load");
                $('#isp_branch_tree').find("i").addClass("icon-hover-text-load");
            } else if (id.indexOf("adsource") >= 0) {
                $('ul.sidebar-menu li[data-id="admin_adsource"]').addClass('active');
                $('ul.sidebar-menu li[data-id="admin_adsource"]').find("i").addClass("icon-hover-text-load");
            }else {
                $('ul.sidebar-menu li[data-id="' + id + '"]').addClass('active');
                $('ul.sidebar-menu li[data-id="' + id + '"]').find("i").addClass("icon-hover-text-load");
            }

            $('.user-panel > .user-menu a.dropdown-toggle').on('click', function (e) {
                e.preventDefault();
                $(this).parent('.dropdown').find('.dropdown-menu').toggleClass('in');
            });
        }
    }
}
/**
 * Form Validation Code 
 */
var FormValidator = {
    init: function (form) {
        self = this;
        self.validation(form);
    },
    validation: function (form) {
        var options = {};
        options.ignore = '[type="hidden"], [readonly="readonly"], [disabled="disabled"]';
        options.wrapper = 'li';
        options.errorElement = 'span';
        options.errorClass = 'has-error';
        options.validClass = 'has-success';
        options.highlight = function (elem, errclass) {
            if ($(elem).is('select')) {
                $(elem).closest('.form-group').addClass(errclass);
            } else {
                $(elem).closest('.form-group').find('span.glyphicon').remove();
                if ($(elem).attr("type") == "file") {
                    $(elem).closest('.form-group').addClass(errclass);
                } else {
                    $(elem).closest('.form-group').addClass(errclass).append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
                }
            }
        };
        options.unhighlight = function (elem, errclass, valclass) {
            if ($(elem).is('select')) {
                $(elem).closest('.form-group').removeClass(errclass).addClass(valclass);
            } else {
                $(elem).closest('.form-group').find('span.glyphicon').remove();
                if ($(elem).attr("type") == "file") {
                    $(elem).closest('.form-group').removeClass(errclass).addClass(valclass);
                } else {
                    $(elem).closest('.form-group').removeClass(errclass).addClass(valclass).append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
                }
            }
        };
        // default options
        $.validator.setDefaults(options);
        // validate form
        form.validate();
        // define custom validation rules
        self.rules(form);
    },
    rules: function (form) {
        form.find('input, select, textarea').each(function (index) {
            var input = $(this);
            // EXCLUSIONS ON VALIDATION (CUSTOM RULES):
            // ---------------------------------------
            // -> hidden fields
            // -> read-only fields
            // -> disabled fields
            if (input.is(':hidden') && !input.hasAttr("readonly") && !input.hasAttr("disabled")) {
                if (input.hasAttr('required')) {
                    var attrName = formatName(input.attr("name"));
                    var reqMsg = (input.hasAttr("data-val-msg")) ? input.attr("data-val-msg") : "Please enter " + attrName;
                    var type = (input.hasAttr("data-val-type")) ? input.attr("data-val-type") : input.attr("type");
                    var rules = {
                        required: true,
                        messages: {
                            required: reqMsg
                        }
                    };
                    // check input type
                    switch (type) {

                        // validate email address
                        case "email" :
                            var emailMsg = (input.hasAttr("data-val-msg")) ? input.attr("data-val-msg") : "Please enter a valid " + attrName;
                            rules.email = true;
                            rules.messages.email = emailMsg;
                            break;

                            // validate url
                        case "url" :
                            var urlMsg = (input.hasAttr("data-val-msg")) ? input.attr("data-val-msg") : "Please enter a valid " + attrName;
                            rules.url = true;
                            rules.messages.url = urlMsg;
                            break;

                            // validate url
                        case "number" :
                            var numberMsg = (input.hasAttr("data-val-msg")) ? input.attr("data-val-msg") : "Please enter a valid " + attrName;
                            rules.number = true;
                            rules.messages.number = numberMsg;
                            break;

                            // validate password confirmation field
                        case "confirmPassword" :
                            if (self.hasAttr("data-val-equalto")) {
                                var passMsg = (input.hasAttr("data-val-msg")) ? input.attr("data-val-msg") : "Passwords do not match";
                                rules.equalTo = input.attr("data-val-equalto");
                                rules.messages.equalTo = passMsg;
                            }
                            break;
                    }

                    // validate minimum length
                    if (input.hasAttr("minlen")) {
                        rules.minlength = input.attr("minlen");
                        rules.messages.minlength = $.validator.format("At least {0} characters required on the " + attrName);
                    }

                    // validate maximum length
                    if (self.hasAttr("maxlength")) {
                        rules.maxlength = self.attr("maxlength");
                        rules.messages.maxlength = $.validator.format("Enter no more than {0} characters on the " + attrName);
                    }

                    self.rules("add", rules);
                }
            }
        });
    }
}
/**
 * Google Maps API Code
 */
var GoogleMapsApi = {
    init: function (id, options) {
        map = {};
        self = this;
        if (id == 'branchLocatorMap2') {
            var zoom = 8;
        } else {
            var zoom = 2
        }
        self.drawMap(id, options, zoom);
    },
    drawMap: function (id, options, zoom) {
        var lt = 0;
        var ln = 0;
        if (typeof options === "object") {
            $.each(options, function (i, m) {
                lt = parseFloat(m[0].lat) || -29;
                ln = parseFloat(m[0].lng) || 30;
            });
        }
        var mapProp = {
            zoom: zoom,
            scrollwheel: false,
            center: new google.maps.LatLng(lt, ln)
        };
        // create map
        map = new google.maps.Map(document.getElementById(id), mapProp);
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
        if (options !== undefined && typeof options === "object") {
            if (options.markers !== undefined && typeof options.markers === "object") {
                self.createMarkers(options.markers);
            }
        }
    },
    createMarkers: function (obj) {
        var infowindow = new google.maps.InfoWindow();
        if (typeof obj === "object") {
            $.each(obj, function (i, m) {
                var lt = parseFloat(m.lat);
                var ln = parseFloat(m.lng);
                marker = new google.maps.Marker({
                    map: map,
                    position: {lat: lt, lng: ln},
                    animation: google.maps.Animation.DROP,
                    title: m.name
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(m.name);
                        infowindow.open(map, marker);
                    };
                })(marker, i));
            });
        }
    },
    redrawMap: function () {
        google.maps.event.trigger(map, 'resize');
    }
}
/**
 Edits made by Lee Hicks
 12/10/2016
 lee@wifire.co.za
 */
var componentForm = {
    country: 'long_name'
};
function initMap(mapidsent) {

    if (mapidsent == "addBranchMap") {
        if ($('#lat').val() == "" || $('#lng').val() == "") {
            var lat = -29;
            var lng = 31;
        } else {
            var lat = parseFloat($('#lat').val());
            var lng = parseFloat($('#lng').val());
        }
        var myLatLng = {lat: lat, lng: lng};
        var map = new google.maps.Map(document.getElementById(mapidsent), {
            center: {lat: lat, lng: lng},
            zoom: 5
        });

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(lat, lng)
        });
    } else {
        var lat = parseFloat($('#lat').val()) || 0;
        var lng = parseFloat($('#lng').val()) || 0;
        var myLatLng = {lat: lat, lng: lng};

        var map = new google.maps.Map(document.getElementById(mapidsent), {
            center: {lat: lat, lng: lng},
            zoom: 10
        });
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: $('#branchName').val()
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent($('#branchName').val());
                infowindow.open(map, marker);
            };
        })(marker));
    }

    var input = /** @type {!HTMLInputElement} */(
            document.getElementById('addressInput'));

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }


        document.getElementById('lat').value = place.geometry.location.lat();
        document.getElementById('lng').value = place.geometry.location.lng();

        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                $("#branchCountrySelect option").filter(function () {
                    return $(this).text() == val;
                }).prop('selected', true);
            }
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            //map.setZoom(2);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);

        getTimezone(place.geometry.location.lat(), place.geometry.location.lng());
    });
}
function getTimezone(latsent, lngsent) {
    var url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + latsent + "," + lngsent + "&timestamp=" + (Math.round((new Date().getTime()) / 1000)).toString() + "&sensor=false";
    $.ajax({
        url: url,
    }).done(function (response) {
        $("#branchTimeZoneDropDown option").filter(function () {
            return $(this).text() == response.timeZoneId;
        }).prop('selected', true);
    });
}
// onclick event for all a tags, idea is to show a loading spinner while page loads.
$(document).on("click", "a", function (event) {
    var hasref = $(this).attr('href');
// if the a tag contains an "#", we can assume that it is a tab panel and should not 
//show the loading the spinner. The "gw check is for the download button.
    if (hasref.indexOf("#") == -1 && hasref.indexOf("gw") == -1) {
        setloader();
    }
});
// the setloader function creates a div holding a loading spinner which is displayed 
// while page is loading.
function setloader() {
	var setLoadingheight = $('.wrapper').css("height");
    var topdiv = '<div id="loadingdiv" style="height:' + setLoadingheight + '">';
    topdiv += '<div id="holdspinner">';
    topdiv += '<i class="fa fa-spinner fa-spin"></i>';
    topdiv += '&nbsp;&nbsp;Loading';
    topdiv += '</div>';
    topdiv += '</div>';
    $("div:first").prepend(topdiv);
}

//Function to create a confirmation pop up
function createpopup(href, text) {
    if ($('#myModal').length) {
        $("#myModal").remove();
    }
    var popupstring = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    popupstring += '<div class="vertical-alignment-helper">';
    popupstring += '<div class="modal-dialog vertical-align-center">';
    popupstring += '<div class="modal-header">';
    popupstring += 'Confirm Selection';
    popupstring += '<div id="formhover" class="pull-right"><i class="fa fa-close" data-dismiss="modal"></i></div>';
    popupstring += '</div>';
    popupstring += '<div class="modal-content">';
    popupstring += '<div class="modal-body">' + text + '</div>'; 
    popupstring += '<div class="modal-footer" style="text-align:center;">';
    popupstring += '<a id="herefholder" href="#">';
    popupstring += '<button type="button" style="margin-right:16px" class="confirm_button">OK</button>';
    popupstring += '</a>';    
    popupstring += '<a id="herefholder" href="#">';
    popupstring += '<button type="button" style="margin-right:16px" data-dismiss="modal" class="confirm_button">CANCEL</button>';
    popupstring += '</a>';    
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    $("div:first").prepend(popupstring);
    $("#herefholder").prop("href", href);
    $('#myModal').modal('toggle');
}

// function to create delete confirmation popup
function createDeletionPopup(href, text) {
    if ($('#myModal').length) {
        $("#myModal").remove();
    }
    var popupstring = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    popupstring += '<div class="vertical-alignment-helper">';
    popupstring += '<div class="modal-dialog vertical-align-center">';
    popupstring += '<div class="modal-header">';
    popupstring += 'Confirm Deletion';
    popupstring += '<div id="formhover" class="pull-right"><i class="fa fa-close" data-dismiss="modal"></i></div>';
    popupstring += '</div>';
    popupstring += '<div class="modal-content">';
    popupstring += '<div class="modal-body">' + text + '</div>'; 
    popupstring += '<div class="modal-footer" style="text-align:center;">';
    popupstring += '<a id="herefholder" href="#">';
    popupstring += '<button type="button" style="margin-right:16px" class="confirm_button">OK</button>';
    popupstring += '</a>';    
    popupstring += '<a id="herefholder" href="#">';
    popupstring += '<button type="button" style="margin-right:16px" data-dismiss="modal" class="confirm_button">CANCEL</button>';
    popupstring += '</a>';    
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    $("div:first").prepend(popupstring);
    $("#herefholder").prop("href", href);
    $('#myModal').modal('toggle');
}

//Function to create a cancel pop up
function createCancelPopUp(href, text) {
    if ($('#myModal').length) {
        $("#myModal").remove();
    }
    var popupstring = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    popupstring += '<div class="vertical-alignment-helper">';
    popupstring += '<div class="modal-dialog vertical-align-center">';
    popupstring += '<div class="modal-header">';
    popupstring += 'ALERT';
    popupstring += '<div id="formhover" class="pull-right"><i class="fa fa-close" data-dismiss="modal"></i></div>';
    popupstring += '</div>';
    popupstring += '<div class="modal-content">';
    popupstring += '<div class="modal-body">' + text + '</div>'; 
    popupstring += '<div class="modal-footer" style="text-align:center;">';   
    popupstring += '<a id="herefholder" href="#">';
    popupstring += '<button type="button" style="margin-right:16px; display:none;" class="confirm_button">OK</button>';
    popupstring += '</a>';
    popupstring += '<a id="herefholder" href="#">';
    popupstring += '<button type="button" style="margin-right:16px" data-dismiss="modal" class="confirm_button">OK</button>';
    popupstring += '</a>';    
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    popupstring += '</div>';
    $("div:first").prepend(popupstring);
    $("#herefholder").prop("href", href);
    $('#myModal').modal('toggle');
}

$(document).on("click", ".delete_click", function (event) {
    createpopup($(this).attr("data-url"), $(this).attr("data-text"));
});

// function to clear loading div and popup modal if exist on page load.
function clear_dynamic_elements() {
    if ($('#loadingdiv').length) {
        $("#loadingdiv").remove();
    }
    if ($('#myModal').length) {
        $("#myModal").remove();
    }
}

//Lee Hicks
//Start of package class.
var packageClass = function (packageState,packageType,brandid,apiKey,packageUrl) {
	
	
	//******************************************************************************************************************************
	
	//Set package global variables.
	
	this.packageState = packageState; //Package only / Include brand
	this.packageType = packageType; //new or edit
	this.brandIdSent = brandid;//Set the brand ID..this is used for editing brand specific add ons.
	
	this.currentGlobalPackage = ""; // Hold the json array which will be updated by the view and sent back for processing.
	this.multipleBrandIdlist = [];//hold the brand ids that will be updated by the package selection
	this.multipleBrandPackage = 0;//Hold the selected package for multiple brand save
	this.allBrandlist = "";//All brands
	this.allPackagesList = "";//All Packages
	
	this.formId = "";//The formId will be either new package, edit package or ind brand
	this.buildFormId = ""; //The id to insert the built form
	this.validateHasTriedSave = false;//This variable is used for validation, if the user has tried to save and failed validation, validation will update as inputs change.
	this.validateHasTriedSaveMultipleBrands = false;//As above for the multiple brand form.
	
	//Set the urls for ajax calls

	this.ipAddress = packageUrl;
	
	this.getNewPackageUrl = this.ipAddress + "/admin/packages/new";//Get package object for new package
	this.saveNewPackageUrl = this.ipAddress + "/admin/packages/save";//Save package object for new package
	this.getEditPackageUrl =  this.ipAddress + "/admin/packages/listByIds";//Get package object for edit package
	this.saveEditPackageUrl = this.ipAddress + "/admin/packages/save";//Save package object for edit package
	this.getIndBrandPackageUrl = this.ipAddress + "/admin/packages/brand/";//Get package object for individual brand package
	this.saveIndBrandPackageUrl = this.ipAddress + "/admin/packages/save/brand";//Save package object for individual brand package
	this.saveMultipleBrandsUrl = this.ipAddress + "/admin/packages/save/brand";//Save multiple brands object
	this.getAllBrandUrl = this.ipAddress + "/brand";//Get list of all brands to create multiple brand assign table
	this.getAllPackagesUrl = this.ipAddress + "/admin/packages/list";//Get list of all packages, used for multiple brand assign and for creating package table
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//********************************************************************************************************************************
	
	//Instantiate class - set global variables dependant on screen
	this.init = function()
	{
		if(this.packageState == "package" && this.packageType == "new")
		{
			this.formId = "#newpackageform";
			this.buildFormId = "#hold-form-buttons-add";
			//Create the package overview table.
			this.createPackageTable();
			//Create New Package Form
			this.createNewPackageForm();
		}
	    else if(this.packageState == "package" && this.packageType == "edit")
		{
		    this.formId = "#editpackageform";
			this.buildFormId = "#hold-form-buttons-edit";
		}
	    else if(this.packageState == "brand" && this.packageType == "new")
		{
			this.formId = "#brandaddonform";
			this.buildFormId = "#hold-form-buttons-brand";
			//Create brand package form
			this.createBrandPackageForm(this.brandIdSent);
		}
	}		
		  
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	  
	//********************************************************************************************************************************
	
	//Generic ajax call
	this.ajaxCall = function(urlPassed,dataPassed,contentTypePassed,callTypePassed,beforeSendPassed,callBackPassed)
	{
		jQuery.ajax({
		url: urlPassed,
		headers: {'X-API-Key': apiKey},
		crossDomain: true,
		data: dataPassed,
		cache: false,
		contentType: contentTypePassed,
		type: callTypePassed,
		context: this,
		beforeSend:function() {
			beforeSendPassed();
		},
		success:function (data) {
			this.ajaxCallBack(data,callBackPassed);
		},error:function(data){
			this.ajaxCallBack(data,callBackPassed);
		}
		});
	}	
	
	//Ajax call back - the call back will take in the call back function name as text, pass it as a function and call it.
	this.ajaxCallBack = function(dataPassed,passedFunction)
	{
		this.fn = this[passedFunction];
		this.fn(dataPassed);
	}
	
	//Ajax Success - show success message.
	this.handleAjaxSuccess = function(textPassed)
	{
		$('#validation-results').hide();
		$('#successText').html(textPassed);
		$('#response-success').show();
	}
	
	//Handle error messages from the back end
	this.handleAjaxError = function(errorPassed)
	{
		this.errorMessage = "";
		for(this.x=0;this.x < errorPassed.length;this.x++)
		{
			this.errorMessage += '<li>' + errorPassed[this.x].detail + '</li>';
		}
		this.setError(this.errorMessage);
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//********************************************************************************************************************************
	
	//Create New package Form
	this.createNewPackageForm = function()
	{
		this.ajaxCall(this.getNewPackageUrl,this.setDataCreateNewForm(""),"application/json","GET",this.createNewPackageBeforeSend,"createNewPackageCallBack");
	}
	//Set Data to be passed to ajax
	this.setDataCreateNewForm = function(dataPassed)
	{
		return dataPassed;
	}
	//Create New Package Before Send
	this.createNewPackageBeforeSend = function()
	{
		
	}
	//Create New Package Call Back
	this.createNewPackageCallBack = function(dataPassed)
	{
		if(!dataPassed.success)
	    {
			this.handleAjaxError(dataPassed.errorDetails);
			return;
		}
		this.validateHasTriedSave = false;
		this.createPackageForm(dataPassed.data,this.buildFormId);
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//********************************************************************************************************************************
	
	//Create Edit package form
	this.createEditPackageForm = function(id)
	{
		this.ajaxCall(this.getEditPackageUrl,this.setDataEditPackageForm(id),"application/json","POST",this.createEditPackageBeforeSend,"createEditPackageCallBack");
	}
	//Set Data to be passed to ajax
	this.setDataEditPackageForm = function(dataPassed)
	{
		this.returnData = [dataPassed];
		this.returnData = "[" + this.returnData + "]";
		return this.returnData;
	}
	//Create Edit Package Before Send
	this.createEditPackageBeforeSend = function()
	{
		
	}
	//Create Edit Package Call Back
	this.createEditPackageCallBack = function(dataPassed)
	{
		this.validateHasTriedSave = false;
		this.createPackageForm(dataPassed.data,this.buildFormId);
		this.showEditPackages();
	}
	//Show edit package
	 this.showEditPackages = function()
	  {
		  $('.nav-tabs a[href="#package-edit"]').tab('show');
		  $('#package-edit-tab').show();
	  }

	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	 
	//********************************************************************************************************************************
	
	//Create Brand Package Form
	this.createBrandPackageForm = function(id)
	{
		this.ajaxCall(this.getIndBrandPackageUrl,this.setDataCreateBrandForm(id),"application/json","POST",this.createBrandPackageBeforeSend,"createBrandPackageCallBack");
	}
	//Set Data to be passed to ajax
	this.setDataCreateBrandForm = function(dataPassed)
	{
		this.returnData = [dataPassed];
		this.returnData = "[" + this.returnData + "]";
		return this.returnData;
	}
	//Create Brand Package Before Send
	this.createBrandPackageBeforeSend = function()
	{
		
	}
	//Create Brand Package Call Back
	this.createBrandPackageCallBack = function(dataPassed)
	{
		this.validateHasTriedSave = false;
		this.createPackageForm(dataPassed.data,this.buildFormId);
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//********************************************************************************************************************************
	
	//Create Package table including button to edit package
	this.createPackageTable = function()
	{
		this.ajaxCall(this.getAllPackagesUrl,"","application/json","GET",this.createPackageTableBeforeSend,"createPackageTableCallBack");
	}
	//Create Package Table Before Send
	this.createPackageTableBeforeSend = function()
	{
		$('#package-table-body').html("");
	}
	//Create Package Table Call Backs
	this.createPackageTableCallBack = function(dataPassed)
	{
		this.createPackageOverviewTable(dataPassed.data);
	}
	
	//Create Package overview table
	this.createPackageOverviewTable = function(tabledata)
	{
		for (this.x = 0; this.x < tabledata.length; this.x++)
		  {
			this.tableoutput += "<tr>";
			this.tableoutput += "<td>";
			this.tableoutput += tabledata[this.x].id;
			this.tableoutput += "</td>";
			this.tableoutput += "<td>";
			this.tableoutput += tabledata[this.x].packageName;
			this.tableoutput += "</td>";
			this.tableoutput += "<td>";
			this.tableoutput += '<button data-id="' + tabledata[this.x].id + '" class="editpackageclick"><i class="fa fa-search-plus"></i> Edit</button>';
			this.tableoutput += "</td>";
			this.tableoutput += "</tr>";
		  }
		$('#package-table-body').html("");
		$('#package-table-body').html(this.tableoutput);
		oDataTable.init($('#package-list-table'));
	}
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//**************************************************************************************************************************************
	
	//Create Brand Table For Editing Multiple Brands
	this.createMultipleBrandTable = function()
	{
		this.ajaxCall(this.getAllBrandUrl,this.setDataMultipleBrandForm(""),"application/json","GET",this.createMultipleBrandFormBeforeSend,"createMultipleBrandFormCallBack");
	}
	//Set Data to be passed to ajax
	this.setDataMultipleBrandForm = function(dataPassed)
	{
		return dataPassed;
	}
	//Create New Package Before Send
	this.createMultipleBrandFormBeforeSend = function()
	{
		$('#package-add-to-brand-table-body').html("");
	}
	//Create New Package Call Back
	this.createMultipleBrandFormCallBack = function(dataPassed)
	{
		$('#package-add-to-brand-table-body').html("");
		console.log(this.convertjson(dataPassed,'string'));
		this.allBrandlist = dataPassed;
		this.createAddBrandtable();
	}
	
	//Create package add to brands table body
	  this.createAddBrandtable = function(brandlist)
	  {
		  this.createTable = "";
		  for (this.x = 0; this.x < this.allBrandlist.length; this.x++)
		  {
			  this.createTable += '<tr>';
			  this.createTable += '<td>' + this.allBrandlist[this.x].id + '</td>';
			  this.createTable += '<td><a href="/admin/brand/' +  this.allBrandlist[this.x].id + '">' + this.allBrandlist[this.x].brand_name + '</a></td>';
			  this.createTable += '<td>' + this.allBrandlist[this.x].pakage_name + '</td>'; 
			  this.createTable += '<td>';
			  this.createTable += '<div class="packageCheckbox">'
			  this.createTable += '<input data-id="' + this.allBrandlist[this.x].id +'" class="check-box-multiple-brands" type="checkbox" name="' + this.allBrandlist[this.x].id + '" id="' + this.allBrandlist[this.x].id + '"/>';
			  this.createTable += '<label for="' + this.allBrandlist[this.x].id + '"></label>';
			  this.createTable += '</div>';
			  this.createTable += '</td>';
			  this.createTable += '</tr>';
		  }
		  $('#package-add-to-brand-table-body').html(this.createTable);
		  oDataTable.init($('#package-add-to-brand-table'));
		  this.table= $('#package-add-to-brand-table');
		    $('td input:checkbox',this.table).removeAttr('checked');
		  this.createPackageSelectCall();
	  }
	
	  //Add brand id to brandID array
	  this.addToBrandsArray = function(id)
	  {
		  this.multipleBrandIdlist.push(id);
		  if(this.validateHasTriedSaveMultipleBrands == true)
			 {
				  this.validateMultipleBrandForm();
			 }
	  }
	  //Remove brand id to brandID array
	  this.removeFromBrandsArray = function(id)
	  {
		  this.multipleBrandIdlist.splice( $.inArray(id, this.multipleBrandIdlist), 1 );
		  if(this.validateHasTriedSaveMultipleBrands == true)
			 {
				  this.validateMultipleBrandForm();
			 }
	  }
	 
	  //Add brandlist array to the selected package for multiple brand packages
	  this.addBrandsListToSelectedPackage = function()
	  {
		 // alert(this.multipleBrandPackage.brands);
		  this.multipleBrandPackage.brands = [];
		  for (this.x = 0; this.x < this.multipleBrandIdlist.length; this.x++)
		  {
			 this.multipleBrandPackage.brands.push(this.multipleBrandIdlist[this.x])
		  }
	  }
	  
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//******************************************************************************************************************************************
	
 	//Create Package select for multiple brands
	this.createPackageSelectCall = function()
	{
		this.ajaxCall(this.getAllPackagesUrl,this.setDataPackageSelect(""),"application/json","GET",this.packageSelectBeforeSend,"packageSelectCallBack");
	}
	//Set Data to be passed to ajax
	this.setDataPackageSelect = function(dataPassed)
	{
		return dataPassed;
	}
	//Create New Package Before Send
	this.packageSelectBeforeSend = function()
	{
		
	}
	//Create New Package Call Back
	this.packageSelectCallBack = function(dataPassed)
	{
		this.allPackagesList = dataPassed.data;
		this.createPackageSelect();
	}
	
	//Create package select for multiple brands
	this.createPackageSelect = function()
	{
		this.selectOptions = '<option data-id="0">Please Select</option>';
		for (this.x = 0; this.x < this.allPackagesList.length; this.x++)
		{
			this.selectOptions += '<option data-id="' + this.allPackagesList[this.x].id + '">';
			this.selectOptions += this.allPackagesList[this.x].packageName;
			this.selectOptions += '</option>';
		}
		$('#all-packages-select').html(this.selectOptions);
	 }
	
	 //When select option changes, extract the select package from the allPackagesList and assign it multipleBrandPackage
	 this.setMultipleBrandsPackageId = function(id)
	  {
		  for (this.x = 0; this.x < this.allPackagesList.length; this.x++)
	      {	  
			  if(this.allPackagesList[this.x].id == id)
			  {
				  this.multipleBrandPackage = this.allPackagesList[this.x];
			  }
	      }
		  //Set this.multipleBrandPackage == 0 if id == 0, that it cos id will not match any id in package array so will not reset..
		  if(id == 0)
		  {
			  this.multipleBrandPackage = 0;
		  }
		  if(this.validateHasTriedSaveMultipleBrands == true)
		 {
			  this.validateMultipleBrandForm();
		 }
	  }
		
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//******************************************************************************************************************************************
	
	//Save New Package
	this.saveNewPackage = function()
	{
		//First must set the package name and description
		this.setPackageName();
		//Form validation - If form does not pass validation, return, and set validateHasTriedSave to true, this is 
		//show users what fields have passed / failed validation
		if(!this.formValidation())
		{
			this.validateHasTriedSave = true;
			return;
		}
		else
		{   
			this.validateHasTriedSave = true;
			this.clearError();
		}
		this.ajaxCall(this.saveNewPackageUrl,this.setDataSaveNewPackage(),"application/json","POST",this.saveNewPackageBeforeSend,"saveNewPackageFormCallBack");
	}
	this.setDataSaveNewPackage = function()
	{
		return this.convertjson(this.currentGlobalPackage, 'string');
	}
	//Save New Package Before Send
	this.saveNewPackageBeforeSend = function()
	{
		
	}
	//Save New Package Call Back
	this.saveNewPackageFormCallBack = function(dataPassed)
	{
		if(!dataPassed.success)
	    {
			this.handleAjaxError(dataPassed.errorDetails);
			return;
	    }
		this.validateHasTriedSave = false;
		this.handleAjaxSuccess("Package successfully saved");
		location.reload();
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//******************************************************************************************************************************************
	
	//Save Edit Package
	this.saveEditPackage = function()
	{
		//First must set the package name and description
		this.setPackageName();
		//Form validation - If form does not pass validation, return, and set validateHasTriedSave to true, this is 
		//show users what fields have passed / failed validation
		if(!this.formValidation())
		{
			this.validateHasTriedSave = true;
			return;
		}
		else
		{   
			this.validateHasTriedSave = true;
			this.clearError();
		}
		this.ajaxCall(this.saveEditPackageUrl,this.setDataEditNewPackage(),"application/json","POST",this.saveEditPackageBeforeSend,"saveEditPackageFormCallBack");
	}
	this.setDataEditNewPackage = function()
	{
		return this.convertjson(this.currentGlobalPackage, 'string');
	}
	//Save New Package Before Send
	this.saveEditPackageBeforeSend = function()
	{
		
	}
	//Save New Package Call Back
	this.saveEditPackageFormCallBack = function(dataPassed)
	{
		if(!dataPassed.success)
	    {
			this.handleAjaxError(dataPassed.errorDetails);
			return;
	    }
		this.validateHasTriedSave = false;
		this.handleAjaxSuccess("Package successfully updated");
		location.reload();
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//******************************************************************************************************************************************
	
	//Save Ind Brand Package
	this.saveIndBrandPackage = function()
	{
		this.ajaxCall(this.saveIndBrandPackageUrl,this.setDataIndBrandPackage(),"application/json","POST",this.saveIndBrandPackageBeforeSend,"saveIndBrandPackageFormCallBack");
	}
	this.setDataIndBrandPackage = function()
	{
		console.log(this.convertjson(this.currentGlobalPackage, 'string'));
		return this.convertjson(this.currentGlobalPackage, 'string');
	}
	//Save Ind Brand Package Before Send
	this.saveIndBrandPackageBeforeSend = function()
	{
		
	}
	//Save Ind Brand Package Call Back
	this.saveIndBrandPackageFormCallBack = function(dataPassed)
	{
		if(!dataPassed.success)
	    {
			this.handleAjaxError(dataPassed.errorDetails);
			return;
	    }
		this.validateHasTriedSave = false;
		this.handleAjaxSuccess("Package add ons successfully saved");
		location.reload();
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	//******************************************************************************************************************************************
	
	//Save multiple brands
	this.saveMultipleBrands = function()
	{
		if(!this.validateMultipleBrandForm())
		{
			return;
		}
		this.addBrandsListToSelectedPackage();
		this.ajaxCall(this.saveMultipleBrandsUrl,this.setDataSaveMultipleBrands(),"application/json","POST",this.saveMultipleBrandsBeforeSend,"saveMultipleBrandsCallBack");
	}
	this.setDataSaveMultipleBrands = function()
	{
		this.saveAssignBrandSetToTrue();
		return this.convertjson(this.multipleBrandPackage, 'string')
	}
	//Save New Package Before Send
	this.saveMultipleBrandsBeforeSend = function()
	{
		
	}
	//Save New Package Call Back
	this.saveMultipleBrandsCallBack = function(dataPassed)
	{
		if(!dataPassed.success)
	    {
			this.handleAjaxError(dataPassed.errorDetails);
			return;
	    }		
		this.validateHasTriedSaveMultipleBrands = false;
		this.handleAjaxSuccess("Package successfully assigned to brand (s)");
		location.reload();
	}
	//Before save assign package, set all features to selected(true) and basic to(true)
	this.saveAssignBrandSetToTrue = function()
	{
		for (this.x = 0; this.x < this.multipleBrandPackage.categoryFeatures.length; this.x++)
	      {	  
			  for (this.y = 0; this.y < this.multipleBrandPackage.categoryFeatures[this.x].features.length; this.y++)
		        {
				  this.multipleBrandPackage.categoryFeatures[this.x].features[this.y].selected = true;
				  this.multipleBrandPackage.categoryFeatures[this.x].features[this.y].basic = true;
		        }
	      }
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

	//******************************************************************************************************************************************
	
	//Create Package Form has two parts, create the form head(Name and Description)
	//Second create the form body which shows features assigned to package.
	this.createPackageForm = function (data,id)
	{
		this.currentGlobalPackage = this.convertjson(data, 'object');
	     
		this.showoutput = "";
	    //Create Form Header - Name and description
		this.showoutput += this.createFormTopHeader();
		//Create Form Body
		for (this.x = 0; this.x < this.currentGlobalPackage.categoryFeatures.length; this.x++)
		{
	         this.showoutput += this.createFormBody(this.currentGlobalPackage.categoryFeatures[this.x]);
		}
		//Remove the current form
		$("#package-edit .removefromdom").remove();
		//Replace with New form
		$(this.showoutput).insertBefore(id);
	}
	
	//Creating the form top header(Name and description
	//New package set the name and description to ""; edit package set to the sent value; brand form set to disabled.
	this.createFormTopHeader = function()
	{
		this.returnOutPut = "";
		if(this.packageState == "package" && this.packageType == "new")
		{
			this.returnOutPut += `
				<div class="form-group has-feedback removefromdom">
                	<div class="col-md-2">
                		<label class="required" for="packageName">Name</label>
                	</div>
					<div class="packagenamefeedback col-md-10 has-feedback">
                		<input id="packageName" type="text" maxlength="50" class="form-control"/>
                		<span class="packagenameglyphicon glyphicon form-control-feedback"></span>
					</div>
				</div>
				<div class="form-group has-feedback removefromdom">
                 	<div class="col-md-2">
                		<label class="required" for="packageDescription">Description</label>
                 	</div>
                 	<div class="packagedescriptionfeedback col-md-10 has-feedback">
                		<textarea id="packageDescription" class="form-control" style="height:100px;max-width:100%;min-width:100%;"></textarea>
                		<span class="packagedescriptionglyphicon glyphicon form-control-feedback"></span>
                 	</div>
				</div>`;
		}
		else if(this.packageState == "package" && this.packageType == "edit")
		{
			 this.returnOutPut = `
				<div class="form-group has-feedback removefromdom">
	                <div class="col-md-2">
	                	<label class="required" for="packageName">Name</label>
	                </div>
	                <div class="packagenamefeedback col-md-10 has-feedback">`;
	          			this.returnOutPut += '<input id="packageName" type="text" maxlength="50" class="form-control" value="' + this.currentGlobalPackage.packageName + '"/>';
	          			this.returnOutPut += `
	          			<span class="packagenameglyphicon glyphicon form-control-feedback"></span>
	          		</div>
	            </div>
	            <div class="form-group has-feedback removefromdom">
	                 <div class="col-md-2">
	          			<label class="required" for="packageDescription">Description</label>
	                 </div>
	                 <div class="packagedescriptionfeedback col-md-10 has-feedback">`;
	          			this.returnOutPut += '<textarea id="packageDescription" class="form-control" style="height:100px;max-width:100%;min-width:100%;">' + this.currentGlobalPackage.packageDescription + '</textarea>';
	          			this.returnOutPut += `
	          		<span class="packagedescriptionglyphicon glyphicon form-control-feedback"></span>
	        	  	</div>
	           </div>`;
		}
		else if(this.packageState == "brand" && this.packageType == "new")
		{
			 this.returnOutPut = `
				<div class="form-group has-feedback removefromdom">
	                <div class="col-md-2">
	                	<label class="required" for="packageName">Name</label>
	                </div>
	                <div class="packagenamefeedback col-md-10 has-feedback">`;
	          			this.returnOutPut += '<input id="packageName" type="text" class="form-control" value="' + this.currentGlobalPackage.packageName + '"  disabled/>';
	          			this.returnOutPut += `
	          			<span class="packagenameglyphicon glyphicon form-control-feedback"></span>
	          		</div>
	            </div>
	            <div class="form-group has-feedback removefromdom">
	                 <div class="col-md-2">
	          			<label class="required" for="packageDescription">Description</label>
	                 </div>
	                 <div class="packagedescriptionfeedback col-md-10 has-feedback">`;
	          			this.returnOutPut += '<textarea id="packageDescription" class="form-control" style="height:100px;max-width:100%;min-width:100%;"  disabled>' + this.currentGlobalPackage.packageDescription + '</textarea>';
	          			this.returnOutPut += `
	          		<span class="packagedescriptionglyphicon glyphicon form-control-feedback"></span>
	        	  	</div>
	           </div>`;
		}
		return this.returnOutPut;
	}
	
	  // Create form body - here we create the features and add ons
	  // If the add on is part of the package then we set the checkbox to checked
	  this.createFormBody = function (objectpassed)
	  {
	      this.output = "";
	      this.output +=  '<div class="form-group has-feedback removefromdom" style="border-top:1px solid black;border-bottom:1px solid black;">';
	      this.output +=  '<div class="col-md-2">';
	      this.output +=  '<span style="color:#f16822;">' + objectpassed.category + '</span>';
	      this.output +=  '</div>';
	      this.output +=  '<div class="col-md-10 text-left">';
	      this.output +=  '</div>';
	      this.output +=  '</div>';
	      
	        for (this.y = 0; this.y < objectpassed.features.length; this.y++)
	        {	
	        	if(!(objectpassed.features[this.y].name == 'Customer Connect')){
		          this.output +=  '<div class="form-group has-feedback removefromdom">';
		          this.output +=  '<div class="col-md-2">';
		          this.output +=  '<label for="' + objectpassed.features[this.y].name + '">' + objectpassed.features[this.y].name + '</label>';
		          this.output +=  '</div>';
		          this.output +=  '<div class="col-md-10 text-left">';
		          
		          //window.alert('==> feature name : ' + objectpassed.features[this.y].name );
		          //window.alert('==> output : ' + this.output);
		        	  	          
		            if(objectpassed.features[this.y].selected == true)
		            {
		            	
		              this.output +=  '<div class="packageCheckbox">'
		              if(this.packageState == "package" && this.packageType == "edit")
		              {
			              this.output +=  '<input data-id="' + objectpassed.features[this.y].id +'" class="packagecheckbox" type="checkbox" name="' + objectpassed.features[this.y].name + 'edit" id="' + objectpassed.features[this.y].name + 'edit" checked/>';
			              this.output +=  '<label for="' + objectpassed.features[this.y].name + 'edit"></label>';
		              }
		              else if(this.packageState == "brand" && this.packageType == "new")
		              {
		            	  this.output +=  '<input data-id="' + objectpassed.features[this.y].id +'" class="packagecheckbox" type="checkbox" name="' + objectpassed.features[this.y].name + '" id="' + objectpassed.features[this.y].name + '" checked/>';
			              this.output +=  '<label for="' + objectpassed.features[this.y].name + '"></label>';
			              if(objectpassed.features[this.y].basic == true)
			              {
			            	  this.output +=  '<div class="package-cover-div"></div>';
			              }
		              }
		              else
		              {
		            	  this.output +=  '<input data-id="' + objectpassed.features[this.y].id +'" class="packagecheckbox" type="checkbox" name="' + objectpassed.features[this.y].name + '" id="' + objectpassed.features[this.y].name + '" checked/>';
			              this.output +=  '<label for="' + objectpassed.features[this.y].name + '"></label>';
		              } 
		              this.output +=  '</div>';    
		            }
		            else
		            {	         
		              this.output +=  '<div class="packageCheckbox">';
		              if(this.packageState == "package" && this.packageType == "edit")
		              {
			              this.output +=  '<input data-id="' + objectpassed.features[this.y].id +'" class="packagecheckbox" type="checkbox" name="' + objectpassed.features[this.y].name + 'edit" id="' + objectpassed.features[this.y].name + 'edit"/>';
			              this.output +=  '<label for="' + objectpassed.features[this.y].name + 'edit"></label>';
		              }
		              else if(this.packageState == "brand" && this.packageType == "new")
		              {
		            	  this.output +=  '<input data-id="' + objectpassed.features[this.y].id +'" class="packagecheckbox" type="checkbox" name="' + objectpassed.features[this.y].name + '" id="' + objectpassed.features[this.y].name + '"/>';
			              this.output +=  '<label for="' + objectpassed.features[this.y].name + '"></label>';
		              }
		              else
		              {
		            	  this.output +=  '<input data-id="' + objectpassed.features[this.y].id +'" class="packagecheckbox" type="checkbox" name="' + objectpassed.features[this.y].name + '" id="' + objectpassed.features[this.y].name + '"/>';
			              this.output +=  '<label for="' + objectpassed.features[this.y].name + '"></label>';
		              } 
		              this.output +=  '</div>';
		            }
		            
		          }
	              this.output +=  '</div>';
	              this.output +=  '</div>';
	        }
	        
	      return this.output;
	  }
	  
	  //******************************************************************************************************************************************
	  
	  //These are the form actions for the package form - set name, description and selected add ons.
	  
	  // Set package Name
	  this.setPackageName = function()
	  {
		  this.currentGlobalPackage.packageName = $(this.formId + " #packageName").val();
		  this.setPackageDescription();
	  }
	  
	  // Set package Description
	  this.setPackageDescription = function()
	  {
		  this.currentGlobalPackage.packageDescription = $(this.formId + " #packageDescription").val();
	  }
  
	  //Edit package categories - here we set the package add ons to true or false
	  this.editcurrentGlobalPackage = function(addonid)
	  {
		  for (this.x = 0; this.x < this.currentGlobalPackage.categoryFeatures.length; this.x++)
	      {	  
			  for (this.y = 0; this.y < this.currentGlobalPackage.categoryFeatures[this.x].features.length; this.y++)
		        {
				  if(this.currentGlobalPackage.categoryFeatures[this.x].features[this.y].id == addonid)
				  {
					  if(this.currentGlobalPackage.categoryFeatures[this.x].features[this.y].selected)
					  {
						  this.currentGlobalPackage.categoryFeatures[this.x].features[this.y].selected = false;					  
					  }
					  else
					  {
						  this.currentGlobalPackage.categoryFeatures[this.x].features[this.y].selected = true;
					  }
				  }
		        }
	      }
		  //Run validation if the user has already tried saving
		  if(this.validateHasTriedSave)
	    	{
	    		this.formValidation();
	    	}
	  }
	   
	  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
	  
	  //******************************************************************************************************************************************
	  
	  //Package form validation - works the same for new / edit plus brand features
	  this.formValidation = function()
	  {
		  this.setPackageName();
		  //Name and Description cant be empty
		  //Package add ons can't all be false.
		  this.isValid = true;
		  this.errorString = "";
		  if(!this.validateName())
		  {
			  this.isValid = false;
			  this.errorString += "<li>Package name must be set</li>";
			  	$(this.formId + ' .packagenamefeedback').removeClass('has-success');
			  	$(this.formId + ' .packagenameglyphicon').removeClass('glyphicon-ok');
			  	$(this.formId + ' .packagenamefeedback').addClass('has-error');
			  	$(this.formId + ' .packagenameglyphicon').addClass('glyphicon-remove');
		  }else
		  {
			  	$(this.formId + ' .packagenamefeedback').removeClass('has-error');
			  	$(this.formId + ' .packagenameglyphicon').removeClass('glyphicon-remove');
			  	$(this.formId + ' .packagenamefeedback').addClass('has-success');
			  	$(this.formId + ' .packagenameglyphicon').addClass('glyphicon-ok');
		  }
		  if(!this.validateDescription())
		  {
			  this.isValid = false;
			  this.errorString += "<li>Package description must be set</li>";
			  	$(this.formId + ' .packagedescriptionfeedback').removeClass('has-success');
			  	$(this.formId + ' .packagedescriptionglyphicon').removeClass('glyphicon-ok');
			  	$(this.formId + ' .packagedescriptionfeedback').addClass('has-error');
			  	$(this.formId + ' .packagedescriptionglyphicon').addClass('glyphicon-remove');
		  }else
		  {
			  	$(this.formId + ' .packagedescriptionfeedback').removeClass('has-error');
			  	$(this.formId + ' .packagedescriptionglyphicon').removeClass('glyphicon-remove');
			  	$(this.formId + ' .packagedescriptionfeedback').addClass('has-success');
			  	$(this.formId + ' .packagedescriptionglyphicon').addClass('glyphicon-ok');
		  }
		  if(!this.validateAddOns())
		  {
			  this.isValid = false;
			  this.errorString += "<li>Please select at least one package add on</li>";
		  }
		  
		  if(!this.isValid)
		  {
			  this.setError(this.errorString);
			  return this.isValid;
		  }else
		  {
			  this.clearError();
			  return this.isValid;
		  }
	  }
	  
	  //Validate Name:Name can not be nothing.
	  this.validateName = function()
	  {
		  if(this.currentGlobalPackage.packageName == "")
		  {
			  return false;
		  }
		  else
		  {
			  return true;
		  }
	  }
	  
	  //Validate description:description can not be nothing.
	  this.validateDescription = function()
	  {
		  if(this.currentGlobalPackage.packageDescription == "")
		  {
			  return false;
		  }else{
			  return true;
		  }
	  }
	  
	  //Validate Add Ons: at least one add on must be set.
	  this.validateAddOns = function()
	  {
		  this.addOnSelected = false;
		  for (this.x = 0; this.x < this.currentGlobalPackage.categoryFeatures.length; this.x++)
	      {	  
			  for (this.y = 0; this.y < this.currentGlobalPackage.categoryFeatures[this.x].features.length; this.y++)
		        {
					  if(this.currentGlobalPackage.categoryFeatures[this.x].features[this.y].selected)
					  {
						  this.addOnSelected = true;
					  }		  
		        }
	      }
		  return this.addOnSelected;
	  }
	  
	  //Set Error message:Sets the error message passed and shows the error div.
	  this.setError = function(errorString)
	  {
		  $('#response-success').hide();
		  $('#validationResultsList').html(errorString);
		  $('#validation-results').show();
	  }
	  
	  //Clear user error message: Clears the error message and hides the error div.
	  this.clearError = function()
	  {
		  $('#validationResultsList').html("");
		  $('#validation-results').hide();
	  }
	  
	  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	  
	  //************************************************************************************************************************************
	  
	  //Validate multiple brand form: User must select at least one brand and a package.
	  this.validateMultipleBrandForm = function()
	  {
		  this.isValid = true;
		  this.errorString = "";
		  if(this.multipleBrandIdlist.length == 0)
		  {
			  this.isValid = false;
			  this.errorString += "<li>Please select at least one brand to update</li>";
		  }
		  if(this.multipleBrandPackage == 0)
		  {
			  this.isValid = false;
			  this.errorString += "<li>Please select a package</li>";
		  }
		  if(!this.isValid)
		  {
			  this.setError(this.errorString);
			  this.validateHasTriedSaveMultipleBrands = true;
			  return this.isValid;
		  }
		  else
		  {
			  this.clearError();
			  return this.isValid;
		  }
	  }
 
	  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	  
	  //************************************************************************************************************************************
	  
	  //Helper.convertjson
	  this.convertjson = function (jsonsent, returntype) 
	  {
	      if (typeof jsonsent == returntype) {
	          return jsonsent;
	      } else if (returntype == "object") {
	          return JSON.parse(jsonsent);
	      } else if (returntype == "string") {
	          return JSON.stringify(jsonsent);
	      } else {
	          console.log("second paremeter must be a string or object");
	          return "invalid";
	      }
	  }
	  
	  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	 
	  //Call constructor
	  this.init();
}

$(document).ready(function () {
    AdminApp.init();
    $('ul.sidebar-menu li').mouseenter(function () {
        if ($(this).find("i").hasClass("icon-hover-text-load")) {
            return;
        }
        $(this).find("i").addClass("icon-hover-text");
    });
    $('ul.sidebar-menu li').mouseleave(function () {
        $(this).find("i").removeClass("icon-hover-text");
    });
    clear_dynamic_elements();
});