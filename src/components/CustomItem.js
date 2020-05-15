import React from 'react';

export default class CustomItem extends React.Component {
    state = {
        title: "Custom Item",
        showTitle: true
    }


    render() {
        const renderTitle = () => {
            if (this.state.showTitle) {
                return <h1>{this.state.title}</h1>
            }
        };

        return (
            <div>
                {renderTitle()}
                <div className="custom-item-input">

                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                                <th></th>
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <input id="custom-item-name" type="text" required></input>
                                </td>
                                <td>
                                    <input id="custom-item-cost" type="number" defaultValue="1" min="1"></input>
                                </td>
                                <td>
                                    <select id="custom-item-unit">
                                        <option value="pp">pp</option>
                                        <option value="gp">gp</option>
                                        <option value="sp">sp</option>
                                        <option value="cp">cp</option>
                                    </select>
                                </td>
                                <td>
                                    <input id="custom-item-quantity" type="number" defaultValue="1" min="1"></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button onClick={this.handleCustomAddClick.bind(this)}>Add</button>
                </div>
            </div >
        );
    }


    handleCustomAddClick(event) {
        var name = document.querySelector("#custom-item-name").value;
        var cost = document.querySelector("#custom-item-cost").value;
        var unit = document.querySelector("#custom-item-unit").value;
        var quantity = document.querySelector("#custom-item-quantity").value;

        if (name === "") {
            alert("Please enter a valid item name.");
            return -1;
        }
        if (cost === "" || isNaN(cost) || cost%1!==0) {
            alert("Please enter a valid item cost.");
            return -1;
        }
        if (quantity === "" || isNaN(quantity) || quantity%1!==0) {
            alert("Please enter a valid item quantity.");
            return -1;
        }

        cost = Math.floor(cost);
        quantity = Math.floor(quantity);


        this.props.handleCustomAddClick(name, cost, unit, quantity);
    }

}

