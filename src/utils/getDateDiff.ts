export const getDateDiff = (startDate: Date, endDate: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;

  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / msPerDay) + 1;
};
