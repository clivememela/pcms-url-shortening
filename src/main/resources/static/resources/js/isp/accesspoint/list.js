$(document).ready(function() {
    $.get('/accesspoint/models/ajax').done(function(result) {
        if (result !== null && typeof result === "object") {
            $('#access-point').data("models", result);
        }
    });
});

$(document).ready(function() {
    $.get('/controller_old/list').done(function(result) {
        console.log(result);
        if (result !== null && typeof result === "object") {
            $('#access-point').data("controllers", result);
        }
    });
});

$(document).ready(function() {
    $.get('/proxy/list').done(function(result) {
        console.log(result);
        if (result !== null && typeof result === "object") {
            $('#access-point').data("proxies", result);
        }
    });
});

$(document).on('change', 'select[data-target="get-branch"]', function() {

    var overlay = $('#configure-left-pane-overlay');

    if ($(this).val().length > 0) {
        var brandname = $('select[data-target="get-branch"] option:selected').attr('data-brandname');
        $('input#hidden-brand').val($(this).val());
        $('input#hidden-branch').val('');
        getBranches($(this).val());
        selectionBlockquote(brandname, 'Brand');
    } else {
        $('.selection-blockquote').html('').hide();
        $('.ap-bl-list > ul').html('<li class="text-center"><em>Please select brand...</em></li>');
        $('input[data-role="branch-filter"]').attr('disabled', true);
    }
    overlay.show();
});

$(document).on('click', '.ap-bl-list > ul > li > a', function(e) {
    e.preventDefault();
    $('#configure-left-pane-overlay').hide();
    $('.ap-bl-list > ul > li').removeClass('active');
    $(this).parent('li').addClass('active');
    $('input#hidden-branch').val($(this).attr('data-branchid'));
    selectionBlockquote($(this).text(), 'Branch');

    getGateway($(this).attr('data-branchid'));
    getAccessPoints($(this).attr('data-branchid'));
    getProxy($(this).attr('data-branchid'));

});

$(document).on('keyup', 'input[data-role="branch-filter"]', function() {

    var needle = $(this).val();
    var list = $('.ap-bl-list>ul>li');
    var count = list.find('a:containsIgnoreCase(' + needle + ')').length;
    var noResult = $('p.no-result');

    list.hide();
    noResult.remove();

    if (count > 0) {
        list.find('a:containsIgnoreCase(' + needle + ')').parent('li').show();
    } else {
        $('.ap-bl-list').prepend('<p class="text-center no-result"><em>No results found for <strong>"' + needle + '"</strong></em></p>');
    }
});

/*
 * ------------------------------------------------------- Functions -------------------------------------------------------
 */

function addItemToDropdownOptions($select, val, text, selected) {
    var selAttr = (selected) ? ' selected="selected"' : '';
    $select.append('<option value="' + val + '" ' + selAttr + '>' + text + '</option>');
}

function getBranches(brand_id) {
    $('input[data-role="branch-filter"]').attr('disabled', true);
    $.ajax({
        url : '/isp/gateway/' + brand_id + '/branch/list/json',
        type : 'GET',
        cache : false,
        dataType : "text",
        success : function(result) {
            var html = '';
            if (typeof result !== "object") {
                result = $.parseJSON(result);
            }
            if (result.branches) {
                if (result.branches.length > 0) {
                    $.each(result.branches, function(i, branch) {
                        html += '<li><a href="#" data-branchid="' + branch.id + '">' + branch.name + '</a></li>';
                    });
                    $('input[data-role="branch-filter"]').attr('disabled', false);
                } else {
                    html += '<li class="text-center"><em>No branch available for the selected brand.<em></li>';
                }
                $('.ap-bl-list > ul').html(html);
            }
        },
        error : function(result) {
            console.log(result);
        }
    });
}

function getGateway(branchId) {

   

    $.ajax({
        url : '/inventory/gateway/branch/' + branchId,
        type : 'GET',
        cache : false,
        dataType : "text",
        success : function(result) {

            $('#gwIdentity').html('');
            $('#gwSerial').html('');
            $('#gwStatus').html('');

            if (result != null && result.length > 0) {
                var data = (typeof result == "object") ? result : $.parseJSON(result);

                $('#gwIdentity').html(data.gateway_identity);
                $('#gwSerial').html(data.serial_number);
                $('#gwStatus').html(data.status);
                
            }

        },
        error : function(result) {
            console.log(result);
        }
    });

}

function getAccessPoints(branchId) {

    $.ajax({
        url : '/inventory/accesspoints/branch/' + branchId + '/html',
        type : 'GET',
        cache : false,
        dataType : "html",
        success : function(result) {

            $('#apResultList').html('');
            $('#apResultList').html(result);

        },
        error : function(result) {
            console.log(result);
        }
    });

}

function getProxy(branchId) {

    $.ajax({
        url : '/proxy/forbranch/' + branchId,
        type : 'GET',
        cache : false,
        dataType : "html",
        success : function(result) {

            var data = (typeof result == "object") ? result : $.parseJSON(result);

            $('#proxy-name').text('');
            $('#proxy-identity').text('');
            $('#proxy-controller_old-id').text('');
            
            if (data != null) {
                if(data.name != null)
                $('#proxy-name').text(data.name);
                if(data.proxy_identity != null)
                $('#proxy-identity').text(data.proxy_identity);
                if(data.controller_id !=null)
                $('#proxy-controller_old-id').text(data.controller_id);
            }
        },
        error : function(result) {
            console.log(result);
        }
    });

}

function selectionBlockquote(text, type) {
    var container = $('.selection-blockquote');
    if (type.toLowerCase() === "brand") {
        container.html('');
    }
    if (type.toLowerCase() === "branch") {
        container.find('.selected-branch').remove();
    }
    container.show();
    container.append('<blockquote class="selected-' + type.toLowerCase() + '">' + type + ': <span>' + text + '</span></blockquote>');
}