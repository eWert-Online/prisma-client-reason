import { DMMF } from '@prisma/generator-helper';
import { codeBlock } from 'common-tags';
import { upperFirst, camelCase } from 'lodash';

class EnumGenerator {
  private enum: DMMF.SchemaEnum;

  constructor(enum_: DMMF.SchemaEnum) {
    this.enum = enum_;
  }

  generate = () => {
    let makeValue = (enumValue: string) => {
      return `| ${upperFirst(camelCase(enumValue))}`;
    };

    return codeBlock`
      module ${this.enum.name} = {
        type t = 
        ${this.enum.values.map(makeValue).join('\n')};
      };
    `;
  };
}

export default EnumGenerator;
