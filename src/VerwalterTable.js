import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import styled from "styled-components";
import { FormGroup, Form, FormControl, Button } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

  const VewalterFrom = styled.div`
    margin-top: 50px;
    margin-bottom : 10px;
    margin-left:5%; 
    margin-right:15%;
  `;

  const VerwalterTableWidth = styled.div`
    margin-top: 25px;
    margin-left:5%; 
    margin-right:15%;
    width: 1100px;
    background: #FFFFFF;
    padding: 0px 5px 5px 5px;
    box-shadow: 2px 2px 3px 3px #888; 
  `;
  
  // const columns = [{
  //   dataField: 'objectId',
  //   text: 'Objekt ID',
  // }, {
  //   dataField: 'nummer',
  //   text: 'Verwalter Nummer',
  // }, {
  //   dataField: 'bezeichnung',
  //   text: 'Bezeichnung',
  // }];

  const columns = [{
    dataField: 'gkooId',
    text: 'Gkoo ID',
  }, {
    dataField: 'date',
    text: '날짜',
  }, {
    dataField: 'transactionMoney',
    text: '입금액',
  }, {
    dataField: 'depositMoney',
    text: '적립금',
  }, {
    dataField: 'itemName',
    text: '아이템',
  }, {
    dataField: 'itemFoto',
    text: '아이템 사진'
  }, {
    dataField: 'purchasePrice',
    text: '구매 총금액'
  }, {
    dataField: 'shippingPrice',
    text: '국제배송비'
  }, {
    dataField: 'settleAmount',
    text: '최종정산금액'
  }
  
];

export class VerwalterTable extends React.Component{
  
    constructor(props, context) {
        super(props, context);

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
        this.state = {
          verwalter:[],
          value: '',
          redirect:false,
          
        };
    }

    setRedirect() {
      this.setState({
        redirect: true,
      });
      
    }

    handleClick(e){
      console.log("handleClick")
      const verwalterNr = this.state.value;
      if (this.isPositiveInteger(verwalterNr)){
        this.setState({verwalter :''});
        this.fetchElementByNumber(verwalterNr);
      } else {
        this.fetchVerwalterList();
      } 
    }

    isPositiveInteger(n) {
      return n >>> 0 === parseFloat(n);
    }

    fetchElementByNumber(verwalterNr) {
      console.log(verwalterNr);
      fetch('http://localhost:8080/verwalter/' + verwalterNr)
        .then((result) => {
           return result.json();
        }).then((data) => {
          var verwalterList = [];
          verwalterList.push(data)
          this.setState( {verwalter: verwalterList} )         
          console.log(data);
          })     
    }

    fetchVerwalterList(){
      fetch('http://localhost:8080/endSettlementList')
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { verwalter: data} )
          this.verwalterList = this.state.verwalter;
          })   
    }
    
    handleChange(e) {
       this.setState({ value: e.target.value });
    }

    componentDidMount() {
      this.fetchVerwalterList() 
    }
    
    render() {
      const rowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(`clicked on row with index: ${rowIndex}`);
          this.setRedirect();
        }
      };

      return(
      <div>
        <VewalterFrom>
          <Form inline>
          <FormGroup>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Verwalter Nummer"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
            </FormGroup>{' '}
            <Button style={{ background:'#5e812e', color:'white', marginLeft:'2px' }} onClick={this.handleClick}>Suchen</Button>      
          </Form>
        </VewalterFrom>     
        <VerwalterTableWidth>
          <BootstrapTable keyField='objectId' data={ this.state.verwalter } columns={ columns } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Tabelle ist leer"/>
        </VerwalterTableWidth>
      </div>
    );}
}

export default VerwalterTable
 