import React, { Component } from 'react';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import { AppBar } from 'material-ui';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <AppBar title="Nice"></AppBar>
    );
  }
}

export default MainSection;
