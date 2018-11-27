import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import styled from "styled-components";
import { FormGroup, Form, ControlLabel, FormControl, Button } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import {withRouter} from 'react-router';

const WeFrom = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;

const WeTableWidth = styled.div`
  margin-top: 25px;
  margin-left: 50px;
  width: 1400px;
`;

const columns = [{
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

export class WeTable extends React.Component {

  constructor(props, context, match) {
    super(props, context);

  this.handleChangeVw = this.handleChangeVw.bind(this);
  this.handleChangeWe = this.handleChangeWe.bind(this);
  this.handleClick = this.handleClick.bind(this);
    this.state = {
      weList:[],
      vwNr: '',
      id: '',
    };
  }

  handleClick(e){
    const verwalterNr = this.state.vwNr;
    const weNr = this.state.weNr;
    console.log("VW" + this.state.vwNr);
    console.log("WE" + this.state.weNr);
    if (this.isPositiveInteger(verwalterNr) && weNr == ''){
      this.setState({weList :''});
      this.fetchWeList(verwalterNr);
      
    } else if(this.isPositiveInteger(verwalterNr) && this.isPositiveInteger(weNr) ){
      this.fetchElementByNumber(verwalterNr, weNr);
    }else {
      this.clearTable();
    } 
  }

  setVerwalter(){
    console.log('setVerwalter');
  }

  clearTable(){
    this.setState({weList :''});
  }

  fetchElementByNumber(verwalterNr, weNr) {
    console.log(verwalterNr);
    console.log(weNr);
    fetch('http://localhost:8080/verwalter/' + verwalterNr + '/we/' + weNr)
      .then((result) => {
        console.log(result);
        return result.json();
      }).then((data) => {
       
        var weList = [];
        weList.push(data)
        this.setState( {weList: weList} )         
        console.log(data);
        })     
  }

  isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
  }

  fetchWeList(verwalterNr){
    fetch('http://localhost:8080/verwalter/' + verwalterNr + '/we/')
      .then((result) => {
        return result.json();
      }).then((data) => {
        console.log("fetchWeList : "+data)
        this.setState( { weList: data} )
        // /this.verwalterList = this.state.verwalter;
        })   
  }

  handleChangeVw(e) {
    this.setState({ vwNr: e.target.value });
  }

  handleChangeWe(e) {
    this.setState({ weNr: e.target.value });
  }

  componentDidMount(props){
    
  }

  loadId(props){
    //console.log(this.routeParam);
  }

  render() {
    return(
      <div>
        <WeFrom>
          <Form inline>
          <FormGroup>
            <ControlLabel></ControlLabel>          
                <FormControl
                  type="text"
                  vwNr={this.state.vwNr}
                  placeholder="Verwalter Nummer"
                  onChange={this.handleChangeVw}
                />{' '}
                <FormControl
                  type="text"
                  weNr={this.state.weNr}
                  placeholder="We. Nummer"
                  onChange={this.handleChangeWe}
                />        
                <FormControl.Feedback />
            </FormGroup>{' '}
            <Button style={{ background:'#5e812e', color:'white', marginLeft:'2px'}} onClick={this.handleClick}>Suchen</Button>      
          </Form>
        </WeFrom>

        <WeTableWidth> 
          <BootstrapTable keyField='objectId' data={ this.state.weList } columns={ columns }  hover pagination={ paginationFactory() } />
        </WeTableWidth>
        
    </div>
  );}
}

//export default withRouter(this.WeTable);