const form = document.querySelector('#update-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const newUsername = document.querySelector('#new_username').username;
    const newFirstName = document.querySelector('#new_firstname').value;
    const newLastName = document.querySelector('#new_lastname').value;
    const newAddress = document.querySelector('#new_address').value;
    const newPhoneNumber = document.querySelector('#new_phone').value;
    const newEmail = document.querySelector('#new_email').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:8080/user/?user_id=${userId}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);
            console.log(user);
            alert('User updated successfully!');
        } else {
            console.log(xhr.responseText);
            alert('Error updating user.');
        }
    };
    xhr.send(JSON.stringify({
        username: newUsername,
        first_name: newFirstName,
        last_name: newLastName,
        address: newAddress,
        phone_number: newPhoneNumber,
        email: newEmail,
    }));
});