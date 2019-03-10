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
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { Verwalter } from './Verwalter'
import { BuyingService } from './BuyingService'
import { ShippingService } from './ShippingService'
import { MyPage } from './module_mypage/MyPage';
import { CustomerCenter } from './CustomerCenter'
import { Information } from './Infomation'

import { Home } from './Home'
import { RequestShippingService } from './module_shippingService/RequestShippingService';

var naviGreen = '#80b13e'
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

export class NavigationLink extends React.Component {

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
  <AppContainer>
    <Navigation> 
      <SideNav theme={theme} onItemSelection={this.onItemSelection}>
        <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
          <NavLinkStyle>
              <NavLink style={{ textDecoration:'none', color:'white'}} to='/' >
                <IconCnt>
                  <Icon icon={pagelines} />
                </IconCnt>
                <Text>Home</Text>
              </NavLink>
          </NavLinkStyle>
        </div>
        <div style={{background: this.myColor(1), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(1)}} >
          <NavLinkStyle>
              <NavLink style={{ textDecoration:'none', color:'white' }} to='/verwalter'>
                <IconCnt>
                  <Icon icon={users} />
                </IconCnt>
                <Text>MyPage</Text>
              </NavLink>
          </NavLinkStyle>
        </div>
        <div style={{background: this.myColor(2), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(2)}} >
          <NavLinkStyle>
              <NavLink style={{ textDecoration:'none', color:'white' }} to='/wirtschaftseinheit'>
                <IconCnt>
                  <Icon icon={buildingO} />
                </IconCnt>
                <Text>WE</Text>        
              </NavLink>          
          </NavLinkStyle>
        </div>
        <div style={{background: this.myColor(3), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(3)}} >
          <NavLinkStyle>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/Einheit'>
                <IconCnt>
                  <Icon icon={connectdevelop} />
                </IconCnt>
                <Text>Einheit</Text>
              </NavLink>
          </NavLinkStyle>
        </div>
      </SideNav>
    </Navigation>
  </AppContainer>
  );}
}

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/verwalter' component={Verwalter}></Route> 
    <Route exact path='/buyingService' component={ BuyingService }></Route> 
    <Route exact path='/shippingService/' component={ ShippingService }></Route> 
    {/* <Route exact path='/shippingService/requestShipping' component={ RequestShippingService }></Route>  */}
    <Route exact path='/requestshipping' component={ RequestShippingService }></Route> 
    <Route exact path='/information' component={ Information }></Route> 
    <Route exact path='/mypage' component={ MyPage }></Route> 
    <Route exact path='/customercenter' component={CustomerCenter}></Route> 
    {/* <Route exact path='/wirtschaftseinheit' component={Wirtschaftseinheit}></Route> 
    <Route exact path='/wirtschaftseinheit/:id' component={Wirtschaftseinheit}></Route> 
    <Route exact path='/einheit' component={Einheit}></Route>  */}
  </Switch>
);

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

class App extends Component {
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
              <NavLink style={{ textDecoration: 'none', color: 'white', marginLeft:'10px', marginRight:'10px' }} to='/information'>
                <Text>이용안내</Text>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: 'white', marginRight:'10px' }} to='/buyingservice'>
                <Text>구매대행</Text>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: 'white', marginRight:'10px' }} to='/shippingservice'>
                <Text>배송대행</Text>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: 'white', marginRight:'10px' }} to='/customercenter'>
                <Text>고객센터</Text>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/mypage'>
                  <Text>마이페이지</Text>
              </NavLink>
          </Nav>
        <Nav bsStyle="pills" activeKey={1} >
          <NavItem eventKey={1} href="/home">        
          </NavItem>
        </Nav>
      </Navbar>

        <AppContainer>
          {/* <Navigation>
            <NavigationLink/>  
          </Navigation> */}
          <Main/>
        </AppContainer> 
      </div>  
    );
  }
}

export default App;
