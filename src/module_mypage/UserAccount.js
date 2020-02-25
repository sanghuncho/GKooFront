import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import styled from "styled-components";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Table, Image, Button, Card, CardGroup } from "react-bootstrap"
import { OrderInformation } from "./OrderInformation";
import { WarehouseInformation } from "./WarehouseInformation";
import { PaymentInformation } from "./PaymentInformation";
import { DeliveryInformation } from "./DeliveryInformation";
import { UserBaseInfo } from "./UserBaseInfo";

  const PurchasingTableStyle = styled.div`
    margin-top: 25px;
    margin-left:1%; 
    margin-right:15%;
    width: 1100px;
    background: #FFFFFF;
    padding: 0px 5px 5px 5px;
    font-size: 13px;
    box-shadow: 2px 2px 3px 3px #888; 
  `;

const columnsUserAccount = [{
    dataField: 'date',
    text: '날짜',
  },{
    dataField: 'transactionMoney',
    text: '입금액',
    formatter:unitFormatter
  }, {
    dataField: 'depositMoney',
    text: '적립금',
    formatter:unitFormatter
  }, {
    dataField: 'gkooId',
    text: 'Gkoo ID',
  }, {
    dataField: 'itemName',
    text: '물품명',
  }, {
    dataField: 'itemImageUrl',
    text: '물품사진',
    formatter: imageFormatter
  }, {
    dataField: 'purchasePrice',
    text: '구매 총금액',
    formatter:unitFormatter
  }, {
    dataField: 'shippingPrice',
    text: '국제배송비',
    formatter:unitFormatter
  }, {
    dataField: 'settleAmount',
    text: '최종정산금액',
    formatter:unitFormatter
  }
  ];

const columnsPurchasing = [{
  dataField: 'gkooId',
  text: 'Gkoo ID',
}, {
  dataField: 'productName',
  text: '물품명',
}, {
  dataField: 'productImageUrl',
  text: '물품사진',
  formatter: imageFormatter
}, {
  dataField: 'productPrice',
  text: '물품 가격',
  formatter:unitFormatter
}, {
  dataField: 'serviceFee',
  text: '수수료',
  formatter:unitFormatter
}, {
  dataField: 'totalPrice',
  text: '총금액',
  formatter:unitFormatter
}, {
  dataField: 'status',
  text: '진행과정',
} 
];

function imageFormatter(cell) {    
  return (
    <ImageObject cell = {cell}/>
  );
}

function unitFormatter(cell, row) {        
  return (
    <span>
      { cell }원
    </span>
  );
}

 {/* ToDo : userAccount name as mypagebody */}
export class UserAccount extends React.Component{
  
    constructor(props, context) {
        super(props, context);
      this.state = {
          userAccount:[],
          purchaseOrder:[],
          value: '',
          redirect:false,
          image:'',
          loaded:false,
          accessToken:''
        };
    }

    setRedirect() {
      this.setState({
        redirect: true,
      });
    }
 
    handleChange(e) {
       this.setState({ value: e.target.value });
    }

    componentDidMount() {
    }

