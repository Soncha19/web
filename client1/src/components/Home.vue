import { RouterLink } from 'vue-router';
<template>
  <div>
    <Header />
    <main>

      <form class="searching">
        <label for="my-checkbox">Access</label>
        <input type="checkbox" id="my-checkbox" name="my-checkbox">

        <label for="search-list">Category:</label>
        <select id="search-list" name="search-list">
          <option value="titles">Missing</option>
          <option value="authors">Apartments</option>
          <option value="keywords">Sale</option>
        </select>

        <button type="submit">Search</button>

      </form>
      <h2>Featured Listings</h2>
      <div class="classifieds">
        <div class="classified">
          <h3>For Sale: Antique Dresser</h3>
          <p>Beautiful antique dresser for sale. Excellent condition.</p>
          <p>$500</p>
        </div>

        <div class="classified">
          <h3>Housing: 2-Bedroom Apartment</h3>
          <p>Spacious 2-bedroom apartment for rent. Close to public transportation.</p>
          <p>$1200/month</p>
        </div>
        <div class="classified">
          <h3>Jobs: Part-Time Receptionist</h3>
          <p>Local office seeking part-time receptionist. Must have good communication skills.</p>
          <p>$15/hour</p>
        </div>
        <div class="classified">
          <h3>Public your advert</h3>
          <nav>
            <a href="new advert.html" target="_blank">
              <button type="submit">Public my ad</button>
            </a>
          </nav>
        </div>
      </div>
    </main>
    <Footer />
  </div>

</template>
<style lang="css">
@import 'style.css';
</style>
<script>
import Header from "./Header.vue";
import {defineComponent} from "vue";
import Footer from "./Footer.vue";

export default defineComponent({
  components: {Footer, Header}
})

</script>
