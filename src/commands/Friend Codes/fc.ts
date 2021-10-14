import { POOL } from '#root/config';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'Gives your Switch friend code or another user\'s Switch friend code',
	subCommands: ['add', 'other', { input: 'own', default: true }]
})
export class FriendCodeCommand extends SubCommandPluginCommand {
	// Anyone should be able to view the result, but not modify
	public async other(message: Message) {
		return send(message, 'Showing!');
	}

	public async add(message: Message, args: Args) {
        const id = message.author.id as string;
        const fc = await args.pick('string').catch(() => null);
        const switch_name = await args.pick('string').catch(() => null);
        // console.log(fc, switch_name)
        const selectQuery = `SELECT id, switch_fc, switch_name FROM "user" WHERE id=${id}`;
        const insertIntoQuery = {
			text: 'INSERT INTO "user"(id) VALUES($1)',
			values: [id]
		};
        const updateQuery = `UPDATE "user" SET switch_fc = '${fc}', switch_name = '${switch_name}' WHERE id = ${id}`;
        if (!fc) return message.channel.send('You can\'t add an empty friend code!')
        if (!switch_name) return message.channel.send('You can\'t add an empty Switch name!')
        else {
            POOL.query(selectQuery, (err, res) => {
				if (err) {
					return console.log(err.stack);
				} else if(res.rows[0].id === id) {
                    POOL.query(updateQuery, (err) => {
						if (err) {
							return console.log(err.stack);
						} else {
							return message.channel.send(`Your Nintendo Switch FC been set to ${fc} and your Switch name has been set to ${switch_name}`);
						}
					});
                } else if (res.rows[0] === undefined) {
					POOL.query(insertIntoQuery);
					POOL.query(updateQuery, (err) => {
						if (err) {
							return console.log(err.stack);
						} else {
							return message.channel.send(`Your Nintendo Switch FC been set to ${fc} and your Switch name has been set to ${switch_name}`);
						}
					});
				} else {
					return message.channel.send("You've already added a Nintendo Switch FC!");
				}
			});
        }
        return;
	}

	public async own(message: Message) {
        const id = message.author.id;
        const selectQuery = `SELECT id, switch_fc, switch_name, username FROM "user" WHERE id=${id}`;
        // const selectQuery = `SELECT id, prefix, quotechannel, adminrole, modrole, disabledcommands FROM guild WHERE id=${id}`;
        POOL.query(selectQuery, (err, res) => {
			if (err) {
				return console.log(err.stack);
			} else {
				let switch_fc = res.rows[0].switch_fc;
                if(switch_fc === null || switch_fc === '' || switch_fc === undefined) {
                    message.channel.send(`You have not entered a Switch FC! Please use \`${this.container.client.fetchGuildPrefix}fc add\` to add it!`);
                } else {
                    const member = message.guild?.members.cache.get(message.author.id);
                    const fcEmbed = new MessageEmbed()
                        .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL())
                        .setColor(member?.displayHexColor as `#${string}`)
                        .addField("Friend Code", switch_fc);
                    message.channel.send({ embeds: [fcEmbed] })
                }
            }
        });
	}
}