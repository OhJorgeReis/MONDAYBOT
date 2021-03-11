 const {app, BrowserWindow} = require("electron");

 let win = null;

 function createWindow(){
    win = new BrowserWindow({
        with:1024,
        height:768,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
        }
    });
    
    //win.loadFile("index.html");
    win.loadFile("indexBEZIER.html");
    //win.loadFile("indexRobot.html");
    win.setFullScreen(true);
 }

 function initBot(){
    //const DiscordBot = require("./DiscordBot").DiscordBot;
    //new DiscordBot("ODE1ODYyOTIzMDMyMzk1Nzc5.YDyljg.TNSrS3TkZ6-IG_uaVq7r-p45a-E", 
    //win
    //);

    //const DiscordBotRobot = require("./DiscordBotRobot").DiscordBotRobot;
    //new DiscordBotRobot("ODE1ODYyOTIzMDMyMzk1Nzc5.YDyljg.TNSrS3TkZ6-IG_uaVq7r-p45a-E", 
    //win
    //);

    const DiscordBotBEZIER = require("./discordBotBEZIER.js").DiscordBotBEZIER;
    new DiscordBotBEZIER("ODE1ODYyOTIzMDMyMzk1Nzc5.YDyljg.TNSrS3TkZ6-IG_uaVq7r-p45a-E", 
    win
    );
 }

 app.allowRendererProcessReuse=false;
 app.whenReady().then(createWindow).then(initBot);
 app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
 });