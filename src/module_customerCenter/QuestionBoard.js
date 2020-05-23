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
import { Card, Form, InputGroup, FormControl, Breadcrumb, Button, 
    } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'

var keycloak = Keycloak(keycloakConfigLocal);

{/* QuestionBoard Style */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const QuestionBoardContainer = styled(BaseAppContainer)`
  min-height:calc(100vh);
  height: auto;
`;

export class QuestionBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keycloakAuth:null,
            accessToken:"",
            userid:'',
            questionTitle:'',
            questionContent:'',
            questionAnswerList:[],
        }
        //this.fetchQuestionAnswer = this.fetchQuestionAnswer.bind(this)
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ 
                keycloakAuth: keycloak, 
                accessToken:keycloak.token, 
                userid:keycloak.tokenParsed.preferred_username
            })
            this.fetchQuestionAnswerData(keycloak.token)
        })
    }

    fetchQuestionAnswerData(accessToken){
        let userid = this.state.userid
        setTokenHeader(accessToken)
        fetch(basePort + '/getQuestionAnswerList/' + userid, {headers})
            .then((result) => {
               return result.json();
            }).then((data) => {
              console.log('fetching getQuestionAnswerList!' + data);
              this.setState( { questionAnswerList: data} )
            }).catch(error => {
                console.error('Error fetching getQuestionAnswerList!', error);
            });
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
            questionBoard = <QuestionBoardWrapper keycloak ={this.state.keycloakAuth}
                userid={this.state.userid}
                accessToken={this.state.accessToken}
                questionAnswerList={this.state.questionAnswerList} />
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
                    <Breadcrumb style={{ width: '100%'}}>
                        <Breadcrumb.Item active>고객센터 / 문의게시판</Breadcrumb.Item>
                    </Breadcrumb>
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
            dispatchedQuestion:false,
        }
        this.handleDispatchQuestion = this.handleDispatchQuestion.bind(this)
        this.handleCompleted = this.handleCompleted.bind(this)
    }

    handleDispatchQuestion(event){
        this.setState({dispatchedQuestion:true})
        setTimeout(() => { window.location.reload()  }, 3000);
    }

    handleCompleted(){
        this.setState({dispatchedQuestion:false})
    }
      
    render() {
        const dispatchedQuestion = this.state.dispatchedQuestion
        let questionRegisterFormWrapper;

        if(dispatchedQuestion){
            questionRegisterFormWrapper = <CompleteRegisterQuestion handleCompleted={this.handleCompleted}/>
        } else {
            questionRegisterFormWrapper = <RegisterQuestion keycloak ={this.props.keycloakAuth}
                userid={this.props.userid}
                handleDispatchQuestion={this.handleDispatchQuestion}
                accessToken={this.props.accessToken}
                />
        }

        return (
          <div>
            {/* 질문 등록 */}
            {questionRegisterFormWrapper}

            {/* 질문 답변 게시판 */}
            <QuestionAnswerBoard questionAnswerList={this.props.questionAnswerList}/>

            <CompanyIntroductionBottom/>
          </div>
        );
      }    
}

export class CompleteRegisterQuestion extends React.Component{
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
      dataField: 'qnaid',
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
      dataField: 'answerState',
      text: '답변상태',
      formatter:answerStateFormatter,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'center' };
      }
    },
  ];

function answerStateFormatter(cell, row) {
    
    let answerState
    if (cell === "READY_TO_ANSWER"){
        answerState = "답변예정"
    } else {
        answerState = "답변완료"
    }    
    return (
        <div>
            {answerState}
        </div>
    );
}

const data = [
    {"questionNr":"1",
      "questionTitle":"배송문의",
      "questionContent":"배송이 언제 오나요?",
      "answerContent":"배송함",
      "questionDate":"2019-01-06",
      "questionState":"미답변",
    },
    {"questionNr":"2",
    "questionTitle":"구매문의",
    "questionContent":"구매물품이 언제 오나요?",
    "answerContent":"구매함",
    "questionDate":"2019-01-09",
    "questionState":"답변완료",
  },
]

const QuestionBoardTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
`;

export class RegisterQuestion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            registerdQuestion:false,
            questionTitle:'',
            questionContent:'',
        }
        this.handleInputQuestionTitle = this.handleInputQuestionTitle.bind(this)
        this.handleInputQuestionContent = this.handleInputQuestionContent.bind(this)
        this.handleRegisterQuestion = this.handleRegisterQuestion.bind(this)
    }


    handleInputQuestionTitle(event){
        this.setState({questionTitle:event.target.value})
    }
    
    handleInputQuestionContent(event){
        this.setState({questionContent:event.target.value})
    }

    handleRegisterQuestion(event){
        {/* 질문 등록전 곱하기 계산 결과 넣기  */}
        var questionBoardObject = {
            questionTitle:this.state.questionTitle,
            questionContent:this.state.questionContent,
        }
        
        const questionBoardData =  [
            {questionBoardData: JSON.stringify(questionBoardObject)}
        ]

        {/* 질문 제목, 내용 체크 */}
        if(questionBoardObject.questionTitle && questionBoardObject.questionContent){
            this.handleCreateQuestion(this.props.accessToken, questionBoardData)
        } else {
            console.log("bad")
        }
    }
    
    handleCreateQuestion(accessToken, questionBoardData){
        let userid = this.props.userid
        this.setTokenHeader(accessToken)
        fetch(basePort + '/registerQuestion/' + userid, 
                {method:'post', headers, 
                  body:JSON.stringify(questionBoardData)})
        
        {/* 질문 창 닫기 */}
        this.props.handleDispatchQuestion()
    }
    
    setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
    }

    render() {
       
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
                onClick={(e) => this.handleRegisterQuestion(e)}
            >문의하기
            </Button>
            </Card.Body>
            </Card>

           
          </div>
        );
      }    
}

const QuestionAnswerBoardTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
`;
export class QuestionAnswerBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent:false,
            questionTitle:'', 
            questionContent:'',
            answerContent:'',
            questionDate:'',
            questionState:''
        }
        this.handleCompleted = this.handleCompleted.bind(this)
    }

    handleCompleted(){
        this.setState({showContent:false})
    }
      
    render() {

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.setState({showContent:true, 
                    questionTitle:row.questionTitle, 
                    questionContent:row.questionContent,
                    answerContent:row.answerContent,
                    questionDate:row.questionDate,
                    questionState:row.questionState
                })
                console.log(rowIndex)
                console.log(row.questionContent)
            },
        };

        let questionAnswerBoardWrapper;

        if(this.state.showContent){
            questionAnswerBoardWrapper = <QuestionAnswerContent 
                questionTitle={this.state.questionTitle} 
                questionContent={this.state.questionContent}
                answerContent={this.state.answerContent}
                questionDate={this.state.questionDate}
                questionState={this.state.questionState}
                handleCompleted={this.handleCompleted}
                />
        } else {
            questionAnswerBoardWrapper = <BootstrapTable keyField='qnaid'  
                data={ this.props.questionAnswerList } 
                columns={ columnsQuestionBoard } 
                bordered={ true }   
                selectRow={ selectRow }
                pagination={paginationFactory()}
            />
        }

        return (
          <div>
             <Card border="dark" style={{ width:'70%', marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>문의리스트
                </Card.Header>
                <Card.Body>
                    <QuestionAnswerBoardTableStyle>
                       {questionAnswerBoardWrapper}
                    </QuestionAnswerBoardTableStyle>
                </Card.Body>
            </Card>
          </div>
        );
      }    
}

{/* QuestionContent Style */}
const QuestionContentStyle = {
    width:'90%', height:'15rem', marginTop:'1rem', marginLeft:'1rem', marginRight:'1rem', marginBottom:'2rem'
};

const COMPLETE_ANSWER = "답변완료"
export class QuestionAnswerContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleCompleted = this.handleCompleted.bind(this)
    }

    handleCompleted(){
        this.props.handleCompleted()
    }
      
    render() {
        const questionState = this.props.questionState
        let answerContent

        if(questionState == COMPLETE_ANSWER){
            answerContent = <AnswerContent answerContent={this.props.answerContent} 
                />
        } else {
            answerContent = ''
        }

        return (
          <div>
            <Card style={QuestionContentStyle}>
            <Card.Body>
                <Card.Title style={{fontSize:'16px'}}>문의사항: {this.props.questionTitle} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.props.questionDate}</Card.Subtitle>
                <Card.Text style={{marginTop:'2rem'}}>
                    {this.props.questionContent}
                </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
            </Card.Body>
            </Card>
            
            {/* show the content of answer, if it has answered form the manager */}
            {answerContent}

            <Button size="sm" 
                        variant='secondary' 
                        style={{position:'absolute', marginTop:'5px', bottom:10, left:'45%', fontSize:'14px'}}
                        onClick={(e) => this.handleCompleted(e)}
                    >닫기
            </Button>
          </div>
        );
      }    
}

function AnswerContent(props) {
  
    return (
      <div>
        <Card style={QuestionContentStyle}>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">답변내용</Card.Subtitle>    
        <Card.Text style={{marginTop:'2rem'}}>
            {props.answerContent}
        </Card.Text>
        </Card.Body>
        </Card>
      </div>
    );
  }