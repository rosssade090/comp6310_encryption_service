

$(document).ready(function() {
    //Clear cookies on startup
    deleteCookie("secret_key");
    deleteCookie("encrypted_message");

    $("#chat-btn").show();


    //Check if secret key exists
    checkIfSecretKeyExists("secret_key");

   


});

//Open the chat box
function openChat() {  

    getMessages();

    $("#chat-box").slideDown();
    $("#chat-btn").hide();
    
    var func = "generate_key.py"
    //Generate secret key
    //var secret_key = generateKey(32);
    var secret_key;
    console.log('Key is coming');

    $.ajax({
        type: 'GET',
        url: "test.php",
        data: {"func": func}, //passing some input here
        dataType: "text",
        success: function(response){
           secret_key = response;
           setCookie("secret_key", secret_key, 10);

           console.log(response);
        },
        error: function(e){
            console.log(e);
        }
    }).done(function(data){
        console.log(data);
    });

    //Store secret key in cookie
    //setCookie("secret_key", secret_key, 10);
}

//Close the chat box
function closeChat() {
    $("#chat-box").slideUp();
    $("#chat-btn").show();
}

//Set cookie
function setCookie(cookie_name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    var expires = "expires="+ date.toUTCString();
    document.cookie = cookie_name + "=" + value  +";" + expires + ";path=/";
}




//Get stored cookie
function getCookie(cookie_name) {
    var name = cookie_name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookie_array = decodedCookie.split(';');

    for(var i = 0; i < cookie_array.length; i++) {
      var cookie = cookie_array[i];

      while(cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }

      if(cookie.indexOf(name) == 0) {
          console.log('cookie');
        return cookie.substring(name.length, cookie.length);
        //return cookie;

      }
    }

    return "";
}

//Remove cookie
function deleteCookie(cookie_name) {
    document.cookie = cookie_name+'=; expires = Thu, 01 Jan 1970 00:00:00 UTC;path=/';  
}

//Generate the key for the encryption
function generateKey(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var key = "";

    for(var i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return key;
}

//Send message between browser tabs
function sendMessage(event) {
    event.preventDefault();

    //Get secret key
    var secret_key = getCookie("secret_key");

    //Get message value from form
    var message = $("#message").val();


    var func = "encrypt.py";
    var passVar = message;
    var encrypted_message;

    $.ajax({
        type: 'GET',
        url: "test.php",
        data: {"func": func, "passVar": passVar}, //passing some input here
        dataType: "json",
        contentType: "application/json",
        success: function(response){
           encrypted_message  = response;
           setCookie("encrypted_message", encrypted_message["encrypted"], 10); 
           setCookie("cipher", encrypted_message["cipher"], 10);


           console.log(response);
        },
        error: function(e){
            console.log(e);
        }
    }).done(function(data){
        $("#message").val(encrypted_message["encrypted"]);

        console.log(data);
    });



    var cookie = getCookie("encrypted_message");
    console.log(cookie);
   
}





function getMessages() {
    
        var encrypted_message = getCookie("encrypted_message");
        var cipher = getCookie("cipher");
        if(encrypted_message != null || encrypted_message == "") {
            var secret_key = getCookie("secret_key");
            if(secret_key != null || secret_key == "") {
    
                console.log('access')


                var func = "decrypt.py";
                var encrypted_message = encrypted_message;
                console.log(encrypted_message);
                var decrypted_message;
                var cipher = cipher;
            
                console.log(cipher);
            
                $.ajax({
                    type: 'GET',
                    url: "test.php",
                    data: {"func": func, "passVar": encrypted_message, "cipher": cipher}, //passing some input here
                    dataType: "text",
                    success: function(response){
                       decrypted_message  = response;
                       //$("#message-log").val(decrypted_message);

                       console.log(response);
                    },
                    error: function(e){
                        console.log(e);
                    }
                }).done(function(data){
                    $("#message").val(decrypted_message);
            
                    console.log(data);
                });
            






    
                
            }

         
        }
    
}





//Check if the secret key exists and open chat box
function checkIfSecretKeyExists(secret_key) {
    var secretKeyCheck = setInterval(startCheck, 500, secret_key);

    function startCheck(key) {
        var secret_key = getCookie(key);

        //Key doesn't exists
        if(secret_key == null || secret_key == "") {
            stopCheck();
        }

        //Exists
        else {
            $("#chat-box").slideDown();
            $("#chat-btn").hide();
            stopCheck();
        }
    }

    function stopCheck() {
        clearInterval(secretKeyCheck);
    }
}

//To do for Group 2 - create message encryption algorithm
function encrypt(key, message) {
    var func = "encrypt.py";
    var passVar = message;
    var encrypted_message;

    $.ajax({
        type: 'GET',
        url: "test.php",
        data: {"func": func, "passVar": passVar}, //passing some input here
        dataType: "json",
        contentType: "application/json",
        success: function(response){
           encrypted_message  = response;


           console.log(response);
        },
        error: function(e){
            console.log(e);
        }
    }).done(function(data){
        $("#message").val(encrypted_message["encrypted"]);

        console.log(data);
    });
    return encrypted_message;
}

//To do for Group 2 - create message decryption algorithm
function decrypt(encrypted_message, cipher) {

    /* create function here */
    var func = "decrypt.py";
    var passVar = encrypted_message;
    console.log(passVar);
    var decrypted_message;
    var cipher = cipher;

    console.log(passVar);
    console.log(cipher);

    $.ajax({
        type: 'GET',
        url: "test.php",
        data: {"func": func, "passVar": passVar, "cipher": cipher}, //passing some input here
        dataType: "text",
        success: function(response){
           decrypted_message  = response;
           console.log(response);
        },
        error: function(e){
            console.log(e);
        }
    }).done(function(data){
        $("#message").val(decrypted_message);

        console.log(data);
    });



    return decrypted_message;     //Group 2 - uncomment this line

}



