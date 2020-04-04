import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { MemoryRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { connectdevelop, cube, bullseye, home } from 'react-icons-kit/fa/'
import { AppNavbar } from '../AppNavbar'
import { Image } from 'react-bootstrap';
import GKoo_Service_Info  from '../assets/GKoo_Service_Info.jpg'

var naviGreen = '#80b13e'


{/* ShippingService CSS */}
export const BodyContainer = styled(BaseAppContainer)`
    min-height:calc(100vh);  
    height:auto;
    flex-direction: column;
`;
const ShippingServiceContainer = styled(BaseAppContainer)`
    min-height:calc(100vh);
    height: auto;
`;

export class ShippingService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <ShippingServiceContainer>
                <ShippingServiceNavbar/>
                <BodyContainer>
                    <Image src={GKoo_Service_Info} style={{ width: '600px', marginLeft:'20%', marginTop:'20px'}}/>
                </BodyContainer>
            </ShippingServiceContainer>
            </div>
        );}           
}

{/* ShippingServiceNavbar CSS */}
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
export class ShippingServiceNavbar extends React.Component{
    constructor(props) {
        super(props);
      }
      
    state = { active: null };
  
    toggle(position) {
      if (this.state.active === position) {
        this.setState({active : null})
      } else {
        this.setState({active : position})
      }
    }
    
    render() {
        return (
          <div>
              <NavigationStyle> 
                <SideNav theme={Theme} onItemSelection={this.onItemSelection}>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/requestshipping' >
                            <IconCnt>
                                <Icon icon={bullseye} />
                            </IconCnt>
                            <TextStyle>배송대행 신청</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(1)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/shippingServiceInfo' >
                            <IconCnt>
                                <Icon icon={cube} />
                            </IconCnt>
                            <TextStyle>배송대행 안내</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(2)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/shippingServiceAddressPane' >
                            <IconCnt>
                                <Icon icon={home} />
                            </IconCnt>
                            <TextStyle>배송주소 안내</TextStyle>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                </SideNav>
            </NavigationStyle>
          </div>
        );
      }    
}