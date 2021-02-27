// function to easy querySelector
const $ = x => document.querySelector(x);
// root variable
let landingPage = $('.game-landing-page');
let howToPlay = $('.how-to-play-container')
let howToPlayBtn = $('.how-to-play')
let backToHomepageBtn = $('.back-to-homepage-btn')
let startGameBtn = $('.start-game-btn');
let mainGame = $('.main-game');
let minecraftWorld = $('.minecraft-world');
let tools = $('.tools');
// tools
let shovel = $('.shovel');
let pickaxe = $('.pickaxe');
let axe = $('.axe');
let sword = $('.sword');
// Inventory variable
let treeLeavesInventory = $('.tree-leaves-inventory')
let woodInventory = $('.wood-inventory')
let soilInventory = $('.soil-inventory');
let rockInventory = $('.rock-inventory')
let treeLeavesInventoryNumber = 0
let woodInventoryNumber  = 0;
let soilInventoryNumber = 0;
let rockInventoryNumber = 0;
// reset
let resetMincraft = $('.reset-mincraft')
let backToStart = $('.back-to-start')

//  handle landing page and how to play

mainGame.classList.add('unvisible')
howToPlay.classList.add('unvisible')

startGameBtn.addEventListener('click', () => {
    landingPage.classList.add('unvisible')
    mainGame.classList.remove('unvisible')
});
howToPlayBtn.addEventListener('click', () => {
    landingPage.classList.add('unvisible')
    mainGame.classList.add('unvisible')
    howToPlay.classList.remove('unvisible')
})
backToHomepageBtn.addEventListener('click', () => {
    landingPage.classList.remove('unvisible')
    howToPlay.classList.add('unvisible')
       
})
// create matrix
let rows = 20;
let columns = 40;
let minecraft = [];
const matrix =  () => {
    for (let row = 0; row < rows; row++){
        minecraft[row] = []
        for (let col = 0; col < columns; col++){
            minecraft[row][col] = document.createElement('div')
            minecraft[row][col].style.transition =  '.2s ease-in-out';

            minecraft[row][col].setAttribute(`data-row`, row);
            minecraft[row][col].setAttribute(`data-col`, col);
            minecraft[row][col].classList.add(`cube`);
            minecraft[row][col].classList.add(`cube-transition`);
            minecraftWorld.appendChild(minecraft[row][col])
        }
    }
}
matrix()

