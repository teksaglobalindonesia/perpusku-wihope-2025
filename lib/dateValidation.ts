export const DateValidation = (date: string) => {
  const dbDate = new Date(date);
  const today = new Date();

  return (
    dbDate.getDate() === today.getDate() &&
    dbDate.getMonth() === today.getMonth() &&
    dbDate.getFullYear() === today.getFullYear()
  );
};
