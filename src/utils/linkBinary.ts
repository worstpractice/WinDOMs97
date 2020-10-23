// import type { Binary } from "typings/Binary";
// import type { Linker } from "typings/Linker";

// type RefType = "desktopItemRef" | "quickstartAreaItemRef" | "startMenuItemRef";

// const linkerFactory = (binary: Binary, key: RefType) => {
//   const linker: Linker = (ref) => {
//     // NOTE: This is vital.
//     binary[key] = ref;

//     return binary;
//   };

//   return linker;
// };

// export const linkBinary = (binary: Binary) => {
//   return {
//     toDesktopItem: linkerFactory(binary, "desktopItemRef"),
//     toQuickstartAreaItem: linkerFactory(binary, "quickstartAreaItemRef"),
//     toStartMenuItem: linkerFactory(binary, "startMenuItemRef"),
//   } as const;
// };

export { };

