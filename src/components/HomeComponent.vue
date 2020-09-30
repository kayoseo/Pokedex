<template src="./HomeComponent.html"></template>
<script>
export default {
  name: "HomeComponent",
  data() {
    return {};
  },
};
</script>

<style>
#home-component {
  position: relative;
  /* width: 1152px;
height: 700px; */

  background: #f9f9f9;
}

#title {
  position: absolute;
  width: 570px;
  height: 31px;
  left: 291px;
  top: 418px;

  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
  display: flex;
  align-items: center !important;
  text-align: center !important;

  color: #353535;
}
p {
  position: absolute;
  width: 570px;
  height: 54px;
  left: 291px;
  top: 479px;

  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  /* or 27px */

  text-align: center;

  color: #5e5e5e;
}
button{
 /* Btn/Normal */


/* Auto Layout */

display: flex;
flex-direction: row;
align-items: flex-start;
padding: 11px 0px 0px 20px;

position: absolute;
width: 131px;
height: 44px;
left: 511px;
top: 583px;

background: #F22539;
border-radius: 60px;

/* Get started */




font-family: Lato;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 22px;
/* identical to box height */


color: #FFFFFF;



}
</style>