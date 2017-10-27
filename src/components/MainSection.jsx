import React, { Component } from 'react';
import { Input, Item, Progress, Dropdown, Icon, Label } from 'semantic-ui-react';
import Fuse from 'fuse.js';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.dropDownChange = this.dropDownChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.ajaxRSOTypes();
    this.props.actions.ajaxRSORequest({});
  }

  componentDidUpdate() {
  }

  dropDownChange(event, data) {
    if(data.value.length >= 0){
      this.props.actions.updateFilter({ types: data.value })
    }
  }

  inputChange(event, data) {
    this.props.actions.updateFilter({ query: data.value })
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
        options.push(obj);
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
      if(state.rsoAPI.filter.query != "") {
        var options = {
          shouldSort: true,
          threshold: 0.1,
          location: 0,
          distance: 50,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "name",
            "description"
          ]
        };
        const fuse = new Fuse(data, options);
        data = fuse.search(state.rsoAPI.filter.query);
      }
      loadedComponent = (
        <div>
          <div className="right"><a href="https://github.com/sm5art/uw-rso-directory"><Icon link name="code" size="big"/></a></div>
          <Input placeholder="Search" onChange={this.inputChange}/>
          {dropDown}
          <Item.Group>
            {data.map(ItemData)}
          </Item.Group></div>);
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
        <Item.Header as="a" href={'https://uws-community.symplicity.com/index.php' + data.href } target="_blank">{data.name}</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          {data.description}
        </Item.Description>
        <Item.Extra>
          {data.type}
          <br></br>
            <Label>
              <Icon name='mail' /> { data.contact || "😢" }
            </Label>
        </Item.Extra>
      </Item.Content>
    </Item>
);

export default MainSection;
