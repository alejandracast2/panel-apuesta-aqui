<template>
    <div>
      <section style="position: relative;height:100vh;overflow: hidden;">
            <div class="mask rgba-stylish-strong h-100 d-flex justify-content-center align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto">
                            <div class="card fadeIn" style="background-color: #606471;">
                                <div class="card-body">
                                    <div class="form-header blue-gradient">
                                        <h3 class="font-weight-500 my-2 py-1"><i class="fas fa-user"></i>Ingreso
                                        </h3>
                                    </div>
                                    <form @submit.prevent="login()">
                                        <div v-if="alert!=''" style="color:red;">{{ alert }}</div>
                                        <div class="md-form" style="color:white !important">
                                            <i class="fas fa-user prefix" style="left:0;color:white !important"></i>
                                            <input style="color:white !important" v-model="email" type="text" id="user" class="form-control" autocomplete="off" required>
                                            <label style="color:white !important" for="user" class="">Nombre de usuario</label>
                                        </div>
                                        <div class="md-form" style="color:white !important">
                                            <i class="fas fa-lock prefix" style="left:0;color:white !important"></i>
                                            <input style="color:white !important" v-model="password" type="password" id="passwd" class="form-control" autocomplete="off" required>
                                            <label style="color:white !important" for="passwd">Contraseña</label>
                                        </div>
                                        <div class="text-center">
                                            <div class="col-12 mt-3 mb-3 text-center" id="error"></div>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn blue-gradient btn-lg waves-effect waves-light" id="dologin" data-loading="<i class='fa fa-spinner fa-spin '></i> Ingresando...">Ingresar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </template>
  <script>
  import router from '../router/index';
  export default {
    name: 'LoginPage',
    components: {
    },
    data() {
        return {
            email:"",
            password:"",
            alert:""
        }
    },
    computed:{
        UserData() {
            return this.$store.getters["getUserData"];
        },
    },
    methods: {
        async login(){
            let loginBtn = document.getElementById("dologin");
            loginBtn.innerHTML = loginBtn.dataset.loading;
            loginBtn.disabled = true; 
            let loginResponse = await this.$store.dispatch("login",{username:this.email,password:this.password});
            if(loginResponse == "success"){
                router.push({ name: 'dashboard' })
            }
            else{
                this.alert = loginResponse;
                loginBtn.innerHTML = "Ingresar";
                loginBtn.disabled = false; 
            }
        }
    },
    created(){
        if (localStorage.getItem("loginToken") && !this.UserData.token) {
            const supportId = localStorage.getItem('supportId')
            if(supportId){
                if(supportId !== router.currentRoute.query.supportId){
                    localStorage.setItem('supportId', router.currentRoute.query.supportId)
                }
            }
            this.$store.dispatch("login", { token: localStorage.getItem("loginToken") })
        }
    }
  }
  </script>
  
  <style scoped>
  </style>
  