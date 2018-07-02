

 

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
	ctable = oDataTable.init($('[data-content="model-list"]>table'), filterOptions);
});


