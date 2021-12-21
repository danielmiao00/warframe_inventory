import React from "react";

import IOComponent from "./IOComponents";
import MasterList from "./MasterList";
import InventoryList from "./InventoryList";
import CustomItem from "./CustomItem";
import Cost from "./Cost";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Overall App</h1>
                <IOComponent/>
                <MasterList/>
                <InventoryList/>
                <CustomItem/>
                <Cost/>
            </div>
        );
    }
}