import React from "react";
import MasterList from "./MasterList";
import InventoryList from "./InventoryList";

export default class App extends React.Component{
    state = {
        selected:{}
    }
    render(){
        return(
            <div>
                <MasterList handleAdd={this.handleAdd.bind(this)}/>
                <InventoryList selected={this.state.selected}/>

            </div>
        );
    }

    handleAdd(selected){
        console.log("HEYO");
        console.log(selected);
    
        this.setState({
            selected: selected
        });
    }
}