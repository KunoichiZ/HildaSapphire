// Stats command from godfather (https://github.com/Stitch07/godfather) Copyright 2020 Stitch07, used under the AGPL-3.0 License
import { ApplyOptions } from '@sapphire/decorators';
import type { CommandOptions } from '@sapphire/framework';
import { roundNumber } from '@sapphire/utilities';
import { Message, MessageEmbed } from 'discord.js';
import { cpus } from 'os';
import HildaCommand from '#lib/HildaCommand';
import { format } from '#utils/durationFormat';
import { BrandingColors } from '#utils/Branding';

@ApplyOptions<CommandOptions>({
    fullCategory: ['Info'],
	description: 'View bot statistics'
})
export default class StatsCommand extends HildaCommand {
	public async messageRun(message: Message) {
		return message.channel.send({ embeds: [await this.buildEmbed()] });
	}

	private async buildEmbed() {
		const { generalStatistics, serverStatistics } = this;
		return new MessageEmbed()
			.setColor(BrandingColors.Primary)
			.setAuthor(this.container.client.user!.username, this.container.client.user!.displayAvatarURL({ format: 'png' }))
			.addField(
				'Connected To',
				[
					`**Servers**: ${generalStatistics.guilds}`,
					`**Users**: ${generalStatistics.members}`,
					`**Channels**: ${generalStatistics.channels}`
				].join('\n'),
				true
			)
			.addField(
				'Server Stats',
				[
					`**CPU Load**: ${serverStatistics.cpuLoad.map((load) => `${load}%`).join(' | ')}`,
					`**RAM Used**: ${serverStatistics.ramUsed} (Total: ${serverStatistics.ramTotal})`,
					`**Uptime**: ${format(this.container.client.uptime ?? 0)}`
				].join('\n'),
				true
			);
	}

	private get generalStatistics() {
		return {
			guilds: this.container.client.guilds.cache.size.toLocaleString('en-US'),
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			members: this.container.client.guilds.cache.reduce((a, b) => b.memberCount + a, 0).toLocaleString('en-US'),
			channels: this.container.client.channels.cache.size.toLocaleString('en-US')
		};
	}

	private get serverStatistics() {
		const usage = process.memoryUsage();
		return {
			cpuLoad: cpus().map(({ times }) => roundNumber(((times.user + times.nice + times.sys + times.irq) / times.idle) * 10000) / 100),
			ramTotal: `${Math.round(100 * (usage.heapTotal / 1048576)) / 100}MB`,
			ramUsed: `${Math.round(100 * (usage.heapUsed / 1048576)) / 100}MB`
		};
	}
}
