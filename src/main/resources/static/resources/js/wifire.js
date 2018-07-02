/* 
 * Wifire Custom / Default JavaScript Code
 * 
 * File         : Wifire Custom JS File * 
 * Created on   : Dec 28, 2015
 * Author       : Rodney <rodney@wifire.co.za>
 */

$(document).ready(function() {

    /*
     * ------------------------------------------------------- iChekbox related javascript -------------------------------------------------------
     */

    $('.checkbox.icheck label, .radio.icheck label').on('hover', function() {
        $(this).toggleClass('hover');
        $(this).find('.icheckbox_square, .iradio_square').toggleClass('hover');
    });

    $('.checkbox.icheck label').on('click', function(e) {

        e.preventDefault();

        var icheckbox_square = $(this).find('.icheckbox_square');
        var icheckbox_input = $(this).find('input[type="checkbox"]');

        if (icheckbox_square.hasClass("disabled")) {
            return false;
        }

        $(this).toggleClass('checked');

        icheckbox_square.toggleClass('checked');

        if (icheckbox_square.attr('aria-checked') === "false") {

            icheckbox_square.attr('aria-checked', true);
            icheckbox_input.attr('checked', true);

            if (typeof $(this).find('input[type="hidden"][name="_active"]') != "undefined") {
                $(this).find('input[type="hidden"][name="_active"]').val('on');
            }
            if (typeof $(this).find('input[type="hidden"][name="_available"]') != "undefined") {
                $(this).find('input[type="hidden"][name="_available"]').val('on');
            }
            if (typeof $(this).find('input[type="hidden"][name="_termsAccepted"]') != "undefined") {
                $(this).find('input[type="hidden"][name="_termsAccepted"]').val('on');
            }

        } else {

            icheckbox_square.attr('aria-checked', false);
            icheckbox_input.attr('checked', false);

            if (typeof $(this).find('input[type="hidden"][name="_active"]') != "undefined") {
                $(this).find('input[type="hidden"][name="_active"]').val('off');
            }
            if (typeof $(this).find('input[type="hidden"][name="_available"]') != "undefined") {
                $(this).find('input[type="hidden"][name="_available"]').val('off');
            }
            if (typeof $(this).find('input[type="hidden"][name="_termsAccepted"]') != "undefined") {
                $(this).find('input[type="hidden"][name="_termsAccepted"]').val('off');
            }
        }
    });

    $('.radio.icheck label').on('click', function(e) {

        e.preventDefault();

        var this_iradio = $(this).find('.iradio_square');
        var this_input = $(this).find('input[type="radio"]');
        var all_iradio = $('.radio.icheck label').find('.iradio_square');
        var all_input = $('.radio.icheck label').find('input[type="radio"]');

        if (this_iradio.hasClass("disabled")) {
            return false;
        }

        // reset all radios
        $('.radio.icheck label').removeClass('checked');
        all_iradio.attr('aria-checked', false).removeClass('checked');
        all_input.attr('aria-checked', false);

        // set current radio to checked
        $(this).addClass('checked');
        this_iradio.attr('aria-checked', true).addClass('checked');
        this_input.attr('checked', true);
    });

    if (typeof $('[data-content="master-template"] .jsDataTableDisabledFilter') !== "undefined" || typeof $('[data-content="custom-template"] .jsDataTableDisabledFilter') !== "undefined") {
        $('.checkbox.icheck label[for="masterTemplate"], .checkbox.icheck label[for="customTemplate"]').click();
    }

    if (typeof $('input.modelCheckbox') !== "undefined") {
        $('input.modelCheckbox').each(function() {
            if ($(this).is(':checked')) {
                var label = $(this).closest('label');
                var icheckbox_square = label.find('.icheckbox_square');
                label.addClass('checked');
                icheckbox_square.addClass('checked');
            } else {
                var label = $(this).closest('label');
                var icheckbox_square = label.find('.icheckbox_square');
                icheckbox_square.removeClass('disabled');
            }
        });
    }

    /*
     * ------------------------------------------------------- /iChekbox related javascript -------------------------------------------------------
     */

    /*
     * ------------------------------------------------------- Multiple select -------------------------------------------------------
     */

    if ($('.js-multi-select')) {
        $('.js-multi-select').select2({
            placeholder : "--Please Select--"
        });
    }

    /*
     * ------------------------------------------------------- /Multiple select -------------------------------------------------------
     */
});

