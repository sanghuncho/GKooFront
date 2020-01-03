import React, { Component } from 'react';
import './App.css';
import  logo  from './assets/hausbank_logo.jpg';
import { MemoryRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
} from "./container";
import styled from "styled-components";
import { SideNav, Nav as BaseNav} from "react-sidenav";
import { Icon as BaseIcon } from "react-icons-kit";
import { users } from "react-icons-kit/fa/users";
import { buildingO } from 'react-icons-kit/fa/buildingO'
import { connectdevelop } from 'react-icons-kit/fa/connectdevelop'
import { pagelines } from 'react-icons-kit/fa/pagelines'
import { Navbar, Nav, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { BuyingService } from './BuyingService'
import { ShippingService } from './module_shippingService_intro/ShippingService'
import { MyPage } from './module_mypage/MyPage';
import { FavoriteAddressManager } from './module_mypage/FavoriteAddressManager';
import { CustomerCenter } from './CustomerCenter'
import { Information } from './Infomation'

import { Home } from './Home'
import { RequestShippingService } from './module_shippingService/RequestShippingService';
import { MyPageDetail } from './module_mypage/MyPageDetail';
import { ManagementController } from './management/ManagementController'

class App extends Component {
  render() {
    return (
      <div>
        <Main/>
      </div>  
    );
  }
}

const Main = () => (
  <Switch>
    <Route exact path='/' component={ Home }></Route>
    <Route exact path='/buyingService' component={ BuyingService }></Route> 
    <Route exact path='/shippingService/' component={ ShippingService }></Route> 
    <Route exact path='/requestshipping' component={ RequestShippingService }></Route> 
    <Route exact path='/information' component={ Information }></Route> 
    <Route exact path='/mypage' component={ MyPage }></Route> 
    <Route exact path='/customercenter' component={ CustomerCenter }></Route> 
    <Route exact path='/detailsmypage/:id' component={ MyPageDetail }></Route>
    <Route exact path='/favoriteAddressManager' component={ FavoriteAddressManager }></Route>
    
    
    <Route exact path='/management' component={ ManagementController }></Route>

    {/* <Route exact path='/shippingService/requestShipping' component={ RequestShippingService }></Route>  */}
    {/* <Route exact path='/detailsmypage' component={MyPageDetail}></Route> */}
  </Switch>
);
export default App;


var grey = '#727676';

const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh);
`;

const Navigation = styled(BaseNavigation)`
  background: #80b13e;
  color: #FFFFFF;
  font-size: 1em;
  letter-spacing: 2px;
  width: 75px;
  line-height: 22px;
  border-radius: 1px;
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const theme = {
  selectionBgColor: '#B0CC8B',
};

const NavLinkStyle = styled(BaseNav)`
  flex-direction: column;
`;

const Text = styled.div`
  padding-left: 10px;
`;

const navbar = {
  backgroundColor: '#F16E10'
};

const MarginLeft50 = styled.div`
  margin-left: 50px;
  color: #FFF;
`;

const MarginLeft70 = styled.div`
  margin-left: 70px;
  color: #FFF;

`;

const Icon = props => <BaseIcon size={18} icon={props.icon} />;

//export class NavigationLink extends React.Component {

  //   state = { active: null };
    
  //   toggle(position) {
  //     if (this.state.active === position) {
  //       this.setState({active : null})
  //     } else {
  //       this.setState({active : position})
  //     }
  //   }
  
  //   myColor (position) {
  //     if (this.state.active === position) {
  //       return grey;
  //     }
  //     return "";
  //   }
  
  //   onItemSelection = arg => {
  //     this.setState({ selectedPath: arg.path });
  //   };
  
  //   render() {
  //     return ( 
  //   <AppContainer>
  //     <Navigation> 
  //       <SideNav theme={theme} onItemSelection={this.onItemSelection}>
  //         <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
  //           <NavLinkStyle>
  //               <NavLink style={{ textDecoration:'none', color:'white'}} to='/' >
  //                 <IconCnt>
  //                   <Icon icon={pagelines} />
  //                 </IconCnt>
  //                 <Text>Home</Text>
  //               </NavLink>
  //           </NavLinkStyle>
  //         </div>
  //         <div style={{background: this.myColor(1), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(1)}} >
  //           <NavLinkStyle>
  //               <NavLink style={{ textDecoration:'none', color:'white' }} to='/verwalter'>
  //                 <IconCnt>
  //                   <Icon icon={users} />
  //                 </IconCnt>
  //                 <Text>MyPage</Text>
  //               </NavLink>
  //           </NavLinkStyle>
  //         </div>
  //         <div style={{background: this.myColor(2), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(2)}} >
  //           <NavLinkStyle>
  //               <NavLink style={{ textDecoration:'none', color:'white' }} to='/wirtschaftseinheit'>
  //                 <IconCnt>
  //                   <Icon icon={buildingO} />
  //                 </IconCnt>
  //                 <Text>WE</Text>        
  //               </NavLink>          
  //           </NavLinkStyle>
  //         </div>
  //         <div style={{background: this.myColor(3), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(3)}} >
  //           <NavLinkStyle>
  //               <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/Einheit'>
  //                 <IconCnt>
  //                   <Icon icon={connectdevelop} />
  //                 </IconCnt>
  //                 <Text>Einheit</Text>
  //               </NavLink>
  //           </NavLinkStyle>
  //         </div>
  //       </SideNav>
  //     </Navigation>
  //   </AppContainer>
  //   );}
  // }