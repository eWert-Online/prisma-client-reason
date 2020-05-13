import { DMMF } from '@prisma/generator-helper';
import { codeBlock } from 'common-tags';

class ExternalsGenerator {
  private models: DMMF.Model[];

  constructor(models: DMMF.Model[]) {
    this.models = models;
  }

  private make = () => {
    return codeBlock`
      [@bs.module "@prisma/client"] [@bs.new]
      external make: unit => prismaClient = "PrismaClient";
    `;
  };

  private connect = () => {
    return codeBlock`
      [@bs.send]
      external connect: (prismaClient) => Promise.t(unit) = "connect";
    `;
  };

  private disconnect = () => {
    return codeBlock`
      [@bs.send]
      external disconnect: (prismaClient) => Promise.t(unit) = "disconnect";
    `;
  };

  private findOne = (model: DMMF.Model) => {
    return {
      rei: codeBlock`
        
      `,
      re: codeBlock`
        
      `,
    };
  };

  private findMany = (model: DMMF.Model) => {
    return codeBlock`
      
    `;
  };

  private create = (model: DMMF.Model) => {
    const hasRelations = model.fields.some(
      (field) => field.kind === 'relation',
    );
    return codeBlock`
      type t = {
        select: option(${model.name}.Select.t),
        ${hasRelations ? `include_: option(${model.name}.Include.t),` : ''}
        data: ${model.name}.CreateInput.t
      };

      [@bs.send] [@bs.scope "${model.name.toLowerCase()}"]
      external create: 
        (prismaClient, t) => Promise.t(${model.name}.t) = "create";
    `;
  };

  private update = (model: DMMF.Model) => {
    return codeBlock`
      
    `;
  };

  private updateMany = (model: DMMF.Model) => {
    return codeBlock`
      
    `;
  };

  private upsert = (model: DMMF.Model) => {
    return codeBlock`
      
    `;
  };

  private delete = (model: DMMF.Model) => {
    return codeBlock`
      
    `;
  };

  private deleteMany = (model: DMMF.Model) => {
    return codeBlock`
      
    `;
  };

  private count = (model: DMMF.Model) => {
    return codeBlock`
      
    `;
  };

  generate = () => {
    return codeBlock`
        and Externals: {
          ${this.make()}
          ${this.connect()}
          ${this.disconnect()}
          ${this.models
            .map((model) => {
              return codeBlock`
                module ${model.name}: {
                  ${this.create(model)}
                }
              `;
            })
            .join('\n\n')}
        } = Externals
      `;
  };
}

export default ExternalsGenerator;
