import React from "react";
import ReactDOM from "react-dom";
import {RewardsJSX} from "./rewardsJSX.js";

class RewardsEvents extends React.Component{
  constructor(props){
    super(props);

    this.test = this.test.bind(this);
  }

  componentDidMount(){
    var url = "http://www.dnd5eapi.co/api/equipment";
    var parm = {
      method: "GET",

    }
    fetch(url, parm)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this._itemList = json;
        console.log(this._itemList);
      });
  }

  test(){
    alert("HEY!");
  }

  render(){
    return(
      <RewardsJSX test={this.test}/>
    );
  }
}



ReactDOM.render(<RewardsEvents/>, document.getElementById("rewards"));
