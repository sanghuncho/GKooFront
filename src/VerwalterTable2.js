import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import styled from "styled-components";

 var products = [{
    objectId: 1,
    nummer: "Product1",
    bezeichnung: 120
  }];
  
  const columns = [{
    dataField: 'objectId',
    text: 'Objekt ID'
  }, {
    dataField: 'nummer',
    text: 'Verwalter Nummer'
  }, {
    dataField: 'bezeichnung',
    text: 'Bezeichnung'
  }];

  const VerwalterTableWidth = styled.div`
  margin-top: 50px;
  margin-left: 50px;
  width: 1000px;
`;

export class VerwalterTable2 extends React.Component{

    constructor(props, context) {
        super(props, context);
  
        this.state = {
        verwalter:[],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/verwalterlist')
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( {verwalter: data} )
          console.log(data)
          console.log(this.state.verwalter);
          this.verwalterList = this.state.verwalter;
          console.log(this.verwalterList.toString());
          })      
    }
      
    render() {
        return(
        <div>
            <VerwalterTableWidth>
            <BootstrapTable keyField='id' data={ this.state.verwalter }  columns={ columns }/>    
            </VerwalterTableWidth>      
        </div>
    );}
}

export default VerwalterTable2
 