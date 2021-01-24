const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorclick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        fillinsg = false;
        mode.innerText = "fill"
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]"; // download = a 태그의 attribute
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // canvas.addEventListener("contextmenu", handleCM); - 이미지 저장 등의 기능 방지.
}

/*
getContext() - 픽셀에 접근.
*/

// 색상 변경
Array.from(colors).forEach(color => color.addEventListener("click", handleColorclick));

// 브러쉬 크기 변경
if(range){
    range.addEventListener("input", handleRangeChange);
}

// canvas 채우기
if(mode){
    mode.addEventListener("click", handleModeClick);
}

// 저장
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}