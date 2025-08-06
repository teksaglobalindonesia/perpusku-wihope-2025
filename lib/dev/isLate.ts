export const isLate = (returnDate: string, returnData: any) => {
  if (new Date(returnDate) > new Date() && typeof returnData === 'undefined') {
    return true;
  }

  if (new Date(returnData?.actual_return_date) > new Date(returnDate)) {
    return true;
  }
  return false;
};
