let c;
let ctx;
let bgImg;
let fishImg;
let shogImg;
let deeponeImg;
let spawnImg;
let thingImg;
let statueImg;
let totalPraise = 0;
let pps;
let ppsTimer;
let ppsTimerMax;
let allEntities = {};
let statue;
let mousePos;
let shopButtons = [];
let now;
let fps;
let lastTime;
let discountMult = 1;
let allCultists = [];
let allShoggoths = [];
let allDeepones = [];
let allStarspawns = [];
let allElderThings = [];
let allEntityVisuals = [];

let ppsElement;
let totalPraiseElement;
let cultistsElement;
let shogElement;
let deepElement;
let starElement;
let thingElement;
let buff1Element;
let buff2Element;
let buff3Element;

let animationFrameStatus;

const update = () => {
  statue.update();
  for(let i = 0; i < shopButtons.length; i++){
    shopButtons[i].update();
  }
  iterate();
  updateAllEntities();
  updateAllElements();
};

const draw = () =>{
  //draws background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(bgImg,0,0,80,60,0,0,320,240);
  //playable space rectangle
  //ctx.fillRect(10, 90, 195, 115);
  
  statue.draw();
  
  //draws UI
  ctx.font = "12px lunch";
  ctx.fillStyle = "white";
  ctx.fillText(`${pps.toFixed(2)} pps`, 330, 215);
  ctx.fillText(`Praise: ${totalPraise.toFixed(2)}`, 330, 230);
  
  for(let i = 0; i < shopButtons.length; i++){
    shopButtons[i].draw();
  }
  
  drawAllEntities();
};

const gameLoop = () => {
  animationFrameStatus = window.requestAnimationFrame(gameLoop);
  update();
  draw();
};

class Statue {
  constructor(img){
    this.img = img;
    this.x = 250;
    this.y = 90;
    this.offset = 0;
  }
  
  update(){
    if(mousePos){
      if(mousePos.x >= this.x && mousePos.x <= this.x + 64 && mousePos.y >= this.y && mousePos.y <= this.y + 64){
        this.offset = 2;
      } else {
        this.offset = 0;
      }
    }
    
    countPPS();
  }
  
  draw(){
    ctx.drawImage(this.img, 0, 0, 16, 16, this.x, this.y + this.offset, 64, 64);
  }
  
  checkClicked(){
    if(mousePos.x >= this.x && mousePos.x <= this.x + 64 && mousePos.y >= this.y && mousePos.y <= this.y + 64){
      totalPraise ++;
    }
  }
}

class ShopButton{
  constructor(type, label, price, pos){
    this.type = type;
    this.label = label;
    this.price = price;
    this.basePrice = price;
    this.pos = pos;
    this.highlight = false;
  }
  
  update(){
    if(mousePos){
      if(mousePos.x >= this.pos.x && mousePos.x <= this.pos.x + 254 &&
         mousePos.y >= this.pos.y - 10 && mousePos.y <= this.pos.y + 14 - 10){
        this.highlight = true;
      } else {
        this.highlight = false;
      }
    }
    
    this.price = this.basePrice * discountMult;
  }
  
  draw(){
    if(this.highlight){
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(this.pos.x - 2, this.pos.y - 2 - 10, 254, 15);
    }
    ctx.font = "12px lunch";
    ctx.fillStyle = "white";
    ctx.fillText(`${this.label} x${allEntities[this.type]}`, this.pos.x, this.pos.y);
    ctx.fillText(`Cost: ${this.price.toFixed(2)}`, this.pos.x + 140, this.pos.y);
  }
  
  checkClicked(){
    if(mousePos.x >= this.pos.x && mousePos.x <= this.pos.x + 165 &&
       mousePos.y >= this.pos.y - 10 && mousePos.y <= this.pos.y + 14 - 10){
      if(totalPraise >= this.price){
        totalPraise -= this.price;
        allEntities[this.type]++;
      }
    }
  }
}

