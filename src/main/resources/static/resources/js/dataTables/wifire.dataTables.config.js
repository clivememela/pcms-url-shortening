/* 
 * The aim of this file is to congifure datatables so that there's minimal
 * JS required to plugin functionality into <table> elements 
 * (i.e. Person without JS knowledge should be able to use the plugin)
 * 
 * File         : Wi-Fire Configuration file for the DataTables
 * 
 * Created on   : Nov 18, 2015
 * Author       : Rodney <rodney@wifire.co.za>
 * 
 * Description  : This file can be edited. You can configure DataTables here
 *                anyway you want. Just make sure that HTML class ".jsDataTable"
 *                is added to the <table> tag of the table you want to cingure.
 *                
 *                @IMPORTANT: Make sure table has <thead> and <tbody> defined
 *                
 */


/*
 * Settings/Config HTML Data Attributes => ONLY need to add data attribute to <table>
 * ===================================================================================
 * 
 * -----------------------------------------------------------------------------------
 * GLOBAL (TABLE LEVEL) SETTINGS
 * - These settings affect the whole data table
 * -----------------------------------------------------------------------------------
 * 
 * @Length: 
 *  data-page-length="25"
 *  (default length is "10")
 *  
 * @Search: This option allows the search abilities of DataTables to be enabled or disabled
 *  data-searching="false" OR
 *  data-filter="false"
 *  (default is "true")
 *  
 * @Ordering: Enable or disable ordering (sorting) in DataTables.
 *  data-ordering="false"
 *  (default is "true")
 *  
 * @Paging: Enable or disable table pagination
 *  data-paging="false"
 *  (default is "true")
 *  
 * -----------------------------------------------------------------------------------
 * COLUMN LEVEL SETTINGS
 * - These settings only affect specified column(s)
 * -----------------------------------------------------------------------------------
 *  
 * @Order:
 *  data-order="[[ 0, &quot;asc&quot; ]]" OR
 *  data-sort="[[ 0, &quot;asc&quot; ]]"
 *  (default order is 0, ascending)
 *  
 * @Sorting:
 *  data-column-defs="[ { &quot;sortable&quot;: false, &quot;targets&quot;: [1,3] } ]"
 *  (default is "true" for every column)
 *  
 */

$(document).ready(function() {
    
    if (typeof $('[data-content="master-template"] .jsDataTableDisabledFilter') !== "undefined") {
        
        var atable        = $('[data-content="master-template"] .jsDataTableDisabledFilter').dataTable({ "dom": '<"top"f>rt<"bottom"lip><"clear">' });
        var filter_html = '<div class="checkbox icheck">';
            filter_html+= '<label for="masterTemplate" class="checked">';
            filter_html+= '<span class="icheckbox_square checked" aria-checked="false" aria-disabled="false">';
            filter_html+= '<input id="masterTemplate" type="checkbox" data-target="filter-datatable" data-filter-defualt-value="false" data-filter-value="true" data-filter-column="0" />';
            filter_html+= '<ins class="iCheck-helper"></ins>';
            filter_html+= '</span>&nbsp;&nbsp;';
            filter_html+= 'Show Disabled';
            filter_html+= '</label>';
            filter_html+= '</div>';
        
        $('[data-content="master-template"] div.dataTables_filter').append(filter_html);
    
        $('.checkbox.icheck label[for="masterTemplate"]').on('click', function(e) {

            e.preventDefault();

            var filter_input        = $( this ).find('input[type="checkbox"]');
            var filter_val          = filter_input.attr('data-filter-value');
            var filter_col          = filter_input.attr('data-filter-column');
            var filter_default_val  = filter_input.attr('data-filter-defualt-value');

            if ($( this ).hasClass('checked')) {
                atable.fnFilter(filter_default_val, filter_col, true, false);
            } else {
                atable.fnFilter(filter_val, filter_col, true, false);
            }
        });
    }
    if (typeof $('[data-content="custom-template"] .jsDataTableDisabledFilter') !== "undefined") {
        
        var btable        = $('[data-content="custom-template"] .jsDataTableDisabledFilter').dataTable({ "dom": '<"top"f>rt<"bottom"lip><"clear">' });
        var filter_html = '<div class="checkbox icheck">';
            filter_html+= '<label for="customTemplate" class="checked">';
            filter_html+= '<span class="icheckbox_square checked" aria-checked="false" aria-disabled="false">';
            filter_html+= '<input id="customTemplate" type="checkbox" data-filter-defualt-value="false" data-filter-value="true" data-filter-column="0" />';
            filter_html+= '<ins class="iCheck-helper"></ins>';
            filter_html+= '</span>&nbsp;&nbsp;';
            filter_html+= 'Show Disabled';
            filter_html+= '</label>';
            filter_html+= '</div>';
        
        $('[data-content="custom-template"] div.dataTables_filter').append(filter_html);
    
        $('.checkbox.icheck label[for="customTemplate"]').on('click', function(e) {

            e.preventDefault();

            var filter_input        = $( this ).find('input[type="checkbox"]');
            var filter_val          = filter_input.attr('data-filter-value');
            var filter_col          = filter_input.attr('data-filter-column');
            var filter_default_val  = filter_input.attr('data-filter-defualt-value');

            if ($( this ).hasClass('checked')) {
                btable.fnFilter(filter_default_val, filter_col, true, false);
            } else {
                btable.fnFilter(filter_val, filter_col, true, false);
            }
        });
    }
    if (typeof $('[data-content="account-list"] .jsDataTableInactiveFilter') !== "undefined") {
        
        var ctable      = $('[data-content="account-list"] .jsDataTableInactiveFilter').dataTable({ "dom": '<"top"f>rt<"bottom"lip><"clear">' });
        var filter_html = '<div class="checkbox icheck">';
            filter_html+= '<label for="displayInactive">';
            filter_html+= '<span class="icheckbox_square" aria-checked="false" aria-disabled="false">';
            filter_html+= '<input id="displayInactive" type="checkbox" data-target="filter-datatable" data-filter-value="false" data-filter-column="3" />';
            filter_html+= '<ins class="iCheck-helper"></ins>';
            filter_html+= '</span>&nbsp;&nbsp;';
            filter_html+= 'Display Inactive';
            filter_html+= '</label>';
            filter_html+= '</div>';
        
        $('[data-content="account-list"] div.dataTables_filter').append(filter_html);
    
        $('.checkbox.icheck label[for="displayInactive"]').on('click', function(e) {

            e.preventDefault();

            var filter_input    = $( this ).find('input[type="checkbox"]');
            var filter_val      = filter_input.attr('data-filter-value');
            var filter_col      = filter_input.attr('data-filter-column');
            var icheckbox_square= $( this ).find('.icheckbox_square');

            if (icheckbox_square.attr('aria-checked') === "false") {
                ctable.fnFilter(filter_val, filter_col, true, false);
            } else {
                ctable.fnFilter('', filter_col, true, false);
            }
        });
    }
    
 if (typeof $('[data-content="gateway-list"] .jsDataTableInactiveFilter') !== "undefined") {
        
        var dtable      = $('[data-content="gateway-list"] .jsDataTableInactiveFilter').dataTable({ "dom": '<"top"f>rt<"bottom"lip><"clear">' });
       
    }
    
    
    if (typeof $('.jsDataTable') !== "undefined") {
        $('.jsDataTable').DataTable({ "dom": '<"top"f>rt<"bottom"lip><"clear">' });
    }
    
});