<template>
    <div>
        <main :class="view_type">
            <div class="container-fluid mb-5">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row mt-4 mb-3">
                            <div class="col-6 col-lg-9 pt-2 pl-4">
                                <h5 class="white-text font-weight-bold">Detalle de Deportes</h5>
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
                                        <div class=" row">
                                            <div
                                                class="col-8 offset-2 col-sm-4 offset-sm-1 col-lg-4 col-xl-3 offset-xl-0 pb-xl-4 order-xl-2">
                                                <div class="md-form font-size-custom2 text-left my-3">
                                                    <input type="text" id="UserSearch" v-model="targetUserName"
                                                        class="form-control mdb-autocomplete search-username"
                                                        maxlength="16">
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
                                            <div class="col-8 offset-2 col-sm-3 offset-sm-0 pb-xl-4 order-xl-3">
                                                <div class="md-form my-3">
                                                    <input type="text" class="form-control" id="bet_id" maxlength="16"
                                                        v-model="targetId">
                                                    <label for="bet_id" style="">#Id apuesta</label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-6 col-sm-4 col-md-3 offset-md-0 col-lg-3 col-xl-2 pl-md-3 pt-3 pt-xl-4 pt-md-3 pb-4 order-1 order-sm-1 order-xl-4">
                                                <div class="form-check form-check-inline">
                                                    <input type="checkbox" class="form-check-input" id="only_pending"
                                                        v-model="pendings">
                                                    <label class="form-check-label pl-4"
                                                        for="only_pending">Pendientes</label>
                                                </div>
                                            </div>
                                            <div
                                                class="col-5 offset-1 col-sm-3 offset-sm-1 col-lg-3 col-xl-3 offset-xl-0 pt-2 pt-xl-3 pb-4 pb-sm-3 text-center text-xl-right order-sm-2 order-xl-1">
                                                <button class="btn btn-sm btn-cyan waves-effect waves-light"
                                                    @click="getReport()" id="search">Buscar</button>
                                            </div>
                                        </div>
                                        <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                            <div class="top"></div>
                                            <div v-if="loadingReport" id="history_processing"
                                                class="dataTables_processing card">Procesando...</div>
                                            <table id="history" class="table table-striped table-hover w-100 dataTable"
                                                cellspacing="0" role="grid" style="width: 1361px;">
                                                <thead>
                                                    <tr role="row">
                                                        <th scope="col" class="sorting_disabled text-center" rowspan="1"
                                                            colspan="1" style="width: 192px;">ID Apuesta</th>
                                                        <th scope="col"
                                                            class="sorting_disabled d-none d-sm-block dt-date text-center"
                                                            rowspan="1" colspan="1" style="width: 296px;">Fecha</th>
                                                        <th scope="col" class="sorting_disabled dt-username text-center"
                                                            rowspan="1" colspan="1" style="width: 127px;">Usuario</th>
                                                        <th scope="col"
                                                            class="sorting_disabled d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1" style="width: 133px;">Estado</th>
                                                        <th scope="col" class="sorting_disabled text-center" rowspan="1"
                                                            colspan="1" style="width: 129px;">Importe</th>
                                                        <th scope="col"
                                                            class="sorting_disabled d-none d-sm-block text-center"
                                                            rowspan="1" colspan="1" style="width: 158px;">Resultado</th>
                                                        <th scope="col"
                                                            class="sorting_disabled d-none d-md-block text-center dt-possible-win"
                                                            rowspan="1" colspan="1" style="width: 158px;">A Ganar</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="reportData.length < 1">
                                                    <tr class="odd">
                                                        <td valign="top" colspan="7" class="dataTables_empty">Ningún dato
                                                            disponible en esta tabla</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr role="row" class="odd"
                                                        v-for="(bet, index) in paginarArray(reportData??[], registers_per_page)[actual_page - 1]"
                                                        :key="index">
                                                        <td class="text-center view-bet-details result-Running"
                                                            @click="openBetDetails(bet.id)" data-bet-id="1888729395">{{
                                                                bet.id }}</td>
                                                        <td :class="bet.estado == 'Win' ? 'result-Win' : ''"
                                                            class="d-none d-sm-block dt-date text-center result-Running">{{
                                                                formatearFecha(bet.fecha_apuesta) }}</td>
                                                        <td :class="bet.estado == 'Win' ? 'result-Win' : ''"
                                                            class="dt-username text-center result-Running">{{ bet.username
                                                            }}</td>
                                                        <td :class="bet.estado == 'Win' ? 'result-Win' : ''"
                                                            class="d-none d-sm-block text-center result-Running">{{
                                                                bet.estado }}</td>
                                                        <td :class="bet.estado == 'Win' ? 'result-Win' : ''"
                                                            class="text-right result-Running">{{
                                                                parseNumbers(bet.valor_apostado_total) }}</td>
                                                        <td :class="bet.estado == 'Win' ? 'result-Win' : ''"
                                                            class="d-none d-sm-block text-right result-Running">{{
                                                                bet.estado != "Win" ? '-' : parseNumbers(bet.resultado) }}</td>
                                                        <td :class="bet.estado == 'Win' ? 'result-Win' : ''"
                                                            class="d-none d-md-block dt-possible-win text-right result-Running">
                                                            {{ bet.estado != "Running" ? '-' :
                                                                parseNumbers(bet.valor_ganar_total) }}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th scope="col" class="text-center" rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="d-none d-sm-block dt-date text-center"
                                                            rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="dt-username text-center" rowspan="1"
                                                            colspan="1">
                                                        </th>
                                                        <th scope="col" class="d-none d-sm-block text-center" rowspan="1"
                                                            colspan="1"></th>
                                                        <th scope="col" class="text-center" id="FooterTotalAmount"
                                                            rowspan="1" colspan="1"></th>
                                                        <th scope="col" class="d-none d-sm-block text-center" rowspan="1"
                                                            colspan="1"></th>
                                                        <th scope="col"
                                                            class="d-none d-md-block text-center dt-possible-win"
                                                            id="FooterTotalPossibleWin" rowspan="1" colspan="1"></th>
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
                                            :startHour="startHour" :endHour="endHour" />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal fade" id="ModalBetDetails" tabindex="-1" role="dialog" aria-labelledby="BetDetails"
                style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-lg cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalBetDetailsTitle">Detalle
                                de
                                apuesta</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                                <span aria-hidden="true">×</span> 
                            </button>
                        </div>
                        <div class="modal-body" style="max-height:65vh;overflow-y:scroll;overflow-x:hidden">
                            <div class="col text-center" id="ModalBetDetailsLoading" v-if="betData.length < 1">
                                <div class="preloader-wrapper big active">
                                    <div class="spinner-layer spinner-green-only">
                                        <div class="circle-clipper left">
                                            <div class="circle"></div>
                                        </div>
                                        <div class="gap-patch">
                                            <div class="circle"></div>
                                        </div>
                                        <div class="circle-clipper right">
                                            <div class="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="row">
                                <div class="col-12 d-inline-table" id="ModalBetDetailsData" style="">
                                    <div class="row border-bottom">
                                        <div class="col-6">ID interna</div>
                                        <div class="col-6" id="ModalBetDetailsId">{{ betData.data[0]?.apuesta_id }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Fecha</div>
                                        <div class="col-6" id="ModalBetDetailsDate">{{ formatearFecha(betData.data[0]?.fecha_apuesta)
                                        }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Jugador</div>
                                        <div class="col-6" id="ModalBetDetailsPlayer">{{ betData.data[0]?.username }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Tipo</div>
                                        <div class="col-6" id="ModalBetDetailsTypeId">{{ betData.data[0]?.numero_items }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Juego</div>
                                        <div class="col-6" id="ModalBetDetailsGameId">{{ betData.data[0]?.live }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Apostado</div>
                                        <div class="col-6" id="ModalBetDetailsStake">{{
                                            parseNumbers(betData.data[0]?.valor_apostado_item) }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Cuota</div>
                                        <div class="col-6" id="ModalBetDetailsOdds">{{ parseNumbers(betData.valor_ganar_total) }}
                                        </div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Cobrado</div>
                                        <div class="col-6" id="ModalBetDetailsWinLoss">{{
                                            betData.data[0]?.estado == "Win" ? parseNumbers(betData.data[0]?.valor_ganar_item) : "" }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Ganancia posible</div>
                                        <div class="col-6" id="ModalBetDetailsPossibleWin">{{
                                            parseNumbers(betData.data[0]?.valor_ganar_item) }}</div>
                                    </div>
                                    <div class="row border-bottom">
                                        <div class="col-6">Estado</div>
                                        <div class="col-6" id="ModalBetDetailsStatus">{{ betData.data[0]?.estado }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 mx-auto text-center">
                                            <a href="#" id="ModalBetDetailsTransactions"
                                                @click="openModal('ModalBetTransactions')">Ver evolucion de la apuesta</a>
                                        </div>
                                    </div>
                                    <div id="ModalBetDetailsEvents">
                                        <div class="row font-size-custom2">
                                            <div v-for="(item, index) in betData.data" :key="index" class="col-12 col-sm-6 col-lg-4 border py-2">Deporte: <b>{{ item.deporte
                                            }}</b><br>Liga: <b>{{ item.liga }}</b><br>
                                                Evento: <b>{{ item.equipoa ?? '' }} Vs. {{ item.equipob ?? ''
                                                }}</b><br>Fecha: <b>{{ formatearFecha(item.fecha_encuentro)}}</b><br>Mercado/Selección:
                                                <b>{{ item.detalles }}</b><br>Cuota: <b>{{
                                                    parseNumbers(item.logro_item) }}</b>
                                                <b></b><br>Live: <b>{{ item.live }}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center py-2">
                            <button type="button" class="btn btn-cyan px-4 waves-effect waves-light" @click="closeModal"
                                data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalBetTransactions" tabindex="-1" role="dialog" aria-labelledby="BetTransactions"
                style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2">Evolucion de la Apuesta</h5>
                            <button type="button" class="close white-text" data-dismiss="modal" aria-label="Close" @click="closeTargetModal('ModalBetTransactions')">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-12 d-inline-table mx-1" id="ModalBetTransactionsData">
                                    <div class="row border-top py-2 font-size-custom2">
                                        <div class="col-6 col-lg-2 px-0">{{ formatearFecha(betData.data[0]?.fecha_apuesta) }}</div>
                                        <div class="col-6 col-lg px-0">Tipo: <i>{{ betData.data[0]?.numero_items }}</i></div>
                                        <div class="col-6 col-lg px-0">Estado: <i>Place Bet.</i></div>
                                        <div class="col-6 col-lg px-0">Importe: <i>{{
                                            parseNumbers(betData.data[0]?.valor_apostado_item) }}</i></div>
                                        <div class="col-6 col-lg px-0">Cuota: <i>{{ parseNumbers(betData.data[0]?.logro_item) }}</i>
                                        </div>
                                        <div class="col-6 col-lg px-0">Ganancia Posible: <i>{{
                                            parseNumbers(betData.data[0]?.valor_ganar_item) }}</i></div>
                                        <div class="col-6 col-lg px-0"><a href="#" class="show-events"
                                                @click="showBetDetails = !showBetDetails">Mostrar eventos <i
                                                    class="fas fa-sitemap"></i></a></div>
                                        <div class="col-12" v-if="showBetDetails">
                                            <div class="row mt-2 font-size-custom2">
                                                <div v-for="(item, index) in betData.data" :key="index" class="col-12 col-sm-6 col-lg-4 border py-2">Deporte: <b>{{
                                                    item.deporte }}</b><br>Liga: <b>{{ item.liga }}</b><br>
                                                    Evento: <b>{{ item.equipoa ?? '' }} Vs. {{ item.equipob ?? ''}}</b>
                                                    <br>Fecha: <b>{{ formatearFecha(item.fecha_encuentro)}}</b><br>Mercado/Selección:
                                                    <b>{{ item.detalles }}</b><br>Cuota: <b>{{
                                                        parseNumbers(item.logro_item) }}</b>
                                                    <b></b><br>Live: <b>{{ item.live }}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row border-top py-2 font-size-custom2">
                                        <div class="col-6 col-lg-2 px-0">{{ formatearFecha(betData.data[0]?.fecha_apuesta) }}</div>
                                        <div class="col-6 col-lg px-0">Tipo: <i>{{ betData.data[0]?.numero_items }}</i></div>
                                        <div class="col-6 col-lg px-0">Estado: <i>{{ betData.data[0]?.estado }}</i></div>
                                        <div class="col-6 col-lg px-0">Importe: <i>{{
                                            parseNumbers(betData.data[0]?.valor_ganar_item) }}</i></div>
                                        <div class="col-6 col-lg px-0">Cuota: <i></i>
                                        </div>
                                        <div class="col-6 col-lg px-0">Ganancia Posible: <i></i></div>
                                        <div class="col-6 col-lg px-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center py-2">
                            <button type="button" class="btn btn-cyan px-4 waves-effect waves-light"
                                @click="closeTargetModal('ModalBetTransactions')" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
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
                                            :startHour="startHour" :endHour="endHour" />
                            </ul>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-danger waves-effect waves-light" @click="closeModal('affiliates_tree_modal')">Cerrar</button>
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
import axios from 'axios';
let VueClockPicker2 = VueClockPicker;
export default {
    name: 'reporteDeportes',
    components: { treeNode,Pagination,customCalendar,VueClockPicker2 },
    data() {
        return {
            actual_page: 1,
            registers_per_page: 25,
            startDate: "",
            startHour: "",
            endDate: "",
            endHour: "",
            targetUserName: "",
            username: "",
            focusId: "",
            targetId: "",
            pendings: false,
            betData: {data:[]},
            showBetDetails: false,
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
        loadingReport() {
            return this.$store.getters["getLoadingReport"];
        },
        apiUrlnew(){
            return this.$store.getters['getApiUrlnew'];
        },
        site(){
            return this.$store.getters['getSite'];
        },
        reportData() {
            let main = this.$store.getters["getReportDeportes"];
            if (this.username != "") {
                return main.filter(bet => bet.username == this.username);
            }
            else if (this.focusId != "") {
                return main.filter(bet => bet.id == this.focusId);
            }
            else if (this.pendings) {
                return main.filter(bet => bet.estado == "Running");
            }
            return this.$store.getters["getReportDeportes"];
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
        closeTargetModal(target) {
            let modal = document.getElementById(target);
            modal.classList.remove("show");
            modal.style.display = "none"
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
        async openBetDetails(id) {
            try {
                this.backdrop(true)
                let modal = document.getElementById("ModalBetDetails");
                let response = await axios.post(this.apiUrlnew + "apuestas_detalles", {
                    "apuestaId": id
                });
                if (response.data) {
                    this.betData = response.data
                }
                modal.classList.add("show");
                modal.style.display = "block"
            } catch (error) {
                console.log(error);
            }
        },
        getReport() {
            this.actual_page = 1;
            this.focusId = this.targetId;
            this.username = this.targetUserName;
            this.$store.dispatch("getReportDeportes", {
                id: this.targetUser,
                startDate: this.getFechaFormated(this.startDate) + " " + this.startHour+":00",
                endDate: this.getFechaFormated(this.endDate) + " " + this.endHour+":00"
            })
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
    },
    mounted() {
        this.startDate = this.getFecha(new Date());
        this.startHour = "00:00"
        this.endDate = this.getFecha(new Date());
        this.endHour = "23:59"
    },
}
</script>