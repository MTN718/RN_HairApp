import {GameValue} from '../config/game';
import {Globals} from '../config/globals';
import {netWorth} from './formular';

export function broadcastCircleInfo()
{
    Globals.socketInst.emit('circle_update',{
        roomId:Globals.roomNo,
        re:GameValue.re_circle,
        bs:GameValue.bs_circle,
        st:GameValue.st_circle
    });
}


export function changeTurn()
{
    Globals.socketInst.emit('change_turn',{
        roomId:Globals.roomNo,
        playerId:Globals.userNo
    });
}


export function syncPlayerInfo()
{
    Globals.socketInst.emit('sync_info',{
        roomId:Globals.roomNo,
        playerId:Globals.userNo,
        isBanker:Globals.isBanker,
        playerName:Globals.userName,
        netWorth:netWorth()
    });
}

export function transferMoney(info)
{
    Globals.socketInst.emit('transfer_money',{
        roomId:Globals.roomNo,
        fromName:Globals.userName,
        playerId:info.playerId,
        amount:info.amount
    });
}

export function tradePlayer(info)
{
    Globals.socketInst.emit('trade_player',{
        roomId:Globals.roomNo,
        fromName:Globals.userName,
        playerId:info.playerId,
        amount:info.amount,
        info:info.info,
        fromId:Globals.userNo
    });
}

export function tradeDone(info)
{
    Globals.socketInst.emit('trade_done',{
        roomId:Globals.roomNo,
        fromName:Globals.userName,
        fromId:Globals.userNo,
        playerId:info.playerId,
        loan:info.loan,
        cash:info.cash,
        asset:info.asset,
        type:info.type
    });
}










