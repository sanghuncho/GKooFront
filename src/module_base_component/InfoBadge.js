import { Card, Badge, InputGroup } from "react-bootstrap"
import React from 'react';

export class InfoBadge extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
            <InputGroup style={{marginTop: '5px', marginBottom: '5px', marginRight: '5px', marginLeft: '5px'}}>
                <Badge variant="info" style={{ marginRight: '5px'}}>Info</Badge>
                <Card.Text style={{ fontSize: '12px'}}>{this.props.infoText}</Card.Text>
            </InputGroup>
          </div>
        );
      }    
}