// create the world
const createLand = () => {
    for (let row = 14; row < rows; row++){
        for (let col = 0; col < columns; col++){
            minecraft[row][col].setAttribute('data-cube-type', 'land') 
            minecraft[row][col].classList.add('soil')           
        }
    } 
}
const createGrass = () => {
    for (let row = 13; row < 14; row++){
        for (let col = 0; col < columns; col++){
            minecraft[row][col].setAttribute('data-cube-type', 'grass') 
            minecraft[row][col].classList.add('grass')           
        }
    } 
}
const createRandomTree = randomColumns => {
    for (let row = 9; row < 13; row++){
        for (let col = randomColumns-1; col < randomColumns;col++){
            minecraft[row][col].setAttribute('data-cube-type', 'wood') 
            minecraft[row][col].classList.add('wood') 
            for (let row = 5; row < 9; row ++){
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
    // mount 1
    createMountFunction(12,39,6)
    createMountFunction(11,39,5)
    createMountFunction(10,39,4)
    createMountFunction(9,39,3)
    createMountFunction(8,39,2)
    createMountFunction(7,39,1)
    // mount 2
    createMountFunction(7,3,1)
    createMountFunction(8,4,2)
    createMountFunction(9,5,4)
    createMountFunction(10,6,5)
    createMountFunction(11,7,6)
    createMountFunction(12,8,8)
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
    createCloudsFunction(0,1,34,32)
    createCloudsFunction(2,5,17,15)
    createCloudsFunction(3,6,18,14)
    createCloudsFunction(4,7,17,13)
    // cloud 2
    createCloudsFunction(1,3,5,1)
    createCloudsFunction(2,4,6,2)
    createCloudsFunction(3,5,5,3)
    // clous 3
    createCloudsFunction(1,2,35,30)
    createCloudsFunction(2,3,34,29)
    createCloudsFunction(2,3,32,34)
}

const randomTreeFunction = () => {
    const randomTreeNumber1 = () => Math.floor(Math.random() * 7) + 4
    const randomTreeNumber2 = () => Math.floor(Math.random() * 8) + 13
    const randomTreeNumber3 = () => Math.floor(Math.random() * 9) + 29
    createRandomTree(randomTreeNumber1())
    createRandomTree(randomTreeNumber2())
    createRandomTree(randomTreeNumber3())
}

const removeInventoryClassList = () => {
    woodInventory.classList.remove('active-inventory')
    rockInventory.classList.remove('active-inventory')
    soilInventory.classList.remove('active-inventory')
    treeLeavesInventory.classList.remove('active-inventory')
}
const removeToolscClassList = () => {
    axe.parentElement.classList.remove('active-tool')
    pickaxe.parentElement.classList.remove('active-tool')
    sword.parentElement.classList.remove('active-tool')
    shovel.parentElement.classList.remove('active-tool')   
}
// handle tool click
    shovel.parentElement.addEventListener('click' , () => {
        console.log('nos');
        if (pickaxe.parentElement.classList.contains('active-tool') || axe.parentElement.classList.contains('active-tool') || sword.parentElement.classList.contains('active-tool')){
            axe.parentElement.classList.remove('active-tool')
            pickaxe.parentElement.classList.remove('active-tool')
            sword.parentElement.classList.remove('active-tool')
        } else {
            removeInventoryClassList()
            
            shovel.parentElement.classList.toggle('active-tool')
        }
    })
    pickaxe.parentElement.addEventListener('click' , () => {
        if (shovel.parentElement.classList.contains('active-tool') || axe.parentElement.classList.contains('active-tool') || sword.parentElement.classList.contains('active-tool')){
            shovel.parentElement.classList.remove('active-tool')
            axe.parentElement.classList.remove('active-tool')
            sword.parentElement.classList.remove('active-tool')
        } else {
            removeInventoryClassList()
            pickaxe.parentElement.classList.toggle('active-tool')
        }
    })
    axe.parentElement.addEventListener('click' , () => {
        if (shovel.parentElement.classList.contains('active-tool') || pickaxe.parentElement.classList.contains('active-tool') || sword.parentElement.classList.contains('active-tool')){
                shovel.parentElement.classList.remove('active-tool')
                pickaxe.parentElement.classList.remove('active-tool')
                sword.parentElement.classList.remove('active-tool')
            } else {
                removeInventoryClassList()
                axe.parentElement.classList.toggle('active-tool')
        }
    })
    sword.parentElement.addEventListener('click' , () => {
        if (shovel.parentElement.classList.contains('active-tool') || pickaxe.parentElement.classList.contains('active-tool') || axe.parentElement.classList.contains('active-tool')){
                shovel.parentElement.classList.remove('active-tool')
                pickaxe.parentElement.classList.remove('active-tool')
                axe.parentElement.classList.remove('active-tool')
            } else {
                removeInventoryClassList()
                sword.parentElement.classList.toggle('active-tool')
        }
    })


// add event to every cube
let everyCube = document.querySelectorAll('.cube')
let mainGameFunctions = e => {
    // hendle decrease cubes
    if (shovel.parentElement.classList.contains('active-tool')){
        if (e.target.classList.contains('grass') || e.target.classList.contains('soil')){
            e.target.classList.remove('grass')
            e.target.classList.remove('soil')
            e.target.removeAttribute('data-cube-type')
            soilInventoryNumber++
            soilInventory.textContent = soilInventoryNumber
        }
    }
    if (pickaxe.parentElement.classList.contains('active-tool')){
        if (e.target.classList.contains('rock')){
            e.target.classList.remove('rock')
            e.target.removeAttribute('data-cube-type')
            rockInventoryNumber++
            rockInventory.textContent = rockInventoryNumber
        }
    }
    if (axe.parentElement.classList.contains('active-tool')){
        if (e.target.classList.contains('wood')){
            e.target.classList.remove('wood')
            e.target.removeAttribute('data-cube-type')
            woodInventoryNumber++
            woodInventory.textContent = woodInventoryNumber
        }
    }
    if (sword.parentElement.classList.contains('active-tool')){
        if (e.target.classList.contains('tree-leaves')){
            e.target.classList.remove('tree-leaves')
            e.target.removeAttribute('data-cube-type')
            treeLeavesInventoryNumber++
            treeLeavesInventory.textContent = treeLeavesInventoryNumber
        }
    }
    // hendle increase cubes
    if (treeLeavesInventory.classList.contains('active-inventory')){
        if (e.target.getAttribute('data-cube-type') === null || e.target.getAttribute('data-cube-type') === 'cloud'){
            console.log(e.target,'its empty or cloud');
            if (treeLeavesInventoryNumber > 0){
                e.target.classList.add('tree-leaves')
                e.target.setAttribute('data-cube-type', 'tree-leaves')
                treeLeavesInventoryNumber -= 1
                treeLeavesInventory.textContent = treeLeavesInventoryNumber
            }
        }
    }        
    if (woodInventory.classList.contains('active-inventory')){
        if (e.target.getAttribute('data-cube-type') === null || e.target.getAttribute('data-cube-type') === 'cloud'){
            console.log(e.target,'its empty or cloud');
            if (woodInventoryNumber > 0){
                e.target.classList.add('wood')
                e.target.setAttribute('data-cube-type', 'wood')
                woodInventoryNumber -= 1
                woodInventory.textContent = woodInventoryNumber
            }
        }
    }        
    if (rockInventory.classList.contains('active-inventory')){
        if (e.target.getAttribute('data-cube-type') === null || e.target.getAttribute('data-cube-type') === 'cloud'){
            console.log(e.target,'its empty or cloud');
            if (rockInventoryNumber > 0){
                e.target.classList.add('rock')
                e.target.setAttribute('data-cube-type', 'rock')
                rockInventoryNumber -= 1
                rockInventory.textContent = rockInventoryNumber
            }
        }
    }        
    if (soilInventory.classList.contains('active-inventory')){
        if (e.target.getAttribute('data-cube-type') === null || e.target.getAttribute('data-cube-type') === 'cloud'){
            console.log(e.target,'its empty or cloud');
            if (soilInventoryNumber > 0){
                e.target.classList.add('soil')
                e.target.setAttribute('data-cube-type', 'soil')
                soilInventoryNumber -= 1
                soilInventory.textContent = soilInventoryNumber
            }
        }
    }        
}
everyCube.forEach(cube => cube.addEventListener('click', e => mainGameFunctions(e)))
// handle user build
    treeLeavesInventory.addEventListener('click', () => {
        if (woodInventory.classList.contains('active-inventory') || soilInventory.classList.contains('active-inventory') || rockInventory.classList.contains('active-inventory')){
            woodInventory.classList.remove('active-inventory')
            rockInventory.classList.remove('active-inventory')
            soilInventory.classList.remove('active-inventory')
        } else {
            removeToolscClassList()
            treeLeavesInventory.classList.toggle('active-inventory')
        }
    })
    woodInventory.addEventListener('click', () => {
        if (rockInventory.classList.contains('active-inventory') || soilInventory.classList.contains('active-inventory') || treeLeavesInventory.classList.contains('active-inventory')){
            rockInventory.classList.remove('active-inventory')
            soilInventory.classList.remove('active-inventory')
            treeLeavesInventory.classList.remove('active-inventory')
        } else {
            removeToolscClassList()
            woodInventory.classList.toggle('active-inventory')
        }
    })
    rockInventory.addEventListener('click', () => {
        if (woodInventory.classList.contains('active-inventory') || soilInventory.classList.contains('active-inventory') || treeLeavesInventory.classList.remove('active-inventory')){
            woodInventory.classList.remove('active-inventory')
            soilInventory.classList.remove('active-inventory')
            treeLeavesInventory.classList.remove('active-inventory')
        } else {
            removeToolscClassList()
            rockInventory.classList.toggle('active-inventory')
        }
    })
    soilInventory.addEventListener('click', () => {
        if (rockInventory.classList.contains('active-inventory') || woodInventory.classList.contains('active-inventory') || treeLeavesInventory.classList.contains('active-inventory')){
            rockInventory.classList.remove('active-inventory')
            woodInventory.classList.remove('active-inventory')
            treeLeavesInventory.classList.remove('active-inventory')
        } else {
            removeToolscClassList()
            soilInventory.classList.toggle('active-inventory')
        }
    }) 
const gameStart = () => {
    createLand()
    createGrass()
    createMount()
    createClouds()
    randomTreeFunction()
}

backToStart.addEventListener('click', () => {
    landingPage.classList.remove('unvisible')
})

resetMincraft.addEventListener('click', () => {
    location.reload()
})

gameStart()