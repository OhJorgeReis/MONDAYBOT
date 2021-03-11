const { RichPresenceAssets } = require("discord.js");
const {ipcRenderer} = require("electron");
const robot = require("robotjs");

class AppRobot{
    constructor (){
        console.log("LOG depuis la page html Robot");
        this.initListeners();
    }
    initListeners(){
        ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
    }


onMessage(event, message){
    if(message == "hello"){
            //robot.setMouseDelay(2);
            this.screenSize = robot.getScreenSize();
            const height = this.screenSize.height;
            //const width = screenSize.width;
            this.radius = height/2-10;
            this.angle = -90;
            this.counter = 0;
            this.draw();
    }
}
            draw() {
                if(this.counter < 2){
                    const width = this.screenSize.width;
                    const height = this.screenSize.height;

                    this.angle +=0.2;
                    const x =
                    width/2 + Math.cos((this.angle * Math.PI) /180)* this.radius;
                    const y =
                    height/2 + Math.sin((this.angle * Math.PI) /180)* this.radius;
                    robot.moveMouse(x,y);
                    if(this.angle >= 360) {
                        this.counter++;
                        this.angle=0;
                    }
                    requestAnimationFrame(this.draw.bind(this));
                }
            }
        }
    
window.onload = ()=>{
    new AppRobot();
}