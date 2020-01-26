import * as React from "react";
import { DropdownButton, InputGroup, Dropdown } from 'react-bootstrap';

export class BaseDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //categoryTitle:"선택",
        }
    }
      
    render() {
        return (
          <div>
               <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon4" style={{ width: '110px'}}>
                                {this.props.label}
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant = "outline-secondary"
                            title={this.props.title}
                            id="input-group-dropdown-category"
                            >
                            {this.props.titleList.map((title) => 
                                { return (<div><Dropdown.Item onSelect={e => this.props.handleSelectTitle(e, title)}>{title}</Dropdown.Item></div> )})}
                        </DropdownButton>
                    </InputGroup> 
          </div>
        );
      }    
}