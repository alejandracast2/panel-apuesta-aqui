<template>
    <div>
        <main :class="view_type">
            <div class="container-fluid mb-5">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row mt-4 mb-3">
                            <div class="pt-2 pl-3">
                                <h5 class="white-text font-weight-bold">Agentes Cuentas Corrientes</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-9 px-1 px-lg-3">
                                <div class="card">
                                    <div class="card-body p-1 px-sm-4">
                                        <div class="row">
                                            <div
                                                class="col-8 offset-2 col-sm-4 offset-sm-2 offset-xl-0 px-2 pl-sm-0 pl-xl-5">
                                                <div
                                                    class="select-wrapper mdb-select colorful-select dropdown-primary md-form">
                                                    <span class="caret">▼</span><input
                                                        @click="showSelectAgentes = !showSelectAgentes"
                                                        v-model="agente_selected.username" type="text"
                                                        class="select-dropdown" readonly="true"
                                                        data-activates="select-options-b8e3db71-d6f0-4aa6-9fe5-873bbf9b25b7"
                                                        value="">
                                                    <ul v-if="showSelectAgentes" id="select_agentes"
                                                        style="display:block;opacity:1;"
                                                        class="dropdown-content select-dropdown w-100"><span
                                                            class="search-wrap ml-2">
                                                            <div class="md-form mt-0"><input type="text"
                                                                    v-model="search_text"
                                                                    class="search form-control w-100 d-block"
                                                                    id="searchAgenteInput" placeholder="Buscar"></div>
                                                        </span>
                                                        <li v-if="search_text == ''"
                                                            :class="agente_selected.username == 'Agentes' ? 'active' : ''"
                                                            @click="agente_selected = { username: 'Agentes' }"><span
                                                                class="filtrable" style="color:#4285f4;">Agentes</span></li>
                                                        <li :class="agente_selected.username == agente.username ? 'active' : ''"
                                                            v-for="(agente, index) in agentes" :key="index"
                                                            @click="agente_selected = agente">
                                                            <span class="filtrable" style="color:#4285f4;">{{ agente.username }}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div
                                                class="col-8 offset-2 col-sm-3 offset-sm-1 offset-xl-0 px-2 pl-sm-0 pl-xl-3">
                                                <div
                                                    class="select-wrapper mdb-select colorful-select dropdown-primary md-form operation-id">
                                                    <span class="caret">▼</span><input
                                                        @click="showOperaciones = !showOperaciones" type="text"
                                                        :value="Object.keys(operaciones).filter(operacion => operaciones[operacion] && operacion != 'Todos').length ? Object.keys(operaciones).filter(operacion => operaciones[operacion] && operacion != 'Todos').length + ' Seleccionados' : 'Operaciones'"
                                                        class="select-dropdown" readonly="true">
                                                    <ul v-if="showOperaciones"
                                                        id="select-options-48c7d519-e5b7-4987-84fb-908eaa03a46b"
                                                        style="display:block;opacity:1;"
                                                        class="dropdown-content select-dropdown w-100 multiple-select-dropdown">
                                                        <li class="disabled "><span class="filtrable">
                                                                <input type="checkbox" class="form-check-input"
                                                                    disabled=""><label></label>Operaciones</span></li>
                                                        <li @click="changeOperacion('Todos')" class="select-toggle-all">
                                                            <span>
                                                                <input type="checkbox" :checked="operaciones.Todos"
                                                                    class="form-check-input"><label>Todos</label></span>
                                                        </li>
                                                        <li @click="changeOperacion('Cobro')"
                                                            :class="operaciones.Cobro ? 'active' : ''"><span class="filtrable">
                                                                <input :checked="operaciones.Cobro" type="checkbox"
                                                                    class="form-check-input"><label></label>Cobro</span>
                                                        </li>
                                                        <li @click="changeOperacion('Pago')"
                                                            :class="operaciones.Pago ? 'active' : ''"><span class="filtrable">
                                                                <input :checked="operaciones.Pago" type="checkbox"
                                                                    class="form-check-input"><label></label>Pago</span></li>
                                                        <li @click="changeOperacion('Bonificacion')"
                                                            :class="operaciones.Bonificacion ? 'active' : ''"><span
                                                                class="filtrable">
                                                                <input :checked="operaciones.Bonificacion" type="checkbox"
                                                                    class="form-check-input"><label></label>Bonificacion</span>
                                                        </li>
                                                        <li @click="changeOperacion('Recargo')"
                                                            :class="operaciones.Recargo ? 'active' : ''"><span
                                                                class="filtrable">
                                                                <input :checked="operaciones.Recargo" type="checkbox"
                                                                    class="form-check-input"><label></label>Recargo</span>
                                                        </li>
                                                        <li @click="changeOperacion('Comision')"
                                                            :class="operaciones.Comision ? 'active' : ''"><span
                                                                class="filtrable">
                                                                <input :checked="operaciones.Comision" type="checkbox"
                                                                    class="form-check-input"><label></label>Comision</span>
                                                        </li>
                                                        <li @click="changeOperacion('Cierre')"
                                                            :class="operaciones.Cierre ? 'active' : ''"><span class="filtrable">
                                                                <input :checked="operaciones.Cierre" type="checkbox"
                                                                    class="form-check-input"><label></label>Cierre</span>
                                                        </li><button @click="get_data()"
                                                            class="btn-save btn btn-primary btn-sm waves-effect waves-light">Aceptar</button>
                                                    </ul><select
                                                        class="mdb-select colorful-select dropdown-primary md-form operation-id initialized"
                                                        multiple="" id="operation_id">
                                                        <option value="" selected="" disabled="">Operaciones</option>
                                                        <option value="1">Cobro</option>
                                                        <option value="2">Pago</option>
                                                        <option value="3">Bonificacion</option>
                                                        <option value="4">Recargo</option>
                                                        <option value="5">Comision</option>
                                                        <option value="6">Cierre</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div
                                                class="col-4 offset-2 col-xl-2 offset-xl-0 text-left text-xl-right pl-0 pl-sm-4 pr-xl-0 pb-4 pt-xl-3 dates-button">
                                                <button type="button" class="btn btn-sm cyan waves-effect waves-light"
                                                    id="DatesToggleButton" title="Seleccionar fechas"
                                                    @click="showDates = !showDates">
                                                    <i class="far fa-calendar-alt" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <div
                                                class="col-5 col-sm-5 offset-sm-1 col-xl-3 offset-xl-0 col-lg-5 pt-0 pt-xl-3 pb-3 text-left text-xl-center">
                                                <button class="btn btn-sm btn-cyan waves-effect waves-light"
                                                    @click="get_data()" id="search">Buscar</button>
                                            </div>
                                        </div>
                                        <div class="row" v-if="showDates" id="DatesContainer">
                                            <div
                                                class="col-6 col-sm-3 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-4">
                                                <div class="md-form">
                                                    <input v-model="startDate" type="date" id="start_date" value=""
                                                        class="form-control datepicker picker__input">
                                                    <label for="start_date" class="active"
                                                        style="font-size: small !important;">Fecha Inicial</label>
                                                    <VuePersianDatetimePicker v-model="startDate" locale="es"
                                                        custom-input=".datepicker" format="YYYY-MM-DD" />
                                                </div>
                                            </div>
                                            <div
                                                class="col-4 col-sm-2 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-5">
                                                <div class="md-form">
                                                    <vue-clock-picker2 v-model="startHour" :active-color="'#417df4'"
                                                        :input-class="'form-control picker__input'"></vue-clock-picker2>
                                                    <label for="start_time" class="active"
                                                        style="font-size: 11.5px !important;">Hora Inicial</label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-6 col-sm-3 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-6">
                                                <div class="md-form">
                                                    <input v-model="endDate" type="date" id="end_date"
                                                        class="form-control datepicker2 picker__input">
                                                    <label for="end_date" class="active"
                                                        style="font-size: small !important;">Fecha Final</label>
                                                    <VuePersianDatetimePicker v-model="endDate" locale="es"
                                                        custom-input=".datepicker2" format="YYYY-MM-DD" />
                                                </div>
                                            </div>
                                            <div
                                                class="col-4 col-sm-2 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-7">
                                                <div class="md-form">
                                                    <vue-clock-picker2 v-model="endHour" :active-color="'#417df4'"
                                                        :input-class="'form-control picker__input'"></vue-clock-picker2>
                                                    <label for="end_time" class="active"
                                                        style="font-size: 11.5px !important;">Hora Final</label>
                                                </div>
                                            </div>

                                        </div>
                                        <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                            <div class="top"></div>
                                            <div id="history_processing" class="dataTables_processing card"
                                                style="display: none;">Procesando...</div>
                                            <table id="history" class="table table-striped table-hover w-100 dataTable"
                                                cellspacing="0" role="grid">
                                                <thead>
                                                    <tr role="row">
                                                        <th scope="col" class="sorting_disabled dt-date text-center"
                                                            rowspan="1" colspan="1" style="width: 139px;">Fecha</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-username d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1" style="width: 166px;">Usuario</th>
                                                        <th scope="col" class="sorting_disabled d-none" rowspan="1"
                                                            colspan="1" style="width: 0px;"></th>
                                                        <th scope="col" class="sorting_disabled dt-operation text-center"
                                                            rowspan="1" colspan="1" style="width: 207px;">Operacion</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-provider d-none text-center"
                                                            rowspan="1" colspan="1" style="width: 0px;">Categoria</th>
                                                        <th scope="col" class="sorting_disabled dt-amount text-center"
                                                            rowspan="1" colspan="1" style="width: 169px;">Importe</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-balance d-none col-toggle text-center"
                                                            rowspan="1" colspan="1" style="width: 0px;">Saldo</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-details d-none text-center"
                                                            rowspan="1" colspan="1" style="width: 0px;">Detalles</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-comment d-none text-center"
                                                            rowspan="1" colspan="1" style="width: 0px;">Comentarios</th>
                                                        <th scope="col"
                                                            class="sorting_disabled dt-ticket d-none text-center"
                                                            rowspan="1" colspan="1" style="width: 0px;"></th>
                                                        <th scope="col" class="sorting_disabled dt-more text-center"
                                                            rowspan="1" colspan="1" style="width: 39px;"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="odd" v-if="main_data.length<1">
                                                        <td valign="top" colspan="5" class="dataTables_empty">Ningún dato
                                                            disponible en esta tabla</td>
                                                    </tr>
                                                    <tr role="row" class="odd" data-index="0" v-for="(item, index) in paginarArray(main_data, registers_per_page)[actual_page - 1]" :key="index">
                                                        <td class="dt-date text-center" :class="'operacion'+index">
                                                            <div class="d-none d-sm-inline-block pl-sm-1" :style="opColor(item.operacion)">{{ formatearFecha(item.fecha) }}</div>
                                                        </td>
                                                        <td class="dt-username d-sm-block text-left" :class="'operacion'+index" :style="opColor(item.operacion)">{{ item.username }}</td>
                                                        <td class="dt-operation text-left" :class="'operacion'+index" :style="opColor(item.operacion)">{{ item.operacion }}</td>
                                                        <td class="dt-amount text-right" :class="'operacion'+index" :style="opColor(item.operacion)">{{ parseNumbers(item.importe) }}</td>
                                                        <td class="dt-more text-center" :class="'operacion'+index">
                                                            <div class="fixed-action-btn" :data-custom-fixed="index"> <a
                                                                    class="btn-floating btn-lg red"><i
                                                                        class="fas fa-paperclip"></i></a>
                                                                <ul class="list-unstyled">
                                                                    <li><a class="btn-floating custom-floating-details blue" :class="'custom-fixed-floating-'+index"
                                                                            data-toggle="popover" data-placement="top"
                                                                            title="" data-html="true"
                                                                            data-content="28-08-2023 - 04-09-2023<br>EvoPlay: -5545.7<br>Pragmatic LC: 4266.04<br>Pragmatic 2: 64716.08<br>Red Rake 3: 443.25<br>Vivo Slots: 1.95<br>Ezugi 3: 5900<br>Salsa: 900<br>Hacksaw: -11919.05"
                                                                            data-original-title=""><i
                                                                                class="fas fa-info"></i></a></li>
                                                                    <li><a class="btn-floating custom-floating-comment yellow darken-1 custom-disabled" :class="'custom-fixed-floating-'+index"
                                                                            data-toggle="popover" data-placement="top"
                                                                            title="" data-content=""
                                                                            data-original-title=""><i
                                                                                class="fas fa-comment"></i></a></li>
                                                                    <li><a
                                                                            class="btn-floating custom-floating-img green custom-disabled" :class="'custom-fixed-floating-'+index"><i
                                                                                class="fas fa-image"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th scope="col" class="dt-date text-center" rowspan="1" colspan="1">
                                                        </th>
                                                        <th scope="col" class="dt-username d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="d-none" rowspan="1" colspan="1"></th>
                                                        <th scope="col"
                                                            class="d-none custom-footer dt-operation text-center"
                                                            id="FooterTotalText" rowspan="1" colspan="1"><span>Total:</span>
                                                        </th>
                                                        <th scope="col" class="dt-provider d-none text-center" rowspan="1"
                                                            colspan="1"></th>
                                                        <th scope="col" class="d-none custom-footer dt-amount text-center"
                                                            id="FooterTotalAmount" rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="dt-balance d-none col-toggle text-center"
                                                            rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="dt-details d-none text-center" rowspan="1"
                                                            colspan="1"></th>
                                                        <th scope="col" class="dt-comment d-none text-center" rowspan="1"
                                                            colspan="1"></th>
                                                        <th scope="col" class="dt-ticket d-none text-center" rowspan="1"
                                                            colspan="1"></th>
                                                        <th scope="col" class="dt-more text-center" rowspan="1" colspan="1">
                                                        </th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <div class="bottom row">
                                                <section class="section-preview col-6">
                                                    <div class="select-wrapper mdb-select">
                                                        <span class="caret">▼</span>
                                                        <input type="text" class="select-dropdown w-100 text-center active"
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
                                                            <li :class="registers_per_page == 100 ? 'active' : ''"
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
                                                <div class="dataTables_paginate paging_simple_numbers col-12 col-md-6 order-1 order-md-2"
                                                    id="history_paginate">
                                                    <pagination :options="{ texts: { count: '' } }" v-model="actual_page"
                                                        :records="records" :per-page="registers_per_page"
                                                        @paginate="paginate" />
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal fade right" id="ModalViewTicket" tabindex="-1" role="dialog"
                aria-labelledby="ModalViewTicketLabel" data-backdrop="false" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-full-height modal-right modal-notify modal-success" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="heading lead">Visualizar comprobante</p>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="white-text">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <img class="modal-view-ticket" src="">
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <a type="button"
                                class="btn btn-outline-success waves-effect modal-view-ticket-download">Descargar</a>
                            <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Cerrar</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import Pagination from 'vue-pagination-2';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
