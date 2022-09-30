window.onload = yeetGet;
// document.getElementById('sub').onclick = yeet;
// document.getElementById('get').onclick = yeetGet;

// <td>
//     <i class="fa-regular fa-pen-to-square edit-button" onclick="handleEdit(this)"></i>
//     <i class="fa-regular fa-trash-can delete-button" onclick="handleTodoDelete(event, '${id}')"></i>
// </td>
const json2table = ({ id, dexnum, name, type1, type2, caught, shiny }) => `
    <tr>
        <td contenteditable="false">${ pad(dexnum, 3) }</td>
        <td contenteditable="false"><a class="pokemon-name-link" href="#" onclick="getPokemonDetails('${id}', '${name.toLowerCase()}', '${type1.toLowerCase()}', '${type2.toLowerCase()}')">${ name }</a></td>
        <td class="${ type1.toLowerCase() }-type"contenteditable="false">${ type1 }</td>
        <td class="${ type2.toLowerCase() }-type"contenteditable="false">${ type2 }</td>
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
        // myTable.style.display = "inline-block";
        let tbdy = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        tbdy.innerHTML = data.map(json2table).join("")
        // json2table(data);
    });
    setTotalRows();
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
    // console.log(e);
    if(e.target.classList.contains("caught-button")) {
        if(e.target.parentElement.nextElementSibling.children[0].classList.contains("fa-solid")) {
            showSnackBar("Cannot make a shiny Pokemon uncaught");
            return;
        };
        // e.target.classList.toggle("caught-button");
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-solid");
    };
    if(e.target.classList.contains("shiny-button")) {
        if(e.target.parentElement.previousElementSibling.children[0].classList.contains("fa-regular")) {
            showSnackBar("Cannot make an uncaught Pokemon shiny");
            return;
        };
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-solid");
        // e.target.classList.toggle("shiny-button");
        // e.target.classList.toggle("caught-button");
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
    // await yeetGet();
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

function setSearchLogic() {
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
        logSortTotal();
}

let totalRows;

function setTotalRows() {
    totalRows = document.getElementById("myTable").getElementsByTagName('tr').length - 1;
    document.getElementById('table-size').innerHTML = "Showing " + totalRows + " of " + totalRows + " rows";
}

function logSortTotal() {
    let sortTotal = -1;
    var tr = document.getElementById("myTable").getElementsByTagName('tr');
    for (var i = 0; i < tr.length; i++) {
        if(tr[i].style.display != 'none') {
            sortTotal++;
        }
    }
    if(sortTotal > -1 && sortTotal < totalRows) {
        document.getElementById('table-size').innerHTML = "Showing " + sortTotal + " of " + totalRows + " rows";
    } else {
        document.getElementById('table-size').innerHTML = "Showing " + totalRows + " of " + totalRows + " rows";
    }
}

async function getPokemonDetails(id, name, type1, type2) {
    // try {
        await fetch(`/todos/details/?name=${capitalizeFirstLetter(name)}`)
         .then((response) => response.json())
         .catch((err) => console.log(err))
         .then((d) => {
            currentlyShiny = false;
            currentlyMale = true;
            data = d;
            openCard(name, type1, type2);
        });
    // } catch(err) {
    //     console.log(err);
    // }
}

function showSnackBar(msg) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
}

const card              = document.querySelector("#yo");
const cardInner         = document.querySelector("#yoyo");
const front             = document.getElementById('front');
const back              = document.getElementById('back');
const pokemonSprite     = document.getElementById('pokemon-sprite')
const genderIcon        = document.getElementById('gender-icon');
const shinyIcon         = document.getElementById('shiny-icon');
const type1Icon         = document.getElementById('type1');
const type2Icon         = document.getElementById('type2');
const typeContainer     = document.getElementById("type-container");
const nextButton        = document.getElementById("next");
const prevButton        = document.getElementById("prev");
const dexDetails        = document.getElementById("dex-details");
const overlay           = document.getElementById("overlay");

// const formSelector      = document.getElementById("form-selector");

let currentlyShiny = false;
let currentlyMale = true;

let shinyIconHasEvent = false;
let genderIconHasEvent = false;

let data;

const typeColors = 
{
    "fire"      : "#ff4422",
    "normal"    : "#aaaa99",
    "water"     : "#3399ff",
    "grass"     : "#77cc55",
    "electric"  : "#ffcc33",
    "ice"       : "#66ccff",
    "fighting"  : "#bb5544",
    "poison"    : "#aa5599",
    "ground"    : "#ddbb55",
    "flying"    : "#8899ff",
    "psychic"   : "#ff5599",
    "bug"       : "#aabb22",
    "rock"      : "#bbaa66",
    "ghost"     : "#6666bb",
    "dark"      : "#775544",
    "dragon"    : "#7766ee",
    "steel"     : "#aaaabb",
    "fairy"     : "#ee99ee"
};

function openCard(name, type1, type2) {
    overlay.classList.toggle("active");
    setBorder(type1, type2);
    setImages(data.spriteURL);
    setTypes(type1, type2);
    if(data.femaleSpriteURL) {
        genderIconHasEvent = true;
        genderIcon.classList.add("hoverable")
        genderIcon.addEventListener("click", handleGenderButtonClick);
    }
    shinyIconHasEvent = true;
    shinyIcon.addEventListener("click", handleShinyButtonClick);
    setBack(name, data);
    card.style.display = "block";
}
function closeCard() {
    // genderIcon.removeEventListener("click", genderIconClick);
    // shinyIcon.removeEventListener("click", shinyIconClick);
}
function setBorder(type1, type2) {
    const tbColor = typeColors[type1];
    const lrColor = type2 ? typeColors[type2] : typeColors[type1];
    const border = tbColor + " " + lrColor;
    front.style.borderColor = border;
    back.style.borderColor = border;
}
function setImages(url) {
    pokemonSprite.src = url; 
}
function setTypes(type1, type2) {
    type1Icon.innerHTML =  capitalizeFirstLetter(type1);
    type1Icon.style.backgroundColor = typeColors[type1]
    type1Icon.style.display = 'block';
    typeContainer.style.marginLeft = "calc(50% - 3.5rem)";
    if (type2) {
        type2Icon.innerHTML = capitalizeFirstLetter(type2);
        type2Icon.style.backgroundColor = typeColors[type2];
        type2Icon.style.display = 'block';
        typeContainer.style.marginLeft = "calc(50% - 7.5rem)";
    } else {
        type2Icon.style.display = 'none';
    }
}
function setBack(name, data) {
    // console.log(data.forms);
    // console.log(Object.keys(data.forms).length);
    // console.log(Object.keys(data.forms));
    dexDetails.innerHTML = 
    `
        <h1>${capitalizeFirstLetter(name)}</h1> 
        <h3>${data.nickname}</h3>
        <p id="forms-p" style="display:none"><span class="title">Forms: </span><select id="form-selector" class="form-selector">${Object.keys(data.forms).length > 0 ? lager(data.forms) : ""}</select><p>
        <p><span class="title">Ability:</span> ${data.ability1}${data.ability2 ? ", " + data.ability2 : ""}</p>
        <p><span class="title">Hidden Ability:</span> ${data.hability}</p>
        <p class="egg-groups"><span class="title">Egg Groups:</span> ${data.eggGroup}</p>
        <p><span class="title">Catch Rate:</span> ${data.catchRate}</p>
        <p><span class="title">Hatch Time:</span> ${data.hatchRate}</p>
        <p><span class="title">Leveling Rate:</span> ${data.levelingRate}</p>
        <p class="gender-rates"><span class="male"><i class="fa-solid fa-mars"></i></span>: ${data.mPercent}&nbsp;&nbsp;<span class="fmale"><i class="fa-solid fa-venus"></i></span>: ${data.fPercent}</p>
    `
    if(Object.keys(data.forms).length > 0) document.getElementById("forms-p").style.display = "block"
    const formSelect = document.getElementById('form-selector'); 
    formSelect.addEventListener("change", function() {
        if(!currentlyShiny) pokemonSprite.src = formSelect.value;
        if(currentlyShiny) {
            let newURL = formSelect.value.replace(".gif", "").concat("", "-s.gif");
            console.log(newURL);
            pokemonSprite.src = newURL;
        }
    })
}

function lager(forms) {
    console.log(forms);
    console.log(forms.length);
    let str;
    for (let i = 0; i < Object.keys(forms).length; i++) {
        str += `<option value='${forms[Object.keys(forms)[i]].url}'>` + Object.keys(forms)[i] + `</option>`
    }
    return str
}

nextButton.onclick = handleNextButtonClick;
function handleNextButtonClick() {
    prevButton.style.display = "block";
    nextButton.style.display = "none";
    card.style.transform = "rotateY(180deg)";
    cardInner.style.transform = "rotateY(180deg)";
    front.style.display = "none";
    back.style.display = "flex";
}

prevButton.onclick = handlePrevButtonClick;
function handlePrevButtonClick() {
    prevButton.style.display = "none";
    nextButton.style.display = "block";
    card.style.transform = "rotateY(0deg)";
    cardInner.style.transform = "rotateY(0deg)";
    front.style.display = "flex";
    back.style.display = "none";
}

function handleGenderButtonClick() {
    // console.log(this);
    genderIcon.classList.toggle("fa-mars");
    genderIcon.classList.toggle("fa-venus");
    if(genderIcon.classList.contains("fa-venus")) {
        if(!currentlyShiny) pokemonSprite.src = data.femaleSpriteURL;
        if(currentlyShiny) pokemonSprite.src = data.femaleSpriteURLShiny;
    }
    if(genderIcon.classList.contains("fa-mars")) {
        if(!currentlyShiny) pokemonSprite.src = data.spriteURL;
        if(currentlyShiny) pokemonSprite.src = data.spriteURLShiny;
    }
    currentlyMale = !currentlyMale;
}

function handleShinyButtonClick() {
    const formSelect = document.getElementById('form-selector'); 
    const url = Object.keys(data.forms).length > 0 ? formSelect.value : data.spriteURL;
    console.log(url);
    if(!currentlyShiny) {
        shinyIcon.style.color = "gold";
        if(currentlyMale) pokemonSprite.src = url.replace(".gif", "").concat("", "-s.gif");
        if(!currentlyMale) pokemonSprite.src = url.replace(".gif", "").concat("", "f-s.gif");
    }
    if(currentlyShiny) {
        shinyIcon.style.color = "white";
        if(currentlyMale) pokemonSprite.src = url;
        if(!currentlyMale) pokemonSprite.src = url.replace(".gif", "").concat("", "f.gif");
    }
    currentlyShiny = !currentlyShiny;
}

// function updateSpriteSource(data) {
//     console.log('here')
//     if(currentlyShiny) {
//         console.log('shiny');
//         if(currentlyMale) {pokemonSprite.src = data.spriteURLShiny}
//         if(!currentlyMale) {pokemonSprite.src = data.femaleSpriteURLShiny}
//     }
//     if(!currentlyShiny) {
//         console.log('not shiny');
//         if(currentlyMale) {pokemonSprite.src = data.spriteURL}
//         if(!currentlyMale) {pokemonSprite.src = data.femaleSpriteURL}
//     }
// }

function setFormSelector() {
    console.log('here')
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// const pokemonData = {
//     'bulbasaur': {
//         "nickname": "Seed Pokemon",
//         "ability1": "Overgrow",
//         "ability2": "",
//         "hability": "Chlorophyll",
//         "eggGroup": "Monster and Grass",
//         "catchRate": "11.9%",
//         "hatchRate": "5140 - 5396 steps",
//         "levelingRate": "Medium Slow",
//         "mPercent": "87.5%",
//         "fPercent": "12.5%",
//         "spriteURL": "https://poketools.info/images/sprites/001.gif",
//         "spriteURLShiny": "https://poketools.info/images/sprites/001-s.gif"
//     },
//     'pikachu': {
//         "nickname": "Mouse Pokemon",
//         "ability1": "Static",
//         "ability2": "",
//         "hability": "Lightning Rod",
//         "eggGroup": "Field and Fairy",
//         "catchRate": "35.2%",
//         "hatchRate": "2570 - 2826 steps",
//         "levelingRate": "Medium Fast",
//         "mPercent": "50%",
//         "fPercent": "50%",
//         "spriteURL": "https://poketools.info/images/sprites/025.gif",
//         "spriteURLShiny": "https://poketools.info/images/sprites/025-s.gif"
//     },
//     'burmy': {
//         "nickname": "Bagworm Pokemon",
//         "ability1": "Shed Skin",
//         "ability2": "",
//         "hability": "Overcoat",
//         "eggGroup": "Bug",
//         "catchRate": "24.9",
//         "hatchRate": "3855 - 4111 steps",
//         "levelingRate": "Medium Fast",
//         "mPercent": "50%",
//         "fPercent": "50%",
//         "spriteURL": "https://poketools.info/images/sprites/412.gif",
//         "spriteURLShiny": "https://poketools.info/images/sprites/412-s.gif",
//         "femaleSpriteURL": "",
//         "femaleSpriteURLShiny": "",
//         "forms": {
//             "Plant Cloak": {
//                 "url": "https://poketools.info/images/sprites/412.gif", 
//                 "type1": "Bug",
//                 "type2": ""
//             },
//             "Sandy Cloak": {
//                 "url": "https://poketools.info/images/sprites/412sc.gif", 
//                 "type1": "Bug",
//                 "type2": ""
//             },
//             "Trash Cloak": {
//                 "url": "https://poketools.info/images/sprites/412tc.gif", 
//                 "type1": "Bug",
//                 "type2": ""
//             }
//         }
//     },
//     'combee': {
//         "nickname": "Tiny Bee Pokemon",
//         "ability1": "Honey Gather",
//         "ability2": "",
//         "hability": "Hustle",
//         "eggGroup": "Bug",
//         "catchRate": "24.9",
//         "hatchRate": "3855 - 4111 steps",
//         "levelingRate": "Medium Slow",
//         "mPercent": "87.5%",
//         "fPercent": "12.5%",
//         "spriteURL": "https://poketools.info/images/sprites/415.gif",
//         "spriteURLShiny": "https://poketools.info/images/sprites/415-s.gif",
//         "femaleSpriteURL": "https://poketools.info/images/sprites/415f.gif",
//         "femaleSpriteURLShiny": "https://poketools.info/images/sprites/415f-s.gif"
//     }
// }

function clearSearch() {
    document.getElementById('myInput').value = '';
    document.getElementById('myInput').focus();
    document.activeElement.blur()
    // document.getElementById('table-container').scrollTo(0,0);
    setSearchLogic();
}

overlay.addEventListener('click', () => {
    overlay.classList.toggle('active');
    if (genderIconHasEvent) genderIcon.removeEventListener("click", handleGenderButtonClick);
    if (shinyIconHasEvent) shinyIcon.removeEventListener("click", handleShinyButtonClick);
    genderIconHasEvent = false;
    shinyIconHasEvent = false;
    card.style.display = "none";
})