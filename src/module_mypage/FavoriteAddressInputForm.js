import styled from "styled-components";
import React from 'react';
import { Card, Button, InputGroup, FormControl } from "react-bootstrap"
import { keycloakConfigLocal, basePort, headers, setTokenHeader } from "./AuthService"

export class FavoriteAddressInputForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          nameKor:this.props.favoriteAddressData.nameKor,
          nameEng:this.props.favoriteAddressData.nameEng,
          transitNr:this.props.favoriteAddressData.transitNr,
          phonenumberFirst:this.props.favoriteAddressData.phonenumberFirst,
          phonenumberSecond:this.props.favoriteAddressData.phonenumberSecond,
          zipCode:this.props.favoriteAddressData.zipCode,
          address:this.props.favoriteAddressData.address,
          id:this.props.favoriteAddressData.id,
        };
        this.changeHandlerNameKor = this.changeHandlerNameKor.bind(this)
        this.changeHandlerNameEng = this.changeHandlerNameEng.bind(this)
        this.changeHandlerTransitNr = this.changeHandlerTransitNr.bind(this)
        this.changeHandlerPhonenumberFirst = this.changeHandlerPhonenumberFirst.bind(this)
        this.changeHandlerPhonenumberSecond = this.changeHandlerPhonenumberSecond.bind(this)
        this.changeHandlerZipCode = this.changeHandlerZipCode.bind(this)
        this.changeHandlerAddress = this.changeHandlerAddress.bind(this)
      }

      componentDidMount() {
        
      }

      changeHandlerNameKor(event){
        this.setState({nameKor:event.target.value})
        console.log(this.state.nameKor)
      }

      changeHandlerNameEng(event){
        this.setState({nameEng:event.target.value})
        console.log(this.state.nameEng)
      }

      changeHandlerTransitNr(event){
        this.setState({transitNr:event.target.value})
        console.log(this.state.transitNr)
      }

      changeHandlerPhonenumberFirst(event){
        this.setState({phonenumberFirst:event.target.value})
      }

      changeHandlerPhonenumberSecond(event){
        this.setState({phonenumberSecond:event.target.value})
      }

      changeHandlerZipCode(event){
        this.setState({zipCode:event.target.value})
      }

      changeHandlerAddress(event){
        this.setState({address:event.target.value})
      }

      handleCancel(){
        //window.scrollTo(0, 0);
        this.props.handleCancel()
      }

      handleRefresch(){
        window.location.reload();
      }
  
      handleSave(){
        var favoriteAddressObject = {
          nameKor:this.state.nameKor,
          nameEng:this.state.nameEng,
          transitNr:this.state.transitNr,
          phonenumberFirst:this.state.phonenumberFirst,
          phonenumberSecond:this.state.phonenumberSecond,
          zipCode:this.state.zipCode,
          address:this.state.address,
          id:this.state.id
        }
        
        const favoriteAddressData =  [
          {favoriteAddressData: JSON.stringify(favoriteAddressObject)}
        ]
        
        let saveType = this.props.saveType
        if(saveType == "CREATE"){
          this.handleCreate(this.props.accessToken, favoriteAddressData)
        } else if(saveType == "UPDATE"){
          this.handleUpdate(this.props.accessToken, favoriteAddressData)
        }
      }

      handleCreate(accessToken, favoriteAddressData){
        setTokenHeader(accessToken)
        fetch(basePort + '/createFavoriteAddress', 
                {method:'post', headers, 
                  body:JSON.stringify(favoriteAddressData)})
        this.handleCancel()
        this.handleRefresch()
      }

      handleUpdate(accessToken, favoriteAddressData){
        setTokenHeader(accessToken)
        fetch(basePort + '/updateFavoriteAddress', 
                {method:'post', headers, 
                  body:JSON.stringify(favoriteAddressData)})
        this.handleCancel()
        this.handleRefresch()
      }
      
      render() {
        let title
        if(this.props.saveType == "CREATE"){
          title = "새로운 배송지"
        } else if(this.props.saveType == "UPDATE"){
          title = "배송지 수정"
        }
        return (
          <div>
          <Card border="dark" style={{ width: '80%', marginBottom:'10px'}}>
          <Card.Header>{title}</Card.Header>
            <Card.Body >
              <InputGroup size="sm" className="mb-4" style={{ width:'80%'}}>
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  이름(국문)
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  onChange = { this.changeHandlerNameKor }
                  defaultValue={this.props.favoriteAddressData.nameKor}
                  style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  이름(영문)
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  onChange = { this.changeHandlerNameEng }
                  defaultValue={this.props.favoriteAddressData.nameEng}
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
                  onChange = { this.changeHandlerTransitNr }
                  defaultValue={this.props.favoriteAddressData.transitNr}
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
                  onChange = { this.changeHandlerPhonenumberFirst }
                  defaultValue={this.props.favoriteAddressData.phonenumberFirst}
                  style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                />
                <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" >
                  연락처2
                </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                  onChange = { this.changeHandlerPhonenumberSecond }
                  defaultValue={this.props.favoriteAddressData.phonenumberSecond}
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
                  onChange = { this.changeHandlerZipCode }
                  defaultValue={this.props.favoriteAddressData.zipCode}
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
                  onChange={this.changeHandlerAddress}
                  defaultValue={this.props.favoriteAddressData.address}
                  style={{backgroundColor: '#FFFFFF'}}
                />
              </InputGroup >
              <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
                <Button size="sm" variant='secondary' 
                  style={{ marginRight:'10px'}}
                  onClick={(e) => this.handleSave(e)}
                  >저장
                </Button>
                <Button size="sm" variant='secondary' 
                  onClick={(e) => this.handleCancel(e)}
                  >취소
                </Button>
              </InputGroup >
            </Card.Body>
          </Card>
          </div>
        );
      }    
}