declare module linebreak {
  declare class exports {
    constructor(string: string): void;
    nextBreak(): { position: number, required: boolean } | null
  }
}
