// This file exists merely as a syntax reminder for myself on what destructuring at an arbitrary depth looks like.

export const os = {
  motherboard: {
    cpu: {
      manufacturer: "Rolands Chark & IT",
    },
  },
} as const;

export const foo = ({ motherboard: { cpu: manufacturer } }: typeof os) => {
  console.log(manufacturer);
};
