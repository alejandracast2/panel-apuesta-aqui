<template>
    <div>
        <div class="modal fade" id="historial_ingresos" tabindex="-1" aria-labelledby="myAccountJmLabel" aria-hidden="true"
            data-bs-backdrop="false" style="background-color:rgba(255, 255, 255, 0.5);">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background-color: white;">
                    <div class="modal-header2 p-0" style="">
                        <h6 class="modal-title" style="font-weight: bolder;" id="exampleModalLabel">Historial de Ingresos
                            <button type="button" style="color:white" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">×</span>
                        </button>
                        </h6>
                    </div>
                    <div class="modal-body p-4">
                        <div v-if="loading_report" style="width:100%" class="text-center p-2">
                            <div class="spinner-border" style="color:rgb(81, 81, 81)" role="status">
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table" style="font-size: 15px;">
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Accion</th>
                                        <th scope="col">Direccion IP</th>
                                        <th scope="col">Dispositivo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginarArray(report, registers_per_page)[actual_page - 1]" :key="index">
                                        <td>{{ formatearFecha(item.fecha) }}</td>
                                        <td>{{ item.descripcion }}</td>
                                        <td>{{ item.ip }}</td>
                                        <td>
                                            <span v-if="item.plataforma == 'desktop'"><i class="fas fa-desktop" aria-hidden="true"></i></span>
                                            <span v-else><i class="fas fa-mobile-alt" aria-hidden="true"></i></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <pagination class="float-end" :options="{texts:{count:''}}" v-model="actual_page" :records="records" :per-page="registers_per_page" @paginate="paginate"/>
                        </div><br><br><br>
                        <div class="text-center">
                            <button @click="closeModal" class="btn btn-danger" >Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Pagination from 'vue-pagination-2';
import axios from 'axios';
export default {
    name: "historialIngresos",
    props: [],
    components:{Pagination},
    data() {
        return {
            report:[],
            actual_page:1,
            records:0,
            registers_per_page:10,
            loading_report:false,
            data_requested:false
        }
    },
    computed: {
        apiUrl(){
            return this.$store.getters['getApiUrl'];
        },
        main_tree() {
            return this.$store.getters["getMainTree"];
        },
    },
    methods: {
        closeModal(){
            this.$parent.closeModal();
            this.data_requested = false;
        },
        paginate(page){
            this.actual_page = page;
        },
        paginarArray(array, elementosPorPagina) {
            const paginas = [];
            let paginaActual = [];

            for (let i = 0; i < array.length; i++) {
                if (paginaActual.length === elementosPorPagina) {
                    paginas.push(paginaActual);
                    paginaActual = [];
                }
                paginaActual.push(array[i]);
            }

            if (paginaActual.length > 0) {
                paginas.push(paginaActual);
            }
            this.records = array.length;
            this.pages = paginas;
            return paginas;
        },
        async getData() {
            try {
                this.loading_report=true;
                this.data_requested=true;
                let data = await axios.post(this.apiUrl +"/auditoria", {
                    "login_Id": this.main_tree.id
                })
                this.report = data.data;
                this.loading_report=false;
            } catch (error) {
                this.loading_report=false;
            }
        },
        parseNumbers(number){
            return new Intl.NumberFormat("de-DE",{minimumFractionDigits:2, maximumFractionDigits: 2}).format(number)
        },  
        formatearFecha(fechaString) {
            const fecha = new Date(fechaString);
            const anio = fecha.getFullYear();
            const mes = this.agregarCeroDelante(fecha.getMonth() + 1);
            const dia = this.agregarCeroDelante(fecha.getDate());
            const Hora = this.agregarCeroDelante(fecha.getHours());
            const Minutos = this.agregarCeroDelante(fecha.getMinutes());
            const Segundos = this.agregarCeroDelante(fecha.getSeconds());
            return `${anio}/${mes}/${dia} ${Hora}:${Minutos}:${Segundos}`;
        },
        agregarCeroDelante(numero) {
            return numero < 10 ? '0' + numero : numero;
        },
    },
    mounted() {
        this.$root.$on('getIngresosHistory', () => {
            if(!this.data_requested){
                this.getData();
            }
        });
    }
}
</script>
  
<style scoped>
.modal-header2 {
    margin-left: 5% !important;
    margin-right: 5% !important;
    margin-top: -1.25rem !important;
    margin-bottom: 0 !important;
    height: 60px;
    padding: 1rem !important;
    color: #fff;
    border-bottom: none;
    background: linear-gradient(40deg,#45cafc,#303f9f)!important;
}
</style>