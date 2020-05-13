import { join } from 'path';
import { ensureDir, writeFile } from 'fs-extra';
import { codeBlock } from 'common-tags';
import { generatorHandler } from '@prisma/generator-helper';

import ExternalsGenerator from './Externals';

import ModelGenerator from './Generators/Model';
import EnumGenerator from './Generators/Enum';

const clientVersion = require('../package.json').version;

generatorHandler({
  onManifest() {
    return {
      prettyName: 'Prisma Client ReasonML',
      requiresEngines: ['queryEngine'],
      version: clientVersion,
    };
  },
  onGenerate: async (options) => {
    if (!options.generator.isCustomOutput) {
      console.error('You need to define an output path for the client');
      throw new Error();
    }
    if (!options.generator.config.name) {
      console.error('You need to define a name for the client');
      throw new Error();
    }

    const externals = new ExternalsGenerator(options.dmmf.datamodel.models);

    await ensureDir(options.generator.output);
    await writeFile(
      join(options.generator.output, `${options.generator.config.name}.re`),
      `
        type prismaClient;

        /* ENUMS */
        ${options.dmmf.schema.enums
          .map((type) => new EnumGenerator(type).generate())
          .join('\n\n')}
        
        module rec ${options.dmmf.datamodel.models
          .map((model) => new ModelGenerator(model).generate())
          .join('\n and \n')}

        ${externals.generate()}

        let make = Externals.make;
        let connect = Externals.connect;
        let disconnect = Externals.disconnect;
      `,
    );

    return true;
  },
});
