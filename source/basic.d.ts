export type Class<T, Arguments extends unknown[] = any[]> = Constructor<T, Arguments> & {prototype: T};

export type Constructor<T, Arguments extends unknown[] = any[]> = new(...arguments_: Arguments) => T

export type JsonObject = {[Key in string]?: JsonValue};

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type JsonPrimitive = string | number | boolean | null;

export type JsonArray = JsonValue[];