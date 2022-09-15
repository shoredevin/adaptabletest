window.onload = yeetGet;
document.getElementById('sub').onclick = yeet;
// document.getElementById('get').onclick = yeetGet;


const json2table = ({ id, dexnum, name, caught }) => 
// {
    `
        <tr>
            <td>
                <button class="edit-button" title="Edit" onclick="handleEdit(this)">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="delete-button" title="Delete" onclick="handleTodoDelete(event, '${id}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
            <td contenteditable="false">${ dexnum }</td>
            <td contenteditable="false">${ name }</td>
            <td contenteditable="false">${ caught[true] ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>' }</td>
        </tr>
    `
// };
    

async function yeetGet() {
    await fetch('/todos/dex')
     .then((response) => response.json())
     .then((data) => {
        console.log(data)
        let myTable = document.querySelector("#myTable");
        myTable.style.display = "inline-block";
        let tbdy = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        tbdy.innerHTML = data.map(json2table).join("")
        // json2table(data);
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
        document.getElementById('dexnum').value = "";
        document.getElementById('name').value = "";
        yeetGet();
    })
}

// const handleTodoDelete = (ev, id) => {
async function handleTodoDelete(ev, id) {
    // const doDelete = async () => {
    const resp = await fetch(`/todos/dex`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id })
    });
    const todos = await resp.json();
    console.log(todos);
    await yeetGet();
        // refreshList();
    // }
    // doDelete().catch(err => console.log("Error changing todo done state", err));
};

async function handleEdit(e) {
    console.log(e.parentElement.parentElement);
    const rows = e.parentElement.parentElement.children;
    console.log(rows.length);
    // for(col of rows) { console.log(rows.contentEditable) };
    for(let i = 1; i < rows.length; i++) {
        const bool = (rows[i].contentEditable === 'true');
        if(bool) rows[i].contentEditable = false;
        if(!bool) rows[i].contentEditable = true;
        // rows[i].contentEditable = true;
    }   

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
//         for(let k = 0; k < numCols; k++) {
//             const val = Object.values(rows[i])[k];
//             tr.appendChild(document.createElement('td'));
//             if(k == 0) { 
//                 tr.cells[k].appendChild(document.createElement("button"))
//                 button.innerHTML = `<button class="edit-button" title="Edit" onclick="handleEdit(this)"><i class="fa-regular fa-pen-to-square"></i></button>`; 
//             } else {
//                 tr.cells[k].appendChild(document.createTextNode(val));
//             }
//         }
//         tbdy.appendChild(tr);
//     }
// }

// document.createTextNode(`<button class="edit-button" title="Edit" onclick="handleEdit(this)"><i class="fa-regular fa-pen-to-square"></i></button>`)