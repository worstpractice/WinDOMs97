// prettier-ignore
export const formatTimeString = (time: number) => time > 9
  ? `${time}`
  : `0${time}`;
