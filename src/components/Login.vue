<template>
    <div>
      <h3 @click="Login">登 陆</h3>
    </div>
</template>

<script>
    export default {
        name: "Login",
      methods:{
        Login(){   //登陆
          this.$router.push("/Main");
        },
      }
    }
</script>

<style scoped>
h3{
  cursor: pointer;
}
</style>
