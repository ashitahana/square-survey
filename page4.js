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
    "#ff00e6", //magenta
    "#850000", //darks
    "#853e00",
    "#857e00",
    "#1b8500",
    "#000985",
    "#490085",
    "#69005e", //dark magenta
    "#ff7070", //lights
    "#ffbb80",
    "#fff980",
    "#9eff85",
    "#8a92ff",
    "#cc8fff",
    "#ff8cf3", //light magenta
    "#0a0a0a", //black
    "#ffffff"]; //white
//creates the literal colors (used to identify the rgb colors)
const colorNameMap = {
    "#ff0000": "Red",
    "#ff7700": "Orange",
    "#fff200": "Yellow",
    "#33fa00": "Green",
    "#0011ff": "Blue",
    "#8c00ff": "Purple",
    "#ff00e6": "Magenta",
    "#850000": "Dark Red",
    "#853e00": "Dark Orange",
    "#857e00": "Dark Yellow",
    "#1b8500": "Dark Green",
    "#000985": "Dark Blue",
    "#490085": "Dark Purple",
    "#69005e": "Dark Magenta",
    "#ff7070": "Light Red",
    "#ffbb80": "Light Orange",
    "#fff980": "Light Yellow",
    "#9eff85": "Light Green",
    "#8a92ff": "Light Blue",
    "#cc8fff": "Light Purple",
    "#ff8cf3": "Light Magenta",
    "#0a0a0a": "Black",
    "#ffffff": "White"
};
let size1 = set1.length;
let ogset1 = set1;
let colors = [];

//randomize colors, from set1, keeping ogset1 the same
for (let i = 0; i < size1; i++) {
    let index1 = Math.floor(Math.random() * set1.length); // Random index for the first color
    let color1 = set1.splice(index1, 1)[0]; // Get and remove the first color

    let index2 = Math.floor(Math.random() * set1.length); // Random index for the second color
    let color2 = set1.splice(index2, 1)[0]; // Get and remove the second color

    colors.push({ left: color1, right: color2 }); // Store the pair of colors
}

//initialize all 10 buttons: same size, color, parent, and onclick function
for(let i = 0; i < buttonArray.length; i++){
    buttonArray[i].style.width = "371px";
    buttonArray[i].style.height = "203px";
    buttonArray[i].style.border= "none";
    buttonArray[i].style.background = `linear-gradient(to right, ${colors[i].left} 50%, ${colors[i].right} 50%)`;
    buttons.appendChild(buttonArray[i]);
    buttonArray[i].onclick = (event) => onbuttonclicked(event);
}

//changes rbg to hex so the colors can be turned to literal
function rgbToHex(rgb) {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return rgb; // If not rgb(), return the original value
    const r = parseInt(match[1]).toString(16).padStart(2, "0");
    const g = parseInt(match[2]).toString(16).padStart(2, "0");
    const b = parseInt(match[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
}

//when a button is pressed, the color of it is assigned to a litteral color,
// and is counted into local sotage
function onbuttonclicked(event) {
    // Get the button's background style
    let buttonStyle = event.target.style.background;

    // Debugging: Log the raw style.background value
    //console.log("Raw button background:", buttonStyle);

    // Improved regex to capture both colors from the gradient
    let match = /linear-gradient\(.*?,\s*(.*?)\s50%,\s*(.*?)\s50%\)/.exec(buttonStyle);

    if (!match || match.length < 3) {
        console.error("Could not extract colors from button background:", buttonStyle);
        return;
    }

    // Extract and normalize colors
    let color1 = match[1].trim();
    let color2 = match[2].trim();

    // Debugging: Log extracted colors
    //console.log("Extracted colors:", { color1, color2 });

    // Convert `rgb()` to hex if needed
    color1 = rgbToHex(color1);
    color2 = rgbToHex(color2);

    // Debugging: Log normalized colors
    //console.log("Normalized colors:", { color1, color2 });

    // Sort and normalize colors for consistency
    let sortedColors = [color1, color2].sort();

    // Map colors to readable names
    const readableColor1 = colorNameMap[sortedColors[0].toLowerCase()] || sortedColors[0];
    const readableColor2 = colorNameMap[sortedColors[1].toLowerCase()] || sortedColors[1];

    // Create a key for this combination
    let combinationKey = `${readableColor1}-${readableColor2}`;

    // Debugging: Log the combination key
    //console.log("Combination key:", combinationKey);

    // Get current counts from local storage
    let storedCounts = JSON.parse(localStorage.getItem("colorCounts")) || {};

    // Increment the count for this combination
    storedCounts[combinationKey] = (storedCounts[combinationKey] || 0) + 1;

    // Save the updated counts back to local storage
    localStorage.setItem("colorCounts", JSON.stringify(storedCounts));

    // Log for debugging
    console.log(`Updated count for ${combinationKey}:`, colorCounts[combinationKey]);


    // download cvs
    let csvContent = "data:text/csv;charset=utf-8,Combination,Count\n";
    for (const [combination, count] of Object.entries(storedCounts)) {
        csvContent += `${combination},${count}\n`;
    }

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.target = "_blank";
    link.download = "survey_results.csv"; // Set the filename
    link.click();



    // navigation after safe download
    const confirmNavigation = confirm("The results have been downloaded (that's what that was), EMAIL FILE TO:: jwu60084@gmail.com");
    if (confirmNavigation) {
        window.location.href = "complete.html";
    }

}
    //time to save everything to csv!!

    const colorCounts = JSON.parse(localStorage.getItem("colorCounts")) || {};
    console.log("Stored Color Counts:", colorCounts);
    
    for (const [combination, count] of Object.entries(colorCounts)) {
            console.log(`${combination}: ${count}`);
    }


//!!!!!!!!!!!! RESETS THE COLOR COUNTS !!!!!!!!!!!!!!!
//resetColorCounts();
function resetColorCounts() {
    localStorage.removeItem("colorCounts");
    console.log("Color counts have been reset. (from,4)");
}
