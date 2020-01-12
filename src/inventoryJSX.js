import React from 'react';
import "./inventory.css";
export class InventoryJSX extends React.Component{
	render(){
 
		return(
			<div className="inventory-duallistbox">

				{/*Rewards Gained*/}
				<div id="inventory-rewards" className="inventory-singlelist">
					<div className="inventory-title">Rewards Gained</div>
					<select className="inventory-select" multiple>

					</select>
				</div>

				{/*Add/Remove Controls*/}
				<div className="inventory-controls">
					<button onClick={this.props.add}>Add</button>
					<button>Remove</button>
				</div>

				{/*Rewards List*/}
				<div id="inventory-master" className="inventory-singlelist">
					<div className="inventory-title">Rewards List</div>
					<select className="inventory-select" multiple>
						{this.props.masterList}
					</select>
				</div>

			</div>

		);
	}
}
