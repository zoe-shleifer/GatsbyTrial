
// sets up a rectangle object (there is a built in version which is apparently janky)
class MyRect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.contains = function (x, y) {
            return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
        };
        this.draw = function (ctx) {
            ctx.rect(this.x, this.y, this.width, this.height);
        };
    }
}

//starts an array of rectangles
let rectangles = [];
//goes through and sets coordinates of 9 rectangles (these will be the grid boxes)
for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
        rectangle = new MyRect(51+(i*50),75+(j*50),50,50)
        rectangles.push(rectangle);
        console.log(rectangle.x);
      }
}
//prints the rectangles
for(let i=0;i<rectangles.length;i++){
    console.log(rectangles[i]);
}
// draws grid
function grid(){
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    //v1
    ctx.moveTo(95,50);
    ctx.lineTo(95,200);
    //v2
    ctx.moveTo(145,50);
    ctx.lineTo(145,200);
    //h1
    ctx.moveTo(45,100);
    ctx.lineTo(195,100);
    //h2
    ctx.moveTo(45,150);
    ctx.lineTo(195,150);
    ctx.stroke();
}
// methods to draw x's and o's takes (x,y) where each are 0,1,2
function ex(x, y){

    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
        ctx.font = "48px serif";
        ctx.fillText("X", 50+(50*x), 95+(50*y));
    }

function o(x, y){

    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
        ctx.font = "48px serif";
        ctx.fillText("O", 50+(50*x), 95+(50*y));
}
//this method is an ass. it basically goes through and makes a button for each of the boxes
function buildBtns() {
    for (var i = 0; i < rectangles.length; i++){
      var btn = document.createElement("button"); //creates button
      document.body.appendChild(btn); // puts button in body of html
      btn.setAttribute("id",i.toString()+"btn") //gives the button id : ibtn (where i is for loop variable)
      document.getElementById(i.toString()+"btn").style.padding = '25px 25px'; //sets size
      document.getElementById(i.toString()+"btn").style.position = 'absolute'; // says to give absolute coordinates
      document.getElementById(i.toString()+"btn").style.background= 'none'; //no background
      document.getElementById(i.toString()+"btn").style.border = 'none'; //no border
      document.getElementById(i.toString()+"btn").style.left = rectangles[i].x.toString()+'px'; // x pos
      document.getElementById(i.toString()+"btn").style.top = rectangles[i].y.toString()+'px'; // ypos
      document.getElementById(i.toString()+"btn").onclick = function() { squareClicked(this.id);}
    }
}
 var turn = 0;
 var squVals = new Array(9).fill(0);
 
function checkWin(num){
    var checkAr = [];
    for(let i =0; i<9;i++){
        if(Math.floor(i/3)== Math.floor(num/3) && squVals[num] == squVals[i] && i!=num){
            checkAr.push(i);
        }
    }
    if(checkAr.length == 2){
        checkAr.push[num];
        console.log("player "+squVals[num]+" wins!");
        return;
    }
    else{
        checkAr=[];
    }
    for(let i =0; i<9;i++){
        if(num%3 == i%3 && squVals[num] == squVals[i] && i!=num){
            checkAr.push(i);
        }
    }
    if(checkAr.length == 2){
        checkAr.push[num];
        console.log("player "+squVals[num]+" wins!");
        return;
    }
    else{
        checkAr=[];
    }
    if(squVals[num]==squVals[4]){
        for(x=0; x<2; x++){
            var s1, s2;
            if(x==0){
                s1 = 8;
                s2 = 0;
            } 
            else {
              s1 = 6;
              s2 = 2;
            }
            if(squVals[s1] == squVals[num] && squVals[s2] == squVals[num]){
                console.log("Player "+squVals[num]+" wins!")
            } else {
                return;
            }
        }
    }
    else {
        return;
    }
}

function checkDraw(){
    var draw = true;
    for(let i=0;i<10;i++){
        if(squVals[i] == 0){
            draw = false;
            break;
        }
        if(draw){
                console.log("DRAW!")
            }
      }
    }
function squareClicked(square){
    document.getElementById(square).setAttribute('disabled','true');
    turn++;
    turn %=2;
    var squNum = parseInt(square);
    console.log(squNum);
    if(turn == 0){
        ex(Math.floor(squNum/3),squNum%3);
        squVals[squNum] = 1;
    }
    else{
        o(Math.floor(squNum/3),squNum%3);
        squVals[squNum] = 2;
    }
    checkWin(squNum);
    checkDraw();
}
buildBtns();
grid();