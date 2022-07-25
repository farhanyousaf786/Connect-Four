const squares = document.querySelectorAll('.grid div')

const result = document.querySelector('#result')

const displayCurrentPlayer = document.querySelector('#current-player')

let currentPlayer = 1



for (let i = 0; i < squares.length; i++) {




    squares[i].onclick = () => {

        // if the squre beow your current squre is taken, you can go ontop of it


        if (squares[i + 7].classList.contains('taken')) {

            if (currentPlayer == 1) {


                squares[i].classList.add('taken')

                squares[i].classList.add('player-one')

                currentPlayer = 2

                displayCurrentPlayer.innerHTML = currentPlayer


            } else if (currentPlayer == 2) {


                squares[i].classList.add('taken')

                squares[i].classList.add('player_two')

                currentPlayer = 1

                displayCurrentPlayer.innerHTML = currentPlayer

            } else {

                alert('Can not go there..!!')

            }
        }


    }

}

function createTitleText() {

    let txt = document.getElementById("players");

    txt.style.textAlign = "center";

    console.log(txt.innerText)


}




const container = document.getElementById("container");



 container.style.alignContent = "center";

function makeRows(rows, cols) {

    container.style.setProperty('--grid-rows', rows);

    container.style.setProperty('--grid-cols', cols);

    for (c = 0; c < (rows * cols); c++) {

        let cell = document.createElement("div");

       // cell.innerText = (c + 1);


        container.appendChild(cell).className = "grid-item";

     
        cell.onclick = () => {

            console.log("Grid Item Clicked " + cell);

            cell.style.backgroundColor = "#AA0000"



        }
    };
};




initFuntion();

function initFuntion() {

    createTitleText();
    makeRows(7, 7);


}





// function createTable() {



//     var myTableDiv = document.getElementById("gameBox");


//     myTableDiv.style.justifyContent = "center";

//     myTableDiv.style.display = "flex";

//     var table = document.createElement('table');



//     table.border = '1';

//     table.style.textAlign = 'center';

//     var tableBody = document.createElement('tableBody');



//     table.appendChild(tableBody);



//     for (var i = 0; i < 7; i++) {

//         var tr = document.createElement('TR');


//         tableBody.appendChild(tr);

//         for (var j = 0; j < 7; j++) {

//             var td = document.createElement('TD');

//             td.width = '50';

//             td.height = '30';


//             td.style.backgroundColor = "#AA0000";

//             td.onclick = function () {

//                // console.log(i);
//             }


//             // td.style.backgroundColor = "#AA0000";

//             // td.appendChild(document.createTextNode("Cell " + i + "," + j));

//             tr.appendChild(td);


//         }


//     }

//     myTableDiv.appendChild(table);

// }





