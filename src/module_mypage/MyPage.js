import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { UserAccount } from "./UserAccount";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "../container";
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, basePort, setTokenHeader, keycloakUrlLocal } from "../module_base_component/AuthService"
import { MyPageSideNav } from "./MyPageSideNav";
import { Breadcrumb } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'

var keycloak = Keycloak(keycloakConfigLocal);

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

export const BodyContainer = styled(BaseAppContainer)`
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

export class MyPage extends React.Component{

    state = { 
      active: null,
      image:null,
      keycloakAuth:null,
      accessToken:"",
      customerStatusData:'',
      userAccount:'',
      purchaseOrder:'',
      orderInformation:'',
      warehouseInformation:'',
      paymentData:'',
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
      console.log(keycloakUrlLocal)
      keycloak.init({onLoad: 'login-required'}).success(() => {
          this.setState({ keycloakAuth: keycloak, 
          accessToken:keycloak.token, 
          userid:keycloak.tokenParsed.preferred_username})
          //console.log(keycloak.tokenParsed.preferred_username)
          //console.log(keycloak.tokenParsed.given_name)
          //console.log(keycloak.tokenParsed.family_name)
        
          this.fetchCustomerStatusData(keycloak.token)
          
          //not used methods since 
          //this.fetchEndSettlementList(keycloak.token)
          //this.fetchPurchaseOrderList(keycloak.token)
      })
    }

    fetchCustomerStatusData(token){
      let lastname = keycloak.tokenParsed.family_name
      let firstname = keycloak.tokenParsed.given_name
      const customername =  [{lastname:lastname}, {firstname:firstname}]
      //let userid = keycloak.tokenParsed.preferred_username
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
      fetch(basePort + '/orderinformation/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({orderInformation:data})
          this.fetchWarehouseInformation(token)
        })   
    }

    fetchWarehouseInformation(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/warehouseinformation/'+ userid, {headers})
        .then((result) => { 
           return result.json();
        }).then((data) => {
          this.setState({warehouseInformation:data})
          this.fetchPaymentData(token)
        })   
    }

    fetchPaymentData(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/paymentData/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          console.log(data)
          this.setState({paymentData:data})
          this.fetchDeliveryKoreaData(token)
        })   
    }

    fetchDeliveryKoreaData(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/deliveryKoreaData/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          console.log(data)
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
        }).catch(function() {
          console.log("error fetching userbaseinfo");
      });
    }

    // not necessary @since 25.02.2020
    // fetchPurchaseOrderList(token){
    //   setTokenHeader(token)
    //   fetch(basePort + '/purchaseOderList', {headers})
    //     .then((result) => {
    //        return result.json();
    //     }).then((data) => {
    //       this.setState( { purchaseOrder: data} )
    //       console.log(data)
    //     })   
    // }

    // not necessary @since 25.02.2020
    // fetchEndSettlementList(token){
    //   setTokenHeader(token)
    //   fetch(basePort + '/endSettlementList', {headers})
    //     .then((result) => {
    //        return result.json();
    //     }).then((data) => {
    //       this.setState( { userAccount: data} )
    //     })   
    // }

    // maybe could be necessary for image tanfering later @since 25.02.2020
    // fetchPurchasedImage(){
    //   fetch(basePort + '/getItemImage')
    //     .then((response) => {
    //        return response.blob();
    //     }).then((data) => {
    //       var objectURL = URL.createObjectURL(data);
    //       this.setState({image: objectURL, loaded:true})
    //     })
    // }

    validToken(token){
      return token === "" ? false : true
    }

    getEmptyPage(){
      return ""
    }

    render() {
        const token = this.state.accessToken
        let mypage;

        if(this.validToken(token)){
          mypage = <MypageController 
                      purchaseOrder={this.state.purchaseOrder} 
                      userAccount={this.state.userAccount} 
                      customerStatusData = { this.state.customerStatusData}
                      orderInformation = { this.state.orderInformation }
                      warehouseInformation = { this.state.warehouseInformation }
                      paymentData = {this.state.paymentData}
                      deliveryKoreaData = {this.state.deliveryKoreaData}
                      userBaseInfo={this.state.userBaseInfo}
                      accessToken = {this.state.accessToken}
                      userid={this.state.userid}/>
        } else {
          mypage = this.getEmptyPage
        }
        return (
            <div>
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>
              {mypage}
            </div>
           
        );}           
}

export class MypageController extends React.Component{
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
              <Breadcrumb.Item active>마이페이지 / 배송대행</Breadcrumb.Item>
            </Breadcrumb>

          {/* ToDo : userAccount name as mypagebody */}
          <UserAccount 
            purchaseOrder={this.props.purchaseOrder} 
            userAccount={this.props.userAccount} 
            customerStatusData={ this.props.customerStatusData}
            orderInformation={ this.props.orderInformation }
            warehouseInformation={ this.props.warehouseInformation }
            paymentData = {this.props.paymentData}
            deliveryKoreaData = {this.props.deliveryKoreaData}
            userBaseInfo={this.props.userBaseInfo}
            accessToken = {this.props.accessToken}
            userid={this.props.userid}
            />
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}