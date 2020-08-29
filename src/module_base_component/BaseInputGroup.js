import * as React from "react";
import { Card, Form, InputGroup, FormControl } from 'react-bootstrap';

export class BaseInputGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
              <InputGroup size="sm" style={{ width:'70%'}} className="mb-3" >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" style={{ width: '100px'}} >
                    {this.props.label}
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                    onChange = {this.props.handleChangeInput} 
                    placeholder={this.props.placeholder}/>
                </InputGroup>
          </div>
        );
      }    
}

export class BaseInputGroupEuro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
            <InputGroup size="sm" style={{ width:'70%'}} className="mb-3" >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" style={{ width: '110px'}} >
                    {this.props.label}
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                    onChange = {this.props.handleChangeInput} 
                    placeholder={this.props.placeholder}/>
                <InputGroup.Append>
                            <InputGroup.Text>(Euro)</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
          </div>
        );
      }    
}

export class BaseInputGroupUrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
            <InputGroup size="sm" style={{ width:'70%'}} className="mb-3" >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" style={{ width: '110px'}} >
                    {this.props.label}
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                    onChange = {this.props.handleChangeInput} 
                    placeholder={this.props.placeholder}/>
            </InputGroup>
          </div>
        );
      }    
}

export class BaseInputGroupUrlReadable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
            <InputGroup size="sm" style={{ width:'70%'}} className="mb-3" >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" style={{ width: '110px'}} >
                    {this.props.label}
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                    onChange = {this.props.handleChangeInput} 
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}/>
            </InputGroup>
          </div>
        );
      }    
}

export function validateInputForm(fieldName,  value){
    let valid = false
    switch(fieldName) {
        case 'transitNumber':
            //console.log(value.length === 8)
            return value.length === 8
        case 'agreeWithCollection':
        console.log("agree")    
        console.log(value)
            return value === true  
    }

}