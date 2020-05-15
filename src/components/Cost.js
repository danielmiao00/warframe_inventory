import React from 'react';

export default class Cost extends React.Component {
    state = {
        showTitle: true,
        title: "Cost",
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
                    <input type="number" value={this.props.percentage} min="1" max="100" onChange={this.props.handlePercentageChange}></input>
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
                                    <input type="text" value={this.props.cost.pp.quantity} readOnly></input><label>pp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" value={this.props.playerCount} onChange={this.props.handlePlayerCountChange} min="1" max="100"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.pp.profit}></input><label>pp</label>
                                </td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.pp.extra}></input><label>pp</label>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="text" value={this.props.cost.gp.quantity} readOnly></input><label>gp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" value={this.props.playerCount} onChange={this.props.handlePlayerCountChange} min="1" max="100"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.gp.profit}></input><label>gp</label>
                                </td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.gp.extra}></input><label>gp</label>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="text" value={this.props.cost.sp.quantity} readOnly></input><label>sp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" value={this.props.playerCount} onChange={this.props.handlePlayerCountChange} min="1" max="100"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.sp.profit}></input><label>sp</label>
                                </td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.sp.extra}></input><label>sp</label>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="text" value={this.props.cost.cp.quantity} readOnly></input><label>cp</label>
                                </td>
                                <td><label>/</label></td>
                                <td>
                                    <input type="number" value={this.props.playerCount} onChange={this.props.handlePlayerCountChange} min="1" max="100"></input>
                                </td>
                                <td>=</td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.cp.profit}></input><label>cp</label>
                                </td>
                                <td>
                                    <input type="text" readOnly value={this.props.cost.cp.extra}></input><label>cp</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }


}