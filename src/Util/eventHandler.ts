import bot from "../Structures/bot";
import { getAllFiles } from "./functions";
import fs from "fs";

export async function registerEvents(client: bot) {
  const events = getAllFiles("./src/Events");
  var registeredEvents = [];
  for (const file of events) {
    await registerEvent(client, `../.${file}`);
    registeredEvents.push(file);
  }
  console.log(
    `Successfully registered ${registeredEvents.length} events!`
  );
}

async function registerEvent(client: bot, path: fs.PathLike) {
  import(`${path}`).then((module) => {
    const event = new module.default(client);
    if (event.once) {
      client.once(event.eventName, async (...args) => {
        event.execute(...args);
      });
    } else {
      client.on(event.eventName, async (...args) => {
        event.execute(...args);
      });
    }
  });
}

//===================================//
//                                   //
//      Work from Omega Studios      //
//          Development by:          //
//            Lucius#2366            //
//        All Rights Reserved        //
//                                   //
//===================================//
