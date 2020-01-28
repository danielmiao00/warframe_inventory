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
      options: [],
      cost: new Map()
    };

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



  onChange = (selected) => {
      this.setState({ selected });
      this.calculate(selected);
  }

  calculate = async (selected) =>{
    var parm = {
      method: "GET",
    };

    var cost = new Map([
      ["pp", 0],
      ["gp", 0],
      ["ep", 0],
      ["sp", 0],
      ["cp", 0]
    ]);

    for(var i=0; i<selected.length; i++){
        var url = "http://www.dnd5eapi.co/api/equipment/" +selected[i];

        await fetch(url, parm)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          var quantity = json.cost.quantity;
          var unit = json.cost.unit;

          cost.set(unit, cost.get(unit)+quantity);
        });
    }



    console.log("Cost HERE");
    console.log(cost);
    this.setState({cost: cost});







  }




  render(){

    const selected  = this.state.selected;
    const cost = this.state.cost;


    return(
      <div>
        <DualListBox
          canFilter
          filterCallback={(option, filterInput) => {
            if (filterInput === '') {
              return true;
            }

            return (new RegExp(filterInput, 'i')).test(option.label);
          }}
          filterPlaceholder="Filter..."
          lang={{
            availableHeader: "Master Item List",
            selectedHeader: 'Reward List'
          }}
          showHeaderLabels={true}
          allowDuplicates={true}
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

        <div className="total">
          <label>Total:</label>
          <div className="gold">
            <input type="text" value="0" readOnly/><label>gp</label>
          </div>
          <div className="silver">
            <input type="text" value="0" readOnly/><label>sp</label>
          </div>
          <div className="bronze">
            <input type="text" value="0" readOnly/><label>bp</label>
          </div>
        </div>
      </div>
    );
  }
}



ReactDOM.render(<Inventory/>, document.getElementById("rewards"));
