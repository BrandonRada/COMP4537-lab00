const fs = require('fs');
const filePath = path.join(__dirname, "lang", "messages", "en", "user.js");

class Game{
    constructor(){
        this.currentButtonValue = 1;
        this.numberOfButtons = 0;
        this.WINTEXT = "Excellent memory!";
        this.WRONGORDER = "Wrong order!";
        this.buttonManager = new ButtonManager(this);
    }

    verifyEntry(){
        let numberEntry = document.getElementById("numberEntry");
        let enteredValue = numberEntry.value;
        let allowedValue;
    
        if(enteredValue < 3 || enteredValue > 7){
            alert("Entered value must be in range 3-7")
            allowedValue = false;
        }else{
            allowedValue = true;
        }
    
        if(allowedValue){
            this.numberOfButtons = enteredValue;
            this.buttonManager.generateButtons(enteredValue);
        }
    }

    resetGame() {
        this.currentButtonValue = 1;
    }

    nextValue() {
        this.currentButtonValue++;
        if (this.currentButtonValue > this.numberOfButtons) {
            alert(this.WINTEXT);
            fs.appendFileSync(filePath, `\n${this.WINTEXT}\n`, 'utf8');
        }
    }

    handleWrongOrder() {
        this.buttonManager.revealNumbers();
        alert(this.WRONGORDER);
        fs.appendFileSync(filePath, `\n${this.WRONGORDER}\n`, 'utf8');
    }

}

class ButtonManager{
    constructor(game){
        this.game = game;
        this.buttons = [];
        this.goBtn = document.getElementById("goBtn");
    }

    generateButtons(numberOfButtons){
        const buttonArea = document.getElementsByClassName("buttonArea")[0];
        let time = 1000* this.game.numberOfButtons;
        buttonArea.innerHTML = "";

        for(let i = 1; i <= numberOfButtons; i++){
            const newButton = new MyButton(i, this.game);
            this.buttons.push(newButton);
            let domBTN = newButton.getDOMbutton();

            buttonArea.appendChild(domBTN);
        }
        this.lockGoButton();
        setTimeout(() => this.scrambleButtons(), time);

    }

    async scrambleButtons(){
        for(let i = 1; i <= this.game.numberOfButtons; i++){
            for(let j = 1; j <= this.game.numberOfButtons; j++){
                let top = Math.random()*window.innerHeight;
                let left = Math.random()*window.innerWidth;
                let currentButton = document.getElementById(`button${j}`)

                currentButton.style.position = "absolute";
                currentButton.style.top = `${top}px`;
                currentButton.style.left = `${left}px`;
    
            }
            await sleep(2000);
        }
        this.hideNumbers();
      }

    hideNumbers() {
        this.buttons.forEach(button => button.hideNumber());
    }

    revealNumbers() {
        this.buttons.forEach(button => button.revealNumber());
    }
    lockGoButton(){
        this.goBtn.onclick = "";
    }
}

class MyButton{

    constructor(value, game){
        this.value = value;
        this.game = game;
        this.aButton = document.createElement("Button");
        this.initProperties();
    }
    
    initProperties(){
        this.aButton.id = `button${this.value}`;
        this.aButton.name = this.value;
        this.aButton.textContent = this.value;
        this.aButton.style.height = "5em";
        this.aButton.style.width = "10em";
        this.aButton.style.margin = "5px";
        this.aButton.style.backgroundColor = this.randomColor();
    }

    getDOMbutton(){
        return this.aButton;
    }

    handleClick(){
        if (this.value === this.game.currentButtonValue) {
            this.revealNumber();
            setTimeout(()=> {
                this.game.nextValue();
            },100);
        } else {
            this.game.handleWrongOrder();
        }
    }

    hideNumber(){
        this.aButton.textContent = "";
        this.aButton.onclick = () => this.handleClick();
    }
    revealNumber(){
        this.aButton.textContent = this.value;
        this.aButton.onclick = "";
    }

    randomColor(){
        let r = Math.random()*255;
        let g = Math.random()*255;
        let b = Math.random()*255;
        let a = 100;

        return `rgba(${r},${g},${b},${a})`;
    }
}

//   Helper function to help with the two second pauses.
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("Script loaded!");

const game = new Game();
document.getElementById("goBtn").onclick =  () => game.verifyEntry();
