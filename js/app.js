const canvas=document.querySelector("canvas");
//그림그리기 위해 context 필요하다 기본적 붓이다.
//context를 자주 써야하기 때문에 쓰기쉬운 ctx로 정의
//2 option 있다 1번2D 2번webgl,bitmaprenderer 2번은 3D위한것
const ctx=canvas.getContext("2d"); 

//js에도 width,height정의하는 이유는
//
canvas.width=800;
canvas.height=800;

//canvas의 좌표 시스템
ctx.moveTo(50,50);//붓이동
ctx.lineTo(150,50);//줄긋기
ctx.lineTo(150,150);
ctx.lineTo(50,150);
ctx.lineTo(50,50);
ctx.fill();


