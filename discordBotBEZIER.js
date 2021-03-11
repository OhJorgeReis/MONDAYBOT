const {Client, MessageEmbed} = require("discord.js");

class DiscordBotBEZIER{
    constructor(token, win){
        console.log("Bot start");

        this.win = win;

        this.client = new Client();
        this.client.on("ready", this.onReady.bind(this));
        this.client.on("message", this.onMessage.bind(this));
        this.client.login(token);
    }
    
    onReady(){
        console.log("BOT READY");
    }

    onMessage(message){
        const received = message[0];
        this.win.webContents.send("messageDiscord", message.content);
        // console.log(message.attachments);
        
        // if(message.content.includes("1")){
        //     config.curvesNum = config.curvesNum + 1;
        //     message.channel.send("let's add 1‎", {
        //     });
        // }
    }
}

module.exports = { DiscordBotBEZIER };