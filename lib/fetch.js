// https://fetch.spec.whatwg.org

// https://fetch.spec.whatwg.org/#referrerpolicy
declare type ReferrerPolicy =
  '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin-only' |
  'origin-when-cross-origin' | 'unsafe-url';

// https://fetch.spec.whatwg.org/#headers-class
// https://fetch.spec.whatwg.org/#headersinit
declare type HeadersInit =
  Headers | {[key: string]: string} | Array<[string, string]>;
// https://fetch.spec.whatwg.org/#headers
declare class Headers {
  constructor(init: HeadersInit): void;
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  getAll(name: string): Array<string>;
  has(name: string): boolean;
  set(name: string, value: string): void;
  @@iterator(): Iterator<[string, string]>;
}

// https://fetch.spec.whatwg.org/#body-mixin
// https://fetch.spec.whatwg.org/#bodyinit
declare type BodyInit =
  Blob | BufferSource | FormData | URLSearchParams | string;
// the `URLSearchParams` constructor is only available in Firefox.

// https://fetch.spec.whatwg.org/#body
declare class Body { // technically an "interface" or a "mixin"
  bodyUsed: boolean;                   // read-only
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  json(): Promise<JSON>;
  text(): Promise<string>;
}

// https://fetch.spec.whatwg.org/#request-class
// https://fetch.spec.whatwg.org/#requestinfo
declare type RequestInfo = Request | string;
// https://fetch.spec.whatwg.org/#request
declare class Request extends Body {
  constructor(input: RequestInfo, init?: RequestInit): void;
  method: string;                  // read-only
  url: string;                     // read-only
  headers: Headers;                // read-only

  type: RequestType;               // read-only
  destination: RequestDestination; // read-only
  referrer: string;                // read-only
  referrerPolicy: ReferrerPolicy;  // read-only
  mode: RequestMode;               // read-only
  credentials: RequestCredentials; // read-only
  cache: RequestCache;             // read-only
  redirect: RequestRedirect;       // read-only
  integrity: string;               // read-only

  clone(): Request;
}
// https://fetch.spec.whatwg.org/#requestinit
declare type RequestInit = {
  method: string,
  headers: HeadersInit,
  body?: BodyInit,
  referrer: string,
  referrerPolicy: ReferrerPolicy,
  mode: RequestMode,
  credentials: RequestCredentials,
  cache: RequestCache,
  redirect: RequestRedirect,
  integrity: string,
  window: null
};
// https://fetch.spec.whatwg.org/#requesttype
declare type RequestType =
  '' | 'audio' | 'font' | 'image' | 'script' | 'style' | 'track' | 'video';
// https://fetch.spec.whatwg.org/#requestdestination
declare type RequestDestination =
  '' | 'document' | 'sharedworker' | 'subresource' | 'unknown' | 'worker';
// https://fetch.spec.whatwg.org/#requestmode
declare type RequestMode =
  'navigate' | 'same-origin' | 'no-cors' | 'cors';
// https://fetch.spec.whatwg.org/#requestcredentials
declare type RequestCredentials =
  'omit' | 'same-origin' | 'include';
// https://fetch.spec.whatwg.org/#requestcache
declare type RequestCache =
  'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache';
// https://fetch.spec.whatwg.org/#requestredirect
declare type RequestRedirect =
  'follow' | 'error' | 'manual';

// https://fetch.spec.whatwg.org/#response-class
// https://fetch.spec.whatwg.org/#response
declare class Response extends Body {
  constructor(body?: BodyInit, init?: ResponseInit): void;
  static error(): Response;
  static redirect(url: string, status?: 302): Response;

  type: ResponseType;          // read-only

  url: string;                 // read-only
  status: number;              // read-only
  ok: boolean;                 // read-only
  statusText: string;          // read-only
  headers: Headers;            // read-only
  // WHATWG spec says this property should exist and be a `ReadableStream`
  // https://fetch.spec.whatwg.org/#concept-readablestream
  body: any;                   // read-only
  // Firefox does not implement it.
  // Chrome implements a ReadableByteStream instead:
  // https://www.chromestatus.com/feature/5804334163951616
  // ReadableByteStream Docs:
  // https://github.com/whatwg/streams/blob/master/docs/ReadableByteStream.md
  // whatwg/streams #418 "Merge ReadableByteStream into ReadableStream"
  // https://github.com/whatwg/streams/pull/418

  clone(): Response;
}
// https://fetch.spec.whatwg.org/#responseinit
declare type ResponseInit = {
  status: 200;
  statusText: 'OK';
  headers: HeadersInit
};
// https://fetch.spec.whatwg.org/#responsetype
declare type ResponseType =
  'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect';

// https://fetch.spec.whatwg.org/#globalfetch
declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
