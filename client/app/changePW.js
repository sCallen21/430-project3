const handlePWChange = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'},350);
  
  if($("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#changePWForm").attr("action"), $("#changePWForm").serialize(), function(result, status, xhr) {
    $("#domoMessage").animate({width:'hide'},350);
    const messageObj = JSON.parse(xhr.responseText);

    handleError(messageObj.message);
  });
  
  return false;
};

const ChangePWForm = (props) => {
  return(
    <form id="changePWForm"
          onSubmit={handlePWChange}
          name="changePWForm"
          action="/changePW"
          method="POST"
          className="mainForm">
      <label for="pass">New Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password"/>
      <label for="pass2">New Password: </label>
      <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="formSubmit" type="submit" value="Change Password" />
    </form>
  );
};

const createChangePWWindow = (csrf) => {
  ReactDOM.render(
    <ChangePWForm csrf={csrf}/>, document.querySelector("#gameGoesHere")
  );
  
  ReactDOM.render(
    <Blank/>, document.querySelector("#saveForm")
  );
};