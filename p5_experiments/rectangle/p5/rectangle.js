const data = [100, 30, 20, 77, 300, 10, 44, 72];
let x = 20;

function setup() {
    createCanvas(600,400);
    background(203); 
 
}

function draw() {
    noLoop();
    fill(200, 120, 189);
    noStroke();
    rect(200, 100, 350, 200);
    stroke(1, 230);
    for(let i = 0; i<data.length;i++) {
        yPos = i * 50;
        coLor = i * 30;
        fill(coLor);
        rect(yPos, 10, 10, data[i]);
    }

}

