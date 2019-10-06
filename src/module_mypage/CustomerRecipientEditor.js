import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { Card, Button, InputGroup, FormControl, Form, Badge } from "react-bootstrap"
import { Icon as BaseIcon } from "react-icons-kit";
import { check, minus, circle } from 'react-icons-kit/fa/'
import { InfoBadge } from "../module_base_component/InfoBadge";
import { headers, basePort } from "../module_mypage/AuthService"

/*
 *
 */
const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const textFontSize = '14px';
const Icon = props => <BaseIcon size={16} icon={props.icon} />;  

export class CustomerRecipientEditor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            orderNumber:this.props.orderNumber,
            recipient:this.props.recipientInfo,
            edited:false,     
            nameKor:this.props.recipientInfo.nameKor,
            nameEng:this.props.recipientInfo.nameEng,
            transitNr:this.props.recipientInfo.transitNr,
            phonePrefic:this.props.recipientInfo.phonePrefic,
            phoneInterfix:this.props.recipientInfo.phoneInterfix,
            phoneSuffix:this.props.recipientInfo.phoneSuffix,
            zipCode:this.props.recipientInfo.zipCode,
            address:this.props.recipientInfo.address,
            addressDetails:this.props.recipientInfo.addressDetails,
            usercomment:this.props.recipientInfo.usercomment,
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.changeHandlerNameKor = this.changeHandlerNameKor.bind(this)
        this.changeHandlerNameEng = this.changeHandlerNameEng.bind(this)
        this.changeHandlerTransitNr = this.changeHandlerTransitNr.bind(this)
        this.changeHandlerPhonePrefic = this.changeHandlerPhonePrefic.bind(this)
        this.changeHandlerPhoneInterfix = this.changeHandlerPhoneInterfix.bind(this)
        this.changeHandlerPhoneSuffix = this.changeHandlerPhoneSuffix.bind(this)
        this.changeHandlerZipCode = this.changeHandlerZipCode.bind(this)
        this.changeHandlerAddress = this.changeHandlerAddress.bind(this)
        this.changeHandlerAddressDetails = this.changeHandlerAddressDetails.bind(this)
        this.changeHandlerUsercomment = this.changeHandlerUsercomment.bind(this)
    }


       /*
        * state 비교 하는 방법
        */
    //   shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.value != nextState.value;
    //   }

      handleCancel(update){
          window.scrollTo(0, 340);
          this.props.showStoredRecipient()
      }

      handleSave(){
        //comparing the state?
        if(this.state.edited){
            this.updateRecipient(this.props.accessToken)
        }
        window.scrollTo(0, 340);
        window.location.reload();
        this.props.showStoredRecipient()
      }

      changeHandlerNameKor(event){
        const nameKorRef = this.props.recipientInfo.nameKor
        this.changeHandlerCommonState(nameKorRef, event)
        this.setState({nameKor:event.target.value}) 
      }

      changeHandlerNameEng(event){
        const nameEngRef = this.props.recipientInfo.nameEng
        this.changeHandlerCommonState(nameEngRef, event)
        this.setState({nameEng:event.target.value}) 
      }

      changeHandlerTransitNr(event){
        const transitNrRef = this.props.recipientInfo.transitNr
        this.changeHandlerCommonState(transitNrRef, event)
        this.setState({transitNr:event.target.value}) 
      }

      changeHandlerPhonePrefic(event){
        const phonePreficRef = this.props.recipientInfo.phonePrefic
        this.changeHandlerCommonState(phonePreficRef, event)
        this.setState({phonePrefic:event.target.value}) 
      }

      changeHandlerPhoneInterfix(event){
        const phoneInterfixRef = this.props.recipientInfo.phoneInterfix
        this.changeHandlerCommonState(phoneInterfixRef, event)
        this.setState({phoneInterfix:event.target.value}) 
      }

      changeHandlerPhoneSuffix(event){
        const phoneSuffixRef = this.props.recipientInfo.phoneSuffix
        this.changeHandlerCommonState(phoneSuffixRef, event)
        this.setState({phoneSuffix:event.target.value}) 
      }

      changeHandlerZipCode(event){
        const phoneZipCodeRef = this.props.recipientInfo.zipCode
        this.changeHandlerCommonState(phoneZipCodeRef, event)
        this.setState({zipCode:event.target.value}) 
      }

      changeHandlerAddress(event){
        const adressRef = this.props.recipientInfo.adress
        this.changeHandlerCommonState(adressRef, event)
        this.setState({adress:event.target.value}) 
      }

      changeHandlerAddressDetails(event){
        const adressDetailsRef = this.props.recipientInfo.adressDetails
        this.changeHandlerCommonState(adressDetailsRef, event)
        this.setState({adressDetails:event.target.value}) 
      }

      changeHandlerUsercomment(event){
        const usercommentRef = this.props.recipientInfo.usercomment
        this.changeHandlerCommonState(usercommentRef, event)
        this.setState({Usercomment:event.target.value}) 
      }

      changeHandlerCommonState(refState, event){
        if(refState != event.target.value){
            this.setState({edited:true})
        } else {
            this.setState({edited:false})
        }
      }

      updateRecipient(accessToken){

        const editedRecipientData =  [
            {orderNumber: this.state.orderNumber},
            {nameKor: this.state.nameKor}, 
            {nameEng: this.state.nameEng},
            {transitNr: this.state.transitNr},
            {phonePrefic: this.state.phonePrefic},
            {phoneInterfix: this.state.phoneInterfix},
            {phoneSuffix: this.state.phoneSuffix},
            {zipCode: this.state.zipCode},
            {address: this.state.address},
            {addressDetails: this.state.addressDetails},
            {usercomment: this.state.usercomment}
        ]

        this.setTokenHeader(accessToken)
        console.log(editedRecipientData)
        fetch(basePort + '/updaterecipientdata', 
                  {method:'post', headers, 
                    body:JSON.stringify(editedRecipientData)})
      }
      
      setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
      }

      render() {
        
        return (
        <div>
            <Card border="dark" style={{ width:'100%', height:'61rem', marginTop:'1rem', marginBottom:'5px' }}>
                <Card.Header>
                    받는분 정보
                </Card.Header>
                    <Card.Body >
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    받는분
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                                <Card.Body>
                                    <InputGroup size="sm" className="mb-4" style={{ width:'70%'}}>
                                        <InputGroup.Prepend >
                                            <InputGroup.Text id="basic-addon3" >
                                                이름(국문)
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    
                                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                                            onChange = { this.changeHandlerNameKor }
                                            // readOnly={"readonly"}
                                            defaultValue={this.props.recipientInfo.nameKor}
                                            style={{backgroundColor: '#FFFFFF'}}
                                        />
                                    </InputGroup >
                                    
                                    {/*
                                    추후 개발                                     
                                    <InputGroup className="mb-4" style={{ width:'80%'}}>
                                        <Form.Check type='checkbox'
                                            onChange={e => this.setOwnerContentCheckbox(e)} label='회원정보와 동일'
                                            checked={this.state.setOwnerContent}
                                            style={{marginLeft:'5px', marginTop:'5px', marginRight:'20px'}}
                                        />
                                        <Button size='sm' variant="secondary">받는분 정보 불러오기</Button>
                                    </InputGroup> 
                                    */}
                                
                                    <InputGroup size="sm" className="mb-4" style={{ width: '70%'}}>
                                        <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon3">
                                                    이름(영문)
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl id="basic-url" aria-describedby="basic-addon3"
                                                style={{ width: '50px'}}
                                                defaultValue={this.props.recipientInfo.nameEng}
                                                onChange = { this.changeHandlerNameEng }
                                                />
                                    </InputGroup>
                                   
                                    <InfoBadge infoText={"상품을 수취하실 분의 성함/사업자 상호를 적어주세요."} />
                                    <InfoBadge infoText={"통관시 받는분을 기준으로 수입신고 합니다."}/>
                                    <InfoBadge infoText={"상품을 수취하실 분의 성함/사업자 상호를 적어주세요."}/>

                                </Card.Body> 
                            </Card> 
                        </InputGroup>
                   
                        <InputGroup className="mb-3" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    받는분<br/>정보
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                                <Form.Check inline 
                                    //checked={this.state.privateTransit} 
                                    type='radio' 
                                    checked={true}
                                    //onChange={e => this.inputPrivateTransit(e)} 
                                    label='개인통관고유번호' style={{marginRight:'10rem', fontSize:textFontSize}}/>
                                <Form.Check inline 
                                    //checked={this.state.businessTransit} 
                                    type='radio' 
                                    checked={false}
                                    //onChange={e => this.inputBusinessTransit(e)} 
                                    label='사업자번호(사업자통관)' style={{ fontSize: textFontSize}}/>
                                        
                                <InputGroup size="sm" className="mb-3" style={{ width: '80%', marginTop:'10px'}}>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                            placeholder="8자리 고유번호"
                                            defaultValue={this.props.recipientInfo.transitNr}
                                            onChange = { this.changeHandlerTransitNr }
                                            style={{ marginRight:'10px'}}/>
                                        <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}>발급방법</Button>
                                        <Button size="sm" variant='secondary'>내 개인통관고유번호 저장</Button>
                                    </InputGroup >
                                    <Form.Check type='checkbox' 
                                        //onChange={e => this.agreeWithCollectionCheckbox(e)} 
                                        label='수입통관신고를 위한 개인통관고유번호 수집에 동의합니다'
                                        //checked={this.state.agreeWithCollection}
                                        style={{fontSize: textFontSize}}
                                    />
                                    <InfoBadge infoText={"목록통관 대상품목도 개인통관고유번호 제출이 필수입니다."}/>
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
                                                onChange={this.changeHandlerPhonePrefic}
                                                defaultValue={this.props.recipientInfo.phonePrefic}
                                                />
                                            
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                                style={{ width: '50px', marginRight:'1px'}}
                                                onChange={this.changeHandlerPhoneInterfix}
                                                defaultValue={this.props.recipientInfo.phoneInterfix}
                                                />
                                       
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                                style={{ width: '50px'}}
                                                onChange={this.changeHandlerPhoneSuffix}
                                                defaultValue={this.props.recipientInfo.phoneSuffix}
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
                                        defaultValue={this.props.recipientInfo.zipCode}
                                        onChange={this.changeHandlerZipCode}
                                        />
                                    <Button size='sm' variant='secondary' >우편번호 찾기</Button>
                                </InputGroup >

                                <InputGroup size='sm' className="mb-3" style={{ width: '90%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                                            주소
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        defaultValue={this.props.recipientInfo.address}
                                        onChange={this.changeHandlerAddress} 
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
                                        defaultValue={this.props.recipientInfo.addressDetails}
                                        onChange={this.changeHandlerAddressDetails}
                                        />
                                </InputGroup >
                            </Card.Body> 
                            </Card> 
                        </InputGroup> 

                        {/* 
                        react table 비교후 결정
                        <RecipientController/> */}

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    배송<br/>메세지
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%', height: '8em'}}>
                            <Card.Body>
                                <Form.Control id="basic-url" as="textarea" rows="3" 
                                            aria-describedby="basic-addon3"
                                            defaultValue={this.props.recipientInfo.usercomment}
                                            onChange={this.changeHandlerUsercomment}
                                            style={{ height:'5em', fontSize:textFontSize}}/>
                            </Card.Body> 
                            </Card> 
                        </InputGroup>
                        
                </Card.Body>

                 {/* 수정 OK 버튼 */}
                 <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
                            <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                                    onClick={this.handleSave}
                                    >완료
                            </Button>
                            <Button size="sm" variant='secondary'
                                onClick={(e) => this.handleCancel(e)}
                            >취소</Button>
                </InputGroup >
                
            </Card>
        </div>
        );
      } 
}