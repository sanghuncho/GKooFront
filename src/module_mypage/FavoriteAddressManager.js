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

const AppContainer = styled(BaseAppContainer)`
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

export class FavoriteAddressManager extends React.Component{

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
      trackingNumber:'1234',
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
         
          //this.fetchPurchaseOrderList(keycloak.token)
      })
    }

    // updateTranckingNumber(orderNumber, trackingCompany, trackingNumber){
    //   const contents =  [{orderNumber: orderNumber}, 
    //       {trackingCompany:trackingCompany},
    //       {trackingNumber:trackingNumber}]
    //   this.setTokenHeader(this.state.accessToken)
    //   fetch('http://localhost:8888/willpaydeleveryfeeupdate', 
    //             {method:'post', headers, 
    //               body:JSON.stringify(contents)})
    // }
    
    validToken(token){
      return token === "" ? false : true
    }

    getEmptyPage(){
      return ""
    }

    render() {
        const token = this.state.accessToken
        let addressManagerController;

        if(this.validToken(token)){
            addressManagerController = <AddressManagerController 
                     
                      accessToken = { this.state.accessToken }/>
        } else {
            addressManagerController = this.getEmptyPage
        }
        return (
            <div>
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>

              {addressManagerController}

            </div>
           
        );}           
}

export class AddressManagerController extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <AppContainer>
      
          <MyPageSideNav/>
      
          <BodyContainer>
            <Breadcrumb style={{ width: '105%'}}>
              <Breadcrumb.Item active>마이페이지 / 배송지관리</Breadcrumb.Item>
            </Breadcrumb>

          {/* ToDo : userAccount name as mypagebody */}
          {/* <UserAccount 
           
            /> */}
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}