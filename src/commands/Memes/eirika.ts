import { ApplyOptions } from '@sapphire/decorators';
import type { CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import HildaCommand from '#lib/HildaCommand';

@ApplyOptions<CommandOptions>({
    fullCategory: ['Memes'],
	aliases: ['hdnotlikeeirika', 'hd'],
    description: 'Sends the HDNotLikeEirika image' 
})
export default class NotLikeEirikaCommand extends HildaCommand {
    public async run(message: Message) {
        message.channel.send({ files: ['./src/lib/data/images/hdnotlikeeirika.png'] });
        
    }
}