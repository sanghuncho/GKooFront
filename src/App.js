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
import { home } from 'react-icons-kit/fa/home'
import { buildingO } from 'react-icons-kit/fa/buildingO'
import { connectdevelop } from 'react-icons-kit/fa/connectdevelop'
import { pagelines } from 'react-icons-kit/fa/pagelines'

import { Verwalter } from './Verwalter'
import { Home } from './Home'
import { Wirtschaftseinheit } from './Wirtschaftseinheit'
import { Einheit } from './Einheit'

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
  width: 110px;
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

const Nav = styled(BaseNav)`
  flex-direction: column;
`;

const Text = styled.div`
  padding-left: 5px;
`;

export class  NavigationLink extends React.Component {

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

  render() { return ( <AppContainer>
    <Navigation> 
      <SideNav theme={theme} onItemSelection={this.onItemSelection}>
        <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(0)}} >
          <Nav>
              <NavLink style={{ textDecoration:'none', color:'white'}} to='/' >
                <IconCnt>
                  <Icon icon={pagelines} />
                </IconCnt>
                <Text>Home</Text>
              </NavLink>
          </Nav>
        </div>
        <div style={{background: this.myColor(1), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(1)}} >
          <Nav>
              <NavLink style={{ textDecoration:'none', color:'white' }} to='/verwalter'>
                <IconCnt>
                  <Icon icon={users} />
                </IconCnt>
                <Text>Verwalter</Text>
              </NavLink>
          </Nav>
        </div>
        <div style={{background: this.myColor(2), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(2)}} >
          <Nav>
              <NavLink style={{ textDecoration:'none', color:'white' }} to='/wirtschaftseinheit'>
                <IconCnt>
                  <Icon icon={buildingO} />
                </IconCnt>
                <Text>WE</Text>
                
              </NavLink>          
          </Nav>
        </div>
        <div style={{background: this.myColor(3), borderBottom:'1px solid #4D8444', height:'70px'}} onClick={() => {this.toggle(3)}} >
          <Nav>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/Einheit'>
                <IconCnt>
                  <Icon icon={connectdevelop} />
                </IconCnt>
                <Text>Einheit</Text>
              </NavLink>
          </Nav>
        </div>
      </SideNav>
    </Navigation>
  </AppContainer>);}
}

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/verwalter' component={Verwalter}></Route> 
    <Route exact path='/wirtschaftseinheit' component={Wirtschaftseinheit}></Route> 
    <Route exact path='/einheit' component={Einheit}></Route> 
  </Switch>
);

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar" style={{background: naviGreen, marginLeft:-16, height:50, borderRadius:2, boxShadow:"1px 1px 2px black"}}>
         <a className="navbar-brand" href="/">
             <img src={ logo } width="180" height="50" alt=""/>
         </a>
        </nav>
        <AppContainer>
          <Navigation>
            <NavigationLink/>  
          </Navigation>
          <Main/>
        </AppContainer> 
      </div>  
    );
  }
}

export default App;
