import React from "react";

export default class InventoryList extends React.Component{
    state = {
        title: "Inventory",
        showTitle: true
    }

    

    renderRows(){
        var data = this.props.selected;
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
                    <td><input type="checkbox"></input></td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td><input type="number" min="1" max="100" defaultValue="1"></input></td>
                </tr>
            );
        });
    }

    render(){
        const renderTitle = () =>{
            if(this.state.showTitle){
                return <h1>{this.state.title}</h1>
            }
        };

        return(
            <div className="inventorylist">
                {renderTitle()}
                <div className="inventorylist-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
                <div className="inventory-buttons">
                    <button>Remove</button>
                </div>
            </div>
        );
    }

}