// This file exists merely as a syntax reminder for myself on what destructuring at an arbitrary depth looks like.
//
// Much like Kung-fu, we learn it in the hope that we must never use it.

export const computer = {
  hardware: {
    motherboard: {
      cpu: {
        manufacturer: {
          name: 'Rolands Chark & IT',
        },
      },
    },
  },
} as const;

type Foo = (example: typeof computer) => void;

// prettier-ignore
export const foo: Foo = ({ hardware: { motherboard: { cpu: { manufacturer: name } } } }) => {
  return name;
};