$(document).on('click', 'a.btn-add-new', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('dialog-none')) {
        selectAddOption($(this));
    }
    if ($(this).hasClass('attach-to-branch')) {
        attachToBranch($(this));
    }
});

$(document).on('change', 'select[data-role="get-templates"]', function() {
    var templateId = $(this).val();
    if (templateId.length === 0) {
        return false;
    }
    $.get('/accesspoint/templates/' + templateId + '/ajax').done(function(result) {
        var options = '';
        options += '<option value="">--Please Select--</option>';
        $.each(result, function(k, template) {
            options += '<option value="' + template.id + '">' + template.template_name + '</option>';
        });
        $('select[name="template"]').html(options).attr('disabled', false);
    });
});

/*
 * ============================================= = Functions = =============================================
 */

function selectAddOption($element) {

    var options = {};
    var type = $element.attr('data-type');
    var buttons = [];
    var html = '';

    switch (type) {

    case 'firegate':
        options.title = 'Create New Firegate';
        buttons.push({
            icon : 'fa fa-send',
            label : 'Submit',
            cssClass : 'btn-primary',
            action : function(dialog) {

                var $this = $(this);

                $this.html('Processing...');
                $this.attr('disabled', true);
                $this.closest('.modal-content').find('input,select,button').each(function() {
                    var $input = $(this);
                    $input.attr('disabled', true);
                });

                /** *************************** do ajax **************************** */
                // do ajax and append new item/option to select dropdown...
                saveFiregate();
                dialog.close();
                /** *************************** /do ajax **************************** */
            }
        });
        break;

    case 'controller':
        options.title = 'Create New Controller';
        buttons.push({
            icon : 'fa fa-send',
            label : 'Submit',
            cssClass : 'btn-primary',
            action : function(dialog) {

                var $this = $(this);

                $this.html('Processing...');
                $this.attr('disabled', true);
                $this.closest('.modal-content').find('input,select,button').each(function() {
                    var $input = $(this);
                    $input.attr('disabled', true);
                });

                /** *************************** do ajax **************************** */
                // do ajax and append new item/option to select dropdown...
                saveController();
                dialog.close();
                /** *************************** /do ajax **************************** */
            }
        });
        break;

    case 'accessPoint':
        options.title = 'Create New Access Point';
        buttons.push({
            icon : 'fa fa-send',
            label : 'Submit',
            cssClass : 'btn-primary',
            action : function(dialog) {

                var $this = $(this);

                $this.html('Processing...');
                $this.attr('disabled', true);
                $this.closest('.modal-content').find('input,select,button').each(function() {
                    var $input = $(this);
                    $input.attr('disabled', true);
                });

                /** *************************** do ajax **************************** */
                // do ajax and append new item/option to select dropdown...
                saveAccessPoint();
                dialog.close();
                /** *************************** /do ajax **************************** */
            }
        });
        break;

    case 'proxy':
        options.title = 'Create New Proxy';
        buttons.push({
            icon : 'fa fa-send',
            label : 'Submit',
            cssClass : 'btn-primary',
            action : function(dialog) {

                var $this = $(this);

                $this.html('Processing...');
                $this.attr('disabled', true);
                $this.closest('.modal-content').find('input,select,button').each(function() {
                    var $input = $(this);
                    $input.attr('disabled', true);
                });

                /** ************************* do ajax ******************************* */
                saveProxy();
                dialog.close();
            }
        });
        break;
    }

    // build html
    html += buildHtml(type);

    // cancel / close button
    buttons.push({
        icon : 'fa fa-times',
        label : 'Cancel',
        cssClass : 'btn-default',
        action : function(dialog) {
            dialog.close();
        }
    });

    // message
    options.type = 'type-default';
    options.message = html;
    options.buttons = buttons;
    BootstrapDialog.show(options);
}

function attachToBranch($element) {

    var type = $element.attr('data-type');

    switch (type) {
    case 'firegate':
        attachFiregateToBranch();
        break;
    case 'accessPoint':
        attachApToBranch();
        
        break;
    case 'proxy':
        attachProxyToBranch();
        break;
    }
}

