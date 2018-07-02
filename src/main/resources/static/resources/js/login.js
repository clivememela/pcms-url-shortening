$(document).on('focus', '.input-field input[type="text"], .input-field input[type="password"], .input-field input[type="email"]', function() {
    $( this ).closest('.input-field').find('i').addClass('active');
    $( this ).closest('.input-field').find('label').addClass('active');
});

$(document).on('blur change input', '.input-field input[type="text"], .input-field input[type="password"], .input-field input[type="email"]', function() {

    if ($( this ).val().length == 0) {
        $( this ).closest('.input-field').find('i').removeClass('active');
        $( this ).closest('.input-field').find('label').removeClass('active');
        
        if ($('#password-input').val().length == 0) {
            $('label[for="password-input"]').removeClass('active');
        }
    } else {
    
        $( this ).closest('.input-field').find('i').addClass('active');
        $( this ).closest('.input-field').find('label').addClass('active');
        $('label[for="password-input"]').addClass('active');
    }

});

$(document).ready(function() {
    
    /**********************************************************
     * Trigger change event (Browser Auto-Fill):
     * - if password / username input has a value (not empty)
     **********************************************************/
    
    var usernameHasValue = $("#username-input").val().length > 0;           //Normal
    var passwordHasValue = $("#password-input").val().length > 0;           //Normal

    // password
    if(!passwordHasValue){
        passwordHasValue = $("#password-input:-webkit-autofill").length > 0;//Chrome
    }
    if (passwordHasValue) {
        $('#password-input').trigger('change');
    }

    // username
    if(!usernameHasValue){
        usernameHasValue = $("#username-input:-webkit-autofill").length > 0;//Chrome
    }
    if (usernameHasValue) {
        $('#username-input').trigger('change');
    }
    
});