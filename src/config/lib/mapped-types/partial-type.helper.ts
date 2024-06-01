/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */

import {
  applyIsOptionalDecorator,
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
  type MappedType,
  type Type,
} from './type-helpers.utils';
import { type RemoveFieldsWithType } from './types/remove-fields-with-type.type';

export function PartialType<T>(classRef: Type<T>) {
  abstract class PartialClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef);
    }
  }

  const propertyKeys = inheritValidationMetadata(classRef, PartialClassType);
  inheritTransformationMetadata(classRef, PartialClassType);

  if (propertyKeys) {
    propertyKeys.forEach((key) => {
      applyIsOptionalDecorator(PartialClassType, key);
    });
  }

  return PartialClassType as MappedType<RemoveFieldsWithType<Partial<T>, Function>>;
}
