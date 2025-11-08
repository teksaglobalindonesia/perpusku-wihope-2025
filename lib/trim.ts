export const trim = (data: string | Array<string>): boolean => {
  if (typeof data === 'string') {
    return data.trim() === '' ? false : true;
  }

  if (Array.isArray(data)) {
    return data.every((item) => item.trim() !== '');
  }
  return false;
};
