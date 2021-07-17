import Discord, { TextChannel } from "discord.js";

export const isTextChannel = (
  textChannel: Discord.Channel
): textChannel is TextChannel => {
  return textChannel.type === "text";
};
