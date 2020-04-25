import * as React from "react";
import { Form, Check } from 'react-bootstrap';

export class BaseCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    
        }
    }
      
    render() {
        return (
          <div>
               <Form.Check type='checkbox'
                    onChange={e => this.props.handleSelectCheckbox(e)} 
                    label={this.props.label}
                    defaultChecked={this.props.checked}
                    style={{marginLeft:'5px', marginTop:'5px', marginRight:'20px', fontSize:'14px'}}
                />
          </div>
        );
      }    
}