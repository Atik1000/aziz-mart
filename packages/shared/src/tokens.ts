/** Design tokens from the Aziz Mart handoff — single source of truth for both apps. */
export const COLORS = {
  green700: '#1d5a3c',
  green900: '#123d29',
  green50: '#e6efe7',
  green25: '#f3f8f4',
  ink: '#17241d',
  ink2: '#3d4a42',
  muted: '#5b665f',
  muted2: '#8a938c',
  disabled: '#a5aaa4',
  bg: '#f8f6f0',
  surface: '#ffffff',
  surface2: '#f3f1ea',
  line: '#e6e2d8',
  line2: '#efece4',
  inputBorder: '#d9d5c9',
  saffron: '#e9b04a',
  saleRed: '#a33b26',
  saleTint: '#fbeee0',
  amberTint: '#fbf1dc',
  amberInk: '#7a5413',
  footerText: '#dfe9e1',
  footerLegal: '#a9bcae',
} as const;

export const TONES: Record<string, string> = {
  sage: '#dfe8dc',
  sand: '#eee5d3',
  clay: '#efdccf',
  sky: '#dae5ec',
  blush: '#f2e0de',
  butter: '#f3eacb',
  mist: '#e5e4ea',
};

/** Colour swatches: key → [label, hex] */
export const COLOR_SWATCHES: Record<string, [string, string]> = {
  black: ['Black', '#1f2120'],
  white: ['White', '#f5f3ed'],
  navy: ['Navy', '#26344d'],
  olive: ['Olive', '#5f6b3f'],
  maroon: ['Maroon', '#6e2632'],
  mustard: ['Mustard', '#c9962e'],
  sky: ['Sky blue', '#9cc0d8'],
  pink: ['Rose', '#d99aa5'],
  green: ['Bottle green', '#1d5a3c'],
  grey: ['Grey', '#9a9c98'],
  beige: ['Beige', '#d8c7a6'],
  teal: ['Teal', '#2f7a78'],
  tan: ['Tan', '#9a6a3e'],
};

/** Format integer taka with the ৳ sign, en-IN grouping per the handoff. */
export const fmt = (n: number): string => '৳' + Number(n).toLocaleString('en-IN');
