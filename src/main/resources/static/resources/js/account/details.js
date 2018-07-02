//JS Whitelabelling class
var whitelabel;
//White labelling js
//get the curernt settings from the json passed from back end, if no styles have been set, this will default to wifire.

whitelabelling = function () {
//Set globals
    this.globalstyles = "";
    this.globalstyletype = "";
    this.globalAjaxUrl = "";
    this.globalaccountname = "";
    this.globalprimarycolor = "";
    this.globalsecondarycolor = "";
    this.globalsupportemail = "";
    this.globalaccountid = "";
    this.globalurlprefix = "";
    this.globallargelogo = "";
    this.globalfile = "";
//constructor
    this.constructor = function (senttext, ajaxurl, accountname, accountid) {
        this.globalstyles = this.convertjson(senttext, "object");
        this.globalstyletype = this.globalstyles.styletype;
        this.globalAjaxUrl = ajaxurl;
        this.globalaccountname = accountname;
        this.globalprimarycolor = this.globalstyles.primarycolor;
        this.globalsecondarycolor = this.globalstyles.secondarycolor;
        this.globalurlprefix = this.globalstyles.urlprefix;
        this.globalsupportemail = this.globalstyles.supportemail;
        this.globalaccountid = accountid;
        this.globallargelogo = this.globalstyles.largelogo;
        this.globalfile = null;
        this.attemptedformpost = false;
        this.setuserform();
    }

//Set the white labelling form if user has already set styles
    this.setuserform = function () {
        //set the image preview
        $('#uploadimagewhite').attr("src", this.globallargelogo);
        //set the contact email form
        $('#preview-contact-email-form').val(this.useremailview(this.globalsupportemail, "mailto:", false));
        //url preview
        if (this.globalstyletype == "custom") {
            $('#preview-url-form').prop("disabled", true);
            $('#preview-url-form').css("background", "lightgray");
            $('.input-group-addon').hide();
            $('#preview-url-form').val('https://' + this.globalurlprefix + '.wifire.io');
        } else {
            $('#preview-url-form').val("Please-enter-a-url");
            $('.input-group-addon').show();
        }
        //set color text input
        $('#color').val(this.globalprimarycolor);
        $('#color').css("background", this.globalprimarycolor);
    }

//Set the white label preview
    this.setpreviewscreen = function () {
        this.calcpageheight();
        this.getuserentries(false, false);
        this.setpreviewimage = document.getElementById('uploadimagewhite').src;
        $('.preview-primary-color').css('color', this.globalprimarycolor);
        $('.preview-primary-background').css('background', this.globalprimarycolor);
        $('.preview-top-border').css("border-top-color", this.globalprimarycolor);
        $('.preview-left-border').css("border-left-color", this.globalprimarycolor);
        $('.preview-secondary').css('background', this.globalsecondarycolor);
        $('.preview-buss-name').html(this.globalaccountname);
        $('#preview-support-email-text').html(this.globalsupportemail);
        document.getElementById('preview-logo-image').src = this.setpreviewimage;
    }

    this.getuserentries = function (postdata, validatedata) {
//Set the styletype for function
        this.styletype = this.globalstyletype;

//set checkfile to file input
        this.globalfile = document.getElementById('preview-logo-input').files[0];

//set primarycolor to color value
        this.globalprimarycolor = $('#color').val();
        if (this.globalprimarycolor.indexOf("#") == -1) {
            this.globalprimarycolor = this.convertrgbtohex(this.globalprimarycolor);
        }
//Calculate secondary color based on primary
        this.globalsecondarycolor = this.shadeBlend(-0.05, this.globalprimarycolor);
//Get Suuport email
        this.globalsupportemail = $('#preview-contact-email-form').val();
//Get urlprefix
        this.globalurlprefix = $('#preview-url-form').val();
//Set Screenshots to nothing, this will get set if all validation passes.
        this.screenshotlogo = "";

//Validate information
        if (validatedata) {
            if (!this.whitelabelvalidation()) {
                return false;
            } else {
                if (postdata) {
                    //Set global style type to be custom
                    this.globalstyletype = "custom";
                    //Set Screenshots
                    this.screenshotlogo = "/themes/default/assets/images/new_screen_shots.png";
                    this.postwhitelabel();
                }
            }
        }
    }
//Error method
    this.whitelabelvalidation = function () {
        //meothod globals
        this.errorcheck = 0;
        this.returnmessage = "";

        // first check - file input
        //fileinput can only be null if styletype = custom.
        if (this.globalstyletype == "default" && this.globalfile == "" || this.globalstyletype == "default" && this.globalfile == undefined || this.globalstyletype == "default" && this.globalfile == null) {
            this.errorcheck += 1;
            this.returnmessage = "<li>Please upload a logo before saving.</li>";
            this.setelementerror('#logodiv');
            this.globalfile = null;
        } else {
            this.setelementsuccess('#logodiv');
        }

        //Second check colour
        //Can not be null
        if (this.globalprimarycolor == "") {
            this.errorcheck += 1;
            this.returnmessage += "<li>Please select a colour</li>";
            this.setelementerror('#color');
        } else {
            this.setelementsuccess('#color');
        }
        //email validation
        if (ValidateEmail(this.useremailview(this.globalsupportemail, "mailto:", false)) == false || this.useremailview(this.globalsupportemail, "mailto:", false) == "") {
            this.errorcheck += 1;
            this.setelementerror('#preview-contact-email-form');
            this.returnmessage += "<li>Please add a valid email</li>";
        } else {
            this.setelementsuccess('#preview-contact-email-form');
        }
        //url validation - cant be nothing - specail characters are escaped on key up
        if (this.globalurlprefix == "") {
            this.errorcheck += 1;
            this.returnmessage += "<li>Please add a valid url</li>";
            this.setelementerror('.url-error-box');
        } else {
            this.setelementsuccess('.url-error-box');
        }
        //if no errors, return true, else set error display and return;
        if (this.errorcheck >= 1) {
            this.displayerror(this.returnmessage);
            return false;
        } else {
            this.closeerror();
            return true;
        }
    }

//Post form data
    this.postwhitelabel = function () {
        this.data = new FormData();
        this.data.append('uploadimage', this.globalfile);
        this.data.append('businessname', this.globalaccountname);
        this.data.append('urlprefix', this.globalurlprefix);
        this.data.append('styletype', this.globalstyletype);
        this.data.append('supportemail', this.globalsupportemail);
        this.data.append('screenshotlogo', this.screenshotlogo);
        this.data.append('primarycolor', this.globalprimarycolor);
        this.data.append('secondarycolor', this.globalsecondarycolor);
        this.data.append('accountid', this.globalaccountid);
        this.sendajaxurl = this.globalAjaxUrl + '/cloud/request/upload';
        setloader();
        jQuery.ajax({
            url: this.sendajaxurl,
            headers: {'X-API-Key': 'PARSE-REST-KEY'},
            crossDomain: true,
            data: this.data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            beforeSend: function () {
            	whitelabel.clearvalidationboxes();
            },
            success: function (data) {
            	whitelabel.setpostreturn(data);
            }
        });
    }


//Reset eroor / success
    this.clearvalidationboxes = function () {
        $('.white-success-box').removeClass('white-success-box');
        $('.white-error-box').removeClass('white-error-box');
    }

//Set display on post return
    this.setpostreturn = function (data) {
        if (data.success == true) {
            $('#validation-results').hide();
            $('#whiteresponsediv').show();
            document.getElementById('preview-logo-input').value = "";
            document.getElementById('holdselectedfile').innerHTML = "";
        } else {
            this.showerrormessage = "";
            this.errorarray = data.detail.split(";");
            this.displayarray = data.fields.split(";");
            //loop error meaage and build error list
            for (this.x = 0; this.x < (this.errorarray.length - 1); this.x++) {
                this.showerrormessage += '<li>' + this.errorarray[this.x] + '</li>';
            }
            //Loop display error array and set element errors
            for (this.y = 0; this.y < this.displayarray.length; this.y++) {
                if (this.displayarray[this.y].indexOf("logo") >= 0) {
                    this.setelementerror('#logodiv');
                } else if (this.displayarray[this.y].indexOf("url") >= 0) {
                    this.setelementerror('.url-error-box');
                }else if (this.displayarray[this.y].indexOf("email") >= 0) {
                    this.setelementerror('#preview-contact-email-form');
                }else if (this.displayarray[this.y].indexOf("primarycolor") >= 0) {
                    this.setelementerror('#color');
                }
            }
            //display error message
            this.displayerror(this.showerrormessage);
        }
        $('#loadingdiv').remove();
    }

//Helpers

//Helper.convertjson
    this.convertjson = function (jsonsent, returntype) {
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

//Helper.EmailConvert
    this.useremailview = function (textsent, textreplace, restore) {
        if (!restore) {
            return textsent.replace(textreplace, "");
        } else {
            return textreplace + textsent;
        }
    }

//Helper.PageHeight
    this.calcpageheight = function () {
        this.pagewidth = $(window).width();
        this.pageheight = $(window).height();
        this.setmargin = "";
        if (this.pagewidth >= 769)
        {
            if (this.pageheight < 750) {
                this.setmargin = '15px';
            } else {
                this.setmargin = ((this.pageheight - 750) / 2) + 'px';
            }
        } else {
            this.setmargin = '15px';
        }
        $('.previewmodal').css("margin-top", this.setmargin)
    }

//Helper.Convert rgb to hex
    this.convertrgbtohex = function (rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }

//Helper.Calculate secondary color
    this.shadeBlend = function (p, c0, c1) {
        this.n = p < 0 ? p * -1 : p, u = Math.round, w = parseInt;
        if (c0.length > 7) {
            var f = c0.split(","), t = (c1 ? c1 : p < 0 ? "rgb(0,0,0)" : "rgb(255,255,255)").split(","), R = w(f[0].slice(4)), G = w(f[1]), B = w(f[2]);
            return "rgb(" + (u((w(t[0].slice(4)) - R) * this.n) + R) + "," + (u((w(t[1]) - G) * this.n) + G) + "," + (u((w(t[2]) - B) * this.n) + B) + ")"
        } else {
            var f = w(c0.slice(1), 16), t = w((c1 ? c1 : p < 0 ? "#000000" : "#FFFFFF").slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF;
            return "#" + (0x1000000 + (u(((t >> 16) - R1) * this.n) + R1) * 0x10000 + (u(((t >> 8 & 0x00FF) - G1) * this.n) + G1) * 0x100 + (u(((t & 0x0000FF) - B1) * this.n) + B1)).toString(16).slice(1)
        }
    }

//Helper.Calculate.file.Size
    this.calculatefilesize = function (element, maxsize) {
        this.checkfile = document.getElementById(element).files[0];
        this.filesize = this.checkfile.size;
        if (this.filesize <= maxsize) {
            return true;
        } else {
            $('#' + element).val("");
            return false;
        }
    }

//Helper.Return filename from input
    this.returnfilename = function (getfileelement, showfile, setfileelement) {
        this.file = $(getfileelement).val();
        this.setfile = setfileelement;
        this.file = this.file.split("\\");
        this.getfilename = this.file.length - 1;
        if (showfile) {
            this.setelementhtml(this.file[this.getfilename], this.setfile);
            //this.previewfile();
        } else {
            return this.file[this.getfilename];
        }
    }

//Helper.Validate Email
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        return (false)
    }

//Helper.SetElement html
    this.setelementhtml = function (html, element) {
        $(element).html(html);
    }

//Helper.Display error message
    this.displayerror = function (senterrorstring) {
        $('#validation-results').show();
        this.setelementhtml(senterrorstring, '#validationResultsList');
        return;
    }

//Helper close error box
    this.closeerror = function () {
        $('#validation-results').hide();
        this.setelementhtml("", '#validationResultsList');
        return;
    }

//Helper set individual error class
    this.setelementerror = function (elementid) {
        $(elementid).addClass("white-error-box");
        $(elementid).removeClass("white-success-box");
    }

//Helper set individual success class
    this.setelementsuccess = function (elementid) {
        $(elementid).addClass("white-success-box");
        $(elementid).removeClass("white-error-box");
    }

//End of class
}

//Jquery events
//Jquery.On Change events
$(document).on('change', '#preview-logo-input', function () {
    if (!whitelabel.calculatefilesize('preview-logo-input', 4545454729)) {
        whitelabel.displayerror("<li>File can not be over 3 megabytes.</li");
        if (whitelabel.attemptedformpost) {
            whitelabel.getuserentries(false, true);
        }
        return;
    }
    whitelabel.returnfilename('#preview-logo-input', true, '#holdselectedfile');
    previewFile();
    if (whitelabel.attemptedformpost) {
        whitelabel.getuserentries(false, true);
    }
});
//Jquery.On click events
//Button click event which calls the setfileinfo function --- Pass the account name
$(document).on('click', '#applywhitelabellingclick', function () {
    whitelabel.attemptedformpost = true;
    whitelabel.getuserentries(true, true);
});

//Jquery.on blur events
$(document).on('blur', '#preview-contact-email-form', function () {
    if (whitelabel.attemptedformpost) {
        whitelabel.getuserentries(false, true);
    }
});
$(document).on('blur', '#color', function () {
    if (whitelabel.attemptedformpost) {
        whitelabel.getuserentries(false, true);
    }
});
$(document).on('blur', '#preview-url-form', function () {
    if (whitelabel.attemptedformpost) {
        whitelabel.getuserentries(false, true);
    }
});
$(document).on('blur', '#email', function () {
   var email = $(this).val().replace(/ /g,'');
   $(this).val(email);
});



//Preview File Not working in class..
function previewFile() {
    var preview = document.getElementById('uploadimagewhite');
    var file = document.getElementById('preview-logo-input').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        var base64string = reader.result;
        preview.src = base64string;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

$(document).ready(function () {
    var filterOptions = {
        "dom": '<"top"f>rt<"bottom"lip><"clear">',
        "oLanguage": {
            "sLengthMenu": "Show _MENU_",
            "oPaginate": {
                "sPrevious": "←",
                "sNext": "→"
            }
        }
    }
    ctable = oDataTable.init($('[data-content="user-list"]>table'), filterOptions);
    oDataTable.init($('#existingpartnerstable1'));
    oDataTable.init($('#existingpartnerstable2'));
    if ($('#activeAccount').prop('checked') == true) {
        $('#activeAccountSpan').addClass('checked');
    }

    $('#preview-url-form').on('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (key == "-") {
            return;
        } else {
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        }
    });

    $('#preview-logo-input').val("");
});
