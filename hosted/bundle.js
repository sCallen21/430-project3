"use strict";

var handlePWChange = function handlePWChange(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#changePWForm").attr("action"), $("#changePWForm").serialize(), function (result, status, xhr) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    var messageObj = JSON.parse(xhr.responseText);

    handleError(messageObj.message);
  });

  return false;
};

var ChangePWForm = function ChangePWForm(props) {
  return React.createElement(
    "form",
    { id: "changePWForm",
      onSubmit: handlePWChange,
      name: "changePWForm",
      action: "/changePW",
      method: "POST",
      className: "mainForm" },
    React.createElement(
      "label",
      { "for": "pass" },
      "New Password: "
    ),
    React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
    React.createElement(
      "label",
      { "for": "pass2" },
      "New Password: "
    ),
    React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Change Password" })
  );
};

var createChangePWWindow = function createChangePWWindow(csrf) {
  ReactDOM.render(React.createElement(ChangePWForm, { csrf: csrf }), document.querySelector("#gameGoesHere"));

  ReactDOM.render(React.createElement(Blank, null), document.querySelector("#saveForm"));
};
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
  var gameButton = document.querySelector("#gameButton");
  var changePWButton = document.querySelector("#changePWButton");
  var guideButton = document.querySelector("#guideButton");
  var leaderboardButton = document.querySelector("#leaderboardButton");
  var marketButton = document.querySelector("#marketButton");
  var designButton = document.querySelector("#designButton");

  gameButton.addEventListener("click", function (e) {
    e.preventDefault();
    createGameWindow(csrf);
    return false;
  });

  changePWButton.addEventListener("click", function (e) {
    e.preventDefault();
    createChangePWWindow(csrf);
    return false;
  });

  guideButton.addEventListener("click", function (e) {
    e.preventDefault();
    createGuideWindow(csrf);
    return false;
  });

  leaderboardButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLeaderboardWindow(csrf);
    return false;
  });

  marketButton.addEventListener("click", function (e) {
    e.preventDefault();
    createMarketWindow(csrf);
    return false;
  });

  designButton.addEventListener("click", function (e) {
    e.preventDefault();
    createDesignWindow(csrf);
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

var createDesignWindow = function createDesignWindow(csrf) {
  ReactDOM.render(React.createElement(DesignWindow, { csrf: csrf }), document.querySelector("#gameGoesHere"));

  ReactDOM.render(React.createElement(Blank, null), document.querySelector("#saveForm"));
};

var DesignWindow = function DesignWindow(props) {
  return React.createElement(
    "div",
    { id: "guide" },
    React.createElement(
      "h2",
      null,
      "Designing Cthulhu Clicker"
    ),
    React.createElement(
      "p",
      null,
      "Idle clicker games are an interesting phenomenon. They certainly aren't popular with everyone, but those that do enjoy them like steady progression and feeling that the rewards for progressing are worth the time they spend accumulating points. I kept these things in mind not only with the thematic and mechanical design of the game but also when brainstorming ways to extend this app into the future."
    ),
    React.createElement(
      "h3",
      null,
      "Thematic Design"
    ),
    React.createElement(
      "p",
      null,
      "From the beginning of the development process I knew I wanted to theme the game around the Cthulhu mythos. The idea that you are a fledgeling alien god trying to gain influence with humans seemed like a perfect setting to idle through accumulating points."
    ),
    React.createElement(
      "p",
      null,
      "The visual designs and descriptions I wrote in the guide embody the progression aspect of the idle game genre. At this stage in the app's design, gaining enough points to purchase a new tier of creature is its own reward. The reward of the \"unknown\" monsters becoming known reflects the themes of the cosmic horror genre as well. This isn't to say that is the only reward possible for this style of game."
    ),
    React.createElement(
      "h3",
      null,
      "Looking Forward"
    ),
    React.createElement(
      "p",
      null,
      "The first thing I would do if I were to extend this app, I would implement a feature for players to look forward to after accumulating enough points. My first and most major thought for this would be to create a battle system between players. Players could start matches between each other and the types of monsters they have purchased could provide different abilities for them to use. To accent the nature of idle games not holding their players full attentions, the battles would be turn based and each turn would wait to progress until each player made their move. The app could even notify each player if their turn is up. This battle system would add a lot more competition to the app on top of the leaderboard I already have implemented."
    ),
    React.createElement(
      "h3",
      null,
      "Marketability"
    ),
    React.createElement(
      "p",
      null,
      "This app has quite a lot of opportunity for marketing. There is plenty of real estate around the pages for unintrusive ads, and for playes who do not desire to simply wait for their points to accumulate, they can purchase different buffs from the marketplace to speed up their progress. If the battle system were to be implemented this could greatly expand the kinds of buffs players could purchase."
    )
  );
};

var createMarketWindow = function createMarketWindow(csrf) {
  ReactDOM.render(React.createElement(MarketWindow, { csrf: csrf }), document.querySelector("#gameGoesHere"));

  ReactDOM.render(React.createElement(Blank, null), document.querySelector("#saveForm"));
};

var MarketWindow = function MarketWindow(props) {
  return React.createElement(
    "div",
    { id: "guide" },
    React.createElement(
      "h2",
      null,
      "Market"
    ),
    React.createElement(
      "section",
      { className: "shopItem" },
      React.createElement(
        "span",
        { className: "shopName" },
        "2000 praise"
      ),
      React.createElement("br", null),
      React.createElement(
        "span",
        { className: "price" },
        "$1.99"
      )
    ),
    React.createElement(
      "section",
      { className: "shopItem" },
      React.createElement(
        "span",
        { className: "shopName" },
        "10000 praise"
      ),
      React.createElement("br", null),
      React.createElement(
        "span",
        { className: "price" },
        "$7.99"
      )
    ),
    React.createElement(
      "section",
      { className: "shopItem" },
      React.createElement(
        "span",
        { className: "shopName" },
        "50000 praise"
      ),
      React.createElement("br", null),
      React.createElement(
        "span",
        { className: "price" },
        "$19.99"
      )
    ),
    React.createElement(
      "section",
      { className: "shopItem" },
      React.createElement(
        "span",
        { className: "shopName" },
        "5 Elder Things"
      ),
      React.createElement("br", null),
      React.createElement(
        "span",
        { className: "price" },
        "$9.99"
      )
    ),
    React.createElement(
      "section",
      { className: "shopItem" },
      React.createElement(
        "span",
        { className: "shopName" },
        "1 hour of speedy worship"
      ),
      React.createElement("br", null),
      React.createElement(
        "span",
        { className: "price" },
        "$1.99"
      )
    ),
    React.createElement(
      "section",
      { className: "shopItem" },
      React.createElement(
        "span",
        { className: "shopName" },
        "5 hours of speedy worship"
      ),
      React.createElement("br", null),
      React.createElement(
        "span",
        { className: "price" },
        "$1.99"
      )
    ),
    React.createElement("section", { className: "spanner" })
  );
};

var createLeaderboardWindow = function createLeaderboardWindow(csrf) {
  ReactDOM.render(React.createElement(Blank, null), document.querySelector("#saveForm"));

  loadGodsFromServer();
};

var GodList = function GodList(props) {
  if (props.gods.length === 0) {
    return React.createElement(
      "div",
      { id: "godList" },
      React.createElement(
        "h3",
        { className: "empty" },
        "No Players Currently"
      )
    );
  }

  var godNodes = props.gods.map(function (god) {
    return React.createElement(
      "div",
      { className: "godEntry" },
      React.createElement(
        "p",
        { className: "godName" },
        React.createElement(
          "span",
          { className: "label" },
          "Name:"
        ),
        " ",
        god.name
      ),
      React.createElement(
        "p",
        { className: "godScore" },
        React.createElement(
          "span",
          { className: "label" },
          "Total Praise:"
        ),
        " ",
        Number(god.totalPraise.toFixed(1))
      )
    );
  });

  return React.createElement(
    "div",
    { id: "godList" },
    godNodes
  );
};

var loadGodsFromServer = function loadGodsFromServer() {
  sendAjax('GET', '/getLeaderboard', null, function (data) {
    ReactDOM.render(React.createElement(GodList, { gods: data.gods }), document.querySelector("#gameGoesHere"));
  });
};

$(document).on('click', '.shopItem', function () {
  handleError("Market not implemented yet");
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
  $("#domoMessage").delay(900).animate({ width: 'hide' }, 350);
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
