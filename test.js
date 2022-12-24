/*

Notes: 
-- Issue with pause and start. At first start press, the default speed is 5000ms. It won't respond to slider input dynamically.
To change speed i found - Hit pause, change slider, then hit start to get he new speed. -- Will fix if have time
-- Next-> and reset button were not implemented in time.(Delete if you find time before turning in)

*/


var boardWidth =  600;
var boardHeight =  600;
var start = false;
var pause = false;
var board = [];
var row, col; // count of row/col

function squareSize(row, col){

    if(col > row){
        return boxsize = (boardWidth / col);
      }
      else {
        return boxsize = (boardWidth / row);
      }
      
}

function createBoard(row, col, arr = []){
    boxSize = 0;
    var paragraphElements = []; 
    row = parseInt(row);
    col = parseInt(col);

    boxSize = squareSize(row, col);
    var gridSizeCol = "repeat(" + col + "," + boxsize + "px" + ")";
    var gridSizeRow = "repeat(" + row + "," + boxsize + "px" + ")";
    
    if($(".grid-container").children().length > 0){
        $(".grid-container").empty();
        for (var i = 0; i < arr.length; i++) {
            
            $(".grid-container").append(arr[i])
        }
    }
    else{
        for (var i = 0; i < row; i++) {
            //var board = [];
            for (var j = 0; j < col; j++) {
              let newParagraphElement = $("<p></p>");
              board.push(newParagraphElement);
              $(newParagraphElement)
              .attr("class", "square" + i + j)
              .css({
                    border: "solid yellow 1px",
                    textAlign: "center",
                    margin: "0px",
                    "background-color": "rgb(128, 128, 128)" })
              .data("row", i)
              .data("col", j)
              .data ("alive", "no");
              $(".grid-container").append(newParagraphElement);
            }
            paragraphElements.push(board);
          }
    }
    
      $(".grid-container").css({
        display: "grid",
        width: "600px",
        height: "600px",
        //width: col * boxsize + "px",
        "grid-template-columns": gridSizeCol,
        "grid-template-rows": gridSizeRow,
        margin: "auto",
        "background-color": "rgb(128, 128, 128)",
        "justify-content": "center",
        "padding-right": "5%",
        "padding-left": "5%",
        border: "solid black 20px",
        "row-gap": "0px",
        "user-select":"none"
      });
}


// y = col (down arrow), x = row- >
function userInput(row, col){
    $(".input-button").click(function(){
      
      row = $('.rows').val()
      col= $('.columns').val();
      // Regex to search for non number inputs  \D+ = [^0-9], or any non number value.
      if(row.match(/\D+/) || col === /\D+/){
        alert("re-enter valid values(non characters)");
        $('.rows').val("")
        $('.columns').val("");
      }
      else{
        $(".grid-container").empty();
        createBoard(row, col);
      }
      return row,col;
    });
  };

  var gameTimer = parseInt($(".time-value").text())*100;

  //works with slider, but not with pause button. 
  /*
function gameTime(){
    $(document).on('input', '.time-slider', function() {
        $('.time-value').html( $(this).val() + "0" + "%");
      });
      //let time = $(".time-value").text();
      if(start)
      gameTimer = parseInt($(".time-value").text())*10;
      else{
        gameTimer = 900719925474;
      }
      console.log(gameTimer)
      console.log(typeof(gameTimer));
    beginAutomaton();
    setTimeout(gameTime,gameTimer);
}
*/


var gameTimeID = parseInt($(".time-value").text())*100;

function start_button(){
    $(document).on("click", ".start" ,function(){
        start = true;
        pause = false;
        
        if(start) {
            gameTimeID = setInterval(function(){
                
                console.log(parseInt($(".time-value").text()))
                gameTimer = parseInt($(".time-value").text())*100;
                console.log(gameTimer);
                beginAutomaton();
                start = true;
            //else{}
        },gameTimer);
            //beginAutomaton();
            $(".start").attr('style', "background-color: #2A7fff !important");
            $(".pause").attr('style', "background-color: #2A4E97 !important");
        }
        start = false;
    })
}

function pause_button(){
    $(document).on("click", ".pause" ,function(){
        pause = true;
        if(pause){
            clearInterval(gameTimeID)
            start = false;
            //console.log(gameTimer);
            $(".pause").attr('style', "background-color: rgb(137,15,13) !important");
            $(".start").attr('style', "background-color: #2A4E97 !important");
        }
    })
}

// y = row (down arrow), x = col- >
// y first, x 2nd
// i = x, j = y   // Bit confusing, refactor when i get a chance
// Function counts the number of alive cells around the current cell.
function count(x,y){
    row = $('.rows').val()
    col = $('.columns').val();
    let count =  0;
    for (let i = -1; i < 2; i++) {
        
        for (let j = -1; j < 2; j++) {
          let cols = (x + i + parseInt(col)) % parseInt(col);
          let rows = (y + j + parseInt(row)) % parseInt(row);
          if($(".square"+rows+cols).data("alive") == "yes" ){
              count++;
              if(j == 0 && i == 0){
                count--;    
            }
          }
        }
        
      }
      return count;
}




var sum = 0;
function beginAutomaton(){

    let cellCount = 0;
    var testGrid = $(".grid-container").children().clone()
    let position = 0            
    for(let x = 0; x < $('.columns').val(); x++){
        for(let y = 0; y < $('.rows').val(); y++){
            cellCount = count(y,x);

            if($(".square"+ x + y).data("alive") === "no" && cellCount == 3){
                testGrid[position] = $(testGrid[position]).css("background-color","rgb(52, 232, 49)").data("alive", "yes"); //make cell alive
            }
            else if ($(".square"+ x + y).data("alive") === "yes"  && (cellCount < 2 || cellCount > 3)){// less then 2, greater then 3, rule 1 and 3
                testGrid[position] = $(testGrid[position]).css({"background-color":"rgb(128, 128, 128)"}).data("alive", "no");
            }
            //Leaving this here. I assume the above was suppose to cover, but wasn't working when tested?
            // leave for now, cause removing was breaking things.
            else if($(".square"+ x + y).data("alive") === "yes" && (cellCount === 2 || cellCount === 3)){
                testGrid[position] = $(testGrid[position]).css("background-color","rgb(52, 232, 49)").data("alive", "yes"); //make cell alive
            }
            else{
                testGrid[position] = $(testGrid[position]).css({"background-color":"rgb(128, 128, 128)"}).data("alive", "no");
            }
            position++;
        }
    }
    row = $('.rows').val()
    col= $('.columns').val();
    
    createBoard(row, col,testGrid);
}



function start_game(){
    var boxSize; // boxsize = boardWidth / rol or col 
    var newGrid = []; // nothing? delete later
    selection();
    newGrid = createBoard(row, col)  // creates board,
    userInput(row,col);
    start_button();
    pause_button()
    
}


$(document).on('input', '.time-slider', function() {
    $('.time-value').html( $(this).val() + " seconds");
    //console.log("slider?");
  });

// Function to change the value of a square to alive/dead
// and changes the color.
function selection(){
    $("body").on("click","p[class^='square']", function(){
    if($(this).css("background-color") !== "rgb(52, 232, 49)") {
        $(this).css("background-color","rgb(52, 232, 49)");
        $(this).data ("alive", "yes");
    } else {
        $(this).css("background-color","rgb(128, 128, 128)");
        $(this).data ("alive", "no");
    }
    })
}

$(function(){
    start_game();
    $(".time-value").html(50 + "%");
    
  });