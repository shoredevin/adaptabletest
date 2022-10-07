// const apiFetch = async (url, method, body) => {
//     method = method || "GET";
//     const opts = { method };
//     if (body) {
//         opts.headers = {
//             "Content-Type": "application/json",
//         };
//         opts.body = JSON.stringify(body);
//     }

//     const resp = await fetch(url, opts);
//     if (!resp.ok) {
//         const text = await resp.text();
//         throw new Error(`Error from API: ${resp.statusText}: ${text}`);
//     }
//     return resp;
// };

// const initTodo = () => {
//     // INSERT handleTodoDelete HERE
//     const handleTodoDelete = (ev, id) => {
//         const doDelete = async () => {
//             await apiFetch(`/todos`, "DELETE", { id: id });
    
//             refreshList();
//         }
    
//         doDelete().catch(err => console.log("Error changing todo done state", err));
//     };
//     window.handleTodoDelete = handleTodoDelete;

//     const renderTitle = ({ title, done }) => {
//         if (!done) return title;
//         return `<s>${title}</s>`;
//     };
    
//     const renderItem = ({ id, title, done }) => `
//         <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded" style="background-color: #f4f6f7;">
//             <input
//                 class="form-check-input me-2"
//                 type="checkbox"
//                 value=""
//                 ${done ? "checked" : ""}
//                 onchange="handleTodoChange(event, '${id}')"
//             />
//             <button class="delete-button" onclick="handleTodoDelete(event, '${id}')"><i class="fa-solid fa-trash-can"></i></button>
//             <div style="flex-grow: 1;">
//                 ${renderTitle({ title, done })}
//             </div>
//             <!-- INSERT DELETE BUTTON HERE -->
//         </li>
//     `;
//     const noItems = `
//         <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded" style="background-color: #f4f6f7;">
//             <strong>No tasks yet. Try adding one.</strong>
//         </li>
//     `;

//     const refreshList = () => {
//         const doRefresh = async () => {
//             const list = document.querySelector("#todo-list");

//             const resp = await apiFetch("/todos");
//             const todos = await resp.json();
//             if (todos.length === 0) {
//                 list.innerHTML = noItems;
//             } else {
//                 list.innerHTML = todos.map(renderItem).join("");
//             }
//         };

//         doRefresh().catch(err => console.log("Error refreshing list", err));
//     };

//     const addItem = async () => {
//         const input = document.querySelector("#add-input");
//         const title = input.value;
//         if (!title) return;

//         await apiFetch("/todos", "POST", { title, done: false });

//         input.value = "";
//         refreshList();
//     };

//     const handleTodoChange = (ev, id) => {
//         const doChange = async () => {
//             await apiFetch(`/todos/${id}`, "PATCH", { done: ev.target.checked });

//             refreshList();
//         }

//         doChange().catch(err => console.log("Error changing todo done state", err));
//     };
//     window.handleTodoChange = handleTodoChange;

//     const form = document.querySelector("#todo-form");
//     form.onsubmit = (ev) => {
//         ev.preventDefault();
//         addItem().catch(err => console.log("Error adding item", err));
//     };

//     refreshList();
// }


// initTodo();

const username = document.getElementById('uname').value;
const password = document.getElementById('pwrd').value;
const lb = document.getElementById('login-button');



lb.onclick = async () => {
    const rsponse = await fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });
    const data = await res.json();
    console.log(data);
    // console.log('logged in');
}