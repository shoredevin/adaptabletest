/* Reused HTML elements */
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

/* CSS color codes for Pokemon types*/
const typeColors = {
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

/* Helper variables to determine card state */
let currentlyMale       = true;
let currentlyShiny      = false;
let shinyIconHasEvent   = false;
let genderIconHasEvent  = false;

let data;

/* 
    Table template 
*/
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


/*
    Start up proxess - get data from API and build table
*/
window.onload = initTable;
async function initTable() {
    /**
     * To Do
     * add something here to redirect to login
     * if authentication fails
     */
    try {
        await fetch('/todos/dex')
         .then((response) => { 
            if (response.ok) { return response.json() };
            throw new Error('Pokedex not found');
         })
         .then((data) => {
            console.log(data)
            let tbdy = document.getElementById('myTable').getElementsByTagName('tbody')[0];
            tbdy.innerHTML = data.map(json2table).join("")
        });
        logSortTotal();
    } catch(err) {
        showSnackBar(err);
    }
}

/**
 * Log out button logic
 */

const logoutButton = document.getElementById('logout');

logoutButton.onclick = async () => {
    console.log('logging out...');
    const response = await fetch(`/todos/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     'username': username,
        //     'password': password,
        // }),
    });     
    const data = await response.json();
    if(data.res == "success") {
        window.location.replace("/dex");
        return;
    }
    showSnackBar(data.res);

}

/*
    Table search logic, includes SOME Add/Or processing
*/
function setSearchLogic() {
    console.log('i am here...')
        const regex = / & /gi;
		let index;
        var value = document.querySelector('#myInput').value.toLowerCase().replace(regex, '&');
        /* TO DO: Rewrite this regex with the new element infroamtion */
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

function clearSearch() {
    document.getElementById('myInput').value = '';
    document.getElementById('myInput').focus();
    document.activeElement.blur()
    setSearchLogic();
}

function logSortTotal() {
    const totalRows = document.getElementById("myTable").getElementsByTagName('tr').length - 1;
    let sortTotal = -1;
    const  tr = document.getElementById("myTable").getElementsByTagName('tr');
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
    try {
        await fetch(`/todos/details/?name=${capitalizeFirstLetter(name)}`)
         .then((response) => response.json())
         .then((d) => {
            if(!d) {
                showSnackBar("No dex details for this Pokemon.");
                return;
            }
            currentlyShiny = false;
            currentlyMale = true;
            data = d;
            openCard(name, type1, type2);
        });
    } catch(err) {
        console.log(err);
    }
}

async function patchJob(e, id, bool) {
    if(e.target.classList.contains("caught-button")) {
        if(e.target.parentElement.nextElementSibling.children[0].classList.contains("fa-solid")) {
            showSnackBar("Cannot make a shiny Pokemon uncaught");
            return;
        };
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
    await initTable();
    setSearchLogic();  
}

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
    if (type2) {
        type2Icon.innerHTML = capitalizeFirstLetter(type2);
        type2Icon.style.backgroundColor = typeColors[type2];
        type2Icon.style.display = 'block';
    } else {
        type2Icon.style.display = 'none';
    }
}
function setBack(name, data) {
    dexDetails.innerHTML = 
    `
        <h1>${capitalizeFirstLetter(name)}</h1> 
        <h3>${data.nickname}</h3>
        <p id="forms-p" style="display:none"><span class="title">Forms: </span><select id="form-selector" class="form-selector">${Object.keys(data.forms).length > 0 ? setFormSelectOptions(data.forms) : ""}</select><p>
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

function setFormSelectOptions(forms) {
    // console.log(forms);
    // console.log(forms.length);
    let str;
    for (let i = 0; i < Object.keys(forms).length; i++) {
        str += `<option value='${forms[Object.keys(forms)[i]].url}'>` + Object.keys(forms)[i] + `</option>`
    }
    return str
}

nextButton.onclick = () => {
    prevButton.style.display = "block";
    nextButton.style.display = "none";
    card.style.transform = "rotateY(180deg)";
    cardInner.style.transform = "rotateY(180deg)";
    front.style.display = "none";
    back.style.display = "flex";
}

prevButton.onclick = () => {
    prevButton.style.display = "none";
    nextButton.style.display = "block";
    card.style.transform = "rotateY(0deg)";
    cardInner.style.transform = "rotateY(0deg)";
    front.style.display = "flex";
    back.style.display = "none";
}

function handleGenderButtonClick() {
    if(currentlyMale) {
        genderIcon.innerHTML = "female";
        if(!currentlyShiny) pokemonSprite.src = data.femaleSpriteURL;
        if(currentlyShiny) pokemonSprite.src = data.femaleSpriteURLShiny;
    }
    if(!currentlyMale) {
        genderIcon.innerHTML = "male";
        if(!currentlyShiny) pokemonSprite.src = data.spriteURL;
        if(currentlyShiny) pokemonSprite.src = data.spriteURLShiny;
    }
    genderIcon.classList.toggle('male');
    genderIcon.classList.toggle('fmale')
    currentlyMale = !currentlyMale;
}

function handleShinyButtonClick() {
    const formSelect = document.getElementById('form-selector'); 
    const url = Object.keys(data.forms).length > 0 ? formSelect.value : data.spriteURL;
    console.log(url);
    if(!currentlyShiny) {
        // shinyIcon.style.color = "gold";
        if(currentlyMale) pokemonSprite.src = url.replace(".gif", "").concat("", "-s.gif");
        if(!currentlyMale) pokemonSprite.src = url.replace(".gif", "").concat("", "f-s.gif");
    }
    if(currentlyShiny) {
        // shinyIcon.style.color = "white";
        if(currentlyMale) pokemonSprite.src = url;
        if(!currentlyMale) pokemonSprite.src = url.replace(".gif", "").concat("", "f.gif");
    }
    shinyIcon.classList.toggle('shiny-true')
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

// function setFormSelector() {
//     console.log('here')
// }

overlay.addEventListener('click', () => {
    overlay.classList.toggle('active');
    if (genderIconHasEvent) { genderIcon.removeEventListener("click", handleGenderButtonClick) };
    if (shinyIconHasEvent) { shinyIcon.removeEventListener("click", handleShinyButtonClick) };
    genderIconHasEvent = false;
    shinyIconHasEvent = false;
    genderIcon.innerHTML = "male";
    genderIcon.classList.remove("hoverable")
    shinyIcon.classList.remove('shiny-true')
    genderIcon.classList.add('male');
    genderIcon.classList.remove('fmale')
    card.style.display = "none";
})


/*
    Helper functions
    These should probably be moved to a 'global.js' file
*/

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};