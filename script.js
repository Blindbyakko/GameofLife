/*

Tried to make a slider. it wasn't working. Value is there, but it's hidden somewhere and i dont' know why
 
*/


var paragraphElements = [];
var row, col;
//row = 10;
//col = 10;
const five = 10;
var boxsize = 0;
//var gridSizeCol = "repeat(" + col + "," + boxsize + "px" + ")";
//var gridSizeRow = "repeat(" + row + "," + boxsize + "px" + ")";
var fontSize = 18 + "px"

//$('p').css({"background": "black",
//            "height": "50px",
//           "width": "50px",
//});
let tmp = [];
//let banner = ("<header>Game of life</header>")
var boardWidth =  600;
var boardHeight =  600;



function createBoard(row, col) {
  boxsize = 0;
  console.log("col is:" + col + " row is:" + row);
  console.log(col > row);
  console.log(typeof(row) + "row")
  console.log(typeof(col)+ "col")
  row = parseInt(row);
  col = parseInt(col);

  if(col > row){
    console.log("col higher?");
    boxsize = (boardWidth / col);
  }
  else {
    console.log("row higher");
    boxsize = (boardWidth / row);
  }
  console.log("boxsize = " + boxsize);
  
  var gridSizeCol = "repeat(" + col + "," + boxsize + "px" + ")";
  var gridSizeRow = "repeat(" + row + "," + boxsize + "px" + ")";  
  for (var i = 0; i < row; i++) {
    var board = [];
    for (var j = 0; j < col; j++) {
      let newParagraphElement = $("<p></p>");
      board.push(newParagraphElement);
      $(newParagraphElement)
      .attr("class", "square")
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



function userInput(){
  $(".input-button").click(function(){
    console.log("row: " + row)
    console.log("col: " + col)
    
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
      //$(".input-container").hide();
    }
  });
  
};
//userInput();
//changeColor();
function changeColor(){
  $(".square").on("click",".grid-container", function(){
    console.log("color?")
    if($(this).css("background-color") !== "rgb(52, 232, 49)") {
        console.log("green?")
        $(this).css("background-color","rgb(52, 232, 49)");
    } else {
        console.log(" no green?")
        $(this).css("background-color","rgb(128, 128, 128)");
    }
});
}

  $(document).on('input', '.time-slider', function() {
    $('.time-value').html( $(this).val() + "%");
    console.log("slider?");
  });


  var start = false;
  // Wrap this around a timer function, so that it constantly triggers
  // after a specific time as long as pause isn't triggered
$(document).on("click", ".start", function(){
  start = true;
  $(".grid-container p").each(function()
  {
    console.log("These are Rows and Colomns: " + "[" + $(this).data('row')+ "," + $(this).data('col') + "]" + "Alive:" + $(this).data('alive'));
    if($(this).data('alive') === "yes"){
      $(this).css({
        "background-color": "red",
      })
    }
    
  });
});

var blinkID = setInterval(function(){
  if (start === true){
    start_game();
  }
  /*
  if(pause === true){
    pause_game();
    start = false;
  }*/
},10000);


// function seems to be working. will test further later. currently
// it's blinking

//pause function shouldn't be an issue i th ink. but how i read input while in while loop? maybe put the pause button in the while loop? can i read it while not in the while look? 
function checkRules(x,y){

  $(".grid-container p").each(function(){
    if($(this).data('row') === x && $(this).data('col') === y){
      
    }
  });
}



function start_game(){
  setTimeout(function(){
    if(start === true){
      $(".grid-container p").each(function(){
        //console.log("These are Rows and Colomns: " + "[" + $(this).data('row')+ "," + $(this).data('col') + "]" + "Alive:" + $(this).data('alive'));
        if($(this).data('alive') === "yes"){
          $(this).css({
            "background-color": "red",
        }).data('alive', "no")
        let x = $(this).data('row');
        let y = $(this).data('col');
        checkRules(x,y);
        console.log("[" + x + "," + y  + "]");
        } 
        else if($(this).data('alive') === "no"){
          $(this).css({
            "background-color": "black",
        }).data('alive', "yes")
        }
    
      });
    }
  })
}


// Click function to turn on or off selected grids. 

// Requires adding in a hold down feature
// Change these to variables later
//  rgb(14, 196, 126) = a light green
// 52,232,49
//  rgb(128, 128, 128) = gray
// **** Currently global ****

$("body").on("click",".square", function(){
  console.log("color?")
  if($(this).css("background-color") !== "rgb(52, 232, 49)") {
      console.log("green?")
      $(this).css("background-color","rgb(52, 232, 49)");
      $(this).data ("alive", "yes");
  } else {
      console.log(" no green?")
      $(this).css("background-color","rgb(128, 128, 128)");
      $(this).data ("alive", "no");
  }
})



function main(){
  userInput();
  //createBoard(row, col);
  $(".time-value").html(100+"%");

  
}    

$(function(){
  main();

});

/*
$(".grid-container p").each(function()
{
    console.log("These are Rows and Colomns: " + "[" + $(this).data('row')+ "," + $(this).data('col') + "]");
    
});
*/