import React from "react";
import ReactDOM from "react-dom";
//import {InventoryJSX} from "./inventoryJSX.js";
import DualListBox from 'react-dual-listbox';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'


class Inventory extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      masterList: []
    };

    this.add = this.add.bind(this);

    var url = "http://www.dnd5eapi.co/api/equipment";
    var parm = {
      method: "GET",
    }


    fetch(url, parm)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
          var masterList = json.results.map((data) =>{
            return {
              value: data.index,
              label: data.name
            };
          });




          this.setState({masterList: masterList});
      });


  }


  add(){

  }

  onChange = (selected) => {
      this.setState({ selected });
  };

  render(){
    console.log("Master List");
    console.log(this.state.masterList);

    const { selected } = this.state;
    const options = [
        { value: 'one', label: 'Option One' },
        { value: 'two', label: 'Option Two' },
    ];

    console.log("Options");
    console.log(options);

    return(
      <DualListBox
          options={this.state.masterList}
          selected={selected}
          onChange={this.onChange}

      />
    );
  }
}



ReactDOM.render(<Inventory/>, document.getElementById("rewards"));
