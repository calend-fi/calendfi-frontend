import { ethers } from 'ethers';
let parseUnits = ethers.utils.parseUnits;
let formatUnits = ethers.utils.formatUnits;

/**
 * 格式化数字
 */
function trimExtraChar(value, _char, regExp) {
    let index = value.indexOf(_char);
    if (index === -1) {
        return value;
    }
    if (_char === '-' && index !== 0) {
        return value.slice(0, index);
    }
    return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}
export function formatNumber(value, allowDot, allowMinus) {
    if (value === undefined) {
        value = '';
    }
    if (allowDot === void 0) {
        allowDot = false;
    }
    if (allowMinus === void 0) {
        allowMinus = false;
    }
    if (allowDot) {
        value = trimExtraChar(value, '.', /\./g);
    } else {
        value = value.split('.')[0];
    }
    if (allowMinus) {
        value = trimExtraChar(value, '-', /-/g);
    } else {
        value = value.replace(/-/, '');
    }
    let regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
    return value.replace(regExp, '');
}
export function onFormatInput(prop, flag) {
    let arr = prop.split('.');
    if (arr.length === 1) {
        this[arr[0]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
    if (arr.length === 2) {
        this[arr[0]][arr[1]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
    if (arr.length === 3) {
        this[arr[0]][arr[1]][arr[2]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
    if (arr.length === 4) {
        this[arr[0]][arr[1]][arr[2]][arr[3]] = formatNumber((new Function('t', `return t.${prop}`))(this), flag);
    }
}
export function onFormatBlur(prop) {
    let arr = prop.split('.');
    if (arr.length === 1) {
        this[arr[0]] = this[arr[0]] === '' ? '' : Number(this[arr[0]]);
    }
    if (arr.length === 2) {
        this[arr[0]][arr[1]] = this[arr[0]][arr[1]] === '' ? '' : Number(this[arr[0]][arr[1]]);
    }
    if (arr.length === 3) {
        this[arr[0]][arr[1]][arr[2]] = this[arr[0]][arr[1]][arr[2]] === '' ? '' : Number(this[arr[0]][arr[1]][arr[2]]);
    }
    if (arr.length === 4) {
        this[arr[0]][arr[1]][arr[2]][arr[3]] = this[arr[0]][arr[1]][arr[2]][arr[3]] === '' ? '' : Number(this[arr[0]][arr[1]][arr[2]][arr[3]]);
    }
}

export function onFormatTableInput(row, prop, allowDot) {
    row[prop] = formatNumber(row[prop], allowDot)

}
export function onFormatTableBlur(row, prop, allowDot) {
    row[prop] = (row[prop] === '' || row[prop] === null) ? '' : Number(formatNumber(row[prop], allowDot));

}

export function dateFormatter({ cellValue, }) {
    return cellValue ? String(cellValue).substr(0, 10) : '';
}
export function dateFormatter1({ cellValue, }) {
    return cellValue ? String(cellValue).substr(11, 5) : '';
}

function formatPadStartNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export function formatTime(date, isTimeStampStr = false) {
    if (isTimeStampStr) {
        date = Number(date);
    }
    date = new Date(date);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatPadStartNumber).join('-') + ' ' + [hour, minute, second].map(formatPadStartNumber).join(':')
}
/**
 * 返回用','分割的千分位字符串;
 */

export const toThousands = (num, toFixedNum = 2, separator = ",") => {
    // console.log({ toFixedNum });
    if (isNaN(num) || !num) {
        return num;
    }
    let str = exponentialToNumber(num, toFixedNum);
    let result = '';
    let intStr = str.split('.')[0];
    const floatStr = str.split('.')[1];
    const isNegative = Number(intStr) < 0; // 为负数;
    if (isNegative) {
        intStr = intStr.substr(1);
    }
    while (intStr.length > 3) {
        result = separator + intStr.slice(-3) + result;
        intStr = intStr.slice(0, intStr.length - 3);
    }
    result = isNegative ? '-' + intStr + result : intStr + result;
    return floatStr ? result + '.' + floatStr : result;
}

export const fixedFormatNum = (num, fixedLen = 6) => {
    try {
        if (num && num._isBigNumber) {
            num = formatUnits(num);
        }
    } catch (e) {
        console.error(e);
    }

    try {
        let _num = Number(num);
        if (isNaN(_num) || !_num || Math.abs(_num) == Infinity) {
            return 0;
        }
    } catch (e) {
        return 0;
    }


    num = exponentialToNumber(num, fixedLen);
    let numArr;
    try {
        let bigNum = parseUnits(num).toString();
        numArr = formatUnits(bigNum).split('.');
    } catch {
        numArr = num.split('.');
    }
    let num2 = numArr[1];
    if (fixedLen == 0 || !num2) {
        return numArr[0];
    }
    if (num2) {
        let numLen = String(num2).length;
        let strLen = num2.length;
        if (numLen == strLen) {
            num2 = num2.substr(0, fixedLen)
        } else {
            num2 = num2.substr(0, strLen - numLen + fixedLen);
        }
        return numArr[0] + '.' + num2;
    }
}

export const addressFilter = (val) => {
    if (!val) {
        return '';
    } else if (String(val).length <= 13) {
        return val;
    }
    return val.substr(0, 6) + '...' + val.substr(-4);
}


export const getDollar = (val, price) => {
    if (Number("0" + val) == 0 || Number("0" + price) == 0) {
        return 0;
    } else {
        try {
            return toThousands(formatUnits(parseUnits(String(val), 18).mul(parseUnits(String(price), 18)), 36), 2)
        } catch (e) {
            console.log(e);
            return 0;
        }

    }
}

export const exponentialToNumber = (exponentialNum, fixedLen = 18) => {
    try {
        let str = exponentialNum.toString();
        let index = str.indexOf('e');
        if (index == -1) {
            try {
                let arr = str.split('.');
                let len = arr[1].length;
                len = fixedLen > len ? len : fixedLen;
                return arr[0] + '.' + arr[1].substr(0, len);
            } catch {
                return str;
            }
        } else {
            let arr = str.split('e');
            let len1 = arr[0].split('.')[1] ? arr[0].split('.')[1].length : 0;
            let len2 = Math.abs(arr[1]);
            if (Number(arr[1]) < 0) {
                let totalLen = len1 + len2;
                if (totalLen > fixedLen) {
                    str = Number(str).toFixed(totalLen);
                    try {
                        let arr = str.split('.');
                        let len = arr[1].length;
                        len = fixedLen > len ? len : fixedLen;
                        return arr[0] + '.' + arr[1].substr(0, len);
                    } catch {
                        return str;
                    }
                } else {
                    return Number(str).toFixed(totalLen);
                }
            } else {
                let arrSplitDot = arr[0].split('.');
                if (arrSplitDot[1]) {
                    if (len2 > len1) {
                        return arrSplitDot[0] + arrSplitDot[1] + '0'.repeat(len2 - len1)
                    } else {
                        throw new Error('exponentialToNumber Error');
                    }
                } else {
                    return arrSplitDot[0] + '0'.repeat(len2);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}

export const exponentialToNumber1 = (exponentialNum, fixedLen = 18) => {
    try {
        let str = exponentialNum.toString();
        let index = str.indexOf('e');
        if (index == -1) {
            // 保留6位有效数字
            try {
                let arr = str.split('.');
                let arr1 = arr[1].split('');
                let arr2 = [];
                let arr3 = [];
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] == "0"&&arr1[i+1] == "0") {
                        arr2.push(arr1[i]);
                    } else {
                        break;
                    }
                }
                arr3 = arr1.slice(arr2.length);
                if (arr2.length == 0) {
                    if (arr[0].length >= 6) {
                        return arr[0];
                    } else {
                        let slices = (arr[0].length == 1 && arr[0] == "0"&&arr3[0] =='0' ? -1 : (arr3[0] == '0' ? arr[0].length : (arr[0]=='0'?0:arr[0].length)));
                        // console.log(slices);
                        return arr[0] + '.' + arr2.join("") + arr3.slice(0, 6-slices).join("");
                    }
                } else {
                    // console.log(arr3);
                    let slices = arr[0] == "0" ? arr3[0] !== '0' ? 6 : -1 : arr[0].length + arr2.length
                    return arr[0] + '.' + arr2.join("") + arr3.slice(0, 6-slices).join("");
                }
            } catch {
                return str;
            }
        } else {
            let arr = str.split('e');
            let len1 = arr[0].split('.')[1] ? arr[0].split('.')[1].length : 0;
            let len2 = Math.abs(arr[1]);
            if (Number(arr[1]) < 0) {
                let totalLen = len1 + len2;
                if (totalLen > fixedLen) {
                    str = Number(str).toFixed(totalLen);
                    try {
                        let arr = str.split('.');
                        let len = arr[1].length;
                        len = fixedLen > len ? len : fixedLen;
                        return arr[0] + '.' + arr[1].substr(0, len);
                    } catch {
                        return str;
                    }
                } else {
                    return Number(str).toFixed(totalLen);
                }
            } else {
                let arrSplitDot = arr[0].split('.');
                if (arrSplitDot[1]) {
                    if (len2 > len1) {
                        return arrSplitDot[0] + arrSplitDot[1] + '0'.repeat(len2 - len1)
                    } else {
                        throw new Error('exponentialToNumber1 Error');
                    }
                } else {
                    return arrSplitDot[0] + '0'.repeat(len2);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}


export const searchParse = (queryStr) => {
    let resultObj = {};
    if (queryStr && queryStr.length > 1) {
        let search = queryStr.split('?')[1];
        if (!search) {
            return resultObj
        }
        let items = search.split('&');
        for (var index = 0; index < items.length; index++) {
            if (!items[index]) {
                continue;
            }
            var kv = items[index].split('=');
            resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
        }
    }
    return resultObj;
}
export const getVuexKey = (url, _key = "vuex") => {
    let _url = new URL(url);
    let projectid = searchParse(_url.hash).projectid;
    if (projectid) {
        return _key + projectid;
    } else {
        return _key + _url.host.replace(/:|\./g, "");
    }

}


export const formatDollarAmount = (val) => {
    try {
        if (Number("0" + val) == 0 || !val) {
            return 0;
        } else {
            const list = [
                { value: 1 * 1000 * 1000 * 1000, symbol: "b" }, // 十亿
                { value: 1 * 1000 * 1000, symbol: "m" }, // 百万
                { value: 1 * 1000, symbol: "k" }, // 千
                { value: 1, symbol: "" },
            ]
            let i
            for (i = 0; i < list.length; i++) {
                if (val >= list[i].value) {
                    break;
                }
            }
            return (val / list[i].value).toFixed(2) + list[i].symbol
        }
    } catch (error) {
        return 0
    }
}

//全局页面跳转是否启用loading
export const routerLoading = false;
 
//全局api接口调用是否启用loading
export const apiLoading = false;
 