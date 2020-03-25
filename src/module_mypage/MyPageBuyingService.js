import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "../container";
import { MyPageSideNav } from "./MyPageSideNav";
import { Breadcrumb, Button, CardGroup, Card } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { OrderInformation, BuyingServiceOrderData } from './OrderInformation'
import { PaymentInformationBuyingService, PaymentDeliveryDataBuyingService } from './PaymentInformation'
import { DeliveryInformationBuyingService } from './DeliveryInformation'
import { UserBaseInfoEditor, AddressManager, CompleteUserBaseInfo } from './UserBaseInfo'
import { Redirect } from 'react-router';

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, INITIAL_PAGE, basePort, headers, setTokenHeader, getEmptyPage, validToken } from "../module_base_component/AuthService"
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
export class MyPageBuyingService extends React.Component{

    state = { 
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
          this.setState({ keycloakAuth: keycloak, 
          accessToken:keycloak.token, userid:keycloak.tokenParsed.preferred_username})
          localStorage.setItem("react-token", keycloak.token);
          this.fetchCustomerStatusData(keycloak.token)
      })
    }

    fetchCustomerStatusData(token){
      let lastname = keycloak.tokenParsed.family_name
      let firstname = keycloak.tokenParsed.given_name
      const customername =  [{lastname:lastname}, {firstname:firstname}]
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
          this.setState({paymentDelivery: data})
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
          this.setState({deliveryKoreaData: data})
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
          console.log(data)
        }).catch(function() {
      });
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
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <AppContainer>
      
          <MyPageSideNav/>
      
          <BodyContainer>
            <Breadcrumb style={{ width: '100%'}}>
              <Breadcrumb.Item active>마이페이지 / 구매대행</Breadcrumb.Item>
            </Breadcrumb>

            <UserBaseInfo customerStatusData={this.props.customerStatusData}
                      userBaseInfo = {this.props.userBaseInfo}
                      accessToken={this.props.accessToken}/>
           
           {/* 전체메뉴 */}
            <BuyingServiceOrderData buyingOrderData={this.props.buyingOrderData}
              serviceTitle={"구매대행 이용현황"} />
          
          <CardGroup style={{ width:'80%', marginTop:'1rem',  marginBottom:'1rem'}}>
            <Card border="dark">
              <Card.Header>
                구매대행 결제현황
              </Card.Header>
              <Card.Body>
                {/* 결제 현황 */}  
                <PaymentInformationBuyingService paymentData={this.props.paymentData}/>
              </Card.Body>
            </Card>
            <Card border="dark">
              <Card.Header>
                배송비 결제현황
              </Card.Header>
              <Card.Body>
                {/* 결제 현황 */}  
                <PaymentDeliveryDataBuyingService paymentDelivery={this.props.paymentDelivery}/>
              </Card.Body>
            </Card>
            <Card border="dark">
              <Card.Header>
                배송 현황
              </Card.Header>
              <Card.Body>
                {/* 배송 현황 */}
                <DeliveryInformationBuyingService deliveryKoreaData={this.props.deliveryKoreaData}/>
              </Card.Body>
            </Card>
          </CardGroup>
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}

export class UserBaseInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            doEditUserBaseInfo:false,
            doOpenAddressManager:false,
            showBaseInfoButtons:true,
            showUserBaseInfoButtons:false,
            userBaseInfo:this.props.userBaseInfo,
            redirect:false,
        };

        this.handleMoveToBaseInfo = this.handleMoveToBaseInfo.bind(this)
        this.handleShowStoredAddressManager = this.handleShowStoredAddressManager.bind(this)
        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doOpenAddressManager = this.doOpenAddressManager.bind(this)
      }

      componentDidMount () {
      }

      doEditUserBaseInfo(){
        this.setState({doEditUserBaseInfo:true, showBaseInfoButtons:false})
      }
  
      doOpenAddressManager(){
        //this.setState({doOpenAddressManager:true, showBaseInfoButtons:false})
        // <NavLink to="/favoriteAddressManager/">
        // </NavLink>
        // <Link to={{pathname:"favoriteAddressManager/"}}>
        // </Link>
        this.setState({redirect: true});
      }

      handleMoveToBaseInfo(){
        window.scrollTo(0, 0);
        this.setState({doEditUserBaseInfo:false, showBaseInfoButtons:true}) 
      }

      handleShowStoredAddressManager(){
        this.setState({doOpenAddressManager:false, showBaseInfoButtons:true}) 
      }
    
      render() {
        if (this.state.redirect) {
          return <Redirect push to="/favoriteAddressManager"/>;
        }

        const showBaseInfoButtons = this.state.showBaseInfoButtons
        let editButton;
        let addressManagerButton;
        if(showBaseInfoButtons) {
          editButton = <Button variant="secondary" size="sm" onClick={(e) => this.doEditUserBaseInfo(e)} 
            style={{ marginRight: '10px', float:"right"}}>개인정보</Button>

          addressManagerButton =  <Button variant="secondary" size="sm" onClick={(e) => this.doOpenAddressManager(e)} 
            style={{ marginRight: '10px', float:"right"}}>배송지관리</Button>
        }
    
        const doEditUserBaseInfo = this.state.doEditUserBaseInfo
        const doOpenAddressManager = this.state.doOpenAddressManager
        let userbaseInfoDisplay;
        let displayHeight;
        let headerTitle
        if (doEditUserBaseInfo) {
            userbaseInfoDisplay = 
              <UserBaseInfoEditor 
                handleMoveToBaseInfo={this.handleMoveToBaseInfo}
                userBaseInfo={this.props.userBaseInfo}
                accessToken={this.props.accessToken}
               />
            
          } else if(doOpenAddressManager) {
            userbaseInfoDisplay = <AddressManager
                handleShowStoredAddressManager={this.handleShowStoredAddressManager}/>
            displayHeight = '14rem'
            headerTitle = '배송지 관리'

          } else {
            userbaseInfoDisplay = 
              <CompleteUserBaseInfo 
                customerStatusData={this.props.customerStatusData}
                doEditUserBaseInfo={this.doEditUserBaseInfo}
                doOpenAddressManager={this.doOpenAddressManager}/>
          }
        return (
          <div>
            {userbaseInfoDisplay}
          </div>
        );
      }    
}