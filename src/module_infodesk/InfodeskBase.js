import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { InfodeskIntroNavbar } from './InfodeskIntro'

{/* Infodesk_Base CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const Infodesk_Base_Container = styled(BaseAppContainer)`
  height: calc(250vh);
`;

/* It can be used for new component */
export class Infodesk_Base extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <Infodesk_Base_Container>
                <InfodeskIntroNavbar/>
                <BodyContainer>

                    <Base_Component/>

                </BodyContainer>
            </Infodesk_Base_Container>
            </div>
        );}           
}

export class Base_Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value:null,
         
        }

      this.handleBaseValue = this.handleBaseValue.bind(this)
     
    }

    componentDidMount() {
        var base_var = {
            value: "",
        };
    }

    handleBaseValue(event){
        this.setState({value:event.target.value})
    }

    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '90%', marginBottom:'5px', marginTop:'1rem'}}>
                <Card.Header>Base</Card.Header>
                <Card.Body >
                <InputGroup size="sm" style={{ width:'80%'}} className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                            Base value
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                        placeholder="??"
                        //onChange={this.handleValue}
                       
                    />
                </InputGroup>

                <InputGroup size="sm" style={{ width:'80%'}} className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                        Base value
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                        placeholder="??"
                        //onChange={this.handleValue}
                        
                    />
                </InputGroup>
                    <Button variant="secondary" size="sm" 
                        //onClick={() => this.handleDo()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"right"}}>Do</Button>     
                </Card.Body>
            </Card>
        </div>
        );
      }    
}