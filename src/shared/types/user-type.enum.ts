// https://www.typescriptlang.org/play?#code/C4TwDgpgBAKjUF4oCICCyoB8UCEPeUEIQZAbgFgAoSgMwFcA7AY2AEsB7eqAEzYGU2AthGAALFvQDmAdRaiAqvXb0AFGABcsGAEpKAb0pRDUAPTGoAOkuUAvpUo9+Q0eOmyRCpcrTIt5KhQh6WgEoAFFQvQMjVAAaKMMcOIojKABhGzsKOiZWDm4+QWExSRlRUKCBVQ1wnQp9ZKNTCysKW38HQucSt3Lg5XDzVF9MoA
// https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant

// export enum UserType {
//   Pro = 'pro',
//   Regular = 'regular'
// }

export const UserType = {
  Pro: 'pro',
  Regular: 'regular'
} as const;
export type UserType = typeof UserType[keyof typeof UserType];

