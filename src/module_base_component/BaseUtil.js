import React, { Component } from 'react';
import { InfoBadge } from "../module_base_component/InfoBadge";
import { Breadcrumb, Card, Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';

const EMPTY_STRING = ''

export function getKoreanCurrency(rate){
    if(rate > 0){
        return <div>{rate}원</div>
    } else {
        return EMPTY_STRING
    }
}

export function getEuroCurrency(rate){
    if(rate > 0){
        return <div>{rate} EUR</div>
    } else {
        return EMPTY_STRING
    }
}

export function getFormatKoreanCurrency(rate){
    if(rate > 0){
        return <div>{rate}원</div>
    } else if (rate == 0) {
        return <div>0원</div>
    } else {
        return EMPTY_STRING
    }
}

export function getFormattedDeliveryPrice(rate){
    if(rate > 0){
        return <div>{rate}원</div>
    } else if (rate == 0) {
        return <div>미정</div>
    } else {
        return EMPTY_STRING
    }
}

export function getKoreanCurrencyWithInfoBadge(rate){
    if(rate > 0){
        return <div>
             <Container>
                <Row>
                    {rate}원
                </Row>
                <Row style={{ marginTop: '10px'}}>
                    <InfoBadge infoText={"국제배송비는 견적에 포함되어 있지 않습니다."} />
                    <InfoBadge infoText={"국제배송비는 상품이 도착후에 다시 결제해주셔야 합니다."} />
                </Row>
             </Container>
        </div>
    } else {
        return EMPTY_STRING
    }
}

export function getFormattedWeight(weight){
    if(weight > 0){
        return weight+"kg"
    } else {
        return EMPTY_STRING
    }
}

export function getFormattedPoint(point){
    if(point>0){
        return point+"p"
    } else if (point == 0) {
        return   <div>0p</div>
    } else {
        return EMPTY_STRING
    }
}

export function window_reload(){
    window.location.reload();
}

//url replace and browser shows new page
export function window_location_replace(url){
    window.location.replace(url)
}

//new browser opened with new url
export function window_location_open(url){
    window.open(url)
}

export function window_scrollTo(x_corordinate, y_corordinate){
    window.scrollTo(x_corordinate, y_corordinate);
}

//not export time 2000 = 2 second
function setTimer(method, time){
    setTimeout(() => {
        method()
    }, time);
}

//change komma to punct
export function priceFormatter(price){
    return price.replace(/,/g, '.')
}

//return the limited length of itemname
export function itemnameFormatter(itemname){
    return trimmedStringFormatter(itemname, 35)
}

//return the limited length of input string
function trimmedStringFormatter(orgString, length){
    var stringLength = orgString.length
    var formattedString
    if (stringLength > 35){
        formattedString = orgString.substring(0, length) + '...'
    } else {
        formattedString = orgString
    }
    return formattedString
}
