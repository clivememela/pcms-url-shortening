$(document).ready(function () {
	console.log("list");
	var countryDefault = $('#countrySelect option[value="ZA"]');
	var timeZoneDefault= $('#timeZoneDropDown option[value="Africa/Johannesburg"]');
	
        
        var filterOptions = {
			"dom" : '<"top"f>rt<"bottom"lip><"clear">',
			"oLanguage" : {
				"sLengthMenu" : "Show _MENU_",
				"oPaginate" : {
					"sPrevious" : "←",
					"sNext" : "→"
				}
			}
	}
	ctable = oDataTable.init($('[data-content="brand-list"]>table'), filterOptions);
        
        
	//oDataTable.init($('#brandListDataTable'));
        //$('#brandListDataTable').DataTable();
	countryDefault.prop('selected',true);
	getTimeZones();
	timeZoneDefault.prop('selected',true);
	
});

function getTimeZones() {
	
	var country = $('#countrySelect').find(':selected').val();
	var url 	= '/admin/branch/' + country + '/timezones';
	
	// do AJAX to get TimeZones
	ajax(url, function (res) {
		
		var timeZones 		= $('#timeZoneDropDown'); 
		var data 			= (typeof res === "object") ? res : $.parseJSON(res); 
		var timeZoneDefault = $('#timeZoneDropDown option[value="Africa/Johannesburg"]');
		var options 		= '<option value="">--Please Select--</option>';
		
		timeZones.removeAttr('disabled');
        
        $.each(data.timeZones, function(i) {
            options += '<option value="'+data.timeZones[i]+'">'+data.timeZones[i]+'</option>';
        });
        
        timeZones.html(options);
        timeZoneDefault.prop('selected',true);
        
	}, function (res) {
		console.log(res);
	});
}