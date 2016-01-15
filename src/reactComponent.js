/* global ReactElement */
/* @flow */

import React, { Component, PropTypes } from 'react'

export class JustifiedParagraph extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object // eslint-disable-line react/forbid-prop-types
  };

  // constructor (props: {
  //   children: ReactPropTypes.node,
  //   style: ReactPropTypes.object
  // }) {
  //   super()
  // }

  render (): ReactElement {
    return (
      <p is="jus-ti-fied" style={this.props.style}>
        {this.props.children}
      </p>
    )
  }

}
