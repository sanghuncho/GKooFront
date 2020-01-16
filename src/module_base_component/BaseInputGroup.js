import * as React from "react";
import { Card, Form, InputGroup, FormControl } from 'react-bootstrap';

export class BaseInputGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //state_name:null,
        }

      //this.handleMethod = this.handleMethod.bind(this)
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