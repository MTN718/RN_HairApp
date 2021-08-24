import {Constants} from '../config/constants';
import {Globals} from '../config/globals';
import RNFetchBlob from 'rn-fetch-blob'

export function serviceGetQuestion(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getQuestion", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'number',data : params.number},
            { name:'language',data:params.language}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}


export function serviceUserDetail(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getUserInfoDetail", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'name',data : params.name},
            { name:'language',data:params.language}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}


export function serviceGetUserInfo(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getUserInfo", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'name',data : params.user},
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}

export function serviceGetProducts(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getProducts", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'tutorial',data : params.tutorial},
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}


export function serviceSubmitEmail(params)
{   
    console.log({ name:params.user})
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/submitEmail", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'name', data: params.user},
            { name:'password', data: params.password}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}
export function serviceGetContacts()
{
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getContacts", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'userNo', data: Globals.userNo}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
}

export function serviceSubmitProfile(params)
{   
    console.log({ name:params.user,data : JSON.stringify(params.options)})
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/submitProfile", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'name', data: params.user},
            { name:'data', data:JSON.stringify(params.options)},
            { name:'login_id', data:params.login_id}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}

export function serviceUpdateAnswer(params)
{   
    console.log(params)
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/updateUserQuestion", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'name', data: params.user},
            { name:'data', data:JSON.stringify(params.options)}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}



export function serviceGetTutorials(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getTutorials", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'name', data: params.user}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}

export function serviceGetTutorialDetail(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getTutorialDetail", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'no', data: params.no}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
    
}

export function serviceGetPremiumUnlock(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/getPremiumUnlock", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'user_id', data: params.user_id},
            { name:'tutorial_id', data: params.tutorial_id}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
}

export function serviceClickpremiumlink(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/clickPremiumUnlock", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'user_id', data: params.user_id},
            { name:'tutorial_id', data: params.tutorial_id}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
}

export function serviceDeleteProfile(params)
{   
    return new Promise(function(resolve, reject) {        
        RNFetchBlob.fetch('POST', Constants.ADDRESS + "/deleteUser", {
            'Content-Type' : 'multipart/form-data',
        },
        [
            { name:'user_id', data: params.user_id}
        ])
        .then((response) => {
            resolve(response.json());
        })
        .catch((errorMessage, statusCode) => {
            reject(errorMessage);
        })
    });    
}









