const GuideWindow = (props) => {
  return(
    <div id="guide">
      <h2>Guide</h2>
      <p>You are an infant elder god, come to this plane from the depths of space. In order to gain influence over your peers and the feeble minded denizens of the Earth, you must accumulate praise. To do this you must gain worshippers.</p>
      <p>Click on the statue of your Earthly avatar to accrue praise. Utilize this praise to influence dark beings to do your bidding and accumulate praise over time without clicking.</p>
      <h3>Cultists:</h3>
      <p>Cultists are the most pathetic form of worshipper. They cost 15 praise to influence and generate 0.1 praise per second. Transformed by your dark powers, these cultists used to be human but now are mindless beasts.</p>
      <h3>Shoggoths:</h3>
      <p>Shoggoths are the lowliest servant race of star-beings. They cost 100 praise to influence and generate 1 praise per second. Each shoggoth is specifically created to serve a higher being, an amalgamate of flesh and fear.</p>
      <h3>Deep Ones:</h3>
      <p>Deep Ones are a higher class of servant race. They cost 1,100 praise to influence and generate 8 praise per second. Deep Ones lay slumbering in the depths of the cold, dark ocean until they are needed, when they emerge and wreak their havoc.</p>
      <h3>Starspawn:</h3>
      <p>Starspawn are immigrants from the stars, come to observe your growing influence. They cost 12,000 praise to influence and generate 47 praise per second. Having starspawn in your ranks will prove very helpful.</p>
      <h3>Elder Things:</h3>
      <p>Elder Things are part of the high court of ancient beings. They cost 130,000 praise to influence and generate 260 praise per second. To have an elder thing in your thrall is quite an achievement.</p>
      <h3>Dagon's Blessing:</h3>
      <p>A blessing from the being Dagon itself, this blessing costs 200,000 praise per teir and will increase your total praise per second.</p>
      <h3>Cthulhu's Wrath:</h3>
      <p>Wrath of the undead monstrosity Cthulhu. Your thrall will shudder in fear and cost less praise to influence with each teir of this blessing you accrue. This blessing costs 200,000 praise per teir.</p>
      <h3>Nyarlathotep's Curse:</h3>
      <p>Upon gaining 1,000,000 praise you may incur the Curse of the Crawling Chaos himself. This blessing will permanently increase the rate at which you accrue praise. The fabric of time will bend, causing praise to be added much more quickly than every second.</p>
    </div>
  );
};

const createGuideWindow = function(csrf){
  ReactDOM.render(
    <GuideWindow csrf={csrf}/>, document.querySelector("#gameGoesHere")
  );
  
  ReactDOM.render(
    <Blank/>, document.querySelector("#saveForm")
  );
};

const createDesignWindow = function(csrf){
  ReactDOM.render(
    <DesignWindow csrf={csrf}/>, document.querySelector("#gameGoesHere")
  );
  
  ReactDOM.render(
    <Blank/>, document.querySelector("#saveForm")
  );
};

const DesignWindow = (props) => {
  return(
    <div id="guide">
      <h2>Designing Cthulhu Clicker</h2>
      <p>
      Idle clicker games are an interesting phenomenon. They certainly aren't popular with everyone, but those that do enjoy them like steady progression and feeling that the rewards for progressing are worth the time they spend accumulating points. I kept these things in mind not only with the thematic and mechanical design of the game but also when brainstorming ways to extend this app into the future. 
      </p>
      <h3>Thematic Design</h3>
      <p>
      From the beginning of the development process I knew I wanted to theme the game around the Cthulhu mythos. The idea that you are a fledgeling alien god trying to gain influence with humans seemed like a perfect setting to idle through accumulating points.
      </p>
      <p>
      The visual designs and descriptions I wrote in the guide embody the progression aspect of the idle game genre. At this stage in the app's design, gaining enough points to purchase a new tier of creature is its own reward. The reward of the "unknown" monsters becoming known reflects the themes of the cosmic horror genre as well. This isn't to say that is the only reward possible for this style of game.
      </p>
      <h3>Looking Forward</h3>
      <p>
      The first thing I would do if I were to extend this app, I would implement a feature for players to look forward to after accumulating enough points. My first and most major thought for this would be to create a battle system between players. Players could start matches between each other and the types of monsters they have purchased could provide different abilities for them to use. To accent the nature of idle games not holding their players full attentions, the battles would be turn based and each turn would wait to progress until each player made their move. The app could even notify each player if their turn is up. This battle system would add a lot more competition to the app on top of the leaderboard I already have implemented.
      </p>
      <h3>Marketability</h3>
      <p>
      This app has quite a lot of opportunity for marketing. There is plenty of real estate around the pages for unintrusive ads, and for playes who do not desire to simply wait for their points to accumulate, they can purchase different buffs from the marketplace to speed up their progress. If the battle system were to be implemented this could greatly expand the kinds of buffs players could purchase.
      </p>
    </div>
  );
};

const createMarketWindow = function(csrf){
  ReactDOM.render(
    <MarketWindow csrf={csrf}/>, document.querySelector("#gameGoesHere")
  );
  
  ReactDOM.render(
    <Blank/>, document.querySelector("#saveForm")
  );
};

const MarketWindow = (props) => {
  return(
    <div id="guide">
      <h2>Market</h2>
      <section className="shopItem">
        <span className="shopName">2000 praise</span><br/><span className="price">$1.99</span>
      </section>
      <section className="shopItem">
        <span className="shopName">10000 praise</span><br/><span className="price">$7.99</span>
      </section>
      <section className="shopItem">
        <span className="shopName">50000 praise</span><br/><span className="price">$19.99</span>
      </section>
      <section className="shopItem">
        <span className="shopName">5 Elder Things</span><br/><span className="price">$9.99</span>
      </section>
      <section className="shopItem">
        <span className="shopName">1 hour of speedy worship</span><br/><span className="price">$1.99</span>
      </section>
      <section className="shopItem">
        <span className="shopName">5 hours of speedy worship</span><br/><span className="price">$1.99</span>
      </section>
      <section className="spanner"></section>
    </div>
  );
};

const createLeaderboardWindow = function(csrf){
  ReactDOM.render(
    <Blank/>, document.querySelector("#saveForm")
  );
  
  loadGodsFromServer();
};

const GodList = function(props) {
  if(props.gods.length === 0) {
    return (
      <div id="godList">
        <h3 className="empty">No Players Currently</h3>
      </div>
    );
  }
  
  const godNodes = props.gods.map(function(god) {
    return(
      <div className="godEntry">
        <p className="godName"><span className="label">Name:</span> {god.name}</p>
        <p className="godScore"><span className="label">Total Praise:</span> {Number((god.totalPraise).toFixed(1))}</p>
      </div>
    );
  });
  
  return (
    <div id="godList">
      {godNodes}
    </div>
  );
};

const loadGodsFromServer = () => {
  sendAjax('GET', '/getLeaderboard', null, (data) => {
    ReactDOM.render(
      <GodList gods={data.gods} />, document.querySelector("#gameGoesHere")
    );
  });
};

$(document).on('click', '.shopItem', () => {
  handleError("Market not implemented yet");
});