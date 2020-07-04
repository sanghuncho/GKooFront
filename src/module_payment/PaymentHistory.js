import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "../container";
import { MyPageSideNav } from "../module_mypage/MyPageSideNav";
import { Breadcrumb, Button, CardGroup, Table, Card, InputGroup, Image } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { KEYCLOAK_USER_ACCOUNT } from "../Config"
import { BaseTablePagination } from '../module_base_component/BaseTable'
import { currencyFormatter } from '../module_payment/PaymentUtil'
import { Redirect } from 'react-router';

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, basePort, headers, setTokenHeader, getEmptyPage, validToken } from "../module_base_component/AuthService"
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

    state = { 
      active: null,
      keycloakAuth:null,
      accessToken:"",
      userid:'',
   };
  
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
              userid:keycloak.tokenParsed.preferred_username
        })
        console.log(keycloak.tokenParsed.given_name)
        console.log(keycloak.tokenParsed.email)
        //this.fetchUserBaseInfo(keycloak.token)
      })
      
    }

    // fetchUserBaseInfo(token){
    //   let userid = this.state.userid
    //   console.log(userid)
    //   setTokenHeader(token)
    //   fetch(basePort + '/fetchuserbaseinfo/'+ userid, {headers})
    //     .then((result) => { 
    //       return result.json();
    //     }).then((data) => {           
    //       this.setState({userBaseInfo:data})
    //       console.log(data)
    //     }).catch(function() {
    //   });
    // }

    validToken(token){
      return token === "" ? false : true
    }

    getEmptyPage(){
      return ""
    }

    render() {
        const token = this.state.accessToken
        let paymentHistory;

        if(this.validToken(token)){
            paymentHistory = 
                <PaymentHistoryController 
                  userBaseInfo={this.state.userBaseInfo}
                  keycloakAuth={this.state.keycloakAuth}
                  userid={this.state.userid}
                 
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

const data = [
  {"orderDate":"2020-07-04",
    "currentDeposit":1000000,
    "oldInsuranceAmount":30000,
    "insuranceAmount":130000,
    "buyingPrice":42000,
    "deliveryPrice":13000,
    "itemPrice":13000,
    "serviceFee":13000,
    "orderid":'1234',
    // "itemImageUrl":'ebay.de',
    "itemTitle":'sabe speaekr',
    "orderid":'1234',
  },
  
]

const columnsPaymentHistory = [
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
    dataField: 'itemPrice',
    text: '상품가격',
    formatter:currencyFormatter,
  },
  {
    dataField: 'serviceFee',
    text: '수수료',
    formatter:currencyFormatter,
  },
  {
    dataField: 'orderid',
    text: '신청번호',
    
  },
  // {
  //   dataField: 'itemImageUrl',
  //   text: '상품이미지'
  // },
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

export class PaymentHistoryController extends React.Component{
  constructor(props) {
      super(props);
    }

    componentDidMount() {
        
      }
    
    render() {
        return (
        <div>
          <AppContainer>
      
          <MyPageSideNav/>
      
          <BodyContainer>
            <Breadcrumb style={{ width: '100%'}}>
              <Breadcrumb.Item active>마이페이지 / 결제내역 </Breadcrumb.Item>
            </Breadcrumb>
 
            <PaymentHistoryTable/>
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

class PaymentHistoryTable extends React.Component {
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
        <Card border="dark" style={{ width: '90%', marginTop:'1rem' }}>
        <Card.Header>
          {/* 구매대행 이용현황 */}
          결제내역
        </Card.Header>
        <Card.Body >
       
              <PaymentHistoryTableStyle>
              <BaseTablePagination
                   keyField='objectId'  
                   data={ data } 
                   columns={ columnsPaymentHistory } 
                   bordered={ true }  
                   noDataIndication="주문하신 물품이 없습니다"
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