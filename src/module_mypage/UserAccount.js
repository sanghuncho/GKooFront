import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import styled from "styled-components";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Route, Redirect } from 'react-router'
import { Table, Image } from "react-bootstrap"
import item_123 from "../assets/item_123.jpg"
import { ServiceInformation } from "./ServiceInformation";
import { OrderInformation } from "./OrderInformation";

  const UserAccountTableStyle = styled.div`
    margin-top: 25px;
    margin-left:5%; 
    margin-right:15%;
    width: 1100px;
    background: #FFFFFF;
    padding: 0px 5px 5px 5px;
    box-shadow: 2px 2px 3px 3px #888; 
    font-size: 13px;
  `;

  const PurchasingTableStyle = styled.div`
    margin-top: 25px;
    margin-left:5%; 
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

export class UserAccount extends React.Component{
  
    constructor(props, context) {
        super(props, context);

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
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

    handleClick(e){
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

      const CaptionUserAccount = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
       padding: '0.5em', fontWeight:'bold' }}>결제 내역</h6>;

      const CaptionPurchaing = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
       padding: '0.5em', fontWeight:'bold' }}>구매대행 내역</h6>;
      
     
      return(
      <div>
        <UserBaseInfo customerBaseInfo={this.props.customerBaseInfo}/>
        
        <ServiceInformation/>
        
        <OrderInformation/>

        <UserAccountTableStyle>
          <CaptionUserAccount/>
          <BootstrapTable keyField='objectId'  data={ this.props.userAccount } columns={ columnsUserAccount } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
        </UserAccountTableStyle>

        <PurchasingTableStyle>
          <CaptionPurchaing/>
          <BootstrapTable keyField='objectId'  data={ this.props.purchaseOrder } columns={ columnsPurchasing } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
        </PurchasingTableStyle>

      </div>
    );}
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
    margin-top: 30px;
    margin-left:5%; 
    margin-right:15%;
    width: 1100px;
    background: #FFFFFF;
    padding: 3px 3px 3px 3px;
    box-shadow: 2px 2px 3px 3px #888; 
    font-size: 15px;
  `;

const CaptionBaseInfo = () => <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
  padding: '0.5em', fontWeight:'bold' }}>기본정보</h6>;

export class UserBaseInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      customerBaseInfo:'',
      value: '',
    };
  }

  componentDidMount() {
  }
  
  render() {
    return(
      <UserBaseInfoTableStyle>
      <CaptionBaseInfo/>
      <Table bordered condensed responsive>
      <thead>
      </thead>
      <tbody>
        <tr>
          <td width='300px'>개인사서함주소</td>
          <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td>
          <td width='300px'>보유예치금</td>
          <td width='250px' align='right'>{this.props.customerBaseInfo.insuranceAmount}원</td>
        </tr>
        <tr>
          <td>보유적립금</td>
          <td align='right'>{this.props.customerBaseInfo.depositeAmount}원</td>
          <td >보유포인트</td>
          <td align='right'>{this.props.customerBaseInfo.pointAmount}p</td>
        </tr>
        {/* <tr>
          <td>도착내역</td>
          <td align='right'>{this.state.customerBaseInfo.arrivedItem}건</td>
          <td>배송내역</td>
          <td align='right'>{this.state.customerBaseInfo.shippingItem}건</td>
        </tr> */}
      </tbody>
    </Table>
    </UserBaseInfoTableStyle>
    );}
}

