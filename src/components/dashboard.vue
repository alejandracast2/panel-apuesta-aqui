<template>
    <div>
        <div id="mySidenav" class="sidenav fixed grey lighten-4 text-dark" :class="slim">
            <ul class="custom-scrollbar ps ps--theme_default" data-ps-id="e1b5f787-914a-065d-9c55-e36e950e82cc">
                <li class="logo-sn waves-effect py-3">
                    <div class="text-center">
                        <img id="main-logo" class="d-inline-block align-top mr-1" width="120" :src="logo" alt="logo">
                    </div>
                </li>
                <li>
                    <div class="accordion" id="accordionExample">
                        <div class="menu-item" id="headingOne2">
                            <a style="font-size: small !important;" href="#/dashboard" @click="changeView('stats')"
                                class="collapsible-header collapsible-header-custom waves-effect active arrow-r"
                                data-toggle="collapse" data-target="#collapseOne2" aria-expanded="false"
                                aria-controls="collapseOne2"><i class="fas fa-chart-pie mr-3"></i><span
                                    :style="hideArrows ? 'display:none;' : ''">Estadisticas<i
                                        class="fas fa-angle-right my-0"></i></span>
                            </a>
                        </div>
                        <div id="collapseOne2" class="collapse px-3 menu-item" aria-labelledby="headingOne2"
                            data-parent="#accordionExample"></div>
                        <div class="menu-item" id="headingOne3">
                            <a style="font-size: small !important;" href="#/dashboard" @click="changeView('users')"
                                class="collapsible-header collapsible-header-custom waves-effect arrow-r"
                                data-toggle="collapse" data-target="#collapseOne3" aria-expanded="false"
                                aria-controls="collapseOne3">
                                <i class="fas fa-user-cog mr-3"></i><span
                                    :style="hideArrows ? 'display:none;' : ''">Usuarios<i
                                        class="fas fa-angle-right my-0"></i></span>
                            </a>
                        </div>
                        <div id="collapseOne3" class="collapse px-3 menu-item" aria-labelledby="headingOne3"
                            data-parent="#accordionExample"></div>
                        <div class="menu-item">
                            <div class="" id="headingOne">
                                <a style="font-size: small !important;"
                                    class="collapsible-header collapsible-header-custom waves-effect arrow-r"
                                    data-toggle="collapse" data-target="#collapseOne" aria-expanded="false"
                                    aria-controls="collapseOne">
                                    <i class="fas fa-brain mr-3"></i>
                                    <span :style="hideArrows ? 'display:none;' : ''">Reportes Globales<i
                                            class="my-0 fas fa-angle-down rotate-icon"></i></span>
                                </a>
                            </div>
                            <div id="collapseOne" class="collapse px-3" aria-labelledby="headingOne"
                                data-parent="#accordionExample">
                                <ul>
                                    <!-- CONDITION ReportGlobal BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reporteAgente')">
                                            Reporte por Agente<i class="fas fa-angle-right m-0"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportGlobal END -->
                                    <!-- CONDITION ReportGlobalPlayer BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reporteJugador')">
                                            Reporte por Jugador<i class="my-0 fas fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportGlobalPlayer END -->
                                </ul>
                            </div>
                        </div>
                        <div class="menu-item">
                            <div class="" id="headingTwo">
                                <a style="font-size: small !important;"
                                    class="collapsible-header collapsible-header-custom waves-effect arrow-r"
                                    data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                    aria-controls="collapseTwo">
                                    <i class="fas fa-coins mr-3"></i><span
                                        :style="hideArrows ? 'display:none;' : ''">Reportes Fichas<i
                                            class="my-0 fas fa-angle-down rotate-icon"></i></span>
                                </a>
                            </div>
                            <div id="collapseTwo" class="collapse px-3" aria-labelledby="headingTwo"
                                data-parent="#accordionExample">
                                <ul>
                                    <!-- CONDITION ReportBalances BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reporteCargas')">
                                            Cargas y Retiros<i class="fas fa-angle-right my-0"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportBalances END -->
                                    <!-- CONDITION ReportAffiliateHistory BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reporteHistorialAgente')">
                                            Historial de Agente<i class="fas fa-angle-right my-0"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportAffiliateHistory END -->
                                    <!-- CONDITION ReportPlayerHistory BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reporteHistorialJugador')">
                                            Historial de Jugador<i class="fas fa-angle-right my-0"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportPlayerHistory END -->
                                </ul>
                            </div>
                        </div>
                        <div class="menu-item">
                            <div class="" id="headingThree">
                                <a style="font-size: small !important;"
                                    class="collapsible-header collapsible-header-custom waves-effect arrow-r"
                                    data-toggle="collapse" href="#juegos_reports" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                    <i class="fas fa-dice mr-3"></i><span
                                        :style="hideArrows ? 'display:none;' : ''">Reportes de Juegos<i
                                            class="my-0 fas fa-angle-down rotate-icon"></i></span>
                                </a>
                            </div>
                            <div id="collapseThree" class="collapse px-3" aria-labelledby="headingThree"
                                data-parent="#accordionExample">
                                <ul>
                                    <!-- CONDITION ReportProvider210 BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reporteDeportes')">
                                            Deportes<i class="fas fa-angle-right my-0"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportProvider210 END -->
                                    <!-- CONDITION ReportProvider300 BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reporteCasino')">
                                            Casino<i class="fas fa-angle-right my-0"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportProvider300 END -->
                                    <!-- CONDITION ReportProvider120 BEGIN -->
                                    <li>
                                        <a style="font-size: small !important;" href="#/dashboard" class="waves-effect"
                                            @click="changeView('reportePoker')">
                                            Poker<i class="fas fa-angle-right my-0"></i>
                                        </a>
                                    </li>
                                    <!-- CONDITION ReportProvider120 END -->
                                </ul>
                            </div>
                        </div>
                        <div class="menu-item">
                            <div class="" id="headingFour">
                                <a style="font-size: small !important;"
                                    class="collapsible-header collapsible-header-custom waves-effect arrow-r"
                                    data-toggle="collapse" href="#finanzas" data-target="#collapseFour"
                                    aria-expanded="false" aria-controls="collapseFour">
                                    <i class="fas fa-donate mr-3"></i><span
                                        :style="hideArrows ? 'display:none;' : ''">Finanzas<i
                                            class="my-0 fas fa-angle-down rotate-icon"></i></span>
                                </a>
                            </div>
                            <div id="collapseFour" class="collapse mx-3" aria-labelledby="headingFour"
                                data-parent="#accordionExample">
                                <div class="accordion" id="accordionExample2">
                                    <div class="" id="headingFive">
                                        <a style="font-size: small !important;"
                                            class="collapsible-header collapsible-header-custom waves-effect arrow-r collapsible-level-2"
                                            data-toggle="collapse" href="#agentes" data-target="#collapseFive"
                                            aria-expanded="false" aria-controls="collapseFive">
                                            <i class="fas fa-user-secret mr-3"></i>Agentes<i
                                                class="fas fa-angle-down rotate-icon my-0"></i>
                                        </a>
                                    </div>
                                    <div id="collapseFive" class="collapse px-3" aria-labelledby="headingFive"
                                        data-parent="#accordionExample2">
                                        <ul>
                                            <!-- CONDITION FinanceAffiliatesOperation BEGIN -->
                                            <li>
                                                <a style="font-size: small !important;" href="#/dashboard"
                                                    class="waves-effect"
                                                    @click="changeView('finanzasAgenteOperaciones')">
                                                    Operaciones<i class="my-0 fas fa-angle-right"></i>
                                                </a>
                                            </li>
                                            <!-- CONDITION FinanceAffiliatesOperation END -->
                                            <!-- CONDITION FinanceAffiliatesBalances BEGIN -->
                                            <li>
                                                <a style="font-size: small !important;" href="#/dashboard"
                                                    class="waves-effect" @click="changeView('finanzasAgenteCuentas')">
                                                    Cuentas Corrientes<i class="my-0 fas fa-angle-right"></i>
                                                </a>
                                            </li>
                                            <!-- CONDITION FinanceAffiliatesBalances END -->
                                        </ul>
                                    </div>
                                    <div class="" id="headingSix">
                                        <a style="font-size: small !important;"
                                            class="collapsible-header collapsible-header-custom waves-effect arrow-r collapsible-level-2"
                                            data-toggle="collapse" href="#agentes" data-target="#collapseSix"
                                            aria-expanded="false" aria-controls="collapseSix">
                                            <i class="fas fa-users mr-2"></i> Jugadores<i
                                                class="fas fa-angle-down rotate-icon my-0"></i>
                                        </a>
                                    </div>
                                    <div id="collapseSix" class="collapse mx-3" aria-labelledby="headingSix"
                                        data-parent="#accordionExample2">
                                        <ul>
                                            <!-- CONDITION FinancePlayersOperation BEGIN -->
                                            <li>
                                                <a style="font-size: small !important;" href="#/dashboard"
                                                    class="waves-effect"
                                                    @click="changeView('finanzasJugadorOperaciones')">
                                                    Operaciones<i class="fas fa-angle-right my-0"></i>
                                                </a>
                                            </li>
                                            <!-- CONDITION FinancePlayersOperation END -->
                                            <!-- CONDITION FinancePlayersBalances BEGIN -->
                                            <li>
                                                <a style="font-size: small !important;" href="#/dashboard"
                                                    class="waves-effect" @click="changeView('finanzasJugadorCuentas')">
                                                    Cuentas Corrientes<i class="fas fa-angle-right my-0"></i>
                                                </a>
                                            </li>
                                            <!-- CONDITION FinancePlayersBalances END -->
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="menu-item" id="headingOne4">
                            <a style="font-size: small !important;" href="#/dashboard"
                                class="collapsible-header waves-effect arrow-r" @click="changeView('miResumen')"
                                data-toggle="collapse" data-target="#collapseOne4" aria-expanded="false"
                                aria-controls="collapseOne4">
                                <i class="fas fa-file-invoice-dollar mr-3"></i><span
                                    :style="hideArrows ? 'display:none;' : ''">Mi resumen<i
                                        class="fas fa-angle-right my-0"></i></span>
                            </a>
                        </div>
                        <div id="collapseOne4" class="collapse px-3 menu-item" aria-labelledby="headingOne4"
                            data-parent="#accordionExample"></div>

                        <!-- solicitudes de Retiros -->
                        <div v-if="(skins.register_fields.root == state.id || skins.register_fields.root1 == state.id)"
                            class="menu-item" id="headingOne5">
                            <a style="font-size: small !important;" href="#/dashboard"
                                class="collapsible-header waves-effect arrow-r" @click="changeView('solicitudRetiro')"
                                data-toggle="collapse" data-target="#collapseOne5" aria-expanded="false"
                                aria-controls="collapseOne5">
                                <i class="fas fa-money-bill mr-3"></i><span
                                    :style="hideArrows ? 'display:none;' : ''">Solicitudes de Retiros<i
                                        class="fas fa-angle-right my-0"></i></span>
                            </a>
                        </div>
                        <div id="collapseOne5" class="collapse px-3 menu-item" aria-labelledby="headingOne5"
                            data-parent="#accordionExample"></div>

                        <!-- CONDITION FinanceAffiliatesOwnBalance END -->

                <li>
                    <a style="font-size: small !important;" v-if="screen_width > 1000" id="toggle"
                        class="collapsible-header waves-effect" @click="viewType == 'thin' ? closeNav() : openNav()">
                        <i class="fas fa-angle-double-left mx-2"></i>Plegar Menu
                    </a>
                </li>
                <div class="" id="headingOne5" style="visibility: hidden;">
                    <a id="closeAll" style="font-size: small !important;" href="#/dashboard"
                        class="collapsible-header waves-effect" data-toggle="collapse" data-target="#collapseOne5"
                        aria-expanded="false" aria-controls="collapseOne5"> Close
                    </a>
                </div>
                <div id="collapseOne5" class="collapse px-3" aria-labelledby="headingOne5"
                    data-parent="#accordionExample">
                </div>
        </div>
        </li>
        </ul>
        <div class="sidenav-bg mask-strong"></div>
    </div>
    <nav class="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav grey lighten-4">
        <div class="">
            <span data-activates="slide-out2" class="button-collapse black-text float-left m-0 p-0" @click="openNav">
                <i class="fas fa-bars"></i>
            </span>
        </div>
        <div class="breadcrumb-dn mr-auto"></div>
        <ul class="nav nav-custom navbar-nav nav-flex-icons ml-auto">
            <li class="nav-item">
                <a class="nav-link waves-effect"><i class="fas fa-coins"></i> <span
                        class="clearfix d-none d-sm-inline-block own-balance">{{ new
                            Intl.NumberFormat("de-DE", {
                                minimumFractionDigits: 2, maximumFractionDigits:
                                    2
                            }).format(UserData.balance) }}</span></a>
            </li>
            <!-- CONDITION BrandSupport BEGIN -->
            <li class="nav-item dropdown notifications-nav support-nav user-custom-dropdown pt-2">
                <a class="nav-link dropdown-toggle waves-effect" @click="openSupportModalJivo()">
                    <i class="support-icon support-icon-top my-0"></i>
                </a>
            </li>
            <li class="nav-item dropdown user-custom-dropdown">
                <a class="nav-link dropdown-toggle waves-effect black-text" href="#" id="userDropdown"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-user-secret"></i>
                    <span class="clearfix d-none d-sm-inline-block own-username">{{ UserData.name }}</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <!-- CONDITION ChangeOwnPassword BEGIN -->
                    <a class="dropdown-item waves-effect waves-light" href="#" id="ChangeOwnPassword" data-user-id=""
                        @click="openModal('ModalChangePassword1')">Cambiar Contraseña</a>
                    <!-- CONDITION ChangeOwnPassword END -->

                    <!-- <a class="dropdown-item waves-effect waves-light" href="#" id="ChangeLanguage">Cambiar Idioma</a> -->
                    <a class="dropdown-item waves-effect waves-light" @click="openModal('historial_ingresos')" href="#"
                        id="LoginHistory" data-bs-toggle="modal" data-bs-target="#historial_ingresos">Historial de
                        Ingresos</a>
                    <!-- CONDITION SupportMyAccount BEGIN -->
                    <!-- CONDITION BrandRegister BEGIN -->
                    <a class="dropdown-item waves-effect waves-light" href="#" id="MyAccount">Mi cuenta</a>

                    <div class="share-link-container">
                        <button class="btn btn-primary btn-sm" @click="copyToClipboard">
                            <i class="fas fa-copy"></i> Copiar Enlace
                        </button>
                    </div>
                    <!-- CONDITION BrandRegister END -->
                    <!-- CONDITION SupportMyAccount END -->
                    <a class="dropdown-item waves-effect waves-light" @click="logout" href="#">Salir</a>
                </div>
            </li>
        </ul>
    </nav>
    <div style="padding-top: 3.5rem!important;" :style="screen_width > 1000 ? 'margin-left:6%' : ''">
        <stats v-if="getActualView == 'stats' && reloadStats" :view_type="viewType" />
        <users v-if="getActualView == 'users'" :view_type="viewType" />
        <reporteAgente v-if="getActualView == 'reporteAgente'" :view_type="viewType" />
        <reporteJugador v-if="getActualView == 'reporteJugador'" :view_type="viewType" />
        <reporteCargas v-if="getActualView == 'reporteCargas'" :view_type="viewType" />
        <reporteHistorialAgente v-if="getActualView == 'reporteHistorialAgente'" :view_type="viewType" />
        <reporteHistorialJugador v-if="getActualView == 'reporteHistorialJugador'" :view_type="viewType" />
        <reporteDeportes v-if="getActualView == 'reporteDeportes'" :view_type="viewType" />
        <reporteCasino v-if="getActualView == 'reporteCasino'" :view_type="viewType" />
        <reportePoker v-if="getActualView == 'reportePoker'" :view_type="viewType" />
        <finanzasAgenteOperaciones v-if="getActualView == 'finanzasAgenteOperaciones'" :view_type="viewType" />
        <finanzasAgenteCuentas v-if="getActualView == 'finanzasAgenteCuentas'" :view_type="viewType" />
        <finanzasJugadorOperaciones v-if="getActualView == 'finanzasJugadorOperaciones'" :view_type="viewType" />
        <finanzasJugadorCuentas v-if="getActualView == 'finanzasJugadorCuentas'" :view_type="viewType" />
        <miResumen v-if="getActualView == 'miResumen'" :view_type="viewType" />
        <solicitudRetiro v-if="getActualView == 'solicitudRetiro'" :view_type="viewType" />
        <div v-if="!reloadStats" style="width: 100vw;height: 100vh;" class="text-center my-5">
            <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
    <div class="modal fade show" id="ModalChangePassword1" tabindex="-1" role="dialog" aria-labelledby="ChangePassword"
        aria-modal="true">
        <div class="modal-dialog cascading-modal modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Cambiar Contraseña</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="showChangePassword" class="font-size-custom py-2" id="">Para
                        preversar la seguridad de su cuenta, le aconsejamos cambiar su
                        contraseña.</div>
                    <div class="md-form pb-2 font-size-custom">
                        <i class="fas fa-eye prefix change-password-reveal grey-text" id="iconPassMain1" title="Mostrar"
                            @click="showHidePassword('ChangePasswordNewMain', 'iconPassMain1', 1)"></i>
                        <input type="password" v-model="new_password" id="ChangePasswordNewMain"
                            class="form-control change-password-toggle change-password-input modal-clear-val"
                            maxlength="16">
                        <label for="ChangePasswordNewMain" class="">Nueva Contraseña</label>
                    </div>
                    <div class="md-form pb-2 font-size-custom">
                        <i class="fas fa-eye prefix change-password-reveal grey-text" id="iconPassMain2" title="mostrar"
                            @click="showHidePassword('ChangePasswordNewMain2', 'iconPassMain2', 2)"></i>
                        <input type="password" v-model="new_password2" id="ChangePasswordNewMain2"
                            class="form-control change-password-toggle change-password-input modal-clear-val"
                            maxlength="16">
                        <label for="ChangePasswordNewMain2" class="">Ingrese Nuevamente</label>
                    </div>
                    <div v-if="changePasswordMessage.message != ''" class="font-size-custom text-center pb-4"
                        id="ChangePasswordError" style="display: block;"
                        :style="changePasswordMessage.type == 'error' ? 'color:red;' : 'color:green;'">{{
                            changePasswordMessage.message }}</div>
                    <div class="col modal-clear-hide text-center text-center mb-4" id="ChangePasswordLoadingMain"
                        style="display: none;">
                        <div class="preloader-wrapper small active">
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
                </div>
                <div class="modal-footer d-flex justify-content-center py-2">
                    <input type="hidden" class="modal-clear-val" id="ChangePasswordId" value="146675">
                    <input type="hidden" class="modal-clear-val" id="ChangePasswordRole" value="affiliate">
                    <button type="button" class="btn btn-outline-cyan px-3 waves-effect waves-light"
                        data-dismiss="modal" @click="closeModal">Cerrar</button>
                    <button type="button" class="btn btn-cyan px-3 waves-effect waves-light waves-light"
                        id="ModalChangePasswordSubmitMain" @click="changePassword">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
    <div style="display: none;">{{ main_tree }}</div>
    <div id="modalBackdrop" class="modal-backdrop fade" style="display: none;"></div>
    <div id="modalBackdropMovil" class="modal-backdrop fade" style="display: none;z-index: 8;" @click="closeNav"></div>
    <historialIngresos />
    </div>
