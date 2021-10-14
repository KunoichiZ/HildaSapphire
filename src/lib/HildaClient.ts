/* eslint-disable no-else-return */
import { container, SapphireClient } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { PGSQL_DATABASE_HOST, PGSQL_DATABASE_NAME, PGSQL_DATABASE_PORT, PGSQL_DATABASE_URL, PGSQL_DATABASE_USER, DEV, DEV_PREFIX, POOL, CLIENT_OPTIONS } from '#root/config';
import SlashCommandStore from '#lib/structures/SlashCommandStore';
import { Pool } from 'pg';

export class HildaClient extends SapphireClient {
	public ownerID: string | undefined = undefined;
	private _version = [0, 0, 0];

	public constructor() {
		super(CLIENT_OPTIONS);
		this.stores.register(new SlashCommandStore());
	}

	public get invite() {
		return `https://discord.com/oauth2/authorize?client_id=${this.user!.id}&permissions=2150943808&scope=bot%20applications.commands`;
	}

	public get version() {
		const versionStr = this._version.join('.');
		return versionStr;
	}

	public fetchPrefix = async (message: Message) => {
		let prefix = '';
		if (DEV) return DEV_PREFIX;
		else {
			const selectQuery = `SELECT id, prefix FROM guild WHERE id=${message.guild?.id}`;
			POOL.query(selectQuery, (err, res) => {
				if (err) {
					return console.log(err.stack);
				} else {
					prefix = res.rows[0].prefix;
					return prefix;
				}
			});
		}
		return prefix;
	}

	public async login(token?: string) {
		container.database = new Pool({
			connectionString: PGSQL_DATABASE_URL,
			port: PGSQL_DATABASE_PORT,
			host: PGSQL_DATABASE_HOST,
			database: PGSQL_DATABASE_NAME,
			user: PGSQL_DATABASE_USER,
		})
		container.database.connect((err: any) => {
			if (err) throw err;
			console.log('Connected to PostgresSQL');
		})
		return super.login(token);
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		database: Pool;
	}
}