const form = document.getElementById('signup-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                alert('Sign up successful!');

            } else {
                alert('Error: ' + xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(Object.fromEntries(formData)));
});