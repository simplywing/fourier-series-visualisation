let mainCanvas = document.getElementById("mainCanvas");
mainCanvas.width  = window.innerWidth;
mainCanvas.height = window.innerHeight;


let ctx = mainCanvas.getContext("2d");
let ch = mainCanvas.height;
let cw = mainCanvas.width;


scope.numArms = 15;
scope.timeDelta = 5;
scope.type = 1;
scope.initialRadius = 150;
scope.mainCircleXOffset = 250;
scope.modulation = "0";


let time = 0;
let waveArray = [];
let waveXOffsetFromCircle = scope.initialRadius + 70;
let maxWaveArrayLenght = window.innerWidth - scope.mainCircleXOffset - waveXOffsetFromCircle;


function setup(){
    ctx.font = '10px sans-serif';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.translate(scope.mainCircleXOffset, ch / 2);
}

function draw(){
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(-scope.mainCircleXOffset, -ch / 2, cw, ch);

    let x = 0;
    let y = 0;

    for(let i = 0; i < scope.numArms; i++){
        let n = 0;
        let prevx = 0;
        let prevy = 0;
        let radius = 0;

        if(scope.type == 1){
            n = i * 2 + 1;
            radius = scope.initialRadius * (4 / (n * Math.PI));   

            prevx = x;
            prevy = y;

            x += radius * Math.cos(n * time);
            y += radius * Math.sin(n * time);  
        }
        else if(scope.type == 2){
            n = i + 1;   
            radius = scope.initialRadius * (4 / (n * Math.PI));
            prevx = x;
            prevy = y;

            x += radius * Math.cos(n * time);
            y += radius * Math.sin(n * time);          
        }
        else if(scope.type == 3){
            n = i * 2 + 1;
            radius = scope.initialRadius * (4 / (Math.pow(n, 2) * Math.PI));
            prevx = x;
            prevy = y;

            x += radius * Math.sin(n * time);
            y += radius * Math.cos(n * time); 
        }
        else if(scope.type == 4){
            n = i * 1 + 2;
            radius = scope.initialRadius * (4 / (n * Math.PI));
            prevx = x;
            prevy = y;

            x += radius * Math.cos(n * time);
            y += radius * Math.sin(n * time); 
        }

        //Circle
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();       
        ctx.arc(prevx, prevy, radius, 0, (2 * Math.PI), false);
        ctx.stroke();    

        //White dot
        // ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        // ctx.beginPath();       
        // ctx.arc(x, y, 2, 0, (2 * Math.PI), false);
        // ctx.fill(); 
        
        //arm
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.moveTo(prevx, prevy);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    if(scope.modulation != "0"){
        try{
            y += eval(scope.modulation);
        } catch{}
    }

    waveArray.unshift(y);

    //wave
    let offset = waveXOffsetFromCircle;
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';

    ctx.beginPath();
    ctx.moveTo(offset, waveArray[0]);
    for(let i = 0; i < waveArray.length; i++){
        ctx.lineTo(i + offset, waveArray[i]);
    }
    ctx.stroke();

    //connector to wave
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(offset, y);
    ctx.stroke();


    if(waveArray.length > maxWaveArrayLenght){
        waveArray.pop();
    }

    time += parseFloat(scope.timeDelta /1000);
    window.requestAnimationFrame(draw);
}

setup();
draw();