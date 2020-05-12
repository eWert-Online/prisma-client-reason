import { DMMF } from '@prisma/generator-helper';
import { codeBlock } from 'common-tags';
import { upperFirst, camelCase } from 'lodash';

export default (enums: DMMF.SchemaEnum[]) => {
  return enums
    .map(({ name, values }) => {
      let makeValue = (enumValue: string) => {
        return `| ${upperFirst(camelCase(enumValue))}`;
      };

      return codeBlock`
      module ${name} = {
        type t = 
        ${values.map(makeValue).join('\n')};
      };
    `;
    })
    .join('\n\n');
};
