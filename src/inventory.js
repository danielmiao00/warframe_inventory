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
      cost: new Map(),
      pp: 0,
      gp: 0,
      ep: 0,
      sp: 0,
      cp: 0
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

    var pp = cost.has("pp") ? cost.get("pp") : 0;
    var gp = cost.has("gp") ? cost.get("gp") : 0;
    var ep = cost.has("ep") ? cost.get("ep") : 0;
    var sp = cost.has("sp") ? cost.get("sp") : 0;
    var cp = cost.has("cp") ? cost.get("cp") : 0;


    this.setState({
      pp: pp,
      gp: gp,
      ep: ep,
      sp: sp,
      cp: cp
    });

  }


  convert=()=>{
    var cp = this.state.cp;
    var sp = this.state.sp + Math.floor(cp/10);
    var ep = this.state.ep + Math.floor(sp/10);
    var gp = this.state.gp + Math.floor(ep/10);
    var pp = this.state.pp + Math.floor(gp/10);

    this.setState({
      cp: cp%10,
      sp: sp%10,
      ep: ep%10,
      gp: gp%10,
      pp: pp,

    });
  }



  render(){

    const selected  = this.state.selected;





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
          <div className="platium">
            <input type="text" value={this.state.pp} readOnly/><label>pp</label>
          </div>
          <div className="gold">
            <input type="text" value={this.state.gp} readOnly/><label>gp</label>
          </div>
          <div className="electrum ">
            <input type="text" value={this.state.ep} readOnly/><label>ep</label>
          </div>
          <div className="silver">
            <input type="text" value={this.state.sp} readOnly/><label>sp</label>
          </div>
          <div className="copper">
            <input type="text" value={this.state.cp} readOnly/><label>cp</label>
          </div>
        </div>

        <div>
          <button onClick={this.convert}>Convert</button>
        </div>

      </div>
    );
  }
}



ReactDOM.render(<Inventory/>, document.getElementById("rewards"));
