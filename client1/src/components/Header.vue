import { RouterLink } from 'vue-router';
<template>
  <div>
    <header>
      <h1>Classifieds Website</h1>
    </header>
    <nav>
      <RouterLink to="/">Home</RouterLink>


      <ul>
        <li><RouterLink to="/category">Categories</RouterLink></li>
        <li><RouterLink to="/new_add">New Add</RouterLink></li>
        <li><RouterLink to="/profile">My profile</RouterLink></li>
        <li><RouterLink to="/find_user">Search people</RouterLink></li>
      </ul>
      <RouterLink to="/sign-in">Sign in</RouterLink>
      <RouterLink to="/sign-up">Sign up</RouterLink>
    </nav>
  </div>
</template>
<style lang="css">
@import 'style_header.css';
</style>
