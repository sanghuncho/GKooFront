import styled from "styled-components";
import React from 'react';
import { Table, Button, Card, InputGroup, FormControl } from "react-bootstrap"
import { keycloakConfigLocal, basePort, headers, localPort, setTokenHeader } from "./AuthService"

export class UserBaseInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            doEditUserBaseInfo:false,
            doOpenAddressManager:false,
            showBaseInfoButtons:true,
            showUserBaseInfoButtons:false,
            userBaseInfo:null
        };

        this.handleMoveToBaseInfo = this.handleMoveToBaseInfo.bind(this)
        this.handleShowStoredAddressManager = this.handleShowStoredAddressManager.bind(this)
        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doOpenAddressManager = this.doOpenAddressManager.bind(this)
      }

      doEditUserBaseInfo(){
        this.setState({doEditUserBaseInfo:true, showBaseInfoButtons:false})
      }
      
      componentDidMount() {
        this.fetchUserBaseInfo(this.props.accessToken)
      }

      // componentDidMount () {
      //   this.fetchUserBaseInfo(this.props.accessToken)
      // }
  
      fetchUserBaseInfo(token){
        setTokenHeader(token)
        fetch(basePort + '/fetchuserbaseinfo', {headers})
          .then((result) => { 
            return result.json();
          }).then((data) => {
            console.log("UserBaseInfoDisplayer:" + data);
           
            //console.log(data);
            this.setState( { userBaseInfo: data} )
          }).catch(function() {
            console.log("error fetching userbaseinfo");
        });
      }
      
      doOpenAddressManager(){
        this.setState({doOpenAddressManager:true, showBaseInfoButtons:false})
      }

      handleMoveToBaseInfo(){
        window.scrollTo(0, 0);
        this.setState({doEditUserBaseInfo:false, showBaseInfoButtons:true}) 
      }

      handleShowStoredAddressManager(){
        this.setState({doOpenAddressManager:false, showBaseInfoButtons:true}) 
      }
    
      
      render() {
        const showBaseInfoButtons = this.state.showBaseInfoButtons
        let editButton;
        let addressManagerButton;
        if(showBaseInfoButtons) {
          editButton = <Button variant="secondary" size="sm" onClick={(e) => this.doEditUserBaseInfo(e)} 
            style={{ marginRight: '10px', float:"right"}}>개인정보</Button>

          addressManagerButton =  <Button variant="secondary" size="sm" onClick={(e) => this.doOpenAddressManager(e)} 
            style={{ marginRight: '10px', float:"right"}}>배송지관리</Button>
        }
    
        const doEditUserBaseInfo = this.state.doEditUserBaseInfo
        const doOpenAddressManager = this.state.doOpenAddressManager
        let userbaseInfoDisplay;
        let displayHeight;
        let headerTitle
        if (doEditUserBaseInfo) {
            userbaseInfoDisplay = 
              <UserBaseInfoEditor 
                handleMoveToBaseInfo={this.handleMoveToBaseInfo}
                accessToken={this.props.accessToken}
                userBaseInfo={this.state.userBaseInfo}
                // recipientInfo={this.props.recipientInfo}
                // orderNumber={this.props.orderNumber}
               />
            
          } else if(doOpenAddressManager) {
            userbaseInfoDisplay = <AddressManager
                handleShowStoredAddressManager={this.handleShowStoredAddressManager}/>
            displayHeight = '14rem'
            headerTitle = '배송지 관리'

          } else {
            userbaseInfoDisplay = 
              <CompleteUserBaseInfo 
                customerStatusData={this.props.customerStatusData}
                doEditUserBaseInfo={this.doEditUserBaseInfo}
                doOpenAddressManager={this.doOpenAddressManager}/>
          }
        return (
          <div>
            {userbaseInfoDisplay}
          </div>
        );
      }    
}

export class CompleteUserBaseInfo extends React.Component{
    constructor(props) {
        super(props);

        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doOpenAddressManager = this.doOpenAddressManager.bind(this)
      }

      doEditUserBaseInfo(){
        this.props.doEditUserBaseInfo()
      }
      
      doOpenAddressManager(){
        this.props.doOpenAddressManager()
      }
      
