import React, { Component } from 'react';

import { AppBar } from 'material-ui';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <AppBar title="Nice"></AppBar>
    );
  }
}

export default MainSection;
