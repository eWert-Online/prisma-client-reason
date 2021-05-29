import { DMMF } from '@prisma/generator-helper';
import { upperFirst, camelCase } from 'lodash';

export const toPrimitiveType = (type: string) => {
  switch (type) {
    case 'Int':
      return 'int';
    case 'Float':
      return 'float';
    case 'String':
      return 'string';
    case 'Boolean':
      return 'bool';
    case 'DateTime':
      return 'string';
    default:
      return `${type}.t`;
  }
};

export const toObjectKey = (field: DMMF.Field) => {
  return `${camelCase(field.name)}`;
};

export const toObjectKeyValue = (field: DMMF.Field) => {
  return `${toObjectKey(field)}: ${toObjectKey(field)}`;
};

export const toObjectType = (field: DMMF.Field) => {
  let type = toPrimitiveType(field.type);

  if (field.isList) {
    type = `list<${type}>`;
  }

  if (!field.isRequired) {
    type = `option<${type}>`;
  }

  return `${toObjectKey(field)}: ${type}`;
};

export const toNamedArgumentType = (field: DMMF.Field) => {
  let type = toPrimitiveType(field.type);

  if (field.isList) {
    type = `list<${type}>`;
  }

  if (!field.isRequired) {
    type = `${type}=?`;
  }

  return `~${toObjectKey(field)}: ${type}`;
};

export const toNamedArgument = (field: DMMF.Field) => {
  if (!field.isRequired) {
    return `~${toObjectKey(field)}=?`;
  }

  let type = toPrimitiveType(field.type);

  if (field.isList) {
    type = `list<${type}>`;
  }

  return `~${toObjectKey(field)}: ${type}`;
};
