export const formatTimeString = (time: number) => {
  return time > 9 ? `${time}` : `0${time}`;
};
