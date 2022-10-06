import fetch from "node-fetch";

const toUpdate = {
    "Venusaur": {
        "female": "https://poketools.info/images/sprites/003f.gif",
        "shiny": "https://poketools.info/images/sprites/003f-s.gif"
    },
    "Butterfree": {
        "female": "https://poketools.info/images/sprites/012f.gif",
        "shiny": "https://poketools.info/images/sprites/012f-s.gif"
    },
    "Rattata": {
        "female": "https://poketools.info/images/sprites/019f.gif",
        "shiny": "https://poketools.info/images/sprites/019f-s.gif"
    },
    "Raticate": {
        "female": "https://poketools.info/images/sprites/020f.gif",
        "shiny": "https://poketools.info/images/sprites/020f-s.gif"
    },
    "Pikachu": {
        "female": "https://poketools.info/images/sprites/025f.gif",
        "shiny": "https://poketools.info/images/sprites/025f-s.gif"
    },
    "Raichu": {
        "female": "https://poketools.info/images/sprites/026f.gif",
        "shiny": "https://poketools.info/images/sprites/026f-s.gif"
    },
    "Zubat": {
        "female": "https://poketools.info/images/sprites/041f.gif",
        "shiny": "https://poketools.info/images/sprites/041f-s.gif"
    },
    "Golbat": {
        "female": "https://poketools.info/images/sprites/042f.gif",
        "shiny": "https://poketools.info/images/sprites/042f-s.gif"
    },
    "Gloom": {
        "female": "https://poketools.info/images/sprites/044f.gif",
        "shiny": "https://poketools.info/images/sprites/044f-s.gif"
    },
    "Vileplume": {
        "female": "https://poketools.info/images/sprites/045f.gif",
        "shiny": "https://poketools.info/images/sprites/045f-s.gif"
    },
    "Kadabra": {
        "female": "https://poketools.info/images/sprites/064f.gif",
        "shiny": "https://poketools.info/images/sprites/064f-s.gif"
    },
    "Alakazam": {
        "female": "https://poketools.info/images/sprites/065f.gif",
        "shiny": "https://poketools.info/images/sprites/065f-s.gif"
    },
    "Doduo": {
        "female": "https://poketools.info/images/sprites/084f.gif",
        "shiny": "https://poketools.info/images/sprites/084f-s.gif"
    },
    "Dodrio": {
        "female": "https://poketools.info/images/sprites/085f.gif",
        "shiny": "https://poketools.info/images/sprites/085f-s.gif"
    },
    "Hypno": {
        "female": "https://poketools.info/images/sprites/097f.gif",
        "shiny": "https://poketools.info/images/sprites/097f-s.gif"
    },
    "Rhyhorn": {
        "female": "https://poketools.info/images/sprites/111f.gif",
        "shiny": "https://poketools.info/images/sprites/111f-s.gif"
    },
    "Rhydon": {
        "female": "https://poketools.info/images/sprites/112f.gif",
        "shiny": "https://poketools.info/images/sprites/112f-s.gif"
    },
    "Goldeen": {
        "female": "https://poketools.info/images/sprites/118f.gif",
        "shiny": "https://poketools.info/images/sprites/118f-s.gif"
    },
    "Seaking": {
        "female": "https://poketools.info/images/sprites/119f.gif",
        "shiny": "https://poketools.info/images/sprites/119f-s.gif"
    },
    "Scyther": {
        "female": "https://poketools.info/images/sprites/123f.gif",
        "shiny": "https://poketools.info/images/sprites/123f-s.gif"
    },
    "Magikarp": {
        "female": "https://poketools.info/images/sprites/129f.gif",
        "shiny": "https://poketools.info/images/sprites/129f-s.gif"
    },
    "Gyarados": {
        "female": "https://poketools.info/images/sprites/130f.gif",
        "shiny": "https://poketools.info/images/sprites/130f-s.gif"
    },
    "Eevee": {
        "female": "https://poketools.info/images/sprites/133f.gif",
        "shiny": "https://poketools.info/images/sprites/133f-s.gif"
    },
    "Meganium": {
        "female": "https://poketools.info/images/sprites/154f.gif",
        "shiny": "https://poketools.info/images/sprites/154f-s.gif"
    },
    "Ledyba": {
        "female": "https://poketools.info/images/sprites/165f.gif",
        "shiny": "https://poketools.info/images/sprites/165f-s.gif"
    },
    "Ledian": {
        "female": "https://poketools.info/images/sprites/166f.gif",
        "shiny": "https://poketools.info/images/sprites/166f-s.gif"
    },
    "Xatu": {
        "female": "https://poketools.info/images/sprites/178f.gif",
        "shiny": "https://poketools.info/images/sprites/178f-s.gif"
    },
    "Sudowoodo": {
        "female": "https://poketools.info/images/sprites/185f.gif",
        "shiny": "https://poketools.info/images/sprites/185f-s.gif"
    },
    "Politoed": {
        "female": "https://poketools.info/images/sprites/186f.gif",
        "shiny": "https://poketools.info/images/sprites/186f-s.gif"
    },
    "Aipom": {
        "female": "https://poketools.info/images/sprites/190f.gif",
        "shiny": "https://poketools.info/images/sprites/190f-s.gif"
    },
    "Wooper": {
        "female": "https://poketools.info/images/sprites/194f.gif",
        "shiny": "https://poketools.info/images/sprites/194f-s.gif"
    },
    "Quagsire": {
        "female": "https://poketools.info/images/sprites/195f.gif",
        "shiny": "https://poketools.info/images/sprites/195f-s.gif"
    },
    "Murkrow": {
        "female": "https://poketools.info/images/sprites/198f.gif",
        "shiny": "https://poketools.info/images/sprites/198f-s.gif"
    },
    "Wobbuffet": {
        "female": "https://poketools.info/images/sprites/202f.gif",
        "shiny": "https://poketools.info/images/sprites/202f-s.gif"
    },
    "Girafarig": {
        "female": "https://poketools.info/images/sprites/203f.gif",
        "shiny": "https://poketools.info/images/sprites/203f-s.gif"
    },
    "Gligar": {
        "female": "https://poketools.info/images/sprites/207f.gif",
        "shiny": "https://poketools.info/images/sprites/207f-s.gif"
    },
    "Steelix": {
        "female": "https://poketools.info/images/sprites/208f.gif",
        "shiny": "https://poketools.info/images/sprites/208f-s.gif"
    },
    "Scizor": {
        "female": "https://poketools.info/images/sprites/212f.gif",
        "shiny": "https://poketools.info/images/sprites/212f-s.gif"
    },
    "Heracross": {
        "female": "https://poketools.info/images/sprites/214f.gif",
        "shiny": "https://poketools.info/images/sprites/214f-s.gif"
    },
    "Sneasel": {
        "female": "https://poketools.info/images/sprites/215f.gif",
        "shiny": "https://poketools.info/images/sprites/215f-s.gif"
    },
    "Ursaring": {
        "female": "https://poketools.info/images/sprites/217f.gif",
        "shiny": "https://poketools.info/images/sprites/217f-s.gif"
    },
    "Piloswine": {
        "female": "https://poketools.info/images/sprites/221f.gif",
        "shiny": "https://poketools.info/images/sprites/221f-s.gif"
    },
    "Octillery": {
        "female": "https://poketools.info/images/sprites/224f.gif",
        "shiny": "https://poketools.info/images/sprites/224f-s.gif"
    },
    "Houndoom": {
        "female": "https://poketools.info/images/sprites/229f.gif",
        "shiny": "https://poketools.info/images/sprites/229f-s.gif"
    },
    "Donphan": {
        "female": "https://poketools.info/images/sprites/232f.gif",
        "shiny": "https://poketools.info/images/sprites/232f-s.gif"
    },
    "Torchic": {
        "female": "https://poketools.info/images/sprites/255f.gif",
        "shiny": "https://poketools.info/images/sprites/255f-s.gif"
    },
    "Combusken": {
        "female": "https://poketools.info/images/sprites/256f.gif",
        "shiny": "https://poketools.info/images/sprites/256f-s.gif"
    },
    "Blaziken": {
        "female": "https://poketools.info/images/sprites/257f.gif",
        "shiny": "https://poketools.info/images/sprites/257f-s.gif"
    },
    "Beautifly": {
        "female": "https://poketools.info/images/sprites/267f.gif",
        "shiny": "https://poketools.info/images/sprites/267f-s.gif"
    },
    "Dustox": {
        "female": "https://poketools.info/images/sprites/269f.gif",
        "shiny": "https://poketools.info/images/sprites/269f-s.gif"
    },
    "Ludicolo": {
        "female": "https://poketools.info/images/sprites/272f.gif",
        "shiny": "https://poketools.info/images/sprites/272f-s.gif"
    },
    "Nuzleaf": {
        "female": "https://poketools.info/images/sprites/274f.gif",
        "shiny": "https://poketools.info/images/sprites/274f-s.gif"
    },
    "Shiftry": {
        "female": "https://poketools.info/images/sprites/275f.gif",
        "shiny": "https://poketools.info/images/sprites/275f-s.gif"
    },
    "Meditite": {
        "female": "https://poketools.info/images/sprites/307f.gif",
        "shiny": "https://poketools.info/images/sprites/307f-s.gif"
    },
    "Medicham": {
        "female": "https://poketools.info/images/sprites/308f.gif",
        "shiny": "https://poketools.info/images/sprites/308f-s.gif"
    },
    "Roselia": {
        "female": "https://poketools.info/images/sprites/315f.gif",
        "shiny": "https://poketools.info/images/sprites/315f-s.gif"
    },
    "Gulpin": {
        "female": "https://poketools.info/images/sprites/316f.gif",
        "shiny": "https://poketools.info/images/sprites/316f-s.gif"
    },
    "Swalot": {
        "female": "https://poketools.info/images/sprites/317f.gif",
        "shiny": "https://poketools.info/images/sprites/317f-s.gif"
    },
    "Numel": {
        "female": "https://poketools.info/images/sprites/322f.gif",
        "shiny": "https://poketools.info/images/sprites/322f-s.gif"
    },
    "Camerupt": {
        "female": "https://poketools.info/images/sprites/323f.gif",
        "shiny": "https://poketools.info/images/sprites/323f-s.gif"
    },
    "Cacturne": {
        "female": "https://poketools.info/images/sprites/332f.gif",
        "shiny": "https://poketools.info/images/sprites/332f-s.gif"
    },
    "Milotic": {
        "female": "https://poketools.info/images/sprites/350f.gif",
        "shiny": "https://poketools.info/images/sprites/350f-s.gif"
    },
    "Relicanth": {
        "female": "https://poketools.info/images/sprites/369f.gif",
        "shiny": "https://poketools.info/images/sprites/369f-s.gif"
    },
    "Starly": {
        "female": "https://poketools.info/images/sprites/396f.gif",
        "shiny": "https://poketools.info/images/sprites/396f-s.gif"
    },
    "Staravia": {
        "female": "https://poketools.info/images/sprites/397f.gif",
        "shiny": "https://poketools.info/images/sprites/397f-s.gif"
    },
    "Staraptor": {
        "female": "https://poketools.info/images/sprites/398f.gif",
        "shiny": "https://poketools.info/images/sprites/398f-s.gif"
    },
    "Bidoof": {
        "female": "https://poketools.info/images/sprites/399f.gif",
        "shiny": "https://poketools.info/images/sprites/399f-s.gif"
    },
    "Bibarel": {
        "female": "https://poketools.info/images/sprites/400f.gif",
        "shiny": "https://poketools.info/images/sprites/400f-s.gif"
    },
    "Kricketot": {
        "female": "https://poketools.info/images/sprites/401f.gif",
        "shiny": "https://poketools.info/images/sprites/401f-s.gif"
    },
    "Kricketune": {
        "female": "https://poketools.info/images/sprites/402f.gif",
        "shiny": "https://poketools.info/images/sprites/402f-s.gif"
    },
    "Shinx": {
        "female": "https://poketools.info/images/sprites/403f.gif",
        "shiny": "https://poketools.info/images/sprites/403f-s.gif"
    },
    "Luxio": {
        "female": "https://poketools.info/images/sprites/404f.gif",
        "shiny": "https://poketools.info/images/sprites/404f-s.gif"
    },
    "Luxray": {
        "female": "https://poketools.info/images/sprites/405f.gif",
        "shiny": "https://poketools.info/images/sprites/405f-s.gif"
    },
    "Roserade": {
        "female": "https://poketools.info/images/sprites/407f.gif",
        "shiny": "https://poketools.info/images/sprites/407f-s.gif"
    },
    "Combee": {
        "female": "https://poketools.info/images/sprites/415f.gif",
        "shiny": "https://poketools.info/images/sprites/415f-s.gif"
    },
    "Pachirisu": {
        "female": "https://poketools.info/images/sprites/417f.gif",
        "shiny": "https://poketools.info/images/sprites/417f-s.gif"
    },
    "Buizel": {
        "female": "https://poketools.info/images/sprites/418f.gif",
        "shiny": "https://poketools.info/images/sprites/418f-s.gif"
    },
    "Floatzel": {
        "female": "https://poketools.info/images/sprites/419f.gif",
        "shiny": "https://poketools.info/images/sprites/419f-s.gif"
    },
    "Ambipom": {
        "female": "https://poketools.info/images/sprites/424f.gif",
        "shiny": "https://poketools.info/images/sprites/424f-s.gif"
    },
    "Gible": {
        "female": "https://poketools.info/images/sprites/443f.gif",
        "shiny": "https://poketools.info/images/sprites/443f-s.gif"
    },
    "Gabite": {
        "female": "https://poketools.info/images/sprites/444f.gif",
        "shiny": "https://poketools.info/images/sprites/444f-s.gif"
    },
    "Garchomp": {
        "female": "https://poketools.info/images/sprites/445f.gif",
        "shiny": "https://poketools.info/images/sprites/445f-s.gif"
    },
    "Croagunk": {
        "female": "https://poketools.info/images/sprites/453f.gif",
        "shiny": "https://poketools.info/images/sprites/453f-s.gif"
    },
    "Toxicroak": {
        "female": "https://poketools.info/images/sprites/454f.gif",
        "shiny": "https://poketools.info/images/sprites/454f-s.gif"
    },
    "Finneon": {
        "female": "https://poketools.info/images/sprites/456f.gif",
        "shiny": "https://poketools.info/images/sprites/456f-s.gif"
    },
    "Lumineon": {
        "female": "https://poketools.info/images/sprites/457f.gif",
        "shiny": "https://poketools.info/images/sprites/457f-s.gif"
    },
    "Snover": {
        "female": "https://poketools.info/images/sprites/459f.gif",
        "shiny": "https://poketools.info/images/sprites/459f-s.gif"
    },
    "Abomasnow": {
        "female": "https://poketools.info/images/sprites/460f.gif",
        "shiny": "https://poketools.info/images/sprites/460f-s.gif"
    },
    "Weavile": {
        "female": "https://poketools.info/images/sprites/461f.gif",
        "shiny": "https://poketools.info/images/sprites/461f-s.gif"
    },
    "Rhyperior": {
        "female": "https://poketools.info/images/sprites/464f.gif",
        "shiny": "https://poketools.info/images/sprites/464f-s.gif"
    },
    "Tangrowth": {
        "female": "https://poketools.info/images/sprites/465f.gif",
        "shiny": "https://poketools.info/images/sprites/465f-s.gif"
    },
    "Mamoswine": {
        "female": "https://poketools.info/images/sprites/473f.gif",
        "shiny": "https://poketools.info/images/sprites/473f-s.gif"
    }
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