import * as React from "react";
import styled from "styled-components";
import { Tabs, Tab, Button, Modal } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const OrderInfoTableStyle = styled.div`
  margin-top: 25px;
  width: 1090px;
  font-size: 15px;
`;

const TabsStyle = styled.div`
  margin-top: 25px;
  margin-left:5%; 
  margin-right:15%;
  width: 1100px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
  font-size: 15px;
`;

function orderNumberFormatter(cell, row) {        
  return (
    <OrderNumberLink/>
  );
}

function trackingFormatter(cell, row) {        
  return (
    <TrackingButton/>
  );
}

const columnsUserAccount = [{
  dataField: 'orderNumber',
  text: '신청번호',
  formatter:orderNumberFormatter
  }, {
  dataField: 'productInfo',
  text: '상품정보'}, {
  dataField: 'recipient',
  text: '받는분'}, {
  dataField: 'deliveryPayment',
  text: '운송료'}, {
  dataField: 'deliveryState',
  text: '진행상태'}, {
  dataField: 'deliveryTracking',
  text: '배송조회',
  formatter:trackingFormatter}
];

const data = [
              {"orderNumber":"1234",
                "productInfo":"독일",
                "recipient":"상훈",
                "deliveryPayment":"39500원",
                "deliveryState":"배송완료",
                "deliveryTracking":"송장번호조회"
              },
              {"orderNumber":"4567",
                "productInfo":"portable",
                "recipient":"성준",
                "deliveryPayment":"45800원",
                "deliveryState":"배송완료",
                "deliveryTracking":"송장번호조회"
              },
            ]

const CaptionBaseInfo = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
  padding: '0.5em', fontWeight:'bold' }}>이용현황</h6>;

export class OrderInformation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
       
    };
  }

  componentDidMount() {
  }

  render() {
    return(
      <div>
        <TabsStyle>
        <Tabs
        id="controlled-tab-example"
        defaultActiveKey="total"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
        >
            <Tab eventKey="total" title="전체">
             {/*ToDo: contents located in center */}
            <OrderInfoTableStyle>
                <BootstrapTable keyField='objectId'  data={ data } columns={ columnsUserAccount } 
                    bordered={ true }  noDataIndication="Table is empty"  />
            </OrderInfoTableStyle>
            </Tab>
            {/* <Tab eventKey="germnay" title="독일"> </Tab> */}
      </Tabs>
      </TabsStyle>
      </div>
    );}
}

export class OrderNumberLink extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    };
  }
  
  componentDidMount() {
   
  }

  render() {
    return(
      // <div>011011011</div>
      <Link to="/">23259875</Link>
      // <Route exact path='/' component={Home}></Route>
    );}
}

export class TrackingButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal:false
    };

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  
  componentDidMount() {
   
  }

  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalShow() {
      this.setState({ showModal: true });
  }

  render() {
    return(
      <div>
      <Button variant="secondary" size="sm" onClick={this.handleModalShow}>통관정보조회</Button>
        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>통관정보조회</Modal.Title>
          </Modal.Header>
          <Modal.Body>한국배송중</Modal.Body>
          <Modal.Footer>
            <NavLink to="/">
            <Button variant="success" onClick={this.handleModalClose}>
              예
            </Button>
            </NavLink>
            <Button variant="dark" onClick={this.handleModalClose}>
              취소
            </Button>
          </Modal.Footer>
          </Modal>
      </div>
    );}
}