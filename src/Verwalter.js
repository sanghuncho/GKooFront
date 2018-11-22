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
      verwalter:[],
      isLoading:false
    };

  }

  handleClick(e){
    console.log("click"); 
    
    
      // Github fetch library : https://github.com/github/fetch
      // Call the API page
      //this.loadData();
      
  }

  //loadData(){
  componentDidMount() {
    fetch('http://localhost:8080/verwalterlist')
    .then((result) => {
      // Get the result
      // If we want text, call result.text()
      //this.setState({objectId:result.objectId, number:result.number, name:result.name})
      
       return result.json();
      //result.json()
    }).then((data) => {
      this.setState( {verwalter: data} )
      console.log(data)
      console.log(this.state.verwalter);
      this.verwalterList = this.state.verwalter;
      console.log(this.verwalterList.toString());
      })      
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

      <VerwalterTable verwalter = {this.state.verwalter}/>
    </div>
    );}
}

export default Verwalter;

const VerwalterBody = () => (
  
  <div>
    <h1>Verwalter</h1>
    {/* <p>{this.state.data}</p> */}
    {/* <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p> */}
  </div>
  
);

function VerwalterTable(state) {
  return (
    <VerwalterTableWidth>
      <BootstrapTable data={ state.verwalter }  hover condensed>
          <TableHeaderColumn width='50' isKey dataField='objectId'>Objekt ID</TableHeaderColumn>
          <TableHeaderColumn width='50' dataField='nummer'>Verwalter Nummer</TableHeaderColumn>
          <TableHeaderColumn width='50' dataField='bezeichnung'>Bezeichnung</TableHeaderColumn>
      </BootstrapTable>
    </VerwalterTableWidth>
    );
}