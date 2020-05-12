import { DMMF } from '@prisma/generator-helper';
import { codeBlock } from 'common-tags';
import {
  toObjectType,
  toNamedArgument,
  toNamedArgumentType,
  toObjectKeyValue,
} from '../helpers';

class InputsGenerator {
  private model: DMMF.Model;
  private hasRelations: boolean;

  constructor(model: DMMF.Model) {
    this.model = model;
    this.hasRelations = model.fields.some((field) => field.kind === 'relation');
  }

  private FindOneArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: option(WhereUniqueInput.t),
        };

        let make: (
          ~select: Select.t=?,
          ${this.hasRelations ? '~include_: Include.t=?,' : ''}
          ~where: WhereUniqueInput.t=?,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: option(WhereUniqueInput.t),
        };

        let make = (
          ~select=?,
          ${this.hasRelations ? '~include_=?,' : ''}
          ~where=?,
          ()
        ) => {
          select: select,
          ${this.hasRelations ? 'include_: include_,' : ''}
          where: where,
        };
      `,
    };
  };

  private FindManyArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: option(WhereInput.t),
          orderBy: option(${model.name}OrderByInput.t),
          skip: option(int),
          after: option(WhereUniqueInput.t),
          before: option(WhereUniqueInput.t),
          first: option(int),
          last: option(int)
        };

        let make: (
          ~select: Select.t=?,
          ${this.hasRelations ? '~include_: Include.t=?,' : ''}
          ~where: WhereInput.t=?,
          ~orderBy: ${model.name}OrderByInput.t=?,
          ~skip: int=?,
          ~after: WhereUniqueInput.t=?,
          ~before: WhereUniqueInput.t=?,
          ~first: int=?,
          ~last: int=?,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: option(WhereInput.t),
          orderBy: option(${model.name}OrderByInput.t),
          skip: option(int),
          after: option(WhereUniqueInput.t),
          before: option(WhereUniqueInput.t),
          first: option(int),
          last: option(int)
        };

        let make = (
          ~select=?,
          ${this.hasRelations ? '~include_=?,' : ''}
          ~where=?,
          ~orderBy=?,
          ~skip=?,
          ~after=?,
          ~before=?,
          ~first=?,
          ~last=?,
          ()
        ) => {
          select: select,
          ${this.hasRelations ? 'include_: include_,' : ''}
          where: where,
          orderBy: orderBy,
          skip: skip,
          after: after,
          before: before,
          first: first,
          last: last
        };
      `,
    };
  };

  private CreateArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          data: CreateInput.t
        };

        let make: (
          ~select: Select.t=?,
          ${this.hasRelations ? '~include_: Include.t=?,' : ''}
          ~data: CreateInput.t,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          data: CreateInput.t
        };

        let make = (
          ~select=?,
          ${this.hasRelations ? '~include_=?,' : ''}
          ~data,
          (),
        ) => {
          select: select,
          ${this.hasRelations ? 'include_: include_,' : ''}
          data: data
        };
      `,
    };
  };

  private UpdateArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          data: UpdateInput.t,
          where: WhereUniqueInput.t,
        };

        let make: (
          ~select: Select.t=?,
          ${this.hasRelations ? '~include_: Include.t=?,' : ''}
          ~data: UpdateInput.t,
          ~where: WhereUniqueInput.t,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          data: UpdateInput.t,
          where: WhereUniqueInput.t,
        };

        let make = (
          ~select=?,
          ${this.hasRelations ? '~include_=?,' : ''}
          ~data,
          ~where,
          (),
        ) => {
          select: select,
          ${this.hasRelations ? 'include_: include_,' : ''}
          data: data,
          where: where,
        };
      `,
    };
  };

  private UpdateManyArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          where: option(WhereInput.t),
          data: ${model.name}.t
        };

        let make: (
          ~where: WhereInput.t=?,
          ~data: ${model.name}.t,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          where: option(WhereInput.t),
          data: ${model.name}.t
        };

        let make = (
          ~where=?,
          ~data,
          (),
        ) => {
          where: where,
          data: data
        };
      `,
    };
  };

  private UpsertArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: WhereUniqueInput.t,
          create: CreateInput.t,
          update: UpdateInput.t,
        };

        let make: (
          ~select: Select.t=?,
          ${this.hasRelations ? '~include_: Include.t=?,' : ''}
          ~where: WhereUniqueInput.t,
          ~create: CreateInput.t,
          ~update: UpdateInput.t,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: WhereUniqueInput.t,
          create: CreateInput.t,
          update: UpdateInput.t,
        };

        let make = (
          ~select=?,
          ${this.hasRelations ? '~include_=?,' : ''}
          ~where,
          ~create,
          ~update,
          (),
        ) => {
          select: select,
          ${this.hasRelations ? 'include_: include_,' : ''}
          where: where,
          create: create,
          update: update,
        };
      `,
    };
  };

  private DeleteArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: WhereUniqueInput.t,
        };

        let make: (
          ~select: Select.t=?,
          ${this.hasRelations ? '~include_: Include.t=?,' : ''}
          ~where: WhereUniqueInput.t,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          select: option(Select.t),
          ${this.hasRelations ? 'include_: option(Include.t),' : ''}
          where: WhereUniqueInput.t,
        };

        let make = (
          ~select=?,
          ${this.hasRelations ? '~include_=?,' : ''}
          ~where,
          (),
        ) => {
          select: select,
          ${this.hasRelations ? 'include_: include_,' : ''}
          where: where,
        };
      `,
    };
  };

  private DeleteManyArgs = () => {
    const model: DMMF.Model = this.model;
    return {
      rei: codeBlock`
        type t = {
          where: option(WhereInput.t),
        };

        let make: (
          ~where: WhereInput.t=?,
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          where: option(WhereInput.t),
        };

        let make = (
          ~where=?,
          (),
        ) => {
          where: where,
        };
      `,
    };
  };

  private Select = () => {
    const model = {
      ...this.model,
      fields: this.model.fields.map((field) => ({
        ...field,
        isRequired: false,
        type: 'Boolean',
      })),
    };
    return {
      rei: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')}
        };
    
        let make: (
          ${model.fields.map(toNamedArgumentType).join(',\n')},
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')}
        };
    
        let make = (
          ${model.fields.map(toNamedArgument).join(',\n')},
          (),
        ) => {
          {
            ${model.fields.map(toObjectKeyValue).join(',\n')}
          };
        };
      `,
    };
  };

  private Include = () => {
    const model: DMMF.Model = {
      ...this.model,
      fields: this.model.fields
        .filter((field) => {
          // FIXME: This is a bug in Prisma...
          // @ts-ignore
          return field.kind == 'object';
        })
        .flatMap((field) => [
          {
            ...field,
            name: field.name,
            kind: 'scalar',
            isRequired: false,
            type: 'Boolean',
            isList: false,
          },
          {
            ...field,
            name: `${field.name}Where`,
            isRequired: false,
            type: `FindMany`,
            isList: false,
          },
        ]),
    };
    return {
      rei: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')}
        };
    
        let make: (
          ${model.fields.map(toNamedArgumentType).join(',\n')},
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')}
        };
    
        let make = (
          ${model.fields.map(toNamedArgument).join(',\n')},
          (),
        ) => {
          {
            ${model.fields.map(toObjectKeyValue).join(',\n')}
          };
        };
      `,
    };
  };

  private WhereInput = () => {
    const model: DMMF.Model = {
      ...this.model,
      fields: this.model.fields.map((field) => ({
        ...field,
        isRequired: false,
      })),
    };
    return {
      rei: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make: (
          ${model.fields.map(toNamedArgumentType).join(',\n')},
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make = (
          ${model.fields.map(toNamedArgument).join(',\n')},
          (),
        ) => {
          {
            ${model.fields.map(toObjectKeyValue).join(',\n')}
          };
        };
      `,
    };
  };

  private WhereUniqueInput = () => {
    const model: DMMF.Model = {
      ...this.model,
      fields: this.model.fields
        .filter((field) => field.isUnique || field.isId)
        .map((field) => ({
          ...field,
          isRequired: false,
        })),
    };
    return {
      rei: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make: (
          ${model.fields.map(toNamedArgumentType).join(',\n')},
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make = (
          ${model.fields.map(toNamedArgument).join(',\n')},
          (),
        ) => {
          {
            ${model.fields.map(toObjectKeyValue).join(',\n')}
          };
        };
      `,
    };
  };

  private CreateInput = () => {
    const model: DMMF.Model = {
      ...this.model,
      fields: this.model.fields.map((field) => {
        console.log(field);
        return {
          ...field,
          isRequired:
            // @ts-ignore
            field.hasOwnProperty('default') || field.isUpdatedAt
              ? false
              : field.isRequired,
        };
      }),
    };
    return {
      rei: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make: (
          ${model.fields.map(toNamedArgumentType).join(',\n')},
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make = (
          ${model.fields.map(toNamedArgument).join(',\n')},
          (),
        ) => {
          {
            ${model.fields.map(toObjectKeyValue).join(',\n')}
          };
        };
      `,
    };
  };

  private UpdateInput = () => {
    const model: DMMF.Model = {
      ...this.model,
      fields: this.model.fields.map((field) => ({
        ...field,
        isRequired: false,
      })),
    };
    return {
      rei: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make: (
          ${model.fields.map(toNamedArgumentType).join(',\n')},
          unit
        ) => t;
      `,
      re: codeBlock`
        type t = {
          ${model.fields.map(toObjectType).join(',\n')},
        };

        let make = (
          ${model.fields.map(toNamedArgument).join(',\n')},
          (),
        ) => {
          {
            ${model.fields.map(toObjectKeyValue).join(',\n')}
          };
        };
      `,
    };
  };

  generate = () => {
    return {
      rei: codeBlock`
        module rec FindOneArgs: {
          ${this.FindOneArgs().rei}
        }
        and FindManyArgs: {
          ${this.FindManyArgs().rei}
        }
        and CreateArgs: {
          ${this.CreateArgs().rei}
        }
        and UpdateArgs: {
          ${this.UpdateArgs().rei}
        }
        and UpdateManyArgs: {
          ${this.UpdateManyArgs().rei}
        }
        and UpsertArgs: {
          ${this.UpsertArgs().rei}
        }
        and DeleteArgs: {
          ${this.DeleteArgs().rei}
        }
        and DeleteManyArgs: {
          ${this.DeleteManyArgs().rei}
        }
        and Select: {
          ${this.Select().rei}
        }
        ${
          this.hasRelations
            ? `
              and Include: {
                ${this.Include().rei}
              }
              `
            : ''
        }
        and WhereInput: {
          ${this.WhereInput().rei}
        }
        and WhereUniqueInput: {
          ${this.WhereUniqueInput().rei}
        }
        and CreateInput: {
          ${this.CreateInput().rei}
        }
        and UpdateInput: {
          ${this.UpdateInput().rei}
        }
      `,
      re: codeBlock`
        module rec FindOneArgs: {
          ${this.FindOneArgs().rei}
        } = {
          ${this.FindOneArgs().re}
        }
        and FindManyArgs: {
          ${this.FindManyArgs().rei}
        } = {
          ${this.FindManyArgs().re}
        }
        and CreateArgs: {
          ${this.CreateArgs().rei}
        } = {
          ${this.CreateArgs().re}
        }
        and UpdateArgs: {
          ${this.UpdateArgs().rei}
        } = {
          ${this.UpdateArgs().re}
        }
        and UpdateManyArgs: {
          ${this.UpdateManyArgs().rei}
        } = {
          ${this.UpdateManyArgs().re}
        }
        and UpsertArgs: {
          ${this.UpsertArgs().rei}
        } = {
          ${this.UpsertArgs().re}
        }
        and DeleteArgs: {
          ${this.DeleteArgs().rei}
        } = {
          ${this.DeleteArgs().re}
        }
        and DeleteManyArgs: {
          ${this.DeleteManyArgs().rei}
        } = {
          ${this.DeleteManyArgs().re}
        }
        and Select: {
          ${this.Select().rei}
        } = {
          ${this.Select().re}
        }
        ${
          this.hasRelations
            ? `
              and Include: {
                ${this.Include().rei}
              } = {
                ${this.Include().re}
              }
              `
            : ''
        }
        and WhereInput: {
          ${this.WhereInput().rei}
        } = {
          ${this.WhereInput().re}
        }
        and WhereUniqueInput: {
          ${this.WhereUniqueInput().rei}
        } = {
          ${this.WhereUniqueInput().re}
        }
        and CreateInput: {
          ${this.CreateInput().rei}
        } = {
          ${this.CreateInput().re}
        }
        and UpdateInput: {
          ${this.UpdateInput().rei}
        } = {
          ${this.UpdateInput().re}
        }
      `,
    };
  };
}

export default InputsGenerator;
