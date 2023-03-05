import { Indexed } from '../types/types';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const target = lhs;
  const value = rhs;

  Object.keys(value).forEach((key) => {
    /* eslint no-prototype-builtins: "off" */
    if (value.hasOwnProperty(key)) {
      try {
        if (value[key]!.constructor === Object) {
          value[key] = merge(target[key] as Indexed, value[key] as Indexed);
        } else {
          target[key] = value[key];
        }
      } catch (e) {
        target[key] = value[key];
      }
    }
  });

  return target;
}

export default merge;
