import styled from "styled-components";
import React from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

const pageButtonRenderer = ({
    page,
    active,
    disable,
    title,
    onPageChange
  }) => {
    const handleClick = (e) => {
      e.preventDefault();
      onPageChange(page);
    };
    const activeStyle = {};
    if (active) {
      activeStyle.backgroundColor = 'black';
      activeStyle.color = 'white';
    } else {
      activeStyle.backgroundColor = 'gray';
      activeStyle.color = 'black';
    }
    if (typeof page === 'string') {
      activeStyle.backgroundColor = 'white';
      activeStyle.color = 'black';
    }
    return (
      <li className="page-item">
        <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
      </li>
    );
};

const options = {
    pageButtonRenderer
};

//It is not working customized pagination color of button:TODO
//if list has over 10 rows, then the paginaton can be showed.    
export class BaseTablePagination extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        let custom_pagination 
        if (this.props.data.length > 10) {
            custom_pagination = paginationFactory()
        } else {
            custom_pagination = ''
        }

        return (
       
          <div>
            <BootstrapTable 
                keyField= {this.props.keyField }
                data={ this.props.data } 
                columns={ this.props.columns } 
                pagination={ custom_pagination } 
                bordered={ this.props.bordered } 
                noDataIndication={ this.props.noDataIndication }
            />
          </div>
        );
      }    
}
