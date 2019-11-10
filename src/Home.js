import * as React from "react";
import { AppNavbar } from './AppNavbar'
import { Navbar, Nav, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { signOut, exchange } from 'react-icons-kit/fa/'
import { Icon as BaseIcon } from "react-icons-kit";

const Icon = props => <BaseIcon size={18} icon={props.icon} />;
//import styled from "styled-components";


export class Home extends React.Component {
  render() {
    return(
    <div className='home'>
        <AppNavbar>
            {/* <Form inline>
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
                        onClick={(e) => this.handleLogin(e)}
                        >
                        <Icon icon={ signOut } />
                        </Button>
                        </OverlayTrigger>
            </Form> */}
        </AppNavbar>
        <h1>Home Site</h1>
        <p> Feel free to browse around and learn more about me.</p>
    </div>
    );}
}

export default Home;
