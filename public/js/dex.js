window.onload = yeetGet;
document.getElementById('sub').onclick = yeet;
document.getElementById('get').onclick = yeetGet;

async function yeetGet() {
    // const jsonContainer = document.getElementById('json-container')
    await fetch('/todos/dex')
     .then((response) => response.json())
     .then((data) => {
        console.log(data)
        // jsonContainer.innerHTML = JSON.stringify(data, undefined, 2);
        let myTable = document.querySelector("#myTable");
        myTable.style.display = "inline-block";
        let tbdy = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        tbdy.innerHTML = data.map(json2table).join("")
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
        // let myTable = document.querySelector("#myTable");
        // myTable.style.display = "inline-block";
        // let tbdy = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        // tbdy.innerHTML = data.map(json2table).join("")
        document.getElementById('dexnum').value = "";
        document.getElementById('name').value = "";
        yeetGet();
    })
    // console.log(await apiFetch("/todos/dex", "POST", { dexnum: dexnum, name: name, caught: false }));
}



// async function json2table(data) {
//     let myTable = document.querySelector("#myTable");
//     myTable.style.display = "inline-block";
//     let tbdy = document.getElementById('myTable').getElementsByTagName('tbody')[0];
//     tbdy.innerHTML = "";
//     // let rows = data.response;
//     let rows = data;
//     // console.log(rows.length);
//     const numCols = Object.keys(rows[1]).length;
//     for (let i = 0; i < rows.length; i++) {
//         let tr = document.createElement('tr');
//         for(let k = 1; k < numCols; k++) {
//             const val = Object.values(rows[i])[k];
//             tr.appendChild(document.createElement('td'));
//             tr.cells[k - 1].appendChild(document.createTextNode(val));
//         }
//         tbdy.appendChild(tr);
//     }
// }

// async function json2table({ dexnum, name, caught }) {
const json2table = ({ dexnum, name, caught }) => `
    <tr>
        <td>${dexnum}</td>
        <td>${name}</td>
        <td>${caught}</td>
    </tr>
`;


// const resp = await apiFetch("/todos");
// const todos = await resp.json();
// list.innerHTML = todos.map(renderItem).join("");
// const renderItem = ({ id, title, done }) => `