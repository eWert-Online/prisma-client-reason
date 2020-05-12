import { join } from 'path';
import { ensureDir, writeFile } from 'fs-extra';
import { codeBlock } from 'common-tags';
import { generatorHandler, DMMF } from '@prisma/generator-helper';
import makeEnums from './makeEnums';
import ExternalsGenerator from './Externals';
import ModelsGenerator from './Models';

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

    const models = new ModelsGenerator(options.dmmf.datamodel.models);
    const externals = new ExternalsGenerator(options.dmmf.datamodel.models);

    await ensureDir(options.generator.output);
    await writeFile(
      join(options.generator.output, `${options.generator.config.name}.re`),
      codeBlock`
        type prismaClient;

        [@bs.module "@prisma/client"] [@bs.new]
        external make: unit => prismaClient = "PrismaClient";

        /* ENUMS */
        ${makeEnums(options.dmmf.schema.enums)}
        
        ${models.generate()}

        ${externals.generate()}

        let connect = (client, callback) => {
          Externals.connect(client)
          |> Js.Promise.then_(() => {
              callback(None);
              Js.Promise.resolve();
            })
          |> Js.Promise.catch(error => {
              callback(Some(error));
              Js.Promise.resolve();
            })
          |> ignore;
        };

        let disconnect = (client, callback) => {
          Externals.disconnect(client)
          |> Js.Promise.then_(() => {
              callback(None);
              Js.Promise.resolve();
            })
          |> Js.Promise.catch(error => {
              callback(Some(error));
              Js.Promise.resolve();
            })
          |> ignore;
        };
      `,
    );

    return true;
  },
});
