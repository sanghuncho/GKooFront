import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    ExampleNavigation as BaseNavigation,
  } from "./container";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { MemoryRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { connectdevelop, cube, bullseye } from 'react-icons-kit/fa/'

const AppContainer = styled(BaseAppContainer)`
  height: calc(150vh);
`;

const Navigation = styled(BaseNavigation)`
    background: #80b13e;
    color: #FFFFFF;
    letter-spacing: 1px;
    width: 110px;
    line-height: 22px;
    border-radius: 0px;
`;

const theme = {
    selectionBgColor: '#727676',
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

export class ShippingService extends React.Component{

    state = { active: null };
  
    toggle(position) {
        console.log("toggle position: "+position)
      if (this.state.active === position) {
        this.setState({active : null})
      } else {
        this.setState({active : position})
      }
    }
  
    // myColor (position) {
    //     console.log("color position: "+position)
    //   if (this.state.active === position) {
    //     return grey;
    //   }
    //   return "";
    // }
  
    onItemSelection = arg => {
      this.setState({ selectedPath: arg.path });
    };

    render() {
        return (
            <div>
                {/* <AppContainer> */}
                <Navigation> 
                <SideNav theme={theme} onItemSelection={this.onItemSelection}>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/shippingService/requestShipping' >
                            <IconCnt>
                                <Icon icon={bullseye} />
                            </IconCnt>
                            <Text>배송대행 신청</Text>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(1)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/shippingService/requestShipping' >
                            <IconCnt>
                                <Icon icon={cube} />
                            </IconCnt>
                            <Text>배송대행 안내</Text>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{ borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(2)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/shippingService/requestShipping' >
                            <IconCnt>
                                <Icon icon={connectdevelop} />
                            </IconCnt>
                            <Text>배송주소 안내</Text>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                </SideNav>
            </Navigation>
            {/* </AppContainer> */}
            </div>
        );}           
} 
