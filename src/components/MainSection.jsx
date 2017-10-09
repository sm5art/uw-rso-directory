import React, { Component } from 'react';
import { Item, Progress } from 'semantic-ui-react';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){
    this.props.actions.ajaxRSORequest();
  }

  render() {
    const { state, actions } = this.props;
    let loadedComponent;
    let loadingComponent;
    if(state.rsoAPI.loading){
      loadingComponent = (
        <Progress percent={100} indicating />
      )
    }
    if(state.rsoAPI.loaded){
      loadedComponent = (
        <Item.Group>
          {state.rsoAPI.data.map(ItemData)}
        </Item.Group>);
    }

    return (
      <div>
        {loadingComponent}
        {loadedComponent}
      </div>
    );
  }
}

const ItemData = (data) => (
    <Item key={data.id}>
      <Item.Image size='tiny' src={data.logo} />

      <Item.Content>
        <Item.Header as='a'>{data.name}</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          {data.description}
        </Item.Description>
        <Item.Extra>{data.type}</Item.Extra>
      </Item.Content>
    </Item>
);

export default MainSection;
