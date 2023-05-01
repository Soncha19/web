import { RouterLink } from 'vue-router';
import Header from Header.vue;
<template>
<div>
  <Header />
  <main class="profile">

    <h2>Update user</h2>
    <form @submit.prevent="submitForm">
      <label for="new_username">Username:</label>
      <input type="text" id="new_username" v-model="username" required>

      <label for="new_firstname">First name:</label>
      <input type="text" id="new_firstname" v-model="firstName" required>

      <label for="new_lastname">Last name:</label>
      <input type="text" id="new_lastname" v-model="lastName" required>

      <label for="new_address">Address:</label>
      <input type="text" id="new_address" v-model="address" required>

      <label for="new_phone">Phone Number:</label>
      <input type="tel" id="new_phone" v-model="phoneNumber" pattern="[0-9]{10}" required>

      <label for="new_email">Email:</label>
      <input type="email" id="new_email" v-model="email" required>

      <button @click.prevent="prepLogin" type="submit">Save Changes</button>
    </form>

    <!-- Форма для видалення користувача -->
    <h2>Delete user</h2>
    <form id="delete-form">

      <button @click.prevent="deleteUser" type="submit" id="delete-button">Delete</button>
    </form>



  </main>
  <Footer />
</div>
</template>

<script>
import Header from "./Header.vue";
import axios from 'axios';
import Footer from "./Footer.vue";
export default {
  components: { Footer, Header },
  data() {
    return {
      userId: localStorage.getItem('userId'),
      username: '',
      username1: localStorage.getItem('username'),
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      password: localStorage.getItem('password'),
      newUsername: ''
    }
  },

  async mounted() {
    if (!localStorage.getItem('username')) {
      window.location.replace('sign in.html');
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/user/?user_id=${this.userId}`, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
          }
        });
        if (response.status === 200) {
          const data = response.data;
          this.username = data.username;
          this.firstName = data.first_name;
          this.lastName = data.last_name;
          this.address = data.address;
          this.phoneNumber = data.phone_number;
          this.email = data.email;
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {
    // async submitForm() {
    //   try {
    //     const response = await fetch(`http://localhost:8080/user/?user_id=${this.userId}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
    //       },
    //       body: JSON.stringify({
    //         username: localStorage.getItem('username'),
    //         first_name: this.firstName,
    //         last_name: this.lastName,
    //         address: this.address,
    //         phone_number: this.phoneNumber,
    //         email: this.email
    //       })
    //     });
    //     if (response.status === 200) {
    //       alert('Changes saved successfully!');
    //     } else {
    //       alert('An error occurred while saving changes. Please try again later.');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    prepLogin() {
      // Do any necessary data validation before calling updateUser method
      this.updateUser();
    },
    updateUser() {
      const self = this;
      axios.put(`http://localhost:8080/user/?user_id=${this.userId}`, {

        first_name: this.firstName,
        last_name: this.lastName,
        address: this.address,
        phone_number: this.phoneNumber,
        email: this.email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
        }
      })
        .then(function(response) {
          console.log(response.data);
          alert('User updated successfully!');
         // self.newUsername = ''; // Reset newUsername field to empty
        })
        .catch(function(error) {
          console.log(error.response.data);
          alert('Error updating user.');
        });
    },
    deleteUser() {
      const self = this;
      axios.delete(`http://localhost:8080/user/?user_id=${this.userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
        }
      })
        .then(function(response) {
          if (response.status === 200) {
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
        .catch(function(error) {
          console.log(error.response.data);
          alert('Error deleting user.');
        });
    }

  }
};
</script>


<style lang="css">
@import 'style_profile.css';
</style>
