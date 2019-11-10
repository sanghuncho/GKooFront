import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    ExampleNavigation as BaseNavigation,
  } from "./container";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { MemoryRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { AppNavbar } from './AppNavbar'

const Navigation = styled(BaseNavigation)`
    background: #FFFFFF;
    color: #FFFFFF;
    font-size: 1em;
    letter-spacing: 2px;
    width: 200px;
    line-height: 22px;
    border-radius: 0px;
    margin-left:10px;
    margin-top:10px;  
`;

const theme = {
    selectionBgColor: '#80b13e',
  };

const NavLinkStyle = styled(BaseNav)`
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const Text = styled.div`
  padding-left:5px;
  text-align:left;
  font-size:14px;
`;

var naviGreen = '#80b13e'
var grey = '#727676';

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

export class BuyingService extends React.Component{

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
                <AppNavbar/>
                <Navigation> 
                    <SideNav theme={theme} onItemSelection={this.onItemSelection}>
                        <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'40px'}} onClick={() => {this.toggle(0)}} >
                        <NavLinkStyle>
                            <NavLink style={{ textDecoration:'none', color:'black'}} to='/' >
                                {/* <IconCnt>
                                    <Icon icon={pagelines} />
                                </IconCnt> */}
                                <Text>구매대행 안내</Text>
                            </NavLink>
                        </NavLinkStyle>
                        </div>

                        <div style={{background: this.myColor(1), borderBottom:'1px solid #4D8444', height:'40px'}} onClick={() => {this.toggle(1)}} >
                        <NavLinkStyle>
                            <NavLink style={{ textDecoration:'none', color:'black'}} to='/'>
                                <Text>이베이구매대행 신청</Text>
                            </NavLink>
                        </NavLinkStyle>
                        </div>

                        <div style={{background: this.myColor(1), borderBottom:'1px solid #4D8444', height:'40px'}} onClick={() => {this.toggle(1)}} >
                        <NavLinkStyle>
                            <NavLink style={{ textDecoration:'none', color:'black'}} to='/'>
                                <Text>이베이경매대행 신청</Text>
                            </NavLink>
                        </NavLinkStyle>
                        </div>

                        <div style={{background: this.myColor(1), borderBottom:'1px solid #4D8444', height:'40px'}} onClick={() => {this.toggle(1)}} >
                        <NavLinkStyle>
                            <NavLink style={{ textDecoration:'none', color:'black'}} to='/'>
                                <Text>일반구매대행 신청</Text>
                            </NavLink>
                        </NavLinkStyle>
                        </div>
                
                {/* <div style={{background: this.myColor(2), borderBottom:'1px solid #4D8444', height:'40px'}} onClick={() => {this.toggle(2)}} >
                <NavLinkStyle>
                    <NavLink style={{ textDecoration:'none', color:'black' }} to='/wirtschaftseinheit'>
                        <IconCnt>
                        <Icon icon={buildingO} />
                        </IconCnt>
                        <Text>배송대행 문의게시판</Text>        
                    </NavLink>          
                </NavLinkStyle>
                </div> */}

            </SideNav>
            </Navigation>
            </div>
        );}           
} 
