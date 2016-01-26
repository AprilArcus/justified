/* @flow */

const INFINITY = 10000

export class Glue {
  type: string = 'glue';
  width: number;
  stretch: number;
  shrink: number;
  constructor (params: {
    width: number,
    stretch: number,
    shrink: number
  }) {
    Object.assign(this, params)
  }
}

export class Box {
  type: string = 'box';
  width: number;
  value: string;
  constructor (params: {
    width: number,
    value: string
  }) {
    Object.assign(this, params)
  }
}

export class Penalty {
  type: string = 'penalty';
  width: number;
  penalty: number;
  flagged: boolean;
  value: string;
  kern: number;
  constructor (params: {
    width: number,
    penalty: number,
    flagged: boolean,
    value: string,
    kern: number
  }) {
    Object.assign(this, params)
  }
}

export const EOL_GLUE = new Glue({
  width: 0,
  stretch: INFINITY,
  shrink: 0
})

export const EOL_PENALTY = new Penalty({
  width: 0,
  penalty: -INFINITY,
  flagged: true,
  kern: 0,
  value: ''
})

export const FREE_BREAK = new Penalty({
  penalty: 0,
  value: '',
  width: 0,
  kern: 0,
  flagged: false
})
