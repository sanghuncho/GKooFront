import React from "react";
import styled from "styled-components";
import { SideNav, Nav as BaseNav} from "react-sidenav";
import { users } from "react-icons-kit/fa/users";
import { cubes } from "react-icons-kit/fa/cubes";
import { circleO } from "react-icons-kit/fa/circleO";
import {
    AppContainer as BaseAppContainer,
    ExampleNavigation as BaseNavigation,
  } from "./container";
import { Icon as BaseIcon } from "react-icons-kit";

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
`;

const Nav = styled(BaseNav)`
  flex-direction: column;
`;

const Text = styled.div`
  padding-left: 5px;
`;

const TextWE = styled.div`
  padding-left: 5px;
`;

const theme = {
  hoverBgColor: "#303641",
  selectionBgColor: "#303641",
  selectionIconColor: "#03A9F4"
};

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

export class AppNavigation extends React.Component {
    state = { selectedPath: '' }
    onItemSelection = arg => {
        this.setState({ selectedPath: arg.path });
      };
    
  render() {
    return (
        <AppContainer>
            <Navigation>
                <SideNav theme={theme} onItemSelection={this.onItemSelection} 
                selectedPath={this.state.selectedPath} >
                    <Nav id= {"verwalter"}>
                        <IconCnt>
                            <Icon icon={users} />
                        </IconCnt>
                        <Text>Verwalter</Text>
                    </Nav>
                    <Nav id={"2"}>
                        <IconCnt>
                            <Icon icon={circleO} />
                        </IconCnt>
                        <TextWE>Wirtshcafs</TextWE>
                        <TextWE>einheit</TextWE>
                    </Nav>
                    <Nav id={"3"}>
                        <IconCnt>
                            <Icon icon={cubes} />
                        </IconCnt>
                        <Text>Einheit</Text>
                    </Nav> 
                </SideNav>
            </Navigation>
        </AppContainer>
    );
  }
}
