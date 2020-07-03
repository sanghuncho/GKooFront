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
import { Document, Page } from 'react-pdf'
//import { Document } from 'react-pdf/dist/entry.webpack';
//import { Document } from 'react-pdf/dist/entry.parcel'
import naho from '../assets/naho.pdf'
import ShippingServiceSA from '../assets/ShippingServiceSA.jpg'
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
            
            <a href = {naho} target = "_blank">Download Pdf</a>
            {/* <UserBaseInfoEditor 
                userBaseInfo={this.props.userBaseInfo}
                userid={this.props.userid}
                keycloakAuth={this.props.keycloakAuth}
            /> */}
       
           
        
        {/* <Image src={ShippingServiceSA} style={{ width: '200px', marginLeft:'10%', marginTop:'25px'}}/> */}
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}