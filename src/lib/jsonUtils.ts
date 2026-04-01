/* eslint-disable @typescript-eslint/no-explicit-any */

export const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + "." : "";
    if (typeof obj[k] === "object" && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};