function buildHtml(type, data) {
    var html = '';
    var obj = (typeof data === "object") ? data : null;
    switch (type) {
    case 'firegate':

        // grab data (objects) to populate select dropdowns
        var models = $('#access-point').data('models');

        // serial number html
        html += '<div class="form-group">';
        html += '<label class="required">Serial Number</label>';
        html += '<input type="text" class="form-control" name="serialNumber" id="dialogSerialNumber" />';
        html += '</div>';

        // model dropdown html
        html += '<div class="form-group">';
        html += '<label class="required">Model</label>';
        html += '<select class="form-control" name="model" id="dialogModel" data-role="get-templates">';
        html += '<option value="">--Please Select--</option>';
        $.each(models, function(k, model) {
            html += '<option value="' + model.id + '">' + model.model_name + '</option>';
        });
        html += '</select>';
        html += '</div>';

        // template dropdown html
        html += '<div class="form-group">';
        html += '<label class="required">Template</label>';
        html += '<select class="form-control" name="template" id="dialogTemplate" disabled="disabled">';
        html += '<option value="">--Please Select--</option>';
        html += '</select>';
        html += '</div>';
        break;

    case 'controller':

        // controller name html
        html += '<div class="form-group">';
        html += '<label class="required">Name</label>';
        html += '<input type="text" class="form-control" name="controllerName" id="dialogControllerName" />';
        html += '</div>';

        break;

    case 'accessPoint':

        var controllers = $('#access-point').data('controllers');
        var proxies = $('#access-point').data('proxies');

        // MAC address html
        html += '<div class="form-group">';
        html += '<label class="required">MAC Address</label>';
        html += '<input type="text" class="form-control" name="macAddress" id="dialogMacAddress" />';
        html += '</div>';

        // AP name html
        html += '<div class="form-group">';
        html += '<label class="required">AP Name</label>';
        html += '<input type="text" class="form-control" name="apName" id="dialogApName" />';
        html += '</div>';

        html += '<div class="form-group">';
        html += '<label class="required">AP Type</label>';
        html += '<select id="apType" class="form-control" required="required" data-val-type="">';
        html += ' <option value="">--Please Select--</option>';
        html += '<option value="NAS">NAS</option>';
        html += '<option value="Non-NAS">Non-NAS</option>';
        html += '</select>';
        html += '</div>';

        // IP address html
        html += '<div class="form-group">';
        html += '<label class="required">IP Address</label>';
        html += '<input type="text" class="form-control" name="ipAddress" id="dialogIpAddress" />';
        html += '</div>';

        // controller dropdown html
        html += '<div class="form-group">';
        html += '<label class="required">Controller</label>';
        html += '<select class="form-control" name="controller_old" id="dialogController" onchange="filterProxies()">';
        html += '<option value="">--Please Select--</option>';
        if (controllers != null && controllers.length > 0) {
            $.each(controllers, function(k, controller) {
                html += '<option value="' + controller.id + '">' + controller.name + '</option>';
            });
        }
        html += '</select>';
        html += '</div>';

        // proxy dropdown html
        html += '<div class="form-group">';
        html += '<label class="required">Proxy</label>';
        html += '<select class="form-control" name="proxy" disabled="disabled" id="dialogProxy">';
        html += '<option value="">--Please Select--</option>';
        if (proxies != null && proxies.length > 0) {
            $.each(proxies, function(k, proxy) {
                html += '<option data-controller_old-id="' + proxy.controller_id + '" value="' + proxy.id + '">' + proxy.name + '</option>';
            });
        }
        html += '</select>';
        html += '</div>';

        break;

    case 'proxy':

        var controllers = $('#access-point').data('controllers');

        // controller name html
        html += '<div class="form-group">';
        html += '<label class="required">Name</label>';
        html += '<input type="text" class="form-control" name="proxyName" id="dialogProxyName" />';
        html += '</div>';
        
        html += '<div class="form-group">';
        html += '<label class="required">Proxy Identity</label>';
        html += '<input type="text" class="form-control" name="proxyIdentity" id="dialogProxyIdentity" />';
        html += '</div>';

        // controller dropdown html
        html += '<div class="form-group">';
        html += '<label class="required">Controller</label>';
        html += '<select class="form-control" name="controller_old" id="dialogProxyController">';
        html += '<option value="">--Please Select--</option>';
        if (controllers != null && controllers.length > 0) {
            $.each(controllers, function(k, controller) {
                html += '<option value="' + controller.id + '">' + controller.name + '</option>';
            });
        }
        html += '</select>';
        html += '</div>';

        break;
    }
    return html;
}

