<template>
  <div>
    <Header />
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
      </tr>
      </tbody>
    </table>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {Footer, Header},
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    // Retrieve the list of categories from the backend API
    fetch('http://localhost:8080/category/findAll')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Вивести результат запиту до консолі
        this.categories = data;
      })

  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
