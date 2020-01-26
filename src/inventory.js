import React from "react";
import ReactDOM from "react-dom";
import DualListBox from 'react-dual-listbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'


library.add(fab, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight);

class Inventory extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      options: []
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
          var options = json.results.map((data) =>{
            return {
              value: data.index,
              label: data.name
            };
          });




          this.setState({options: options});
      });


  }


  add(){

  }

  onChange = (selected) => {
      this.setState({ selected });
  };

  render(){

    const selected  = this.state.selected;

    return(
      <DualListBox
          options={this.state.options}
          selected={selected}
          onChange={this.onChange}
          icons={{
            moveLeft: <FontAwesomeIcon icon="angle-left" />,
            moveAllLeft: <FontAwesomeIcon icon="angle-double-left" />,
            moveRight: <FontAwesomeIcon icon="angle-right" />,
            moveAllRight: <FontAwesomeIcon icon="angle-double-right" />,
          }}
      />
    );
  }
}



ReactDOM.render(<Inventory/>, document.getElementById("rewards"));
