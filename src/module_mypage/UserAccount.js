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

  const VewalterFrom = styled.div`
    margin-top: 50px;
    margin-bottom : 10px;
    margin-left:5%; 
    margin-right:15%;
  `;

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
  text: '아이템 사진',
  formatter: fotoFormatter
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

const columnsPurchasing = [{
  dataField: 'gkooId',
  text: 'Gkoo ID',
}, {
  dataField: 'itemFoto',
  text: '아이템 사진'
}, {
  dataField: 'itemPrice',
  text: '물품 가격',
}, {
  dataField: 'serviceFee',
  text: '수수료',
}, {
  dataField: 'purchasePrice',
  text: '총금액'
}, {
  dataField: 'itemName',
  text: '아이템이름',
}, {
  dataField: 'itemNumber',
  text: '아이템번호',
}
];

function fotoFormatter() {        
  return (
    <ImageObject/>
  );
}

export class UserAccount extends React.Component{
  
    constructor(props, context) {
        super(props, context);

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
        this.state = {
          UserAccount:[],
          value: '',
          redirect:false,
          image:'',
          loaded:false
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

    fetchEndSettlementList(){
      fetch('http://localhost:8080/endSettlementList')
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { UserAccount: data} )
        })   
    }
 
    handleChange(e) {
       this.setState({ value: e.target.value });
    }

    componentDidMount() {
      this.fetchEndSettlementList()
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
        <UserBaseInfo/>

        <UserAccountTableStyle>
          <CaptionUserAccount/>
          <BootstrapTable keyField='objectId'  data={ this.state.UserAccount } columns={ columnsUserAccount } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
        </UserAccountTableStyle>

        <PurchasingTableStyle>
          <CaptionPurchaing/>
          <BootstrapTable keyField='objectId'  data={ this.state.UserAccount } columns={ columnsPurchasing } 
            hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
        </PurchasingTableStyle>

      </div>
    );}
} 

export class ImageObject extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      image:''
    };
}

  fetchPurchasedImage(){
    fetch('http://localhost:8080/getItemImage')
      .then((response) => {
         //return result.json();
         console.log(response)
         return response.blob();
      }).then((data) => {
        var objectURL = URL.createObjectURL(data);
        //myImage.src = objectURL
        console.log("fetch image")
        console.log(objectURL)
        this.setState({image: objectURL})
      })

  }
  componentDidMount() {
    this.fetchPurchasedImage() 
  }

  render() {
    return(
      <span>
        <Image src={ this.state.image } width="80" height="40" responsive/>
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
    this.fetchCustomerBaseInfo() 
  }

  fetchCustomerBaseInfo(){
    fetch('http://localhost:8080/customerinformation')
      .then((result) => {
         return result.json();
      }).then((data) => {
        this.setState( { customerBaseInfo: data} )
      })   
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
          <td width='300px'>개인사서함번호</td>
          <td width='250px' align='right'>{this.state.customerBaseInfo.customerId}</td>
          <td width='300px'>보유예치금</td>
          <td width='250px' align='right'>{this.state.customerBaseInfo.depositMoney}원</td>
        </tr>
        <tr>
          <td>보유적립금</td>
          <td align='right'>{this.state.customerBaseInfo.accumulatedMoney}원</td>
          <td >보유포인트</td>
          <td align='right'>{this.state.customerBaseInfo.savedPoint}p</td>
        </tr>
        <tr>
          <td>도착내역</td>
          <td align='right'>{this.state.customerBaseInfo.arrivedItem}건</td>
          <td>배송내역</td>
          <td align='right'>{this.state.customerBaseInfo.shippingItem}건</td>
        </tr>
      </tbody>
    </Table>
    </UserBaseInfoTableStyle>
    );}
}