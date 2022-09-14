window.onload = yeetGet;
document.getElementById('sub').onclick = yeet;
// document.getElementById('get').onclick = yeetGet;

async function yeetGet() {
    await fetch('/todos/dex')
     .then((response) => response.json())
     .then((data) => {
        console.log(data)
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
        document.getElementById('dexnum').value = "";
        document.getElementById('name').value = "";
        yeetGet();
    })
}

const json2table = ({ id, dexnum, name, caught }) => `
    <tr>
        <td>
            <button class="edit-button" title="Edit" onclick="handleEdit(this)">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="delete-button" title="Delete" onclick="handleTodoDelete(event, '${id}')">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
        <td>${dexnum}</td>
        <td>${name}</td>
        <td>${caught}</td>
    </tr>
`;


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
    console.log(e);
}