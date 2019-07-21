import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { SideNav, Nav as BaseNav} from "react-sidenav";
import {
    NaviContainer as BaseAppContainer,
    ExampleNavigation as BaseNavigation,
  } from "../container";
import { Icon as BaseIcon } from "react-icons-kit";
import { calendar, pagelines } from 'react-icons-kit/fa/'

const NavLinkStyle = styled(BaseNav)`
  flex-direction: column;
  height:auto;
`;

const theme = {
    selectionBgColor: '#B0CC8B',
};

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

const Navigation = styled(BaseNavigation)`
    background: #80b13e;
    color: #FFFFFF;
    letter-spacing: 1px;
    width: 110px;
    line-height: 22px;
    border-radius: 0px;
`;

const Icon = props => <BaseIcon size={32} icon={props.icon} />;
var grey = '#727676';

export class SideNavBaseComponent extends React.Component{
    constructor(props) {
        super(props);

        this.state = { 
            active: null,
        };
      }

      myColor (position) {
        if (this.state.active === position) {
          return grey;
        }
        return "";
      }

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
        
        <Navigation> 
                <SideNav theme={theme} onItemSelection={this.onItemSelection}>
                    <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/' >
                            <IconCnt>
                                <Icon icon={pagelines} />
                            </IconCnt>
                            <Text>{this.props.category1}</Text>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                    <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
                    <NavLinkStyle>
                        <NavLink style={{ textDecoration:'none', color:'white'}} to='/' >
                            <IconCnt>
                                <Icon icon={calendar} />
                            </IconCnt>
                            <Text>{this.props.category2}</Text>
                        </NavLink>
                    </NavLinkStyle>
                    </div>
                </SideNav>
        </Navigation>
        
        </div>
        );
      }    
}