/**
 * This function will capture what's in the name in the bracket and transfer it to the next round in
 * the bracket. Before we capture where we are we check if we are in the group stage or the quarter finals.
 * If we are in the group stage, we will need to clear the semi final and final slot. If we are in the
 * quarter finals we will have to clear the final slot. 
 * @param {String} winner - The id of the current round
 * @param {String} nextWinner - The id of the next round
 * @param {String} bracketSide - This will indicate what side of the bracket we are on
 */
function getWinner(currentRound, nextRound, bracketSide) {

    // Checking if we're in the round of 16
    if (currentRound.includes("group")) {
        winnerNumber = nextRound.charAt(nextRound.length - 1);
        clearSemiFinalAndFinal(bracketSide, winnerNumber);
    }

    // Checking if we're in the quarter finals
    if (currentRound.includes("roundOf16")) {
        clearFinal(bracketSide);
    }

    var team = document.getElementById(currentRound).textContent;
    document.getElementById(nextRound).innerHTML = team;
};

/**
 * This function will clear the names of the teams in the semi final slot and the final slot.
 * @param {String} bracketSide - This will indicate what side of the bracket we are on
 * @param {String} winner - This will tell us what winner we are on to determine which semi and final we need to change.
 */
function clearSemiFinalAndFinal(bracketSide, winner) {
    if (winner == "1" || winner == "2") {
        // Clearing the text that is in the semi final slot
        document.getElementById(bracketSide + "-quarterFinalWinner1").innerHTML = " ";
        // Clearing the text that is in the final slot
        document.getElementById(bracketSide + "-semiFinalWinner1").innerHTML = " ";
    } else {
        // Clearing the text that is in the semi final slot
        document.getElementById(bracketSide + "-quarterFinalWinner2").innerHTML = " ";
        // Clearing the text that is in the final slot
        document.getElementById(bracketSide + "-semiFinalWinner1").innerHTML = " ";
    }
};

/**
 * This will clear the name of the team in the final slot
 * @param {String} bracketSide - This will indicate what side of the bracket we are on
 */
function clearFinal(bracketSide) {
    // This will clear the text int he final slot
    document.getElementById(bracketSide + "-semiFinalWinner1").innerHTML = " ";
}