//clears one of the react components on the screen by replacing the content with an empty div
const Blank = () => {
  return(
    <div></div>
  );
};

const setup = (csrf) => {
  const gameButton = document.querySelector("#gameButton");
  const changePWButton = document.querySelector("#changePWButton");
  const guideButton = document.querySelector("#guideButton");
  const leaderboardButton = document.querySelector("#leaderboardButton");
  const marketButton = document.querySelector("#marketButton");
  const designButton = document.querySelector("#designButton");
  
  gameButton.addEventListener("click", (e) => {
    e.preventDefault();
    createGameWindow(csrf);
    return false;
  });
  
  changePWButton.addEventListener("click", (e) => {
    e.preventDefault();
    createChangePWWindow(csrf);
    return false;
  });
  
  guideButton.addEventListener("click", (e) => {
    e.preventDefault();
    createGuideWindow(csrf);
    return false;
  });
  
  leaderboardButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLeaderboardWindow(csrf);
    return false;
  });
  
  marketButton.addEventListener("click", (e) => {
    e.preventDefault();
    createMarketWindow(csrf);
    return false;
  });
  
  designButton.addEventListener("click", (e) => {
    e.preventDefault();
    createDesignWindow(csrf);
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