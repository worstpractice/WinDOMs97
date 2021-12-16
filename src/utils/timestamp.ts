import { formatTimeString } from 'src/utils/formatTimeString';

export const timestamp = (): string => {
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();

  return [
    //
    formatTimeString(hour),
    formatTimeString(minute),
  ].join(':');
};
