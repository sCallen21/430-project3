'use strict';

var saveGame = function saveGame(e) {
  e.preventDefault();

  var data = 'id=' + document.getElementById('godID').getAttribute("value") + '&pps=' + document.getElementById('ppsE').textContent + '&totalPraise=' + document.getElementById('tpE').textContent + '&fish=' + document.getElementById('fishE').textContent + '&shogs=' + document.getElementById('shogE').textContent + '&deepones=' + document.getElementById('deepE').textContent + '&starspawn=' + document.getElementById('starE').textContent + '&things=' + document.getElementById('thingE').textContent + '&buff1=' + document.getElementById('buff1E').textContent + '&buff2=' + document.getElementById('buff2E').textContent + '&buff3=' + document.getElementById('buff3E').textContent + '&_csrf=' + document.getElementById('csrfToken').getAttribute("value");

  sendAjax("POST", "/gameSave", data, function (result, status, xhr) {
    var messageObj = JSON.parse(xhr.responseText);

    handleError(messageObj.message);
  });

  return false;
};

var GameContent = function GameContent(props) {
  return React.createElement(
    'section',
    { id: 'im just here to make jsx happy' },
    React.createElement(
      'section',
      { className: 'hide' },
      React.createElement('img', { id: 'bgImg', src: '/assets/img/background.png', alt: 'bg' }),
      React.createElement('img', { id: 'fishImg', src: '/assets/img/fish.png', alt: 'fish' }),
      React.createElement('img', { id: 'shogImg', src: '/assets/img/shoggoth.png', alt: 'shog' }),
      React.createElement('img', { id: 'deeponeImg', src: '/assets/img/deepone.png', alt: 'deep' }),
      React.createElement('img', { id: 'spawnImg', src: '/assets/img/starspawn.png', alt: 'star' }),
      React.createElement('img', { id: 'thingImg', src: '/assets/img/elderthing.png', alt: 'thing' }),
      React.createElement('img', { id: 'statueImg', src: '/assets/img/statue.png', alt: 'statue' }),
      React.createElement(
        'p',
        { className: 'lunch' },
        'Lunchtime'
      ),
      React.createElement('p', { id: 'ppsE' }),
      React.createElement('p', { id: 'tpE' }),
      React.createElement('p', { id: 'fishE' }),
      React.createElement('p', { id: 'shogE' }),
      React.createElement('p', { id: 'deepE' }),
      React.createElement('p', { id: 'starE' }),
      React.createElement('p', { id: 'thingE' }),
      React.createElement('p', { id: 'buff1E' }),
      React.createElement('p', { id: 'buff2E' }),
      React.createElement('p', { id: 'buff3E' })
    ),
    React.createElement(
      'section',
      { id: 'gameContent' },
      React.createElement(
        'div',
        { className: 'gameContent' },
        React.createElement(
          'div',
          { className: 'god' },
          React.createElement(
            'h3',
            { className: 'godName' },
            'Welcome back ',
            props.god[0].name
          ),
          React.createElement('input', { id: 'godID', type: 'hidden', value: props.god[0]._id })
        )
      ),
      React.createElement(
        'canvas',
        { id: 'myCanvas', width: '590', height: '240' },
        'Support Canvas or perish'
      )
    )
  );
};

