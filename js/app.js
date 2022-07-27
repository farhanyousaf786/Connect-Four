let isWinner = false;    // varible that will trigger to true as we find our winner

let emptyCircle = [];    // we will fill this array with "empty" string and leter append it into gamepanel

let gamePanel = [];      // this is an array of gamePanel[row][column], this will initialize with "emptyCircle"

const rows = 7;          // no. of rows

const columns = 7;       // no. of columns

const columnToTrack = rows - 1;     // no of tracks, this will help us to set initl Attributes to track filled columns or rows

const traking = [];      // we will set it value to total no of rows so we can check if triggers row is filled or not

let currentPlayer = "blue";     // first entry will go for blue

let matchedRow = 0;

let matchedCol = 0;


//init is a defual function that run when screen load.
//The inner functions in init are the functionswhich control
//our defual values like # of columns or empty 2d array
//along with empty circles.

function init() {

    setInitialAttributes();

    setEmptyCirclesForJS();

    setEmptyPanelForHtml();

}



function setInitialAttributes() {


    //insert a number into traking array which will be
    // eual to the total # of rows in panel

    document.body.style.textAlign = "center";

    const winner = document.createElement("h2");

    winner.id = "winner";

    document.body.appendChild(winner);


    const panel = document.createElement('div');

    panel.id = "gamePanel";

    const col1 = document.getElementById("col1");

    col1.appendChild(panel);





    //  these attributes are used to create the title element

    const sidebar = document.createElement("div");

    sidebar.id = "sidebar";


    const cpText = document.createElement("div");

    cpText.id = "c-p-t";

    cpText.innerText = "Blue's Turn";

    document.body.appendChild(cpText);

    document.getElementById("c-p-t").style.color = 'blue';




    //  these attributes are used to create color BOX

    const cpColor = document.createElement("div");

    cpColor.id = "c-p";

    cpColor.innerText.backgroundColor = "white";

    document.body.appendChild(cpColor);




    const col2 = document.getElementById("col2");

    col2.appendChild(cpText);

    col2.appendChild(cpColor);



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

function setEmptyPanelForHtml() {

    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            const initialCircle = document.createElement("div");

            initialCircle.id = row.toString() + column.toString();

            initialCircle.classList.add("circle");

            document.getElementById("gamePanel").append(initialCircle);


            // this function will track every click on every cirlce 
            // after click on circle we will update the circle position
            // if it is valid. after update the circle position will be updated
            // the tracking array and remove our row from that column so when
            // next click on circle happens we can track if it is already filled 
            // or not



            // initialCircle.addEventListener("click", function () {



            //     while (isWinner) {

            //         return alert("Game eneded!");

            //     }


            //     let trackLocation = initialCircle.id;

            //     let row = parseInt(trackLocation.charAt(0));

            //     let column = parseInt(trackLocation.charAt(1));

            //     row = traking[column];

            //     row < 0 ? invalidEntry() : null;

            //     let circularBox = document.getElementById(row.toString() + column.toString());


            //     // after the click if the user is red then we will update circle with red color
            //     // otherwise we will update circle with blue color.
            //     currentPlayer == "red" ? setRedEntry(row, column, circularBox) : setBlueEntry(row, column, circularBox);

            //     row--;

            //     traking[column] = row;


            //     if (checkDiagonally() == true ||
            //         checkReversDiagonally() == true ||
            //         checkHorizontally() == true ||
            //         checkVertically() == true) {

            //         let winner = document.getElementById("winner");

            //         if (gamePanel[matchedRow][matchedCol] == "red") {
            //             winner.innerText = "Red Wins";
            //         } else {
            //             winner.innerText = "Blue Wins";
            //         }
            //         isWinner = true;
            //         return alert("Game eneded!");

            //     }


            // }, false);

        }

    }

          // this function will track every click on every cirlce 
            // after click on circle we will update the circle position
            // if it is valid. after update the circle position will be updated
            // the tracking array and remove our row from that column so when
            // next click on circle happens we can track if it is already filled 
            // or not



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

        let circularBox = document.getElementById(row.toString() + column.toString());


        // after the click if the user is red then we will update circle with red color
        // otherwise we will update circle with blue color.
        currentPlayer == "red" ? setRedEntry(row, column, circularBox) : setBlueEntry(row, column, circularBox);

        row--;

        traking[column] = row;


        if (checkDiagonally() == true ||
            checkReversDiagonally() == true ||
            checkHorizontally() == true ||
            checkVertically() == true) {

            let winner = document.getElementById("winner");

            if (gamePanel[matchedRow][matchedCol] == "red") {
                winner.innerText = "Red Wins";
            } else {
                winner.innerText = "Blue Wins";
            }
            isWinner = true;
            return alert("Game eneded!");

        }




    });

}




// to update circle with red color
function setRedEntry(row, column, circularBox) {

    var cpEl = document.getElementById("c-p-t");

    cpEl.style.color = 'blue'

    cpEl.innerText = "Blue's Turn";

    gamePanel[row][column] = "red";

    console.log("GamePanel: " + gamePanel);

    circularBox.classList.add(gamePanel[row][column]);

    circularBox.style.backgroundColor = "#fe0000"

    currentPlayer = "blue";


    var cpColor = document.getElementById("c-p");

    cpColor.style.backgroundColor = "#0003df";


}


// to update circle with blue color
function setBlueEntry(row, column, circularBox) {


    var cpEl = document.getElementById("c-p-t");

    cpEl.style.color = 'red';
    console.log("GamePanel: " + gamePanel);


    cpEl.innerText = "Red's Turn";

    gamePanel[row][column] = "blue";

    circularBox.classList.add(gamePanel[row][column]);

    circularBox.style.backgroundColor = "#0003df ";

    currentPlayer = "red";

    var cpColor = document.getElementById("c-p");

    cpColor.style.backgroundColor = "#fe0000";






}


function invalidEntry() {


    return alert("This slot is already taken!");

}






function checkHorizontally() {


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {

            if (gamePanel[r][c] != 'empty') {

                var col1 = c, col2 = c + 1, col3 = c + 2, col4 = c + 3;

                if (gamePanel[r][col1] == gamePanel[r][col2] && gamePanel[r][col2] == gamePanel[r][col3] && gamePanel[r][col3] == gamePanel[r][col4]) {

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


                var row1 = r, row2 = r + 1, row3 = r + 2, row4 = r + 3;

                if (gamePanel[row1][c] == gamePanel[row2][c] && gamePanel[row2][c] == gamePanel[row3][c] && gamePanel[row3][c] == gamePanel[row4][c]) {

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

                var col1 = c, col2 = c + 1, col3 = c + 2, col4 = c + 3;
                var row1 = r, row2 = r - 1, row3 = r - 2, row4 = r - 3;


                if (gamePanel[row1][col1] == gamePanel[row2][col2] && gamePanel[row2][col2] == gamePanel[row3][col3] && gamePanel[row3][col3] == gamePanel[row4][col4]) {



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
                var col1 = c, col2 = c + 1, col3 = c + 2, col4 = c + 3;
                var row1 = r, row2 = r + 1, row3 = r + 2, row4 = r + 3;

                if (gamePanel[row1][col1] == gamePanel[row2][col2] && gamePanel[row2][col2] == gamePanel[row3][col3] && gamePanel[row3][col3] == gamePanel[row4][col4]) {

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