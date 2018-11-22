import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import styled from "styled-components";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FormGroup, Form, ControlLabel, FormControl, Button, InputGroup} from 'react-bootstrap';
import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table2-filter';

const VewalterFrom = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;

 var products = [{
    objectId: 1,
    nummer: "Product1",
    bezeichnung: 120
  }];
  
  const columns = [{
    dataField: 'objectId',
    text: 'Objekt ID',
    searchable: false,
  }, {
    dataField: 'nummer',
    text: 'Verwalter Nummer',
  }, {
    dataField: 'bezeichnung',
    text: 'Bezeichnung',
    searchable: false,
  }];

  const VerwalterTableWidth = styled.div`
  margin-top: 50px;
  margin-left: 50px;
  width: 1000px;
`;

export class VerwalterTable extends React.Component{
  
    constructor(props, context) {
        super(props, context);

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);

  
        this.state = {
          verwalter:[],
          value: '',
          found:'',
        };
    }

    handleClick(e){
      console.log("click"); 
      console.log(this.state.value);
      const nr = this.state.value;
      const array = this.state.verwalter;
     
      var found = this.findArrayElementByTitle(array, nr);
      console.log(found);
      this.setState({verwalter :''});
      var newArray = [];
      newArray.push(found);
      this.setState({verwalter: newArray});
    }

    findArrayElementByTitle(array, nr) {
      console.log(array);
      console.log(nr);
      return array.find((element) => {
        return element.nummer == nr;
      })
    }
    
    handleChange(e) {
       this.setState({ value: e.target.value });
    }

    componentDidMount() {
        fetch('http://localhost:8080/verwalterlist')
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( {verwalter: data} )
          this.verwalterList = this.state.verwalter;
          console.log(this.verwalterList)
          console.log(this.verwalterList.toString());
          })      
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
      <ToolkitProvider
            keyField="id"
            data={ this.state.verwalter }
            columns={ columns }
            search>
        {
          props => (
            <div>
              {/* <VewalterFrom>
                <MySearch { ...props.searchProps }/>
              </VewalterFrom> */}
               
              <VerwalterTableWidth>
                <BootstrapTable  { ...props.baseProps } />    
              </VerwalterTableWidth>      
            </div>
            )
        }
      </ToolkitProvider>
      </div>
    );}
}

const MySearch = (props) => {
  
  let input;
  const handleClick = () => {
    props.onSearch(input.value);
  };

  return (
    <div>
      <Form inline>
      <input
        className="form-control"
        style={ { backgroundColor: 'white' } }
        ref={ n => input = n }
        type="text"
        
      />{''}
      <Button style={{ background: '#61a556',color: 'white', marginLeft:'2px' }} onClick={ handleClick }> Suchen </Button>
      </Form>
    </div>
  );
};

export default VerwalterTable
 