const currencyOne = document.querySelector('.currency-one')
const currencyTwo = document.querySelector('.currency-two')
const inputValueOne = document.querySelector('.value-one')
const inputValueTwo = document.querySelector('.value-two')
const swapBtn = document.querySelector('.swap-btn')
const results = document.querySelector('.results')

const circleAnimation = e => {
    const top = e.clientY
    const left = e.clientX

    const btnTopPosition = e.target.offsetTop
    const btnLeftPosition = e.target.offsetLeft
    const btnInsideTop = top - btnTopPosition
    const btnInsideLeft = left - btnLeftPosition

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = btnInsideTop + "px"
    circle.style.left = btnInsideLeft + "px"

    e.target.append(circle)

    setTimeout(() => {
        circle.remove()
    }, 300);

}


const checkCurrencies = () => {
    const response = `https://api.exchangerate.host/convert?from=${currencyOne.value}&to=${currencyTwo.value}`
    fetch(response)
        .then(res => res.json())
        .then(data => {
            const currencyOneValue = currencyOne.value
            const currencyTwoValue = currencyTwo.value
            const rate = data.result
            const calculations = (inputValueOne.value * rate).toFixed(3)
            results.textContent = `${inputValueOne.value} ${currencyOneValue} * ${rate.toFixed(4)} = ${calculations} ${currencyTwoValue}`
            inputValueTwo.value = calculations

        })
}

const swap = () => {
    const oldOneValue = currencyOne.value
    const oldTwoValue = currencyTwo.value
    currencyOne.value = oldTwoValue
    currencyTwo.value = oldOneValue
    checkCurrencies()
}

// const requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR';
// const request = new XMLHttpRequest()
// request.open('GET', requestURL)
// request.responseType = 'json'
// request.send()

// request.onload = function () {
//     const response = request.response
//     console.log(response)
// }

inputValueOne.addEventListener('keyup', checkCurrencies)
swapBtn.addEventListener('click', circleAnimation), swapBtn.addEventListener('click', swap)
currencyOne.addEventListener('change', checkCurrencies)
currencyTwo.addEventListener('change', checkCurrencies)

checkCurrencies()