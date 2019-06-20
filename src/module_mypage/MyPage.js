import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { MemoryRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { calendar, pagelines } from 'react-icons-kit/fa/'
import { UserAccount } from "./UserAccount";
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
} from "../container";
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, localPort } from "./AuthService"
import { MyPageSideNav } from "./MyPageSideNav";
import { Table, Card, Breadcrumb, Form } from "react-bootstrap"

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

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

export class MyPage extends React.Component{

    state = { active: null,
    image:null,
    keycloakAuth:null,
    accessToken:"",
    customerBaseInfo:'',
    userAccount:'',
    purchaseOrder:'',
    orderInformation:'',
    warehouseInformation:'',
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
          this.fetchCustomerBaseInfo(keycloak.token)
          this.fetchOrderInformation(keycloak.token)
          this.fetchWarehouseInformation(keycloak.token)
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

    fetchWarehouseInformation(token){
      this.setTokenHeader(token)
      fetch(localPort + '/warehouseinformation', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { warehouseInformation: data} )
          console.log(data)
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

    fetchCustomerBaseInfo(token){
      this.setTokenHeader(token)
      fetch('http://localhost:8888/customerstatus', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { customerBaseInfo: data} )
        })   
    }

    setTokenHeader(token){
      headers ['Authorization'] = 'Bearer ' + token;
    }

    render() {
        return (
            <div>
            <AppContainer>
      
            <MyPageSideNav/>
            
            <BodyContainer>
              <Breadcrumb style={{ width: '105%'}}>
                <Breadcrumb.Item active>마이페이지</Breadcrumb.Item>
              </Breadcrumb>

              {/* ToDo : userAccount name as mypagebody */}
              <UserAccount 
                purchaseOrder={this.state.purchaseOrder} 
                userAccount={this.state.userAccount} 
                customerBaseInfo={ this.state.customerBaseInfo}
                orderInformation={ this.state.orderInformation }
                warehouseInformation={ this.state.warehouseInformation }
                />
            </BodyContainer>
            
            </AppContainer>
            </div>
           
        );}           
} 