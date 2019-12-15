import styled from "styled-components";
import React from 'react';
import { Card, Button, InputGroup, FormControl } from "react-bootstrap"

export class FavoriteAddressInputForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          nameKor:null,
        };
        this.changeHandlerNameKor = this.changeHandlerNameKor.bind(this)
      }

      changeHandlerNameKor(event){
        this.setState({nameKor:event.target.value})
        console.log(this.state.nameKor)
       
        
        //this.props.userBaseInfo.lastName = event.target.value
      }

      handleCancel(){
        //window.scrollTo(0, 0);
        //this.props.handleCancel()
      }
  
      handleSave(){
        let saveType = this.props.saveType
        if(saveType == "CREATE"){
          this.handleCreate()
        } else if(saveType == "UPDATE"){
          this.handleUpdate()
        }
        //this.updateUserBaseInfo(this.props.accessToken)
        //this.props.doShowUserBaseInfo()
      }

      handleCreate(){
        //this.updateUserBaseInfo(this.props.accessToken)
        //this.props.doShowUserBaseInfo()
      }

      handleUpdate(){
        //this.updateUserBaseInfo(this.props.accessToken)
        //this.props.doShowUserBaseInfo()
      }
      
      render() {
        return (
          <div>
          <Card border="dark" style={{ width: '80%'}}>
          <Card.Header>새로운 배송지</Card.Header>
            <Card.Body >
              <InputGroup size="sm" className="mb-4" style={{ width:'80%'}}>
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  이름(국문)
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  onChange = { this.changeHandlerNameKor }
                  //defaultValue={this.props.userBaseInfo}
                style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  이름(영문)
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  //onChange = { this.changeHandlerNameKor }
                  //defaultValue={this.props.userBaseInfo}
                style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
              </InputGroup >
              <InputGroup size="sm" className="mb-4" style={{ width:'80%'}}>
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  개인통관고유번호
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  //onChange = { this.changeHandlerNameKor }
                  //defaultValue={this.props.userBaseInfo}
                style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
              </InputGroup >
              <InputGroup size="sm" className="mb-4" style={{ width:'80%'}}>
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  연락처1
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  //onChange = { this.changeHandlerNameKor }
                  //defaultValue={this.props.userBaseInfo}
                style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  연락처2
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  //onChange = { this.changeHandlerNameKor }
                  //defaultValue={this.props.userBaseInfo}
                style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
              </InputGroup >
              <InputGroup size="sm" className="mb-4" style={{ width:'80%'}}>
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  우편번호
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  //onChange = { this.changeHandlerNameKor }
                  //defaultValue={this.props.userBaseInfo}
                style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
              </InputGroup >
              <InputGroup size='sm' className="mb-3" style={{ width: '80%'}}>
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                              주소
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="basic-url" aria-describedby="basic-addon3"
                              as="textarea" rows="2"
                              //readOnly={this.props.readOnly}
                              //defaultValue={this.props.userBaseInfo.detailAddress}
                              style={{backgroundColor: '#FFFFFF'}}
                              //onChange={this.changeHandlerAddressDetails}
                            />
              </InputGroup >
              <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
                            <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                                onClick={(e) => this.handleSave(e)}
                            >저장
                            </Button>
                            <Button size="sm" variant='secondary' 
                                onClick={(e) => this.handleCancel(e)}
                            >취소</Button>
              </InputGroup >
            </Card.Body>
          </Card>
          </div>
        );
      }    
}