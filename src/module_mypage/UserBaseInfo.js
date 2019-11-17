import styled from "styled-components";
import React from 'react';
import { Table, Button, Card, InputGroup, FormControl } from "react-bootstrap"

export class UserBaseInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // customerBaseInfo:'',
            // value: '',
            doEdit:false,
            setButton:true,
            addressManager:false,
        };
        this.handleShowStoredUserBaseInfo = this.handleShowStoredUserBaseInfo.bind(this)
        this.handleShowStoredAddressManager = this.handleShowStoredAddressManager.bind(this)
      }

      doEditUserBaseInfo(){
        this.setState({doEdit:true}) 
        this.setState({setButton:false}) 
      }

      handleShowStoredUserBaseInfo(){
        this.setState({doEdit:false}) 
        this.setState({setButton:true}) 
      }

      doOpenAddressManager(){
        this.setState({addressManager:true})
        this.setState({setButton:false}) 
      }

      handleShowStoredAddressManager(){
        this.setState({addressManager:false}) 
        this.setState({setButton:true}) 
      }
    
      
      render() {
        const setButton = this.state.setButton
        let editButton;
        let addressManagerButton;
        if(setButton) {
          editButton = <Button variant="secondary" size="sm" onClick={(e) => this.doEditUserBaseInfo(e)} 
            style={{ marginRight: '10px', float:"right"}}>개인정보수정</Button>

          addressManagerButton =  <Button variant="secondary" size="sm" onClick={(e) => this.doOpenAddressManager(e)} 
                style={{ marginRight: '10px', float:"right"}}>배송지관리</Button>
        }
    
        const doEdit = this.state.doEdit
        const addressManager = this.state.addressManager
        let displayHeight;
        let userbaseInfoDisplay;
        let headerTitle
        if (doEdit) {
            userbaseInfoDisplay = 
              <UserBaseInfoEditor 
                handleShowStoredUserBaseInfo={this.handleShowStoredUserBaseInfo}
                // recipientInfo={this.props.recipientInfo}
                // orderNumber={this.props.orderNumber}
                // accessToken={this.props.accessToken}
               />
            displayHeight = '40rem'
            headerTitle = '개인정보'
          } else if(addressManager) {
            userbaseInfoDisplay = <AddressManager
                handleShowStoredAddressManager={this.handleShowStoredAddressManager}/>
            displayHeight = '14rem'
            headerTitle = '배송지 관리'
          } else {
            userbaseInfoDisplay = <CompleteUserBaseInfo userBaseInfo={this.props.customerBaseInfo}/>
            displayHeight = '14rem'
            headerTitle = '기본정보'
          }
        return (
            <Card border="dark" style={{ width: '80%', height:displayHeight, marginTop:'1rem' }}>
            <Card.Header>{headerTitle}
                 {/* 배송지관리버튼 */}
                {addressManagerButton}
                
                {/* 개인정보수정버튼 */}
                {editButton}
            </Card.Header>
            <Card.Body >
              
              {userbaseInfoDisplay}
           
            </Card.Body>
          </Card> 
        );
      }    
}

export class CompleteUserBaseInfo extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
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
          </div>
        );
      }    
}

export class UserBaseInfoEditor extends React.Component{
    constructor(props) {
        super(props);
      }

      handleCancel(update){
        window.scrollTo(0, 0);
        this.props.handleShowStoredUserBaseInfo()
    }

    handleSave(){
      
    }
      
      render() {
        return (
          <div>
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