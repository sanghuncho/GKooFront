import * as React from "react";
import styled from "styled-components";
import { Tabs, Tab, Button, Modal, Card } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Redirect } from 'react-router';
import { getFormattedDeliveryPrice } from '../module_base_component/BaseUtil'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BaseTablePagination } from '../module_base_component/BaseTable'
import { Image } from 'react-bootstrap';
import { TrackingButton } from './DeliveryInformation'

const OrderInfoTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
`;

const TabsStyle = styled.div`
  margin-top: 25px;
  margin-left:1%; 
  margin-right:15%;
  width: 100%;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
  font-size: 13px;
`;

const TrackingButtonStyle = styled.div`
    text-align:center;
`;

function trackingFormatter(cell, row) {
  return (
    <TrackingButtonStyle>
      <TrackingButton
        orderid={row.orderid}
        deliveryTracking={row.deliveryTracking}
        />
     </TrackingButtonStyle>
  );
}

function orderNumberFormatter(cell, row) {        
  return (
    <OrderNumberLink orderid={cell}/>
  );
}

function detailPageLinkFormatter(cell, row) {        
  return (
    <DetailPageLinkButton orderid={cell}/>
  );
}

//exported to paymentHistory
export function detailBuyingServiceFormatter(cell, row) {        
  return (
    <DetailBuyingServiceButton orderid={cell}/>
  );
}

function deliveryStateFormatter(cell, row) {        
  return (
    <DeliveryState cell={cell}/>
  );
}

//moved to paymentUtil since 04.07.2020
function currencyFormatter(cell, row) {        
  return (
    <KoreaCurrencyFormatter cell={cell}/>
  );
}

const columnsUserAccount = [
  {
    dataField: 'orderid',
    text: '신청번호',
    headerStyle: (colum, colIndex) => {
      return { width: '130px', textAlign: 'center' };
    }
  },{
    dataField: 'productInfo',
    text: '상품정보'
  },
  // {
  //   dataField: 'recipient',
  //   text: '받는분'
  // }, 
  {
    dataField: 'deliveryPayment',
    text: '운송료',
    formatter:currencyFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '90px', textAlign: 'center' };
    }
  }, {
    dataField: 'deliveryState',
    text: '진행상태',
    formatter:deliveryStateFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '110px', textAlign: 'center' };
    }
  },{
    dataField: 'orderDate',
    text: '신청날짜',
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'center' };
    }
  },{
    dataField: 'deliveryTracking',
    text: '배송조회',
    formatter:trackingFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  },{
    dataField: 'orderid',
    text: '상세내역',
    formatter:detailPageLinkFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  }
];

const data = [
              {"orderid":"1234",
                "productInfo":"독일",
                "recipient":"상훈",
                "deliveryPayment":"39500원",
                "deliveryState":"배송완료",
                "deliveryTracking":"송장번호조회"
              },
              {"orderid":"4567",
                "productInfo":"portable",
                "recipient":"성준",
                "deliveryPayment":"45800원",
                "deliveryState":"배송완료",
                "deliveryTracking":"송장번호조회"
              },
            ]

const CaptionBaseInfo = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
  padding: '0.5em', fontWeight:'bold' }}>배송대행 이용현황</h6>;

const expandRowA = {
    renderer: row => (
      <div>
        <p>A</p>
      </div>
    ),
    
    onlyOneExpanding: true,
};
const expandRowB = {
    renderer: row => (
      <div>
        <p>B</p>
      </div>
    ),  
    onlyOneExpanding: true,
  };

{/* 배송대행 이용현황 */}
export class OrderInformation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const expand = expandRowA
    return(
      <div>
        <Card border="dark" style={{ width: '80%', marginTop:'1rem' }}>
        <Card.Header>
          {/* 배송대행 이용현황 */}
          {this.props.serviceTitle}
        </Card.Header>
        {/* <TabsStyle> */}
        <Card.Body >
        <Tabs
          id="controlled-tab-example"
          defaultActiveKey="total"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
          style={{marginLeft:'2px'}}
        >
        <Tab eventKey="total" title="전체">
              <OrderInfoTableStyle>
              {/*ToDo: contents located in center */}
                  <BaseTablePagination
                   keyField='objectId'  
                   data={ this.props.orderInformation } 
                   columns={ columnsUserAccount } 
                   bordered={ true }  
                   noDataIndication="주문하신 물품이 없습니다"
                  />
              </OrderInfoTableStyle>
        </Tab>
            {/* <Tab eventKey="germnay" title="독일"> </Tab> */}
      </Tabs>
      </Card.Body>
      {/* </TabsStyle> */}
      </Card> 
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
    const orderid = this.props.orderid
    return(
      <Link to={{pathname:"detailsmypage/"+ orderid}}>
        {orderid}</Link>
    );}
 
}

export class DetailPageLinkButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redirect:false,
    };
    this.handleLinkDetailPage = this.handleLinkDetailPage.bind(this);
    
  }
  
  componentDidMount() {
   
  }

  handleLinkDetailPage(){
    this.setState({redirect: true});
  }

  render() {
    const orderid = this.props.orderid
    const link = "/detailsmypage/" + orderid
    //console.log(link)
    if (this.state.redirect) {
      return <Redirect push to={link}/>
    }

    return(
      <div>
        <Button variant="outline-secondary" size="sm" 
          onClick={this.handleLinkDetailPage}>Go</Button>
      </div>
    );}
}

export class DetailBuyingServiceButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redirect:false,
    };
    this.handleLinkDetailPage = this.handleLinkDetailPage.bind(this);
  }
  
  componentDidMount() {
   
  }

  handleLinkDetailPage(){
    this.setState({redirect: true});
  }

  render() {
    const orderid = this.props.orderid
    const link = "/detailsbuyingService/" + orderid
    //console.log(link)
    if (this.state.redirect) {
      return <Redirect push to={link}/>
    }

    return(
      <div>
        <Button variant="outline-secondary" size="sm" 
          onClick={this.handleLinkDetailPage}>Go</Button>
      </div>
    );}
}

class DeliveryState extends React.Component {
  constructor(props) {
      super(props);
    }
    
    render() {
      const state = this.props.cell;
      let deliveryState;

      // 입고대기 (1),
      // 입고완료 (2),
      // 결제요청 (3),
      // 결제완료 (4),
      // 해외배송중 (5),
      // 통관진행 (6),
      // 국내배송 (7),
      // 배송완료 (8)

      if (state==1) {
        deliveryState = "입고대기";
      } else if(state==2){
        deliveryState = "입고완료";
      } else if(state==3){
        deliveryState = "결제대기";
      } else if(state==4){
        deliveryState = "결제완료";
      } else if(state==5){
        deliveryState = "해외배송중";
      } else if(state==6){
        deliveryState = "통관진행";
      } else if(state==7){
        deliveryState = "국내배송";
      } else if(state==8){
        deliveryState = "배송완료";
      } else {
        deliveryState = "";
      }

      return (
        <div>
          {deliveryState}
       </div>
      );
    }    
}

//moved to paymentUtil since 04.07.2020
class KoreaCurrencyFormatter extends React.Component {
  constructor(props) {
      super(props);
    }
    
    render() {
      let formattedPrice = getFormattedDeliveryPrice(this.props.cell)

      return (
        <div>
          {formattedPrice}
       </div>
      );
    }    
}

{/* 구매대행 */}
const columnsBuyingService = [
  {
    dataField: 'orderid',
    text: '신청번호',
    headerStyle: (colum, colIndex) => {
      return { width: '130px', textAlign: 'center' };
    }
  },{
    dataField: 'productInfo',
    text: '상품정보'
  },{
    dataField: 'mainImageUrl',
    text: '이미지',
    formatter:imageFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '110px', textAlign: 'center' };
    }
  },{
    dataField: 'buyingPrice',
    text: '대행 비용',
    formatter:currencyFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '90px', textAlign: 'center' };
    }
  }, {
    dataField: 'deliveryPayment',
    text: '운송료',
    formatter:currencyFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  }, {
    dataField: 'buyingServiceState',
    text: '진행상태',
    formatter:buyingServiceStateFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '110px', textAlign: 'center' };
    }
  },{
    dataField: 'orderDate',
    text: '신청날짜',
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'center' };
    }
  },{
    dataField: 'deliveryTracking',
    text: '배송조회',
    formatter:trackingFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  },{
    dataField: 'orderid',
    text: '상세내역',
    formatter:detailBuyingServiceFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  }
];

{/* 구매대행 이용현황 */}
export class BuyingServiceOrderData extends React.Component {
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
        <Card border="dark" style={{ width: '80%', marginTop:'1rem' }}>
        <Card.Header>
          {/* 구매대행 이용현황 */}
          {this.props.serviceTitle}
        </Card.Header>
        <Card.Body >
        <Tabs
          id="controlled-tab-example"
          defaultActiveKey="total"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
          style={{marginLeft:'2px'}}
        >
        <Tab eventKey="total" title="전체">
              <OrderInfoTableStyle>
              {/*ToDo: contents located in center */}
                  <BaseTablePagination
                      keyField='objectId'  
                      data={ this.props.buyingOrderData } 
                      columns={ columnsBuyingService } 
                      bordered={ true }  
                      noDataIndication="주문하신 물품이 없습니다"
                  />
              </OrderInfoTableStyle>
        </Tab>
            {/* <Tab eventKey="germnay" title="독일"> </Tab> */}
      </Tabs>
      </Card.Body>
      {/* </TabsStyle> */}
      </Card> 
      </div>
    );}
}

function imageFormatter(cell, row) {        
  return (
    <ImageFormatter cell={cell}/>
  );
}

class ImageFormatter extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
         <Image src = {this.props.cell} 
          style={{ width: '100%', height: '40px'}}/>
       </div>
      );
    }    
}


const ServiceStateStyle = styled.div`
  font-size: 11px;
`;

function buyingServiceStateFormatter(cell, row) {        
  return (
    <BuyinServiceState cell={cell}/>
  );
}

class BuyinServiceState extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      const state = this.props.cell;
      let buyinServiceState;

      // 입고대기 (1),
      // 입고완료 (2),
      // 결제요청 (3),
      // 결제완료 (4),
      // 해외배송중 (5),
      // 통관진행 (6),
      // 국내배송 (7),
      // 배송완료 (8)

      if (state==1) {
        buyinServiceState = "물품 결제대기";
      } else if(state==2){
        buyinServiceState = "물품 결제완료";
      } else if(state==3){
        buyinServiceState = "배송비 결제대기";
      } else if(state==4){
        buyinServiceState = "배송비 결제완료";
      } else if(state==5){
        buyinServiceState = "해외배송중";
      } else if(state==6){
        buyinServiceState = "통관진행";
      } else if(state==7){
        buyinServiceState = "국내배송";
      } else if(state==8){
        buyinServiceState = "배송완료";
      }  else {
        
      }

      return (
        <div>
          <ServiceStateStyle>
            {buyinServiceState}
          </ServiceStateStyle>
       </div>
      );
    }    
}