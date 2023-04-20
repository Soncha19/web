document.addEventListener('DOMContentLoaded',async ()=>  {
const userId = localStorage.getItem('userId');
    if (localStorage.getItem("username") === null) {
        window.location.replace('sign in.html');
    }
    try {
        const response = await fetch("http://localhost:8080/user/?user_id=" + userId, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Basic " + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))
            }
        })

        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            document.getElementById('new_username').value = data.username;
            document.getElementById('new_firstname').value = data.first_name;
            document.getElementById('new_lastname').value = data.last_name;
            document.getElementById('new_address').value = data.address;
            document.getElementById('new_phone').value = data.phone_number;
            document.getElementById('new_email').value = data.email;
        }

    } catch (error) {

    }
    })
