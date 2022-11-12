//Constantes
const grafica = document.getElementById('grafica');
const x = document.getElementById('x');
const y = document.getElementById('y');
const btnSubmit = document.getElementById('btnSubmit');
const k = 8.99*Math.pow(10,9);
const signoX = document.getElementById('signoX');
const signoY = document.getElementById('signoY');

//variables
let q1Value;
let q1Potencia;
let q1Prefijo;

let q2Value;
let q2Potencia;
let q2Prefijo;

let q1;
let q2;

let f1;
let f2;


//Funcion angle
function angle(cx, cy, ex, ey){
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;
    return deg;
}

//Funcion getPositionAtCenter
function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2
    };
}

//Funcion getDistanceBetweenElements
function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);
    
    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
}

//Funcion createArrow
function createArrow(){
    let div = document.createElement('div');
    let label = document.createElement('label');
        
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    canvas1.width = 100;
    canvas1.height = 100;
    canvas1.className = 'arrow';

    ctx1.beginPath();
    ctx1.strokeStyle = 'yellowgreen';
    ctx1.lineWidth = 3;
    ctx1.moveTo(50, 50);
    ctx1.lineTo(0, 50);
    ctx1.lineTo(10,40);
    ctx1.moveTo(10, 60);
    ctx1.lineTo(0, 50);
    ctx1.stroke();

    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    canvas2.className = 'arrow';

    ctx2.beginPath();
    ctx2.strokeStyle = 'darkblue';
    ctx2.lineWidth = 3;
    ctx2.moveTo(50, 50);
    ctx2.lineTo(0, 50);
    ctx2.lineTo(10,40);
    ctx2.moveTo(10, 60);
    ctx2.lineTo(0, 50);
    ctx2.stroke();

    const canvas3 = document.createElement('canvas');
    const ctx3 = canvas3.getContext('2d');
    canvas3.width = 100;
    canvas3.height = 100;
    canvas3.className = 'arrow';

    ctx3.beginPath();
    ctx3.strokeStyle = 'white';
    ctx3.lineWidth = 3;
    ctx3.moveTo(50, 50);
    ctx3.lineTo(0, 50);
    ctx3.lineTo(10,40);
    ctx3.moveTo(10, 60);
    ctx3.lineTo(0, 50);
    ctx3.stroke();

    canvas1.style.position = 'absolute';
    canvas2.style.position = 'absolute';
    canvas1.style.opacity = '0';
    canvas2.style.opacity = '0';
    canvas3.style.opacity = '1';

    document.addEventListener('mousemove', ()=> {
            
        let distanceX = getDistanceBetweenElements(canvas1, x)/100;
        let distanceY = getDistanceBetweenElements(canvas1, y)/100;
        
        let e1 = (k*q1)/Math.pow(distanceX,2);
        let e2 = (k*q2)/Math.pow(distanceY,2);

        let Q1x = getPositionAtCenter(document.getElementById('x')).x;
        let Q1y = getPositionAtCenter(document.getElementById('x')).y;
        let Q2x = getPositionAtCenter(document.getElementById('y')).x;
        let Q2y = getPositionAtCenter(document.getElementById('y')).y;
        
        const rekt1 = canvas1.getBoundingClientRect();
        const anchorX1= rekt1.left + rekt1.width / 2;
        const anchorY1= rekt1.top + rekt1.height / 2; 

        const rekt2 = canvas2.getBoundingClientRect();
        const anchorX2= rekt2.left + rekt2.width / 2;
        const anchorY2= rekt2.top + rekt2.height / 2; 
        
        let angleDeg1 = angle(Q1x, Q1y, anchorX1, anchorY1);
        let angleDeg2 = angle(Q2x, Q2y, anchorX2, anchorY2);
            
        let positivo1 = angleDeg1+180;
        let negativo1 = angleDeg1;

        let positivo2 = angleDeg2 + 180;
        let negativo2 = angleDeg2;
        
        let angle1;
        let angle2;

        let e1x;
        let e1y;
        let e2x;
        let e2y;

        let eRx;
        let eRy;

        let tanAlpha;
        let alpha;
        let resultantAngle;

        if(q1Value && q2Value > 0){

            canvas1.style.transform = `rotate(${positivo1}deg)`;
            canvas2.style.transform = `rotate(${positivo2}deg)`;

            if(positivo1 > 0 && positivo1 < 90){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 90 && positivo1 < 180){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 180 && positivo1 < 270){
                angle1 = 360 - (positivo1 - 180);
            }
            if(positivo1 > 270 && positivo1 < 360){
                angle1 = 180 + (360 - positivo1);
            }
            
            if(positivo2 > 0 && positivo2 < 90){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 90 && positivo2 < 180){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 180 && positivo2 < 270){
                angle2 = 360 - (positivo2 - 180);
            }
            if(positivo2 > 270 && positivo2 < 360){
                angle2 = 180 + (360 - positivo2);
            }


            e1x = e1*Math.cos(angle1*Math.PI/180);
            e1y = e1*Math.sin(angle1*Math.PI/180);
            e2x = e2*Math.cos(angle2*Math.PI/180);
            e2y = e2*Math.sin(angle2*Math.PI/180);

            eRx = e1x + e2x;
            eRy = e1y + e2y;

            let resultant = Math.sqrt(Math.pow(eRx,2)+Math.pow(eRy,2));

            tanAlpha = eRy/eRx;
            alpha = (Math.atan(tanAlpha) * 180 / Math.PI);


            if(eRx && eRy > 0){
                resultantAngle = 180 - alpha;
            }
            if(eRx && eRy < 0){
                resultantAngle = 360 - alpha;
            }
            if(eRx > 0 && eRy < 0){
                resultantAngle = 180 + alpha*-1;
            }
            if(eRx < 0 && eRy > 0){
                resultantAngle = alpha*-1;
            }

            canvas3.style.transform = `rotate(${resultantAngle}deg)`
            
        }

        if(q1Value > 0 && q2Value < 0){

            canvas1.style.transform = `rotate(${positivo1}deg)`;
            canvas2.style.transform = `rotate(${negativo2}deg)`;

            if(positivo1 > 0 && positivo1 < 90){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 90 && positivo1 < 180){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 180 && positivo1 < 270){
                angle1 = 360 - (positivo1 - 180);
            }
            if(positivo1 > 270 && positivo1 < 360){
                angle1 = 180 + (360 - positivo1);
            }
            
            if(positivo2 > 0 && positivo2 < 90){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 90 && positivo2 < 180){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 180 && positivo2 < 270){
                angle2 = 360 - (positivo2 - 180);
            }
            if(positivo2 > 270 && positivo2 < 360){
                angle2 = 180 + (360 - positivo2);
            }


            e1x = e1*Math.cos(angle1*Math.PI/180);
            e1y = e1*Math.sin(angle1*Math.PI/180);
            e2x = e2*Math.cos(angle2*Math.PI/180);
            e2y = e2*Math.sin(angle2*Math.PI/180);

            eRx = e1x + e2x;
            eRy = e1y + e2y;

            let resultant = Math.sqrt(Math.pow(eRx,2)+Math.pow(eRy,2));

            tanAlpha = eRy/eRx;
            alpha = (Math.atan(tanAlpha) * 180 / Math.PI);


            if(eRx && eRy > 0){
                resultantAngle = 180 - alpha;
            }
            if(eRx && eRy < 0){
                resultantAngle = 360 - alpha;
            }
            if(eRx > 0 && eRy < 0){
                resultantAngle = 180 + alpha*-1;
            }
            if(eRx < 0 && eRy > 0){
                resultantAngle = alpha*-1;
            }

            canvas3.style.transform = `rotate(${resultantAngle}deg)`
            
        }

        if(q1Value < 0 && q2Value > 0){

            canvas1.style.transform = `rotate(${negativo1}deg)`;
            canvas2.style.transform = `rotate(${positivo2}deg)`;

            if(positivo1 > 0 && positivo1 < 90){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 90 && positivo1 < 180){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 180 && positivo1 < 270){
                angle1 = 360 - (positivo1 - 180);
            }
            if(positivo1 > 270 && positivo1 < 360){
                angle1 = 180 + (360 - positivo1);
            }
            
            if(positivo2 > 0 && positivo2 < 90){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 90 && positivo2 < 180){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 180 && positivo2 < 270){
                angle2 = 360 - (positivo2 - 180);
            }
            if(positivo2 > 270 && positivo2 < 360){
                angle2 = 180 + (360 - positivo2);
            }


            e1x = e1*Math.cos(angle1*Math.PI/180);
            e1y = e1*Math.sin(angle1*Math.PI/180);
            e2x = e2*Math.cos(angle2*Math.PI/180);
            e2y = e2*Math.sin(angle2*Math.PI/180);

            eRx = e1x + e2x;
            eRy = e1y + e2y;

            let resultant = Math.sqrt(Math.pow(eRx,2)+Math.pow(eRy,2));

            tanAlpha = eRy/eRx;
            alpha = (Math.atan(tanAlpha) * 180 / Math.PI);


            if(eRx && eRy > 0){
                resultantAngle = 180 - alpha;
            }
            if(eRx && eRy < 0){
                resultantAngle = 360 - alpha;
            }
            if(eRx > 0 && eRy < 0){
                resultantAngle = 180 + alpha*-1;
            }
            if(eRx < 0 && eRy > 0){
                resultantAngle = alpha*-1;
            }

            canvas3.style.transform = `rotate(${resultantAngle}deg)`
            
        }

        if(q1Value && q2Value < 0){

            canvas1.style.transform = `rotate(${negativo1}deg)`;
            canvas2.style.transform = `rotate(${negativo2}deg)`;

            if(positivo1 > 0 && positivo1 < 90){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 90 && positivo1 < 180){
                angle1 = 180 - positivo1;
            }
            if(positivo1 > 180 && positivo1 < 270){
                angle1 = 360 - (positivo1 - 180);
            }
            if(positivo1 > 270 && positivo1 < 360){
                angle1 = 180 + (360 - positivo1);
            }
            
            if(positivo2 > 0 && positivo2 < 90){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 90 && positivo2 < 180){
                angle2 = 180 - positivo2;
            }
            if(positivo2 > 180 && positivo2 < 270){
                angle2 = 360 - (positivo2 - 180);
            }
            if(positivo2 > 270 && positivo2 < 360){
                angle2 = 180 + (360 - positivo2);
            }


            e1x = e1*Math.cos(angle1*Math.PI/180);
            e1y = e1*Math.sin(angle1*Math.PI/180);
            e2x = e2*Math.cos(angle2*Math.PI/180);
            e2y = e2*Math.sin(angle2*Math.PI/180);

            eRx = e1x + e2x;
            eRy = e1y + e2y;

            let resultant = Math.sqrt(Math.pow(eRx,2)+Math.pow(eRy,2));

            tanAlpha = eRy/eRx;
            alpha = (Math.atan(tanAlpha) * 180 / Math.PI);


            if(eRx && eRy > 0){
                resultantAngle = 180 - alpha;
            }
            if(eRx && eRy < 0){
                resultantAngle = 360 - alpha;
            }
            if(eRx > 0 && eRy < 0){
                resultantAngle = 180 + alpha*-1;
            }
            if(eRx < 0 && eRy > 0){
                resultantAngle = alpha*-1;
            }

            canvas3.style.transform = `rotate(${resultantAngle}deg)`
            
        }
    });
        
    label.style.position = 'absolute';
    label.style.color = 'red';

        
    grafica.append(div);
    div.append(label);
    div.append(canvas1,canvas2,canvas3);
        
}









