import React from 'react';
import "./rewards.css";

export class RewardsJSX extends React.Component{
	render(){
		console.log("Master List HERE");
		console.log(this.props.masterList);



		const arrayOfData = [
		  {
		    id: '1 - Jerry',
		    name: 'Jerry'
		  },
		  {
		    id: '2 - Elaine',
		    name: 'Elaine'
		  },
		  {
		    id: '3 - Kramer',
		    name: 'Kramer'
		  },
		  {
		    id: '4 - George',
		    name: 'George'
		  },
		];


		let options = arrayOfData.map((data) =>
						<option
								key={data.id}
								value={data.id}
						>
								{data.name}
						</option>
				);



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
						{this.props.masterList}
					</select>
				</div>

			</div>

		);
	}
}
