import { ApplyOptions } from '@sapphire/decorators';
import type { CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import HildaCommand from '#lib/HildaCommand';

@ApplyOptions<CommandOptions>({
    fullCategory: ['Memes'],
	description: 'Replies with "Everyone has uno"'
})
export default class UnoCommand extends HildaCommand {
    public async run(message: Message) {
        const imbaby = this.container.client.emojis.cache.find(emoji => emoji.name === "ImBaby");
        return message.channel.send(`${imbaby} Everyone has uno, dipshit.`);
    }
}