let VueClockPicker2 = VueClockPicker;
export default {
    name: 'finanzasAgenteCuentas',
    components: { Pagination, VuePersianDatetimePicker, VueClockPicker2 },
    data() {
        return {
            main_data: [],
            agente_selected: { username: 'Agentes' },
            search_text: '',
            showSelectAgentes: false,
            showOperaciones: false,
            showDates: false,
            operaciones: {
                'Todos': true,
                'Cobro': true,
                'Pago': true,
                'Bonificacion': true,
                'Recargo': true,
                'Comision': true,
                'Cierre': true
            },
            actual_page: 1,
            registers_per_page: 10,
            startDate: "",
            startHour: "",
            endDate: "",
            endHour: "",
            pages: [],
            records: 0,
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
        agentes() {
            function ordered(a, b) {
                if (a.username[0].toLowerCase() < b.username[0].toLowerCase()) {
                    return -1;
                }
                if (a.username[0].toLowerCase() > b.username[0].toLowerCase()) {
                    return 1;
                }
                return 0;
            }
            let main = this.$store.getters["getMainTree"];
            let agentes = main.hijos.map(hijo => {
                return {
                    username: hijo.user_name,
                    id: hijo.id
                }
            }).sort((a, b) => ordered(a, b))
            if (this.search_text != '') {
                return agentes.filter(agente => agente.username.toLowerCase().includes(this.search_text.toLocaleLowerCase()));
            }
            return agentes;
        },
        apiUrlnew(){
            return this.$store.getters['getApiUrlnew'];
        },
    },
    methods: {
        async get_data() {
            try {
                this.showOperaciones = false;
                this.showSelectAgentes = false;
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                let response = await axios.post(this.apiUrlnew + "cuentascorrientes", {
                    "login_Id": this.main_tree.id,
                    "startDate": this.startDate + " " + this.startHour+":00",
                    "endDate": this.endDate + " " + this.endHour+":00",
                    "timezone": timezoneFormated
                })
                let userFilter = this.agente_selected.username == "Agentes" ? null : this.agente_selected.username;
                let opFilter = Object.keys(this.operaciones).filter(operacion => this.operaciones[operacion] && operacion != 'Todos').map(operacion => operacion.toLocaleLowerCase());
                if (response.data) {
                    this.main_data = response.data.filter(register=>register.roles=="Agente").filter(register=>userFilter ? register.username == userFilter : true).filter(register => opFilter.includes(register.operacion.toLowerCase().split(" ")[0])).reverse()
                }
            } catch (error) {
                console.log(error);
            }
        },
        parseNumbers(number,target){
            if(Number.isNaN(number)){
                return 0;
            }
            if(target){
                let element =  document.getElementById(target);
                let selection1 = element.selectionStart
                let digits = element.value.includes(".") ? (element.value.split(".")[1].length < 1 ? 0 : element.value.split(".")[1].length) : 0;
                number = element.value == "" ? 0 : this.textToFloat(element.value);
                element.value = digits > 0 ? this.floatToText(number,digits) : ( element.value.includes(".")?this.floatToText(number,digits)+".":this.floatToText(number,digits));
                element.setSelectionRange(element.value.includes(" ")?selection1+1:selection1, element.value.includes(" ")?selection1+1:selection1);
                this.actions.capital = number;
                return
            }
            return new Intl.NumberFormat("de-DE",{minimumFractionDigits:2, maximumFractionDigits: 2}).format(number)
        },
        changeOperacion(type) {
            this.operaciones[type] = !this.operaciones[type]
            if (type == 'Todos') {
                Object.keys(this.operaciones).forEach(operacion => {
                    this.operaciones[operacion] = this.operaciones[type]
                })
            }
        },
        opColor(operacion){
            let color = "";
            if(operacion=="Pago") color = 'red'
            else if(operacion=="Cobro") color = '#32cd32'
            else if(operacion=="Bonificacion") color = '#007700'
            else if(operacion.toLocaleLowerCase().includes("cierre")) color = '#cd853f'
            else if(operacion=="Pago") color = 'red'
            else color = 'black';     
            return "color:"+color      
        },
        paginate(page) {
            this.actual_page = page;
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
        getFecha(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const fechaFormateada = `${year}-${month}-${day}`;
            return fechaFormateada
        },
    },
    mounted() {
        this.startDate = this.getFecha(new Date('2019/06/01'));
        this.startHour = "00:00"
        this.endDate = this.getFecha(new Date());
        this.endHour = "23:59"
    },
    watch: {
        agente_selected(newValue) {
            if (newValue) {
                this.showSelectAgentes = !this.showSelectAgentes
                this.get_data()
            }
        }
    }
}
</script>