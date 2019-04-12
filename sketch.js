var globalStateBAD = 0;

function setup() {

}

function draw() {
}




function fieldInit(xy) {
    var [x,y] = xy

    var cells = x*y;
    console.log(`generating grid ${x} by ${y}`)
    return fieldPop([x, y, cells])
}

function fieldPop (init)
{ var field = []; 
    for (var i=0;i<init[2];i++)
{(Math.random())>0.83 ? field.push(0) : field.push(1) }

return [init, field]
}

function getPos(cell, init)
{ 
    //console.log(`${cell} x: ${cell%init[0]},${Math.floor(cell/init[1])}`)
    return [cell%init[0],Math.floor(cell/init[1])]
}

function getCell(pos,init){
    return [(pos[1]*init[0]), //times y position by number of x cells
    pos[0]] // and add x cell
}

function getnCells(cell,init) {
    var pos = getPos(cell,init)
    var nCells = [null,null,null,null,null,null,null,null]
    // index is  N   NE    E   SE  S    SW   W    NW
    atWall = (pos,init) => [(pos[1]==0),(pos[0]==init[0]-1),(pos[1]==init[1]-1),(pos[0]==0)] 
    var wall = atWall(pos,init) //  walls NORTH, EAST, SOUTH, WEST
    //console.log(wall)
nCells[0] = (wall[0]) ? null : cell-init[0]; //North is equivalent to the cell array - the amount of cells on the x axis
nCells[1] = (wall[0]||wall[1]) ? null: cell-init[0]+1; //NE is the cell to the right of North
nCells[2] = (wall[1]) ? null : cell+1; // E is cell to the right
nCells[3] = (wall[1] ||wall[2]) ? null: cell+init[0]+1; //SE We add init 0 rather than subbing it then add one
nCells[4] = (wall[2]) ? null: cell+init[0];// S Same with no add
nCells[5] = (wall[2]||wall[3]) ? null: cell+init[0]-1; // SW
nCells[6] = (wall[3])? null: cell-1, // W
nCells[7] = (wall[3]||wall[0])? null : cell-init[0]-1 //NW
//console.log(nCells)
return nCells;
}

function countnCells (nCells, field) {
    var count = 0
for (nCell of nCells) { if (nCell!=null) {
    if (field[nCell]===1){count++}}
}
return count
}

function cellLogic(count) {
   return count>3||count<2 ?  0 : count==2 ? null : 1
}

function cellStateChange(existing, logic){
 return logic===0 ? 0 : logic==1 ? 1 : existing;
}

function fieldUpdate(initField) {
    //this is a test - console.log(initField)
    var [init,field] = initField;
    var newField =[]
  for (cell in field) {
    newField.push(cellStateChange(field[cell],cellLogic(countnCells(getnCells(cell,init),field))))
}
//not a test, used for display
console.log(consoleDisplayField([init,newField]))
console.log("xXx") // take this out
globalStateBAD++ // take this out
checkForGlobalDeath(newField) ? console.log(`global death at ${new Date().getTime()} after ${globalStateBAD} cycles`) :  fieldUpdate([init,newField])
return false;
}

function checkForGlobalDeath(field)
{return  ((field.indexOf(1)===-1) ? true : false)}

function consoleDisplayField(initField)
{ 
 var [init,field] = initField;
 var visArray = []
 for (celli in field) {
    celli%init[0]===0&&celli>0 ? visArray.push('\n') : "shouldn't be here"
     visArray.push(field[celli]===1 ? "▣" : "▢")
     }
return visArray.join("")

}


//fieldUpdate([[5,5,25,0],[0,0,1,1,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,0,0,1,0]])
fieldUpdate(fieldInit([66,22]))
