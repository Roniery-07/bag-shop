import { Prisma } from "@/generated/prisma"

export type Jsonify<T> = 
    T extends Prisma.Decimal ? number
    : T extends bigint ? number
    : T extends Date ? string
    : T extends (infer U)[] ? Jsonify<U>[]
    : T extends object ? { [K in keyof T]: Jsonify<T[K]>}
    : T;

interface DecimalLike {
  toNumber(): number;
}

function isDecimal(value: unknown): value is DecimalLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toNumber' in value &&                       
    typeof (value as Partial<DecimalLike>).toNumber === 'function' 
  );
}
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object'
      && value !== null
      && !Array.isArray(value)
      && !(value instanceof Date)
      && !(value instanceof Prisma.Decimal);
}

export function jsonify<T>(data: T): Jsonify<T> {
  if (data === null || data === undefined) {
    return data as Jsonify<T>;
  }

  // Arrays
  if (Array.isArray(data)) {
    return data.map(item => jsonify(item)) as Jsonify<T>;
  }

  // Conversions 1-to-1
  if (isDecimal(data))                return data.toNumber() as Jsonify<T>;
  if (typeof data === 'bigint')       return data.toString() as Jsonify<T>;
  if (data instanceof Date)           return data.toISOString() as Jsonify<T>;

  // Plain object → percorre pares chave/valor
  if (isPlainObject(data)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) {
      out[k] = jsonify(v);
    }
    return out as Jsonify<T>;
  }

  // number, string, boolean …
  return data as Jsonify<T>;
}
