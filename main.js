import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { countries } from './countries.js'
import $ from 'jquery'
import swal from 'sweetalert'

let countryList = countries.map(country => country.common.toUpperCase())

document.querySelector('#app').innerHTML = `
  <h1 id="title">Guess The Country!</h1>
  <div>
    <h1 id="quest"></h1>
    <p><button id="pass">PASS</button></p>
    <p id="learnMore" class="read-the-docs">
      Answer:
    </p>
    <p><input id="answer" type="text" placeholder="Type your answer here" /></p>
    <button id="submit">Submit</button>
  </div>
`

$('#answer').val('').focus()

let currentCountryName = countryList[Math.floor(Math.random() * countryList.length)].replace('-', ' ')
let currentCountryArray = currentCountryName.split(' ')
let randomCountryName = ''

for(let countryWord of currentCountryArray) {
  let scrambledWord = scramble(countryWord)
  randomCountryName += (scrambledWord + ' ')
}

for (let i = 0; i < randomCountryName.length; i++) {
  if(i < randomCountryName.length - 1) {
    let char = randomCountryName[i] === ' ' ? '_' : randomCountryName[i]
    $('#quest').append($('<u>').text(char)).append($('<span>').text(' '))
  }
}

$('#answer').on('keypress', function (e) {
  if (e.which === 13) {
    $('#submit').trigger('click')
  }
})

$('#submit').on('click', function () {
  let answer = $('#answer').val().toUpperCase()
  if (answer.replace(/\s/g, '') === currentCountryName.replace(/\s/g, '')) {
    swal({
      title: 'Correct!',
      text: `The answer is ${currentCountryName}, well done!`,
      icon: 'success',
      timer: 2000,
      buttons: false
    })
    $('#answer').val('')
    countryList = countryList.filter(country => country !== currentCountryName)
    pickCountry()
  } else {
    swal({
      title: 'Oops!',
      text: 'Wrong answer, try again!',
      icon: 'error',
      timer: 1000,
      buttons: false
    })
  }
  $('#answer').val('').focus()
})

$('#pass').on('click', function () {
  swal({
    title: 'Pathetic!',
    text: `The answer is ${currentCountryName}`,
    icon: 'warning',
    timer: 2000,
    buttons: false
  })
  $('#answer').val('').focus()
  pickCountry()
})

function pickCountry() {
  currentCountryName = countryList[Math.floor(Math.random() * countryList.length)].replace('-', ' ')
  randomCountryName = scramble(currentCountryName)
  currentCountryArray = currentCountryName.split(' ')
  randomCountryName = ''

  for(let countryWord of currentCountryArray) {
    let scrambledWord = scramble(countryWord)
    randomCountryName += (scrambledWord + ' ')
  }
  
  $('#quest').empty()
  for (let i = 0; i < randomCountryName.length; i++) {
    if(i < randomCountryName.length - 1) {
      let char = randomCountryName[i] === ' ' ? '_' : randomCountryName[i]
      $('#quest').append($('<u>').text(char)).append($('<span>').text(' '))
    }
  }
}

function scramble(word) {
  let country = word.split('').sort(() => Math.random() - 0.5).join('').replace(/\s/g, '')
  if(country === word) {
    return scramble(word)
  } else {
    return country
  }
}