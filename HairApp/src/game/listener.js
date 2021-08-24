import {Globals} from '../config/globals';
export function createGameListener(socket,callback)
{
    socket.on('joingame', () => { 
        callback(0);
        console.log('connected to socket server'); 
    });  

    socket.on('outjoin', () => { 
        callback(1);
        console.log('Player disconnect'); 
    });

    socket.on('start_game', () => { 
        console.log('Start game')
        callback(2);
    });

}

export function joinGameListener(socket,callback)
{
    socket.on('bankerout', () => { 
        callback(0);
    });  

    socket.on('start_game', () => { 
        callback(1);
        console.log('Start game')
    });

}

export function mainGameListener(socket,callback)
{
    socket.on('circle_update', (params) => {
        callback(0,JSON.parse(params))
    });  

    socket.on('change_turn', (params) => {
        callback(1,JSON.parse(params))
    });  

    socket.on('sync_info', (params) => {
        callback(2,JSON.parse(params))
    });  
    socket.on('transfer_money', (params) => {
        callback(3,JSON.parse(params))
    });  

    socket.on('trade_player', (params) => {
        callback(4,JSON.parse(params))
    });  

    socket.on('trade_done', (params) => {
        callback(5,JSON.parse(params))
    });  

}










