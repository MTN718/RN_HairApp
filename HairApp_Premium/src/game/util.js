export function priceFormat(value)
{
    return (Math.trunc(value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
}