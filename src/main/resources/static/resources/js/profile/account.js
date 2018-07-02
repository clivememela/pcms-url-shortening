$(document).ready(function () {
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
	ctable = oDataTable.init($('[data-content="user-list"]>table'), filterOptions);
});
//Strip white space from email
$(document).on('blur', '#email', function() {
var emailAd = $(this).val();
$(this).val(emailAd.replace(/ /g,''));
});