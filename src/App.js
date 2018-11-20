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


var green = '#61a556';
var lightGreen = '#90C088';
var deepGreen = '#4D8444';
var grey = '#979AA0';

const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh);
`;

const Navigation = styled(BaseNavigation)`
  background: #61a556;
  color: #FFFFFF;
  font-size: 1em;
  letter-spacing: 2px;
  width: 110px;
  line-height: 22px;
  border-radius: 3px;
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const theme = {
  //hoverBgColor: "#303641",
  selectionBgColor: lightGreen,
  //selectionIconColor: "#303641", 
  
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
        <div style={{background: this.myColor(0), borderBottom:'1px solid #4D8444', height: '70px'}} onClick={() => {this.toggle(0)}} >
          <Nav>
              <NavLink style={{ textDecoration: 'none', color: 'white'}} to='/' >
                <IconCnt>
                  <Icon icon={pagelines} />
                </IconCnt>
                <Text>Home</Text>
              </NavLink>
          </Nav>
        </div>
        <div style={{background: this.myColor(1), borderBottom:'1px solid #4D8444', height: '70px'}} onClick={() => {this.toggle(1)}} >
          <Nav>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/verwalter'>
                <IconCnt>
                  <Icon icon={users} />
                </IconCnt>
                <Text>Verwalter</Text>
              </NavLink>
          </Nav>
        </div>
        <div style={{background: this.myColor(2), borderBottom:'1px solid #4D8444', height: '70px'}} onClick={() => {this.toggle(2)}} >
          <Nav>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/wirtschaftseinheit'>
                <IconCnt>
                  <Icon icon={buildingO} />
                </IconCnt>
                <Text>WE</Text>
                
              </NavLink>          
          </Nav>
        </div>
        <div style={{background: this.myColor(3), borderBottom:'1px solid #4D8444', height: '70px'}} onClick={() => {this.toggle(3)}} >
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
        <nav class="navbar" style={{background:green, marginLeft:-16, height:50}}>
         <a class="navbar-brand" href="/">
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

const Home = () => (
  <div className='home'>
    <h1>Home Site</h1>
    <p> Feel free to browse around and learn more about me.</p>
  </div>
);

const Verwalter = () => (
  <div className='verwalter'>
    <h1>Verwalter</h1>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
  </div>
);

const Wirtschaftseinheit = () => (
  <div className='home'>
    <h1>Wirtschaftseinheit</h1>
    <p> Feel free to browse around and learn more about me.</p>
  </div>
);

const Einheit = () => (
  <div className='home'>
    <h1>Einheit</h1>
    <p> 한국에 가고 싶다.</p>
  </div>
);

export default App;
