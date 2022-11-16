let table;
let slider;


const canvasWidth = window.innerWidth;
const canvasHeight = 900;

function preload() {
    table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    //background(237, 227, 175);
    sliderBuild();

    title = createDiv("Future City: Mean Temperature Change");
    title.position(200, 10); //title meant to also act as a key
}
function draw() {
    background(232, 237, 206);
    for (let i = 0; i < table.getRowCount(); i++) {
        const currentCity = table.get(i, 'current_city');
        const futureCityOne = table.get(i, 'future_city_1_source');
        const futureCityTwo = table.get(i, 'future_city_2_source');
        const futureCityThree = table.get(i, 'future_city_3_source');
        const meanTemp = (table.get(i, 'Annual_Mean_Temperature') * 10); //scaled these values up to have size increase be visible -- hopefully not so much as to skew perception of results.
        const futureTemp = (table.get(i, 'future_Annual_Mean_Temperature') * 10);
        const xPos = (table.get(i, 'Latitude') * 8);
        const yPos = (table.get(i, 'Longitude') * 14); // scaled these values up to be spread out
        
        cityCircle(xPos, yPos, meanTemp, futureTemp, currentCity, futureCityOne, futureCityTwo, futureCityThree);
    }

    
}
function sliderBuild() { //more styling in style.css
    slider = createSlider(0, 29, 0);
    slider.position(33, 47);
    slider.style('width', '600px');
    slider.addClass("dateSlider");

    label = createDiv('2021');
    label.position(25, 30);  
    
    labelTwo = createDiv('2050');
    labelTwo.position(25, 670);  
    slider.style('transform: rotate(90deg);');
    slider.style('margin: 310px 0px 0px -290px;');
   
}
function cityCircle(x, y, firstSize, lastSize, city, futureCity, futureCityTwo, futureCityThree) { //many parameters, much succinctness -- apparently i could use a 
                                                                //  switch statement to make it cleaner,, but I couldn't work that out in time
    

    const circleDiff = (lastSize - firstSize);
    const circleInc = (circleDiff / 29);
    let size = (circleInc * slider.value()) + firstSize;
    let sizeTemp = round((size / 10), 1); //work around to adding the incremental temperature change to the meanTemp
                              //as the value was being shown as a string next to the city, rather than a sum
                              //converted the size back to the temperature rather than adding more parameters to the function

    if (slider.value() <= 7) { // these if statements change the city label as the slidervalue increases
        const label = `${city}: ${sizeTemp}`;
        visParam(label, x, y, size);
    }
    if (slider.value() > 7 && slider.value() <= 15) {
        const label = `${futureCity}: ${sizeTemp}`;
        visParam(label, x, y, size);
    }
    if (slider.value() > 15 && slider.value() <= 22) {
        const label = `${futureCityThree} ${sizeTemp}`;
        visParam(label, x, y, size);
    }
    if (slider.value() > 22) {
        const label = `${futureCityTwo} ${sizeTemp}`;
        visParam(label, x, y, size);
    }
}
function visParam(label, x, y, size) { //style the circle and city label
    noStroke();
    fill((size * 1.2), 150, 100, 190);
    circle(x, y + 80, size);
    fill('black');
    text(label, x + 50, y + 100);
    textSize(20);
    textFont('courier');
}
