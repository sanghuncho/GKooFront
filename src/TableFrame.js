import * as React from "react";import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import styled from "styled-components";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { FormGroup, Form, ControlLabel, FormControl, Button } from 'react-bootstrap';

const VerwalterColumns = [{
    dataField: 'objectId',
    text: 'Objekt ID',
  }, {
    dataField: 'nummer',
    text: 'Verwalter Nummer',
  }, {
    dataField: 'bezeichnung',
    text: 'Bezeichnung',
  }];

const WeColumns = [{
  dataField: 'number',
  text: 'We. Nummer',
}, {
  dataField: 'name',
  text: 'Name',
}, {
  dataField: 'zipCode',
  text: 'PLZ',
}, {
  dataField: 'city',
  text: 'Ort',
}, {
  dataField: 'country',
  text: 'Land',
}, {
  dataField: 'buchungszeitraumVon',
  text: 'Buchungszeitraum von',
}, {
  dataField: 'buchungszeitraumBis',
  text: 'Buchungszeitraum bis',
}];

  export class TableFrame extends React.Component {

    constructor(props, context) {
      super(props, context);
    
    this.state = {
      verwalter:[],
      value: '',
      verwalterNumber:'',
      todoItems: '',
    };

  }

  componentDidMount(){
    
    console.log(this.props.propertyTest);
  }

    render(){

      let form;

      if(true){
        form = <VerwalterNumberInputForm/>
      } else {
        form = <WeNumberInputForm/>
      }
      return(
        <div>
        {/* <BootstrapTable keyField='objectId' data={ this.props.verwalter } columns={ VerwalterColumns } 
        hover pagination={ paginationFactory() } bordered={ false }  noDataIndication="Tabelle ist leer"/> */}
        {/* <VerwalterNumberInputForm/> */}
        {/* {form} */}

        <button
                  type="button"
                  className="btn btn-xs btn-danger"
                  onClick={() => {
                    this.props.selectedTask("ddd");
                  }}
                >
                </button>
          <p>From VW valuein tableFrame => {this.props.propertyTest}</p>
        
        </div>
      );
  
    }

  }

  export class VerwalterNumberInputForm extends React.Component{
    render(){
      return(
        <FormControl
                  type="text"
                  // value={this.state.value}
                  placeholder="Verwalter Nummer"
                  // onChange={this.handleChange}
                />
      );
    }
  }

  export class WeNumberInputForm extends React.Component{
    render(){
      return(
        <div>
        <FormControl
        type="text"
        // vwNr={this.state.vwNr}
        placeholder="Verwalter Nummer"
        // onChange={this.handleChangeVw}
      />{' '}
      <FormControl
        type="text"
        // weNr={this.state.weNr}
        placeholder="We. Nummer"
        // onChange={this.handleChangeWe}
      />    
      </div>
      );
    }
  }