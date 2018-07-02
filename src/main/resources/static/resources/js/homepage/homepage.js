// the following functions are used for the home page search..
//The array holds possible search matches as well as the element id that neeeds to be shown when clicked
var optionsarray = [
    {"searchterm": "Profile", "ID": "Profile"},
    {"searchterm": "how to edit my profile", "ID": "Profile"},
    {"searchterm": "My account", "ID": "My account"},
    {"searchterm": "Accounts", "ID": "Accounts"},
    {"searchterm": "Brands", "ID": "Brands"},
    {"searchterm": "Wireless", "ID": "Wireless"},
    {"searchterm": "Gateways", "ID": "Gateways"},
    {"searchterm": "Packages", "ID": "Packages"},
    {"searchterm": "Contact us", "ID": "Contact us"},
];

//The search string function accepts the text sent by the user input, it then checks the string against 
//the search array, if a match is found it is added to an output html string which is loaded into a search container div.
function searchstring(text) {
    text = text.toLowerCase();
    var outputoptions = "";
    for (var t = 0; t < optionsarray.length; t++) {
        if (text == "") {
            $("#search-results").html(text);
            return;
        }
        var smalltext = optionsarray[t].searchterm.toLowerCase();
        if (smalltext.startsWith(text)) {
            outputoptions += '<div data-id="' + optionsarray[t].ID + '" class="inner-search-results">';
            outputoptions += optionsarray[t].searchterm;
            outputoptions += '</div>';
        }
    }
    $("#search-results").html(outputoptions);
}

//the showresults function takes the id passed from the user onclick event on the search div.
//the function then shows the selected option in the home page.
function showresults(resultstext) {
    var newStr = resultstext.replace(/\s+/g, '');
    newStr = newStr.toLowerCase();
    var textresults = '#' + newStr + "click";
    var textresults2 = '#' + newStr;

    if ($(textresults2).length == 0) {
        $("#search-results").html("");
        $("#home-search").val("");
        return;
    }
    if ($(textresults2).is(":visible")) {
        return;
    }
    $('.panel-collapse').removeClass('in');
    $(textresults).trigger('click');
    $("#search-results").html("");
    $("#home-search").val("");
}

//The onclick event sends the data-id of the selection and send it to the showresults function
$(document).on("click", ".inner-search-results", function () {
    showresults($(this).data("id"));
});

$(document).ready(function () {
// the key up event is used to get the current user input and send it to the searchstring function
    $("#home-search").keyup(function () {
        searchstring($(this).val());
    });
//When a user opens or closes a view option the arrow toggles up and down.
    $('.show-list-text').click(function () {
        $(this).find("i").toggleClass("fa-arrow-up fa-arrow-down");
    });
});