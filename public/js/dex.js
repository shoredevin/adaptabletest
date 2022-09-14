async function yeetGet() {
    // const jsonContainer = document.getElementById('json-container')
    await fetch('/todos/dex')
     .then((response) => response.json())
     .then((data) => {
        console.log(data)
        // jsonContainer.innerHTML = JSON.stringify(data, undefined, 2);
        json2table(data);
    });
}
async function yeet() {
    const dexnum = document.getElementById('dexnum').value;
    const name = document.getElementById('name').value;
    if(isNaN(dexnum)) { console.log("NaN"); return }
    if(!dexnum || !name) return
    await fetch('/todos/dex', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dexnum: dexnum, name: name, caught: false })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    // console.log(await apiFetch("/todos/dex", "POST", { dexnum: dexnum, name: name, caught: false }));
}



async function json2table(data) {
    let myTable = document.querySelector("#myTable");
    myTable.style.display = "inline-block";
    let tbdy = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    tbdy.innerHTML = "";
    // let rows = data.response;
    let rows = data;
    // console.log(rows.length);
    const numCols = Object.keys(rows[1]).length;
    for (let i = 1; i < rows.length; i++) {
        let tr = document.createElement('tr');
        for(let k = 1; k < numCols; k++) {
            //offset value by one (ignore col1)
            const val = Object.values(rows[i])[k + 1];
            tr.appendChild(document.createElement('td'));
            tr.cells[k].appendChild(document.createTextNode(val));
        }
        tbdy.appendChild(tr);
    }
}