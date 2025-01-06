var buttons = document.getElementById("container");
var button1 = document.createElement("button");
var button2 = document.createElement("button");
var button3 = document.createElement("button");
var button4 = document.createElement("button");
var button5 = document.createElement("button");
var button6 = document.createElement("button");
var button7 = document.createElement("button");
var button8 = document.createElement("button");
var button9 = document.createElement("button");
var button10 = document.createElement("button");
let buttonArray = [
    button1,
    button2,
    button3,
    button4,
    button5,
    button6,
    button7,
    button8,
    button9,
    button10];
let set1 =  [
    "#ff0000",
    "#ff7700", 
    "#fff200", 
    "#33fa00", 
    "#0011ff", 
    "#8c00ff", 
    "#850000", //darks
    "#853e00",
    "#857e00",
    "#1b8500",
    "#000985",
    "#490085"];

const size1 = set1.length;
let ogset1 = set1;
let colors = [];

//randomize colors, from set1, keeping ogset1 the same
for(let i = 0; i<size1; i++){
    let index = Math.floor(Math.random()*set1.length-1)+1;
    colors.push(set1.splice(index, 1));
}


//initialize all 10 buttons: same size, color, parent, and onclick function
for(let i = 0; i < buttonArray.length; i++){
    buttonArray[i].style.width = "371px";
    buttonArray[i].style.height = "203px";
    buttonArray[i].style.border= "none";
    buttonArray[i].style.backgroundColor = colors[i];
    buttons.appendChild(buttonArray[i]);
    buttonArray[i].onclick = (event) => onbuttonclicked(event);
}

//creates the literal colors (used to identify the rgb colors)
let colorCounts = JSON.parse(localStorage.getItem("colorCounts")) || {
    red: 0,
    orange: 0,
    yellow: 0,
    green: 0,
    blue: 0,
    purple: 0,
    darkRed: 0,
    darkOrange: 0,
    darkYellow: 0,
    darkGreen: 0,
    darkBlue: 0,
    darkPurple: 0
};

//when a button is pressed, the color of it is assigned to a litteral color,
// and is counted into local sotage
function onbuttonclicked(event) {
    const colorMap = {
        "rgb(255, 0, 0)": "red",
        "rgb(255, 119, 0)": "orange",
        "rgb(255, 242, 0)": "yellow",
        "rgb(51, 250, 0)": "green",
        "rgb(6, 17, 255)": "blue",
        "rgb(140, 0, 255)": "purple",
        "rgb(133, 0, 0)": "darkRed",
        "rgb(133, 62, 0)": "darkOrange",
        "rgb(133, 126, 0)": "darkYellow",
        "rgb(27, 133, 0)": "darkGreen",
        "rgb(0, 9, 133)": "darkBlue",
        "rgb(73, 0, 133)": "darkPurple"
    };
    const color = colorMap[event.target.style.backgroundColor];
    if (color) {
        colorCounts[color]++;
        localStorage.setItem("colorCounts", JSON.stringify(colorCounts)); // Save to local storage
        console.log(`${color}++`);
    } else {
        console.log("Unknown color");
    }
    //moves to next page
    window.location.href = "page3.html";
}
console.log("Current counts:", colorCounts);



//!!!!!!!!!!!! RESETS THE COLOR COUNTS !!!!!!!!!!!!!!!
//resetColorCounts();
function resetColorCounts() {
    colorCounts = {
        red: 0,
        orange: 0,
        yellow: 0,
        green: 0,
        blue: 0,
        purple: 0,
        darkRed: 0,
        darkOrange: 0,
        darkYellow: 0,
        darkGreen: 0,
        darkBlue: 0,
        darkPurple: 0
    };
    localStorage.setItem("colorCounts", JSON.stringify(colorCounts)); // Save the reset object to local storage
    console.log("Color counts have been reset:", colorCounts);
}