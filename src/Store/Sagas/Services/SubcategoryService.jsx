export async function addRecord(payload) {
   let response = await fetch("/subcategory", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}
 
export async function getRecord() {
    let response = await fetch("/subcategory", {
         method: "GET",
         headers: {
             "content-type": "application/json"
         },
     })
     return await response.json()
 }

 export async function updateRecord(payload) {
    console.log(payload.id)
    let response = await fetch("/subcategory/" + payload.id, {
         method: "PUT",
         headers: {
             "content-type": "application/json"
         },
         body: JSON.stringify(payload)
     })
     return await response.json()
 }

 export async function deleteRecord(payload) {
    let response = await fetch("/subcategory/" + payload.id, {
         method: "DELETE",
         headers: {
             "content-type": "application/json"
         },
     })
     return await response.json()
 }