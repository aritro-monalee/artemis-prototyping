/* eslint-disable @typescript-eslint/no-explicit-any */

export const isObject = (value: any): value is object => {
  return (
    typeof value === 'object' &&
    !isArray(value) &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
};

export const isString = (value: any) => {
  return typeof value === 'string';
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

export const isArray = (value: any): value is any[] => {
  return Array.isArray(value);
};
