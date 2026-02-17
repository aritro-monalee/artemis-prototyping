import classNames from 'classnames';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export const cn = (...inputs: (ClassNameValue | Record<string, boolean>)[]) => {
  return twMerge(classNames(inputs));
};
