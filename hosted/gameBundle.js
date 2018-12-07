"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var c = void 0;
var ctx = void 0;
var bgImg = void 0;
var fishImg = void 0;
var shogImg = void 0;
var deeponeImg = void 0;
var spawnImg = void 0;
var thingImg = void 0;
var statueImg = void 0;
var totalPraise = 0;
var pps = void 0;
var ppsTimer = void 0;
var ppsTimerMax = void 0;
var allEntities = {};
var statue = void 0;
var mousePos = void 0;
var shopButtons = [];
var now = void 0;
var fps = void 0;
var lastTime = void 0;
var discountMult = 1;
var allCultists = [];
var allShoggoths = [];
var allDeepones = [];
var allStarspawns = [];
var allElderThings = [];
var allEntityVisuals = [];

var ppsElement = void 0;
var totalPraiseElement = void 0;
var cultistsElement = void 0;
var shogElement = void 0;
var deepElement = void 0;
var starElement = void 0;
var thingElement = void 0;
var buff1Element = void 0;
var buff2Element = void 0;
var buff3Element = void 0;

var animationFrameStatus = void 0;

var update = function update() {
  statue.update();
  for (var i = 0; i < shopButtons.length; i++) {
    shopButtons[i].update();
  }
  iterate();
  updateAllEntities();
  updateAllElements();
};

var draw = function draw() {
  //draws background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(bgImg, 0, 0, 80, 60, 0, 0, 320, 240);
  //playable space rectangle
  //ctx.fillRect(10, 90, 195, 115);

  statue.draw();

  //draws UI
  ctx.font = "12px lunch";
  ctx.fillStyle = "white";
  ctx.fillText(pps.toFixed(2) + " pps", 330, 215);
  ctx.fillText("Praise: " + totalPraise.toFixed(2), 330, 230);

  for (var i = 0; i < shopButtons.length; i++) {
    shopButtons[i].draw();
  }

  drawAllEntities();
};

var gameLoop = function gameLoop() {
  animationFrameStatus = window.requestAnimationFrame(gameLoop);
  update();
  draw();
};

var Statue = function () {
  function Statue(img) {
    _classCallCheck(this, Statue);

    this.img = img;
    this.x = 250;
    this.y = 90;
    this.offset = 0;
  }

  _createClass(Statue, [{
    key: "update",
    value: function update() {
      if (mousePos) {
        if (mousePos.x >= this.x && mousePos.x <= this.x + 64 && mousePos.y >= this.y && mousePos.y <= this.y + 64) {
          this.offset = 2;
        } else {
          this.offset = 0;
        }
      }

      countPPS();
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.drawImage(this.img, 0, 0, 16, 16, this.x, this.y + this.offset, 64, 64);
    }
  }, {
    key: "checkClicked",
    value: function checkClicked() {
      if (mousePos.x >= this.x && mousePos.x <= this.x + 64 && mousePos.y >= this.y && mousePos.y <= this.y + 64) {
        totalPraise++;
      }
    }
  }]);

  return Statue;
}();

var ShopButton = function () {
  function ShopButton(type, label, price, pos) {
    _classCallCheck(this, ShopButton);

    this.type = type;
    this.label = label;
    this.price = price;
    this.basePrice = price;
    this.pos = pos;
    this.highlight = false;
  }

  _createClass(ShopButton, [{
    key: "update",
    value: function update() {
      if (mousePos) {
        if (mousePos.x >= this.pos.x && mousePos.x <= this.pos.x + 254 && mousePos.y >= this.pos.y - 10 && mousePos.y <= this.pos.y + 14 - 10) {
          this.highlight = true;
        } else {
          this.highlight = false;
        }
      }

      this.price = this.basePrice * discountMult;
    }
  }, {
    key: "draw",
    value: function draw() {
      if (this.highlight) {
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(this.pos.x - 2, this.pos.y - 2 - 10, 254, 15);
      }
      ctx.font = "12px lunch";
      ctx.fillStyle = "white";
      ctx.fillText(this.label + " x" + allEntities[this.type], this.pos.x, this.pos.y);
      ctx.fillText("Cost: " + this.price.toFixed(2), this.pos.x + 140, this.pos.y);
    }
  }, {
    key: "checkClicked",
    value: function checkClicked() {
      if (mousePos.x >= this.pos.x && mousePos.x <= this.pos.x + 165 && mousePos.y >= this.pos.y - 10 && mousePos.y <= this.pos.y + 14 - 10) {
        if (totalPraise >= this.price) {
          totalPraise -= this.price;
          allEntities[this.type]++;
        }
      }
    }
  }]);

  return ShopButton;
}();

