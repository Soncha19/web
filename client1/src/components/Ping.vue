<template>
  <div>
    <Header/>

    <main class="sign-up">
      <header>
        <h1>Sign up</h1>
      </header>
      <form id="signup-form" @submit.prevent="submitForm($router)" action="http://localhost:8080/user/register" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="first_name">First name:</label>
        <input type="text" id="first_name" name="first_name" :value="firstName" required>

        <label for="last_name">Last name:</label>
        <input type="text" id="last_name" name="last_name" :value="lastName" required>

        <label for="address">Address:</label>
        <input type="text" id="address" name="address" required>

        <label for="phone_number">Phone Number:</label>
        <input type="tel" id="phone_number" name="phone_number" pattern="[0-9]{10}" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" minLength="8" required>

        <button type="submit">Sign up</button>
      </form>
      <p>already have an account?
        <RouterLink to="/sign-in">sign in</RouterLink>
      </p>
    </main>
    <Footer />
  </div>

</template>
<script>
import axios from 'axios';
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: 'SignUpForm',
  components: {Footer, Header},
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  methods: {
    submitForm(router) {
      const formData = new FormData(document.getElementById('signup-form'));

      axios.post('http://localhost:8080/user/register', Object.fromEntries(formData))
        .then(function (response) {
          // Handle success response
          console.log(response);
          alert('Sign up successful!');
          router.push('/sign-in');
        })
        .catch(function (error) {
          // Handle error response
          console.log(error);
          alert('Error: ' + error.message);
        });
    }
  }
}
</script>
<style lang="css">
@import 'style_signup.css';
</style>
