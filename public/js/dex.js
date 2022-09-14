async function yeetGet() {
    const jsonContainer = document.getElementById('json-container')
    await fetch('/todos/dex')
     .then((response) => response.json())
     .then((data) => {
        console.log(data)
        jsonContainer.innerHTML = JSON.stringify(data, undefined, 2);
    });
}
async function yeet() {
    const dexnum = document.getElementById('dexnum').value;
    const name = document.getElementById('name').value;
    if(isNaN(dexnum)) { console.log("NaN"); return }
    if(!dexnum || !name) return
    await fetch('/todos/dex', {
        method: 'POST',
        body: { dexnum: dexnum, name: name, caught: false }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    // console.log(await apiFetch("/todos/dex", "POST", { dexnum: dexnum, name: name, caught: false }));
}