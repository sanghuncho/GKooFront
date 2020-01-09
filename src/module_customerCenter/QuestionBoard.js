import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { CustomerCenterNavbar } from './CustomerCenterIntro'
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, setTokenHeader, basePort } from "../module_base_component/AuthService"
import { Card, Form, InputGroup, FormControl, Dropdown, DropdownButton, Button, Popover, 
    } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

var keycloak = Keycloak(keycloakConfigLocal);

{/* QuestionBoard Style */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const QuestionBoardContainer = styled(BaseAppContainer)`
  height: calc(150vh);
`;

export class QuestionBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keycloakAuth:null,
            accessToken:"",
            questionTitle:'',
            questionContent:'',
        }
        //this.handleCancel = this.handleCancel.bind(this)
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ keycloakAuth: keycloak, 
            accessToken:keycloak.token})
            //this.fetchQuestionReplyData(keycloak.token)
         
        })
    }

    fetchQuestionReplyData(token){

    }

    validToken(token){
        return token === "" ? false : true
    }
  
    getEmptyPage(){
        return ""
    }
  
  
    render() {
        const token = this.state.accessToken
        let questionBoard;

        if(this.validToken(token)){
            questionBoard = <QuestionBoardWrapper keycloak ={this.state.keycloakAuth} />
        } else {
            questionBoard = this.getEmptyPage
        }
        
        return (
            <div>
            {/* 상단 내비*/}
            <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
            </AppNavbar>
            
            <QuestionBoardContainer>
                {/* 좌측 내비 */}
                <CustomerCenterNavbar/>
                <BodyContainer>
                    {/* 이메일 보내기 */}
                    {questionBoard}
                </BodyContainer>
            </QuestionBoardContainer>
            </div>
        );}           
}

export class QuestionBoardWrapper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dispatchedEmail:false,
        }
        this.handleDispatchEmail = this.handleDispatchEmail.bind(this)
        this.handleCompleted = this.handleCompleted.bind(this)
      }

    handleDispatchEmail(event){
        this.setState({dispatchedEmail:true})
    }

    handleCompleted(){
        this.setState({dispatchedEmail:false})
    }
      
    render() {
        const dispatchedEmail = this.state.dispatchedEmail
        let questionBoardWrapper;

        if(dispatchedEmail){
            questionBoardWrapper = <CompleteSendEmail handleCompleted={this.handleCompleted}/>
        } else {
            questionBoardWrapper = <SendEmail keycloak ={this.props.keycloakAuth}
                handleDispatchEmail={this.handleDispatchEmail}
                />
        }

        return (
          <div>
              {questionBoardWrapper}
          </div>
        );
      }    
}

export class CompleteSendEmail extends React.Component{
    constructor(props) {
        super(props);
        this.handleCompleted = this.handleCompleted.bind(this)
      }

      handleCompleted(){
        this.props.handleCompleted()
      }
      
      render() {
        return (
          <div>
               <Card border="dark" style={{ width:'50%', height:'14rem', marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>문의사항이 접수되었습니다
                </Card.Header>
                <Card.Body>
                    빠른시간안에 답변해드리겠습니다<br/>
                    감사합니다<br/>
                    <br/>
                    <Button size="sm" 
                        variant='secondary' 
                        style={{  marginRight:'5%', fontSize:'14px'}}
                        onClick={(e) => this.handleCompleted(e)}
                    >닫기
                    </Button>
                </Card.Body>
                </Card>
          </div>
        );
      }    
}

const columnsQuestionBoard = [
    {
      dataField: 'questionNr',
      text: '번호',
      headerStyle: (colum, colIndex) => {
        return { width: '60px', textAlign: 'center' };
      }
    },{
      dataField: 'questionTitle',
      text: '제목',
    },{
      dataField: 'questionDate',
      text: '날짜',
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'center' };
      }
    }, {
      dataField: 'questionState',
      text: '답변상태',
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'center' };
      }
    },
  ];
const data = [
    {"questionNr":"1",
      "questionTitle":"배송문의",
      "answer":"배송함",
      "questionDate":"2019-01-06",
      "questionState":"미답변",
    },
    {"questionNr":"2",
    "questionTitle":"구매문의",
    "answer":"구매함",
    "questionDate":"2019-01-09",
    "questionState":"답변완료",
  },
]

const QuestionBoardTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
`;

export class SendEmail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sendEmail:false,
            questionTitle:'',
            questionContent:'',
        }
        this.handleInputQuestionTitle = this.handleInputQuestionTitle.bind(this)
        this.handleInputQuestionContent = this.handleInputQuestionContent.bind(this)
    }


    handleInputQuestionTitle(event){
        this.setState({questionTitle:event.target.value})
    }
    
    handleInputQuestionContent(event){
        this.setState({questionContent:event.target.value})
    }

    handleCreate(accessToken, questionBoardData){
        setTokenHeader(accessToken)
        fetch(basePort + '/createFavoriteAddress', 
                {method:'post', headers, 
                  body:JSON.stringify(questionBoardData)})
        this.props.handleDispatchEmail()
    }

    handleSendEmnail(event){
        var questionBoardObject = {
            questionTitle:this.state.questionTitle,
            questionContent:this.state.questionContent,
          }
          
        const questionBoardData =  [
            {questionBoardData: JSON.stringify(questionBoardObject)}
        ]

        this.handleCreate(this.props.accessToken, questionBoardData)
    }
      
      render() {
        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => (
              <div>
                <QuestionContent questionTitle={row.questionTitle}
                    answer={row.answer}/>
              </div>
            )
        };
        return (
          <div>
            <Card border="dark" style={{ width:'70%', height:'28rem', marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>문의하기
                </Card.Header>
                <Card.Body>
                <InputGroup size="sm" className="mb-3" >
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3" >
                        제목
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Card style={{ width: '90%'}}>
                <Card.Body>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                        style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                        maxLength="100"
                        onChange = { this.handleInputQuestionTitle }
                    />
                </Card.Body> 
                </Card> 
                </InputGroup>
                
                <InputGroup size="sm"  className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" >
                    내용
                </InputGroup.Text>
                </InputGroup.Prepend>
                <Card style={{ width: '90%', height: '12em'}}>
                    <Card.Body>
                        <Form.Control id="basic-url" as="textarea"
                            aria-describedby="basic-addon3"
                            maxLength="400"
                            //value={this.state.deliveryMessage}
                            onChange={e => this.handleInputQuestionContent(e)}
                            style={{ height:'8em'}}/>
                    </Card.Body> 
                </Card> 
            </InputGroup>
            <Button size="sm" 
                variant='secondary' 
                style={{  marginLeft:'45%', fontSize:'14px'}}
                onClick={(e) => this.handleSendEmnail(e)}
            >문의하기
            </Button>
            </Card.Body>
            </Card>


            <Card border="dark" style={{ width:'70%', height:'28rem', marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>문의리스트
                </Card.Header>
                <Card.Body>
                    <QuestionBoardTableStyle>
                    <BootstrapTable keyField='questionNr'  
                        data={ data } 
                        columns={ columnsQuestionBoard } 
                        bordered={ true }  
                        //noDataIndication="주문하신 물품이 없습니다"
                        expandRow={ expandRow }  />
                    </QuestionBoardTableStyle>
                </Card.Body>
            </Card>
          </div>
        );
      }    
}

export class QuestionContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          state_name:null,
        }
    }
      
    render() {
        return (
          <div>
            질문: {this.props.questionTitle}<br/><br/>
            답변: {this.props.answer}
          </div>
        );
      }    
}