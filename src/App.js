import React, { Component } from 'react';
import './App.css';
import  logo  from './assets/hausbank_logo.jpg';
import { AppContainer, Navigation, Body, Title } from "./container";
import { AppNavigation } from "./AppNavigation";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";

var green = '#61a556';


class App extends Component {
  render() {
    return (
      <div>
        <nav class="navbar" style={{background:green, marginLeft:-16, height:50}}>
         <a class="navbar-brand" href="#">
             <img src={ logo } width="180" height="50" alt=""/>
         </a>
        </nav>

      <AppContainer>
        <Navigation>
          {/* <Title> React SideNav </Title> */}
          <AppNavigation />
        </Navigation>
      {/* <Body>
        <Switch> */}
          {/* <Route path="//basic" component={Basic} />
          <Route path="//renderitems" component={RenderItems} />
          <Route path="//renderitems2" component={RenderItems2} />
          <Route path="/" exact component={Home} /> */}
      {/*  </Switch>
       </Body>*/}
      </AppContainer> 

      </div>
      
    );
  }
}

export default App;

// export default App = () => {
//   return class SideNavApp extends React.Component {
//     render() {
//       return (
//         <Router>
//           <App />
//         </Router>
//       );
//     }
//   };
// };