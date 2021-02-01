export const bookingsType = {
  type: Array,
  validate(arr) {
    return arr.every((el) => typeof el === 'object');
  },
};

export const otherType = 'todo';
