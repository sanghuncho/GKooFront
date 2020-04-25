import styled from "styled-components";
import React from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';

const data = [
    { "date":"19.05.2019",
      "user":"상훈"
    },
    { "date":"20.06.2019",
      "user":"성준"
    },
    { "date":"20.06.2019",
      "user":"성아"
    }
  ]

const BaseTableComponentStyle = styled.div`
    margin-top: 25px;
    margin-left:1%; 
    margin-right:15%;
    width: 1000px;
    background: #FFFFFF;
    padding: 0px 5px 5px 5px;
    box-shadow: 2px 2px 3px 3px #888; 
    font-size: 13px;
`;

function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
}

class BaseTableComponent extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        const rowEvents = {
          onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index: ${rowIndex}`);
            this.setRedirect();
          }
        };

        const columnsBaseTableComponent = [{
          dataField: 'date',
          text: 'DATE',
        },{
          dataField: 'user',
          text: 'USER',
        } ];


        return (
          <div>
            <BaseTableComponentStyle>
                <CaptionMypageTable title="title"/>
                <BootstrapTable keyField='objectId'  data={ this.data } columns={ columnsBaseTableComponent } 
                    hover pagination={ paginationFactory() } bordered={ false } rowEvents={ rowEvents } noDataIndication="Table is empty"  />
            </BaseTableComponentStyle>
          </div>
        );
      }    
}