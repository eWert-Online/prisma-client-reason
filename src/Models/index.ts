import { DMMF } from '@prisma/generator-helper';
import { codeBlock } from 'common-tags';
import {
  toObjectType,
  toNamedArgument,
  toNamedArgumentType,
  toObjectKeyValue,
} from '../helpers';
import InputsGenerator from '../Inputs';

class ModelsGenerator {
  private models: DMMF.Model[];

  constructor(models: DMMF.Model[]) {
    this.models = models;
  }

  private base = (model: DMMF.Model) => {
    return {
      rei: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')}
        };
      `,
      re: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')}
        };
      `,
    };
  };

  private create = (model: DMMF.Model) => {
    const hasRelations = model.fields.some(
      (field) => field.kind === 'relation',
    );
    return {
      rei: codeBlock`
        let create: (
          prismaClient,
          ~select: Select.t=?,
          ${hasRelations ? '~include_: Include.t=?,' : ''}
          ~data: CreateInput.t,
          unit
        ) => Promise.t(t);
      `,
      re: codeBlock`
        let create = (
          prismaClient,
          ~select=?,
          ${hasRelations ? '~include_=?,' : ''}
          ~data,
          ()
        ) => {
          Externals.${model.name}.create(
            prismaClient,
            {
              select: select,
              ${hasRelations ? 'include_: include_,' : ''}
              data: data,
            }
          );
        };
      `,
    };
  };

  private findMany = (model: DMMF.Model) => {
    return {
      rei: codeBlock`
        type t = {
          /**
           * Select specific fields to fetch from the ${model.name}
          **/
          select: option(Select.t),
          /**
           * Choose, which related nodes to fetch as well.
          **/
          include_: option(Include.t),
          /**
           * Filter, which ${model.name}s to fetch.
          **/
          where: option(WhereInput.t),
          /**
           * Determine the order of the ${model.name}s to fetch.
          **/
          orderBy: option(${model.name}OrderByInput.t),
          /**
           * Skip the first \`n\` ${model.name}s.
          **/
          skip: option(int),
          /**
           * Get all ${model.name}s that come after the ${model.name} you provide with the current order.
          **/
          after: option(WhereUniqueInput.t),
          /**
           * Get all ${model.name}s that come before the ${model.name} you provide with the current order.
          **/
          before: option(WhereUniqueInput.t),
          /**
           * Get the first \`n\` ${model.name}s.
          **/
          first: option(int),
          /**
           * Get the last \`n\` ${model.name}s.
          **/
          last: option(int)
        };

        let make: t => list(unit);
      `,
      re: codeBlock`
        type t = {
          select: option(Select.t),
          include_: option(Include.t),
          where: option(WhereInput.t),
          orderBy: option(${model.name}OrderByInput.t),
          skip: option(int),
          after: option(WhereUniqueInput.t),
          before: option(WhereUniqueInput.t),
          first: option(int),
          last: option(int)
        };

        let make = (args: t) => [()];
      `,
    };
  };

  generate = () => {
    return (
      'module rec ' +
      this.models
        .map((model) => {
          const inputsGenerator = new InputsGenerator(model);
          const inputs = inputsGenerator.generate();
          return codeBlock`
            ${model.name} : {
              ${this.base(model).rei}
              ${inputs.rei}
              ${this.create(model).rei}
            } = {
              ${this.base(model).re}
              ${inputs.re}
              ${this.create(model).re}
            }
          `;
        })
        .join('\n and \n')
    );
  };
}

export default ModelsGenerator;
