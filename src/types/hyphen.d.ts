// The `hyphen` package ships without type declarations.
declare module 'hyphen/*' {
  interface HyphenateOptions {
    hyphenChar?: string
    minWordLength?: number
    debug?: boolean
  }
  export function hyphenateSync(text: string, options?: HyphenateOptions): string
  export function hyphenate(text: string, options?: HyphenateOptions): Promise<string>
}
