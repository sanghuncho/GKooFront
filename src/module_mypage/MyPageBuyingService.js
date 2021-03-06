import { Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "../container";
import { MyPageSideNav } from "./MyPageSideNav";
import { Breadcrumb, Button, InputGroup, Card, FormControl } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { OrderInformation, BuyingServiceOrderData } from './OrderInformation'
import { PaymentInformationBuyingService, PaymentDeliveryDataBuyingService } from './PaymentInformation'
import { DeliveryInformationBuyingService } from './DeliveryInformation'
import { UserBaseInfo } from './UserBaseInfo'
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'
import { SearchPanel_ID } from '../module_base_component/BaseSearchPanel'

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, basePort, headers, setTokenHeader, getEmptyPage, isAdmin } from "../module_base_component/AuthService"
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
export class MyPageBuyingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      active: null,
      keycloakAuth:null,
      accessToken:"",
      customerStatusData:'',
      buyingOrderData:'',
      paymentData:'',
      paymentDelivery:'',
      deliveryKoreaData:'',
      userBaseInfo:'',
      userid:'',
      isAdmin:false
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
            keycloakAuth:keycloak, 
            accessToken:keycloak.token, 
            userid:keycloak.tokenParsed.preferred_username,
            //관리자 체크
            isAdmin:isAdmin(keycloak.realmAccess)
          })
          localStorage.setItem("react-token", keycloak.token);
          localStorage.setItem("userid", keycloak.tokenParsed.preferred_username);
          
          if(!this.state.isAdmin){
            //회원일 경우 데이터 로딩시작, 관리자는 search
            this.fetchCustomerStatusData(keycloak.token)
          }
      })
    }

    fetchCustomerStatusData(token){
      let lastname = keycloak.tokenParsed.family_name
      let firstname = keycloak.tokenParsed.given_name
      let email = keycloak.tokenParsed.email
      const customername =  [{lastname:lastname}, {firstname:firstname}, {email:email}]
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/customerstatus/'+ userid, 
      {method:'post', headers, body:JSON.stringify(customername)})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({customerStatusData:data})
          this.fetchOrderInformation(token)
        })   
    }

    fetchCustomerStatusDataAdmin(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/fetchCustomerStatusAdmin/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({customerStatusData:data})
          this.fetchOrderInformation(token)
        })   
    }

    fetchOrderInformation(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/orderdataBuyingService/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({buyingOrderData: data})
          this.fetchPaymentData(token)
        })
    }

    //@deprecated 마이페이지 구매대행 아래 3가지 표 데이타
    fetchPaymentData(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/paymentProductBuyingService/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({paymentData: data})
          this.fetchPaymentDelivery(token)
        })   
    }

    fetchPaymentDelivery(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/paymentDeliveryBuyingService/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({paymentDelivery:data})
          this.fetchDeliveryKoreaData(token)
        })   
    }

    fetchDeliveryKoreaData(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/deliveryKoreaDataBuyingService/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({deliveryKoreaData:data})
          this.fetchUserBaseInfo(token)
        })   
    }

    fetchUserBaseInfo(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/fetchuserbaseinfo/'+ userid, {headers})
        .then((result) => { 
          return result.json();
        }).then((data) => {           
          this.setState({userBaseInfo:data})
        }).catch(function() {
      });
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
        this.fetchCustomerStatusDataAdmin(this.state.accessToken)
      }
    }

    handleSearchChangeInput(event){
      this.setState({userid:event.target.value})
      console.log(event.target.value)
    }

    validToken(token){
      return token === "" ? false : true
    }

    getEmptyPage(){
      return ""
    }

    render() {
        const token = this.state.accessToken
        let mypage_buyingService;

        if(this.validToken(token)){
            mypage_buyingService = 
                <MypageBuyingServiceController 
                  customerStatusData = { this.state.customerStatusData}
                  buyingOrderData = { this.state.buyingOrderData }
                  warehouseInformation = { this.state.warehouseInformation }
                  paymentData = {this.state.paymentData}
                  paymentDelivery = {this.state.paymentDelivery}
                  deliveryKoreaData = {this.state.deliveryKoreaData}
                  userBaseInfo = {this.state.userBaseInfo}
                  accessToken = { this.state.accessToken }
                  //관리자 properties
                  isAdmin = {this.state.isAdmin}
                  handleSearchChangeInput = {this.handleSearchChangeInput}
                  handleSearch={this.handleSearch}
                />
        } else {
            mypage_buyingService = this.getEmptyPage
        }

        
        return (
            <div>
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>

              {mypage_buyingService}

            </div>
           
        );}           
}

export class MypageBuyingServiceController extends React.Component{
    
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
              <Breadcrumb.Item active>마이페이지 / 구매대행</Breadcrumb.Item>
            </Breadcrumb>

            {searchPane}

            <UserBaseInfo customerStatusData={this.props.customerStatusData}
                      userBaseInfo = {this.props.userBaseInfo}
                      accessToken={this.props.accessToken}/>
           
           {/* 전체메뉴 */}
            <BuyingServiceOrderData buyingOrderData={this.props.buyingOrderData}
              serviceTitle={"구매대행 이용현황"} />
          
          {/* deprecated since 23.07.2020
          <CardGroup style={{ width:'80%', marginTop:'1rem',  marginBottom:'1rem'}}>
            <Card border="dark">
              <Card.Header>
                구매대행 결제현황
              </Card.Header>
              <Card.Body>
               
                <PaymentInformationBuyingService paymentData={this.props.paymentData}/>
              </Card.Body>
            </Card>
            <Card border="dark">
              <Card.Header>
                배송비 결제현황
              </Card.Header>
              <Card.Body>
                 
                <PaymentDeliveryDataBuyingService paymentDelivery={this.props.paymentDelivery}/>
              </Card.Body>
            </Card>
            <Card border="dark">
              <Card.Header>
                배송 현황
              </Card.Header>
              <Card.Body>
               
                <DeliveryInformationBuyingService deliveryKoreaData={this.props.deliveryKoreaData}/>
              </Card.Body>
            </Card>
          </CardGroup> */}

           <CompanyIntroductionBottom/>
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}

//baseform move
// class SearchPanel extends React.Component{
//   constructor(props) {
//       super(props);
//     }
    
//     render() {
//       return (
//         <div>
//           <InputGroup className="mb-3" style={{ width: '20%', marginTop:'1rem', marginBottom:'1rem' }}>
//               <FormControl
//                 placeholder="회원 아이디"
//                 aria-label="Recipient's username"
//                 aria-describedby="basic-addon2"
//                 onChange = {this.props.handleSearchChangeInput} 
//               />
//               <InputGroup.Append>
//                 <Button variant="outline-secondary"
//                         onClick={(e) => this.props.handleSearch(e)}>Search
//                 </Button>
//               </InputGroup.Append>
//           </InputGroup>
//         </div>
//       );
//     }    
// }