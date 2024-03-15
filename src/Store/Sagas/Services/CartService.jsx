export async function addRecord(payload) {
    let response = await fetch("/cart", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export async function getRecord() {
    let response = await fetch("/cart", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
    })
    return await response.json()
}

export async function updateRecord(payload) {
    let response = await fetch("/cart/" + payload.id, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export async function deleteRecord(payload) {
    let response = await fetch("/cart/" + payload.id, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
    })
    return await response.json()
}