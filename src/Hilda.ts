import 'reflect-metadata';
import '@sapphire/plugin-editable-commands/register';
import '@sapphire/plugin-logger/register';
import { LogLevel } from '@sapphire/framework';
import { HildaClient } from '#lib/HildaClient';
import { TOKENS } from '#root/config';
import SlashCommandStore from '#lib/structures/SlashCommandStore';

export default class Hilda extends HildaClient {
	constructor() {
	  super({
		partials: ["CHANNEL"],
		defaultPrefix: '!',
		regexPrefix: /^(hey +)?hilda[, ]/i,
		caseInsensitiveCommands: true,
		logger: {
			level: LogLevel.Debug
		},
		shards: 'auto',
		intents: [
			'GUILDS',
			'GUILD_MEMBERS',
			'GUILD_BANS',
			'GUILD_EMOJIS_AND_STICKERS',
			'GUILD_VOICE_STATES',
			'GUILD_MESSAGES',
			'GUILD_MESSAGE_REACTIONS',
			'DIRECT_MESSAGES',
			'DIRECT_MESSAGE_REACTIONS'
		],
		presence: {
			activities: [{ name: 'Uno', type: 'PLAYING' }] 
		},
		loadDefaultErrorListeners: true
		
	  });
  
	  this.stores.register(new SlashCommandStore());
	}
}

const client = new Hilda();

client.login(TOKENS.DEV_BOT_TOKEN);