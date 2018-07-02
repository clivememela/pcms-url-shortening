/* *********************************************************************************
 * File for all JavaScript functions that are used throughout the project
 * 
 * File         : Global Js functions file
 * Created on   : Aug 18, 2016
 * Author       : Rodney
 * *********************************************************************************/

/* 
 * Ajax generic function
 * @param 	{string} 	url 			: request url
 * @param 	{string} 	type 			: request type ('get' or 'post')
 * @param 	{string} 	data 			: multi-type
 * @param 	{string} 	contentType 
 * @param 	{string} 	successCallback : A function to be called if the request succeeds.
 * @param 	{string} 	errorCallback	: A function to be called if the request fails.
 * @return  {void}
 **/
var ajax = function (url, successCallback, errorCallback, data, type, contentType) {
	
	var options = {};

	options.contentType = (contentType !== undefined) 	? contentType 	: '';
	options.url 		= (url !== undefined)			? url 			: ' ';
	options.data 		= (data !== undefined)			? data 			: { };
	options.type 		= (type !== undefined)			? type 			: 'GET';
	options.processData = false;
	options.dataType 	= 'TEXT';
	options.cache 		= false;
	options.beforeSend 	= function () {
		// if the global ajax loader exists on the page, show it otherwise do nothing
		if ($('.global-ajax-loader') !== undefined) {
			var globalLoader = $('.global-ajax-loader');
			globalLoader.show();
		}
	};
	options.success 	= function (res) {
		// if success callback function is defined call it, otherwise do the generic function
		// close the global ajax loader if it exists on the page
		if (successCallback !== undefined && typeof successCallback === "function") {
			successCallback(res);
		} else {
			// do some success code here...
		}
	};
	options.error 		= function (res) {
		// if error callback function is defined call it, otherwise do the generic function
		// close the global ajax loader if it exists on the page
		// show error response
		if (errorCallback !== undefined && typeof errorCallback === "function") {
			errorCallback(res);
		} else {
			// do some error code here...
		}
	}
	
	// do AJAX call
	var request = $.ajax(options);
	
	// if success callback function is defined call it, otherwise do the generic function
	// close the global ajax loader if it exists on the page
	if (successCallback !== undefined) {
		request.done(successCallback);
	} else {
		request.done(function (response) {
			// do some success code here...
		});
	}
	
	// if error callback function is defined call it, otherwise do the generic function
	// close the global ajax loader if it exists on the page
	// show error response
	if (errorCallback !== undefined) {
		request.done(errorCallback);
	} else {
		request.done(function (response) {
			// do some error code here...
		});
	}
};


/* 
 * Check if element has the specified attribute
 * @param 	{string} 	attribute name
 * @return  {boolean}
 **/
$.fn.hasAttr = function(name) {  
	return this.attr(name) !== undefined;
};