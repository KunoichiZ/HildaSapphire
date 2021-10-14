// Command file from godfather (https://github.com/Stitch07/godfather) Copyright 2020 Stitch07, used under the AGPL-3.0 License
import { Command, CommandOptions, PieceContext } from '@sapphire/framework';
// import { sep } from 'path';

export default abstract class HildaCommand extends Command {
	// declare public fullCategory: string[];

	public constructor(context: PieceContext, { name, ...options }: CommandOptions) {
		super(context, { name, ...options });
	}

	// public get category() {
	// 	return this.fullCategory[0] ?? 'General';
	// }

	// /**
	//  * The sub category for the command
	//  * @since 0.0.1
	//  * @type {string}
	//  */
	// public get subCategory() {
	// 	return this.fullCategory[1] ?? 'General';
	// }
}
