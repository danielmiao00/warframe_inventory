import React from "react";
import "../style/MasterList.css";

export default class MasterList extends React.Component {
    constructor(props) {
        super(props);

        //Set Default Data
        this.state = {
            masterData: {},
            title: "Master Item List",
            showTitle: true
        }

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

                this.setState({ masterData: masterData });


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
                    console.log("DONE");
                    console.log(masterData);
                });
            });
    }//getItemData



    renderRows() {
        var data = this.state.masterData;
        var rows = [];

        for (var key in data) {
            rows.push({
                "index": data[key].index,
                "name": data[key].name,
                "url": data[key].url,
            });
        }

        return rows.map((item, i) => {
            return (
                <tr key={item.index}>
                    <td><input type="checkbox"></input></td>
                    <td>{item.name}</td>
                    <td>100</td>
                </tr>
            );
        });
    }

    render() {
        const renderTitle = () =>{
            if(this.state.showTitle){
                return <h1>{this.state.title}</h1>
            }
        }

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
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
                <div className="masterlist-buttons">
                    <button>Add</button>
                </div>

            </div>
        );
    };
}