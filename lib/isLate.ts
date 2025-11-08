export const isLate = (returnDate: string, returnData: any) => {
  const now = new Date();
  const dueDate = new Date(returnDate);
  const actualReturn = returnData?.actual_return_date
    ? new Date(returnData.actual_return_date)
    : null;

  return (
    (!actualReturn && dueDate < now) || (actualReturn && actualReturn > dueDate)
  );
};
