import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
} from "../container";
import React from 'react';
import { AppNavbar } from '../AppNavbar'
import { CustomerCenterNavbar } from './CustomerCenterIntro'
import { Table, Image, Button, Card, Breadcrumb, Container, Row, Col } from "react-bootstrap"
import GKoo_Intro_Banner_Org  from '../assets/Gkoo_Intro_Banner_Org.jpg'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { openHeaders, openBasePort } from "../module_base_component/AuthService"
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'

/** NoticePane Style */
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const NoticePaneContainer = styled(BaseAppContainer)`
  height: auto;
  min-height:calc(100vh);
`;

/** 공지사항  */
export class NoticeBoard extends React.Component {

    render() {
        return (
            <div>
                {/* 상단 내비 */}
                <AppNavbar />

                <NoticePaneContainer>
                     {/* 좌측 내비 */}
                    <CustomerCenterNavbar/>
                    
                    <BodyContainer>
                        <Breadcrumb style={{ width: '100%'}}>
                            <Breadcrumb.Item active>고객센터 / 공지사항</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* 공지사항 목록 */}
                        <NoticePaneWrapper/>

                        <CompanyIntroductionBottom/>
                    </BodyContainer>
                </NoticePaneContainer>
            </div>
        );
    }
}

/** NoticePaneWrapper Style  */
const noticePaneWrapperStyle = {
    width: '70%',
    paddingTop: '20px',
    marginLeft: '20px'
}

const columnsNoticeBoard = [
    {
      dataField: 'noticeid',
      text: '번호',
      headerStyle: (colum, colIndex) => {
        return { width: '60px', textAlign: 'center' };
      }
    },{
      dataField: 'noticeTitle',
      text: '제목',
    },{
      dataField: 'noticeDate',
      text: '날짜',
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'center' };
      }
    }
];

const data = [
    {
      "noticeNr":"1",
      "noticeTitle":"신년배송안내",
      "noticeContent":"새해에는 1",
      "noticeDate":"2019-01-06",
    },
    {
    "noticeNr":"2",
    "noticeTitle":"배송비 안내",
    "noticeContent":"새해에는 2",
    "noticeDate":"2019-01-09",
    },
]

const NoticeBoardTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
`;

export class NoticePaneWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keycloakAuth:null,
            accessToken:"",
            notices:'',
            showContent:false,
            noticeTitle:'',
            noticeContent:'',
            noticeDate:'',
        }
        this.handleCompleted = this.handleCompleted.bind(this)
        //this.fetchNotices = this.fetchNotices.bind(this)
    }

    componentDidMount() {
        this.fetchNotices()
    }

    fetchNotices(){
        fetch(openBasePort + '/getNoticeList', {openHeaders})
          .then((result) => { 
             return result.json();
          }).then((data) => {
            console.log(data)
            this.setState( { notices: data } )
          })   
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
                    noticeTitle:row.noticeTitle, 
                    noticeContent:row.noticeContent,
                    noticeDate:row.noticeDate,
                })
            },
        };

        let noticeBoardWrapper;

        if(this.state.showContent){
            noticeBoardWrapper = <NoticeContent noticeTitle={this.state.noticeTitle} 
                noticeContent={this.state.noticeContent}
                noticeDate={this.state.noticeDate}
                handleCompleted={this.handleCompleted}
                />
        } else {
            noticeBoardWrapper = <BootstrapTable keyField='noticeid'  
            data={ this.state.notices } 
            columns={ columnsNoticeBoard } 
            bordered={ true }   
            selectRow={ selectRow }
            pagination={paginationFactory()}
            />
        }

        return (
            <div>
                <Container style={noticePaneWrapperStyle} >
                    <Row>
                        <Col><NoticeUnit_1/></Col>
                        <Col><NoticeUnit_2/></Col>
                        <Col><NoticeUnit_3/></Col>
                    </Row>
                </Container>

                <Card border="dark" style={{ width:'70%', marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>공지사항 리스트
                </Card.Header>
                <Card.Body>
                    <NoticeBoardTableStyle>
                        {noticeBoardWrapper}
                    </NoticeBoardTableStyle>
                </Card.Body>
            </Card>
            </div>
        );
    }
}

{/* NoticeContent Style */}
const noticeContentStyle = {
    width:'90%', marginTop:'1rem', marginLeft:'1rem', marginRight:'1rem', marginBottom:'2rem'
};
export class NoticeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          state_name:null,
        }
        this.handleCompleted = this.handleCompleted.bind(this)
    }

    handleCompleted(){
        this.props.handleCompleted()
    }
      
    render() {
        return (
          <div>
            <Card style={noticeContentStyle}>
            <Card.Body>
                <Card.Title>공지사항: {this.props.noticeTitle} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.props.noticeDate}</Card.Subtitle>
                <Card.Text style={{marginTop:'2rem'}}>
                    {this.props.noticeContent}
                </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
            </Card.Body>
            </Card>
            
            <Button size="sm" 
                        variant='secondary' 
                        style={{  position:'absolute',bottom:5, left:'45%', fontSize:'14px', }}
                        onClick={(e) => this.handleCompleted(e)}
                    >닫기
            </Button>
          </div>
        );
      }    
}

export class NoticeUnit_1 extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>공지사항 2020.01.05</Card.Header>
                    <Card.Body>
                        <Card.Title>지쿠 테스트 배송대행 운영</Card.Title>
                        <Card.Text>
                            지쿠 배송대행을 일정기간동안 테스트 운영을 통해 안정된 웹사이트가 되도록 정한 기간입니다.
                        </Card.Text>
                       {/* <Button variant="primary">Go</Button> */}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

/** NoticeUnit_2 Style  */
const noticeUnit_2_Style = {
    width: '230px', marginTop:'1px'
}
export class NoticeUnit_2 extends React.Component {

    render() {
        return (<div>
            <Card>
                <Card.Header>공지사항 2020.01.03</Card.Header>
                <Card.Body>
                    <Card.Title>결제안내</Card.Title>
                    <Card.Text>
                        <Image src={GKoo_Intro_Banner_Org} style={noticeUnit_2_Style} />
                    </Card.Text>
                   {/* <Button variant="primary">Go</Button> */}
                </Card.Body>
            </Card>
        </div>
        );
    }
}

export class NoticeUnit_3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    
        this.handleMoveToLink = this.handleMoveToLink.bind(this);
    }

    handleMoveToLink(){
        const url = 'http://cafe.naver.com/ggigguinmuenchen';
        window.open(url, '_blank');
    }

    render() {
        return (<div>
            <Card>
                <Card.Header>공지사항 2019.12.25</Card.Header>
                <Card.Body>
                    <Card.Title>지쿠 배송/구매대행 오픈</Card.Title>
                    <Card.Text>
                        지꾸의 독일구매행 카페에서 드디어 지쿠웹사이트를 런칭하게 되었습니다.
                    </Card.Text>
                    <Button variant="outline-secondary" size="sm" onClick={this.handleMoveToLink}>지쿠 카페 바로가기</Button>
                </Card.Body>
            </Card>
        </div>
        );
    }
}

