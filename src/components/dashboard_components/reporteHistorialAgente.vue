<template>
    <div>
        <main :class="view_type">
            <div class="container-fluid mb-5">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row mt-4 mb-3">
                            <div class="col-6 col-lg-9 pt-2 pl-4">
                                <h5 class="white-text font-weight-bold">Historial de Agente</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-lg-9 thin" id="main_container">
                                <div class="card">
                                    <div class="card-body p-1 py-4 px-sm-4">
                                        <div class="row mx-2">
                                            <div
                                                class="col-6 col-sm-3 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-4">
                                                <div class="md-form">
                                                    <customCalendar class="form-control" :reference="1" :date="startDate" id="start_date" @updateData="event => startDate = event" style="border-color: transparent;"/>
                                                    <label for="start_date" class="active">Fecha Inicial</label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-4 col-sm-2 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-5">
                                                <div class="md-form">
                                                    <vue-clock-picker2 v-model="startHour" :active-color="'#417df4'" :input-class="'form-control picker__input'"></vue-clock-picker2>
                                                    <label for="start_time" class="active">Hora Inicial</label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-6 col-sm-3 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-6">
                                                <div class="md-form">
                                                    <customCalendar class="form-control" :reference="2" :date="endDate" id="start_date" @updateData="event => endDate = event" style="border-color: transparent;"/>
                                                    <label for="end_date" class="active">Fecha Final</label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-4 col-sm-2 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-7">
                                                <div class="md-form">
                                                    <vue-clock-picker2 v-model="endHour" :active-color="'#417df4'" :input-class="'form-control picker__input'"></vue-clock-picker2>
                                                    <label for="end_time" class="active">Hora Final</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div
                                                class="col-8 offset-2 col-sm-4 offset-sm-2 col-lg-4 col-xl-3 offset-xl-2 pb-xl-4 pt-xl-3">
                                                    <div class="md-form font-size-custom2 text-left my-0">
                                                        <input type="text" id="UserSearch" v-model="targetUserName"
                                                            class="form-control mdb-autocomplete search-username"
                                                            maxlength="16">
                                                        <label for="UserSearch" class="active">Nombre de usuario</label>
                                                        <button class="mdb-autocomplete-clear">
                                                            <svg fill="#000000" height="20" viewBox="0 0 20 20" width="20">
                                                                <path
                                                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                                                </path>
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-5 offset-5 col-sm-3 offset-sm-1 col-lg-3 col-xl-3 offset-xl-1 pt-2 pt-xl-3 pb-4 pb-sm-3 text-center text-xl-right">
                                                    <button class="btn btn-sm btn-cyan waves-effect waves-light" @click="getReport"
                                                        id="search">Buscar</button>
                                                </div>
                                        </div>
                                        <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div class="top"></div>
                                            <div id="history_processing" class="dataTables_processing card"
                                                v-if="loadingReport">Procesando...</div>
                                            <table id="history"
                                                class="table table-striped table-hover w-100 dataTable no-footer"
                                                cellspacing="0" role="grid" style="width: 1182px;">
                                                <thead>
                                                    <tr role="row">
                                                        <th scope="col"
                                                            class="sorting_disabled d-none d-sm-block dt-date text-center"
                                                            rowspan="1" colspan="1" style="width: 222px;">Fecha</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-operation text-center pl-sm-3"
                                                            rowspan="1" colspan="1" style="width: 183px;">Operacion</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-username text-center pl-sm-3"
                                                            rowspan="1" colspan="1" style="width: 146px;">Usuario</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-amount pr-sm-3 text-center"
                                                            rowspan="1" colspan="1" style="width: 144px;">Importe</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-before d-none d-lg-table-cell pr-sm-3 text-center"
                                                            rowspan="1" colspan="1" style="width: 156px;">Saldo Anterior
                                                        </th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-after d-none d-lg-table-cell pr-sm-3 text-center"
                                                            rowspan="1" colspan="1" style="width: 167px;">Saldo Posterior
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr role="row" class="odd" v-for="(item, index) in paginarArray(reportData.data??[], registers_per_page)[actual_page - 1]" :key="index">
                                                        <td class=" d-none d-sm-block dt-date text-center">{{ formatearFecha(item.fecha) }}</td>
                                                        <td class="dt-operation pl-sm-3 text-left">{{ item.detalles }}</td>
                                                        <td class=" dt-username text-center pl-sm-3">{{ item.username }}</td>
                                                        <td class="dt-amount pr-sm-3 text-right">{{ parseNumbers(item.valor) }}</td>
                                                        <td class="dt-before d-none d-lg-table-cell pr-sm-3 text-right">{{ parseNumbers(item.antiguo_capital) }}</td>
                                                        <td class="dt-after d-none d-lg-table-cell pr-sm-3 text-right">{{ parseNumbers(item.nuevo_capital) }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="bottom row">
                                                <div class="col-12 col-md-6 d-flex" id="">
                                                    <label class="py-2">Mostrar registros</label>
                                                    <section class="section-preview">
                                                        <div class="select-wrapper mdb-select col-8">
                                                            <span class="caret">▼</span>
                                                            <input type="text"
                                                                class="select-dropdown w-100 text-center active"
                                                                @click="showMaxRegisterSelection" readonly="true" value=""
                                                                v-model="registers_per_page">
                                                            <ul id="selectPage"
                                                                class="dropdown-content select-dropdown w-100 text-center active"
                                                                style="width: 82.125px; position: absolute; top: -73.391px; left: 15px; opacity: 1; 
                                                                display: none;">
                                                                <li :class="registers_per_page==10?'active':''" @click="setRegistersPerPage(10)">
                                                                    <span class="filtrable">10</span>
                                                                </li>
                                                                <li :class="registers_per_page==25?'active':''" @click="setRegistersPerPage(25)">
                                                                    <span class="filtrable">25</span>
                                                                </li>
                                                                <li :class="registers_per_page==50?'active':''" @click="setRegistersPerPage(50)">
                                                                    <span class="filtrable">50</span>
                                                                </li>
                                                            </ul>
                                                            <select name="users_length" aria-controls="users"
                                                                class="mdb-select col-4 initialized">
                                                                <option value="10">10</option>
                                                                <option value="25">25</option>
                                                                <option value="50">50</option>
                                                            </select>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="dataTables_paginate paging_simple_numbers col-12 col-md-6">
                                                    <pagination :options="{texts:{count:''}}" v-model="actual_page" :records="records" :per-page="registers_per_page" @paginate="paginate"/>
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-none d-lg-block col-lg-3 offset-lg-0 pt-4 pt-lg-0 pl-md-0 wide"
                                id="affiliates_tree_container">
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import Pagination from 'vue-pagination-2';
import customCalendar from '../customCalendar.vue';
let VueClockPicker2 = VueClockPicker;
export default {
    name: 'reporteHistorialAgente',
    components: {Pagination,customCalendar,VueClockPicker2},
    data() {
        return {
            actual_page: 1,
            registers_per_page: 10,
            startDate: "",
            startHour: "",
            endDate: "",
            endHour: "",
            targetUserName:"",
            loadingReport:false,
            reportData:{},
            pages:[],
            records:0
        }
    },
    props: ["view_type"],
    computed: {
        apiUrl(){
            return this.$store.getters['getApiUrl'];
        },
        main_tree() {
            return this.$store.getters["getMainTree"];
        },
        targetUser() {
            return this.$store.getters["getTargetUser"];
        },
        apiUrlnew(){
            return this.$store.getters['getApiUrlnew'];
        },
        userInfo(){
            return this.$store.getters["getUserData"];
        },
        site(){
            return this.$store.getters['getSite'];
        }
    },
    methods: {
        async getReport(){
            try {
                this.actual_page=1;
                this.loadingReport = true;
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                let response = await axios.post(this.apiUrlnew + "movimiento_fichas_agente",{
                    "username": this.targetUserName,
                    "startDate": this.getFechaFormated(this.startDate)+" "+this.startHour+":00",
                    "endDate": this.getFechaFormated(this.endDate)+" "+this.endHour+":00",
                    "timezone": timezoneFormated,
                    "site":this.site,
                    "token":this.userInfo.token
                })
                if(response.data){
                    this.reportData = response.data;
                }
                this.loadingReport = false;
            } catch (error) {
                this.loadingReport = false;
                console.log(error);
            }
        },
        setNameSearch() {
            this.searchByName = this.username;
            this.searchByTarget = this.selectedTarget;
            this.getReport();
        },
        getFechaFormated(date){
            var meses = {
                "ENERO": "01",
                "FEBRERO": "02",
                "MARZO": "03",
                "ABRIL": "04",
                "MAYO": "05",
                "JUNIO": "06",
                "JULIO": "07",
                "AGOSTO": "08",
                "SEPTIEMBRE": "09",
                "OCTUBRE": "10",
                "NOVIEMBRE": "11",
                "DICIEMBRE": "12"
            };

            // Dividir la cadena original en día, mes y año
            var partesFecha = date.split(" ");
            var dia = partesFecha[0];
            var mes = partesFecha[1].toUpperCase();
            var anio = partesFecha[2];

            // Formatear la fecha en el formato deseado (YYYY-MM-DD)
            var fechaFormateada = anio + "-" + meses[mes] + "-" + dia;

            // Resultado
            return fechaFormateada
        },
        getFecha(date){
            var formattedDay = ("0" + date.getDate()).slice(-2); // Añade un cero si es necesario
            var formattedMonth = date
            .toLocaleString("es", { month: "long" })
            .toLowerCase();
            var formattedYear = date.getFullYear();
            return `${formattedDay} ${formattedMonth} ${formattedYear}`
        },
        parseRole(role) {
            if (role) {
                let role_name = role.split('"')[1].split("_")[1];
                if (role_name == "PROMOTOR") {
                    return "Agente";
                }
                else if (role_name == "APOSTADOR") {
                    return "Jugador";
                }
                else {
                    return role_name
                }
            }
        },
        parseNumbers(number) {
            return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
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
        showMaxRegisterSelection() {
            document.getElementById("selectPage").style.display = "block";
        },
        setRegistersPerPage(max) {
            document.getElementById("selectPage").style.display = "none";
            this.registers_per_page = max;
        },
        changePage(page) {
            this.actual_page = page
        },
        prevPage() {
            this.actual_page -= 1;
        },
        nextPage() {
            this.actual_page += 1;
        },
        paginate(page){
            this.actual_page = page;
        },
    },
    mounted() {
        let hoy = new Date()
        const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        this.startDate = this.getFecha(primerDiaMes);
        this.startHour = "00:00"
        this.endDate = this.getFecha(hoy);
        this.endHour = "23:59"
        this.targetUserName = this.main_tree.user_name
        this.getReport()
    },
}
</script>