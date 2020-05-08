import React from "react";

export default class IOComponents extends React.Component{
    render(){
        return(
            <div>
                <button onClick={this.props.handleExportClick}>Export Inventory List</button>
                <input id="file-input" type="file" name="name" onChange={this.props.handleImportChange}/>


            </div>
        );
    }
}