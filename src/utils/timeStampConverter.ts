export const convertTimestampToDate = (timestamp: any): Date => {
  return timestamp?.toDate() || new Date();
};
