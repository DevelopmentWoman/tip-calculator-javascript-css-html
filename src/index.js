import './sass/main.css'
import './sass/main.scss'


"use strict"

const inpBill = document.querySelector(".inp-bill");
const divGrid = document.querySelector(".grid");
const arrButtonPerc = document.querySelectorAll(".percentage");
const inpCustom = document.querySelector(".Very-light");
const pZero = document.querySelector(".zero");
const divPeople = document.querySelector(".people");
const inpPeople = document.querySelector(".number-people")
const hTotalAmount = document.querySelector(".t-amount");
const hTotalPerson = document.querySelector(".total-pers");
const buttonReset = document.getElementById("reset");
const bill = document.querySelector('.bill').firstChild
let totalAmount = 0;
let percentage = 0;
let personAmount = 0;
let tipAmount =0;
let total = 0;

//remove the background color class from percentage buttons
const bgClear = ()=>{
    arrButtonPerc.forEach(element =>{
        if(element.classList.contains("bg-color-perc")) element.classList.remove("bg-color-perc");
    })
}

// remove class from valor input equal zero
const classRemove = element=>{
    if( element.parentElement.classList.contains("inp-people")) element.parentElement.classList.remove("inp-people");
    if(pZero.classList.contains("active-zero")) pZero.classList.remove("active-zero");
}

//performs the calculation if the person number is different from zero, otherwise it shows the error
const calculate = element =>{
    if(element.value==0){
        element.parentElement.classList.add("inp-people")
        pZero.classList.add("active-zero");
        element.focus();
    }else{   
        personAmount = element.value;
        tipAmount = ((totalAmount*percentage)/personAmount).toFixed(2);
        total = ((+totalAmount * +percentage) + (+totalAmount))/(+personAmount);
        hTotalAmount.textContent = "$" + tipAmount;
        hTotalPerson.textContent = "$" + total.toFixed(2);
        buttonReset.classList.add("bg-color-reset");
    }
}


//get value if percentage is custom
const getPercentage = element =>{
    if (element.classList.contains("Very-light")){
        element.setAttribute("placeholder","");
    }
        percentage = parseInt(element.value)/100;
        element.classList.add("bg-color-perc");
    
}

//reset all input and results
const reset = ()=>{
    inpBill.value = 0;
    inpBill.classList.remove("color-updated-h2");
    inpCustom.value = "";
    inpCustom.placeholder = "Custom";
    divPeople.querySelector("input").value = 0;
    divPeople.querySelector("input").classList.remove("color-updated-h2");
    hTotalAmount.textContent = "$0.00";
    hTotalPerson.textContent = "$0.00";
    buttonReset.classList.remove("bg-color-reset");
    bgClear();
    totalAmount = 0;
    percentage = 0;
    personAmount = 0;
    tipAmount =0;
    total = 0;
}


const  addClassInputColorCustom= element=>{
    element.classList.add("color-updated-h2"); 
}

const addClassInputColor = element=>{
    element.classList.add("color-updated-h2"); 
    element.parentElement.classList.add("border-input")
}


const removeClassInputColor = element=>{
    element.classList.remove("color-updated-h2"); 
    element.parentElement.classList.remove("border-input")
}
//checks if the element is equal to zero and calls show error, otherwise calls calculate results
const calculo = e=>{
    if (e.target.closest("input")){
        if (e.target.value!==0){
            classRemove(e.target);
            calculate(e.target);

        }else{
            classRemove(e.target);
        }
    }
}




inpBill.addEventListener("focus", e=>{
    e.preventDefault();
    addClassInputColor(e.target);
})
inpBill.addEventListener("focusout", e=>{
    e.preventDefault();
    removeClassInputColor(e.target);
})


inpPeople.addEventListener("focus", e=>{
    e.preventDefault();
    addClassInputColor(e.target);
})
inpPeople.addEventListener("focusout", e=>{
    e.preventDefault();
    removeClassInputColor(e.target);
})



inpBill.addEventListener("change", e=>{
    e.preventDefault();
    totalAmount = e.target.value;
})



divGrid.addEventListener("click", e=>{
    e.preventDefault();
    bgClear();
    getPercentage(e.target);
})



inpCustom.addEventListener("click", e=>{
    e.preventDefault();
    addClassInputColorCustom(e.target);
})

inpCustom.addEventListener("change", e=>{
    e.preventDefault();
    percentage = parseInt(inpCustom.value)/100;
})





divPeople.addEventListener("click", e=>{
    e.preventDefault();
    if (e.target.closest("input")){
        addClassInputColor(e.target);
    }
})


divPeople.addEventListener("input", e=>{

    e.preventDefault();
    calculo(e)
})


buttonReset.addEventListener("click", e=>{
    e.preventDefault();
    reset();

})

