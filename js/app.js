


const colorOptions=Array.from(document.getElementsByClassName("color-option"));// forEach가 필요해서 이 collection을 Array.from()으로 배열로 바꿈.
const color=document.getElementById("input-color");
const lineWidth=document.getElementById("line-width");
const canvas=document.querySelector("canvas");
const destroyBtn=document.getElementById("destroy-btn");
const eraserBtn=document.getElementById("erase-btn");
const fileInput=document.getElementById("file");
const textInput=document.getElementById("text");
const saveBtn=document.getElementById("save");
const brushValue=document.getElementById("brush-value")


const fillbtn=document.getElementById("fill-btn");
const drawbtn=document.getElementById("draw-btn");
const dfbtn=document.getElementById("draw_fill-btn");
const circlebtn=document.getElementById("circle-btn");

const font = document.getElementById("font");
const fontSize = document.getElementById("font-size");


const CANVAS_WIDTH=600;
const CANVAS_HEIGHT=600;
//그림그리기 위해 context 필요하다 기본적 붓이다.
//context를 자주 써야하기 때문에 쓰기쉬운 ctx로 정의
//2 option 있다 1번2D 2번webgl,bitmaprenderer 2번은 3D위한것
const ctx=canvas.getContext("2d"); 
//js에도 width,height정의하는 이유는
//
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth=lineWidth.value; 
ctx.lineCap="round";  //선의 끝이 둥글게 만든다.

//Painting mode
let mod=0;
let isPainting=false;

function onDrawMod(){
    mod=0;
    
}
function onFillMod(){
    mod=1;
    
}
function onDfMod(){
    mod=2;
    
}
function onCircleMod(){
    mod=3;
}




function onMove(event){
    if(mod===0||mod===2){
    if(isPainting){
        
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    
    ctx.moveTo(event.offsetX,event.offsetY);//isPainting이 꺼져있을 경우 마우스 만 움직이는것.
    }
    if(mod===3){
        if(isPainting){
        ctx.arc(startX, startY, event.offsetX - startX, 0, 2 * Math.PI);
        ctx.fill(); //draw circle
        return;
        }
    }
}
function startingPainting(event){ //마우스 눌렀을때 그리기 활성화
    isPainting=true;
    startX = event.offsetX;
    startY = event.offsetY;
    ctx.beginPath();
    
}
function cancelPanting(){//마우스 땠을때 그리기 비활성화
    isPainting=false;
    if(mod===2){
        ctx.fill();
    }
}

    function onCanvasClick(event){
        if(mod==1){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}




canvas.addEventListener("click",onCanvasClick); //채우기
drawbtn.addEventListener("click",onDrawMod);
fillbtn.addEventListener("click",onFillMod);
dfbtn.addEventListener("click",onDfMod);
circlebtn.addEventListener("click",onCircleMod);





// Painting --------------------------------------------------------



canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startingPainting);
canvas.addEventListener("mouseup",cancelPanting); 
canvas.addEventListener("mouseleave",cancelPanting)

//Line Width control-----------------------------------------------------------------

lineWidth.addEventListener("change",onLineWidthChange);//width조절기 변화감지
function onLineWidthChange(event){
    ctx.beginPath();
    ctx.lineWidth=event.target.value; // change라는 이벤트의 타겟의 value가 변화한거 넣어줌.
    brushValue.innerText = event.target.value;
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


canvas.addEventListener("click",onCanvasClick); //채우기

function onCanvasClick(event){
    if(mod===1){
    
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    
    }      
}
//eraser--------------------------------------------------------------
destroyBtn.addEventListener("click",onDestroyClick);
function onDestroyClick(event){
    ctx.save();
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.restore();  //추가한 이유는 디스트로이 버튼 후 fill을 바로 하면 실행되지않고 draw만 원래 색으로 실행됨.fill을 하려면 다시 한번 컬러를 지정해야하기때문에 원래 있던 색을 복구시킴.
}

eraserBtn.addEventListener("click",onEraserClick);

function onEraserClick(event){
    ctx.strokeStyle="white";
    mod=0;
    
    color.value="#ffffff";// erase모드 일 때 색에 혼동을 줄이기위해 표시되는 색을 white로 만듬.
    }

//meme maker--------------------------------------------------------------------------------------------------------------------------------------------------------------
fileInput.addEventListener("change",onFileChange);

function onFileChange(event){
    const file=event.target.files[0]; //이미지 파일 선택시 파일이 저장된곳
    const url=URL.createObjectURL(file);//이미지 파일의 url을 얻어낸다.브라우저에 만듬.
    const image= new Image()   //<img src=""> HTML 에 이것과 같다
    image.src=url;  
    image.onload=function(){ //이건 eventListner과 같다.
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT); //이미지 불러오고 배치하고 크기설정.
        fileInput.value=null; //새로운 이미지파일을 넣길 원할 수 있기때문.비워놓는다.
    }
}


// Add Text-------------------------------------------------------------
canvas.addEventListener("dblclick",onDoubleClick);
function onDoubleClick(event){
    const text=textInput.value;
    if(text!=="" ){
        ctx.save();
        mod=4;
        ctx.lineWidth=1;
        ctx.font = `${fontSize.value}px ${font.value}`;
        ctx.fillText(text,event.offsetX,event.offsetY);//dbclick한 곳에 택스트 그린다.
        ctx.restore();
    }
}


//Save Image-----------------------------------------------------------------------
saveBtn.addEventListener("click",onSaveClick);
function onSaveClick(event){
    const url=canvas.toDataURL(); //그린 데이터를 URL로 바꿔준다.
    const a=document.createElement("a"); //HTML a tag를 만들어 내고 
    a.href=url;    //a tag 링크 생성
    a.download="myDrawing.png";    //a tag 링크 다운로드
    a.click(); //a  링크 클릭 ->파일 다운로드
}

//draw circle---------------------------------------------------------



