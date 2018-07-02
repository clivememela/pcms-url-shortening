

 

$(document).ready(function () {
	
	if ($('#branchLocatorMap').length > 0) {
		
		// dynamically create map markers
		if ($('td[data-list="branch"]').length > 0) {
			
			// loop through branch list
			// get latitude and longitude values
			// create markers on Google (branch locator) Map
			// redraw Google (branch locator) Map
			var map_marker = [];
			
			$('td[data-list="branch"]').each(function (i) {
				map_marker[i] = {
					lat	: $(this).attr('data-lat'),
					lng	: $(this).attr('data-lng'),
					name: $(this).attr('data-name')
				}
			});			
			// branch details tab
			GoogleMapsApi.init('branchLocatorMap', {markers : map_marker});	
		} else {
                    
			// branch details tab
			GoogleMapsApi.init('branchLocatorMap');
		}
	}
	
    // show the add branch map when the add section is visible.
    $('.nav-tabs a').on('shown.bs.tab', function(event){
    if($('#brand-add-branch').is(':visible')) {
    var mapid = 'addBranchMap';
    initMap(mapid);
    }
    });
        
        
	// DataTable initiation
	oDataTable.init($('#branchListDataTable'));
	oDataTable.init($('#accountListDataTable'));
	oDataTable.init($('#brand-zonetable'));
	oDataTable.init($('#settings-datatable'));
	
	//Instantiate brand packages
	var brandpackages = new packageClass('brand','new',packageBrandId,apiKey,packageUrl);
	
	//Packages JQUERY
	
	//Package Checkbox on click - add feature to features object
    $(document).on("change",".packagecheckbox",function() {
    	brandpackages.editcurrentGlobalPackage($(this).data('id'));
    });
	//Save brand packages
	 $('#savebrandaddons').on('click', function(event){
	    event.preventDefault();
	    brandpackages.saveIndBrandPackage();
	 });
	//Cancel brand packages
	 $('#cancelbrandaddons').on('click', function(event){
	    event.preventDefault();
//	    $("#brandaddonform .removefromdom").remove();
//	    brandpackages.createBrandPackageForm();
	    location.reload();
	 });

	 $('#packageselect option').eq(1).prop('selected', true);
	 //$("#packageselect").val($("#packageselect option:first").val()); 
});


$(document).on('click', '#add-zone', function (e) {
	
	e.preventDefault();
	
	var id = $(this).attr('data-id');
	$('[data-toggle="zone-content"]').hide();
	$('#'+id).show();
	
	if (id === "zonelist") {
		$(this).find('i').removeClass('fa-th-list').addClass('fa-plus');
		$(this).find('span').text('Add Zone');
		$(this).attr('data-id', "addzone");
		$(this).parent('h4').find('strong').text('List of Zones');
	} else {
		$(this).find('i').removeClass('fa-plus').addClass('fa-th-list');
		$(this).find('span').text('Show Zones');
		$(this).attr('data-id', "zonelist");
		$(this).parent('h4').find('strong').text('Add Zone');
	}
});

$(document).on('click', '#add-settings', function (e) {
	
	e.preventDefault();
	
	var id = $(this).attr('data-id');
	$('[data-toggle="setting-content"]').hide();
	$('#'+id).show();
	
	if (id === "settingslist") {
		$(this).find('i').removeClass('fa-th-list').addClass('fa-plus');
		$(this).find('span').text('Add Settings');
		$(this).attr('data-id', "addsettings");
		$(this).parent('h4').find('strong').text('Settings');
	} else {
		$(this).find('i').removeClass('fa-plus').addClass('fa-th-list');
		$(this).find('span').text('Show Settings');
		$(this).attr('data-id', "settingslist");
		$(this).parent('h4').find('strong').text('Add Settings');
	}
});