var Cultist = function () {
  function Cultist(img) {
    _classCallCheck(this, Cultist);

    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 16;
    var x = Math.random() * 185 + 10;
    var y = Math.random() * 115 + 70;
    this.pos = { x: x, y: y };
    this.animTime = 0;
  }

  _createClass(Cultist, [{
    key: "update",
    value: function update() {
      //changes animation frame
      if (this.animTime >= this.spf) {
        if (this.currentFrame == 0) this.currentFrame = 1;else this.currentFrame = 0;

        this.animTime = 0;
      }
      this.animTime += calculateDeltaTime();
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.drawImage(this.img, this.currentFrame * 16, 0, 16, 16, this.pos.x, this.pos.y, 32, 32);
    }
  }]);

  return Cultist;
}(); //end cultist

var Shoggoth = function () {
  function Shoggoth(img) {
    _classCallCheck(this, Shoggoth);

    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 20;
    var x = Math.random() * 120 + 10;
    var y = Math.random() * 90 + 70;
    this.pos = { x: x, y: y };
    this.animTime = 0;
  }

  _createClass(Shoggoth, [{
    key: "update",
    value: function update() {
      //changes animation frame
      if (this.animTime >= this.spf) {
        if (this.currentFrame == 0) this.currentFrame = 1;else this.currentFrame = 0;

        this.animTime = 0;
      }
      this.animTime += calculateDeltaTime();
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.drawImage(this.img, this.currentFrame * 25, 0, 25, 25, this.pos.x, this.pos.y, 50, 50);
    }
  }]);

  return Shoggoth;
}(); //end shoggoth

var Deepone = function () {
  function Deepone(img) {
    _classCallCheck(this, Deepone);

    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 32;
    var x = Math.random() * 100 + 10;
    var y = Math.random() * 80 + 70;
    this.pos = { x: x, y: y };
    this.animTime = 0;
  }

  _createClass(Deepone, [{
    key: "update",
    value: function update() {
      //changes animation frame
      if (this.animTime >= this.spf) {
        if (this.currentFrame == 0) this.currentFrame = 1;else this.currentFrame = 0;

        this.animTime = 0;
      }
      this.animTime += calculateDeltaTime();
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.drawImage(this.img, this.currentFrame * 32, 0, 32, 32, this.pos.x, this.pos.y, 64, 64);
    }
  }]);

  return Deepone;
}(); //end deepone

var Starspawn = function () {
  function Starspawn(img) {
    _classCallCheck(this, Starspawn);

    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 32;
    var x = Math.random() * 50 + 10;
    var y = Math.random() * 80 + 70;
    this.pos = { x: x, y: y };
    this.animTime = 0;
  }

  _createClass(Starspawn, [{
    key: "update",
    value: function update() {
      //changes animation frame
      if (this.animTime >= this.spf) {
        if (this.currentFrame == 0) this.currentFrame = 1;else this.currentFrame = 0;

        this.animTime = 0;
      }
      this.animTime += calculateDeltaTime();
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.drawImage(this.img, this.currentFrame * 32, 0, 32, 32, this.pos.x, this.pos.y, 64, 64);
    }
  }]);

  return Starspawn;
}(); //end starspawn

var Elderthing = function () {
  function Elderthing(img) {
    _classCallCheck(this, Elderthing);

    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 32;
    var x = Math.random() * 10 + 10;
    var y = Math.random() * 80 + 70;
    this.pos = { x: x, y: y };
    this.animTime = 0;
  }

  _createClass(Elderthing, [{
    key: "update",
    value: function update() {
      //changes animation frame
      if (this.animTime >= this.spf) {
        if (this.currentFrame == 0) this.currentFrame = 1;else this.currentFrame = 0;

        this.animTime = 0;
      }
      this.animTime += calculateDeltaTime();
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.drawImage(this.img, this.currentFrame * 32, 0, 32, 32, this.pos.x, this.pos.y, 64, 64);
    }
  }]);

  return Elderthing;
}(); //end elderthing

