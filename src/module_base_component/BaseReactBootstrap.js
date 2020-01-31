import * as React from "react";
import { Card, Form, InputGroup, FormControl } from 'react-bootstrap';
import { times, exchange } from 'react-icons-kit/fa/'
import { Icon as BaseIcon } from "react-icons-kit";
import styled from "styled-components";

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;
export class BaseProductPriceCalc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
              <InputGroup size="sm" style={{ width:'70%'}} className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                            단가/수량
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="상품단가"
                            onChange = {this.props.handleChangeProductPrice}/>
                        <IconCnt style={{marginTop:"2px",marginLeft:"2px", marginRight:"2px"}}>
                                <Icon icon={ times } />
                        </IconCnt>

                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="수량"
                            onChange = {this.props.handleChangeProductAmount}/>
                        <IconCnt style={{marginTop:"2px", marginLeft:"5px", marginRight:"5px"}}>
                                <Icon icon={ exchange } />
                        </IconCnt>

                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            value={ this.props.price*this.props.amount }
                            readOnly = "true"
                            onChange = {this.props.handleProductTotalPrice}
                            />
                        <InputGroup.Append>
                            <InputGroup.Text>(Euro)</InputGroup.Text>
                        </InputGroup.Append>
                </InputGroup>
          </div>
        );
      }    
}

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