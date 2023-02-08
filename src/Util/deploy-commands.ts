import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { clientId, token } from "../config.json";
import { getAllFiles } from "./functions";

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
    const commandFiles = getAllFiles("./src/Commands");

    for (const file of commandFiles) {
      const command = import(`../.${file}`);
      await command.then((module) => {
        const command = new module.default();
        if (command.data) commands.push(command.data);
        if (command.cmdata) commands.push(command.cmdata);
      });
    }
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log(
      `Successfully reloaded application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

//===================================//
//                                   //
//      Work from Omega Studios      //
//          Development by:          //
//            Lucius#2366            //
//        All Rights Reserved        //
//                                   //
//===================================//