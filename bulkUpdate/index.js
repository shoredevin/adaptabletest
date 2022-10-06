import fetch from "node-fetch";

const toUpdate = {
    "Venusaur": {
        "female": "",
        "shiny": "cls"
    },
    "Butterfree": {
        "female": "",
        "shiny": "cls"
    },
    "Rattata": {
        "female": "",
        "shiny": "cls"
    },
    "Raticate": {
        "female": "",
        "shiny": "cls"
    },
    "Pikachu": {
        "female": "",
        "shiny": "cls"
    },
    "Raichu": {
        "female": "",
        "shiny": "cls"
    },
    "Zubat": {
        "female": "",
        "shiny": "cls"
    },
    "Golbat": {
        "female": "",
        "shiny": "cls"
    },
    "Gloom": {
        "female": "",
        "shiny": "cls"
    },
    "Vileplume": {
        "female": "",
        "shiny": "cls"
    },
    "Kadabra": {
        "female": "",
        "shiny": "cls"
    },
    "Alakazam": {
        "female": "",
        "shiny": "cls"
    },
    "Doduo": {
        "female": "",
        "shiny": "cls"
    },
    "Dodrio": {
        "female": "",
        "shiny": "cls"
    },
    "Hypno": {
        "female": "",
        "shiny": "cls"
    },
    "Rhyhorn": {
        "female": "",
        "shiny": "cls"
    },
    "Rhydon": {
        "female": "",
        "shiny": "cls"
    },
    "Goldeen": {
        "female": "",
        "shiny": "cls"
    },
    "Seaking": {
        "female": "",
        "shiny": "cls"
    },
    "Scyther": {
        "female": "",
        "shiny": "cls"
    },
    "Magikarp": {
        "female": "",
        "shiny": "cls"
    },
    "Gyarados": {
        "female": "",
        "shiny": "cls"
    },
    "Eevee": {
        "female": "",
        "shiny": "cls"
    },
    "Meganium": {
        "female": "",
        "shiny": "cls"
    },
    "Ledyba": {
        "female": "",
        "shiny": "cls"
    },
    "Ledian": {
        "female": "",
        "shiny": "cls"
    },
    "Xatu": {
        "female": "",
        "shiny": "cls"
    },
    "Sudowoodo": {
        "female": "",
        "shiny": "cls"
    },
    "Politoed": {
        "female": "",
        "shiny": "cls"
    },
    "Aipom": {
        "female": "",
        "shiny": "cls"
    },
    "Wooper": {
        "female": "",
        "shiny": "cls"
    },
    "Quagsire": {
        "female": "",
        "shiny": "cls"
    },
    "Murkrow": {
        "female": "",
        "shiny": "cls"
    },
    "Wobbuffet": {
        "female": "",
        "shiny": "cls"
    },
    "Girafarig": {
        "female": "",
        "shiny": "cls"
    },
    "Gligar": {
        "female": "",
        "shiny": "cls"
    },
    "Steelix": {
        "female": "",
        "shiny": "cls"
    },
    "Scizor": {
        "female": "",
        "shiny": "cls"
    },
    "Heracross": {
        "female": "",
        "shiny": "cls"
    },
    "Sneasel": {
        "female": "",
        "shiny": "cls"
    },
    "Ursaring": {
        "female": "",
        "shiny": "cls"
    },
    "Piloswine": {
        "female": "",
        "shiny": "cls"
    },
    "Remoraid": {
        "female": "",
        "shiny": "cls"
    },
    "Houndour": {
        "female": "",
        "shiny": "cls"
    },
    "Phanpy": {
        "female": "",
        "shiny": "cls"
    },
    "Sceptile": {
        "female": "",
        "shiny": "cls"
    },
    "Torchic": {
        "female": "",
        "shiny": "cls"
    },
    "Combusken": {
        "female": "",
        "shiny": "cls"
    },
    "Linoone": {
        "female": "",
        "shiny": "cls"
    },
    "Silcoon": {
        "female": "",
        "shiny": "cls"
    },
    "Dustox": {
        "female": "",
        "shiny": "cls"
    },
    "Lombre": {
        "female": "",
        "shiny": "cls"
    },
    "Ludicolo": {
        "female": "",
        "shiny": "cls"
    },
    "Aron": {
        "female": "",
        "shiny": "cls"
    },
    "Lairon": {
        "female": "",
        "shiny": "cls"
    },
    "Minun": {
        "female": "",
        "shiny": "cls"
    },
    "Volbeat": {
        "female": "",
        "shiny": "cls"
    },
    "Illumise": {
        "female": "",
        "shiny": "cls"
    },
    "Sharpedo": {
        "female": "",
        "shiny": "cls"
    },
    "Wailmer": {
        "female": "",
        "shiny": "cls"
    },
    "Vibrava": {
        "female": "",
        "shiny": "cls"
    },
    "Anorith": {
        "female": "",
        "shiny": "cls"
    },
    "Clamperl": {
        "female": "",
        "shiny": "cls"
    },
    "Piplup": {
        "female": "",
        "shiny": "cls"
    },
    "Prinplup": {
        "female": "",
        "shiny": "cls"
    },
    "Empoleon": {
        "female": "",
        "shiny": "cls"
    },
    "Starly": {
        "female": "",
        "shiny": "cls"
    },
    "Staravia": {
        "female": "",
        "shiny": "cls"
    },
    "Staraptor": {
        "female": "",
        "shiny": "cls"
    },
    "Bidoof": {
        "female": "",
        "shiny": "cls"
    },
    "Bibarel": {
        "female": "",
        "shiny": "cls"
    },
    "Kricketot": {
        "female": "",
        "shiny": "cls"
    },
    "Kricketune": {
        "female": "",
        "shiny": "cls"
    },
    "Luxio": {
        "female": "",
        "shiny": "cls"
    },
    "Burmy": {
        "female": "",
        "shiny": "cls"
    },
    "Mothim": {
        "female": "",
        "shiny": "cls"
    },
    "Combee": {
        "female": "",
        "shiny": "cls"
    },
    "Vespiquen": {
        "female": "",
        "shiny": "cls"
    },
    "Cherrim": {
        "female": "",
        "shiny": "cls"
    },
    "Happiny": {
        "female": "",
        "shiny": "cls"
    },
    "Chatot": {
        "female": "",
        "shiny": "cls"
    },
    "Spiritomb": {
        "female": "",
        "shiny": "cls"
    },
    "Hippowdon": {
        "female": "",
        "shiny": "cls"
    },
    "Skorupi": {
        "female": "",
        "shiny": "cls"
    },
    "Croagunk": {
        "female": "",
        "shiny": "cls"
    },
    "Toxicroak": {
        "female": "",
        "shiny": "cls"
    },
    "Finneon": {
        "female": "",
        "shiny": "cls"
    },
    "Lumineon": {
        "female": "",
        "shiny": "cls"
    },
    "Mantyke": {
        "female": "",
        "shiny": "cls"
    },
    "Weavile": {
        "female": "",
        "shiny": "cls"
    },
    "Magnezone": {
        "female": "",
        "shiny": "cls"
    },
    "Leafeon": {
        "female": "",
        "shiny": "cls"
    },
}

main();

async function main() {
    const keys = Object.keys(toUpdate) 
    for (let i = 0; i < keys.length; i++) {
        // console.log(keys[i]);
        // console.log(toUpdate[keys[i]]);
        const name = keys[i];
        // const b = toUpdate[keys[i]]
        const fmaleURL = toUpdate[keys[i]].female;
        const fmaleShinyURL = toUpdate[keys[i]].shiny;
        // console.log(name, fmaleURL, fmaleShinyURL);
        await fetch(`https://adaptabletest.adaptable.app/todos/details/${name}`, {
            method: 'PATCH',
            body: JSON.stringify({
                femaleSpriteURL: fmaleURL,
                femaleSpriteURLShiny: fmaleShinyURL
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
         .then((response) => response.json())
         .then((data) => console.log(data));
    }
}