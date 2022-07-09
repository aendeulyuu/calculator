export const isInputNumber = (input = '') => {
  return input.match(/[0-9]/g)?.length > 0;
};

export const isOperation = (input = '') => {
  return input.match(/[/*\-+]/g)?.length > 0;
};
