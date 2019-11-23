import styled from "styled-components";
import React from 'react';
import { Table, Button, Card, InputGroup, FormControl } from "react-bootstrap"

export class UserBaseInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // customerBaseInfo:'',
            // value: '',
            doEditUserBaseInfo:false,
            doOpenAddressManager:false,
            showBaseInfoButtons:true,
            showUserBaseInfoButtons:false,
        };
        this.handleMoveToBaseInfo = this.handleMoveToBaseInfo.bind(this)
        this.handleShowStoredAddressManager = this.handleShowStoredAddressManager.bind(this)
        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doOpenAddressManager = this.doOpenAddressManager.bind(this)
      }

      doEditUserBaseInfo(){
        this.setState({doEditUserBaseInfo:true, showBaseInfoButtons:false}) 
      }
      
      doOpenAddressManager(){
        this.setState({doOpenAddressManager:true, showBaseInfoButtons:false})
      }

      handleMoveToBaseInfo(){
        window.scrollTo(0, 0);
        this.setState({doEditUserBaseInfo:false, showBaseInfoButtons:true}) 
      }

      handleShowStoredAddressManager(){
        this.setState({doOpenAddressManager:false}) 
        this.setState({showBaseInfoButtons:true}) 
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
        let displayHeight;
        let userbaseInfoDisplay;
        let headerTitle
        if (doEditUserBaseInfo) {
            userbaseInfoDisplay = 
              <UserBaseInfoEditor 
                handleMoveToBaseInfo={this.handleMoveToBaseInfo}
                
                // recipientInfo={this.props.recipientInfo}
                // orderNumber={this.props.orderNumber}
                // accessToken={this.props.accessToken}
               />
            
          } else if(doOpenAddressManager) {
            userbaseInfoDisplay = <AddressManager
                handleShowStoredAddressManager={this.handleShowStoredAddressManager}/>
            displayHeight = '14rem'
            headerTitle = '배송지 관리'
          } else {
            userbaseInfoDisplay = 
              <CompleteUserBaseInfo 
                userBaseInfo={this.props.customerBaseInfo}
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
            <Card border="dark" style={{ width: '80%', height:'14rem', marginTop:'1rem' }}>
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
                <td width='250px' align='right'>gkoo-{this.props.userBaseInfo.customerId}</td>
                <td width='300px'>보유예치금</td>
                <td width='250px' align='right'>{this.props.userBaseInfo.insuranceAmount}원</td>
              </tr>
              <tr>
                <td>보유적립금</td>
                <td align='right'>{this.props.userBaseInfo.depositeAmount}원</td>
                <td >보유포인트</td>
                <td align='right'>{this.props.userBaseInfo.pointAmount}p</td>
              </tr>
              <tr>
                <td>성함</td>
                <td align='right'>조상훈</td>    
                <td>연락처</td>
                <td align='right'>010 - 7173- 1193</td>    
              </tr>
              <tr>
                <td>주소</td>
                <td colSpan="3" align='right'>대구광역시..</td>    
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
      }

    handleMoveToBaseInfo(update){
        window.scrollTo(0, 0);
        this.props.handleShowStoredUserBaseInfo()
    }

    doEditUserBaseInfo(){
      this.setState({showUserBaseInfoEditButton:false}) 
    }

    handleSave(){
      
    }

    render() {
      let userBaseInfoDisplayer
      if(this.state.showUserBaseInfoDisplayer) {
        userBaseInfoDisplayer = <UserBaseInfoDisplayer
          handleMoveToBaseInfo={this.props.handleMoveToBaseInfo}/>
      }
      return (
          <div>
             {userBaseInfoDisplayer}
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

export class UserBaseInfoDisplayer extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
        <Card border="dark" style={{ width: '80%', height:'40rem', marginTop:'1rem' }}>
            <Card.Header>개인정보
              {/* 개인정보수정버튼 */}
              <Button variant="secondary" size="sm" onClick={(e) => this.props.handleMoveToBaseInfo()} 
                style={{ marginRight: '10px', float:"right"}}>OK</Button>
              
              <Button variant="secondary" size="sm" 
                //onClick={(e) => this.doEditUserBaseInfo(e)} 
                style={{ marginRight: '10px', float:"right"}}>개인정보 수정</Button>
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
                  <FormControl id="basic-url" aria-describedby="basic-addon3"
                    //onChange = { this.changeHandlerNameKor }
                    // readOnly={"readonly"}
                    //defaultValue={this.props.recipientInfo.nameKor}
                    style={{backgroundColor: '#FFFFFF'}}
                  />
                  </InputGroup >
                  <InputGroup size="sm" className="mb-4" style={{ width: '70%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        이름(영문)
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      style={{ width: '50px'}}
                      //defaultValue={this.props.recipientInfo.nameEng}
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
                      style={{ width: '50px'}}
                      //defaultValue={this.props.recipientInfo.nameEng}
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
                      style={{ width: '50px'}}
                      //defaultValue={this.props.recipientInfo.nameEng}
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
                          style={{ width: '50px', marginRight:'1px'}}
                          //onChange={this.changeHandlerPhonePrefic}
                          //defaultValue={this.props.recipientInfo.phonePrefic}
                        />
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          style={{ width: '50px', marginRight:'1px'}}
                          //onChange={this.changeHandlerPhoneInterfix}
                          //defaultValue={this.props.recipientInfo.phoneInterfix}
                        />
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          style={{ width: '50px'}}
                          //onChange={this.changeHandlerPhoneSuffix}
                          //defaultValue={this.props.recipientInfo.phoneSuffix}
                        />
                  </InputGroup>
                  <InputGroup size='sm' className="mb-3" style={{ width: '50%'}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                            우편번호
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                          style={{ marginRight:'10px'}}
                          //defaultValue={this.props.recipientInfo.zipCode}
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
                          //defaultValue={this.props.recipientInfo.address}
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
                            //defaultValue={this.props.recipientInfo.addressDetails}
                            //onChange={this.changeHandlerAddressDetails}
                          />
                  </InputGroup >
                </Card.Body> 
              </Card> 
            </InputGroup>

            {/* <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
                  <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                      onClick={this.handleSave}
                  >완료
                  </Button>
                  <Button size="sm" variant='secondary' 
                      onClick={(e) => this.handleCancel(e)}
                  >취소</Button>
            </InputGroup > */}
            
            </Card.Body>
          </Card>
        </div>
      );
    }    
}