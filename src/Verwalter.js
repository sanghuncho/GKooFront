import * as React from "react";
import { FormGroup, Form, ControlLabel, FormControl, Button, InputGroup} from 'react-bootstrap';
import styled from "styled-components";

const VewalterFrom = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

var green = '#61a556';

export class Verwalter extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      value: ''
    };

  }

  handleClick(e){
    console.log("click"); 
    console.log(this.state.value);
  }
  
  handleChange(e) {
     this.setState({ value: e.target.value });
  }

  render() {
    return(
    <div>
    <VewalterFrom>
      <Form inline>
       <FormGroup>
        <ControlLabel></ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Verwalter Nummer"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
        </FormGroup>{' '}
        <Button style={{ background: '#61a556',color: 'white', marginLeft:'2px' }} onClick={this.handleClick}>Suchen</Button>      
     </Form>
     </VewalterFrom>
     <VerwalterBody/>
     </div>
    );}
}

export default Verwalter;

const VerwalterBody = () => (
  <div className='verwalter'>
    <h1>Verwalter</h1>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
  </div>
);