//Get Mouse Position


var getMousePos = function getMousePos(c, e) {
  var rect = c.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};

//counts up the player's total pps
var countPPS = function countPPS() {
  pps = 0;
  pps += allEntities.cultists * 0.1;
  pps += allEntities.shoggoths;
  pps += allEntities.deepones * 8;
  pps += allEntities.starspawns * 47;
  pps += allEntities.elderthings * 260;

  //buff1
  pps *= 1 + allEntities.buff1 * 0.25;

  //buff2
  discountMult = 1 - allEntities.buff2 * 0.1;
  if (discountMult <= 0) discountMult = 0.1;

  //buff3
  ppsTimerMax = 1 - allEntities.buff3 * 0.1;
  if (ppsTimerMax <= 0) ppsTimerMax = 0.1;

  //determines if a second has passed since last adding to total praise
  if (ppsTimer > 0) {
    ppsTimer -= calculateDeltaTime();
  } else {
    ppsTimer = ppsTimerMax;
    totalPraise += pps;
  }
};

//makes sure the number of entities and the number that should be there are the same. If not, it adds some.
var iterate = function iterate() {
  //cultists
  if (allCultists.length < allEntities.cultists) {
    allCultists[allCultists.length] = new Cultist(fishImg);
  }
  //shoggoths
  if (allShoggoths.length < allEntities.shoggoths) {
    allShoggoths[allShoggoths.length] = new Shoggoth(shogImg);
  }
  //deepones
  if (allDeepones.length < allEntities.deepones) {
    allDeepones[allDeepones.length] = new Deepone(deeponeImg);
  }
  //starspawn
  if (allStarspawns.length < allEntities.starspawns) {
    allStarspawns[allStarspawns.length] = new Starspawn(spawnImg);
  }
  //elder things
  if (allElderThings.length < allEntities.elderthings) {
    allElderThings[allElderThings.length] = new Elderthing(thingImg);
  }
};

var updateAllEntities = function updateAllEntities() {
  for (var i = 0; i < allCultists.length; i++) {
    allCultists[i].update();
  }
  for (var _i = 0; _i < allShoggoths.length; _i++) {
    allShoggoths[_i].update();
  }
  for (var _i2 = 0; _i2 < allDeepones.length; _i2++) {
    allDeepones[_i2].update();
  }
  for (var _i3 = 0; _i3 < allStarspawns.length; _i3++) {
    allStarspawns[_i3].update();
  }
  for (var _i4 = 0; _i4 < allElderThings.length; _i4++) {
    allElderThings[_i4].update();
  }
};

var drawAllEntities = function drawAllEntities() {
  allEntityVisuals = [];
  for (var i = 0; i < allCultists.length; i++) {
    allEntityVisuals[allEntityVisuals.length] = allCultists[i];
  }
  for (var _i5 = 0; _i5 < allShoggoths.length; _i5++) {
    allEntityVisuals[allEntityVisuals.length] = allShoggoths[_i5];
  }
  for (var _i6 = 0; _i6 < allDeepones.length; _i6++) {
    allEntityVisuals[allEntityVisuals.length] = allDeepones[_i6];
  }
  for (var _i7 = 0; _i7 < allStarspawns.length; _i7++) {
    allEntityVisuals[allEntityVisuals.length] = allStarspawns[_i7];
  }
  for (var _i8 = 0; _i8 < allElderThings.length; _i8++) {
    allEntityVisuals[allEntityVisuals.length] = allElderThings[_i8];
  }

  allEntityVisuals.sort(function (a, b) {
    return a.pos.y + a.height - (b.pos.y + b.height);
  });

  for (var _i9 = 0; _i9 < allEntityVisuals.length; _i9++) {
    allEntityVisuals[_i9].draw();
  }
};

//updates all page elements for the ajax to pull from in order to save progress
var updateAllElements = function updateAllElements() {
  ppsElement.textContent = pps;
  totalPraiseElement.textContent = totalPraise;
  cultistsElement.textContent = allEntities.cultists;
  shogElement.textContent = allEntities.shoggoths;
  deepElement.textContent = allEntities.deepones;
  starElement.textContent = allEntities.starspawns;
  thingElement.textContent = allEntities.elderthings;
  buff1Element.textContent = allEntities.buff1;
  buff2Element.textContent = allEntities.buff2;
  buff3Element.textContent = allEntities.buff3;
};

