//## @Author
//## Jason

//Preview File Not working in class..
function previewFile() {
    var preview = document.getElementById('uploadimagewhite');
    var file = document.getElementById('preview-logo-input').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        var base64string = reader.result;
        preview.src = base64string;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

//Helper.SetElement html
function setelementhtml(html, element) {
    $(element).html(html);
}

//Helper.Display error message
function displayerror(senterrorstring) {
	 $('#success').hide();
	$('#validationResultsList').show();
    $('#validation-results').show();
   
    setelementhtml(senterrorstring, '#validationResultsList');
    return;
}

//Helper close error box
function closeerror() {
	$('#success').hide();
	$('#validationResultsList').show();
    $('#validation-results').hide();
    setelementhtml("", '#validationResultsList');
    return;
}

function generateUuidChecked(){
	var isChecked = document.getElementById("generateUuid").checked;
		
	if(isChecked){
		$("uuidInput").hide();
		disableUuidInput()
		var d = document.getElementById("uuid");
		d.className = "";
		return true;
	}else{
		enableUuidInput()
		return false;
	}
	return;
}
function provideUuidChecked(){
	var isChecked = document.getElementById("provideUuid").checked;
		
	if(isChecked){
		$("uuidInput").show();
		enableUuidInput()
		var d = document.getElementById("uuid");
		d.className += "required";
		return true;
	}else{
		return false;
	}
	return;
}

function enableUuidInput() {
	document.getElementById('uuidText').disabled = false;
    document.getElementById('uuidText').enabled = true;
}

function disableUuidInput(){
	document.getElementById('uuidText').disabled = true;
}

//Helper.Calculate.file.Size
function calculateFileSize(element, maxsize) {
    var checkfile = document.getElementById(element).files[0];
    var filesize = checkfile.size;
    if (filesize <= maxsize) {
        return true;
    } else {
        $('#' + element).val("");
        return false;
    }
}

$(document).ready(function () {

	$(document).on("submit", "form#sitemapform", function (event) {
		
	 var urlSet = document.getElementById('valueInput').value =document.getElementById('logodiv').getElementsByTagName('img')[0].src
	
		var preview = document.getElementById('uploadimagewhite');		
		   
		   if(document.getElementById('preview-logo-input').files[0] != undefined){
			   $("form#sitemapform").submit();
		   }else{
			   if(getUrl() != null){				  
				  
					$("form#sitemapform").submit(); 
				}else{
					displayerror('<li>Please select an image before submitting.</li>');
					event.preventDefault();
				}
		   }
		   return false;
		});
	
	$(document).on('change', '#preview-logo-input', function () {
		closeerror();
		if (!calculateFileSize('preview-logo-input', 3072000)) {
			displayerror('<li>Site map image can not exceed 3 megabytes.</li>');
        return;
    }
		
        previewFile();
});
	
if ($('#branchLocatorMap2').length > 0) {
    var map_marker = [];
    map_marker[0] = {
    lat	: $('#lat').val(),
    lng	: $('#lng').val(),
    name: $('#branchName').val()
    } 
    GoogleMapsApi.init('branchLocatorMap2', {markers : map_marker});	
    }
      
    // loads the edit map when the edit section is visible. 
    $('.nav-tabs a').on('shown.bs.tab', function(event){
    if($('#branch-edit').is(':visible')) {
	    var mapid = 'googleMapEdit';
	    initMap(mapid);
	    $('#groupEditPane').hide();
    }else if(!$('#branch-add-gateway-group-edit').is(':visible'))
    {
		$('#groupEditPane').hide();
    	}
	    $('#errorText').html("");		            		
	    $('#holdErrorList').html("");
		$('#errorGatewayGroup').hide();
    });
    
			
    oDataTable.init($('#apLinkDataTable'));
    oDataTable.init($('#branchGatewayTable'));
});