const { Client, GatewayIntentBits, Collection } = require('discord.js'), fs = require("fs"), path = require('path'), express = require("express"), os = require("os");

class MusicBot extends Client {
    constructor(options) {
        super(options);
        this.config = require("../config/config");
        this.discord = require("discord.js");
        this.fs = require("fs");
        this.path = require("path");
        this.figlet = require("figlet");
        this.os = require("os");
        this.ms = require("ms");
        this.app = express();
        this.cache = {};
        this.cache = new Collection();
        this.commands = new Collection();
        this.events = new Collection();
        this.buttons = new Collection();
        this.selectMenus = new Collection();
        this.modal = new Collection();
        this.emoji = { "upvote": "👍", "downvote": "👎", "error": "❌", "success": "✅", "warning": "⚠️" }
        this.Logger = function (str, options) {
            let build = [];
            if (options.color == 'red') options.color = '31';
            if (options.color == 'blue') options.color = '34';
            if (options.color == 'yellow') options.color = '33';
            if (options.color == 'green') options.color = '32';
            if (options.color == 'cyan') options.color = '36';
            if (options.bold) build.push(`\x1b[1m`);
            if (options.color) build.push(`\x1b[${options.color}m`);
            if (options.title) build.push(`[${options.title}]: \x1b[0m`);
            console.log(`${build.join('')}${str}`);
        };
    };
};

var bot = new MusicBot({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});

if (fs.existsSync(path.join("src", "commands"))) {
    fs.readdirSync(path.join("src", "commands")).forEach(function (file) {
        let cmd = require(`./commands/${file}`);
        if (!cmd.info) return;
        bot.commands.set(cmd.info.name, cmd);
    });
};
if (fs.existsSync(path.join("src", "components"))) {
    fs.readdirSync(path.join("src", "components")).forEach(async function (componentType) {
        if (!["buttons", "contextMenus", "modals", "selectMenus"].includes(componentType)) return;
        fs.readdirSync(path.join("src", "components", componentType)).forEach(function (component) {
            let run = require(`./components/${componentType}/${component}`);
            component = component.split(".")[0];
            if (run.info) { run.info.data.name = component; run.info.data.module = componentType };
            switch (componentType) {
                case "buttons": {
                    bot.buttons.set(component, run);
                    break;
                }
                case "modals": {
                    bot.modal.set(component, run);
                    break;
                }
            };
        });
    });
};
if (fs.existsSync(path.join("src", "events"))) {
    fs.readdirSync(path.join("src", 'events')).forEach(async function (e) {
        const name = e.split('.')[0];
        const event = require(`./events/${e}`);
        bot.on(name, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${e}`)];
    });
};

require(`./starter`)(bot);

process.on('uncaughtException', async function (e) {
    bot.Logger(e.stack, { title: "error", color: "red" });
});
process.on('unhandledRejection', async function (e) {
    bot.Logger(e.stack, { title: "error", color: "red" });
});

module.exports = { bot };