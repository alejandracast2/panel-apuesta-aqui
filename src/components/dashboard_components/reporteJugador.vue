<template>
    <div>
        <main :class="view_type" id="jugadorReportMain">
            <div class="container-fluid mb-5">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row mt-4 mb-3">
                            <div class="col-12 col-lg-9 pt-2 pl-4">
                                <h5 class="white-text font-weight-bold">Reporte Global por Jugador</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-lg-9 thin" id="main_container">
                                <div class="card">
                                    <div class="card-body p-1 px-sm-2">
                                        <div class="row col-12 col-xl-11 mx-auto px-0 px-md-2 px-lg-0 mb-2">
                                            <div class="col-9 col-sm-5 col-xl-4 mx-auto order-sm-1">
                                                <section class="section-preview my-2">
                                                    <div class="select-wrapper mdb-select col-12">
                                                        <span class="caret">▼</span>
                                                        <input type="text" class="select-dropdown w-100 active" id="datesInput"
                                                            @click="showDateOptions" readonly="true" value=""
                                                            v-model="selectedDate">
                                                        <ul id="selectDates"
                                                            class="dropdown-content select-dropdown w-100 text-center active"
                                                            style="width: 82.125px; position: absolute; top: -73.391px; left: 15px; opacity: 1; 
                                            display: none;">
                                                            <li @click="setDate('Hoy')">
                                                                <span
                                                                    :style="selectedDate == 'Hoy' ? 'background-color:#4285f4;color:white !important;' : ''">Hoy</span>
                                                            </li>
                                                            <li @click="setDate('Ayer')">
                                                                <span
                                                                    :style="selectedDate == 'Ayer' ? 'background-color:#4285f4;color:white !important;' : ''">Ayer</span>
                                                            </li>
                                                            <li @click="setDate('Semana actual')">
                                                                <span
                                                                    :style="selectedDate == 'Semana actual' ? 'background-color:#4285f4;color:white !important;' : ''">Semana
                                                                    actual</span>
                                                            </li>
                                                            <li @click="setDate('Semana previa')">
                                                                <span
                                                                    :style="selectedDate == 'Semana previa' ? 'background-color:#4285f4;color:white !important;' : ''">Semana
                                                                    previa</span>
                                                            </li>
                                                            <li @click="setDate('Mes actual')">
                                                                <span
                                                                    :style="selectedDate == 'Mes actual' ? 'background-color:#4285f4;color:white !important;' : ''">Mes
                                                                    actual</span>
                                                            </li>
                                                            <li @click="setDate('Mes previo')">
                                                                <span
                                                                    :style="selectedDate == 'Mes previo' ? 'background-color:#4285f4;color:white !important;' : ''">Mes
                                                                    previo</span>
                                                            </li>
                                                            <li @click="setDate('Personalizado')">
                                                                <span
                                                                    :style="selectedDate == 'Personalizado' ? 'background-color:#4285f4;color:white !important;' : ''">Personalizado</span>
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
                                            <div
                                                class="col-6 col-sm-3 mx-auto pt-1 pb-3 px-sm-0 px-md-2 px-lg-0 px-xl-2 text-center order-sm-2">
                                                <div class="md-form font-size-custom2 text-left my-0 my-sm-2">
                                                    <input type="text" id="UserSearch"
                                                        class="form-control mdb-autocomplete search-username" maxlength="16"
                                                        v-model="username">
                                                    <label for="UserSearch" class="">Nombre de usuario</label>
                                                    <button class="mdb-autocomplete-clear" style="visibility: hidden;">
                                                        <svg fill="#000000" height="20" viewBox="0 0 20 20" width="20">
                                                            <path
                                                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                                            </path>
                                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-4 col-sm-3 pt-1 pb-3 mx-auto px-0 text-center order-sm-3">
                                                <button class="btn btn-sm btn-cyan waves-effect waves-light" id="search"
                                                    @click="getReport">Buscar</button>
                                            </div>
                                            <div class="col-6 col-sm-3 pt-1 pb-3 text-center d-none">
                                                <button class="btn btn-sm btn-cyan waves-effect waves-light disabled"
                                                    id="change_view"><i class="fas fa-plus mr-2"></i> detalles</button>
                                            </div>
                                        </div>
                                        <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div class="top"></div>
                                            <div id="history_processing" class="dataTables_processing card"
                                                v-if="loading">Procesando...</div>
                                            <table id="history" class="table table-hover w-100 dataTable no-footer"
                                                cellspacing="0" role="grid" style="width: 1456px;">
                                                <thead>
                                                    <tr role="row">
                                                        <th scope="col" class="sorting_disabled text-center" rowspan="1"
                                                            colspan="1" style="width: 565px;">Categoria</th>
                                                        <th scope="col"
                                                            class="sorting_disabled d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1" style="width: 219px;">Apostado</th>
                                                        <th scope="col"
                                                            class="sorting_disabled d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1" style="width: 219px;">Ganado</th>
                                                        <th scope="col" class="sorting_disabled text-center" rowspan="1"
                                                            colspan="1" style="width: 200px;">Netwin</th>
                                                        <th scope="col" class="sorting_disabled text-center" rowspan="1"
                                                            colspan="1" style="width: 133px;">Rake</th>
                                                        <th scope="col" class="sorting_disabled d-none" rowspan="1"
                                                            colspan="1" style="width: 0px;"></th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="Object.keys(reportData).length>0">
                                                    <tr role="row" class="odd row-no-toggle">
                                                        <td class="text-left dt-category category3"><span
                                                                class="ml-0 ml-sm-1"></span> Casino</td>
                                                        <td class="d-none d-sm-block text-right category3">{{ parseNumbers(reportData.casino.bet_amount??0) }}</td>
                                                        <td class="d-none d-sm-block text-right category3">{{ parseNumbers(reportData.casino.win_amount??0) }}</td>
                                                        <td class="text-right dt-balance category3">{{ parseNumbers(reportData.casino.netwin??0) }}</td>
                                                        <td class="text-right category3">-</td>
                                                    </tr>
                                                    <tr role="row" class="even row-no-toggle">
                                                        <td class="text-left dt-category category2"><span
                                                                class="ml-0 ml-sm-1"></span> Deportes</td>
                                                        <td class="d-none d-sm-block text-right category2">{{ parseNumbers(reportData.deportes.bet_amount??0) }}</td>
                                                        <td class="d-none d-sm-block text-right category2">{{ parseNumbers(reportData.deportes.win_amount??0) }}</td>
                                                        <td class="text-right dt-balance category2">{{ parseNumbers(reportData.deportes.netwin??0) }}</td>
                                                        <td class="text-right category2">-</td>
                                                    </tr>
                                                    <tr role="row" class="odd row-no-toggle">
                                                        <td class="text-left dt-category category1"><span
                                                                class="ml-0 ml-sm-1"></span> Poker</td>
                                                        <td class="d-none d-sm-block text-right category1">{{ parseNumbers(reportData.poker.bet_amount??0) }}</td>
                                                        <td class="d-none d-sm-block text-right category1">{{ parseNumbers(reportData.poker.win_amount??0) }}</td>
                                                        <td class="text-right dt-balance category1">{{ parseNumbers(reportData.poker.netwin??0) }}</td>
                                                        <td class="text-right category1">{{ parseNumbers(reportData.poker.rake??0) }}</td>
                                                    </tr>
                                                    <tr role="row" class="even row-no-toggle">
                                                        <td class="text-left dt-category category5"><span
                                                                class="ml-0 ml-sm-1"></span> Bingo en vivo</td>
                                                        <td class="d-none d-sm-block text-right category5">{{ parseNumbers(reportData.bingo.bet_amount??0) }}</td>
                                                        <td class="d-none d-sm-block text-right category5">{{ parseNumbers(reportData.bingo.win_amount??0) }}</td>
                                                        <td class="text-right dt-balance category5">{{ parseNumbers(reportData.bingo.netwin??0) }}</td>
                                                        <td class="text-right category5">{{ parseNumbers(reportData.bingo.rake??0) }}</td>
                                                    </tr>
                                                    <tr role="row" class="odd row-no-toggle">
                                                        <td class="text-left dt-category category4"><span
                                                                class="ml-0 ml-sm-1"></span> Bonus</td>
                                                        <td class="d-none d-sm-block text-right category4">0,00</td>
                                                        <td class="d-none d-sm-block text-right category4">0,00</td>
                                                        <td class="text-right dt-balance category4">0,00</td>
                                                        <td class="text-right category4">-</td>
                                                    </tr>
                                                    <tr role="row" class="even row-toggle" style="line-height: 1.5;">
                                                        <td class="text-left dt-category">&nbsp;</td>
                                                        <td class="d-none d-sm-block text-right">&nbsp;</td>
                                                        <td class="d-none d-sm-block text-right">&nbsp;</td>
                                                        <td class="text-right dt-balance">&nbsp;</td>
                                                        <td class="text-right">&nbsp;</td>
                                                        <td class=" d-none">empty_row</td>
                                                    </tr>
                                                    <tr role="row" class="odd row-toggle"
                                                        style="background-color: rgb(242, 242, 242);">
                                                        <td class="text-left dt-category">Cargas y Retiros</td>
                                                        <td class="d-none d-sm-block text-right">{{ parseNumbers(reportData.ingreso) }}</td>
                                                        <td class="d-none d-sm-block text-right">{{ parseNumbers(reportData.salida * -1) }}</td>
                                                        <td class="text-right dt-balance">{{ parseNumbers(reportData.ingreso - (reportData.salida*-1)) }}</td>
                                                        <td class="text-right"></td>
                                                        <td class=" d-none">sales</td>
                                                    </tr>
                                                    <tr role="row" class="even row-toggle">
                                                        <td class="text-left dt-category">Fichas en cuenta de Jugador</td>
                                                        <td class="d-none d-sm-block text-right"></td>
                                                        <td class="d-none d-sm-block text-right"></td>
                                                        <td class="text-right dt-balance">{{ parseNumbers(reportData.total) }}</td>
                                                        <td class="text-right"></td>
                                                        <td class=" d-none">players_balance</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr class="odd">
                                                        <td colspan="5" class="dataTables_empty">Ningún dato disponible en esta tabla</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="bottom row"></div>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        
                                    </div>
                                </div>
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
import axios from 'axios';
import customCalendar from '../customCalendar.vue';
let VueClockPicker2 = VueClockPicker;
export default {
    name: 'reporteJugador',
    components: {customCalendar,VueClockPicker2},
    data() {
        return {
            selectedDate: "Hoy",
            startDate: "",
            startHour: "",
            endDate: "",
            endHour: "",
            username: "",
            reportData: { },
            loading:false
        }
    },
    props: ["view_type"],
    computed: {
        apiUrl(){
            return this.$store.getters['getApiUrl'];
        },
        apiUrlnew(){
            return this.$store.getters['getApiUrlnew'];
        },
    },
    methods: {
        parseNumbers(number) {
            return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
        },
        setDate(date) {
            document.getElementById("selectDates").style.display = "none";
            this.selectedDate = date
            this.setDateRanges(date)
        },
        showDateOptions() {
            document.getElementById("selectDates").style.display = "block";
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
        setDateRanges(range){
            let hoy = new Date()
            if(range=="Hoy"){
                const tomorrow = new Date(hoy);
                tomorrow.setDate(tomorrow.getDate() + 1);
                this.startDate = this.getFecha(hoy);
                this.startHour = "00:00"
                this.endDate = this.getFecha(tomorrow);
                this.endHour = "00:00"
            }
            else if(range=="Ayer"){
                let ayer = new Date(hoy);
                ayer.setDate(ayer.getDate() - 1);
                this.startDate = this.getFecha(ayer);
                this.endDate = this.getFecha(hoy);
                this.startHour = "00:00"
                this.endHour = "00:00"
            }
            else if(range=="Semana previa"){
                const diaDeLaSemana = hoy.getDay();
                const diasParaRetroceder = diaDeLaSemana === 0 ? 6 : diaDeLaSemana - 1;
                const lunesSemanaAnterior = new Date(hoy);
                lunesSemanaAnterior.setDate(hoy.getDate() - (diasParaRetroceder + 7));
                const fechasSemanaPrevia = [];
                for (let i = 0; i < 8; i++) {
                const fecha = new Date(lunesSemanaAnterior);
                fecha.setDate(lunesSemanaAnterior.getDate() + i);
                fechasSemanaPrevia.push(fecha);
                }
                this.startDate = this.getFecha(fechasSemanaPrevia[0]);
                this.endDate = this.getFecha(fechasSemanaPrevia[7]);
                this.startHour = "00:00"
                this.endHour = "00:00"
            }
            else if(range=="Semana actual"){
                const primerDiaSemana = new Date(hoy);
                primerDiaSemana.setDate(hoy.getDate() - (hoy.getDay() === 0 ? 7 : hoy.getDay()));
                // Paso 3: Obtener el rango de fechas de la semana
                const rangoSemana = [];
                for (let i = 0; i < 9; i++) {
                const fecha = new Date(primerDiaSemana);
                fecha.setDate(primerDiaSemana.getDate() + i);
                rangoSemana.push(fecha);
                }
                this.startDate = this.getFecha(rangoSemana[1]);
                this.endDate = this.getFecha(rangoSemana[8]);
                this.startHour = "00:00"
                this.endHour = "00:00"
            }
            else if(range=="Mes actual"){
                const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                const tomorrow = new Date(hoy);
                tomorrow.setDate(tomorrow.getDate() + 1);
                this.startDate = this.getFecha(primerDiaMes);
                this.endDate = this.getFecha(tomorrow);
                this.startHour = "00:00"
                this.endHour = "00:00"
            }
            else if(range=="Mes previo"){
                const primerDiaMesAnterior = new Date(hoy);
                const primerdiaMesActual = new Date(hoy);
                primerDiaMesAnterior.setMonth(hoy.getMonth() - 1);
                primerDiaMesAnterior.setDate(1);
                primerdiaMesActual.setDate(1);
                this.startDate = this.getFecha(primerDiaMesAnterior);
                this.endDate = this.getFecha(primerdiaMesActual);
                this.startHour = "00:00"
                this.endHour = "00:00"
            }
            this.getReport();
        },
        async getReport() {
            try {
                this.loading = true;
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                let response = await axios.post(this.apiUrlnew + "casino_reporte_provider_jugador", {
                    "username": this.username,
                    "startDate": this.getFechaFormated(this.startDate) + " " + this.startHour+":00",
                    "endDate": this.getFechaFormated(this.endDate) + " " + this.endHour+":00",
                    "timezone": timezoneFormated
                }
                )
                if (response.data) {
                    this.reportData.casino = response.data.filter(item => item.tipo_apuesta == "Casino" && !item.provider)[0];
                    this.reportData.deportes = response.data.filter(item => item.tipo_apuesta == "Deportes")[0] ?? {};
                    this.reportData.poker = response.data.filter(item => item.tipo_apuesta == "Poker")[0] ?? {};
                    this.reportData.bingo = response.data.filter(item => item.tipo_apuesta == "Bingo")[0] ?? {};
                    this.reportData.ingreso = response.data.filter(item=>item.ingreso_fichas !== undefined)[0]?.ingreso_fichas??0;
                    this.reportData.salida = response.data.filter(item=>item.ingreso_fichas !== undefined)[0]?.salida_fichas??0;
                    this.reportData.total = response.data.filter(item=>item.capital !== undefined)[0].capital??0;
                }
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.reportData = {}
                this.loading = false;
            }
        }
    },
    mounted() {
        if(this.selectedDate == "Hoy"){
            let hoy = new Date()
            const tomorrow = new Date(hoy);
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.startDate = this.getFecha(hoy);
            this.startHour = "00:00"
            this.endDate = this.getFecha(tomorrow);
            this.endHour = "00:00"
            console.log(this.startDate)
        }
        const handleClick = event => {
            if (event.target.id != "datesInput") {
                document.getElementById("selectDates").style.display = "none";
            }
        }
        document.getElementById("jugadorReportMain").addEventListener('click',handleClick)
    },
}
</script>