</template>
<script>
/* eslint-disable*/
import Swal from 'sweetalert2';
import stats from './dashboard_components/stats'
import users from './dashboard_components/users'
import reporteAgente from './dashboard_components/reporteAgente'
import reporteJugador from './dashboard_components/reporteJugador'
import reporteCargas from './dashboard_components/reporteCargas'
import reporteHistorialAgente from './dashboard_components/reporteHistorialAgente'
import reporteHistorialJugador from './dashboard_components/reporteHistorialJugador'
import reporteDeportes from './dashboard_components/reporteDeportes'
import reporteCasino from './dashboard_components/reporteCasino'
import reportePoker from './dashboard_components/reportePoker'
import finanzasAgenteOperaciones from './dashboard_components/finanzasAgenteOperaciones'
import finanzasAgenteCuentas from './dashboard_components/finanzasAgenteCuentas'
import finanzasJugadorOperaciones from './dashboard_components/finanzasJugadorOperaciones'
import finanzasJugadorCuentas from './dashboard_components/finanzasJugadorCuentas'
import historialIngresos from './historialIngresos.vue'
import miResumen from './dashboard_components/miResumen'
import solicitudRetiro from './dashboard_components/SolicitudRetiro'

import router from '../router/index';
import axios from 'axios';
export default {
    name: 'DashboardPage',
    components: {
        stats,
        users,
        reporteAgente,
        reporteJugador,
        reporteCargas,
        reporteHistorialAgente,
        reporteHistorialJugador,
        reporteDeportes,
        reporteCasino,
        reportePoker,
        finanzasAgenteOperaciones,
        finanzasAgenteCuentas,
        finanzasJugadorOperaciones,
        finanzasJugadorCuentas,
        miResumen,
        solicitudRetiro,
        historialIngresos
    },
    data() {
        return {
            slim: "",
            reloadCharts: 0,
            isConnected: false,
            socket: null,
            mensajes: [],
            viewType: "thin",
            hideArrows: false,
            new_password: "",
            screen_width: 0,
            new_password2: "",
            showPassword: false,
            showPassword2: false,
            changePasswordMessage: { type: "", message: "" },
            support_subject: "",
            support_message: "",
            support_image: "",
            support_image_src: "",
            supportTickets: [],
            supportTicketTarget: {},
            loading: false,
            treeLoaded: false
        }
    },
    methods: {
        copyToClipboard() {

        const input = this.UserData.website;
        const nuevaUrl = input.replace("apuestaaqui.club", "apuestas365.bet");
        if (!nuevaUrl) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'No hay URL para copiar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        navigator.clipboard.writeText(nuevaUrl)
            .then(() => {
                console.log("Enlace copiado:", nuevaUrl);
                Swal.fire({
                    icon: 'success',
                    title: '¡Copiado!',
                    text: 'El enlace se ha copiado al portapapeles.',
                    confirmButtonText: 'Aceptar'
                });
            })
            .catch(err => {
                console.error("Error al copiar:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo copiar el enlace.',
                    confirmButtonText: 'Aceptar'
                });
            });
    },
        // copyToClipboard() {
        //     const input = this.UserData.website;
        //     const nuevaUrl = input.replace("apuestaaqui.club", "apuestas365.bet");

        //     const textarea = document.createElement("textarea");
        //     textarea.value = nuevaUrl;
        //     document.body.appendChild(textarea);
        //     textarea.select();
        //     document.execCommand("copy");
        //     document.body.removeChild(textarea);

        //     alert("¡Enlace copiado al portapapeles!");
        // },
        logout() {
            this.$store.dispatch("logOut")
        },
        getIngresos() {
            this.$root.$emit('getIngresosHistory');
        },
        reload() {
            this.reloadCharts++;
        },
        sizeControl() {
            this.screen_width = window.innerWidth;
        },
        openSupportModalJivo() {
            const jivoElement = this.jivoElement1;
            const jivoMobileElement = this.desktopButton;
            const jivoMobileElement2 = this.globalClass;
            if (this.jivo_modal_flag) {
                if (jivoElement) {
                    jivoElement.style.display = 'none';
                }
                this.$store.dispatch("setJivo_modal_flag", false);
            } else {
                if (jivoElement) {
                    jivoElement.style.display = 'block';
                    jivo_api.open()
                }
                if (jivoMobileElement2) {
                    jivoMobileElement2.style.display = 'block';
                    jivo_api.open()
                }
                setTimeout(() => {
                    jivo_api.open()
                }, 500);
                this.$store.dispatch("setJivo_modal_flag", true);
                this.$store.dispatch("setMessage", false);
            }
        },
        openSupportModalJivo2() {
            const jivoMobileElement = this.mobileButton;
            const jivoMobileElement2 = this.globalClass;
            if (this.jivo_modal_flag) {
                if (jivoMobileElement) {
                    jivoMobileElement.style.display = 'none'; // Ocultar el elemento móvil
                }
                this.$store.dispatch("setJivo_modal_flag", false);
            } else {
                if (jivoMobileElement) {
                    jivoMobileElement.style.display = 'block'; // Mostrar el elemento móvil
                    jivo_api.open()
                }
                if (jivoMobileElement2) {
                    jivoMobileElement2.style.display = 'block';
                    jivo_api.open()
                }
                this.$store.dispatch("setJivo_modal_flag", true);
                this.$store.dispatch("setMessage", false);
            }
        },
        changeView: function (view) {
            this.$store.dispatch('setDashboardView', view);
            if (this.screen_width < 1000) {
                this.closeNav()
            }
        },
        openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            if (this.screen_width < 1000) {
                document.getElementById("modalBackdropMovil").style.display = "block";
                document.getElementById("modalBackdropMovil").classList.add("show");
            }
            else {
                this.hideArrows = false
                this.viewType = "thin"
            }
        },
        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            if (this.screen_width < 1000) {
                document.getElementById("modalBackdropMovil").style.display = "none";
                document.getElementById("modalBackdropMovil").classList.remove("show");
            }
            else {
                document.getElementById("mySidenav").style.width = "60px";
                this.hideArrows = true
                this.viewType = "wide"
            }
        },
        async changePassword() {
            try {
                document.getElementById("ChangePasswordLoadingMain").style.display = "block";
                document.getElementById("ModalChangePasswordSubmitMain").disabled = true;
                let response = await axios.post(this.apiUrlnew + "cambiar_password", {
                    "users": [this.UserData.id],
                    "password": this.new_password,
                    "password1": this.new_password2,
                    "token": this.UserData.token,
                    "login_id": this.main_tree.id,
                    "site": this.site
                }
                )
                if (response.data) {
                    this.changePasswordMessage = {
                        message: response.data.message ?? response.data.error,
                        type: response.data.message ? 'success' : 'error'
                    };
                    document.getElementById("ChangePasswordLoadingMain").style.display = "none";
                    document.getElementById("ModalChangePasswordSubmitMain").disabled = false;
                }
            } catch (error) {
                console.log(error.message);
                document.getElementById("ChangePasswordLoadingMain").style.display = "none";
                document.getElementById("ModalChangePasswordSubmitMain").disabled = false;
            }
        },
        openModal(target) {
            try {
                this.backdrop(true);
                let modal = document.getElementById(target);
                modal.classList.add("show");
                modal.style.display = "block";
                if (target == 'historial_ingresos') {
                    this.getIngresos()
                }
            } catch (error) {
                console.log(error);
            }
        },
        showHidePassword(target, icon, flag) {
            if (flag == 1 && !this.showPassword) {
                document.getElementById(target).type = "text";
                document.getElementById(icon).classList.remove("fa-eye");
                document.getElementById(icon).classList.add("fa-eye-slash");
                this.showPassword = true
            }
            else if (flag == 1 && this.showPassword) {
                document.getElementById(target).type = "password";
                document.getElementById(icon).classList.remove("fa-eye-slash");
                document.getElementById(icon).classList.add("fa-eye");
                this.showPassword = false
            }
            if (flag == 2 && !this.showPassword2) {
                document.getElementById(target).type = "text";
                document.getElementById(icon).classList.remove("fa-eye");
                document.getElementById(icon).classList.add("fa-eye-slash");
                this.showPassword2 = true
            }
            else if (flag == 2 && this.showPassword2) {
                document.getElementById(target).type = "password";
                document.getElementById(icon).classList.remove("fa-eye-slash");
                document.getElementById(icon).classList.add("fa-eye");
                this.showPassword2 = false
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
            this.new_password = "";
            this.new_password2 = "";
            this.support_subject = "";
            this.support_message = "";
            this.support_image = "";
            this.support_image_src = "";
            this.changePasswordMessage = { type: "", message: "" }
        },
        showPasswordChangeSecurity() {
            setTimeout(() => { this.openModal('ModalChangePassword1') }, 2000)
        },
        countDays(init) {
            // Crear dos objetos Date con las fechas que quieres comparar
            var fecha1 = new Date(init);
            var fecha2 = new Date();

            // Calcular la diferencia en milisegundos entre las dos fechas
            var diferenciaEnMilisegundos = fecha2 - fecha1;

            // Convertir la diferencia en días
            var diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

            // Redondear la diferencia si es necesario
            diferenciaEnDias = Math.round(diferenciaEnDias);
            return diferenciaEnDias;
        },
        triggerImageUpload() {
            this.$refs.imageInput.click();  // Activa el input de tipo "file"
        },
        compressImage(imgToCompress, resizingFactor = 0.3, quality = 0.5) {
            // resizing the image
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            const originalWidth = imgToCompress.width;
            const originalHeight = imgToCompress.height;

            const canvasWidth = originalWidth * resizingFactor;
            const canvasHeight = originalHeight * resizingFactor;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            context.drawImage(
                imgToCompress,
                0,
                0,
                originalWidth * resizingFactor,
                originalHeight * resizingFactor
            );

            // reducing the quality of the image
            const self = this;
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            var base64data = reader.result;
                            self.support_image_src = base64data; // AQUI ESTA EL BASE 64 RESULTANTE
                        }
                    }
                },
                "image/jpeg",
                quality
            );
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Aquí reducimos la calidad de la imagen antes de convertirla en Data URL
                    const image = new Image();
                    image.src = e.target.result;
                    // console.log(file.name)
                    this.support_image = file.name;
                    const self = this;
                    image.onload = () => {
                        self.compressImage(image)
                    };
                };
                reader.readAsDataURL(file);
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
        agregarCeroDelante(numero) {
            return numero < 10 ? '0' + numero : numero;
        },
        isTreeLoaded() {
            this.treeLoaded = true;
        },
    },
    computed: {
        state() {
            return this.$store.state.user;
        },
        apiUrl() {
            return this.$store.getters['getApiUrl'];
        },
        apiUrlnew() {
            return this.$store.getters['getApiUrlnew'];
        },
        logo() {
            return this.$store.getters['getSkin'].header_desktop?.logo;
        },
        skins() {
            return this.$store.getters['getSkin'];
        },
        showChangePassword() {
            if (this.$store.getters['getShowChangePassword']) {
                this.showPasswordChangeSecurity()
            }
            return this.$store.getters['getShowChangePassword'];
        },
        reloadStats() {
            return this.$store.getters["getRenderStats"];
        },
        site() {
            return this.$store.getters['getSite'];
        },
        getActualView() {
            return this.$store.getters['getDashboardView'];
        },
        jivoElement1() {
            return this.$store.getters['jivoElement1'];
        },
        desktopButton() {
            return this.$store.getters['desktopButton'];
        },
        globalClass() {
            return this.$store.getters['globalClass'];
        },
        mobileButton() {
            return this.$store.getters['mobileButton'];
        },
        UserData() {
            return this.$store.getters["getUserData"];
        },
        jivo_modal_flag() {
            return this.$store.getters["getModalFlag"]
        },
        message_recived() {
            return this.$store.getters["getMessage"]
        },
        main_tree() {
            let data = this.$store.getters["getMainTree"]
            if (data.id) {
                this.isTreeLoaded();
            }
            return data;
        },
    },
    created() {
        this.sizeControl();
    },
    mounted() {
        if (this.screen_width > 1000) {
            this.openNav()
        }
        else {
            this.closeNav()
        }
        window.addEventListener('resize', () => { this.sizeControl(); });
    },
    watch: {
    }
}
</script>
<style scoped>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
}

.sidenav ul {
    list-style: none;
    padding-left: 0;
}

.sidenav>ul {
    max-height: 100vh;
}

.sidenav .fa-angle-right {
    position: absolute;
    right: 0;
    top: 0.8rem;
    margin-right: 1.25rem !important;
}

.sidenav.wide .fa-angle-down.rotate-icon {
    opacity: 1;
    display: block;
}

.sidenav .fa-angle-down.rotate-icon {
    position: absolute;
    right: 0;
    top: 0.8rem;
    margin-right: 1.25rem;
}

a {
    color: black !important;
    display: block;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    transition: 0.3s;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}
</style>