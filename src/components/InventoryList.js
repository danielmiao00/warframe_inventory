import React from "react";

export default class InventoryList extends React.Component{
    state = {
        title: "Inventory",
        showTitle: true,

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
                "unit": data[key].cost.unit,
                "count": data[key].count
            });
        }

        return rows.map((item, i) => {
            return (
                <tr className="masterlist-row" key={item.index} >
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td><input type="number" min="1" max="100" value={item.count} data-id={item.index} onChange={this.props.handleQuantityChange}></input></td>
                    <td><i className="masterlist-button fa fa-times" data-id={item.index} onClick={this.props.handleRemoveClick}></i></td>
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
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                                <th></th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}