function saveFiregate() {

    var postData = {
        // branch_id : $('input#hidden-branch').val(),
        model : $('#dialogModel').val(),
        serial_number : $('#dialogSerialNumber').val(),
        template : $('#dialogTemplate').val()
    };

    var request = $.ajax({
        url : '/isp/gateway/save',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(postData),
        processData : false,
        dataType : 'text'
    });
    request.done(function(response) {
        var data = (typeof response === "object") ? response : $.parseJSON(response);
        if (data.status === 'NOT_PARAMETERIZED') {

            showParametersScreen(data.selectedGatewayId);

        }
        $('select[name="configure-firegate"]').append('<option value="' + data.selectedGatewayId + '" selected="selected">' + data.serial + '</option>');

    });
}

function showParametersScreen(gatewayId) {

    $.ajax({
        url : '/admin/gateway/config/parameters/' + gatewayId + '/populate/alt',
        type : 'GET',
        cache : false,
        dataType : "html",
        success : function(result) {

            $('#adminModal').modal('show');
            $('#adminModalBody').html(result);
            $('#adminModalBody').append('<button class="btn btn-primary" onclick="saveParameters('+gatewayId+')"><span class="bootstrap-dialog-button-icon fa fa-send"></span>Save</button> ');
        },
        error : function(result) {
            console.log(result);
        }
    });

}

function saveParameters(gatewayId) {

    var parameterList = {
        parameters : []
    };

    var count = $('.unpopulated').size();
    var editedParamCount = $('.editedParam').size();

    for (var x = 1; x <= editedParamCount; x++) {

        var parameter = {
            id : "",
            name : "",
            type : "",
            value : "",
            readOnly : false
        };

        parameter.id = $('#editedParamId' + x).val();
        parameter.name = $('#editedParamName' + x).val();
        parameter.type = $('#editedParamType' + x).val();
        parameter.value = $('#editedParamValue' + x).val();
        parameterList.parameters.push(parameter);

    }

    for (var x = 1; x <= count; x++) {

        var parameter = {
            name : "",
            type : "",
            value : "",
            readOnly : false
        };

        parameter.name = $('#unpopulatedParameterName' + x).val();
        parameter.type = $('#unpopulatedParameterType' + x).val();
        parameter.value = $('#unpopulatedParameterValue' + x).val();
        parameterList.parameters.push(parameter);

    }

    var request = $.ajax({
        url : '/admin/gateway/' + gatewayId + '/config/parameters',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(parameterList.parameters),
        processData : false,
        dataType : 'text'
    });
    request.done(function(response) {
        var data = (typeof response == "object") ? response : $.parseJSON(response);

        if (data.success != null && data.success != '') {

            
            $('#adminModal').modal('hide');
            $('#jsonSuccess').show();
            $('#jsonSuccessText').html(data.success);
            
         
            
            if (data.selectedGatewayStatus != null && data.selectedGatewayStatus != '') {
         
                var $status = $("tr[data-gateway-id='" + data.selectedGatewayId + "']").find('div.gateway-status');

                switch (data.selectedGatewayStatus) {

                case 'NO_CONFIG':
                    $status.html('<span  class="badge bg-red" style="color: red">No Config</span>');
                    break;
                case 'NOT_PARAMETERIZED':
                    $status.html('<span  class="badge bg-red" style="color: red">Not Parameterized</span>');
                    break;
                case 'PENDING':
                    $status.html('<span  class="badge bg-orange" style="color: orange">Pending</span>');
                    break;
                case 'CONFIGURED':
                    $status.html('<span class="badge bg-green" style="color: green">Configured</span>');
                    break;

                }

            }
            
            

        }

     

    });

}

function filterProxies() {

    var controllerId = $('#dialogController').find(':selected').val();
    $('#dialogProxy').removeAttr('disabled');

    $('#dialogProxy >option').each(function() {

        if ($(this).hasAttr('data-controller_old-id')) {

            if ($(this).attr('data-controller_old-id') == controllerId) {
                $(this).show();
            } else {
                $(this).hide();
            }

        }

    });

}

function saveController() {

    var postData = {
        brand_id : $('input#hidden-brand').val(),
        name : $('#dialogControllerName').val()
    };
    var request = $.ajax({
        url : '/controller_old/json/add/',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(postData),
        processData : false,
        dataType : 'text'
    });
    request.done(function(response) {

        var data = (typeof response === "object") ? response : $.parseJSON(response);
        console.log(data);
    });
}

