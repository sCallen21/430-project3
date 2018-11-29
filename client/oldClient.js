
const handleError = (message) => {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({width:'toggle'},350);
}

const sendAjax = (action, data, callback) => { //make a callback attribute here, and pass it in whenver using sendAjax, set success to callback
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: callback,
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
}

$(document).ready(() => {
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '' || $("#name").val() == '') {
      handleError("All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize(), (result, status, xhr) => {
      $("#domoMessage").animate({width:'hide'},350);
      
      window.location = result.redirect;
    });

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '') {
      handleError("Username or password is empty");
      return false;
    }
    
    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize(), (result, status, xhr) => {
      $("#domoMessage").animate({width:'hide'},350);
      
      window.location = result.redirect;
    });

    return false;
  });
  
  $("#changePWForm").on("submit", (e) => {
    e.preventDefault();
    $("#domoMessage").animate({width:'hide'},350);

    if($("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("Username or password is empty");
      return false;
    }
    
    sendAjax($("#changePWForm").attr("action"), $("#changePWForm").serialize(), (result, status, xhr) => {
      $("#domoMessage").animate({width:'hide'},350);
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.message);
    });

    return false;
  });
  
  $("#saveForm").on("submit", (e) => {
    e.preventDefault();
     
    const data = `id=${document.getElementById('godID').getAttribute("value")}&pps=${document.getElementById('ppsE').textContent}&totalPraise=${document.getElementById('tpE').textContent}&fish=${document.getElementById('fishE').textContent}&shogs=${document.getElementById('shogE').textContent}&deepones=${document.getElementById('deepE').textContent}&starspawn=${document.getElementById('starE').textContent}&things=${document.getElementById('thingE').textContent}&buff1=${document.getElementById('buff1E').textContent}&buff2=${document.getElementById('buff2E').textContent}&buff3=${document.getElementById('buff3E').textContent}&_csrf=${document.getElementById('csrfToken').getAttribute("value")}`;
    
    sendAjax($("#saveForm").attr("action"), data, (result, status, xhr) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.message);
    });

    return false;
  });
});