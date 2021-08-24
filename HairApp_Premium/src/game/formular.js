import {GameValue} from '../config/game';
import {Globals} from '../config/globals';


//Market Value
export function marketValue(basePropPrice, marketCycle)
{
    return basePropPrice + (basePropPrice * 0.1) * marketCycle;
}

export function stockTotalMarketValue(baseStPrice,marketCycle,qty)
{
    return marketValue(baseStPrice,marketCycle) * qty;
}


//Profit Loss
export function profitLoss(mkValue,purchaseValue)
{
    return mkValue - purchaseValue;
}

export function stockProfitLoss(basePrice,marketCycle,qty,purchasePrice)
{
    return (marketValue(basePrice,marketCycle) * qty - (purchasePrice * qty));
}


//Total Assets Market Value
export function reTotalAssetMarketValue()
{
    let result = 0;
    for (i = 0;i < GameValue.re_assets.length;i++)
    {
        result = result + marketValue(GameValue.re_assets[i].base_price,GameValue.re_assets[i].mk_cycle)
    }
    return result;
}

export function bsTotalAssetMarketValue()
{
    let result = 0;
    for (i = 0;i < GameValue.bs_assets.length;i++)
    {
        result = result + marketValue(GameValue.bs_assets[i].base_price,GameValue.bs_assets[i].mk_cycle)
    }
    return result;
}

export function stTotalAssetMarketValue()
{
    let result = 0;
    for (i = 0;i < GameValue.st_assets.length;i++)
    {
        result = result + stockTotalMarketValue(GameValue.st_assets[i].base_price,GameValue.st_assets[i].mk_cycle,GameValue.st_assets[i].qty);
    }
    return result;
}

export function stDividendYieldPerMonth(base_price,mk_cycle,qty,yd)
{
    return (stockTotalMarketValue(base_price,mk_cycle,qty) * (yd + GameValue.st_bonus) / 100) / 12;
}
//Expense

export function loanPayment()
{
    return (GameValue.c_loan * 0.1) / 12;
}


export function rePropertyManagement()
{
    return reTotalAssetMarketValue() * 0.033 / 12;
}


export function reStrataInsurance()
{
    return reTotalAssetMarketValue() * 0.039 / 12;
}

export function reExpense()
{
    return (rePropertyManagement() + reStrataInsurance())
}

export function bsRent()
{
    return bsTotalAssetMarketValue() * 0.12 / 12;
}
export function bsEmpWage()
{
    return bsTotalAssetMarketValue() * 0.4 / 12;
}

export function bsInsurance()
{
    return bsTotalAssetMarketValue() * 0.001 / 12;
}

export function bsUtility()
{
    return bsTotalAssetMarketValue() * 0.015 / 12;
}

export function bsExpense()
{
    return (bsRent() + bsEmpWage() + bsInsurance() + bsUtility());
}


export function totalExpenses()
{
    return (loanPayment() + reExpense() + bsExpense());
}



//Income

export function reAssetMonthlyNetIncome(rsMkValue,capRate)
{
    return rsMkValue * (capRate + GameValue.re_bonus) / 100 / 12; 
}


export function bsAssetMonthlyNetIncome(rsMkValue,capRate)
{
    return rsMkValue * (capRate + GameValue.bs_bonus) / 100 / 12; 
}


export function reIncome()
{
    let result = 0;
    for (i = 0;i < GameValue.re_assets.length;i++)
    {
        result = result + reAssetMonthlyNetIncome(marketValue(GameValue.re_assets[i].base_price,GameValue.re_assets[i].mk_cycle),GameValue.re_assets[i].cap);
    }
    return result + reExpense();
}


export function bsIncome()
{
    let result = 0;
    for (i = 0;i < GameValue.bs_assets.length;i++)
    {
        result = result + bsAssetMonthlyNetIncome(marketValue(GameValue.bs_assets[i].base_price,GameValue.bs_assets[i].mk_cycle),GameValue.bs_assets[i].cap);
    }
    return result + bsExpense();
}


export function stDividends()
{
    let result = 0;
    for (i = 0;i < GameValue.st_assets.length;i++)
    {
        result = result + stDividendYieldPerMonth(GameValue.st_assets[i].base_price,GameValue.st_assets[i].mk_cycle,GameValue.st_assets[i].qty,GameValue.st_assets[i].yield);
    }
    return result;
}

export function totalPassiveIncome()
{
    return reIncome() + bsIncome() + stDividends();
}

export function totalIncome()
{
    return GameValue.salary + totalPassiveIncome();
}






export function totalAvailableLoan()
{
    return (reTotalAssetMarketValue() + bsTotalAssetMarketValue()) * 0.8 - GameValue.c_loan;
}
export function totalAssetsMarketValue()
{
    return (reTotalAssetMarketValue() + bsTotalAssetMarketValue() + stTotalAssetMarketValue());
}

export function totalLiability()
{
    return GameValue.c_loan;
}

export function totalNetAssetValue()
{
    return totalAssetsMarketValue() - totalLiability();
}

export function netWorth()
{
    return GameValue.cashhand + totalNetAssetValue();
}

export function monthlyNetIncome()
{
    return (totalIncome() - totalExpenses());
}


export function tax()
{
    var taxOwing = (netWorth() - GameValue.prevNetWorth) * ((GameValue.b_taxrate - GameValue.tax_rate_reduction) / 100);
    GameValue.prevNetWorth = netWorth() - taxOwing;
    return taxOwing;
}







