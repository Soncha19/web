import { RouterLink } from 'vue-router';

<template>
  <div>
    <Header/>
    <main class="signin">
      <header>

        <h1 class="headtitle">Login to the site</h1>
      </header>

      <form>
        <label for="usr">Username:</label>
        <input type="text" id="usr" v-model="username">
        <br>
        <label for="pwd">Password:</label>
        <input type="password" id="pwd" v-model="password">
        <br>
        <button type="submit" @click.prevent="prepLogin($router)">Login</button>
      </form>
      <p>don't have an account?
        <RouterLink to="/sign-up">sign up</RouterLink>
      </p>
    </main>
    <Footer />
  </div>

</template>
<script>
import Header from "./Header.vue";
import axios from "axios";
import Footer from "./Footer.vue";


export default {
  components: {Footer, Header },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    prepLogin(router) {
      // Get the username and password values from the input fields
      const username = this.username;
      const password = this.password;

      // Get the username and password from local storage
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      // Create a data object with the username and password
      const data = { username: username, password: password };

      // Set the headers for the request
      const headers = {
        "Content-Type": "application/json",
      };

      // Send a POST request to the login endpoint
      axios
        .post("http://localhost:8080/login", data, { headers: headers })
        .then((response) => {
          if (response.status === 200) {
            // Handle the successful login
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            // Send a GET request to retrieve the user ID
            return axios.get(
              `http://localhost:8080/user/username?user_username=${username}`
            );
          } else {
            // Handle the incorrect username or password
            throw new Error("Invalid username or password");
          }
        })
        .then((response) => {
          if (response.status === 200) {
            // Parse the response and store the user ID in local storage
            localStorage.setItem(
              "userId",
              JSON.stringify(response.data.id)
            );
            alert("Logged in successfully");
            router.push('/profile');// Redirect to the user page
          } else {
            throw new Error("Unable to retrieve user ID");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
<style lang="css">
@import 'style_signin.css';
</style>