//Helper Functions-----------------------------------------
var calculateDeltaTime = function calculateDeltaTime() {
  now = performance.now();
  fps = 1000 / (now - lastTime);
  fps = clamp(fps, 12, 60);
  lastTime = now;
  return 1 / fps;
};

var clamp = function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
};

var checkCheatClicked = function checkCheatClicked() {
  if (mousePos.x >= 0 && mousePos.x <= 20 && mousePos.y >= 0 && mousePos.y <= 20) {
    totalPraise += 10000;
  }
};

var getData = function getData() {
  var id = document.getElementById('godID').getAttribute("value");
  id = "id=" + id;
  $.ajax({
    cache: false,
    type: "GET",
    url: '/getData',
    data: id,
    dataType: "json",
    success: function success(result, status, xhr) {
      //updates all local entities with the player's numbers
      totalPraise = xhr.responseJSON.totalPraise;
      allEntities.cultists = xhr.responseJSON.numCultists;
      allEntities.shoggoths = xhr.responseJSON.numShog;
      allEntities.deepones = xhr.responseJSON.numDeepOnes;
      allEntities.starspawns = xhr.responseJSON.numStarspawn;
      allEntities.elderthings = xhr.responseJSON.numElderThings;
      allEntities.buff1 = xhr.responseJSON.numBlessing1;
      allEntities.buff2 = xhr.responseJSON.numBlessing2;
      allEntities.buff3 = xhr.responseJSON.numBlessing3;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
//end helper functions-------------------------------------

var init = function init() {
  c = document.getElementById('myCanvas');

  ctx = c.getContext("2d");

  //turns off interpolation of scaled up images
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false; /// future

  bgImg = document.getElementById('bgImg');
  fishImg = document.getElementById('fishImg');
  shogImg = document.getElementById('shogImg');
  deeponeImg = document.getElementById('deeponeImg');
  spawnImg = document.getElementById('spawnImg');
  thingImg = document.getElementById('thingImg');
  statueImg = document.getElementById('statueImg');

  statue = new Statue(statueImg);
  shopButtons[0] = new ShopButton('cultists', 'Cultists', 15, { x: 330, y: 20 });
  shopButtons[1] = new ShopButton('shoggoths', 'Shoggoths', 100, { x: 330, y: 40 });
  shopButtons[2] = new ShopButton('deepones', 'Deepones', 1100, { x: 330, y: 60 });
  shopButtons[3] = new ShopButton('starspawns', 'Star Spawn', 12000, { x: 330, y: 80 });
  shopButtons[4] = new ShopButton('elderthings', 'Elder Things', 130000, { x: 330, y: 100 });
  shopButtons[5] = new ShopButton('buff1', 'Dagon\'s Blessing', 200000, { x: 330, y: 120 });
  shopButtons[6] = new ShopButton('buff2', 'Cthulhu\'s Wrath', 200000, { x: 330, y: 140 });
  shopButtons[7] = new ShopButton('buff3', 'Nyarl\'s Curse', 1000000, { x: 330, y: 160 });

  allEntities = {
    cultists: 0,
    shoggoths: 0,
    deepones: 0,
    starspawns: 0,
    elderthings: 0,
    buff1: 0,
    buff2: 0,
    buff3: 0
  };

  c.addEventListener("mousemove", function (e) {
    mousePos = getMousePos(c, e);
  }, false);
  c.addEventListener("click", function (e) {
    statue.checkClicked();
    for (var i = 0; i < shopButtons.length; i++) {
      shopButtons[i].checkClicked();
    }
    checkCheatClicked();
  }, false);

  ppsElement = document.getElementById('ppsE');
  totalPraiseElement = document.getElementById('tpE');
  cultistsElement = document.getElementById('fishE');
  shogElement = document.getElementById('shogE');
  deepElement = document.getElementById('deepE');
  starElement = document.getElementById('starE');
  thingElement = document.getElementById('thingE');
  buff1Element = document.getElementById('buff1E');
  buff2Element = document.getElementById('buff2E');
  buff3Element = document.getElementById('buff3E');

  getData();

  cancelAnimationFrame(animationFrameStatus);

  gameLoop();
};

//window.addEventListener("load",init);
