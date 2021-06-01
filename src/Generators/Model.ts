import { DMMF } from '@prisma/generator-helper';
import { codeBlock } from 'common-tags';
import {
  toObjectType,
  toNamedArgument,
  toNamedArgumentType,
  toObjectKeyValue,
} from '../helpers';
import InputsGenerator from './Inputs';

class ModelsGenerator {
  private model: DMMF.Model;

  constructor(model: DMMF.Model) {
    this.model = model;
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
    const hasRelations = model.fields.some((field) => field.kind === 'object');
    return {
      rei: codeBlock`
        let create: (
          prismaClient,
          ~select: Select.t=?,
          ${hasRelations ? '~include_: Include.t=?,' : ''}
          ~data: CreateInput.t,
          unit
        ) => Promise.t<t>;
      `,
      re: codeBlock`
        let create = (
          prismaClient,
          ~select=?,
          ${hasRelations ? '~include_=?,' : ''}
          ~data,
          ()
        ) => {
          Externals.${model.name}.Create.make(
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
    const hasRelations = model.fields.some((field) => field.kind === 'object');
    // ~orderBy: ${model.name}.OrderByInput.t=?,
    return {
      rei: codeBlock`
        let findMany: (
          prismaClient,
          ~select: Select.t=?,
          ${hasRelations ? '~include_: Include.t=?,' : ''}
          ~where: WhereInput.t=?,
          ~skip: int=?,
          ~after: WhereUniqueInput.t=?,
          ~before: WhereUniqueInput.t=?,
          ~first: int=?,
          ~last: int=?,
          unit
        ) => Promise.t<array<t>>;
      `,
      re: codeBlock`
        let findMany = (
          prismaClient,
          ~select=?,
          ${hasRelations ? '~include_=?,' : ''}
          ~where=?,
          ~orderBy=?,
          ~skip=?,
          ~after=?,
          ~before=?,
          ~first=?,
          ~last=?,
          ()
        ) => {
          Externals.${model.name}.FindMany.make(
            prismaClient,
            {
              select: select,
              ${hasRelations ? 'include_: include_,' : ''}
              where: where,
              orderBy: orderBy,
              skip: skip,
              after: after,
              before: before,
              first: first,
              last: last,
            }
          );
        };
      `,
    };
  };

  generate = () => {
    const { model } = this;
    const inputsGenerator = new InputsGenerator(model);

    const inputs = inputsGenerator.generate();

    return codeBlock`
      ${model.name} : {
        ${this.base(model).rei}
        ${inputs.rei}
        ${this.create(model).rei}
        ${this.findMany(model).rei}
      } = {
        ${this.base(model).re}
        ${inputs.re}
        ${this.create(model).re}
        ${this.findMany(model).re}
      }
    `;
  };
}

export default ModelsGenerator;
