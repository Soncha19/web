<template>
  <div>
    <Header />
    <main>
      <form class="searching">
        <label for="my-checkbox">Is local</label>
        <input type="checkbox" id="my-checkbox" name="my-checkbox" v-model="isGlobal">

        <button type="submit" @click="searchAds">Search</button>
      </form>

      <form class="searching">
        <label for="search-list">Category:</label>
        <input type="text" id="category" name="category" v-model="categoryName" />
        <button type="submit" @click.prevent="searchAdsByCategory">Search by Category</button>
      </form>

      <h2>Featured Listings</h2>
      <div class="classifieds">
        <div class="classified" v-for="(ad, index) in ads" :key="index">
          <h3>{{ ad.description }}</h3>
          <p>user id:{{ ad.user_id }}</p>
          <p>is global:{{ ad.is_global }}</p>

          <p>category id:{{ ad.category_id }}</p>
<!--          <p>{{ ad.id }}</p>-->
        </div>
        <div class="classified">
          <h3>Public your advert</h3>
          <nav>


              <button type="submit"> <RouterLink to="/new_add">New Add</RouterLink></button>

          </nav>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { Header, Footer },
  data() {
    return {
      isGlobal: false, // Show all global ads by default
      categoryName: "",
      ads: [],
    };
  },
  mounted() {
    // Fetch all global ads when the component is mounted
    this.searchAds();
  },
  methods: {
    searchAds() {
      let url = `http://localhost:8080/advertisement/findByAccess?advert_access=1`;

      if (this.isGlobal) {
        url = `http://localhost:8080/advertisement/findByAccess?advert_access=0`;
      }

      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.ads = data;
        });
    },

 searchAdsByCategory() {
      let url = `http://localhost:8080/advertisement/findByCategory?advert_category=${this.categoryName}`;

      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}`
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Category not found');
        })
        .then((data) => {
          console.log(data);
          this.ads = data;
        })
        .catch(error => {
          console.log(error.message);
          alert('Category doesn\'t exists');
        });
 }

  },


});
</script>

<style lang="css">
@import 'style.css';
</style>
