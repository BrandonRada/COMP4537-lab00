// document.getElementById('goBtn').onclick =
//   function (e) {
//         let numberEntry = document.getElementById("numberEntry");
//         let enteredValue = numberEntry.value;
//         console.log(enteredValue);
//   }

let currentButtonValue = 1;
let numberOfButtons;
const WINTEXT = "Excellent memory!";
const WRONGORDER = "Wrong order!"


function VerifyEntry(){
    let numberEntry = document.getElementById("numberEntry");
    let enteredValue = numberEntry.value;
    let allowedValue;
    console.log(enteredValue);

    if(enteredValue < 3 || enteredValue > 7){
        alert("Entered value must be in range 3-7")
        allowedValue = false;
    }else{
        allowedValue = true;
    }

    if(allowedValue){
        numberOfButtons = enteredValue;
        GenerateButtons();
    }
}


function HideNumbers(){
    for(let i = 1; i<= numberOfButtons; i++){
        let currentButton = document.getElementById(`button${i}`);
        // let css = `button${i}:hover{ background-color: #00ff00 }`;
        // let style = document.createElement('style');

        // if (style.styleSheet) {
        //     style.styleSheet.cssText = css;
        // } else {
        //     style.appendChild(document.createTextNode(css));
        // }
        currentButton.textContent = "";
        currentButton.onclick = Change;
        
        // document.getElementsByTagName('head')[0].appendChild(style);
    }
}
function RevealNumbers(){
    for(let i = 1; i<= numberOfButtons; i++){
        let currentButton = document.getElementById(`button${i}`);
        currentButton.textContent = `${currentButton.name}`;
        currentButton.onclick = "";
    }
}

class MyContainer{

}
class Location{

}

class MyButton{
    id; 
    name; 
    textcontent; 
    height; 
    width; 
    margin; 
    backgroundColor;
    aButton;

    constructor(id, name, textcontent, height, width, margin, backgroundColor){
        this.id = id;
        this.name = name;
        this.textcontent = textcontent;
        this.height = height;
        this.width = width;
        this.margin = margin;
        this.backgroundColor = backgroundColor;
        aButton = document.createElement("button");
        InitializeProperties();
    }
    
    InitializeProperties(){
        aButton.id = `button${i}`;
        aButton.name = `${i}`;
        aButton.textContent = `${abutton.name}`;
        aButton.style.height = "5em";
        aButton.style.width = "10em";
        aButton.style.margin = "5px";
        aButton.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
    }

    // SetProperties(textcontent, height, width, margin, backgroundColor){
       
    //     this.textcontent = textcontent;
    //     this.height = height;
    //     this.width = width;
    //     this.margin = margin;
    //     this.backgroundColor = backgroundColor;

    //     aButton.id = `button${i}`;
    //     aButton.name = `${i}`;
    //     aButton.textContent = `${abutton.name}`;
    //     aButton.style.height = "5em";
    //     aButton.style.width = "10em";
    //     aButton.style.margin = "5px";
    //     aButton.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
    // }

    Change(){
        console.log("hi")
        // this.style.backgroundColor = "green";
        if(this.name == currentButtonValue){
            currentButtonValue++;
            this.textContent = `${this.name}`;
            console.log("Button: "+ this.name + "\nNext Button: " + currentButtonValue);
    
        }else{
            RevealNumbers();
            alert(WRONGORDER)
        }
    }

}


function GenerateButtons(){
    let buttonArea = document.getElementsByClassName("buttonArea")[0];
    let goBtn = document.getElementById("goBtn");
    let time = 1000 * numberOfButtons;
    for (let i = 1; i<= numberOfButtons; i++){
        let currentButton = document.createElement("button");
        let r = Math.random()*255;
        let g = Math.random()*255;
        let b = Math.random()*255;
        let a = 100;

        buttonArea.appendChild(currentButton);
        currentButton.id = `button${i}`;
        currentButton.name = `${i}`;
        currentButton.textContent = `${currentButton.name}`;
        currentButton.style.height = "5em";
        currentButton.style.width = "10em";
        currentButton.style.margin = "5px";
        currentButton.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
        // currentButton.style.fontSize = "10pt";
        
    }
    // Remove clickability
    goBtn.onclick = "";
    // setTimeout(randomizeLocations(numberOfButtons, time), time);
    
    setTimeout(() => scrambleButtons(), time);
}

  async function scrambleButtons(){
    for(let i = 1; i <= numberOfButtons; i++){
        for(let j = 1; j <= numberOfButtons; j++){
            let top = Math.random()*window.innerHeight;
            let left = Math.random()*window.innerWidth;
            let currentButton = document.getElementById(`button${j}`)
            currentButton.style.position = "absolute";
            // currentButton.style.top = top + "px";
            // currentButton.style.left = left + "px";
            // console.log("top: " + top + "left: " + left);
            currentButton.style.top = `${top}px`;
            currentButton.style.left = `${left}px`;

        }
        await sleep(2000);
    }
    HideNumbers();
  }
//   Helper function to help with the two second pauses.
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
