declare module '*.png' {
  const is: string;

  export default is;
}

declare module '*.module.css' {
  const is: { readonly [key in string]: string };

  export default is;
}
