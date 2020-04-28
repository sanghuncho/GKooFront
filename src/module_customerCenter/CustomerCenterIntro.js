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

{/* BuyingServiceIntro CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const CustomerCenterIntroContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class CustomerCenterIntro extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <CustomerCenterIntroContainer>
                <CustomerCenterNavbar/>
                <BodyContainer>
                    <Image src={GKoo_Service_Info} style={{ width: '600px', marginLeft:'20%', marginTop:'20px'}}/>
                </BodyContainer>
            </CustomerCenterIntroContainer>
            </div>
        );}           
}

{/* CustomerCenterNavbar CSS */}
const NavigationStyle = styled(BaseNavigation)`
    background: #80b13e;
    color: #FFFFFF;
    letter-spacing: 1px;
    width: 90px;
    line-height: 22px;
    border-radius: 0px;
`;
const NavLinkStyle = styled(BaseNav)`
    flex-direction: column;
`;
const TextStyle = styled.div`
  padding-left: 0px;
  font-size: 10px;
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

export class CustomerCenterNavbar extends React.Component{

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
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/noticeBoard' >
                            <IconCnt>
                                <Icon icon={bullseye} />
                            </IconCnt>
                            <TextStyle>공지사항</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(1)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/questionBoard' >
                            <IconCnt>
                                <Icon icon={cube} />
                            </IconCnt>
                            <TextStyle>문의게시판</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
            </SideNav>
            </NavigationStyle>
            </div>
        );}           
} 