      render() {
        return (
          <div>
            <Card border="dark" style={{ width: '80%', height:'11rem', marginTop:'1rem' }}>
            <Card.Header>기본정보
              {/* 배송지관리버튼 */}
              <Button variant="secondary" size="sm" onClick={(e) => this.doOpenAddressManager(e)} 
                style={{ marginRight: '10px', float:"right"}}>배송지관리</Button>
                
              {/* 개인정보수정버튼 */}
              <Button variant="secondary" size="sm" onClick={(e) => this.doEditUserBaseInfo(e)} 
                style={{ marginRight: '10px', float:"right"}}>개인정보</Button>
            </Card.Header>
            <Card.Body >
            <Table bordered condensed responsive size="sm">
            <thead>
            </thead>
            <tbody>
              <tr>
                <td width='300px'>개인사서함주소</td>
                <td width='250px' align='right'>gkoo-{this.props.customerStatusData.userid}</td>
                <td width='300px'>보유예치금</td>
                <td width='250px' align='right'>{this.props.customerStatusData.insuranceAmount}원</td>
              </tr>
              <tr>
                <td>보유적립금</td>
                <td align='right'>{this.props.customerStatusData.depositeAmount}원</td>
                <td >보유포인트</td>
                <td align='right'>{this.props.customerStatusData.pointAmount}p</td>
              </tr>
            </tbody>
          </Table>
          </Card.Body>
          </Card> 
          </div>
        );
      }    
}

export class UserBaseInfoEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          showUserBaseInfoDisplayer:true,
        };
        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doShowUserBaseInfo = this.doShowUserBaseInfo.bind(this)
    }

    handleMoveToBaseInfo(update){
        window.scrollTo(0, 0);
        this.props.handleShowStoredUserBaseInfo()
    }

    doEditUserBaseInfo(){
      this.setState({showUserBaseInfoDisplayer:false}) 
    }

    doShowUserBaseInfo(){
      this.setState({showUserBaseInfoDisplayer:true}) 
    }

    handleSave(){
      
    }

    render() {
      let userBaseInfoDisplayer
      if(this.state.showUserBaseInfoDisplayer) {
        /* read mode */
        userBaseInfoDisplayer = <UserBaseInfoDisplayer
          handleMoveToBaseInfo={this.props.handleMoveToBaseInfo}
          doEditUserBaseInfo={this.doEditUserBaseInfo}
          displaySaveButton={false}
          accessToken={this.props.accessToken}
          userBaseInfo={this.props.userBaseInfo}
          readOnly={true}
          />
      } 
      /* edit mode */
      else {
        userBaseInfoDisplayer = <UserBaseInfoDisplayer
          handleMoveToBaseInfo={this.props.handleMoveToBaseInfo}
          displaySaveButton={true}
          doShowUserBaseInfo={this.doShowUserBaseInfo}
          accessToken={this.props.accessToken}
          userBaseInfo={this.props.userBaseInfo}
          readOnly={false} />
      }
      return (
          <div>
             {userBaseInfoDisplayer}
          </div>
        );
      }    
}

