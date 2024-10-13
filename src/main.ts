// Note to self: GET RID OF REDUNDANT CODES

const Display = document.querySelector<HTMLInputElement>("#Display")
const History = document.querySelector<HTMLInputElement>("#History")
const Heart = document.querySelector<HTMLLabelElement>("#Heart")
const Heart1 = document.querySelector<HTMLLabelElement>("#Heart1")
const Heart2 = document.querySelector<HTMLLabelElement>("#Heart2")
// toggle for when equal is entered, resets it to zero when a new digit is clicked.
let input = false;


let history: any = ""; // stores the display value for the history feauture
let checkIfBye: boolean = false; // a toggle for when checking up on the function if it 

let checkZero: boolean = false; // check whether the alue starts with a zero

// Resets the Calculator
const AC = document.querySelector<HTMLButtonElement>("#AC")
AC?.addEventListener("click", () => {
    if (Display) Display.value = "0";
    if (History) History.value = "";
    Display!.style.color = "rgb(248, 248, 248)"
    Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(187, 193, 198)"
    input = false;
    history = "";
    Display?.classList.remove("Hello")
    checkZero = false;
    if (checkIfBye) {
        Enabled();
        Display?.classList.remove("background");
        History?.classList.remove("background");
        Display?.classList.remove("byeanimation");
        Heart?.classList.remove("heart")
        Heart1?.classList.remove("heart1")
        Heart2?.classList.remove("heart2")
        History!.style.transition = "0.2s linear"
        Display!.style.transition = "0.2s linear"
        clearTimeout(1000);
    } 
});;

// Stores the id of the numbers in an array
const Buttons = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "Dec"];
Buttons.forEach(num => { // goes through the array
    const button = document.querySelector<HTMLButtonElement>(`#${num}`) // queries over the document id to search for the button  
    button?.addEventListener("click", () => {  // check if specific button is clicked it displays its value
        Display!.classList.remove("equalanimation")

        let preValue = Display!.value; // saves the value before a key was inputted

        if (input && num != "Dec") {
            Display!.value = "0";

            input=false;
        }
        if ( Display && Display!.value.length < 16) {
            if (Display!.value === "0") {
                if (num === "Dec") {
                    if (!Display.value.includes(".")) {
                        Display!.value += "."; // adds the decimal instead of replacing the 0
                    }
                } else {
                    Display!.value = num[1];
                }
            } else {
                if (num === "Dec") {
                    if (!(Display!.value.split(/[−÷×+]/).slice(-1).join("").split("").includes("."))){ // Splits the operation into a list based on the symbol of operation, 
                        Display!.value += "."                                                          // then checks the last index of the operation to again split the strings of the index into a list
                    } 
                } else if (!checkZero){
                    Display!.value += num[1];
                } else if (checkZero) {
                    Display!.value = Display!.value.slice(0, Display!.value.lastIndexOf("0")) + num[1]
                }
            }
        }

        // checks the index if the number starts with a 0 then if true it disables the number buttons unless added a decimal
        if (Display!.value.split(/[−÷×+]/).slice(-1)[0][0] == "0" || (Display!.value.split(/[−÷×+]/).slice(-1).join("").includes("−0")) ) {
            checkZero = true
        } else {
            checkZero = false;
        }   
        if (Display!.value.split(/[−÷×+]/).slice(-1)[0][0] == "0" && Display!.value.split(/[−÷×+]/).slice(-1)[0][1] == ".") {
            checkZero = false;
        }
        
        let checkError = Display!.value  //saves the value of the key after it has been inputted

        // If the value doesnt change when clicking on the button it marks an error in the syntax by highlighting red
        if (preValue == checkError) {
           Display!.style.color = "rgb(250,128,114)"
           Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(160, 33, 64)"
        }  else {
            Display!.style.color = "rgb(248, 248, 248)"
            Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(187, 193, 198)"
        }
        
        history = Display!.value;
    })
});



