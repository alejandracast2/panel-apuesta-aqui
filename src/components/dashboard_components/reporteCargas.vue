<template>
    <div>
        <main :class="view_type">
            <div class="container-fluid mb-5 pr-lg-0">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row mt-4 mb-3">
                            <div class="col-6 col-lg-9 pt-2 pl-4">
                                <h5 class="white-text font-weight-bold">Detalle de Cargas</h5>
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
                                                class="col-8 offset-2 col-sm-3 offset-sm-2 col-md-2 offset-md-1 col-lg-4 offset-lg-2 col-xl-2 offset-xl-1 px-2 pl-sm-0 pl-xl-3">
                                                <section class="section-preview my-4">
                                                    <div class="select-wrapper mdb-select col-12">
                                                        <span class="caret">▼</span>
                                                        <input type="text"
                                                            class="select-dropdown w-100 active"
                                                            @click="showTargetOptions" readonly="true" value=""
                                                            v-model="selectedTarget">
                                                        <ul id="selectTargets"
                                                            class="dropdown-content select-dropdown w-100 text-center active"
                                                            style="width: 82.125px; position: absolute; top: -73.391px; left: 15px; opacity: 1; 
                                                            display: none;">
                                                            <li @click="setTarget('Agentes')">
                                                                <span :style="selectedTarget=='Agentes'?'background-color:#4285f4;color:white !important;':''">Agentes</span>
                                                            </li>
                                                            <li @click="setTarget('Jugadores')">
                                                                <span :style="selectedTarget=='Jugadores'?'background-color:#4285f4;color:white !important;':''">Jugadores</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </section>
                                            </div>
                                            <div
                                                class="col-8 offset-2 col-sm-4 offset-sm-1 col-md-3 offset-md-0 col-lg-4 col-xl-3 offset-xl-0 pb-xl-4">
                                                <div class="md-form font-size-custom2 text-left">
                                                    <input type="text" id="UserSearch" v-model="username"
                                                        class="form-control mdb-autocomplete search-username"
                                                        maxlength="16">
                                                    <label for="UserSearch" class="">Nombre de usuario</label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-8 offset-2 col-sm-4 offset-sm-3 col-md-3 offset-md-0 col-lg-5 offset-lg-2 col-xl-3 offset-xl-0 pl-2 pl-sm-0 pl-md-3 pt-3 pt-sm-0 pt-md-3 pt-lg-0 pt-xl-3 px-lg-2 px-xl-3 text-xl-left">
                                                <div class="form-check form-check-inline">
                                                    <input v-model="directos" type="checkbox" class="form-check-input" id="direct_children">
                                                    <label class="form-check-label pl-4" for="direct_children"
                                                        data-toggle="popover" data-placement="top"
                                                        data-content="Solo mostrar cargas y retiros realizados a usuarios directos"
                                                        data-original-title="" title="">Directos <i
                                                            class="fas fa-info mx-2"></i></label>
                                                </div>
                                                <div v-if="selectedTarget=='Jugadores'" class="form-check form-check-inline">
                                                    <input v-model="superiores" type="checkbox" class="form-check-input" id="by_parent">
                                                    <label class="form-check-label change-group pl-4" for="by_parent"
                                                        data-toggle="popover" data-placement="top"
                                                        data-content="Solo mostrar cargas y retiros realizadas por un Superior"
                                                        data-original-title="" title="">Superior <i
                                                            class="fas fa-info mx-2"></i></label>
                                                </div>
                                                <div v-else class="form-check form-check-inline">
                                                    <input v-model="recibidas" type="checkbox" class="form-check-input" id="from_parent">
                                                    <label class="form-check-label change-group pl-4" for="from_parent"
                                                        data-toggle="popover" data-placement="top"
                                                        data-content="Mostrar cargas y retiros realizados a mi panel"
                                                        data-original-title="" title="">Recibidas <i
                                                            class="fas fa-info mx-2"></i></label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-10 offset-1 col-sm-5 offset-sm-0 col-md-3 col-lg-4 col-xl-2 pt-3 pt-sm-1 pt-md-4 pt-lg-1 pt-xl-3 pb-3 px-xl-0 text-center text-sm-left text-lg-left">
                                                <button class="btn btn-sm btn-cyan waves-effect waves-light" @click="setDataFilters"
                                                    id="search">Buscar</button>
                                            </div>
                                        </div>
                                        <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                            <div class="top"></div>
                                            <div id="history_processing" class="dataTables_processing card"
                                                v-if="loadingReport">Procesando...</div>
                                            <table v-else id="history" class="table table-striped table-hover w-100 dataTable"
                                                cellspacing="0" role="grid" style="width: 1189px;">
                                                <thead>
                                                    <tr role="row">
                                                        <th scope="col" class="sorting_disabled dt-date text-center"
                                                            rowspan="1" colspan="1" style="width: 374px;">Fecha</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-parent d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1" style="width: 254px;">Origen</th>
                                                        <th scope="col" class="sorting_disabled dt-child text-center"
                                                            rowspan="1" colspan="1" style="width: 268px;">Destino</th>
                                                        <th scope="col" class="sorting_disabled d-none" rowspan="1"
                                                            colspan="1" style="width: 0px;"></th>
                                                        <th scope="col" class="sorting_disabled dt-amount text-center"
                                                            rowspan="1" colspan="1" style="width: 197px;">Importe</th>
                                                        <th scope="col" class="sorting_disabled d-none" rowspan="1"
                                                            colspan="1" style="width: 0px;"></th>
                                                    </tr>
                                                </thead>
                                                <tbody> 
                                                    <tr role="row" class="odd" v-for="(item, index) in paginarArray(reportData.data, registers_per_page)[actual_page - 1]" :key="index">
                                                        <td class=" dt-date text-center">{{ formatearFecha(item.fecha) }}</td>
                                                        <td class="dt-parent d-none d-sm-block text-left text-primary">
                                                            <i :id="'more'+index" @mouseout="showPopover2=false" @mouseenter="showPopover('#more'+index,'#popoverdata',item)" v-if="item.detalles?.includes('superior')" class="fas fa-external-link-square-alt"></i>
                                                            {{ item.creator_username }}
                                                        </td>
                                                        <td class="dt-child text-left" :class="parseRole(item.roles)=='Agente'?'text-primary':'text-danger'">{{ item.username }}</td>
                                                        <td class="dt-amount text-right">{{ parseNumbers(item.valor) }}</td>
                                                        <td class=" d-none"></td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th scope="col" class="dt-date text-center" rowspan="1" colspan="1">
                                                        </th>
                                                        <th scope="col" class="dt-parent d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="dt-child text-right" id="FooterTotalText"
                                                            rowspan="1" colspan="1">Total:</th>
                                                        <th scope="col" class="d-none" rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="dt-amount text-right" id="FooterTotalAmount"
                                                            rowspan="1" colspan="1">{{ parseNumbers(reportData.data?.map(item=>item.valor).reduce((a, b) => a + b, 0)) }}</th>
                                                        <th scope="col" class="d-none" rowspan="1" colspan="1"></th>
                                                    </tr>
                                                </tfoot>
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
                                                                <li :class="registers_per_page==100?'active':''" @click="setRegistersPerPage(100)">
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
                            <div class="" id="popoverdata" style="z-index: 7;background-color: white;border: solid black 1px;font-size:small;" :style="showPopover2?'display:block':'display:none'">
                                <div class="p-2" style="background-color:rgb(232, 232, 232);font-size: medium;"><span>Realizado por un superior</span></div>
                                <div class="p-2">
                                    Superior: {{itemSuperior.detalles?.split("superior de ")[1].split("(")[0]}}
                                </div>
                            </div>
                            <div class="d-none d-lg-block col-lg-3 offset-lg-0 pt-4 pt-lg-0 pl-md-0 wide"
                                id="affiliates_tree_container">
                                <div class="tree card py-3 jstree jstree-1 jstree-default" id="affiliates_tree" role="tree">
                                    <div class="switch font-size-custom py-1"><label>Incluir ocultos<input id="TreeShowHidden"
                                        type="checkbox" @change="showHiddenTree"><span class="lever"></span></label>
                                    </div>
                                    <ul class="px-1 py-0" style="font-size: small;">
                                        <treeNode :node="main_tree" :startDate="getFechaFormated(startDate)" :endDate="getFechaFormated(endDate)" :startHour="startHour" :endHour="endHour" />
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
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div style="max-height:65vh;overflow-y:scroll;overflow-x:hidden" class="tree py-3 px-0 jstree-default" id="affiliates_tree" role="tree">
                            <div class="switch font-size-custom py-1"><label>Incluir ocultos<input id="TreeShowHidden"
                                type="checkbox" @change="showHiddenTree"><span class="lever"></span></label>
                            </div>
                            <ul class="px-1 py-0" style="font-size: small;">
                                <treeNode :node="main_tree" :startDate="getFechaFormated(startDate)" :endDate="getFechaFormated(endDate)" :startHour="startHour" :endHour="endHour" />
                            </ul>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-danger waves-effect waves-light" @click="closeModal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
