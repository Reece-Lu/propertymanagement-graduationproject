<template>
  <div style="background-color: rgb(244, 244, 245); height: 100vh;">

    <van-nav-bar
        title="Car Registration"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-form style="margin-top: 3vh" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="master" name="master" label="Owner:"/>
        <van-field v-model="registerForm.licensePlate" name="licensePlate" label="License Plate:"/>
        <van-field v-model="registerForm.parkingSpace" name="parkingSpace" label="Parking Space:"/>
        <van-field v-model="registerForm.colour" name="colour" label="Color:"/>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">Submit</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { proprietorRegisterCar } from "@/api/Car";

export default {
  name: "ProprietorRegisterCar",
  data() {
    return {
      registerForm: {
        masterId: '',
        licensePlate: "",
        parkingSpace: "",
        colour: "",
      },
      master: ""
    }
  },
  created() {
    this.proprietor = JSON.parse(localStorage.getItem('user'))
    this.registerForm.masterId = this.proprietor.id
    this.master = this.proprietor.name
  },
  methods: {
    onClickLeft() {
      this.$router.push('/proprietorcommunity')
    },
    onSubmit() {
      proprietorRegisterCar(this.registerForm).then(() => {
        this.timer = setTimeout(() => {   // Set delayed execution
          this.$router.push('/proprietorcommunity')
        }, 1000);
      })
    }
  }
}
</script>

<style scoped>

</style>
