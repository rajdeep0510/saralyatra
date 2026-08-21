declare module "leaflet" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const L: any;
  export default L;
  export = L;
}

declare module "next" {
  export interface Metadata {
    title?: string;
    description?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icons?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  export interface NextConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}

declare module "next/font/google" {
  export interface FontOptions {
    variable?: string;
    subsets?: string[];
    weight?: string | string[];
    display?: string;
  }
  export interface FontConfig {
    className: string;
    variable: string;
    style: { fontFamily: string };
  }
  export function Cinzel(options?: FontOptions): FontConfig;
  export function Plus_Jakarta_Sans(options?: FontOptions): FontConfig;
  export function Geist(options?: FontOptions): FontConfig;
  export function Geist_Mono(options?: FontOptions): FontConfig;
}
