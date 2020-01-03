import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { UserAccount } from "./UserAccount";
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
} from "../container";
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, localPort, INITIAL_PAGE } from "./AuthService"
import { MyPageSideNav } from "./MyPageSideNav";
import { Breadcrumb } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'

var keycloak = Keycloak(keycloakConfigLocal);

//dynamic height
const AppContainer = styled(BaseAppContainer)`
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
      deliveryKoreaData:''
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
          accessToken:keycloak.token})
          this.fetchCustomerStatusData(keycloak.token)
          this.fetchOrderInformation(keycloak.token)
          this.fetchWarehouseInformation(keycloak.token)
          this.fetchPaymentData(keycloak.token)
          this.fetchDeliveryKoreaData(keycloak.token)
          //this.fetchEndSettlementList(keycloak.token)
          //this.fetchPurchaseOrderList(keycloak.token)
      })
    }

    fetchOrderInformation(token){
      this.setTokenHeader(token)
      fetch(localPort + '/orderinformation', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({orderInformation: data})
        })   
    }

    fetchPaymentData(token){
      this.setTokenHeader(token)
      fetch(localPort + '/paymentData', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          console.log(data)
          this.setState({paymentData: data})
        })   
    }

    fetchDeliveryKoreaData(token){
      this.setTokenHeader(token)
      fetch(localPort + '/deliveryKoreaData', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          console.log(data)
          this.setState({deliveryKoreaData: data})
        })   
    }

    fetchWarehouseInformation(token){
      this.setTokenHeader(token)
      fetch(localPort + '/warehouseinformation', {headers})
        .then((result) => { 
           return result.json();
        }).then((data) => {
          this.setState( { warehouseInformation: data } )
        })   
    }

    fetchPurchaseOrderList(token){
      this.setTokenHeader(token)
      fetch(localPort + '/purchaseOderList', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { purchaseOrder: data} )
          console.log(data)
        })   
    }

    fetchEndSettlementList(token){
      this.setTokenHeader(token)
      fetch(localPort + '/endSettlementList', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { userAccount: data} )
        })   
    }

    fetchPurchasedImage(){
      fetch(localPort + '/getItemImage')
        .then((response) => {
           return response.blob();
        }).then((data) => {
          var objectURL = URL.createObjectURL(data);
          this.setState({image: objectURL, loaded:true})
        })
    }

    fetchCustomerStatusData(token){
      this.setTokenHeader(token)
      fetch('http://localhost:8888/customerstatus', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          //console.log(data)
          this.setState( { customerStatusData: data} )
        })   
    }

    setTokenHeader(token){
      headers ['Authorization'] = 'Bearer ' + token;
    }

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
                      purchaseOrder = { this.state.purchaseOrder } 
                      userAccount = { this.state.userAccount } 
                      customerStatusData = { this.state.customerStatusData}
                      orderInformation = { this.state.orderInformation }
                      warehouseInformation = { this.state.warehouseInformation }
                      paymentData = {this.state.paymentData}
                      deliveryKoreaData = {this.state.deliveryKoreaData}
                      accessToken = { this.state.accessToken }/>
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
              <Breadcrumb.Item active>마이페이지</Breadcrumb.Item>
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
            accessToken = { this.props.accessToken }
            />
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}