/* eslint-disable */
import treeNode from './treeNode.vue';
import Pagination from 'vue-pagination-2';
import customCalendar from '../customCalendar.vue';
import { createPopper } from '@popperjs/core';
let VueClockPicker2 = VueClockPicker;
export default {
    name: 'reporteCargas',
    components: {treeNode,Pagination,customCalendar,VueClockPicker2},
    data() {
        return {
            actual_page: 1,
            registers_per_page: 10,
            startDate: "",
            startHour: "",
            endDate: "",
            endHour: "",
            username: "",
            searchByName:"",
            selectedTarget:"Jugadores",
            searchByTarget:"",
            pages:[],
            records:0,
            directos:false,
            superiores:false,
            recibidas:false,
            selectedFilter:"",
            itemSuperior:{},
            showPopover2:false
        }
    },
    props: ["view_type"],
    computed: {
        main_tree() {
            return this.$store.getters["getMainTree"];
        },
        reportData(){
            this.setFilter();
            let main = this.$store.getters["getReportDataCargas"];
            // console.log(main);
            let data = main.data ?? [];
            let report = {
                data: data,
                ingreso: main.ingreso,
                salida: main.salida,
                total: main.total
            }; 
            let targetSelected = this.selectedTarget == "Jugadores" ? "APOSTADOR" : "PROMOTOR";
            if (this.searchByName != "") {
                report.data = data.filter(target => target.roles.split('"')[1].split("_")[1] == targetSelected && (target.username.toLowerCase() == this.searchByName.toLowerCase() || target.creator_username.toLowerCase() == this.searchByName.toLowerCase()))
                if (this.selectedFilter == "superior") {
                    report.data = report.data.filter(target => target.detalles.includes("indirecta"))
                }
                if (this.selectedFilter == "directos") {
                    report.data = report.data.filter(target => !target.detalles.includes("indirecta") && target.roles.split('"')[1].split("_")[1] == targetSelected && target.username !== this.targetUser.name)
                }
                if (this.selectedFilter == "recibidas") {
                    report.data = report.data.filter(target => target.username == this.searchByName && target.roles.split('"')[1].split("_")[1] == "PROMOTOR")
                }
                return report
            }
            else{
                report.data = data.filter(target => target.roles.split('"')[1].split("_")[1] == targetSelected && (target.username.toLowerCase() == this.targetUser.name.toLowerCase() || target.creator_username.toLowerCase() == this.targetUser.name.toLowerCase()))
                if (this.selectedFilter == "superior") {
                    report.data = report.data.filter(target => target.detalles.includes("indirecta"))
                }
                if (this.selectedFilter == "directos") {
                    report.data = report.data.filter(target => !target.detalles.includes("indirecta") && target.roles.split('"')[1].split("_")[1] == targetSelected && target.username !== this.targetUser.name)
                }
                if (this.selectedFilter == "recibidas") {
                    report.data = report.data.filter(target => target.username == this.targetUser.name && target.roles.split('"')[1].split("_")[1] == "PROMOTOR")
                }
                return report
            }
        },
        loadingReport(){
            return this.$store.getters["getLoadingReport"];
        },
        targetUser(){
            return this.$store.getters["getTargetUser"];
        },
    },
    methods: {
        showPopover(source,data,item){
            this.itemSuperior = item
            this.showPopover2 = true;
            const popcorn = document.querySelector(source);
            const tooltip = document.querySelector(data);
            createPopper(popcorn, tooltip, {
                placement: 'right',
            });
        },
        setDataFilters(){
            this.setNameSearch();
            this.setFilter();
        },
        openModal(target){
            try {
                this.backdrop(true);
                let modal = document.getElementById(target);
                modal.classList.add("show");
                modal.style.display = "block";
            } catch (error) {
                console.log(error);
            }
            },
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
        },
        paginate(page){
            this.actual_page = page;
        },
        setFilter(){
            if(this.superiores){
                this.selectedFilter = "superior";
                this.directos = false;
                this.recibidas = false;
            }
            else if(this.directos){
                this.selectedFilter = "directos";
                this.superiores = false;
                this.recibidas = false;
            }
            else if(this.recibidas){
                this.selectedFilter = "recibidas";
                this.directos = false;
                this.superiores = false;
            }
            else{
                this.selectedFilter = "";
            }
        },
        setNameSearch(){
            this.searchByName = this.username;
            this.searchByTarget = this.username;
            this.getReport();
        },
        parseRole(role) {
            if(role){
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
        showHiddenTree() {
            let checked = document.getElementById("TreeShowHidden").checked;
            this.$store.dispatch("showHiddenTree", checked);
        },
        setTarget(target){
            this.selectedTarget = target;
            document.getElementById("selectTargets").style.display = "none";
        },
        showTargetOptions() {
            document.getElementById("selectTargets").style.display = "block";
        },
        getReport() {
            try {
                this.actual_page=1;
                this.$store.dispatch("getReportCargas",{
                    startDate:this.getFechaFormated(this.startDate),
                    endDate:this.getFechaFormated(this.endDate),
                    startHour:this.startHour+":00",
                    endHour:this.endHour+":00",
                    id:this.searchByName
                })
            } catch (error) {
                console.log(error);
                this.reportData = {}
                this.loading = false;
            }
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
        }
    },
    mounted() {
        this.startDate = this.getFecha(new Date());
        this.startHour = "00:00"
        this.endDate = this.getFecha(new Date());
        this.endHour = "23:59"
    },
}
</script>