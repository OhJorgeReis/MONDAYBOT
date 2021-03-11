const {ipcRenderer} = require("electron");
var speechSynthesis = require('speech-synthesis');

class App{
    constructor (){
        console.log("LOG depuis la page html");
        this.initListeners();
    }
    initListeners(){
        ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
    }

onMessage(event, m){
    const message = m.message;
    const map = m.attachment;

    document.body.innerHTML = `<div id="typewriter"></div>`;
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = message;
    utter.volume = 0.5;
    window.speechSynthesis.speak(utter);

    // if(message.file){
    //     let img = document.createElement("img");
    //     img.src = message.image.proxyURL;
    //     document.body.appendChild(img);
    // }


    let obj = Array.from(map).reduce((obj, [key, value]) => (
                Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
                ), {});
    let keys = Object.keys(obj);
    if(obj[keys[0]]){
        console.log(obj[keys[0]].proxyURL);
        // let img = document.createElement("img");
        // img.src = obj[keys[0]].proxyURL;
        // document.body.appendChild(img);
        document.body.style.backgroundImage = `url('${obj[keys[0]].proxyURL}')`;
        console.log("APPEND CHILD");
    }
    
    const messageArray = message.split("‎‎‎‎‏‏‎ ‎");
    new Typewriter('#typewriter', {
        delay:45,
        strings: messageArray,
        autoStart: true,
        deleteSpeed:2,
      });
 }
}

window.onload = ()=> {
    new App();
}

