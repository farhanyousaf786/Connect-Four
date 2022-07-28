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
const columnToTrack = 7;

// this array will store counting of occopied entries in our panel
const trackingFilledBoxRow = [];

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

    setAndListenEmptyCircleHtml();

    actioListnerForEachSelection();

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
        create a new div element to show
        current player's color.
    */

    const currentPlayerColor = document.createElement("div");

    currentPlayerColor.id = "current-player-color";

    currentPlayerColor.innerText.backgroundColor = "white";


    /* 
      create a new div element to show
      current player's name if it is blue or red.
    */

    const currentPlayerText = document.createElement("div");

    currentPlayerText.id = "current-player-text";

    currentPlayerText.innerText = "Blue's Turn";

    currentPlayerText.style.fontSize = "20px";

    currentPlayerText.style.color = "blue";


    /*
    Append both element currentPlayerColor & currentPlayerText into
    an exisitng element name col2
    */
    const col2 = document.getElementById("col2");

    col2.appendChild(currentPlayerColor);

    col2.appendChild(currentPlayerText);




    /* 
    this loop is to push element in trackingFilledBoxRow array
    it will fill array with 6 to each element. because when we 
    track row's gravity later, we will start from 0-6 that make it 7.
    */

    for (let i = 0; i <= columnToTrack - 1; i++) {

        trackingFilledBoxRow.push(columnToTrack - 1);

    }

    console.log("traking: " + trackingFilledBoxRow);

}



// set an empty entry in 2d array and then push each entry row in gamePanel 
function setEmptyCirclesForJS() {

    for (let row = 0; row < rows; row++) {


        // set it to empty after every ittration because we want to add onlt 7
        // empty slots on each entry of gamePanel to make it 2d
        emptyCircle = [];

        for (let column = 0; column < columns; column++) {

            emptyCircle[column] = "empty";
        }

        //here we push 7 empty element for each row and colum
        gamePanel.push(emptyCircle);

    }

}



// set an empty circle in 2d array and then push each entry row in gamePanel 

function setAndListenEmptyCircleHtml() {

    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            // this is an empty circle we will update it with respect to the
            // gamePanel and trackingFilledBoxRow
            const initialCircle = document.createElement("div");


            // set every id for each element of game panel different 
            // and the id will be the row and col of at current point
            initialCircle.id = row.toString() + column.toString();

            initialCircle.classList.add("circle");

            document.getElementById("gamePanel").append(initialCircle);

        }

    }


}



// this is the most important function of our app
// this function listen every click on every empty
// circle and then track it through the id and pass
// id to check if circle is already filled or not
function actioListnerForEachSelection() {

    if (isWinner == false) {

        const target = document.querySelector("div");

        target.addEventListener("click", (e) => {

            console.log("target = " + e.target.id);

            let row = e.target.id.charAt(0);

            let column = e.target.id.charAt(1);

            row = trackingFilledBoxRow[column];

            row < 0 ? invalidEntry() : null;

            const circularBox = document.getElementById(row.toString() + column.toString());


            // after the click if the user is red then we will update circle with red color
            // otherwise we will update circle with blue color.
            currentPlayer == "red" ? setRedEntry(row, column, circularBox) : setBlueEntry(row, column, circularBox);

            row--;

            trackingFilledBoxRow[column] = row;

            console.log("traking: " + trackingFilledBoxRow);

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
}

function showWinnerOnMenu(winner) {


    document.getElementById("current-player-color").remove();

    document.getElementById("current-player-text").remove();

    const menuBox = document.getElementById("content-menu");

    menuBox.style.display = "block";

    const winnerText = document.getElementById("menu");

    winnerText.innerText = winner;

    // Get the <span> element that closes the menuBox
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the menuBox
    span.onclick = function () {
        menuBox.style.display = "none";
    }


}



// to update circle with red color
function setRedEntry(row, column, circularBox) {

    const cpEl = document.getElementById("current-player-text");

    cpEl.style.color = 'blue'

    cpEl.innerText = "Blue's Turn";

    gamePanel[row][column] = "red";

    circularBox.classList.add(gamePanel[row][column]);

    circularBox.style.backgroundColor = "#fe0000"

    currentPlayer = "blue";


    const currentPlayerColor = document.getElementById("current-player-color");

    currentPlayerColor.style.backgroundColor = "#0003df";


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

    const currentPlayerColor = document.getElementById("current-player-color");

    currentPlayerColor.style.backgroundColor = "#fe0000";


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