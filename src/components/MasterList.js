import React from "react";

export default class MasterList extends React.Component {
    constructor(props){
        super(props);

        //Set Default Data
        this.state = {
            masterData:[],
            test: "TESTING!"
        }


        var url = "http://www.dnd5eapi.co/api/equipment";
        var parm = {
          method: "GET",
        };

        fetch(url, parm)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          var masterData = json.results.map((data) =>{
            return {
              id: data.index,
              display: data.name,
              url: data.url
            };
          });
          this.setState({masterData: masterData});

          console.log("Master Data");
          console.log(masterData);
        });
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item 1</td>
                            <td>Cost 1</td>
                        </tr>
                        <tr>
                            <td>Item 2</td>
                            <td>Cost 2</td>
                        </tr>
                        <tr>
                            <td>Item 3</td>
                            <td>Cost 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}