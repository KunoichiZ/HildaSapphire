import { ApplyOptions } from '@sapphire/decorators';
import type { CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import HildaCommand from '#lib/HildaCommand';

@ApplyOptions<CommandOptions>({
    fullCategory: ['Memes'],
    aliases: ['iswhy'],
	description: 'Replies with the IS Why gif'
})
export default class WhyCommand extends HildaCommand {
    public async messageRun(message: Message) {
        const whyEmbed = new MessageEmbed()
            .setTitle("IS WHY!?")
            .setImage('https://i.imgur.com/dTWvQGO.gif');
    
        message.channel.send({ embeds: [whyEmbed] });
    }
}