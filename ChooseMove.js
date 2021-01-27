//Returns a boolean value depending on whether the location has a fruit
function hasFruit(location, fruitLocations) {
    for (let i = 0; i < fruitLocations.length; i++) {
        const fruit = fruitLocations[i]
        if (location.row === fruit.row && location.col === fruit.col) {
            return true;
        }
    }
    return false
}


//Returns the combined X + Y distance to get to a fruit
function getDistance(loc1, loc2) {
    const diffX = Math.abs(loc1.col - loc2.col);
    const diffY = Math.abs(loc1.row - loc2.row);
    return diffX + diffY
}


//Calculates the nearest fruit using the total distances from getDistance
function getNearestFruit(location, fruitLocations) {
    let nearestFruit = fruitLocations[0];
    for (let i = 0; i < fruitLocations.length; i++) {
        const fruit = fruitLocations[i]; 
        const distance = getDistance(location, fruit);
        
        if (getDistance(location, nearestFruit) > distance) {
            nearestFruit = fruit;
        }
    }
    return nearestFruit
}


function greedy(location, fruitLocations) {
    // Checks if you are already on top of a fruit. If you are, returns TAKE
    if (hasFruit(location, fruitLocations)) {
        return "TAKE";
    }
    
    //Calls the getNearestFruit function to return the location of the nearest fruit
    const nearestFruit = getNearestFruit(location, fruitLocations);
    const diffX = Math.abs(location.col - nearestFruit.col);
    const diffY = Math.abs(location.row - nearestFruit.row);
    
    //Checks if values of X or Y are zero, calculates what direction to return as a move.
    if (diffX !== 0) {
        if (location.col - nearestFruit.col < 0) {
            return "EAST"
        }
        return "WEST"
      
    } 
    
    if (diffY !== 0) {
        if (location.row - nearestFruit.row < 0) {
            return "SOUTH"
        }
        return "NORTH"
    }
}




//Initial Function, takes in the parameters of location (an object of row and col), fruitLocations (an array of objects of row and col) and turnNumber (an integer)
function play(location, fruitLocations, turnNumber) {
    //Calls greedy function which is used to calculate where to move
    const nextMove = greedy(location, fruitLocations);
    //Returns the chosen move in the format NORTH/SOUTH/EAST/WEST for movement or TAKE if a fruit is next to the player
    return nextMove;
}