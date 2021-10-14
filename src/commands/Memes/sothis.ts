import { ApplyOptions } from '@sapphire/decorators';
import type { CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import HildaCommand from '#lib/HildaCommand';

@ApplyOptions<CommandOptions>({
    fullCategory: ['Memes'],
	description: 'Sends the So This Wooper meme'
})
export default class SothisCommand extends HildaCommand {
    public async run(message: Message) {
        message.channel.send({ files: ['./src/lib/data/images/sothis.jpeg'] });
        
    }
}