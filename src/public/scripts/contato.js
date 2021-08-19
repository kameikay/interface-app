const input = document.querySelector('#email')

function validation() {
    const email = document.querySelector('#email').value
    const error = document.querySelector('#email-error')
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.match(pattern)) {
        error.innerHTML = ''
        input.style.borderBottom = '2px solid #1d99a7'
    } else {
        error.innerHTML = "E-mail inválido!"
        input.style.borderBottom = '2px solid rgb(214, 67, 67)'
    }
}

input.addEventListener('keydown', validation)