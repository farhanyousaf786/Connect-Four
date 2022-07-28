// varible that will trigger to true as we find our winner
let isWinner = false;

// we will fill this array with "empty" string and leter append it into gamepanel
let emptyCircle = [];

// this is an array of gamePanel[row][column], this will initialize with "emptyCircle"
let gamePanel = [];

// no. of rows
const rows = 7;

// no. of columns
const columns = 7;

// no of tracks, this will help us to set initl Attributes to track filled columns or rows
const columnToTrack = rows - 1;

// we will set it value to total no of rows so we can check if triggers row is filled or not
const traking = [];

// first entry will go for blue
let currentPlayer = "blue";

// will update when we find our winner at specified row
let matchedRow = 0;

// will update when we find our winner at specified column
let matchedCol = 0;

/*
init is a defual function that run when screen load.
he inner functions in init are the functionswhich control
our defual values like # of columns or empty 2d array
along with empty circles.
*/
function init() {

    setInitialAttributes();

    setEmptyCirclesForJS();

    setAndListenEmptyCircle();

}



function setInitialAttributes() {



    // this line will set our body elements at center
    document.body.style.textAlign = "center";



    /* 
    this block is to create our empty gamePanel element 
    and to append it to col1 element
    */
    const panel = document.createElement('div');

    panel.id = "gamePanel";

    const col1 = document.getElementById("col1");

    col1.appendChild(panel);



    /* 
     here, create a new div element to show
     current player's color.
    */

    const cpColor = document.createElement("div");

    cpColor.id = "current-player-color";

    cpColor.innerText.backgroundColor = "white";



    //

    const cpText = document.createElement("div");

    cpText.id = "current-player-text";

    cpText.innerText = "Blue's Turn";

    cpText.style.fontSize = "20px";

    document.body.appendChild(cpText);

    document.getElementById("current-player-text").style.color = 'blue';

    const col2 = document.getElementById("col2");


    col2.appendChild(cpColor);

    col2.appendChild(cpText);




    // this loop is to push tracking array

    for (let i = 0; i <= columnToTrack; i++) {

        traking.push(columnToTrack);

    }

}



// set an empty entry in 2d array and then push each entry row in gamePanel 
function setEmptyCirclesForJS() {

    for (let row = 0; row < rows; row++) {

        emptyCircle = [];

        for (let column = 0; column < columns; column++) {


            emptyCircle[column] = "empty";
        }

        gamePanel.push(emptyCircle);

        console.log("GamePanel: " + gamePanel);

        console.log("GamePanel: " + gamePanel.length);


    }


}


//  this is the most important function of the projec
// this function allow us to make 2d array and make 
// 2d empty circles with colors. then these circless
// are given class name "cricle" and id the curretn
// entry of 2d array then insert these circles to our
// emoty gamePanel[row][column]. then make an action 
// listner for each entry of that array.

function setAndListenEmptyCircle() {

    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            const initialCircle = document.createElement("div");

            initialCircle.id = row.toString() + column.toString();

            initialCircle.classList.add("circle");

            document.getElementById("gamePanel").append(initialCircle);

        }

    }


    while (isWinner) {

        return alert("Game eneded!");

    }


    const target = document.querySelector("div");

    target.addEventListener("click", (e) => {

        console.log("target = " + e.target.id);

        let row = e.target.id.charAt(0);

        let column = e.target.id.charAt(1);

        row = traking[column];

        row < 0 ? invalidEntry() : null;

        const circularBox = document.getElementById(row.toString() + column.toString());


        // after the click if the user is red then we will update circle with red color
        // otherwise we will update circle with blue color.
        currentPlayer == "red" ? setRedEntry(row, column, circularBox) : setBlueEntry(row, column, circularBox);

        row--;

        traking[column] = row;


        if (checkDiagonally() == true ||
            checkReversDiagonally() == true ||
            checkHorizontally() == true ||
            checkVertically() == true) {


            if (gamePanel[matchedRow][matchedCol] == "red") {

                showWinnerOnMenu("Congratulations, Red Wins");


            } else {

                showWinnerOnMenu("Congratulations, Blue Wins");


            }

            isWinner = true;


        }




    });

}



