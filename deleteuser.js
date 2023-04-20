const delet = document.querySelector('#delete-form');

delet.addEventListener('submit', (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const url = `http://localhost:8080/user/?user_id=${userId}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
    })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                alert('User deleted successfully!');
            } else if (response.status === 404) {
                console.error(response.status + ' - ' + response.statusText);
                alert('User not found.');
            } else {
                console.error(response.status + ' - ' + response.statusText);
                alert('Error deleting user. Reason: ' + response.statusText);
            }
        })
        .catch(error => {
            console.log(error);
            alert('Error deleting user.');
        });
});