// takes the last index of the text and deletes it
const Del = document.querySelector<HTMLButtonElement>("#Del")
Del?.addEventListener("click", () => {
if (input) {
    Display!.value = "0"
}

    let preValue = Display!.value; // saves the value before a key was inputted

    if (["+", "−", "÷", "×"].includes(Display!.value.charAt(Display!.value.length - 1))) {
        checkZero = false
    }
  
    if (Display!.value.length > 1) {
        Display!.value = `${Display?.value.slice(0, -1)}`;
    } else {
        Display!.value = "0";
    }


    if (Display!.value.split(/[−÷×+]/).slice(-1)[0][0] == "0") {
        checkZero = true
    } else {
        checkZero = false;
    }   


    let checkError = Display!.value //saves the value of the key after it has been inputted

    if (preValue == checkError && Display!.value != "0") { //if preValue is now equal to the checkerror it highlights the text red meaning you could no longer input.
        Display!.style.color = "rgb(250,128,114)"
        Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(160, 33, 64)"
     }  else {
         Display!.style.color = "rgb(248, 248, 248)"
         Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(187, 193, 198)"
     }
});

// id of operations are stored in an array
const Operations = ["Add", "Sub", "Div", "Multiply"]
Operations.forEach(signs => {
    const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) // goes over them and queries over them in the document
    Operaters?.addEventListener("click", () => { // check displays the operation when clicked, on screen
            const lastchar = Display!.value.charAt(Display!.value.length -1 )
            const check = ["+", "−", "÷", "×", "."].includes(lastchar)
            const check1 = ["+", "÷", "×"].includes(lastchar)
            const check2 = ['−',"+", "÷", "×"].includes(Display!.value.charAt(Display!.value.length - 2))
    
            let preValue = Display!.value; // saves the value before a key was inputted

            if (!check && Display!.value.length < 16) {
                if (greetings.includes(Display!.value) || Display!.value == "Error" || Display!.value == "NaN") {
                    Display!.value = "0"
                }
                if (signs === "Add") {
                    Display!.value += "+";
                }
                if (signs === "Sub" && Display!.value === "0") {
                    Display!.value = "−";
                } else if (signs === "Sub") {
                    Display!.value += "−";
                }
                if (signs === "Div") {
                    Display!.value += "÷";
                }
                if (signs === "Multiply"){
                    Display!.value += "×";
                } 
            checkZero = false
            input = false                  
            } else if (!check && Display!.value.length >= 16) {
                Display!.value = `${Display?.value.slice(0, -8)}`;
                if (signs === "Add") {
                    Display!.value += "+";
                }
                if (signs === "Sub") {
                    Display!.value += "−";
                }
                if (signs === "Div") {
                    Display!.value += "÷";
                }
                if (signs === "Multiply") Display!.value += "×";
                input = false
            } else if (check1 || !check2) {
                if (signs === "Sub" && !(Display!.value == "−")) {
                    Display!.value += "−";
                }
            } 

            let checkError = Display!.value //saves the value of the key after it has been inputted

            if (preValue == checkError) { //if preValue is now equal to the checkerror it highlights the text red meaning you could no longer input.
                Display!.style.color = "rgb(250,128,114)"
                Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(160, 33, 64)"
             }  else {
                 Display!.style.color = "rgb(248, 248, 248)"
                 Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(187, 193, 198)"
             }
        })
    })

// performs the solving
const Enter = document.querySelector<HTMLButtonElement>("#Equal")
Enter?.addEventListener("click", () => { 
    if (Display!.value === "0") {
        Display!.value = "0"
    } else {
        const solved = history.replaceAll("−", "-").replaceAll("÷", "/").replaceAll("×", "*").replace(/--/g, "+")
        console.log(solved)
        Display!.value = `${eval(solved)}`.slice(0,16);
        History!.value = `${history} = ${Display!.value}`;
    
        Error() //Change the text from infinity to error if any numerator is divided with a denominator of 0.

        Special_Code() //Displays a message if a specific number is entered

        Display!.classList.add("equalanimation") //Text Animation Plays
        input = true;
    }
});

// says the goodbye message on screen
const Bye = document.querySelector<HTMLButtonElement>("#Bye")
 Bye?.addEventListener("click", ()=> {
    Display!.value = "Mwah"; //Changes the display text
    Display?.classList.add("byeanimation"); //Animation plays 
    Heart?.classList.add("heart")
    Heart1?.classList.add("heart1")
    Heart2?.classList.add("heart2")
    Display!.style.color = "rgba(248, 248, 248, 0.3)"
    Display!.style.textShadow = "0rem 0rem 0.2rem rgba(238, 238, 239, 0.718), 0rem 0rem 0.2rem rgb(187, 193, 198)"
    Display!.style.left = "-6rem"
    setTimeout(Off, 2000); //Background then turns off
    Disabled();
 });

