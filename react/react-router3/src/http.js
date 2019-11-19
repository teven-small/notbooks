//  get 封装
export function httpGet(url) {
    var result = fetch(url)
    return result
}

//post 封装

export function httpPost(url, data) {
    var result = fetch(url, {
        method: 'post',
        headers: {
            'Accrpt': 'application/json, text/plain, */*',
            'Content-Type': 'applocation/x-www-form-urlendoded'
        },
        body: params(data)
    })

    return result
}

function params(obj) {
    var result = ""
    var item;
    for (item in obj) {
        console.log(encodeURIComponent(obj[item]))
        result += "&" + item + "=" + encodeURIComponent(obj[item])
    }

    if (result) {
        result = result.slice(1)
    }

    return result
}