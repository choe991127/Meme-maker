const colorOptions=Array.from(document.getElementsByClassName("color-option"));
const color=document.getElementById("color");
const lineWidth=document.getElementById("line-width");
const canvas=document.querySelector("canvas");
const modeBtn=document.getElementById("mode-btn");
const destroyBtn=document.getElementById("destroy-btn");
const eraserBtn=document.getElementById("erase-btn");

const CANVAS_WIDTH=800;
const CANVAS_HEIGHT=800;
//그림그리기 위해 context 필요하다 기본적 붓이다.
//context를 자주 써야하기 때문에 쓰기쉬운 ctx로 정의
//2 option 있다 1번2D 2번webgl,bitmaprenderer 2번은 3D위한것
const ctx=canvas.getContext("2d"); 

//js에도 width,height정의하는 이유는
//
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth=lineWidth.value;
// Painting --------------------------------------------------------
let isPainting=false;
function onMove(event){
    
    if(isPainting){
        
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);//isPainting이 꺼져있을 경우 마우스 만 움직이는것.
}

function startingPainting(){ //마우스 눌렀을때 그리기 활성화
    isPainting=true;
    ctx.beginPath();
    
}
function cancelPanting(){//마우스 땠을때 그리기 비활성화
    isPainting=false;
}

canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startingPainting);
canvas.addEventListener("mouseup",cancelPanting); 
canvas.addEventListener("mouseleave",cancelPanting)

//Line Width control-----------------------------------------------------------------

lineWidth.addEventListener("change",onLineWidthChange);//width조절기 변화감지
function onLineWidthChange(event){
    ctx.beginPath();
    ctx.lineWidth=event.target.value; // change라는 이벤트의 타겟의 value가 변화한거 넣어줌.
    
}

//Color--------------------------------------------------------------

color.addEventListener("change",onColorChange);
function onColorChange(event){
    
    ctx.strokeStyle=event.target.value;
    ctx.fillStyle=event.target.value;
}
colorOptions.forEach(color=>color.addEventListener("click",onColorCLick));
function onColorCLick(event){
    const colorValue=event.target.dataset.color;
    ctx.strokeStyle=colorValue;
    ctx.fillStyle=colorValue;  //data-color 라는 요소를 만들어 HTML에 저장해놨기 때문에 event.target.dataset.color 로 가져온다.
    color.value=colorValue;

}

//fill color------------------------------------------------------------
let isFilling=false;

function onModeClick(event){
    if(isFilling){
        isFilling=false
        modeBtn.innerText="Fill"
    }else{
        isFilling=true
        modeBtn.innerText="Draw"
    }
}
modeBtn.addEventListener("click",onModeClick);

canvas.addEventListener("click",onCanvasClick); //채우기
function onCanvasClick(event){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

//eraser--------------------------------------------------------------
destroyBtn.addEventListener("click",onDestroyClick);
function onDestroyClick(event){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

eraserBtn.addEventListener("click",onEraserClick);

function onEraserClick(event){
    ctx.strokeStyle="white";
    isFilling=false;
    modeBtn.innerText="Fill";
    
    }