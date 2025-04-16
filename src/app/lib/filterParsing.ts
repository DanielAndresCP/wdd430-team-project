export function fuseFilters(...args: Array<string | object>) {
  const parsedFilters = [];

  for (const item of args) {
    if (typeof item === "string") {
      try {
        parsedFilters.push(JSON.parse(item));
      } catch {
        continue;
      }
    }

    if (typeof item === "object") {
      parsedFilters.push(item);
    }
  }

  return parsedFilters.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}
