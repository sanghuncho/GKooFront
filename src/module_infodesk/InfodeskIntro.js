import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { MemoryRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { AppNavbar } from '../AppNavbar'
import { connectdevelop, cube, bullseye, pagelines } from 'react-icons-kit/fa/'
import { Image } from 'react-bootstrap';
import GKoo_Service_Info  from '../assets/GKoo_Service_Info.jpg'

{/* InfodeskIntro CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const CustomerCenterIntroContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class InfodeskIntro extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <CustomerCenterIntroContainer>
                <InfodeskIntroNavbar/>
                <BodyContainer>
                    <Image src={GKoo_Service_Info} style={{ width: '600px', marginLeft:'20%', marginTop:'20px'}}/>
                </BodyContainer>
            </CustomerCenterIntroContainer>
            </div>
        );}           
}

{/* InfodeskIntroNavbar CSS */}
const NavigationStyle = styled(BaseNavigation)`
    background: #80b13e;
    color: #FFFFFF;
    letter-spacing: 1px;
    width: 110px;
    line-height: 22px;
    border-radius: 0px;
`;
const NavLinkStyle = styled(BaseNav)`
    flex-direction: column;
`;
const TextStyle = styled.div`
  padding-left: 0px;
  font-size: 12px;
`;
const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;
const Theme = {
    selectionBgColor: '#727676',
};
const Icon = props => <BaseIcon size={32} icon={props.icon} />;
var grey = '#727676';

export class InfodeskIntroNavbar extends React.Component{

    state = { active: null };
  
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

    render() {
        return (
            <div>
                <NavigationStyle> 
                    <SideNav theme={Theme} onItemSelection={this.onItemSelection}>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/infodeskBuyingService' >
                            <IconCnt>
                                <Icon icon={bullseye} />
                            </IconCnt>
                            <TextStyle>구매대행 안내</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(1)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/infodeskShippingService' >
                            <IconCnt>
                                <Icon icon={cube} />
                            </IconCnt>
                            <TextStyle>배송대행 안내</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(2)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/infodeskInspectRefundService' >
                            <IconCnt>
                                <Icon icon={cube} />
                            </IconCnt>
                            <TextStyle>검수/보상안내</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
            </SideNav>
            </NavigationStyle>
            </div>
        );}           
} 
