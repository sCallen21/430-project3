//clears one of the react components on the screen by replacing the content with an empty div
const Blank = () => {
  return(
    <div></div>
  );
};

const setup = (csrf) => {
  const logoutButton = document.querySelector("#logoutButton");
  const gameButton = document.querySelector("#gameButton");
  const changePWButton = document.querySelector("#changePWButton");
  const guideButton = document.querySelector("#guideButton");
  const leaderboardButton = document.querySelector("#leaderboardButton");
  
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    createlogoutWindow(csrf);
    return false;
  });
  
  gameButton.addEventListener("click", (e) => {
    e.preventDefault();
    createGameWindow(csrf);
    return false;
  });
  
  changePWButton.addEventListener("click", (e) => {
    e.preventDefault();
    createchangePWWindow(csrf);
    return false;
  });
  
  guideButton.addEventListener("click", (e) => {
    e.preventDefault();
    createGuideWindow(csrf);
    return false;
  });
  
  leaderboardButton.addEventListener("click", (e) => {
    e.preventDefault();
    createleaderboardWindow(csrf);
    return false;
  });
  
  createGameWindow(csrf); //default view
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});