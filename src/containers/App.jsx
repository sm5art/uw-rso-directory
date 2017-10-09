import React, { Component } from "react";
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import * as rsoAPI from '../actions/rsoAPI';

class App extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <MainSection state={state} actions={actions}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...rsoAPI}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
