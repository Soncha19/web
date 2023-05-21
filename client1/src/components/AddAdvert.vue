<template>
  <div>
    <Header />
    <main class="new-ad">
      <div class="container">
        <header>
          <h1>Publication of advert</h1>
        </header>

        <form @submit.prevent="submitForm">


          <label for="description">Description:</label>
          <textarea id="description" v-model="description" required></textarea>

          <label for="my-checkbox">Access:</label>
          <input type="checkbox" id="my-checkbox" v-model="is_global">

          <label for="search-list">Category:</label>
          <input type="text" id="category" v-model="category_id" required>


          <br>
          <button type="submit">Public</button>
        </form>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'AddAdvert',
  components: { Header, Footer },
  data() {
    return {

      description: '',
      is_global: false,
      category_id: '',
      user_id:''
    };
  },
  methods: {
    submitForm() {
      axios
        .post('http://localhost:8080/advertisement', {

          description: this.description,
          is_global: this.is_global,
          category_id: this.category_id,
          user_id:localStorage.getItem('userId')
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
          }
        })
        .then(response => {
          console.log(response.data);
          //this.$router.push({ name: 'Advert', params: { id: response.data.id } });
        })
        .catch(error => {
          if (error.response ) {
            alert('Category doesn\'t exists');
          } else {
            console.log(error.response.data);
          }
        });
    }
  }
};
</script>
<style lang="css">
@import 'style_new_ad.css';
</style>