class Cultist{
  constructor(img) {
    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 16;
    const x = Math.random() * 185 + 10;
    const y = Math.random() * 115 + 70;
    this.pos = { x, y };
    this.animTime = 0;
  }
  
  update(){
    //changes animation frame
    if(this.animTime >= this.spf){
      if(this.currentFrame == 0) this.currentFrame = 1;
      else this.currentFrame = 0;
      
      this.animTime = 0;
    }
    this.animTime += calculateDeltaTime();
  }
  
  draw(){
    ctx.drawImage(this.img, this.currentFrame * 16, 0, 16, 16, this.pos.x, this.pos.y, 32, 32);
  }
} //end cultist

class Shoggoth{
  constructor(img) {
    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 20;
    const x = Math.random() * 120 + 10;
    const y = Math.random() * 90 + 70;
    this.pos = { x, y };
    this.animTime = 0;
  }
  
  update(){
    //changes animation frame
    if(this.animTime >= this.spf){
      if(this.currentFrame == 0) this.currentFrame = 1;
      else this.currentFrame = 0;
      
      this.animTime = 0;
    }
    this.animTime += calculateDeltaTime();
  }
  
  draw(){
    ctx.drawImage(this.img, this.currentFrame * 25, 0, 25, 25, this.pos.x, this.pos.y, 50, 50);
  }
} //end shoggoth

class Deepone{
  constructor(img) {
    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 32;
    const x = Math.random() * 100 + 10;
    const y = Math.random() * 80 + 70;
    this.pos = { x, y };
    this.animTime = 0;
  }
  
  update(){
    //changes animation frame
    if(this.animTime >= this.spf){
      if(this.currentFrame == 0) this.currentFrame = 1;
      else this.currentFrame = 0;
      
      this.animTime = 0;
    }
    this.animTime += calculateDeltaTime();
  }
  
  draw(){
    ctx.drawImage(this.img, this.currentFrame * 32, 0, 32, 32, this.pos.x, this.pos.y, 64, 64);
  }
} //end deepone

class Starspawn{
  constructor(img) {
    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 32;
    const x = Math.random() * 50 + 10;
    const y = Math.random() * 80 + 70;
    this.pos = { x, y };
    this.animTime = 0;
  }
  
  update(){
    //changes animation frame
    if(this.animTime >= this.spf){
      if(this.currentFrame == 0) this.currentFrame = 1;
      else this.currentFrame = 0;
      
      this.animTime = 0;
    }
    this.animTime += calculateDeltaTime();
  }
  
  draw(){
    ctx.drawImage(this.img, this.currentFrame * 32, 0, 32, 32, this.pos.x, this.pos.y, 64, 64);
  }
} //end starspawn

class Elderthing{
  constructor(img) {
    this.img = img;
    this.currentFrame = 0;
    this.spf = 0.5;
    this.height = 32;
    const x = Math.random() * 10 + 10;
    const y = Math.random() * 80 + 70;
    this.pos = { x, y };
    this.animTime = 0;
  }
  
  update(){
    //changes animation frame
    if(this.animTime >= this.spf){
      if(this.currentFrame == 0) this.currentFrame = 1;
      else this.currentFrame = 0;
      
      this.animTime = 0;
    }
    this.animTime += calculateDeltaTime();
  }
  
  draw(){
    ctx.drawImage(this.img, this.currentFrame * 32, 0, 32, 32, this.pos.x, this.pos.y, 64, 64);
  }
} //end elderthing

//Get Mouse Position
const getMousePos = (c, e) => {
    const rect = c.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
};

//counts up the player's total pps
const countPPS = () => {
  pps = 0;
  pps += allEntities.cultists * 0.1;
  pps += allEntities.shoggoths;
  pps += allEntities.deepones * 8;
  pps += allEntities.starspawns * 47;
  pps += allEntities.elderthings * 260;
  
  //buff1
  pps *= 1 + (allEntities.buff1 * 0.25);
  
  //buff2
  discountMult = 1 - (allEntities.buff2 * 0.1);
  if(discountMult <= 0) discountMult = 0.1;
  
  //buff3
  ppsTimerMax = 1 - (allEntities.buff3 * 0.1);
  if(ppsTimerMax <= 0) ppsTimerMax = 0.1;
  
  //determines if a second has passed since last adding to total praise
  if(ppsTimer > 0){
    ppsTimer -= calculateDeltaTime();
  } else {
    ppsTimer = ppsTimerMax;
    totalPraise += pps;
  }
}

