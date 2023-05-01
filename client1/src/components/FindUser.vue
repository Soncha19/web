<template>
  <div>
  <Header />
  <main class="find_user">
    <header>
      <h1>Search user</h1>
    </header>

    <form @submit.prevent="searchUser">
      <label><input type="radio" v-model="searchType" value="id"> By ID</label><br>
      <label><input type="radio" v-model="searchType" value="username"> By username</label><br><br>
      <label for="search">Search:</label>
      <input type="text" id="search" v-model="searchTerm"><br><br>
      <button type="submit">Search</button>
    </form>

    <div v-if="searchResult">
      <h2>Search Result</h2>
      <p>Username: {{ searchResult.username }}</p>
      <p>First Name: {{ searchResult.first_name }}</p>
      <p>Last Name: {{ searchResult.last_name }}</p>
      <p>Address: {{ searchResult.address }}</p>
      <p>Phone Number: {{ searchResult.phone_number }}</p>
      <p>Email: {{ searchResult.email }}</p>
    </div>
  </main>
    <Footer />
  </div>
</template>
<script>
import axios from 'axios';
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {Footer, Header},
  data() {
    return {
      searchType: 'id',
      searchTerm: '',
      searchResult: null
    }
  },
  methods: {
    async searchUser() {
      try {
        let url = `http://localhost:8080/user/?user_id=${this.searchTerm}`;
        if (this.searchType !== 'id') {
          url = `http://localhost:8080/user/username?user_username=${this.searchTerm}`;
        }

        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
          }
        });

        if (response.status === 200) {
          this.searchResult = response.data;
        } else {
          alert('An error occurred while searching for the user. Please try again later.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style lang="css">
@import 'style_find_user.css';
</style>