function showWinnerOnMenu(winner) {


    document.getElementById("current-player-color").remove();

    document.getElementById("current-player-text").remove();

    const col2 = document.getElementById("col2");


    const modal = document.getElementById("winnerBox");

    modal.style.display = "block";

    const winnerText = document.getElementById("winner-menu");

    winnerText.innerText = winner;

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }


}



// to update circle with red color
function setRedEntry(row, column, circularBox) {

    const cpEl = document.getElementById("current-player-text");

    cpEl.style.color = 'blue'

    cpEl.innerText = "Blue's Turn";

    gamePanel[row][column] = "red";

    console.log("GamePanel: " + gamePanel);

    circularBox.classList.add(gamePanel[row][column]);

    circularBox.style.backgroundColor = "#fe0000"

    currentPlayer = "blue";


    const cpColor = document.getElementById("current-player-color");

    cpColor.style.backgroundColor = "#0003df";


}


// to update circle with blue color
function setBlueEntry(row, column, circularBox) {


    const cpEl = document.getElementById("current-player-text");

    cpEl.style.color = 'red';
    console.log("GamePanel: " + gamePanel);


    cpEl.innerText = "Red's Turn";

    gamePanel[row][column] = "blue";

    circularBox.classList.add(gamePanel[row][column]);

    circularBox.style.backgroundColor = "#0003df ";

    currentPlayer = "red";

    const cpColor = document.getElementById("current-player-color");

    cpColor.style.backgroundColor = "#fe0000";


}


function invalidEntry() {


    return alert("This slot is already taken!");

}






function checkHorizontally() {


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (gamePanel[r][c] != 'empty') {
                const col1 = c, col2 = c + 1, col3 = c + 2, col4 = c + 3;
                if (gamePanel[r][col1] == gamePanel[r][col2] &&
                    gamePanel[r][col2] == gamePanel[r][col3] &&
                    gamePanel[r][col3] == gamePanel[r][col4]) {
                    matchedRow = r;
                    matchedCol = c;
                    return true;
                }
            }
        }
    }






}

function checkVertically() {


    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (gamePanel[r][c] != 'empty') {


                const row1 = r, row2 = r + 1, row3 = r + 2, row4 = r + 3;

                if (gamePanel[row1][c] == gamePanel[row2][c] &&
                    gamePanel[row2][c] == gamePanel[row3][c] &&
                    gamePanel[row3][c] == gamePanel[row4][c]) {

                    matchedRow = r;
                    matchedCol = c;
                    console.log("checkVertically")

                    return true;
                }
            }
        }
    }


}

function checkDiagonally() {

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (gamePanel[r][c] != 'empty') {

                const col1 = c, col2 = c + 1, col3 = c + 2, col4 = c + 3;
                const row1 = r, row2 = r - 1, row3 = r - 2, row4 = r - 3;


                if (gamePanel[row1][col1] == gamePanel[row2][col2] &&
                    gamePanel[row2][col2] == gamePanel[row3][col3] &&
                    gamePanel[row3][col3] == gamePanel[row4][col4]) {


                    matchedRow = r;
                    matchedCol = c;

                    console.log("checkDiagonally")


                    return true;
                }
            }
        }
    }


}


function checkReversDiagonally() {



    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {

            if (gamePanel[r][c] != 'empty') {
                const col1 = c, col2 = c + 1, col3 = c + 2, col4 = c + 3;
                const row1 = r, row2 = r + 1, row3 = r + 2, row4 = r + 3;

                if (gamePanel[row1][col1] == gamePanel[row2][col2] &&
                    gamePanel[row2][col2] == gamePanel[row3][col3] &&
                    gamePanel[row3][col3] == gamePanel[row4][col4]) {

                    matchedRow = r;
                    matchedCol = c;

                    console.log("GamePanel: " + gamePanel[r][c]);

                    console.log("checkReversDiagonally")


                    return true;
                }

            }
        }
    }





}




init();