//makes sure the number of entities and the number that should be there are the same. If not, it adds some.
const iterate = () => {
  //cultists
  if(allCultists.length < allEntities.cultists){
    allCultists[allCultists.length] = new Cultist(fishImg);
  }
  //shoggoths
  if(allShoggoths.length < allEntities.shoggoths){
    allShoggoths[allShoggoths.length] = new Shoggoth(shogImg);
  }
  //deepones
  if(allDeepones.length < allEntities.deepones){
    allDeepones[allDeepones.length] = new Deepone(deeponeImg);
  }
  //starspawn
  if(allStarspawns.length < allEntities.starspawns){
    allStarspawns[allStarspawns.length] = new Starspawn(spawnImg);
  }
  //elder things
  if(allElderThings.length < allEntities.elderthings){
    allElderThings[allElderThings.length] = new Elderthing(thingImg);
  }
};

const updateAllEntities = () => {
  for(let i = 0; i < allCultists.length; i++){
    allCultists[i].update();
  }
  for(let i = 0; i < allShoggoths.length; i++){
    allShoggoths[i].update();
  }
  for(let i = 0; i < allDeepones.length; i++){
    allDeepones[i].update();
  }
  for(let i = 0; i < allStarspawns.length; i++){
    allStarspawns[i].update();
  }
  for(let i = 0; i < allElderThings.length; i++){
    allElderThings[i].update();
  }
};

const drawAllEntities = () => {
  allEntityVisuals = [];
  for(let i = 0; i < allCultists.length; i++){
    allEntityVisuals[allEntityVisuals.length] = allCultists[i];
  }
  for(let i = 0; i < allShoggoths.length; i++){
    allEntityVisuals[allEntityVisuals.length] = allShoggoths[i];
  }
  for(let i = 0; i < allDeepones.length; i++){
    allEntityVisuals[allEntityVisuals.length] = allDeepones[i];
  }
  for(let i = 0; i < allStarspawns.length; i++){
    allEntityVisuals[allEntityVisuals.length] = allStarspawns[i];
  }
  for(let i = 0; i < allElderThings.length; i++){
    allEntityVisuals[allEntityVisuals.length] = allElderThings[i];
  }
  
  allEntityVisuals.sort((a, b) => {
    return (a.pos.y + a.height) - (b.pos.y + b.height);
  });
  
  for(let i = 0; i < allEntityVisuals.length; i++){
    allEntityVisuals[i].draw();
  }
};

//updates all page elements for the ajax to pull from in order to save progress
const updateAllElements = () => {
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
const calculateDeltaTime = () => {
  now = performance.now(); 
  fps = 1000 / (now - lastTime);
  fps = clamp(fps, 12, 60);
  lastTime = now; 
  return 1/fps;
};

const clamp = (val, min, max) => {
  return Math.max(min, Math.min(max, val));
};

const checkCheatClicked = () => {
  if(mousePos.x >= 0 && mousePos.x <= 20 &&
       mousePos.y >= 0 && mousePos.y <= 20){
    totalPraise += 10000;
  }
};

const getData = () => {
  let id = document.getElementById('godID').getAttribute("value");
  id = `id=${id}`;
  $.ajax({
    cache: false,
    type: "GET",
    url: '/getData',
    data: id,
    dataType: "json",
    success: (result, status, xhr) => {
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
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
  
  
}
//end helper functions-------------------------------------

const init = () => {
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
    buff3: 0,
  };
  
  
  
  c.addEventListener("mousemove", (e) => {
    mousePos = getMousePos(c, e);
  }, false);
  c.addEventListener("click", (e) => {
    statue.checkClicked();
    for(let i = 0; i < shopButtons.length; i++){
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