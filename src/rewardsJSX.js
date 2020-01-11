import React from 'react';
import "./rewards.css";

export class RewardsJSX extends React.Component{
	render(){
		return(
			<div className="rewards-duallistbox">

				{/*Rewards Gained*/}
				<div id="rewards-gained" className="rewards-singlelist">
					<div className="rewards-title">Rewards Gained</div>
					<select className="rewards-select" multiple>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
					</select>
				</div>

				{/*Add/Remove Controls*/}
				<div className="rewards-controls">
					<button onClick={this.props.test}>Add</button>
					<button>Remove</button>
				</div>

				{/*Rewards List*/}
				<div id="rewards-list" className="rewards-singlelist">
					<div className="rewards-title">Rewards List</div>
					<select className="rewards-select" multiple>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
						<option value="4">Item #4</option>
					</select>
				</div>

			</div>

		);
	}
}
