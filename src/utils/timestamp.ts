const formatTimeString = (time: number) => {
  return time > 9 ? `${time}` : `0${time}`;
};

export const timestamp = () => {
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();

  return [formatTimeString(hour), formatTimeString(minute)].join(":");
};
