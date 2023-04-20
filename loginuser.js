document.getElementById("123").addEventListener("click", prepLogin);

function prepLogin(event) {
    event.preventDefault();
    // Get the username and password values from the input fields
    const username = document.getElementById('usr').value;
    const password = document.getElementById('pwd').value;

    // Get the username and password from local storage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Create a data object with the username and password
    const data = { 'username': username, 'password': password };

    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Send a POST request to the login endpoint
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            // Handle the successful login
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // Send a GET request to retrieve the user ID
            return fetch(`http://localhost:8080/user/username?user_username=${username}`);
        } else {
            // Handle the incorrect username or password
            throw new Error('Invalid username or password');
        }
    }).then(response => {
        if (response.ok) {
            // Parse the response and store the user ID in local storage
            return response.json();
        } else {
            throw new Error('Unable to retrieve user ID');
        }
    }).then(data => {
        localStorage.setItem('userId', JSON.stringify(data.id));
        alert('Logged in successfully');
        window.location.replace('userpage.html'); // Redirect to the user page
    }).catch(error => {
        alert(error.message);
    });
}





