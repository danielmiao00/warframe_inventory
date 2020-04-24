import React from "react";
import "../style/MasterList.css";

export default class MasterList extends React.Component {
    state = {
        masterData: {},
        title: "Master Item List",
        showTitle: true,
        selected:{

        }
    }
    
    constructor(props) {
        super(props);

        

        this.getItemData();
    }//constructor


    getItemData() {

        //Get List of All Items
        var url = "http://www.dnd5eapi.co/api/equipment";
        var parm = {
            method: "GET",
        };

        fetch(url, parm)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                var masterData = {};
                for (var i = 0; i < json.results.length; i++) {
                    masterData[json.results[i].index] = {
                        index: json.results[i].index,
                        name: json.results[i].name,
                        url: json.results[i].url,
                        cost: {
                            quantity: 0,
                            unit: ""
                        }
                    }
                }

                //Get Cost of All Items
                var fetches = [];
                for (var key in masterData) {
                    var url = "http://www.dnd5eapi.co/api/equipment/" + key;
        
                    fetches.push(
                        fetch(url, parm)
                        .then((response) => {
                            return response.json();
                        })
                        .then((json) => {
                            masterData[json.index].cost.quantity = json.cost.quantity;
                            masterData[json.index].cost.unit = json.cost.unit;
                        })
                    );
                }
        
                Promise.all(fetches).then(() =>{
                    this.setState({ masterData: masterData });
                });
                
            });//fetch
    }//getItemData



    renderRows() {
        var data = this.state.masterData;
        var rows = [];

        for (var key in data) {
            rows.push({
                "index": data[key].index,
                "name": data[key].name,
                "url": data[key].url,
                "quantity": data[key].cost.quantity,
                "unit": data[key].cost.unit
            });
        }

        return rows.map((item, i) => {
            return (
                <tr className="masterlist-row" key={item.index}>
                    <td><input className="masterlist-checkbox" onClick={this.handleCheck.bind(this)} value={item.index} type="checkbox"></input></td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                </tr>
            );
        });
    }

    handleCheck(event){
        var selectedValue = event.currentTarget.value;
        var selected = this.state.selected;

        if(event.currentTarget.checked){
            var selectedJSON = this.state.masterData[selectedValue];
            selected[selectedValue] = selectedJSON;
        }
        else{
            delete selected[selectedValue];
        }


        this.setState({
            selected: selected
        });

    }

    handleAddClick(){
        this.props.handleAdd(this.state.selected);
    }

    render() {
        const renderTitle = () =>{
            if(this.state.showTitle){
                return <h1>{this.state.title}</h1>
            }
        };

        return (
            <div className="masterlist">
                {renderTitle()}
                <div className="masterlist-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th>Cost</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
                <div className="masterlist-button">
                    <button onClick={this.handleAddClick.bind(this)}>Add</button>
                </div>
            </div>
        );
    };



}