const {Client, MessageEmbed} = require("discord.js");

class DiscordBot{
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
        this.win.webContents.send("messageDiscord", {message:message.content, attachment:message.attachments});
        console.log(message.attachments);
    if(message.content.includes("Apollo 11, this is Houston. Do you read?")){
        setTimeout(() => {
        message.channel.send("I'm at the foot of the ladder. The surface appears to be very, very fine grained, as you get close to it. It's almost like a powder. Down there, it's very fine. ‎", {
            files: [
                "./moon4.jpg"
            ]
        });
        console.log(message);
        }, 5000);
    }

    if (message.content.includes("I'm at the foot of the ladder.")){
        setTimeout(() => {
        message.channel.send("I'm going to step off the ship now. ‎",{
            files: [
                "./moon3.jpg"
            ]
        });
    }, 13000);
    }

    if (message.content.includes("I'm going to step off the ship now.")){
        setTimeout(() => {
        message.channel.send("This is one small step for man, one giant leap for humankind. ‎", {

        });
    }, 5500);
    }

    if (message.content.includes("This is one small step for man, one giant leap for humankind.")){
        setTimeout(() => {
        message.channel.send("It has a stark beauty all it's own. It's like much of the high desert of the United States. It's different... but it's very pretty out here. ", {
            files: [
                "./moon6.jpeg"
            ]
        });
    }, 7500);

    }

    if (message.content.includes("It has a stark beauty all it's own. It's like much of the high desert of the United States. It's different... but it's very pretty out here. ")){
        setTimeout(() => {
            message.channel.send("It's beautiful. ‎", {
                files: [
                    "./moon5.jpeg"
                ]
            });
        }, 2500);
    }
 }
}

module.exports = {DiscordBot};