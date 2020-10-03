import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "../container";
import { MyPageSideNav } from "../module_mypage/MyPageSideNav";
import { Breadcrumb, Button, Card } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { KEYCLOAK_USER_ACCOUNT } from "../Config"
import { BaseTablePagination } from '../module_base_component/BaseTable'
import { currencyFormatter, currencyFormatterEuro } from '../module_payment/PaymentUtil'
import { Redirect } from 'react-router';
import { SearchPanel_ID } from '../module_base_component/BaseSearchPanel'
import { itemnameFormatter } from "../module_base_component/BaseUtil";

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, basePort, headers, setTokenHeader, isAdmin } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

//dynamic height
const AppContainer = styled(BaseAppContainer)`
  min-height:calc(100vh);
  height: auto;  
`;

const Navigation = styled(BaseNavigation)`
    background: #80b13e;
    color: #FFFFFF;
    letter-spacing: 1px;
    width: 110px;
    line-height: 22px;
    border-radius: 0px;
    height: auto;
`;

const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;

const theme = {
    selectionBgColor: '#B0CC8B',
};

const NavLinkStyle = styled(BaseNav)`
  flex-direction: column;
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const Text = styled.div`
  padding-left: 0px;
  font-size: 12px;
`;

var naviGreen = '#80b13e'
var grey = '#727676';

const Icon = props => <BaseIcon size={18} icon={props.icon} />;
export class PaymentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      active: null,
      keycloakAuth:null,
      accessToken:"",
      userid:'',
      paymentHistoryDepositData:'',
      paymentHistoryTransferData:''
    }
    this.handleSearchChangeInput = this.handleSearchChangeInput.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  toggle(position) {
      if (this.state.active === position) {
        this.setState({active : null})
      } else {
        this.setState({active : position})
      }
    }
  
    myColor (position) {
      if (this.state.active === position) {
        return grey;
      }
      return "";
    }
  
    onItemSelection = arg => {
      this.setState({ selectedPath: arg.path });
    };

    componentDidMount() {
      keycloak.init({onLoad: 'login-required'}).success(() => {
          this.setState({ 
              keycloakAuth: keycloak, 
              accessToken:keycloak.token, 
              userid:keycloak.tokenParsed.preferred_username,
              isAdmin:isAdmin(keycloak.realmAccess)
            })
            console.log("history")
            console.log(keycloak.tokenParsed.given_name)
            console.log(keycloak.tokenParsed.email)
        if(!this.state.isAdmin){
          //회원일 경우 데이터 로딩시작, 관리자는 search
          this.fetchPaymentHistoryDeposit(keycloak.token)
          this.fetchPaymentHistoryTransfer(keycloak.token)
        }
      })
      
    }

    fetchPaymentHistoryDeposit(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/fetchPaymentHistoryDeposit/'+ userid, {headers})
        .then((result) => { 
          return result.json();
        }).then((data) => {           
          this.setState({paymentHistoryDepositData:data})
          console.log(data)
        }).catch(error => {
          console.error('Error fetching fetchPaymentHistoryDeposit!', error);
      });
    }

    fetchPaymentHistoryTransfer(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/fetchPaymentHistoryTransfer/'+ userid, {headers})
        .then((result) => { 
          return result.json();
        }).then((data) => {           
          this.setState({paymentHistoryTransferData:data})
          console.log(data)
        }).catch(error => {
          console.error('Error fetching fetchPaymentHistoryTransfer!', error);
      });
    }

    validToken(token){
      return token === "" ? false : true
    }

    getEmptyPage(){
      return ""
    }

    handleSearch(){
      if(this.state.userid === ''){
        this.setState({customerStatusData:'',
                       buyingOrderData:'',
                       paymentData:'',
                       paymentDelivery:'',
                       deliveryKoreaData:'',
                       userBaseInfo:'',
                    })
      } else {
        this.fetchPaymentHistoryDeposit(this.state.accessToken)
        this.fetchPaymentHistoryTransfer(this.state.accessToken)
      }
    }

    handleSearchChangeInput(event){
      this.setState({userid:event.target.value})
      console.log(event.target.value)
    }

    render() {
        const token = this.state.accessToken
        let paymentHistory;

        if(this.validToken(token)){
            paymentHistory = 
                <PaymentHistoryController 
                  paymentHistoryDepositData={this.state.paymentHistoryDepositData}
                  paymentHistoryTransferData={this.state.paymentHistoryTransferData}
                  keycloakAuth={this.state.keycloakAuth}
                  userid={this.state.userid}
                  //관리자 properties
                  isAdmin = {this.state.isAdmin}
                  handleSearchChangeInput = {this.handleSearchChangeInput}
                  handleSearch={this.handleSearch}
                />
        } else {
            paymentHistory = this.getEmptyPage
        }
        return (
            <div>
           
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>

              {paymentHistory}

            </div>
           
        );}           
}

export class PaymentHistoryController extends React.Component{
  constructor(props) {
      super(props);
    }

    componentDidMount() {
        
      }
    
    render() {
        let searchPane
        if(this.props.isAdmin){
          searchPane = <SearchPanel_ID 
                          handleSearchChangeInput={this.props.handleSearchChangeInput}
                          handleSearch={this.props.handleSearch}/>
        }

        return (
        <div>
          <AppContainer>
      
          <MyPageSideNav/>
      
          <BodyContainer>
            <Breadcrumb style={{ width: '100%'}}>
              <Breadcrumb.Item active>마이페이지 / 결제내역 </Breadcrumb.Item>
            </Breadcrumb>
 
            {searchPane}

            {/* 무통장입금내역 */}
            <PaymentHistoryTransferTable paymentHistoryTransferData={this.props.paymentHistoryTransferData}/>

            {/* 예치금 결제내역 */}
            <PaymentHistoryDepositTable paymentHistoryDepositData={this.props.paymentHistoryDepositData}/>
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}

const PaymentHistoryTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 11px;
`;

