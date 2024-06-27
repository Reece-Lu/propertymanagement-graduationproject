<template>
  <div class="about">
    <h1 style="text-align: center">About Page for Residential Complex Management System</h1>
    <p style="text-align: center">
      Visitor Account: guest Password: Guest123
    </p>
    <h1 style="text-align: center">Developed by Lu Yuwen</h1>
    <h2 style="text-align: center">Guided by Gao Yu, Liu Caihong</h2>
    <h1 style="text-align: center">A skyscraper starts from the ground</h1>
  </div>
</template>

<script>
export default {
  created() {
    localStorage.removeItem('isLogin');
  }
}
</script>
