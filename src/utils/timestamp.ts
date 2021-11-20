import { formatTimeString } from './formatTimeString';

export const timestamp = () => {
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();

  return [formatTimeString(hour), formatTimeString(minute)].join(':');
};
