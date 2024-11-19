<template>
    <div>
        <main :class="view_type">
            <div class="container-fluid mb-5">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row mt-4 mb-3">
                            <div class="col-6 col-lg-9 pt-2 pl-4">
                                <h5 class="white-text font-weight-bold">Detalle de Casino</h5>
                            </div>
                            <div class="col-6 d-lg-none text-center">
                                <button class="d-lg-none btn btn-sm btn-danger waves-effect waves-light" @click="openModal('affiliates_tree_modal')"
                                    id="ShowAffiliatesModal">Estructura</button>
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
                                            class="col-8 offset-2 col-sm-4 offset-sm-1 col-md-3 offset-md-1 col-lg-3 col-xl-3 pl-md-3 provider-id-div">
                                            <div
                                                class="select-wrapper mdb-select colorful-select dropdown-primary md-form my-3">
                                                <span class="caret">▼</span><input type="text" class="select-dropdown"
                                                    readonly="true" @click="showBrandList" v-model="selectedBrand"
                                                    data-activates="select-options-646e9f2d-bbab-4fd3-a5ef-a36901d7d4a9"
                                                    value="">
                                                <ul id="select-brands"
                                                    class="dropdown-content select-dropdown w-100"
                                                    style="width: 271.391px; position: absolute; top: 0px; left: 0px; opacity: 1;">
                                                    <span class="search-wrap ml-2">
                                                        <div class="md-form mt-0"><input type="text" @input="filterBrands" v-model="searchBrand"
                                                                class="search form-control w-100 d-block"
                                                                placeholder="Buscar"></div>
                                                    </span>
                                                    <li class="disabled"><span class="filtrable">Proveedor</span></li>
                                                    <li :class="brand==selectedBrand?'active selected':''" v-for="(brand, index) in casino_brands" :key="index" @click="selectBrand(brand.id)"><span class="filtrable">{{ brand.id }}</span></li>
                                                </ul><select
                                                    class="mdb-select colorful-select dropdown-primary md-form my-3 initialized"
                                                    searchable="Buscar" id="provider_id">
                                                    <option value="" selected="" disabled="">Proveedor</option>
                                                    <option v-for="(brand, index) in casino_brands" :key="index" value="609">{{ brand.name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-8 offset-2 col-sm-3 offset-sm-0 col-lg-4 col-xl-3 offset-xl-0">
                                            <div class="md-form font-size-custom2 text-left my-3">
                                                <input type="text" id="UserSearch" v-model="targetUserName"
                                                    class="form-control mdb-autocomplete search-username"
                                                    maxlength="16">
                                                <label for="UserSearch">Nombre de usuario</label>
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
                                        <div class="col-8 offset-2 col-sm-3 offset-sm-0 col-md-2 col-lg-2 pb-xl-4">
                                            <div class="md-form my-3">
                                                <input type="text" class="form-control" id="bet_id" maxlength="16" v-model="targetId">
                                                <label for="bet_id">#Id apuesta</label>
                                            </div>
                                        </div>
                                        <div
                                            class="col-5 offset-1 col-sm-3 offset-sm-1 col-md-2 offset-md-0 col-lg-3 offset-lg-1 col-xl-2 offset-xl-0 pt-2 pt-xl-3 pb-4 pb-sm-3 text-center text-xl-right">
                                            <button class="btn btn-sm btn-cyan waves-effect waves-light" @click="getReport" :disabled="selectedBrand==''"
                                                id="search">Buscar</button>
                                        </div>
                                    </div>
                                    <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                        <div class="top"></div>
                                        <div id="history_processing" class="dataTables_processing card"
                                            style="display: none;">Procesando...</div>
                                        <table id="history"
                                            class="table table-striped table-hover w-100 dataTable no-footer"
                                            cellspacing="0" role="grid" style="width: 1182px;">
                                            <thead>
                                                <tr role="row">
                                                    <th scope="col" 
                                                        class="sorting_disabled d-none d-sm-block text-center"
                                                        rowspan="1" colspan="1" style="width: 351px;">ID Apuesta</th>
                                                    <th scope="col" class="sorting_disabled dt-date text-center"
                                                        rowspan="1" colspan="1" style="width: 254px;">Fecha</th>
                                                    <th scope="col"
                                                        class="sorting_disabled d-none d-sm-block text-center"
                                                        rowspan="1" colspan="1" style="width: 213px;">Usuario</th>
                                                    <th scope="col" class="sorting_disabled text-center" rowspan="1"
                                                        colspan="1" style="width: 135px;">Operacion</th>
                                                    <th scope="col"
                                                        class="sorting_disabled d-none d-sm-block text-center"
                                                        rowspan="1" colspan="1" style="width: 109px;">Importe</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr role="row" class="odd" v-for="(bet, index) in paginarArray(reportData, registers_per_page)[actual_page-1]" :key="index">
                                                    <td :class="bet.type=='WIN'?'result-Win':''"  class="d-none d-sm-block text-center result-Bet">{{ bet.id }}</td>
                                                    <td :class="bet.type=='WIN'?'result-Win':''"  class="dt-date text-center result-Bet">{{ formatearFecha(bet.fecha) }}</td>
                                                    <td :class="bet.type=='WIN'?'result-Win':''"  class="d-none d-sm-block text-center result-Bet">{{ bet.username }}
                                                    </td>
                                                    <td :class="bet.type=='WIN'?'result-Win':''"  class="text-center result-Bet">{{ bet.type }}</td>
                                                    <td :class="bet.type=='WIN'?'result-Win':''"  class="d-none d-sm-block text-right result-Bet">{{ parseNumbers(bet.amount) }}</td>
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
                                                            <li :class="registers_per_page == 10 ? 'active' : ''"
                                                                @click="setRegistersPerPage(10)">
                                                                <span class="filtrable">10</span>
                                                            </li>
                                                            <li :class="registers_per_page == 25 ? 'active' : ''"
                                                                @click="setRegistersPerPage(25)">
                                                                <span class="filtrable">25</span>
                                                            </li>
                                                            <li :class="registers_per_page == 50 ? 'active' : ''"
                                                                @click="setRegistersPerPage(50)">
                                                                <span class="filtrable">50</span>
                                                            </li>
                                                            <li :class="registers_per_page == 50 ? 'active' : ''"
                                                                @click="setRegistersPerPage(100)">
                                                                <span class="filtrable">100</span>
                                                            </li>
                                                        </ul>
                                                        <select name="users_length" aria-controls="users"
                                                            class="mdb-select col-4 initialized">
                                                            <option value="10">10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="50">100</option>
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
                            <div class="tree card py-3 jstree jstree-1 jstree-default" id="affiliates_tree" role="tree">
                                <div class="switch font-size-custom"><label>Incluir ocultos<input id="TreeShowHidden"
                                        type="checkbox" @change="showHiddenTree"><span class="lever"></span></label>
                                </div>
                                <ul class="px-1 py-0" style="font-size: small;">
                                    <treeNode :node="main_tree" :startDate="getFechaFormated(startDate)" :endDate="getFechaFormated(endDate)"
                                        :startHour="startHour" :endHour="endHour" :provider="selectedBrand" />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="modal fade left" id="affiliates_tree_modal" tabindex="-1" role="dialog"
                aria-labelledby="affTreeModal" aria-hidden="true">
                <div class="modal-dialog modal-full-height modal-left" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalViewInfoTitle">
                                Listado de Agentes</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal('affiliates_tree_modal')">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div style="max-height:65vh;overflow-y:scroll;overflow-x:hidden" class="tree py-3 px-0 jstree-default" id="affiliates_tree" role="tree">
                            <div class="switch font-size-custom py-1"><label>Incluir ocultos<input id="TreeShowHidden"
                                type="checkbox" @change="showHiddenTree"><span class="lever"></span></label>
                            </div>
                            <ul class="px-1 py-0" style="font-size: small;">
                                <treeNode :node="main_tree" :startDate="getFechaFormated(startDate)" :endDate="getFechaFormated(endDate)"
                                        :startHour="startHour" :endHour="endHour" :provider="selectedBrand" />
                            </ul>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-danger waves-effect waves-light" @click="closeModal('affiliates_tree_modal')">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
    </main>
</div></template>
<script>
/* eslint-disable */
import treeNode from './treeNode.vue';
import Pagination from 'vue-pagination-2';
import customCalendar from '../customCalendar.vue';
let VueClockPicker2 = VueClockPicker;
export default {
    name: 'reporteCasino',
    components: { treeNode,Pagination,customCalendar,VueClockPicker2 },
    data() {
        return {
            actual_page: 1,
            registers_per_page: 10,
            startDate: "",
            startHour: "",
            endDate: "",
            endHour: "",
            casino_brands:[],
            targetUserName: "",
            username: "",
            focusId: "",
            targetId: "",
            selectedBrand:"",
            searchBrand:"",
            pages:[],
            records:0
        }
    },
    props: ["view_type"],
    computed: {
        casino_brands_main(){
            return this.$store.getters["getCasinoBrands"];
        },
        main_tree() {
            return this.$store.getters["getMainTree"];
        },
        targetUser() {
            return this.$store.getters["getTargetUser"];
        },
        loadingReport() {
            return this.$store.getters["getLoadingReport"];
        },
        reportData() {
            let main = this.$store.getters["getReportCasino"];
            let result = []
            if (this.username != "") {
                result = main.filter(bet => bet.username == this.username);
                return result
            }
            else if (this.focusId != "") {
                result = main.filter(bet => bet.id == this.focusId);
                return result
            }
            return main;
        }
    },
    methods: {
        backdrop(action) {
            if (action) {
                document.getElementById("modalBackdrop").style.display = "block";
                document.getElementById("modalBackdrop").classList.add("show");
            }
            else {
                document.getElementById("modalBackdrop").style.display = "none";
                document.getElementById("modalBackdrop").classList.remove("show");
            }
        },
        closeModal() {
            let modals = document.getElementsByClassName("modal");
            [...modals].forEach(modal => {
                modal.classList.remove("show");
                modal.style.display = "none";
            })
            document.getElementById("modalBackdrop").style.display = "none";
            document.getElementById("modalBackdrop").classList.remove("show");
            this.betData = {data:[]}
        },
        openModal(target) {
            let modal = document.getElementById(target);
            modal.classList.add("show");
            modal.style.display = "block"
        },
        filterBrands(){
            this.casino_brands = this.casino_brands_main.filter(brand=>brand.id.toLowerCase().includes(this.searchBrand.toLowerCase()))
        },
        selectBrand(brand){
            this.selectedBrand=brand;
            document.getElementById("select-brands").style.display = "none";
        },
        showBrandList(){
            document.getElementById("select-brands").style.display = "block";
        },
        getReport() {
            if(this.selectedBrand!=""){
                this.actual_page = 1;
                this.focusId = this.targetId;
                this.username = this.targetUserName;
                this.$store.dispatch("getReportCasino", {
                    id: this.targetUser,
                    startDate: this.getFechaFormated(this.startDate) + " " + this.startHour+":00",
                    endDate: this.getFechaFormated(this.endDate) + " " + this.endHour+":00",
                    provider: this.selectedBrand
                })
            }
        },
        setNameSearch() {
            this.searchByName = this.username;
            this.searchByTarget = this.selectedTarget;
            this.getReport();
        },
        showHiddenTree() {
            let checked = document.getElementById("TreeShowHidden").checked;
            this.$store.dispatch("showHiddenTree", checked);
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
        getFechaFormated(date){
            if(date!=""){
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
            }
        },
        getFecha(date){
            var formattedDay = ("0" + date.getDate()).slice(-2); // Añade un cero si es necesario
            var formattedMonth = date
            .toLocaleString("es", { month: "long" })
            .toLowerCase();
            var formattedYear = date.getFullYear();
            return `${formattedDay} ${formattedMonth} ${formattedYear}`
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
        this.startDate = this.getFecha(new Date());
        this.startHour = "00:00"
        this.endDate = this.getFecha(new Date());
        this.endHour = "23:59"
        this.casino_brands = this.casino_brands_main;
    },
}
</script>