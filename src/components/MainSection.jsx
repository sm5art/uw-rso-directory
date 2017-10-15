import React, { Component } from 'react';
import { Search, Container, Item, Progress, Dropdown } from 'semantic-ui-react';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.dropDownChange = this.dropDownChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.ajaxRSOTypes();
    this.props.actions.ajaxRSORequest({});
  }

  componentDidUpdate() {
  }

  dropDownChange(event, data) {
    if(data.value.length > 0){
      this.props.actions.updateFilter({ types: data.value })
    }
  }

  render() {
    const { state, actions } = this.props;
    let loadedComponent;
    let loadingComponent;
    let dropDown;
    if(state.rsoAPI.loading){
      loadingComponent = (
        <Progress percent={100} indicating />
      )
    }
    if(state.rsoAPI.types.length > 0) {
      const options = []
      for(const type of state.rsoAPI.types) {
        let obj = {
          key: type,
          value: type,
          text: type
        };
        options.push(obj)
      }
      dropDown = (
        <Dropdown placeholder="Type of Club" onChange={this.dropDownChange} fluid multiple selection options={options}/>
      );
    }
    if(state.rsoAPI.loaded){
      let data = state.rsoAPI.data;
      const types = state.rsoAPI.filter.types;
      if(types.length > 0) {
        data = data.filter((point) => {
          for(const type of types) {
            if(point['type'] == type) {
              return true;
            }
          }
          return false;
        })
      }
      loadedComponent = (
        <div>
          <Search></Search>
          {dropDown}
          <Item.Group>
            {data.map(ItemData)}
          </Item.Group></div>);
    }

    return (
      <Container>
        {loadingComponent}
        {loadedComponent}
      </Container>
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
