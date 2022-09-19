window.onload = yeetGet;
document.getElementById('sub').onclick = yeet;
// document.getElementById('get').onclick = yeetGet;


const json2table = ({ id, dexnum, name, type1, type2, caught, shiny }) => `
    <tr>
        <td>
            <i class="fa-regular fa-pen-to-square edit-button" onclick="handleEdit(this)"></i>
            <i class="fa-regular fa-trash-can delete-button" onclick="handleTodoDelete(event, '${id}')"></i>
        </td>
        <td contenteditable="false">${ pad(dexnum, 3) }</td>
        <td contenteditable="false"><a href="#">${ name }</a></td>
        <td class="${type1.toLowerCase}-type"contenteditable="false">${ type1 }</td>
        <td class="${type2.toLowerCase}-type"contenteditable="false">${ type2 }</td>
        <td contenteditable="false">${ caught ? `<i class="fa-solid fa-star caught-button" onclick="patchJob(event, '${id}', { caught: false })"></i>` : `<i class="fa-regular fa-star caught-button" onclick="patchJob(event, '${id}', { caught: true })"></i>` }</td>
        <td contenteditable="false">${ shiny ? `<i class="fa-solid fa-heart shiny-button" onclick="patchJob(event, '${id}', { shiny: false })"></i>` : `<i class="fa-regular fa-heart shiny-button" onclick="patchJob(event, '${id}', { shiny: true })"></i>` }</td>
    </tr>
`;

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str
}

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
    const type1 = document.getElementById('type1-selector').value;
    const type2 = document.getElementById('type2-selector').value;

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

async function handleTodoDelete(ev, id) {
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
};

async function handleEdit(e) {
    console.log(e.parentElement.parentElement);
    const rows = e.parentElement.parentElement.children;
    console.log(rows.length);
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
    }   

}

async function patchJob(e, id, bool) {
    if(e.target.classList.contains("caught-button")) {
        if(e.target.parentElement.nextElementSibling.children[0].classList.contains("fa-solid")) {
            alert("Cannot make a shiny Pokemon uncaught");
            return;
        }
    };
    if(e.target.classList.contains("shiny-button")) {
        if(e.target.parentElement.previousElementSibling.children[0].classList.contains("fa-regular")) {
            alert("Cannot make an uncaught Pokemon shiny");
            return;
        }
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

// function myFunction() {
//   var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("myTable");
//   tr = table.getElementsByTagName("tr");
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     if (td) {
//       txtValue = td.textContent || td.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }       
//   }
// }

function myFunction() {
    console.log('i am here...')
        const regex = / & /gi;
		let index;
		
        var value = document.querySelector('#myInput').value.toLowerCase().replace(regex, '&');
        const caughtRegX = /caught/gi;
        const uncaughtRegX = /!caught/gi;
        const uncaughtExplicitRegX = /uncaught/gi;
        const shinyRegX = /shiny/gi;
        const notShinyRegX = /!shiny/gi;
        value = value.replace(uncaughtRegX, '<i class="far fa-star" aria-hidden="true"></i>');
        value = value.replace(uncaughtExplicitRegX, '<i class="far fa-star" aria-hidden="true"></i>');
        value = value.replace(caughtRegX, '<i class="fas fa-star" aria-hidden="true"></i>');
        value = value.replace(notShinyRegX, '<i class="far fa-heart" aria-hidden="true"></i>');
        value = value.replace(shinyRegX, '<i class="fas fa-heart" aria-hidden="true"></i>');
        var filter = [];
        while (value.length > 0) {
            if (value.indexOf('||') == -1) {
                if (value.trim().length > 0) {
                    filter.push(value.trim());
                };
                break;
            } else {
                index = value.indexOf('||');
                filter.push(value.slice(0, index).trim())
                value = value.slice(index+2, value.length);
            };
        };
        var table = document.getElementById('tableBody');
        var tr = table.getElementsByTagName('tr');
        for (var i = 0; i < tr.length; i++) {
            if (filter.length == 0) {
                tr[i].style.display = '';
            } else {
                for (var k = 0; k < filter.length; k++) {
                    if (filter[k].indexOf('&') > -1) {
                        let string = filter[k];
                        let countAmp =  string.match(/&/g).length;
                        for (var m = 0; m <= countAmp + 1; m++) {
							if (m == countAmp + 1) {
								if (tr[i].innerHTML.toLowerCase().indexOf(string.slice(0, string.length)) > -1) {
                                    tr[i].style.display = '';
                                    break;
								} else {
                                    tr[i].style.display = 'none';
								}
							} else if (tr[i].innerHTML.toLowerCase().indexOf(string.slice(0, string.indexOf('&'))) > -1) {
								string = string.slice(string.indexOf('&') + 1, string.length);
                            } else {
                                tr[i].style.display = 'none';      
                            }
                        }
                    } else if (tr[i].innerHTML.toLowerCase().indexOf(filter[k]) > -1) {
                        tr[i].style.display = '';
                        break;
                    } else {
                        tr[i].style.display = 'none';
                    };
                };
            };
        };
    // logSortTotal();
}
