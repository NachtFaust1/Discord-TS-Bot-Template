import bot from "./Structures/bot";
import { GatewayIntentBits, Partials } from "discord.js";
import { token } from "./config.json";

const client = new bot({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.User,
  ],
});

import("./Util/eventHandler").then((module) => module.registerEvents(client));

process.on("uncaughtException", (error) => console.log(error));

client.login(token);

//===================================//
//                                   //
//      Work from Omega Studios      //
//          Development by:          //
//            Lucius#2366            //
//        All Rights Reserved        //
//                                   //
//===================================//