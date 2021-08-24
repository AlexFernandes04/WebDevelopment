const button = document.querySelector('#signUp');
const input = document.querySelectorAll('input')
const email = input[0];

let inputTrue = false;

const warning = document.createElement('div');
warning.classList.add('alert', 'alert-warning', 'my-4');
warning.setAttribute("role", "alert");

button.addEventListener('click', function (e) {
    warning.classList.add('alert', 'alert-warning', 'my-4');

    for (let i = 1; i < input.length; i++) {
        if (input[i].checked) {
            inputTrue = true;
        }
    }
    e.preventDefault;
    if (!email.value) {
        warning.innerText = 'Please enter an email';
        button.after(warning);
    } else if (!email.value.includes('@') || !email.value.includes('.')) {
        warning.innerText = 'Please enter a valid email';
        button.after(warning);
    } else if (!inputTrue) {
        warning.innerText = 'Please select at least one option';
        button.after(warning);
    } else {
        email.value = "";
        for (let i = 1; i < input.length; i++) {
            input[i].checked = false;
        }
        button.after(warning);
        warning.classList.remove('alert-warning');
        warning.classList.add('alert-info');
        warning.innerText = 'Thank you for signing up!';
        console.log('done');
        setTimeout(function () { warning.remove(); }, 3000);
    }
    inputTrue = false;
})
