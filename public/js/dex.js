window.onload = yeetGet;
document.getElementById('sub').onclick = yeet;
// document.getElementById('get').onclick = yeetGet;


// <button class="edit-button" title="Edit" onclick="handleEdit(this)">
// </button>
// <button class="delete-button" title="Delete" onclick="handleTodoDelete(event, '${id}')">
// </button>
const json2table = ({ id, dexnum, name, type1, type2, caught, shiny }) => `
    <tr>
        <td>
            <i class="fa-regular fa-pen-to-square edit-button" onclick="handleEdit(this)"></i>
            <i class="fa-regular fa-trash-can delete-button" onclick="handleTodoDelete(event, '${id}')"></i>
        </td>
        <td contenteditable="false">${ pad(dexnum, 3) }</td>
        <td contenteditable="false">${ name }</td>
        <td contenteditable="false">${ type1 }</td>
        <td contenteditable="false">${ type2 }</td>
        <td contenteditable="false">${ caught ? `<i class="fa-solid fa-star caught-button" onclick="patchJob(event, '${id}', { caught: false })"></i>` : `<i class="fa-regular fa-star caught-button" onclick="patchJob(event, '${id}', { caught: true })"></i>` }</td>
        <td contenteditable="false">${ shiny ? `<i class="fa-solid fa-heart shiny-button" onclick="patchJob(event, '${id}', { shiny: false })"></i>` : `<i class="fa-regular fa-heart shiny-button" onclick="patchJob(event, '${id}', { shiny: true })"></i>` }</td>
    </tr>
`;

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str
}
// <i class="fa-regular fa-heart"></i>
// <i class="fa-solid fa-heart"></i>

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
    const type1 = document.getElementById('name').value;
    const type2 = document.getElementById('name').value;

    if(isNaN(dexnum)) { console.log("NaN"); return }
    if(!dexnum || !name || !type1 || !type2) return
    await fetch('/todos/dex', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            dexnum: dexnum, 
            name: name,
            type1: type1,
            type2: type2,
            caught: false,
            shiny: false
        })
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
    if(!window.confirm("Are you sure you want to delete?")) return;
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
        if(bool) {
            rows[i].contentEditable = false;
            e.style.color = "black";
        }
        if(!bool) {
            rows[i].contentEditable = true;
            e.style.color = "orange";
        }
        // rows[i].contentEditable = true;
    }   

}

async function patchJob(e, id, bool) {
    console.log(e);
    console.log(e.parentElement.nextSibling.children)
    //caught button clicked
    if(e.target.classList.contains("caught-button")) {
        console.log(e.nextSibling)
    };
    //shiny button clicked
    if(e.target.classList.contains("shiny-button")) {
        console.log(e.previousSibling)
    };
    const resp = await fetch(`/todos/dex/${id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bool)
    });
    const todos = await resp.json();
    console.log(todos)
    // alert(id + " : " + bool);
    // await apiFetch(`/todos/${id}`, "PATCH", { done: ev.target.checked });
    await yeetGet();
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