import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export class SearchPanel_ID extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
            <InputGroup className="mb-3" style={{ width: '20%', marginTop:'1rem', marginBottom:'1rem' }}>
                <FormControl
                  placeholder="회원 아이디"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange = {this.props.handleSearchChangeInput} 
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary"
                          onClick={(e) => this.props.handleSearch(e)}>Search
                  </Button>
                </InputGroup.Append>
            </InputGroup>
          </div>
        );
      }    
  }

export class SearchOrderPanel extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
            <InputGroup className="mb-3" style={{ width: '30%', marginTop:'1rem', marginBottom:'1rem' }}>
              <FormControl
                  placeholder="회원 아이디"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange = {this.props.handleSearchChangeInputUserid} 
                />
                <FormControl
                  placeholder="주문번호"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange = {this.props.handleSearchChangeInputOrderid} 
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary"
                          onClick={(e) => this.props.handleSearch(e)}>Search
                  </Button>
                </InputGroup.Append>
            </InputGroup>
          </div>
        );
      }    
  }