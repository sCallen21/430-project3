const saveGame = (e) => {
  e.preventDefault();
     
  const data = `id=${document.getElementById('godID').getAttribute("value")}&pps=${document.getElementById('ppsE').textContent}&totalPraise=${document.getElementById('tpE').textContent}&fish=${document.getElementById('fishE').textContent}&shogs=${document.getElementById('shogE').textContent}&deepones=${document.getElementById('deepE').textContent}&starspawn=${document.getElementById('starE').textContent}&things=${document.getElementById('thingE').textContent}&buff1=${document.getElementById('buff1E').textContent}&buff2=${document.getElementById('buff2E').textContent}&buff3=${document.getElementById('buff3E').textContent}&_csrf=${document.getElementById('csrfToken').getAttribute("value")}`;
  
  sendAjax("POST", "/gameSave", data, (result, status, xhr) => {
    const messageObj = JSON.parse(xhr.responseText);

    handleError(messageObj.message);
  });

  return false;
};

const GameContent = (props) => {
  return(
    <section id="im just here to make jsx happy">
    <section className="hide">
    <img id="bgImg" src="/assets/img/background.png" alt="bg"/>
    <img id="fishImg" src="/assets/img/fish.png" alt="fish"/>
    <img id="shogImg" src="/assets/img/shoggoth.png" alt="shog"/>
    <img id="deeponeImg" src="/assets/img/deepone.png" alt="deep"/>
    <img id="spawnImg" src="/assets/img/starspawn.png" alt="star"/>
    <img id="thingImg" src="/assets/img/elderthing.png" alt="thing"/>
    <img id="statueImg" src="/assets/img/statue.png" alt="statue"/>
    <p className="lunch">Lunchtime</p>
    <p id="ppsE"></p>
    <p id="tpE"></p>
    <p id="fishE"></p>
    <p id="shogE"></p>
    <p id="deepE"></p>
    <p id="starE"></p>
    <p id="thingE"></p>
    <p id="buff1E"></p>
    <p id="buff2E"></p>
    <p id="buff3E"></p>
  </section>
  <section id="gameContent">
    <div className="gameContent">
          <div className="god">
            <h3 className="godName">Welcome back {props.god[0].name}</h3>
            <input id="godID" type="hidden" value={props.god[0]._id}/>
          </div>
    </div>
    <canvas id="myCanvas" width="590" height="240">Support Canvas or perish</canvas>
  </section>
  </section>
  );
};

const SaveForm = (props) => {
  return(
    <form id="saveForm"
          onSubmit={saveGame}
          name="saveForm"
          action="/gameSave"
          method="POST"
          className="mainForm">
      <input id="csrfToken" type="hidden" name="_csrf" value={props.csrf} />
      <input className="formSubmit" type="submit" value="Save" />
    </form>
  );
};

const loadGod = () => {
  sendAjax('GET', '/getGod', null, (data) => {
    ReactDOM.render(
      <GameContent god={data.god}/>, document.querySelector("#gameGoesHere")
    );
    init();
  });
};

const createGameWindow = function(csrf){
  ReactDOM.render(
    <SaveForm csrf={csrf}/>, document.querySelector("#saveForm")
  );
  loadGod();
};