import { ActivityType, ActivityOptions } from "discord.js";
import bot from "../Structures/bot";
import botEvent from "../Structures/botEvent";
import { getAllFiles } from "../Util/functions";

export default class readyEvent extends botEvent<"ready"> {
  constructor(client: bot) {
    super(client, "ready", true);
  }

  public async execute() {
    const commandFiles = getAllFiles("./src/commands");
    for (const file of commandFiles) {
      const command = import(`../.${file}`);
      await command.then((module) => {
        const command = new module.default();
        if (command.data) this.client.commands.set(command.data.name, command);
        if (command.cmdata)
          this.client.contextCommands.set(command.cmdata.name, command);
      });
    }

    console.log(`Logged in to ${this.client.user?.tag}`);

    let presence: ActivityOptions = {
      name: `${this.client.guilds.cache.size} servers!`,
      type: ActivityType.Watching,
    };
    this.client.user?.setPresence({ activities: [presence] });

    setInterval(() => {
      let presence: ActivityOptions = {
        name: `${this.client.guilds.cache.size} servers!`,
        type: ActivityType.Watching,
      };
      this.client.user?.setPresence({ activities: [presence] });
    }, 60000);
  }
}

//===================================//
//                                   //
//      Work from Omega Studios      //
//          Development by:          //
//            Lucius#2366            //
//        All Rights Reserved        //
//                                   //
//===================================//