import * as React from "react";
import { FormGroup, Form, ControlLabel, FormControl, Button, InputGroup} from 'react-bootstrap';
import styled from "styled-components";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const VewalterFrom = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;

const VerwalterTableWidth = styled.div`
  margin-top: 50px;
  margin-left: 50px;
  width: 1000px;
`;

var green = '#61a556';

export class Verwalter extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      value: ''
    };

  }

  handleClick(e){
    console.log("click"); 
    console.log(this.state.value);
  }
  
  handleChange(e) {
     this.setState({ value: e.target.value });
  }

  render() {
    return(
    <div>
    <VewalterFrom>
      <Form inline>
       <FormGroup>
        <ControlLabel></ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Verwalter Nummer"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
        </FormGroup>{' '}
        <Button style={{ background: '#61a556',color: 'white', marginLeft:'2px' }} onClick={this.handleClick}>Suchen</Button>      
     </Form>
     </VewalterFrom>
     {/* <VerwalterBody/> */}
     <VerwalterTable/>
     </div>
    );}
}

export default Verwalter;

const VerwalterBody = () => (
  
  <div>
    <h1>Verwalter</h1>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
  </div>
  
);

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
}];

const VerwalterTable = () => (
  <div className='verwalterTable'>
  <VerwalterTableWidth>
   <BootstrapTable data={ products }  hover condensed>
      <TableHeaderColumn width='50' isKey dataField='id'>Objekt ID</TableHeaderColumn>
      <TableHeaderColumn width='50' dataField='name'>Verwalter Nummer</TableHeaderColumn>
      <TableHeaderColumn width='50' dataField='price'>Bezeichnung</TableHeaderColumn>
  </BootstrapTable>
  </VerwalterTableWidth>
  </div>

);