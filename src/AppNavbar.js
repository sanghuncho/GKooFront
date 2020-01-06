import styled from "styled-components";
import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon as BaseIcon } from "react-icons-kit";
import { signOut } from 'react-icons-kit/fa/'
import { INITIAL_PAGE } from "./module_base_component/AuthService"

const Icon = props => <BaseIcon size={18} icon={props.icon} />;

const Text = styled.div`
  padding-left: 10px;
`;

var naviGreen = '#80b13e'

export class AppNavbar extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Navbar style={{background: naviGreen, height:"auto", borderRadius:2, boxShadow:"1px 1px 2px black"}}>
                <Navbar.Brand>
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/'>
                    <Text>GKoo</Text>
                    </NavLink>      
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink style={{ textDecoration: 'none', color: 'white', marginLeft:'10px', marginRight:'10px' }} to='/infodeskIntro'>
                        <Text>이용안내</Text>
                    </NavLink>
                    <NavLink style={{ textDecoration: 'none', color: 'white', marginRight:'10px' }} to='/buyingserviceIntro'>
                        <Text>구매대행</Text>
                    </NavLink>
                    <NavLink style={{ textDecoration: 'none', color: 'white', marginRight:'10px' }} to='/shippingservice'>
                        <Text>배송대행</Text>
                    </NavLink>
                    <NavLink style={{ textDecoration: 'none', color: 'white', marginRight:'10px' }} to='/customerCenterIntro'>
                        <Text>고객센터</Text>
                    </NavLink>
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/mypage'>
                        <Text>마이페이지</Text>
                    </NavLink>
                </Nav>
                {this.props.children}
            </Navbar>
          </div>
        );
      }    
}

export class LogoutButton extends React.Component{
    
    handleLogout(){
        this.props.keycloak.logout({ redirectUri: INITIAL_PAGE })
    }

    render() {
        return (
        <div>
            <Form inline>
                    <OverlayTrigger
                        key='bottom'
                        placement='bottom'
                        overlay={
                            <Tooltip id='logout'>
                            로그아웃
                            </Tooltip>
                        }
                        >
                        <Button variant="secondary"
                            onClick={(e) => this.handleLogout(e)}
                        >
                        <Icon icon={ signOut } />
                        </Button>
                    </OverlayTrigger>
            </Form>
        </div>
        );
    }
  }