// animation when clicked on the Bye button
function Off() {
    History!.style.transition = "0.2s linear"
    Display!.style.transition = "0.2s linear"
    Display!.style.left = "0.7rem"
    History?.classList.add("background");
    Display?.classList.add("background"); 
    if (AC) {AC.disabled = false};
};

// Disables all Button
function Disabled() {
    checkIfBye = true;
    Operations.forEach(signs => {
        const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) // iterates each and queries them over in the document
        if (Operaters) Operaters.disabled = true;
    });

    Buttons.forEach(num => {
        const button = document.querySelector<HTMLButtonElement>(`#${num}`)
        if (button) button.disabled = true;
    });

    if (Hello) Hello.disabled = true;
    if (AC) AC.disabled = true;
    if (Enter) Enter.disabled = true;
    if (Del) Del.disabled = true;
}

//Enables all Button
function Enabled() {

    Operations.forEach(signs => {
        const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) // iterates each and queries them over in the document
        if (Operaters) Operaters.disabled = false;
    })

    Buttons.forEach(num => {
        const button = document.querySelector<HTMLButtonElement>(`#${num}`)
        if (button) button.disabled = false;
    })
    
    if (AC) AC.disabled = false;
    if (Hello) Hello.disabled = false;
    if (Enter) Enter.disabled = false;
    if (Del) Del.disabled = false;
}


// makes a greeting in all sorts of language displayed on the screen.
const greetings = ["Hola", "Kamusta", "Konichiwa", "Ciao", "Salaam", "Namaste", "Hallo", "Bonjour", "Olá", "Nǐ hǎo", "Yā, Yō", "Cześć, Witaj"]
const Hello = document.querySelector<HTMLButtonElement>("#Hello")
Hello?.addEventListener("click", () => {
    Display!.style.color = "rgba(248, 248, 248, 0.5)"
    Display?.classList.add("Hello")
    input=true;
    Display!.value = greetings[Math.floor(Math.random() * 12)];
});

// Integrate keys in calcualtor 
document.addEventListener("keydown", (event) => {
    if (event.key >= '0' && event.key <= '9') {
        const button = document.querySelector<HTMLButtonElement>(`#b${event.key}`)
        button?.click();
    }
    if (event.key == 'Backspace') {
        const button =  document.querySelector<HTMLButtonElement>(`#Del`)
        button?.click();
    }
    if (event.key == 'Enter') {
        const button =  document.querySelector<HTMLButtonElement>(`#Equal`)
        button?.click();
    }
    if (event.key == '+') {
        const button =  document.querySelector<HTMLButtonElement>(`#Add`)
        button?.click();
    }
    if (event.key == '-') {
        const button =  document.querySelector<HTMLButtonElement>(`#Sub`)
        button?.click();
    }
    if (event.key == '/') {
        const button =  document.querySelector<HTMLButtonElement>(`#Div`)
        button?.click();
    }
    if (event.key == '*') {
        const button =  document.querySelector<HTMLButtonElement>(`#Multiply`)
        button?.click();
    }
    if (event.key == 'a') {
        const button =  document.querySelector<HTMLButtonElement>(`#AC`)
        button?.click();
    }
    if (event.key == 'h') {
        const button =  document.querySelector<HTMLButtonElement>(`#Hello`)
        button?.click();
    }
    if (event.key == 'b') {
        const button =  document.querySelector<HTMLButtonElement>(`#Bye`)
        button?.click();
    }
    if (event.key == '.') {
        const button =  document.querySelector<HTMLButtonElement>(`#Dec`)
        button?.click();
    }
})

// checks if infinity it will return an error instead   
function Error() {
    if (Display!.value === "Infinity" || Display!.value === "-Infinity") {
        Display!.value = "Error"
        History!.value = `${history} = ${Display!.value}`;
    }
}

// place a special message for these specific inputs
function Special_Code() {
    if (History!.value === "143 = 143") {
        History!.value =`${history} = I Love You`
    } else if (History!.value === "153 = 153" || History!.value === "143−1 = 142") {
        History!.value =`${history} = I Miss You`
    } else if (History!.value === "143+153 = 296") {
        History!.value =`${history} = Miss you & Love You`
    } 
}

