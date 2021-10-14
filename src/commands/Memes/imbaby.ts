import { ApplyOptions } from '@sapphire/decorators';
import type { CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import HildaCommand from '#lib/HildaCommand';

@ApplyOptions<CommandOptions>({
    fullCategory: ['Memes'],
	aliases: ['baby'],
    description: 'Sends the im baby image' 
})
export default class ImBabyCommand extends HildaCommand {
    public async run(message: Message) {
        message.channel.send({ files: ['./src/lib/data/images/imbaby.png'] });
        
    }
}