    render() {
      const rowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(`clicked on row with index: ${rowIndex}`);
          this.setRedirect();
        }
      };

      const CaptionPurchaing = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
       padding: '0.5em', fontWeight:'bold' }}>결제 현황</h6>;
     
      return(
      <div>
        
        <UserBaseInfo customerStatusData={this.props.customerStatusData}
                      userBaseInfo={this.props.userBaseInfo}
                      accessToken={this.props.accessToken}/>
        
        {/* 이용현황 -- 나중에 코딩 */}
        {/* <ServiceInformation/> */}
        
        {/* 전체메뉴 */}
        <OrderInformation orderInformation={this.props.orderInformation}
          serviceTitle={"배송대행 이용현황"} />

        <CardGroup style={{ width:'80%', marginTop:'1rem',  marginBottom:'1rem'}}>
        <Card border="dark">
          <Card.Header>
            입고 현황
          </Card.Header>
          <Card.Body>
          {/* 입고 현황 */}
            <WarehouseInformation warehouseInformation={this.props.warehouseInformation}
                                accessToken={this.props.accessToken}/>
          </Card.Body>
        </Card>
        <Card border="dark">
          <Card.Header>
            결제 현황
          </Card.Header>
          <Card.Body>
          {/* 결제 현황 */}  
          <PaymentInformation paymentData={this.props.paymentData}/>
          </Card.Body>
        </Card>
        <Card border="dark">
          <Card.Header>
            배송 현황
          </Card.Header>
          <Card.Body>
          {/* 배송 현황 */}
          <DeliveryInformation deliveryKoreaData={this.props.deliveryKoreaData}/>
          </Card.Body>
        </Card>
        </CardGroup>



        {/* 결제내역 -- 나중에 코딩 */}
        {/* <PaymentHistory userAccount={ this.props.userAccount }/> */}
        
        {/* <UserAccountTableStyle>
          <CaptionUserAccount/>
          <BootstrapTable keyField='objectId'  data={ this.props.userAccount } columns={ columnsUserAccount } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
        </UserAccountTableStyle> 

        <PurchasingTableStyle>
          <CaptionPurchaing/>
          <BootstrapTable keyField='objectId'  data={ this.props.purchaseOrder } columns={ columnsPurchasing } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
        </PurchasingTableStyle> */}

        {/* <PurchasingTableStyle>
          <CaptionPurchaing/>
          <BootstrapTable keyField='objectId'  data={ this.props.purchaseOrder } columns={ columnsPurchasing } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
        </PurchasingTableStyle> */}

      </div>
    );}
} 

const MyPageBodyTableStyle = styled.div`
  margin-top: 25px;
  margin-left:1%; 
  margin-right:15%;
  margin-bottom:25px;
  width: 1100px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
  font-size: 13px;
`;

function CaptionMypageTable(props) {
  return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
  padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
}

class PaymentHistory extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      const rowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(`clicked on row with index: ${rowIndex}`);
          this.setRedirect();
        }
      };
        
      const ColumnsPaymentHistory = [{
        dataField: 'orderNumber',
        text: '신청번호',
        }, {
        dataField: 'paymentInfo',
        text: '결제정보'}, {
        dataField: 'payment',
        text: '결제금액'},{
        dataField: 'originPayment',
        text: '실결제금액'}, {
        dataField: 'kindPayment',
        text: '결제수단'}, {
        dataField: 'datePayment',
        text: '결제일'}
      ];

      return (
        <div>
          <MyPageBodyTableStyle>
              <CaptionMypageTable title="결제내역"/>
              <BootstrapTable keyField='objectId'  data={ this.props.userAccount } columns={ ColumnsPaymentHistory } 
                  hover bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
          </MyPageBodyTableStyle>
        </div>
      );
    }    
}

export class ImageObject extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      image:'',
      keycloakAuth:'',
      accessToken:''
    };
  }
  
  /** it is useful code for image transformation */
  fetchPurchasedImage(){
    fetch('http://localhost:8888/getItemImage/' + this.props.cell)
      .then((response) => {
         return response.blob();
      }).then((data) => {
        var objectURL = URL.createObjectURL(data);
        this.setState({image: objectURL})
      })
  }

  componentDidMount() {
    var imagefile = 'data:image/jpg;base64,'+ this.props.cell;
    this.setState({image: imagefile})
  }

  render() {
    return(
      <span>
        <Image src={ 'data:image/jpg;base64,'+ this.props.cell } width="80" height="40" responsive/>
      </span>
    );}
}

const UserBaseInfoTableStyle = styled.div`
    margin-top: 10px;
    margin-left:1%; 
    margin-right:15%;
    width: 1100px;
    height:250px;
    background: #FFFFFF;
    padding: 3px 3px 3px 3px;
    box-shadow: 2px 2px 3px 3px #888; 
    font-size: 15px;
  `;

const CaptionBaseInfo = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
  padding: '0.5em', fontWeight:'bold' }}>기본정보
   <Button variant="secondary" size="sm" 
        style={{ marginRight: '10px', float:"right", marginBottom:'10px'}}>배송지관리</Button>
   <Button variant="secondary" size="sm" 
        //onClick={(e) => this.doEditRecipient(e)} 
        style={{ marginRight: '10px', float:"right", marginBottom:'10px'}}>개인정보수정</Button>
  </h6>;

