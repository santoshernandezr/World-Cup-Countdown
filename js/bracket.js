/**
 * This function will capture what's in the name in the bracket and transfer it to the next round in
 * the bracket
 * @param {String} winner - The id of the current round
 * @param {String} nextWinner - The id of the next round
 */
function getWinner(currentRound, nextRound) {
    var team = document.getElementById(currentRound).textContent;
    document.getElementById(nextRound).innerHTML = team;
  }