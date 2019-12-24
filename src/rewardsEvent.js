import React from "react";
import ReactDOM from "react-dom";
import {Rewards} from "./rewards.js";

class RewardsEvents extends React.Component{
  constructor(props){
    super(props);

    this.test = this.test.bind(this);
  }

  test(){
    alert("HEY!");
  }

  render(){
    return(
      <Rewards test={this.test}/>
    );
  }
}



ReactDOM.render(<RewardsEvents/>, document.getElementById("rewards"));
