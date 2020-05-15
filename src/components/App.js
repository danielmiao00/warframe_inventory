import React from "react";
import { saveAs } from "file-saver";

import IOComponent from "./IOComponents";
import MasterList from "./MasterList";
import InventoryList from "./InventoryList";
import CustomItem from "./CustomItem";
import Cost from "./Cost";

const costTemplate = {
    pp: {
        quantity: 0,
        profit: 0,
        extra: 0
    },
    gp: {
        quantity: 0,
        profit: 0,
        extra: 0
    },
    sp: {
        quantity: 0,
        profit: 0,
        extra: 0
    },
    cp: {
        quantity: 0,
        profit: 0,
        extra: 0
    }
}

export default class App extends React.Component {
    state = {
        masterData: {},
        selected: {},
        cost: JSON.parse(JSON.stringify(costTemplate)),
        percentage: 50,
        playerCount: 4,
        customItemIndex: 0
    }

    constructor(props) {
        super(props);
        this.getItemData();
    }

    render() {
        return (
            <div>
                <IOComponent handleImportChange={this.handleImportChange.bind(this)} handleExportClick={this.handleExportClick.bind(this)} />
                <MasterList handleSelectionClick={this.handleSelectionClick.bind(this)} masterData={this.state.masterData} />
                <InventoryList selected={this.state.selected} handleQuantityChange={this.handleQuantityChange.bind(this)} handleRemoveClick={this.handleRemoveClick.bind(this)} />
                <CustomItem handleCustomAddClick={this.handleCustomAddClick.bind(this)}></CustomItem>
                <Cost
                    cost={this.state.cost}
                    handlePercentageChange={this.handlePercentageChange.bind(this)}
                    percentage={this.state.percentage}
                    handlePlayerCountChange={this.handlePlayerCountChange.bind(this)}
                    playerCount={this.state.playerCount}
                />
            </div>
        );
    }

    //----------------------------------//
    //                                  //
    //    IOComponents Event Handlers   //
    //                                  //
    //----------------------------------//
    handleImportChange(event) {
        var fileInput = document.getElementById("file-input");
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = (e) => {
            this.setState({
                selected: JSON.parse(reader.result)
            }, () => {
                this.calculateCost();
            });
        }
        reader.readAsText(file);
    }

    handleExportClick(event) {
        var json = JSON.stringify(this.state.selected);
        var blob = new Blob([json], { type: "application/json" });

        saveAs(blob, "inventory.json");
    }


    //----------------------------------//
    //                                  //
    //  Master Item List Event Handlers //
    //                                  //
    //----------------------------------//
    getItemData() {
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
                                masterData[json.index].count = 1;
                            })
                    );
                }

                Promise.all(fetches).then(() => {
                    this.setState({ masterData: masterData });
                });

            });
    }

    handleSelectionClick(event) {
        var selectedValue = event.currentTarget.dataset.id;
        var selected = this.state.selected;
        var selectedJSON = this.state.masterData[selectedValue];

        if (selected.hasOwnProperty(selectedValue)) {
            selectedJSON.count++;
        }

        selected[selectedValue] = selectedJSON;

        this.setState({
            selected: selected
        }, () => {
            this.calculateCost();
        });
    }


    //----------------------------------//
    //                                  //
    //   Inventory List Event Handlers  //
    //                                  //
    //----------------------------------//
    handleQuantityChange(event) {
        var id = event.currentTarget.dataset.id;
        var selected = JSON.parse(JSON.stringify(this.state.selected));

        selected[id].count = event.currentTarget.value;

        this.setState({
            selected: selected
        }, () => {
            this.calculateCost();
        });
    }

    handleRemoveClick(event) {
        var id = event.currentTarget.dataset.id;
        var selected = JSON.parse(JSON.stringify(this.state.selected));

        delete selected[id];

        this.setState({
            selected: selected
        }, () => {
            this.calculateCost();
        });
    }


    //----------------------------------//
    //                                  //
    //    Custom Item Event Handlers    //
    //                                  //
    //----------------------------------//
    handleCustomAddClick(name, cost, unit, quantity) {
        var customItemIndex = this.state.customItemIndex;
        var selected = JSON.parse(JSON.stringify(this.state.selected));

        selected["custom-item-" + customItemIndex] = {
            "index": "custom-item-" + customItemIndex,
            "name": name,
            "url": null,
            "cost": {
                "quantity": cost,
                "unit": unit
            },
            "count": quantity
        };


        this.setState({
            customItemIndex: customItemIndex + 1,
            selected: selected
        }, () => {
            this.calculateCost(this.state.selected);

            console.log(this.state.customItemIndex);
        });
    }


    //----------------------------------//
    //                                  //
    //       Cost Event Handlers        //
    //                                  //
    //----------------------------------//
    handlePercentageChange(event) {
        this.setState({
            percentage: event.currentTarget.value
        }, () => {
            this.calculateCost(this.state.selected);
        });
    }

    handlePlayerCountChange(event) {
        this.setState({
            playerCount: event.currentTarget.value
        }, () => {
            this.calculateCost(this.state.selected)
        });
    }


    //----------------------------------//
    //                                  //
    //      Overall App Functions       //
    //                                  //
    //----------------------------------//
    calculateCost() {
        var selected = JSON.parse(JSON.stringify(this.state.selected));
        var cost = JSON.parse(JSON.stringify(costTemplate));

        //Calculate Normal Total Price
        for (var key in selected) {
            var count = selected[key].count;
            var currencyType = selected[key].cost.unit;
            var quantity = selected[key].cost.quantity;

            cost[currencyType].quantity += count * quantity;
        }

        //Convert All to Copper
        cost.cp.quantity = (cost.pp.quantity * 1000) + (cost.gp.quantity * 100) + (cost.sp.quantity * 10) + cost.cp.quantity;
        cost.pp.quantity = 0;
        cost.gp.quantity = 0;
        cost.sp.quantity = 0;

        //Apply Sell At Rate
        var percentage = this.state.percentage / 100;
        cost.cp.quantity = Math.ceil(percentage * cost.cp.quantity);

        //Convert Currency
        cost = this.convertCurrency(cost);

        //Divide Amongst Party Members
        cost.pp.profit = Math.floor(cost.pp.quantity / this.state.playerCount);
        cost.pp.extra = cost.pp.quantity % this.state.playerCount;

        cost.gp.profit = Math.floor(cost.gp.quantity / this.state.playerCount);
        cost.gp.extra = cost.gp.quantity % this.state.playerCount;

        cost.sp.profit = Math.floor(cost.sp.quantity / this.state.playerCount);
        cost.sp.extra = cost.sp.quantity % this.state.playerCount;

        cost.cp.profit = Math.floor(cost.cp.quantity / this.state.playerCount);
        cost.cp.extra = cost.cp.quantity % this.state.playerCount;

        this.setState({
            cost: cost
        });
    }

    convertCurrency(cost) {
        var pp = cost.pp.quantity;
        var gp = cost.gp.quantity;
        var sp = cost.sp.quantity;
        var cp = cost.cp.quantity;

        //Copper to Silver
        sp += Math.floor(cp / 10);
        cp = cp % 10;

        //Silver to Gold
        gp += Math.floor(sp / 10);
        sp = sp % 10;

        //Gold to Platium
        pp += Math.floor(gp / 10);
        gp = gp % 10;

        cost.pp.quantity = pp;
        cost.gp.quantity = gp;
        cost.sp.quantity = sp;
        cost.cp.quantity = cp;

        return cost;
    }
}