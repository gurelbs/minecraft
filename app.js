// function to easy querySelector
const $ = x => document.querySelector(x);
// root variable
let landingPage = $('.game-landing-page');
let startGameBtn = $('.start-game-btn');
let mainGame = $('.main-game');
let minecraftWorld = $('.minecraft-world');
// Inventory variable
let tools = $('.tools')
let shovel = $('.shovel')
let pickaxe = $('.pickaxe')
let axe = $('.axe')
let woodInventory = $('.wood-inventory')
let woodInventoryNumber  = 0;
let soilInventory = $('.soil-inventory');
let soilInventoryNumber = 0;
let rockInventory = $('.rock-inventory')
let rockInventoryNumber = 0;
// remove landing page
startGameBtn.addEventListener('click', () => {
    landingPage.remove()
});
// create matrix
let rows = 10;
let columns = 20
let minecraft = []
const matrix =  () => {
    for (let row = 0; row < rows; row++){
        minecraft[row] = []
        for (let col = 0; col < columns; col++){
            minecraft[row][col] = document.createElement('div')
            minecraft[row][col].setAttribute(`data-row`, row);
            minecraft[row][col].setAttribute(`data-col`, col);
            minecraft[row][col].classList.add(`cube`);
            minecraftWorld.appendChild(minecraft[row][col])
        }
    }
}
matrix()

// create the world
const createLand = () => {
    for (let row = 8; row < rows; row++){
        for (let col = 0; col < columns; col++){
            minecraft[row][col].setAttribute('data-cube-type', 'land') 
            minecraft[row][col].classList.add('soil')           
        }
    } 
}
const createGrass = () => {
    for (let row = 7; row < 8; row++){
        for (let col = 0; col < columns; col++){
            minecraft[row][col].setAttribute('data-cube-type', 'grass') 
            minecraft[row][col].classList.add('grass')           
        }
    } 
}
const createRandomTree = randomColumns => {
    for (let row = 4; row < 7; row++){
        for (let col = randomColumns-1; col < randomColumns;col++){
            minecraft[row][col].setAttribute('data-cube-type', 'wood') 
            minecraft[row][col].classList.add('wood') 
            for (let row = 1; row < 4; row ++){
                for (let col = randomColumns - 3; col < randomColumns + 2; col++){
                    minecraft[row][col].setAttribute('data-cube-type', 'tree-leaves')
                    minecraft[row][col].classList.add('tree-leaves')                        
                }
            }
        }
    }
}
const createMountFunction = (rows,columns,line) => {
    for (let row = rows; row > rows-1; row--){
        for (let col = columns; col > columns-line; col--){
            minecraft[row][col].setAttribute('data-cube-type', 'rock')
            minecraft[row][col].classList.add('rock')            
        }
    }
}
const createMount = () => {
    createMountFunction(6,19,5)
    createMountFunction(5,19,4)
    createMountFunction(4,19,3)
    createMountFunction(3,19,2)
    createMountFunction(2,19,1)
}

const createCloudsFunction = (rowstart,rowend,columnstart,columnend) => {
    for (let row = rowstart; row < rowend; row++){
        for (let col = columnstart; col > columnend; col--){
            minecraft[row][col].setAttribute('data-cube-type', 'cloud')
            minecraft[row][col].classList.add('cloud')  
        }
    }
}
const createClouds = () => {
    // cloud 1
    createCloudsFunction(0,1,17,15)
    createCloudsFunction(1,2,18,14)
    createCloudsFunction(2,3,17,13)
    // cloud 2
    createCloudsFunction(0,1,5,3)
    createCloudsFunction(1,2,6,2)
    createCloudsFunction(2,3,5,1)
}


const randomTreeNumber1 = () => Math.floor(Math.random() * 2) + 3
const randomTreeNumber2 = () => Math.floor(Math.random() * 6) + 10

createLand()
createGrass()
createMount()
createClouds()
createRandomTree(randomTreeNumber1())
createRandomTree(randomTreeNumber2())


// handle tool click
shovel.parentElement.addEventListener('click' , () => {
    if (pickaxe.parentElement.classList.contains('active-tool') || axe.parentElement.classList.contains('active-tool')){
        axe.parentElement.classList.remove('active-tool')
        pickaxe.parentElement.classList.remove('active-tool')
    } else {
        shovel.parentElement.classList.toggle('active-tool')
    }
})
pickaxe.parentElement.addEventListener('click' , () => {
    if (shovel.parentElement.classList.contains('active-tool') || axe.parentElement.classList.contains('active-tool')){
        shovel.parentElement.classList.remove('active-tool')
        axe.parentElement.classList.remove('active-tool')
    } else {
        pickaxe.parentElement.classList.toggle('active-tool')
    }
})
axe.parentElement.addEventListener('click' , () => {
    if (shovel.parentElement.classList.contains('active-tool') || pickaxe.parentElement.classList.contains('active-tool')){
            shovel.parentElement.classList.remove('active-tool')
            pickaxe.parentElement.classList.remove('active-tool')
    } else {
        axe.parentElement.classList.toggle('active-tool')
    }
})
// add event to every cube
let everyCube = document.querySelectorAll('.cube')
everyCube.forEach(cube => cube.addEventListener('click', e => {
    console.log(e.target);
    if (shovel.parentElement.classList.contains('active-tool')){
        if (e.target.classList.contains('grass') || e.target.classList.contains('soil')){
            e.target.classList.remove('grass')
            e.target.classList.remove('soil')
            soilInventoryNumber++
            soilInventory.textContent = soilInventoryNumber
        }
    }
    if (pickaxe.parentElement.classList.contains('active-tool')){
        if (e.target.classList.contains('rock')){
            e.target.classList.remove('rock')
            rockInventoryNumber++
            rockInventory.textContent = rockInventoryNumber
        }
    }
    if (axe.parentElement.classList.contains('active-tool')){
        if (e.target.classList.contains('wood') || e.target.classList.contains('tree-leaves')){
            e.target.classList.remove('wood')
            e.target.classList.remove('tree-leaves')
            woodInventoryNumber++
            woodInventory.textContent = woodInventoryNumber
        }
    }
}))

