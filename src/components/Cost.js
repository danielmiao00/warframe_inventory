import React from 'react';

export default class Cost extends React.Component {
    state = {
        showTitle: true,
        title: "Cost"
    }

    renderTitle() {
        if (this.state.showTitle) {
            return <h1>{this.state.title}</h1>
        }
    }

    render() {
        return (
            <div>
                {this.renderTitle()}

                <div>
                    <label>Sell at:</label>
                    <input type="number" defaultValue="100" min="1" max="100"></input>
                    <label>%</label>
                </div>

                <div className="cost-box">
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Total</th>
                                <th></th>
                                <th>Party Count</th>
                                <th></th>
                                <th>Profit</th>
                                <th>Extra</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" value={this.props.cost.pp} readOnly></input><label>pp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" defaultValue="1"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="text" value={this.props.cost.gp} readOnly></input><label>gp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" defaultValue="1"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="text" value={this.props.cost.sp} readOnly></input><label>sp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" defaultValue="1"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="text" value={this.props.cost.cp} readOnly></input><label>cp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" defaultValue="1"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                                <td>
                                    <input type="text" readOnly></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>




                {/* <div className="cost-box">
                    <div>
                        <input type="text" value={this.props.cost.pp} readOnly></input><label>pp</label>
                    </div>
                    <div>
                        <input type="text" value={this.props.cost.gp} readOnly></input><label>gp</label>
                    </div>
                    <div>
                        <input type="text" value={this.props.cost.sp} readOnly></input><label>sp</label>
                    </div>
                    <div>
                        <input type="text" value={this.props.cost.cp} readOnly></input><label>cp</label>
                    </div>
                </div> */}




                <button onClick={this.props.handleConvertClick}>Convert</button>
            </div>
        );
    }


}