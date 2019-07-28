import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { Table } from "react-bootstrap"
import { InputGroup, Card, FormControl } from 'react-bootstrap';

export class RecipientController extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <RecipientContactAddress/>
          </div>
        );
      }    
}

const ContactAddressStyle = styled.div`
    margin-top: 10px;
    margin-left:1%; 
    margin-right:15%;
    width: 90%;
    background: #FFFFFF;
    padding: 3px 3px 3px 3px;
    
    font-size: 15px;
`;

export class RecipientContactAddress extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" >
                                    연락처
                </InputGroup.Text>
                </InputGroup.Prepend>
            <Card style={{ width: '90%'}}>
            <Card.Body>
                
            <ContactAddressStyle>
            <Table bordered condensed responsive>
            <thead>
            </thead>
            <tbody>
                <tr>
                    <td width='150px'>연락처</td>
                    <td width='150px'>
                        <FormControl id="basic-url" 
                                aria-describedby="basic-addon3" 
                                style={{ marginRight:'10px'}}
                                size='sm'/>
                    </td>
                    <td width='150px'>
                        <FormControl id="basic-url" 
                                aria-describedby="basic-addon3" 
                                style={{ marginRight:'10px'}}
                                size='sm'/>
                    </td>
                    <td width='150px'>
                        <FormControl id="basic-url" 
                                aria-describedby="basic-addon3" 
                                style={{ marginRight:'10px'}}
                                size='sm'/>
                    </td>
                    </tr>
                <tr>
                    <td>주소</td>
                    <td colSpan='3'>
                        <FormControl id="basic-url" 
                                aria-describedby="basic-addon3" 
                                style={{ marginRight:'10px'}}
                                size='sm'/>
                    </td>
                </tr>
                <tr>
                    <td>상세 주소</td>
                    <td colSpan='3'>
                        <FormControl id="basic-url" 
                                aria-describedby="basic-addon3" 
                                style={{ marginRight:'10px'}}
                                size='sm'/>
                    </td>
                </tr>
                <tr>
                    <td>우편번호</td>
                    <td colSpan='1'>
                        <FormControl id="basic-url" 
                            aria-describedby="basic-addon3" 
                            style={{ marginRight:'10px'}}
                            size='sm'/>
                    </td>
                </tr>
            </tbody>
            </Table>
            </ContactAddressStyle>
            </Card.Body>
            </Card>
            </InputGroup>
          </div>
        );
      }    
}