export class UserBaseInfoDisplayer extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        lastName:null,
        firstName:null,

      };
      //this.handleCancel = this.handleCancel.bind(this)
      this.changeHandlerLastName = this.changeHandlerLastName.bind(this)
      this.changeHandlerFirstName = this.changeHandlerFirstName.bind(this)
    }

    /* 기본정보란으로 이동 */
    handleCancel(){
      window.scrollTo(0, 0);
      this.props.doShowUserBaseInfo()
    }

    handleSave(){
      this.updateUserBaseInfo(this.props.accessToken)
      this.props.doShowUserBaseInfo()
    }

    updateUserBaseInfo(accessToken){

      const editedUserBaseInfo =  [
          {username: "Sanghun"},
      ]

      setTokenHeader(accessToken)
      console.log(editedUserBaseInfo)
      fetch(basePort + '/updateuserbaseinfo', 
                {method:'post', headers, 
                  body:JSON.stringify(editedUserBaseInfo)})
    }

    changeHandlerLastName(event){
      this.setState({lastName:event.target.value}) 
    }

    changeHandlerFirstName(event){
      this.setState({firstName:event.target.value}) 
    }

    render() {
      let saveButton;
      let headerLine;
      if(this.props.displaySaveButton){
        /* 개인정보수정 편집가능 및 저장,취소버튼 노출 */
        headerLine = <div>개인정보 수정</div>
        saveButton = <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
                          <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                              onClick={(e) => this.handleSave(e)}
                          >완료
                          </Button>
                          <Button size="sm" variant='secondary' 
                              onClick={(e) => this.handleCancel(e)}
                          >취소</Button>
                    </InputGroup >
      } else {
        /* 개인정보 ony read 및 개인정보수정 버튼 노출 */
        headerLine = <div>개인정보
                            <Button variant="secondary" size="sm" 
                              onClick={(e) => this.props.handleMoveToBaseInfo()} 
                              style={{ marginRight: '10px', float:"right"}}>OK</Button>
                            
                            <Button variant="secondary" size="sm" 
                              onClick={(e) => this.props.doEditUserBaseInfo()} 
                              style={{ marginRight: '10px', float:"right"}}>개인정보 수정</Button></div>
      }
      
      return (
        <div>
        <Card border="dark" style={{ width: '80%', height:'40rem', marginTop:'1rem' }}>
            <Card.Header>
              
              {headerLine}
              
            </Card.Header>
            <Card.Body >
            <InputGroup className="mb-3" >
              <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">
                    기본
                  </InputGroup.Text>
              </InputGroup.Prepend>
              <Card style={{ width: '90%', height:'15rem'}}>
              <Card.Body>
                <InputGroup size="sm" className="mb-4" style={{ width:'70%'}}>
                  <InputGroup.Prepend >
                  <InputGroup.Text id="basic-addon3" >
                    이름(국문)
                  </InputGroup.Text>
                  </InputGroup.Prepend>
                    {/* 성 */}
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      onChange = { this.changeHandlerLastName }
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.userBaseInfo.lastName}
                      style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                    />
                    {/* 이름 */}
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.userBaseInfo.firstName}
                      style={{ width: '50px', backgroundColor: '#FFFFFF'}}
                      onChange={this.changeHandlerFirstName}
                    />
                  </InputGroup >
                  <InputGroup size="sm" className="mb-4" style={{ width: '70%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        이름(영문)
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.userBaseInfo.nameEng}
                      style={{ width: '50px',backgroundColor: '#FFFFFF'}}
                      //onChange = { this.changeHandlerNameEng }
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-4" style={{ width: '70%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        이메일
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.userBaseInfo.email}
                      style={{ width: '50px',backgroundColor: '#FFFFFF'}}
                      //onChange = { this.changeHandlerNameEng }
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-4" style={{ width: '70%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        개인통관고유번호
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.userBaseInfo.transitNr}
                      style={{ width: '50px', backgroundColor: '#FFFFFF'}}
                      //onChange = { this.changeHandlerNameEng }
                      />
                  </InputGroup>
                </Card.Body> 
              </Card> 
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" >
                  연락처
                </InputGroup.Text>
                </InputGroup.Prepend>
                <Card style={{ width: '90%'}}>
                <Card.Body>
                  <InputGroup size='sm' className="mb-3" style={{ width: '50%'}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                            연락처
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.phonePrefic}
                          style={{ width: '50px', marginRight:'1px', backgroundColor: '#FFFFFF'}}
                          //onChange={this.changeHandlerPhonePrefic}
                        />
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          style={{ width: '50px', marginRight:'1px', backgroundColor: '#FFFFFF'}}
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.phoneInterfix}
                          //onChange={this.changeHandlerPhoneInterfix}
                        />
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.phoneSuffix}
                          style={{ width: '50px', backgroundColor: '#FFFFFF'}}
                          //onChange={this.changeHandlerPhoneSuffix}
                        />
                  </InputGroup>
                  <InputGroup size='sm' className="mb-3" style={{ width: '50%'}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                            우편번호
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.zipCode}
                          style={{ marginRight:'10px', backgroundColor: '#FFFFFF'}}
                          //onChange={this.changeHandlerZipCode}
                        />
                        {/* <Button size='sm' variant='secondary' >우편번호 찾기</Button> */}
                  </InputGroup >

                  <InputGroup size='sm' className="mb-3" style={{ width: '90%'}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                            주소
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.address}
                          style={{backgroundColor: '#FFFFFF'}}
                          //onChange={this.changeHandlerAddress} 
                        />
                        </InputGroup >

                        <InputGroup size='sm' className="mb-3" style={{ width: '90%'}}>
                          <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                            상세주소
                          </InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl id="basic-url" aria-describedby="basic-addon3"
                            as="textarea" rows="2"
                            readOnly={this.props.readOnly}
                            defaultValue={this.props.userBaseInfo.detailAddress}
                            style={{backgroundColor: '#FFFFFF'}}
                            //onChange={this.changeHandlerAddressDetails}
                          />
                  </InputGroup >
                </Card.Body> 
              </Card> 
            </InputGroup>

            {/* 완료 및 저장버튼 */}
            {saveButton}
            
            </Card.Body>
          </Card>
        </div>
      );
    }    
}

export class AddressManager extends React.Component{
  constructor(props) {
      super(props);
    }

    handleCancel(update){
      window.scrollTo(0, 0);
      this.props.handleShowStoredAddressManager()
  }

  handleSave(){
    
  }
    
    render() {
      return (
        <div>
          <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
              <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                  onClick={this.handleSave}
              >완료
              </Button>
              <Button size="sm" variant='secondary' 
                  onClick={(e) => this.handleCancel(e)}
              >취소</Button>
          </InputGroup >
        </div>
      );
    }    
}