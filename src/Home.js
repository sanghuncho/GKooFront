import * as React from "react";
import { AppNavbar } from './AppNavbar'
import { Navbar, Nav, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { signOut, exchange } from 'react-icons-kit/fa/'
import { Icon as BaseIcon } from "react-icons-kit";
import { Image } from 'react-bootstrap';
import GKoo_Service_Info  from './assets/GKoo_Service_Info.jpg';

const Icon = props => <BaseIcon size={18} icon={props.icon} />;


export class Home extends React.Component {
  render() {
    return(
    <div className='home'>
        <AppNavbar>
           
        </AppNavbar>
        <Image src={GKoo_Service_Info} style={{ width: '600px', marginLeft:'20%', marginTop:'20px'}}/>
    </div>
    );}
}

export default Home;
