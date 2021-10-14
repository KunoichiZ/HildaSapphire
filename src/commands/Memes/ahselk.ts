import { ApplyOptions } from '@sapphire/decorators';
import type { CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import HildaCommand from '#lib/HildaCommand';

@ApplyOptions<CommandOptions>({
    fullCategory: ['Memes'],
	description: 'Sends the AhSelk image'
})
export default class AhSelkCommand extends HildaCommand {
    public async run(message: Message) {
        message.channel.send({ files: ['./src/lib/data/images/ahselk.png'] });
        
    }
}