<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/new">Add recipe</RouterLink></li>
        <li>Add component</li>
      </ul>
    </nav>
    <h1><RouterLink to="/">Receptari</RouterLink></h1>
    <span>
      <img class="not_login" src="./icons/not_login.png" />
    </span>
  </header>
</template>

<style scoped>
header {
  background-color: black;
  color: white;
  width: 100%;
  display: inline-block;
}

header nav {
  display: inline-block;
  margin-left: 0;
  margin-right: auto;
  width: 33%;
}

header h1 {
  display: inline-block;
  margin-bottom: auto;
  margin-top: auto;
  width: 33%;
  text-align: center;
  height: 100%;
}

header > span {
  display: inline-block;
  margin-left: auto;
  margin-right: 0;
  width: 33%;
}

header img {
  width: 50px;
  float: right;
}
</style>
