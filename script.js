const inputs = Array.from(document.querySelectorAll('input'));
const error = document.querySelectorAll('small');
const submit = document.querySelector('.submit');
const patterns = {
    username: /^[a-z\d@_]{5,12}$/i,
    email : /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password:/^[\w@-]{8,20}$/i
}


function validate(regex,field) {
    if(regex.test(field.value)) {
        field.className = 'valid'
    } else {
        if(field.attributes.name.value === 'password') isPasswordCorrect();
        field.className = 'invalid'
    };
}

inputs.forEach(input => {
    input.addEventListener('keyup',(e) => {
        if(e.target.attributes.name.value === 'password-match') {
            isPasswordCorrect();
            return;
        }
     validate(patterns[e.target.attributes.name.value],e.target);
     (inputs[2].classList.contains('valid'))? inputs[3].disabled = false: inputs[3].disabled = true;
    })
} )

function isPasswordCorrect() {

   if(inputs[3].value === inputs[2].value) {
        inputs[3].className = 'valid'
        error[3].style.visibility = 'hidden'
    } else {
        inputs[3].disabled = false
        inputs[3].className = 'invalid'
        error[3].textContent = 'Password do not match'
        error[3].style.visibility = 'visible'
    }
}

submit.addEventListener('click',(e) =>{
    e.preventDefault();
    const success = document.querySelector('.successmsg')
    const error = document.querySelector('.errormsg')
  let result = inputs.every(input => {
    return   input.classList.contains('valid')
   })
   if(result) {
    error.style.display = 'none'
    success.style.display = 'block'
   }else {
       success.style.display = 'none'
    error.style.display = 'block'    
   }
   inputs.forEach(input => {
       input.value = '';
       input.classList.remove('valid')
       input.classList.remove('invalid')
   })
   inputs[3].disabled = true;
})