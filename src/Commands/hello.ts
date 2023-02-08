import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import botCommand from "../Structures/botCommand";

export default class hello extends botCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Return the bots current ping!")
        .toJSON()
    );
  }

  public async execute(
    interaction: ChatInputCommandInteraction,
    client: Client
  ) {
    interaction.reply({ content: `\`${client.ws.ping} ms\``, ephemeral: true });
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