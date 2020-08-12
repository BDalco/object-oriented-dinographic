// Global variables
let dinos;
const dinoArray = [];
const button = document.getElementById('btn');

// Application, wait for DOM to be loaded if we're looking for specific elements
document.addEventListener("DOMContentLoaded", function(event) {
    // console.log("DOM fully loaded and parsed");
    init();
});

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        json = JSON.stringfy(response);
    });

    dinos = json.Dinos;
    // console.log(dinos);
}

function loadJSON(callback, done) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'js/dino.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.status === "200") {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

// Create Dino Constructor
function Dinosaur(species, weight, height, diet, where, when, fact, image) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
}

// Create Dino Objects
function createDinosaurs(human) {
    const triceratops = new Dinosaur(
        dinos[0].species,
        dinos[0].weight,
        dinos[0].height,
        dinos[0].diet,
        dinos[0].where,
        dinos[0].when,
        dinos[0].fact,
        dinos[0].image
    );

    const trex = new Dinosaur(
        dinos[1].species,
        dinos[1].weight,
        dinos[1].height,
        dinos[1].diet,
        dinos[1].where,
        dinos[1].when,
        dinos[1].fact,
        dinos[1].image
    );

    const anklyosaurus = new Dinosaur(
        dinos[2].species,
        dinos[2].weight,
        dinos[2].height,
        dinos[2].diet,
        dinos[2].where,
        dinos[2].when,
        dinos[2].fact,
        dinos[2].image
    );

    const brachiosaurus = new Dinosaur(
        dinos[3].species,
        dinos[3].weight,
        dinos[3].height,
        dinos[3].diet,
        dinos[3].where,
        dinos[3].when,
        dinos[3].fact,
        dinos[3].image
    );

    const stegosaurus = new Dinosaur(
        dinos[4].species,
        dinos[4].weight,
        dinos[4].height,
        dinos[4].diet,
        dinos[4].where,
        dinos[4].when,
        dinos[4].fact,
        dinos[4].image
    );

    const elasmosaurus = new Dinosaur(
        dinos[5].species,
        dinos[5].weight,
        dinos[5].height,
        dinos[5].diet,
        dinos[5].where,
        dinos[5].when,
        dinos[5].fact,
        dinos[5].image
    );

    const pteranodon = new Dinosaur(
        dinos[6].species,
        dinos[6].weight,
        dinos[6].height,
        dinos[6].diet,
        dinos[6].where,
        dinos[6].when,
        dinos[6].fact,
        dinos[6].image
    );

    const pigeon = new Dinosaur(
        dinos[7].species,
        dinos[7].weight,
        dinos[7].height,
        dinos[7].diet,
        dinos[7].where,
        dinos[7].when,
        dinos[7].fact,
        dinos[7].image
    );
    
    // Push Dinosaurs to array without human to shuffle
    dinoArray.push(
        triceratops,
        trex,
        anklyosaurus,
        brachiosaurus,
        stegosaurus,
        elasmosaurus,
        pteranodon,
        pigeon
    );
    
    // Shuffle Dino Array
    shuffle(dinoArray);

    // Add human to the middle
    dinoArray.splice(dinoArray.length / 2, 0, human);

    // console.log(dinoArray);
}

// Shuffle tiles
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create Human Object
// Use IIFE to get human data from form
function createHumanObject() {
    const human = (function () {
        let name = document.getElementById('name').value;
        let feet = document.getElementById('feet').value;
        let inches = document.getElementById('inches').value;
        let weight = document.getElementById('weight').value;
        let diet = document.getElementById('diet').value;
        let image = 'images/human.png';

        function getName() {
            return name;
        }

        function getHeight() {
            return parseFloat((feet) * 12) + parseFloat(inches);
        }

        function getWeight() {
            return weight;
        }

        function getDiet() {
            return diet;
        }

        function getImage() {
            return image;
        }

        return {
            name: getName(),
            height: getHeight(),
            weight: getWeight(),
            diet: getDiet(),
            image: getImage()
        };
    })();
    return human;
    // console.log(human);
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dinosaur.prototype.compareHeight = function(humanHeight){
    if (this.height > humanHeight) {
        this.fact[1] = `This dinosaur was ${((this.height - humanHeight) / 12).toFixed(2)} ft taller than you`;
    } else {
        this.fact[1] = `This dinosaur was ${((humanHeight - this.height) / 12).toFixed(2)} ft shorter than you`;
    }
    // console.log(this.fact[1]);
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dinosaur.prototype.compareWeight = function(humanWeight){
    if (this.weight > humanWeight) {
        this.fact[2] = `This dinosaur was ${Math.round(this.weight - humanWeight)} lbs more than you`;
    } else {
        this.fact[2] = `This dinosaur was ${Math.round(humanWeight - this.weight)} lbs less than you`;
    }
    // console.log(this.fact[2])
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dinosaur.prototype.compareDiet = function(humanDiet){
    if (this.diet.toLowerCase() == humanDiet.toLowerCase()) {
        this.fact[3] = `This dinosaur was also a ${this.diet}`;
    } else {
        this.fact[3] = `Unlike you, this dinosaur was a ${this.diet}`;
    }
    // console.log(this.fact[3])
}

// Generate Tiles for each Dino in Array
// Add tiles to DOM
function createTiles() {
    const grid = document.getElementById("grid");
    // console.log(dinoArray);
    
    dinoArray.map((dino, index) => {
        let gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        grid.appendChild(gridItem);

        let dinoName = document.createElement("h3");
        dinoName.innerHTML = (dino.species) ? dino.species : dino.name;
        gridItem.appendChild(dinoName);

        let dinoImage = document.createElement("img");
        dinoImage.src = dino.image;
        dinoImage.alt = (dino.species) ? dino.species : dino.name;
        gridItem.appendChild(dinoImage);
        
        let factsArray = dino.fact;

        let dinoFact = document.createElement("p");
        if (dino.species == "Pigeon") {
            dinoFact.innerHTML = dino.fact[0];
        } else {
            dinoFact.innerHTML = (dino.fact) ? dino.fact[Math.floor(Math.random() * factsArray.length)] : " ";
        }
        
        gridItem.appendChild(dinoFact);
    });

}

// Remove form from screen
function hideForm() {
    const form = document.getElementById('dino-compare');
    form.innerHTML = '';
}

// On button click, prepare and display infographic
button.addEventListener('click', function() {
    const human = createHumanObject();
    // console.log(human);
    createDinosaurs(human);
    dinoArray.map(dino => {
        if (dino.species) {
            dino.compareHeight(human.height);
            dino.compareWeight(human.weight);
            dino.compareDiet(human.diet);
        }
    });
    hideForm();
    createTiles();
});