import React from "react";
import ReactDOM from "react-dom";
import {RewardsJSX} from "./rewardsJSX.js";

class RewardsEvents extends React.Component{
  constructor(props){
    super(props);

    this.state = {

    };

    this.test = this.test.bind(this);

    var url = "http://www.dnd5eapi.co/api/equipment";
    var parm = {
      method: "GET",
    }


    fetch(url, parm)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
          console.log("Returned JSON");
          console.log(json);

          var masterList = json.results.map((data) =>
      						<option
      								key={data.index}
      								value={data.index}
      						>
      								{data.name}
      						</option>
      		);

          this.setState({masterList: masterList});

      });


  }





  test(){
    alert("HEY!");
  }

  render(){
    return(
      <RewardsJSX test={this.test} masterList={this.state.masterList}/>
    );
  }
}



ReactDOM.render(<RewardsEvents/>, document.getElementById("rewards"));
