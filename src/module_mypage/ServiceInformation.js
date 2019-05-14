import * as React from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, NavLink } from "react-router-dom";

const ServiceInfoTableStyle = styled.div`
  margin-top: 25px;
  margin-left:1%; 
  margin-right:15%;
  width: 1100px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
  font-size: 15px;
`;

function recipientFormatter(cell, row) {        
  return (
    <RecipientLink cell = {cell}/>
  );
}

const columnsUserAccount = [{
  dataField: 'recipientState',
  text: '입고현황',
  formatter:recipientFormatter
  },{
  dataField: 'paymentState',
  text: '결제현황',
  
  }, {
  dataField: 'deliveryState',
  text: '배송현황',
  }, {
  dataField: 'extraState',
  text: '기타'}
];

const data = [
              // {"recipientState":"0",
              //   "paymentState":"0",
              //   "deliveryState":"0",
              //   "extraState":"0"
              // },
              {"recipientState":"입고대기",
                "paymentState":"결제요청",
                "deliveryState":"해외배송중",
                "extraState":"신청취소"
              },
              {"recipientState":"입고완료",
                "paymentState":"결제완료",
                "deliveryState":"통관진행",
                "extraState":"폐기"
              },
              {"recipientState":"",
              "paymentState":"",
              "deliveryState":"국내배송",
              "extraState":""
              },
              {"recipientState":"",
              "paymentState":"",
              "deliveryState":"배송완료",
              "extraState":""
              },
            ]

const CaptionBaseInfo = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
  padding: '0.5em', fontWeight:'bold' }}>이용현황</h6>;

export class ServiceInformation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userAccount:'',

    };
  }

  componentDidMount() {
  }

  setRedirect() {
    this.setState({
    });
  }
  
  render() {
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(`clicked on row with index: ${rowIndex}`);
        this.setRedirect();
      }
    };
    return(
    <ServiceInfoTableStyle>
      <CaptionBaseInfo/>
      <BootstrapTable keyField='objectId'  data={ data } columns={ columnsUserAccount } 
         bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
    </ServiceInfoTableStyle>
    );}
}

class RecipientLink extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      const cell = this.props.cell
      console.log(cell)
      return (
        <div>
           <Link to="/">{cell}</Link>
        </div>
      );
    }    
}

