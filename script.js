const allInputs = document.querySelectorAll('.input')
const form = document.querySelector('#form')
const img = document.querySelector('.img')
const imgInput = document.querySelector('#img-input')
const firstName = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const errorElement = document.querySelector('#error')
const resume = document.querySelector('.resume')
const resumeContent = document.querySelector('.resume_content')

let obj = {
  name: '',
  email: '',
  phone: '',
  year: 0,
}

const emailRe =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const nameRe = /^[a-zA-Z\-]+$/
const phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const yearRe = /^(194[5-9]|19[5-9]\d|200\d|202[0-1])$/

function validate(re, inp) {
  return re.test(inp)
}

function createResumeText(obj) {
  let li = ''
  let ul
  for (let key in obj) {
    li += `<li class="list_item">${key}: ${obj[key]}</li>`
  }
  if (li) {
    ul = `<ul class="list">${li}</ul>`
  }
  return ul || ''
}

function createResume(container, obj) {
  container.innerHTML = createResumeText(obj)
}

function validator() {
  const message = []
  if (!validate(nameRe, firstName.value)) {
    firstName.classList.add('error')
    errorElement.innerHTML = 'форма не валидна'
    message.push('name')
  } else {
    firstName.classList.remove('error')
    obj.name = firstName.value
  }

  if (!validate(emailRe, email.value)) {
    email.classList.add('error')
    errorElement.innerHTML = 'форма не валидна'
    message.push('email')
  } else {
    email.classList.remove('error')
    obj.email = email.value
  }

  if (!validate(phoneRe, phone.value)) {
    phone.classList.add('error')
    errorElement.innerHTML = 'форма не валидна'
    message.push('phone')
  } else {
    phone.classList.remove('error')
    obj.phone = phone.value
  }

  if (!validate(yearRe, year.value)) {
    year.classList.add('error')
    errorElement.innerHTML = 'форма не валидна'
    message.push('year')
  } else {
    year.classList.remove('error')
    obj.year = year.value
  }
  errorElement.innerHTML = ''
  return message
}

form.addEventListener('submit', (e) => {
  const createInfo = `<input class="input" id="input_info" type="text" placeholder="добавить поле" />
    <button class="btn" id="btn__info">добавить</button>`
  e.preventDefault()
  const div = document.createElement('div')
  div.innerHTML = createInfo

  if (validator().length === 0) {
    createResume(resumeContent, obj)
    resumeContent.appendChild(div)
    const addInfo = document.querySelector('#btn__info')
    const inputInfo = document.querySelector('#input_info')
    createBlock(addInfo, inputInfo)
    if (e.target[4].files && e.target[4].files[0]) {
      img.onload = () => {
        URL.revokeObjectURL(img.src)
      }
      img.src = URL.createObjectURL(e.target[4].files[0])
    }
  }
})

function createBlock(btn, inputInfo) {
  btn.addEventListener('click', () => {
    const el = document.createElement('div')
    el.classList.add('info')

    el.innerHTML = `
                <h2>${inputInfo.value}</h2>
                <div class="info-block">
                    <div class="result"></div>
                    <input class="input" placeholder="заголовок"/>
                    <input class="input" placeholder="текст"/>
                    <button class="btn" >добавить</button>
                </div>`
    const button = el.children[1].children[3]
    const result = el.children[1].children[0]
    inputInfo.value = ''
    button.addEventListener('click', () => {
      let title = el.children[1].children[1]
      let text = el.children[1].children[2]
      result.innerHTML += `
                <div class="info_block">
                  <div class="info_title">${title.value}:</div>
                  <div class="info_title">${text.value}</div>
                </div>`

      title.value = ''
      text.value = ''
    })
    resumeContent.appendChild(el)
  })
}