const transferData = [
  {"orderDate":"2020-07-04",
    "currentDeposit":1000000,
    "buyingPrice":42000,
    "deliveryPrice":13000,
    "orderid":'1234',
    "itemTitle":'sabe speaekr',
    "orderid":'1234',
  },
  
]

const columnsPaymentHistoryTransfer = [
  {
    dataField: 'paymentDate',
    text: '신청날짜',
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'left' };
    }
  },
  {
    dataField: 'depositPayment',
    text: '결제금액',
    formatter:currencyFormatter,
    text: '신청날짜',
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'left' };
    }
  },
  {
    dataField: 'buyingPayment',
    text: '구매/경매대행',
    formatter:currencyFormatter,
    text: '신청날짜',
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'left' };
    }
  },
  {
    dataField: 'shippingPayment',
    text: '배송대행',
    formatter:currencyFormatter,
    text: '신청날짜',
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'left' };
    }
  },
  {
    dataField: 'orderid',
    text: '신청번호',
    headerStyle: (colum, colIndex) => {
      return { width: '130px', textAlign: 'left' };
    }
  },
  {
    dataField: 'itemname',
    text: '상품명',
    formatter:itemnameFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '200px', textAlign: 'left' };
    }
  }, 
  {
    dataField: 'orderid',
    text: '상품상세',
    formatter:detailPaymentHistoryFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  }
];

class PaymentHistoryTransferTable extends React.Component {
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
          무통장 결제내역
        </Card.Header>
        <Card.Body >
       
              <PaymentHistoryTableStyle>
              <BaseTablePagination
                   keyField='orderid'  
                   //data={ transferData }
                   data={ this.props.paymentHistoryTransferData}
                   columns={ columnsPaymentHistoryTransfer } 
                   bordered={ true }  
                   noDataIndication="결제내역이 없습니다"
              />
              </PaymentHistoryTableStyle>
     
      </Card.Body>
   
      </Card> 
      </div>
    );}
}

const depositData = [
  {"orderDate":"2020-07-04",
    "currentDeposit":1000000,
    "oldInsuranceAmount":30000,
    "insuranceAmount":130000,
    "buyingPrice":42000,
    "deliveryPrice":13000,
    "orderid":'1234',
    "itemTitle":'sabe speaekr',
    "orderid":'1234',
  },
  
]

const columnsPaymentHistoryDeposit = [
  {
    dataField: 'orderDate',
    text: '신청날짜',
    headerStyle: (colum, colIndex) => {
      return { width: '100px', textAlign: 'center' };
    }
  },
  {
    dataField: 'currentDeposit',
    text: '결제금액',
    formatter:currencyFormatter,
  },
  {
    dataField: 'oldInsuranceAmount',
    text: '기존예치금',
    formatter:currencyFormatter,
  },
  {
    dataField: 'insuranceAmount',
    text: '보유예치금',
    formatter:currencyFormatter,
  },
  {
    dataField: 'buyingPrice',
    text: '구매/경매대행',
    formatter:currencyFormatter,
  },
  {
    dataField: 'deliveryPrice',
    text: '배송대행',
    formatter:currencyFormatter,
  },
  {
    dataField: 'orderid',
    text: '신청번호',
  },
  {
    dataField: 'itemTitle',
    text: '상품명',
    headerStyle: (colum, colIndex) => {
      return { width: '130px', textAlign: 'center' };
    }
  }, 
  {
    dataField: 'orderid',
    text: '상품상세',
    formatter:detailPaymentHistoryFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  }
];

class PaymentHistoryDepositTable extends React.Component {
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
          예치금 결제내역
        </Card.Header>
        <Card.Body >
       
              <PaymentHistoryTableStyle>
              <BaseTablePagination
                   keyField='objectId'  
                   //data={ depositData }
                   data={ this.props.paymentHistoryDepositData}
                   columns={ columnsPaymentHistoryDeposit } 
                   bordered={ true }  
                   noDataIndication="결제내역이 없습니다"
              />
              </PaymentHistoryTableStyle>
     
      </Card.Body>
   
      </Card> 
      </div>
    );}
}

export function detailPaymentHistoryFormatter(cell, row) {        
  return (
    <DetailPaymentHistoryButton orderid={cell}/>
  );
}

export class DetailPaymentHistoryButton extends React.Component {
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
    if (this.state.redirect) {
      //새페이지로 만들기
      return <Redirect push to={link}/>
    }

    return(
      <div>
        <Button variant="outline-secondary" size="sm" 
          onClick={this.handleLinkDetailPage}>Go</Button>
      </div>
    );}
}