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