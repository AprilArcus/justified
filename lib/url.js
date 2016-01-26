// https://url.spec.whatwg.org

// https://url.spec.whatwg.org/#url
declare class URL {
  constructor(url: string, base?: string): void;
  // specified: https://url.spec.whatwg.org/#url-statics
  // but not implemented in Chrome, Firefox or Safari
  // static domainToASCII(domain: string): string;
  // static domainToUnicode(domain: string): string;

  // https://url.spec.whatwg.org/#urlutils-members
  href: string;
  origin: string;                // read-only
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  searchParams?: URLSearchParams; // read-only // only in Firefox
  hash: string;
}

// https://url.spec.whatwg.org/#interface-urlsearchparams
// only implemented in Firefox
declare class URLSearchParams {
  constructor(init?: string | URLSearchParams): void;
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  getAll(name: string): Array<string>;
  has(name: string): boolean;
  set(name: string, value: string): void;
  // specified but not implemented in Firefox
  // @@iterator(): Iterator<[string, string]>;
}
