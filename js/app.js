var isWinner = false;    // varible that will trigger to true as we find our winner

let emptyCircle = [];    // we will fill this array with "empty" string and leter append it into gamepanel

var gamePanel = [];      // this is an array of gamePanel[row][column], this will initialize with "emptyCircle"

var rows = 7;          // no. of rows

var columns = 7;       // no. of columns

var columnToTrack = rows - 1;     // no of tracks, this will help us to set initl Attributes to track filled columns or rows

var traking = [];      // we will set it value to total no of rows so we can check if triggers row is filled or not

var currentPlayer = "blue";     // first entry will go for blue


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

    var winner = document.createElement("h2");

    winner.id = "winner";

    document.body.appendChild(winner);


    var panel = document.createElement('div');

    panel.id = "gamePanel";

    var col1 = document.getElementById("col1");

    col1.appendChild(panel);





    //  these attributes are used to create the title element

    var sidebar = document.createElement("div");

    sidebar.id = "sidebar";


    var cpText = document.createElement("div");

    cpText.id = "c-p-t";

    cpText.innerText = "Blue's Turn";

    document.body.appendChild(cpText);

    document.getElementById("c-p-t").style.color = 'blue';




    //  these attributes are used to create color BOX

    var cpColor = document.createElement("div");

    cpColor.id = "c-p";

    cpColor.innerText.backgroundColor = "white";

    document.body.appendChild(cpColor);



    var col2 = document.getElementById("col2");

    col2.appendChild(cpText);

    col2.appendChild(cpColor);



    // this loop is to push tracking array

    for (var i = 0; i <= columnToTrack; i++) {

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

            let initialCircle = document.createElement("div");

            initialCircle.id = row.toString() + column.toString();

            initialCircle.classList.add("circle");

            document.getElementById("gamePanel").append(initialCircle);


            // this function will track every click on every cirlce 
            // after click on circle we will update the circle position
            // if it is valid. after update the circle position will be updated
            // the tracking array and remove our row from that column so when
            // next click on circle happens we can track if it is already filled 
            // or not

            initialCircle.addEventListener("click", function () {

                let trackers = this.id;

                let row = parseInt(trackers.charAt(0));

                let column = parseInt(trackers.charAt(1));

                row = traking[column];

                traking[column] < 0 ? invalidEntry() : null;

                let tile = document.getElementById(row.toString() + column.toString());


                // after the click if the user is red then we will update circle with red color
                // otherwise we will update circle with blue color.
                currentPlayer == "red" ? setRedEntry(row, column, tile) : setBlueEntry(row, column, tile);

                row--;

                traking[column] = row;


            }, false);

        }

    }

}




// to update circle with red color
function setRedEntry(row, column, tile) {

    var cpEl = document.getElementById("c-p-t");

    cpEl.style.color = 'blue'

    cpEl.innerText = "Blue's Turn";



    gamePanel[row][column] = "red";

    tile.classList.add(gamePanel[row][column]);

    tile.style.backgroundColor = "#fe0000"

    currentPlayer = "blue";


    var cpColor = document.getElementById("c-p");

    cpColor.style.backgroundColor = "#0003df";


}


// to update circle with blue color
function setBlueEntry(row, column, tile) {


    var cpEl = document.getElementById("c-p-t");

    cpEl.style.color = 'red';

    cpEl.innerText = "Red's Turn";





    gamePanel[row][column] = "blue";

    tile.classList.add(gamePanel[row][column]);

    tile.style.backgroundColor = "#0003df ";

    currentPlayer = "red";

    var cpColor = document.getElementById("c-p");

    cpColor.style.backgroundColor = "#fe0000";






}


// to check invalidEntry
function invalidEntry() {


    return alert("This slot is already taken!");

}



init();