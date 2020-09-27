import * as React from "react";
import { Card, Form, InputGroup, FormControl } from 'react-bootstrap';

export const MAX_BRAND_NAME_LENGTH = 50
export const MAX_ITEM_NAME_LENGTH = 100
export const MAX_KOREA_NAME_LENGTH = 50
export const MAX_ENGLISH_NAME_LENGTH = 50
export const MAX_TRANSIT_NUMBER_LENGTH = 13
export const MAX_PHONE_NUMBER_LENGTH = 20
export const MAX_ZIP_CODE_LENGTH = 10
export const MAX_ADDRESS_LENGTH = 10
export const MAX_DELIVERY_MESSAGE_LENGTH = 500
export const MAX_SHOP_URL_LENGTH = 300
export const MAX_DELIVERY_TRACKING_LENGTH = 50

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
                    placeholder={this.props.placeholder}
                    maxLength={this.props.maxLength}
                    />
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
                    readOnly={this.props.readOnly}
                    value={this.props.value}
                    />
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
            return value.length === MAX_TRANSIT_NUMBER_LENGTH
        case 'agreeWithCollection':
        console.log("agree")    
        console.log(value)
            return value === true  
    }

}