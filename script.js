const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// input Error
function showError(input, message){
  input.parentElement.className = 'form-control error';
  input.nextElementSibling.innerText = message;
}

// input Success
function showSuccess(input){
  input.parentElement.className = 'form-control success';
}

// check email is valid
function isValidEmail(email){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Check Required
function checkRequired(inputArr){
  inputArr.forEach(input => {
    if(input.value.trim() === ''){
      showError(input, `${getInputName(input)} is required!`)
    }else{
      showSuccess(input);
    }
    if(input.id === 'email' && input.value !== ''){
      if(!isValidEmail(input.value)){

        showError(input, `${getInputName(input)} is not valid!`);
      }
    }
  })
}

// Check Length (Username -> 3 a 15) (password -> 6 a 25)
function checkLength(input, min, max){
  if(input.value !== '' && input.value.length < min){
    showError(input, `${getInputName(input)} must be at least ${min} characters`)
  }else if(input.value.length > max){
    showError(input, `${getInputName(input)} must be less than ${max} characters`)
  }
}

// Passwords Match
function passwordMatch(pass1, pass2){
  if(pass1.value !== pass2.value && pass2.value !== ''){
    showError(pass2, 'Passwords not match!')
  }
}

//Get Input Name
function getInputName(input){
  return input.previousElementSibling.innerText;
}

// Event Listeners
form.addEventListener('submit', (e) =>{

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  passwordMatch(password, password2);
  
  e.preventDefault();
})

