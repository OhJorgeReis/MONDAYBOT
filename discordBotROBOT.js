const {Client, MessageEmbed} = require("discord.js");
const {Board, Led, Servo} = require("johnny-five");

class DiscordBotRobot{
    constructor(token, win){
        console.log("Bot start");

        this.win = win;

        this.client = new Client();
        this.client.on("ready", this.onReady.bind(this));
        this.client.on("message", this.onMessage.bind(this));
        this.client.login(token);
        this.initArduino();
    }

    initArduino(){
        this.board = new Board({repl:false});
        this.board.on("ready", this.onBoardReady.bind(this));
    }
    onBoardReady(){
        console.log("Board ready");
        this.servo = new Servo(7);
    }

    onReady(){
        console.log("BOT READY");
    }

    onMessage(message){
        const receivedEmbed = message.embeds[0];
        if(receivedEmbed){
        this.win.webContents.send("messageDiscord", receivedEmbed);
 } else {
    this.win.webContents.send("messageDiscord", message.content);
    if (message.content == "Hello"){
        this.servo.sweep();
    }
    if (message.content == "stop"){
        this.servo.stop();
             }
        }
    }
}

module.exports = {DiscordBotRobot};