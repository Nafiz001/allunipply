type GridFillOptions = {
  columns: number[];
  minItems?: number;
};

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function lcmOf(values: number[]): number {
  const positive = values.filter((value) => Number.isFinite(value) && value > 0);
  if (!positive.length) return 1;
  return positive.reduce((acc, value) => lcm(acc, value), 1);
}

export function fillGridRows<T extends { id: string }>(
  items: T[],
  fallback: T[],
  options: GridFillOptions,
): T[] {
  if (!items.length && !fallback.length) return [];

  const columnsLcm = lcmOf(options.columns);
  const minItems = Math.max(0, options.minItems ?? 0);
  const baseTarget = Math.max(items.length, minItems);
  const targetCount = baseTarget === 0 ? 0 : Math.ceil(baseTarget / columnsLcm) * columnsLcm;

  if (targetCount === 0) return [];

  const pool = fallback.length ? fallback : items;
  const result: T[] = [...items];
  const usedIds = new Set(result.map((item) => item.id));

  for (const candidate of pool) {
    if (result.length >= targetCount) break;
    if (usedIds.has(candidate.id)) continue;
    result.push(candidate);
    usedIds.add(candidate.id);
  }

  if (!pool.length) {
    return result.slice(0, targetCount);
  }

  let duplicateIndex = 0;
  while (result.length < targetCount) {
    const candidate = pool[duplicateIndex % pool.length];
    result.push({ ...candidate, id: `${candidate.id}-dup-${duplicateIndex}` });
    duplicateIndex += 1;
  }

  return result.slice(0, targetCount);
}
