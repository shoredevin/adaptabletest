import fetch from "node-fetch";

const toUpdate = {
    "Venusaur": {
        "female": "",
        "shiny": ""
    },
    "Butterfree": {
        "female": "",
        "shiny": ""
    },
    "Rattata": {
        "female": "",
        "shiny": ""
    },
    "Raticate": {
        "female": "",
        "shiny": ""
    },
    "Pikachu": {
        "female": "",
        "shiny": ""
    },
    "Raichu": {
        "female": "",
        "shiny": ""
    },
    "Zubat": {
        "female": "",
        "shiny": ""
    },
    "Golbat": {
        "female": "",
        "shiny": ""
    },
    "Gloom": {
        "female": "",
        "shiny": ""
    },
    "Vileplume": {
        "female": "",
        "shiny": ""
    },
    "Kadabra": {
        "female": "",
        "shiny": ""
    },
    "Alakazam": {
        "female": "",
        "shiny": ""
    },
    "Doduo": {
        "female": "",
        "shiny": ""
    },
    "Dodrio": {
        "female": "",
        "shiny": ""
    },
    "Hypno": {
        "female": "",
        "shiny": ""
    },
    "Rhyhorn": {
        "female": "",
        "shiny": ""
    },
    "Rhydon": {
        "female": "",
        "shiny": ""
    },
    "Goldeen": {
        "female": "",
        "shiny": ""
    },
    "Seaking": {
        "female": "",
        "shiny": ""
    },
    "Scyther": {
        "female": "",
        "shiny": ""
    },
    "Magikarp": {
        "female": "",
        "shiny": ""
    },
    "Gyarados": {
        "female": "",
        "shiny": ""
    },
    "Eevee": {
        "female": "",
        "shiny": ""
    },
    "Meganium": {
        "female": "",
        "shiny": ""
    },
    "Ledyba": {
        "female": "",
        "shiny": ""
    },
    "Ledian": {
        "female": "",
        "shiny": ""
    },
    "Xatu": {
        "female": "",
        "shiny": ""
    },
    "Sudowoodo": {
        "female": "",
        "shiny": ""
    },
    "Politoed": {
        "female": "",
        "shiny": ""
    },
    "Aipom": {
        "female": "",
        "shiny": ""
    },
    "Wooper": {
        "female": "",
        "shiny": ""
    },
    "Quagsire": {
        "female": "",
        "shiny": ""
    },
    "Murkrow": {
        "female": "",
        "shiny": ""
    },
    "Wobbuffet": {
        "female": "",
        "shiny": ""
    },
    "Girafarig": {
        "female": "",
        "shiny": ""
    },
    "Gligar": {
        "female": "",
        "shiny": ""
    },
    "Steelix": {
        "female": "",
        "shiny": ""
    },
    "Scizor": {
        "female": "",
        "shiny": ""
    },
    "Heracross": {
        "female": "",
        "shiny": ""
    },
    "Sneasel": {
        "female": "",
        "shiny": ""
    },
    "Ursaring": {
        "female": "",
        "shiny": ""
    },
    "Piloswine": {
        "female": "",
        "shiny": ""
    },
    "Remoraid": {
        "female": "",
        "shiny": ""
    },
    "Houndour": {
        "female": "",
        "shiny": ""
    },
    "Phanpy": {
        "female": "",
        "shiny": ""
    },
    "Sceptile": {
        "female": "",
        "shiny": ""
    },
    "Torchic": {
        "female": "",
        "shiny": ""
    },
    "Combusken": {
        "female": "",
        "shiny": ""
    },
    "Linoone": {
        "female": "",
        "shiny": ""
    },
    "Silcoon": {
        "female": "",
        "shiny": ""
    },
    "Dustox": {
        "female": "",
        "shiny": ""
    },
    "Lombre": {
        "female": "",
        "shiny": ""
    },
    "Ludicolo": {
        "female": "",
        "shiny": ""
    },
    "Aron": {
        "female": "",
        "shiny": ""
    },
    "Lairon": {
        "female": "",
        "shiny": ""
    },
    "Minun": {
        "female": "",
        "shiny": ""
    },
    "Volbeat": {
        "female": "",
        "shiny": ""
    },
    "Illumise": {
        "female": "",
        "shiny": ""
    },
    "Sharpedo": {
        "female": "",
        "shiny": ""
    },
    "Wailmer": {
        "female": "",
        "shiny": ""
    },
    "Vibrava": {
        "female": "",
        "shiny": ""
    },
    "Anorith": {
        "female": "",
        "shiny": ""
    },
    "Clamperl": {
        "female": "",
        "shiny": ""
    },
    "Piplup": {
        "female": "",
        "shiny": ""
    },
    "Prinplup": {
        "female": "",
        "shiny": ""
    },
    "Empoleon": {
        "female": "",
        "shiny": ""
    },
    "Starly": {
        "female": "",
        "shiny": ""
    },
    "Staravia": {
        "female": "",
        "shiny": ""
    },
    "Staraptor": {
        "female": "",
        "shiny": ""
    },
    "Bidoof": {
        "female": "",
        "shiny": ""
    },
    "Bibarel": {
        "female": "",
        "shiny": ""
    },
    "Kricketot": {
        "female": "",
        "shiny": ""
    },
    "Kricketune": {
        "female": "",
        "shiny": ""
    },
    "Luxio": {
        "female": "",
        "shiny": ""
    },
    "Burmy": {
        "female": "",
        "shiny": ""
    },
    "Mothim": {
        "female": "",
        "shiny": ""
    },
    "Combee": {
        "female": "",
        "shiny": ""
    },
    "Vespiquen": {
        "female": "",
        "shiny": ""
    },
    "Cherrim": {
        "female": "",
        "shiny": ""
    },
    "Happiny": {
        "female": "",
        "shiny": ""
    },
    "Chatot": {
        "female": "",
        "shiny": ""
    },
    "Spiritomb": {
        "female": "",
        "shiny": ""
    },
    "Hippowdon": {
        "female": "",
        "shiny": ""
    },
    "Skorupi": {
        "female": "",
        "shiny": ""
    },
    "Croagunk": {
        "female": "",
        "shiny": ""
    },
    "Toxicroak": {
        "female": "",
        "shiny": ""
    },
    "Finneon": {
        "female": "",
        "shiny": ""
    },
    "Lumineon": {
        "female": "",
        "shiny": ""
    },
    "Mantyke": {
        "female": "",
        "shiny": ""
    },
    "Weavile": {
        "female": "",
        "shiny": ""
    },
    "Magnezone": {
        "female": "",
        "shiny": ""
    },
    "Leafeon": {
        "female": "",
        "shiny": ""
    },
}

main();

async function main() {
    const keys = Object.keys(toUpdate) 
    for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        const fmaleURL = toUpdate[keys[i]].female;
        const fmaleShinyURL = toUpdate[keys[i]].shiny;
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