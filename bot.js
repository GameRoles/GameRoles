//Packages / Paquetes
const Discord = require('discord.js');
const database = require('megadb');
const database2 = require('discord-economy');
const { readdirSync } = require('fs');

// Client
const Client = new Discord.Client();

// Files
const settings = require('./config/settings.json');

//Handler Config.
Client.Commands = new Discord.Collection();

//Handler Commands
for(const file of readdirSync('./Commands/')) {
  
  if(file.endsWith(".js")) {
    
    let fileName = file.substring(0, file.lenght - 3);
    let fileContents = require(`./Commands/${file}`);
    
    Client.Commands.set(fileName, fileContents);
    
  }
  
}

//Handler Events
for(const file of readdirSync('./Events/')) {
  
  if(file.endsWith('.js')) {
    let fileName = file.substring(0, file.lenght - 3);
    let fileContents = require(`./Events/${file}`);
    
    Client.on(fileName, fileContents.bind(null, Client));
    delete require.cache[require.resolve(`./Events/${file}`)]
  }
  
}

Client.login(settings.token)