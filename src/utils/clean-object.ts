export function cleanObject<T extends Record<string, unknown>>(obj: T) {
  const cleanedObj: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value == undefined) {
      return;
    }

    cleanedObj[key] = value;
  });

  return cleanedObj as { [K in keyof T]: Exclude<T[K], undefined> };
}
