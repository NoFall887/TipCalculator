// global variable
const billInput = document.getElementById("bill")
const personInput = document.getElementById("person")
const resetbtn = document.querySelector(".reset")
const customInput = document.querySelector(".input-mini")
const buttons = document.querySelectorAll(".grid button")
const sectionBill = document.getElementById("section-bill")
const sectionPerson = document.getElementById("section-person")
const tipRes = document.getElementById("tip-res")
const totalRes = document.getElementById("total-res")
var activeBtn = null

var billValue = ''
var tipValue = ''
var personValue = ''

var tipAmount = 0
var total = 0

// helper function
function parse(val) {
    let temp = val
    if (temp === '') {
        return ''
    } else {
        return parseFloat(temp)
    }
}

// tip section
function activateBtn(node) {
    node.classList.add("button-active")
    activeBtn = node
    tipValue = parse(node.value)
}

function deactivateBtn(node) {
    node.classList.remove("button-active")
    activeBtn = null
    tipValue = ''
}
function getTipValue() {    
    if (activeBtn == null) {
        if (customInput.value !== '') {
            customInput.value = ''
        }
        activateBtn(this)
    } else if (activeBtn == this) {
        deactivateBtn(this)
    } else {
        deactivateBtn(activeBtn)
        activateBtn(this)
    }
    if (tipValue !== '') {
        startCount()
    }
}
// custom sub section
customInput.addEventListener("input", function(){
    if (activeBtn !== null) {
        deactivateBtn(activeBtn)
    }
    
    tipValue = parse(this.value)
    if (tipValue === 0){
        customInput.classList.add("red-alert")
        hide()
    } else{
        if (customInput.classList.contains("red-alert")) {
            customInput.classList.remove("red-alert")
        }
        startCount()
    }
})

for (let i of buttons) {
    i.addEventListener("click", getTipValue)
}

// bill section
billInput.addEventListener("input", function (){
    billValue = parse(this.value)
    if (billValue === 0) {
        billInput.classList.add("red-alert")
        sectionBill.classList.add("warning-text")
        hide()
    } else {
        if (billInput.classList.contains("red-alert")) {
            billInput.classList.remove("red-alert")
            sectionBill.classList.remove("warning-text")
        }
        startCount()
    }
})

// person section
personInput.addEventListener("input", function () {
    personValue = parse(this.value)
    if (personValue === 0){
        personInput.classList.add("red-alert")
        sectionPerson.classList.add("warning-text")
        hide()
    } else {
        if (personInput.classList.contains("red-alert")) {
            personInput.classList.remove("red-alert")
            sectionPerson.classList.remove("warning-text")
        }
        startCount()
    }
})

function count() {
    tipAmount = billValue*tipValue/100/parseInt(personValue)
    tipAmount = parseFloat(tipAmount.toFixed(2))
    total = (billValue/parseInt(personValue) + tipAmount).toFixed(2)
}

function show(){
    tipRes.textContent = `$${tipAmount}`
    totalRes.textContent = `$${total}`
}

function hide() {
    tipRes.textContent = "$0.00"
    totalRes.textContent = "$0.00"
}

// reset section

resetbtn.addEventListener("click", function(){
    billInput.value = ''
    billValue = ''

    personInput.value = ''
    personValue = ''

    if (customInput.value !== '') {
        customInput.value = ''
        tipValue = ''
    } else {
        deactivateBtn(activeBtn)
    }
    
    
    hide()
    resetInactive()
})

function resetActive() {
    resetbtn.classList.remove('reset-inactive')
    resetbtn.removeAttribute("disabled")
    resetbtn.classList.add('reset-active')
}
function resetInactive() {
    resetbtn.classList.remove('reset-active')
    resetbtn.disabled = true
    resetbtn.classList.add('reset-inactive')
}

function startCount() {
    if (!(tipValue === '' || billValue === '' || personValue === '')){
        count()
        show()
        resetActive()
    } else {
        hide()
        resetInactive()
    }
}