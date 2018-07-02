/* 
 * Page level JavaScript. This is only specific to isp/gateway/details.html
 * 
 * File         : Wifire Custom JS File * 
 * Created on   : Aug 18, 2016
 * Author       : Rodney
 **/

$(document).ready(function() {
	var editor  	= aceEditor.init("editor");
	var editor2 	= aceEditor.init("editor2");
	var templateId 	= 0;
	
	oDataTable.init($('#config-datatable'));
});

$(document).on('click', 'a[data-toggle="show"]', function (e) {
	e.preventDefault();
	showConfigModal($(this).attr('data-config-id'));
});

function showConfigModal(configId) {
	var editor2 		= aceEditor.init("editor2");
    var activeConfigId 	= configId;
    var template 		= $("#hconfig_" + configId).val();
    editor2.setValue(template);
    $('#configModal').modal('show');
}