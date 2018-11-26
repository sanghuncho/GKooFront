import * as React from "react";
import { FormGroup, Form, ControlLabel, FormControl, Button, InputGroup} from 'react-bootstrap';
import styled from "styled-components";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { VerwalterTable } from './VerwalterTable'; 

const VewalterFrom = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;

var green = '#61a556';

var verwalterList = [{
  objectId:[],
  bezeichnung:[],
  name:[]}
];


  //private apiUrl = "http://localhost:8080/verwalter/";
  //private api_List_Url = "http://localhost:8080/verwalterlist";

export class Verwalter extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      value: '',
    };

  }

  handleClick(e){
    console.log("click"); 
      
  }
  
  handleChange(e) {
     this.setState({ value: e.target.value });
  }

  render() {
    return(
    <div>
      {/* <VewalterFrom>
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
      </VewalterFrom> */}
      
     <VerwalterTable/>
    </div>
    );}
}

export default Verwalter;

