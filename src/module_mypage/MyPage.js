import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { pagelines } from 'react-icons-kit/fa/pagelines'
import { MemoryRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { users } from "react-icons-kit/fa/users";
import { buildingO } from 'react-icons-kit/fa/buildingO'
import { connectdevelop } from 'react-icons-kit/fa/connectdevelop'
import { UserAccount } from "./UserAccount";
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
} from "../container";
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers } from "./AuthService"
var keycloak = Keycloak(keycloakConfigLocal);

//dynamic height
const AppContainer = styled(BaseAppContainer)`
  height: calc(150vh);
`;
const Navigation = styled(BaseNavigation)`
    background: #80b13e;
    color: #FFFFFF;
    letter-spacing: 1px;
    width: 100px;
    line-height: 22px;
    border-radius: 0px;
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
    purchaseOrder:''
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
      //this.fetchPurchasedImage()
      keycloak.init({onLoad: 'login-required'}).success(() => {
          this.setState({ keycloakAuth: keycloak, 
          accessToken:keycloak.token})
          this.fetchCustomerBaseInfo(keycloak.token)
          this.fetchEndSettlementList(keycloak.token)
          this.fetchPurchaseOrderList(keycloak.token)
      })
    }

    fetchPurchaseOrderList(token){
      this.setTokenHeader(token)
      fetch('http://localhost:8888/purchaseOderList', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { purchaseOrder: data} )
          
        })   
    }

    fetchEndSettlementList(token){
      this.setTokenHeader(token)
      fetch('http://localhost:8888/endSettlementList', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { userAccount: data} )
          console.log(data)
        })   
    }

    fetchPurchasedImage(){
      fetch('http://localhost:8888/getItemImage')
        .then((response) => {
           console.log(response)
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
            <Navigation> 
                <SideNav theme={theme} onItemSelection={this.onItemSelection}>
                    <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/' >
                            <IconCnt>
                                <Icon icon={pagelines} />
                            </IconCnt>
                            <Text>배송비 안내</Text>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/' >
                            <IconCnt>
                                <Icon icon={connectdevelop} />
                            </IconCnt>
                            <Text>스케줄</Text>
                        </NavLink>
                    </NavLinkStyle>
                    </div>

                </SideNav>
            </Navigation>
            <body><UserAccount purchaseOrder={this.state.purchaseOrder} userAccount={this.state.userAccount} customerBaseInfo={ this.state.customerBaseInfo }/></body>
            </AppContainer>
            </div>
           
        );}           
} 