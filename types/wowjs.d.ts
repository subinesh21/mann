declare module 'wowjs' {
  class WOW {
    constructor(options?: { live?: boolean; callback?: () => void });
    init(): void;
  }
  interface WOWExport {
    WOW: typeof WOW;
  }
  const def: WOWExport;
  export default def;
}