var SaveForm = function SaveForm(props) {
  return React.createElement(
    'form',
    { id: 'saveForm',
      onSubmit: saveGame,
      name: 'saveForm',
      action: '/gameSave',
      method: 'POST',
      className: 'mainForm' },
    React.createElement('input', { id: 'csrfToken', type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Save' })
  );
};

var loadGod = function loadGod() {
  sendAjax('GET', '/getGod', null, function (data) {
    ReactDOM.render(React.createElement(GameContent, { god: data.god }), document.querySelector("#gameGoesHere"));
    init();
  });
};

var createGameWindow = function createGameWindow(csrf) {
  ReactDOM.render(React.createElement(SaveForm, { csrf: csrf }), document.querySelector("#saveForm"));
  loadGod();
};
"use strict";

//clears one of the react components on the screen by replacing the content with an empty div
var Blank = function Blank() {
  return React.createElement("div", null);
};

var setup = function setup(csrf) {
  var logoutButton = document.querySelector("#logoutButton");
  var gameButton = document.querySelector("#gameButton");
  var changePWButton = document.querySelector("#changePWButton");
  var guideButton = document.querySelector("#guideButton");
  var leaderboardButton = document.querySelector("#leaderboardButton");

  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    createlogoutWindow(csrf);
    return false;
  });

  gameButton.addEventListener("click", function (e) {
    e.preventDefault();
    createGameWindow(csrf);
    return false;
  });

  changePWButton.addEventListener("click", function (e) {
    e.preventDefault();
    createchangePWWindow(csrf);
    return false;
  });

  guideButton.addEventListener("click", function (e) {
    e.preventDefault();
    createGuideWindow(csrf);
    return false;
  });

  leaderboardButton.addEventListener("click", function (e) {
    e.preventDefault();
    createleaderboardWindow(csrf);
    return false;
  });

  createGameWindow(csrf); //default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var GuideWindow = function GuideWindow(props) {
  return React.createElement(
    "div",
    { id: "guide" },
    React.createElement(
      "h2",
      null,
      "Guide"
    ),
    React.createElement(
      "p",
      null,
      "You are an infant elder god, come to this plane from the depths of space. In order to gain influence over your peers and the feeble minded denizens of the Earth, you must accumulate praise. To do this you must gain worshippers."
    ),
    React.createElement(
      "p",
      null,
      "Click on the statue of your Earthly avatar to accrue praise. Utilize this praise to influence dark beings to do your bidding and accumulate praise over time without clicking."
    ),
    React.createElement(
      "h3",
      null,
      "Cultists:"
    ),
    React.createElement(
      "p",
      null,
      "Cultists are the most pathetic form of worshipper. They cost 15 praise to influence and generate 0.1 praise per second. Transformed by your dark powers, these cultists used to be human but now are mindless beasts."
    ),
    React.createElement(
      "h3",
      null,
      "Shoggoths:"
    ),
    React.createElement(
      "p",
      null,
      "Shoggoths are the lowliest servant race of star-beings. They cost 100 praise to influence and generate 1 praise per second. Each shoggoth is specifically created to serve a higher being, an amalgamate of flesh and fear."
    ),
    React.createElement(
      "h3",
      null,
      "Deep Ones:"
    ),
    React.createElement(
      "p",
      null,
      "Deep Ones are a higher class of servant race. They cost 1,100 praise to influence and generate 8 praise per second. Deep Ones lay slumbering in the depths of the cold, dark ocean until they are needed, when they emerge and wreak their havoc."
    ),
    React.createElement(
      "h3",
      null,
      "Starspawn:"
    ),
    React.createElement(
      "p",
      null,
      "Starspawn are immigrants from the stars, come to observe your growing influence. They cost 12,000 praise to influence and generate 47 praise per second. Having starspawn in your ranks will prove very helpful."
    ),
    React.createElement(
      "h3",
      null,
      "Elder Things:"
    ),
    React.createElement(
      "p",
      null,
      "Elder Things are part of the high court of ancient beings. They cost 130,000 praise to influence and generate 260 praise per second. To have an elder thing in your thrall is quite an achievement."
    ),
    React.createElement(
      "h3",
      null,
      "Dagon's Blessing:"
    ),
    React.createElement(
      "p",
      null,
      "A blessing from the being Dagon itself, this blessing costs 200,000 praise per teir and will increase your total praise per second."
    ),
    React.createElement(
      "h3",
      null,
      "Cthulhu's Wrath:"
    ),
    React.createElement(
      "p",
      null,
      "Wrath of the undead monstrosity Cthulhu. Your thrall will shudder in fear and cost less praise to influence with each teir of this blessing you accrue. This blessing costs 200,000 praise per teir."
    ),
    React.createElement(
      "h3",
      null,
      "Nyarlathotep's Curse:"
    ),
    React.createElement(
      "p",
      null,
      "Upon gaining 1,000,000 praise you may incur the Curse of the Crawling Chaos himself. This blessing will permanently increase the rate at which you accrue praise. The fabric of time will bend, causing praise to be added much more quickly than every second."
    )
  );
};

var createGuideWindow = function createGuideWindow(csrf) {
  ReactDOM.render(React.createElement(GuideWindow, { csrf: csrf }), document.querySelector("#gameGoesHere"));

  ReactDOM.render(React.createElement(Blank, null), document.querySelector("#saveForm"));
};
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, callback) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: callback,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
