import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);
global.__maindir = resolve(__dirname, "..");

import { Telegraf } from "telegraf";
import { config } from "./src/config.js";
import CommandHandler from "./src/commands/commands.js";
import * as Menu from "./src/menu.js";
import { handlerSend } from "./src/commands/sendPhoto.js";

export const bot = new Telegraf(config.BOT_TOKEN);

bot.start(ctx => ctx.sendMessage("Welcome", Menu.get()));

bot.on('photo', (ctx) => handlerSend(ctx, false));
bot.on('document', (ctx) => handlerSend(ctx, true));

bot.launch();

Menu.create();
CommandHandler.initialization();

console.log("Bot started!");