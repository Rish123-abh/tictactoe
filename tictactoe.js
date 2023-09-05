const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newgamebtn=document.querySelector(".btn");

let currentplayer;
let gridgame;
const winningpositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

];
// below function will initialese the initial condition for game
function initgame(){
    currentplayer="X";
    gridgame=[" "," "," "," " ," "," "," "," "," "];
    gameinfo.innerText=`Current Player-${currentplayer}`;
    // UI pe boxes ko empty karna padega 
    boxes.forEach((box,index)=>{
        box.innerText=" ";
        boxes[index].style.pointerEvents="all";
        // Initialise all boxes with original css propertie again
        box.classList=`box box${index+1}`; 
    })

}
function checkGameover(){
    let answer=" ";
    winningpositions.forEach(positions=>{
        // below condition shows all boxes are non empty and have same value 
        if((gridgame[positions[0]]!==" "||gridgame[positions[1]]!==" "||gridgame[positions[2]]!==" ") &&
         (gridgame[positions[0]]===gridgame[positions[1]])&&(gridgame[positions[1]]===gridgame[positions[2]])){
            if(gridgame[positions[0]]==="X"){
                // Winner is x
                answer="X";
            }
            else{
                answer="O";
            }

            boxes.forEach(box=>{
                box.style.pointerEvents="none";
            })
                
            boxes[positions[0]].classList.add("win");
            boxes[positions[1]].classList.add("win");
            boxes[positions[2]].classList.add("win");
        }
    });
    // below condition shows someone is winner
    if(answer!==" "){
        gameinfo.innerText=`Winner Player-${answer}`;
        newgamebtn.classList.add("active");
        return;
    }
    // Below shows koi winner nahi hai matlab tied ho gya
    let fillcount=0;
    gridgame.forEach(boxes=>{
        if(boxes!==" "){
            fillcount++;
        }
    });
    if(fillcount===9){
        gameinfo.innerText="GameTied!";
        newgamebtn.classList.add("active");
    }
}

initgame();
function swap(){
    if(currentplayer==="X"){
        currentplayer="O";
    }
    else{
        currentplayer="X";
    }
    // UI update
    gameinfo.innerText=`Current Player-${currentplayer}`;
}
function handleclick(index){
    if(gridgame[index]===" "){
        gridgame[index]=currentplayer;
        boxes[index].innerText=currentplayer;
        boxes[index].style.pointerEvents="none";
        // value chnage karni hai input ke baad  
        swap();
        // check karna ahai jeetab to nhi
        checkGameover();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>
    {
        handleclick(index);
    }
    )}
);
newgamebtn.addEventListener("click",initgame);