//btnSubmit
btnSubmit.addEventListener('click', () =>{
    q1Value = document.getElementById('valor1').value;
    q1Potencia = document.getElementById('potencia1').value;
    q1Prefijo = document.getElementById('prefijo1').value;

    q2Value = document.getElementById('valor2').value;
    q2Potencia = document.getElementById('potencia2').value;
    q2Prefijo = document.getElementById('prefijo2').value;

    if(q1Value > 0 || q1Value < 0){
        if(q1Prefijo == '1'){
            q1 = q1Value * Math.pow(10, q1Potencia);
        }else if(q1Prefijo == '2'){
            q1 = (q1Value * Math.pow(10, q1Potencia)) / 1e+6;
        }else if(q1Prefijo == '3'){
            q1 = (q1Value * Math.pow(10, q1Potencia)) / 1e+12;
        }else if(q1Prefijo == '4'){
            q1 = (q1Value * Math.pow(10, q1Potencia)) / 1e+9;
        }
    }

    if(q2Value > 0 || q2Value < 0){
        if(q2Prefijo == '1'){
            q2 = q2Value * Math.pow(10, q2Potencia);
        }else if(q2Prefijo == '2'){
            q2 = (q2Value * Math.pow(10, q2Potencia)) / 1e+6;
        }else if(q2Prefijo == '3'){
            q2 = (q2Value * Math.pow(10, q2Potencia)) / 1e+12;
        }else if(q2Prefijo == '4'){
            q2 = (q2Value * Math.pow(10, q2Potencia)) / 1e+9;
        }
    }


    //makes q1 and q2 dragabbles
    const dragX = (e) =>{
        x.style.left = e.pageX + 'px';
        x.style.top = e.pageY + 'px';  
    }

    x.addEventListener('mousedown', () => {
        window.addEventListener("mousemove", dragX);
    });
        
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", dragX);
    });

    const dragY = (e) =>{
        y.style.left = e.pageX + 'px';
        y.style.top = e.pageY + 'px';  
    }

    y.addEventListener('mousedown', () => {
        window.addEventListener("mousemove", dragY);
    });
        
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", dragY);
    });

    //Accion createArrow
    for(let i = 0; i < 104; i++) {
        createArrow();
    }


});







