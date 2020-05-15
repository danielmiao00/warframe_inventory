import React from "react";
import "../style/MasterList.css";

export default class MasterList extends React.Component {
    state = {
        title: "Master Item List",
        showTitle: true,
    }
    
    renderRows() {
        var data = this.props.masterData;
        var rows = [];

        for (var key in data) {
            rows.push({
                "index": data[key].index,
                "name": data[key].name,
                "url": data[key].url,
                "quantity": data[key].cost.quantity,
                "unit": data[key].cost.unit,
                "count": data[key].cost
            });
        }

        return rows.map((item, i) => {
            return (
                <tr className="masterlist-row" key={item.index} data-id={item.index} onClick={this.props.handleSelectionClick.bind(this)}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                </tr>
            );
        });
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
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}