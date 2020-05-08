import React from "react";
import { saveAs } from "file-saver";

import IOComponent from "./IOComponents";
import MasterList from "./MasterList";
import InventoryList from "./InventoryList";
import Cost from "./Cost";

export default class App extends React.Component {
    state = {
        selected: {},
        cost: {
            pp: 0,
            gp: 0,
            sp: 0,
            cp: 0
        }
    }

    render() {
        return (
            <div>
                <IOComponent handleImportChange={this.handleImportChange.bind(this)} handleExportClick={this.handleExportClick.bind(this)} />
                <MasterList handleSelectionClick={this.handleSelectionClick.bind(this)} />
                <InventoryList selected={this.state.selected} handleQuantityChange={this.handleQuantityChange.bind(this)} handleRemoveClick={this.handleRemoveClick.bind(this)} />
                <Cost cost={this.state.cost} handleConvertClick={this.handleConvertClick.bind(this)} />
            </div>
        );
    }

    handleSelectionClick(selected) {
        this.calculateCost(selected);
    }

    handleQuantityChange(event) {
        var id = event.currentTarget.dataset.id;
        var selected = this.state.selected;

        selected[id].count = event.currentTarget.value;

        this.calculateCost(selected);
    }

    handleRemoveClick(event) {
        var id = event.currentTarget.dataset.id;
        var selected = this.state.selected;

        delete selected[id];

        this.calculateCost(selected);
    }

    calculateCost(selected) {
        var cost = {
            pp: 0,
            gp: 0,
            sp: 0,
            cp: 0
        };

        for (var key in selected) {
            var count = selected[key].count;
            var currencyType = selected[key].cost.unit;
            var quantitiy = selected[key].cost.quantity;

            cost[currencyType] += count * quantitiy;
        }

        this.setState({
            selected: selected,
            cost: cost
        });
    }

    handleConvertClick() {
        var cost = {
            pp: 0,
            gp: 0,
            sp: 0,
            cp: 0
        };

        var pp = this.state.cost.pp;
        var gp = this.state.cost.gp;
        var sp = this.state.cost.sp;
        var cp = this.state.cost.cp;

        //Copper to Silver
        sp += Math.floor(cp / 10);
        cp = cp % 10;

        //Silver to Gold
        gp += Math.floor(sp / 10);
        sp = sp % 10;

        //Gold to Platium
        pp += Math.floor(gp / 10);
        gp = gp % 10;

        cost.pp = pp;
        cost.gp = gp;
        cost.sp = sp;
        cost.cp = cp;

        this.setState({
            cost: cost
        });
    }


    handleImportChange(event) {
        console.log("Import Clicked!");

        var fileInput = document.getElementById("file-input");
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.onload = (e) => {
            var selected = JSON.parse(reader.result);
            this.calculateCost(selected);
        }
        reader.readAsText(file);
    }


    handleExportClick(event) {
        var json = JSON.stringify(this.state.selected);

        var blob = new Blob([json], {type: "application/json"});
        saveAs(blob, "inventory.json");
    }
}