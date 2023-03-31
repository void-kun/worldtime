export const addHours = (date: Date, hours: number): Date => {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
};

export const arrayRange = (start: number, stop: number, step = 1) => {
  if (start > stop) return [];
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
};
