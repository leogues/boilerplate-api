import type { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

function parseSchema<T extends TSchema>(schema: T, data: unknown): Static<T> {
  const converted = Value.Convert(schema, Value.Default(schema, data));

  if (!Value.Check(schema, converted)) {
    const errors = [...Value.Errors(schema, converted)];
    const details = errors.map(e => `  - ${e.path}: ${e.message}`).join('\n');

    throw new Error(`Schema validation failed:\n${details}`);
  }

  return Value.Decode(schema, converted);
}

export { parseSchema };