function saveAccessPoint() {

    var brandId = $('#hidden-brand').val();

    var postData = {

        brand_id : brandId,
        mac_address : $('#dialogMacAddress').val(),
        ip_address : $('#dialogIpAddress').val(),
        ap_name : $('#dialogApName').val(),
        type : $('#apType').find(':selected').val(),
        proxy_id : $('#dialogProxy').val(),
        controller_id : $('#dialogController').val()
    };
    console.log(postData);
    var request = $.ajax({
        url : '/accesspoint/save/ajax',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(postData),
        processData : false,
        dataType : 'json'
    });
    request.done(function(response) {

        var data = (typeof response === "object") ? response : $.parseJSON(response);
        console.log(data);

        if (data != null) {
            $('select[name="configure-ap"]').append('<option value="' + data.id + '" selected="selected">' + data.ap_name + '</option>');
        }

    });
}

function saveProxy() {

    var brandId = $('#hidden-brand').val();
    var controllerId = $('#dialogProxyController').find(':selected').val();
    var proxyName = $('#dialogProxyName').val();
    var proxyIdentity = $('#dialogProxyIdentity').val();

    var proxyJson = {
        brand_id : brandId,
        name : proxyName,
        controller_id : controllerId,
        proxy_identity : proxyIdentity
    }

    var request = $.ajax({
        url : '/proxy/json/add/',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(proxyJson),
        processData : false,
        dataType : 'text'
    });
    request.done(function(response) {

        
        
        
        var data = (typeof response == "object") ? response : $.parseJSON(response);
        console.log(data);
        var optionString = '<option selected="selected" data-controller_old-id="' + response.controller_id + '" value="' + data.id + '">' + data.name + '</option>';
        $('#selectedProxy').val("");
        $('#selectedProxy').append(optionString);

        $('#jsonSuccess').show();
        $('#jsonSuccessText').html('Proxy added successfully.');
        $('#proxyModal').modal('hide');
       
        var branchId = $('#hidden-branch').val();
        getProxy(branchId);
        

    });
}

/**
 * Attach one or multiple firgate(s) to a single branch
 * 
 * @return {void}
 */
function attachFiregateToBranch() {
    var firegateId = $('select[name="configure-firegate"]').val();
    var branchId = $('input#hidden-branch').val();
    var postUrl = '/inventory/link/gateway/' + firegateId + '/branch/' + branchId;
    var postData = {
        'branch_id' : branchId,
        'firegate_id' : firegateId
    }
    console.log(postData);
    var request = $.ajax({
        url : postUrl,
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(postData),
        processData : false,
        dataType : 'text'
    });
    request.done(function(response) {
        var data = (typeof response === "object") ? response : $.parseJSON(response);
        console.log(data);
        $('#jsonSuccess').show();
        $('#jsonSuccessText').html('Successfully linked Firegate to Branch.');
        getGateway(branchId);
    });
}

/**
 * Attach one or multiple Access Point(s) to a single branch
 * 
 * @return {void}
 */
function attachApToBranch() {
    var apIds = $('select[name="configure-ap"]').val();
    var branchId = $('input#hidden-branch').val();
    var postUrl = '/inventory/link/accesspoint/branch/' + branchId;
    var postData = {
        'branch_id' : branchId,
        'access_point_id' : apIds
    }
    console.log(postData);
    var request = $.ajax({
        url : postUrl,
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(postData),
        processData : false,
        dataType : 'text'
    });
    request.done(function(response) {
        var data = (typeof response === "object") ? response : $.parseJSON(response);
        console.log(data);
        $('#jsonSuccess').show();
        $('#jsonSuccessText').html('Successfully linked AP to branch.');
        getAccessPoints(branchId);

    });
}

/**
 * Attach one proxy to a single branch
 * 
 * @return {void}
 */
function attachProxyToBranch() {

    var proxyId = $('select[name="configure-proxy"]').val();
    var branchId = $('input#hidden-branch').val();
    var postUrl = '/inventory/link/proxy/' + proxyId + '/branch/' + branchId;
    var postData = {
        'branch_id' : branchId,
        'proxy_id' : proxyId
    }
    console.log(postData);
    var request = $.ajax({
        url : postUrl,
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(postData),
        processData : false,
        dataType : 'text'
    });
    request.done(function(response) {
        var data = (typeof response === "object") ? response : $.parseJSON(response);
        console.log(data);
        $('#jsonSuccess').show();
        $('#jsonSuccessText').html('Successfully linked proxy to branch.');
        getProxy(branchId);

    });
}

$.expr[':'].containsIgnoreCase = function(n, i, m) {
    return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

/* ===== End of Functions ====== */