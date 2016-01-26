type LanguagePattern = {
  id: string | Array<string>,
  leftmin: number,
  rightmin: number,
  patterns: {[index: number]: string},
  exceptions?: string,
  specialChars?: string,
  charSubstitution?: Object
};

declare module 'hypher' {
  declare class exports {
    constructor(language: LanguagePattern): void;
    hyphenate(word: string): Array<string>;
    hyphenateText(str: string, minLength: ?number): string;
  }
}

declare module 'hyphenation.be' { declare var exports: LanguagePattern }
declare module 'hyphenation.bn' { declare var exports: LanguagePattern }
declare module 'hyphenation.ca' { declare var exports: LanguagePattern }
declare module 'hyphenation.cs' { declare var exports: LanguagePattern }
declare module 'hyphenation.da' { declare var exports: LanguagePattern }
declare module 'hyphenation.de' { declare var exports: LanguagePattern }
declare module 'hyphenation.el-monoton' { declare var exports: LanguagePattern }
declare module 'hyphenation.el-polyton' { declare var exports: LanguagePattern }
declare module 'hyphenation.en-gb' { declare var exports: LanguagePattern }
declare module 'hyphenation.en-us' { declare var exports: LanguagePattern }
declare module 'hyphenation.es' { declare var exports: LanguagePattern }
declare module 'hyphenation.fi' { declare var exports: LanguagePattern }
declare module 'hyphenation.fr' { declare var exports: LanguagePattern }
declare module 'hyphenation.grc' { declare var exports: LanguagePattern }
declare module 'hyphenation.gu' { declare var exports: LanguagePattern }
declare module 'hyphenation.hi' { declare var exports: LanguagePattern }
declare module 'hyphenation.hu' { declare var exports: LanguagePattern }
declare module 'hyphenation.hy' { declare var exports: LanguagePattern }
declare module 'hyphenation.is' { declare var exports: LanguagePattern }
declare module 'hyphenation.it' { declare var exports: LanguagePattern }
declare module 'hyphenation.kn' { declare var exports: LanguagePattern }
declare module 'hyphenation.la' { declare var exports: LanguagePattern }
declare module 'hyphenation.lt' { declare var exports: LanguagePattern }
declare module 'hyphenation.lv' { declare var exports: LanguagePattern }
declare module 'hyphenation.ml' { declare var exports: LanguagePattern }
declare module 'hyphenation.nb-no' { declare var exports: LanguagePattern }
declare module 'hyphenation.nl' { declare var exports: LanguagePattern }
declare module 'hyphenation.or' { declare var exports: LanguagePattern }
declare module 'hyphenation.pa' { declare var exports: LanguagePattern }
declare module 'hyphenation.pl' { declare var exports: LanguagePattern }
declare module 'hyphenation.pt' { declare var exports: LanguagePattern }
declare module 'hyphenation.ru' { declare var exports: LanguagePattern }
declare module 'hyphenation.sk' { declare var exports: LanguagePattern }
declare module 'hyphenation.sl' { declare var exports: LanguagePattern }
declare module 'hyphenation.sv' { declare var exports: LanguagePattern }
declare module 'hyphenation.ta' { declare var exports: LanguagePattern }
declare module 'hyphenation.te' { declare var exports: LanguagePattern }
declare module 'hyphenation.tr' { declare var exports: LanguagePattern }
declare module 'hyphenation.uk' { declare var exports: LanguagePattern }
