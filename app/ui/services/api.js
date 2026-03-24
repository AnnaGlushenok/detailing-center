const BASE_URL = 'https://detailing-center-alpha.vercel.app/';

export async function get(url) {
    const res = await fetch(BASE_URL + url);
    return res.json();
}


export async function post(url, data) {
    const res = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function put(url, data) {
    const res = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function del(url) {
    await fetch(BASE_URL + url, {
        method: 'DELETE'
    });
}

