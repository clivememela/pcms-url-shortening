$(document).ready(function () {
	var packages = new packageClass('package','new','',apiKey,packageUrl);
	var packagesedit = new packageClass('package','edit','',apiKey,packageUrl);

    //Package JQuery
    $('.nav-tabs a').on('shown.bs.tab', function(event){    	
    //Hide the error / success messages if shown.	
    $('#validationResultsList').html("");
	$('#validation-results').hide();
	$('#response-success').hide();
		
    if(!$('#package-edit').is(':visible'))
    {
    	$('#package-edit-tab').hide();
    }
    
    if($('#package-add-to-brand').is(':visible'))
    {
    	packages.createMultipleBrandTable();
    }
    });
    
    //Checkbox on click
    $(document).on("change",".packagecheckbox",function() {
    	if($(this).closest('form')[0].id.indexOf("new") >= 0)
    	{
    		packages.editcurrentGlobalPackage($(this).data('id'));
    	}
    	else if($(this).closest('form')[0].id.indexOf("edit") >= 0)
    	{
    		packagesedit.editcurrentGlobalPackage($(this).data('id'));
    	}
    });
    
    //Checkbox on click
    $(document).on("click",".editpackageclick",function() {
    	packagesedit.createEditPackageForm($(this).data('id'));
    });
    
    //Blur event for edit package name and description
    $(document).on("blur","#editpackageform #packageName,#editpackageform #packageDescription",function() {
    	if(packagesedit.validateHasTriedSave)
    	{
    		packagesedit.formValidation();
    	}
    });
    
    //Blur event for add package name and description
    $(document).on("blur","#newpackageform #packageName,#newpackageform #packageDescription",function() {
    	if(packages.validateHasTriedSave)
    	{
    		packages.formValidation();
    	}
    });
    
    //Checkbox click event - add brand id to array
    $(document).on("change",".check-box-multiple-brands",function() {
    	 if (this.checked) 
    	 {
    		 packages.addToBrandsArray($(this).data('id'));
    	 }
    	 else
    	 {
    		 packages.removeFromBrandsArray($(this).data('id'));
    	 }
    });
    
    //Select change event - add brand id to array
    $(document).on("change","#all-packages-select",function() {
    	var packageIdToSend = $('#all-packages-select option:selected').attr('data-id');
    	packages.setMultipleBrandsPackageId(packageIdToSend);
    });
    
    //Save new package
    $('#savenewpackage').on('click', function(event){
    	event.preventDefault();
    	packages.saveNewPackage();	
    });
    
    //cancel adding new package
    $('#cancelnewpackage').on('click', function(event){
    	event.preventDefault();
    	$("#package-add .removefromdom").remove();
    	packages.clearError();
    	packages.createNewPackageForm();   	
    });
    
    //Save edit package
    $('#saveeditpackage').on('click', function(event){
    	event.preventDefault();
    	packagesedit.saveEditPackage();
    });
    
    //Cancel Edit package
    $('#canceleditpackage').on('click', function(event){
    	event.preventDefault();
    	$('.nav-tabs a[href="#package-list"]').tab('show');
		$('#package-edit-tab').hide();
		packagesedit.clearError();
    });
    
    //save multiple brands
    $('#savemultiplebrands').on('click', function(event){
    	event.preventDefault();
    	packages.saveMultipleBrands();
    });
    
    //Cancel multiple brands
    $('#cancelmultiplebrands').on('click', function(event){
    	event.preventDefault();
    	packages.clearError();
    	packages.createMultipleBrandTable();
    });
    
});







