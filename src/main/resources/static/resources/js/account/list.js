$(document).ready(function () {
	oDataTable.init($('#account-list-table'));
	
	$('#countrySelect option[value="ZA"]').prop('selected', true);
    populateTimeZones();
    $('#timeZoneDropDown option[value="Africa/Johannesburg"]').prop('selected', true);
});

$(document).on('click', 'div.dataTables_wrapper div.top div.dataTables_filter > .checkbox > label[for="displayInactive"]', function(e) {

    e.preventDefault();

    var filter_input    = $( this ).find('input[type="checkbox"]');
    var filter_val      = filter_input.attr('data-filter-value');
    var filter_col      = filter_input.attr('data-filter-column');
    var icheckbox_square= $( this ).find('.icheckbox_square');

    if (icheckbox_square.attr('aria-checked') === "false") {
        ctable.fnFilter(filter_val, filter_col, true, false); // need to fix fnFilter
    } else {
        ctable.fnFilter('', filter_col, true, false);
    }
});


function populateTimeZones() {
    
    var countryCode = $('#countrySelect').find(':selected').val();
                               
       $.ajax({
           url : '/admin/branch/'+countryCode+'/timezones',
           type : 'GET',
           cache : false,
           dataType : "text",
           success : function(result) {
            
               
               $('#timeZoneDropDown').removeAttr('disabled');
               
               var options = '<option value="">--Please Select--</option>';
               

               if (typeof result != "object") {
                   result = $.parseJSON(result);
               }
               
               $.each(result.timeZones, function(i) {
                   console.log(result.timeZones[i]);
                   options += '<option value="'+result.timeZones[i]+'">'+ result.timeZones[i] + '</option>';
               })
               
               $('#timeZoneDropDown').html(options);
               $('#timeZoneDropDown option[value="Africa/Johannesburg"]').prop('selected',true);
               
           },
           error : function(result) {
               console.log(result);
           }
       });
       
}