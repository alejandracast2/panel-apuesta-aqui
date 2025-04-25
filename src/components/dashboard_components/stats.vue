<template>
    <div>
        <main :class="view_type">
            <div class="container-fluid mb-5 px-1 px-sm-2">
                <section>
                    <div id="mainAlert"></div>
                    <div class="row mt-4 mb-3 mx-lg-0">
                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Carga rapida</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center px-1 pb-1 pt-lg-5 pb-lg-4 pt-xl-4 pb-lg-4"
                                    id="QuickUse_container">
                                    <div class="row mx-auto">
                                        <div class="col-6 px-0 text-center">
                                            <button class="btn btn-sm btn-danger waves-effect waves-light"
                                                @click="openModal('ModalNewUser', main_tree.id, 'jugador')"
                                                id="NewPlayerButton"><i class="fas fa-user"></i> Nuevo Jugador</button>
                                        </div>
                                        <div v-if="skins.register_fields.root == state.id || skins.register_fields.root1 == state.id"
                                            class="col-6 px-0 text-center">
                                            <button class="btn btn-sm btn-danger waves-effect waves-light"
                                                @click="openModal('ModalNewUser', main_tree.id, 'agente')"
                                                id="NewAffiliateButton"><i class="fas fa-users"></i> Nuevo
                                                Agente</button>
                                        </div>
                                        <div id="UserSearchDiv" class="col-12 mt-3 mb-lg-3">
                                            <div class="row mx-auto">
                                                <div class="col-6 col-sm-5 offset-sm-1 col-lg-6 offset-lg-0 mt-3">
                                                    <div class="md-form font-size-custom2 mt-2 mb-md-1 my-lg-2">
                                                        <input type="text" id="UserSearch" v-model="search"
                                                            class="form-control search-username" maxlength="16"
                                                            placeholder="Nombre de usuario">
                                                    </div>
                                                </div>
                                                <div class="col-2 offset-1 mt-3">
                                                    <button @click="openModalCredit('ModalCredit', 'Cargar Fichas')"
                                                        class="mb-1 mt-1 ml-0 mr-1 ml-md-2 btn btn-floating cyan waves-effect waves-light btn-action btn-credit btn-add-credit"
                                                        alt="Cargar Fichas" title="Cargar Fichas"><i class="fas fa-plus"
                                                            aria-hidden="true"></i></button>
                                                </div>
                                                <div class="col-2 mt-3 ml-2">
                                                    <button @click="openModalCredit('ModalCredit', 'Descargar Fichas')"
                                                        class="mb-1 mt-1 mx-0 mx-sm-2 btn btn-floating cyan waves-effect waves-light btn-action btn-credit btn-deduct-credit"
                                                        alt="Descargar Fichas" title="Descargar Fichas"><i
                                                            class="fas fa-minus" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="alert" role="alert" id="QuickUse_alert">
                                        <i class="fa fa-info mx-2"></i>
                                        <span class="alert-span"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Ganancia neta</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center pt-xl-2 pb-xl-3"
                                    id="MonthlyEarning_container">
                                    <div class="preloader-wrapper big active d-none">
                                        <div class="spinner-layer spinner-blue-only">
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
                                    <div class="col-md-10 mx-auto text-center">
                                        <p class="my-4">Mes actual: <strong><span id="MonthlyEarningCurrent"
                                                    class="hide-value">{{ parseNumbers(chartDataNetwinTotal.mes_actual)
                                                    }}</span></strong></p>
                                        <p class="my-4">Mes anterior: <strong><span id="MonthlyEarningPrevious"
                                                    class="hide-value">{{
                                                        parseNumbers(chartDataNetwinTotal.mes_anterior) }}</span></strong>
                                        </p>
                                        <h5 class="my-4">
                                            <span class="badge p-2"
                                                :class="chartDataNetwinTotal.mes_actual - chartDataNetwinTotal.mes_anterior < 0 ? 'red' : 'green'"
                                                id="MonthlyEarningTrend">{{ chartDataNetwinTotal.mes_actual -
                                                    chartDataNetwinTotal.mes_anterior < 0 ? '-' : '+' }}{{
                                                    (((chartDataNetwinTotal.mes_actual -
                                                        chartDataNetwinTotal.mes_anterior) /
                                                        chartDataNetwinTotal.mes_anterior) * 100).toFixed(2) }}%</span>
                                                    <i class="ml-3 far fa-eye-slash hide-values"></i>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center ">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Netwin Mensual</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center" id="Netwin_container">
                                    <div class="chartjs-size-monitor"
                                        style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
                                        <div class="chartjs-size-monitor-expand"
                                            style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                            <div
                                                style="position:absolute;width:1000000px;height:1000000px;left:0;top:0">
                                            </div>
                                        </div>
                                        <div class="chartjs-size-monitor-shrink"
                                            style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                            <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                                        </div>
                                    </div>
                                    <canvas id="netwinChart" width="504" height="252"></canvas>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center ">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Netwin Diario</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center" id="NetwinDaily_container">
                                    <div class="chartjs-size-monitor"
                                        style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
                                        <div class="chartjs-size-monitor-expand"
                                            style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                            <div
                                                style="position:absolute;width:1000000px;height:1000000px;left:0;top:0">
                                            </div>
                                        </div>
                                        <div class="chartjs-size-monitor-shrink"
                                            style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                            <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                                        </div>
                                    </div><canvas id="netwin2Chart" width="504" height="252"></canvas>
                                </div>
                            </div>
                        </div>


                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center ">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Top Agentes del mes</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center" id="TopAffiliates_container">
                                    <div class="chartjs-size-monitor"
                                        style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
                                        <div class="chartjs-size-monitor-expand"
                                            style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                            <div
                                                style="position:absolute;width:1000000px;height:1000000px;left:0;top:0">
                                            </div>
                                        </div>
                                        <div class="chartjs-size-monitor-shrink"
                                            style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                            <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                                        </div>
                                    </div><canvas id="agentesChart" width="504" height="252"></canvas>
                                </div>
                            </div>
                        </div>



                    </div>
                </section>
            </div>
            <div class="modal fade" id="ModalCredit" tabindex="-1" role="dialog" aria-labelledby="Credit"
                aria-hidden="true">
                <div class="modal-dialog modal-sm cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-0" id="ModalCreditTitle">
                                {{ credit_modal.action }}</h5>
                            <button type="button" class="close mr-0" data-dismiss="modal" aria-label="Close"
                                @click="closeModal">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3 px-1">
                            <div v-if="credit_modal.loading" class="col text-center" id="ModalCreditLoading">
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
                            <div v-else class="col text-center px-0" id="ModalCreditContent" style="display:block;">
                                <div class="input-group mb-3 d-none" id="ModalCreditSourceContent">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text input-modal-addon">
                                            <i class="fas fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text input-modal-addon">
                                            <i class="fas fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="text"
                                        class="d-inline-block form-control form-modal-input modal-clear-val px-1"
                                        id="ModalCreditDestinationUsername" readonly="" :value="credit_modal.username"
                                        :style="credit_modal.role == 'ROLE_PROMOTOR' ? 'color:blue;' : 'color:red;'">
                                    <input type="text"
                                        class="d-inline-block form-control form-modal-input modal-clear-val text-right"
                                        id="ModalCreditDestinationBalance" readonly="" :value="credit_modal.balance">
                                </div>
                                <div class="row mb-4 px-0">
                                    <div class="input-group col-8 col-xl-8 pr-1">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text input-modal-addon">
                                                <i class="fas fa-coins" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control form-modal-input text-right"
                                            id="ModalCreditAmount" aria-label="Amount" autocomplete="off" value="0"
                                            @input="parseNumbers('', 'ModalCreditAmount')">
                                        <input type="hidden" class="modal-clear-val" id="ModalCreditAction">
                                    </div>
                                    <div class="input-group col-4 col-xl-4 p-0 text-center">
                                        <!-- CONDITION NumberFormat1 BEGIN -->
                                        <button
                                            class="mb-1 mt-1 mr-1 btn btn-floating cyan waves-effect waves-light btn-action btn-credit-mod btn-add"
                                            step="50" id="ModalCreditAdd" title="Aumentar"
                                            @click="addValue('ModalCreditAmount', 50)"><i class="fas fa-plus"
                                                aria-hidden="true"></i></button>
                                        <button
                                            class="mb-1 mt-1 btn btn-floating cyan waves-effect waves-light btn-action btn-credit-mod btn-deduct"
                                            step="-50" id="ModalCreditDeduct" title="Disminuir"
                                            @click="removeValue('ModalCreditAmount', 50)"><i class="fas fa-minus"
                                                aria-hidden="true"></i></button>
                                        <!-- CONDITION NumberFormat1 END -->
                                    </div>
                                </div>
                                <div class="row px-2 px-sm-2 mb-2 px-xl-2">
                                    <div class="input-group col-12 p-0 text-center">
                                        <!-- CONDITION NumberFormat1 BEGIN -->
                                        <button
                                            class="mb-1 mt-1 mr-2 mr-sm-2 mr-xl-2 btn btn-outline-cyan btn-sm px-3 waves-effect waves-light btn-action-sub btn-credit-mod btn-add100"
                                            step="100" id="ModalCreditAdd100" title="Aumentar 100"
                                            @click="addValue('ModalCreditAmount', 100)">
                                            <i class="fas fa-plus" aria-hidden="true"></i> 100</button>
                                        <button
                                            class="mb-1 mt-1 mr-2 mr-sm-2 mr-xl-2 btn btn-outline-cyan btn-sm px-3 waves-effect waves-light btn-action-sub btn-credit-mod btn-add1000"
                                            step="1000" id="ModalCreditAdd1000" title="Aumentar 1.000"
                                            @click="addValue('ModalCreditAmount', 1000)"><i class="fas fa-plus"
                                                aria-hidden="true"></i> 1.000</button>
                                        <button
                                            class="mb-1 mt-1 btn btn-outline-cyan btn-sm px-3 waves-effect waves-light btn-action-sub btn-credit-mod btn-add10000"
                                            step="10000" id="ModalCreditAdd10000" title="Aumentar 10.000"
                                            @click="addValue('ModalCreditAmount', 10000)"><i class="fas fa-plus"
                                                aria-hidden="true"></i> 10.000</button>
                                        <!-- CONDITION NumberFormat1 END -->
                                    </div>
                                </div>
                                <div class="row pt-3 px-2 px-xl-2 modal-credit-register-finance"
                                    v-if="credit_modal.role == 'ROLE_APOSTADOR' && credit_modal.action == 'Cargar Fichas'">
                                    <div class="col-10 text-left">
                                        <div class="row">
                                            <div class="col-12 form-check text-left">
                                                <input type="checkbox" class="form-check-input"
                                                    id="ModalCreditRegisterFinanceCollect"
                                                    @change="makeOneCheck('ModalCreditRegisterFinanceCollect', 'ModalCreditRegisterFinanceBonification')">
                                                <label class="form-check-label font-size-custom"
                                                    for="ModalCreditRegisterFinanceCollect">Registrar
                                                    Cobrado</label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 form-check text-left">
                                                <input type="checkbox" class="form-check-input"
                                                    id="ModalCreditRegisterFinanceBonification"
                                                    @change="makeOneCheck('ModalCreditRegisterFinanceBonification', 'ModalCreditRegisterFinanceCollect')">
                                                <label class="form-check-label font-size-custom"
                                                    for="ModalCreditRegisterFinanceBonification">Registrar
                                                    Bonificado</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2 px-0">
                                        <button title="" id="ModalCreditFinanceBalance"
                                            class="mb-1 mt-1 mr-1 btn btn-floating cyan waves-effect waves-light btn-action"
                                            data-toggle="popover-hover" data-content=""
                                            data-original-title="Saldo en finanzas">
                                            <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="row pt-3 px-2 px-xl-2 modal-credit-register-finance"
                                    v-if="credit_modal.role == 'ROLE_APOSTADOR' && credit_modal.action == 'Descargar Fichas'">
                                    <div class="col-10 text-left">
                                        <div class="row">
                                            <div class="col-12 form-check text-left">
                                                <input type="checkbox" class="form-check-input"
                                                    id="ModalCreditRegisterFinancePaid">
                                                <label class="form-check-label font-size-custom"
                                                    for="ModalCreditRegisterFinancePaid">Registrar
                                                    Pagado</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2 px-0">
                                        <button title="" id="ModalCreditFinanceBalance"
                                            class="mb-1 mt-1 mr-1 btn btn-floating cyan waves-effect waves-light btn-action"
                                            data-toggle="popover-hover" data-content=""
                                            data-original-title="Saldo en finanzas">
                                            <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center py-2">
                            <button type="button" class="btn btn-outline-cyan px-3 waves-effect waves-light"
                                data-dismiss="modal" @click="closeModal">Cancelar</button>
                            <button type="button" class="btn btn-cyan px-3 waves-effect waves-light"
                                id="ModalCreditSubmit" :disabled="credit_modal.value == '0'"
                                @click="cargar_descargar_Fichas">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalNewUser" tabindex="-1" role="dialog" aria-labelledby="NewUser"
                aria-hidden="true">
                <div class="modal-dialog cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-c-tabs">
                            <ul class="nav nav-tabs md-tabs tabs-2 btn-cyan darken-3 gradient-card-header blue-gradient"
                                role="tablist">
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link modal-clear-tab" data-toggle="tab" href="#NewUserTabPlayer"
                                        :class="new_user_data.type == 'jugador' ? 'active' : ''"
                                        id="NewUserTabPlayerPanel" role="tab" @click="new_user_data.type = 'jugador'"><i
                                            class="fas fa-user-plus mr-1"></i>
                                        Jugador</a>
                                </li>
                                <li v-if="skins.register_fields.root == state.id || skins.register_fields.root1 == state.id"
                                    class="nav-item waves-effect waves-light">
                                    <a class="nav-link" data-toggle="tab" href="#NewUserTabAffiliate"
                                        :class="new_user_data.type == 'agente' ? 'active' : ''"
                                        id="NewUserTabAffiliatePanel" role="tab"
                                        @click="new_user_data.type = 'agente'"><i class="fas fa-user-plus mr-1"></i>
                                        Agente</a>
                                </li>
                            </ul>
                            <div v-if="new_user_data.error != ''" class="text-center">
                                <span style="color:red">{{ new_user_data.error }}</span>
                            </div>
                            <div class="tab-content">
                                <!-- CREAR JUGADOR -->
                                <div class="tab-pane fade in"
                                    :class="new_user_data.type == 'jugador' ? 'show active' : ''" id="NewUserTabPlayer"
                                    role="tabpanel">
                                    <div style="display: flex;justify-content: center;margin-top: 20px;">
                                        <button @click="crearJugador"
                                            style="padding: 10px;border-radius: 6px;border: none;background: #FF3547;color: #fff;">Crear
                                            Jugador facil</button>
                                    </div>
                                    <div style="max-height:65vh;overflow-y:scroll;overflow-x:hidden"
                                        class="modal-body mx-1 px-1">
                                        <ul class="nav md-pills pills-danger">
                                            <li class="nav-item">
                                                <a class="nav-link modal-clear-tab active" data-toggle="tab"
                                                    id="NewUserTabPlayer1Link" href="#NewUserTabPlayer1"
                                                    role="tab">Ingreso</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="NewUserTabPlayer2Link"
                                                    href="#NewUserTabPlayer2" role="tab">Datos personales</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="NewUserTabPlayer3Link"
                                                    href="#NewUserTabPlayer3" role="tab">Permisos</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <!-- NOMBRE Y PASSWORD -->
                                            <div class="tab-pane fade in show active col-8 col-sm-6 mx-auto"
                                                id="NewUserTabPlayer1" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerUsername"
                                                        class="form-control new-player-input modal-clear-val"
                                                        autocomplete="off" maxlength="16"
                                                        v-model="new_user_data.username">
                                                    <label for="NewUserPlayerUsername">Nombre de Usuario</label>
                                                    <small id="NewUserPlayerUsernameFormat"
                                                        class="form-text modal-clear-hide text-muted">El nombre de
                                                        usuario
                                                        debe contener entre 4 y 16 caracteres.</small>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-eye prefix password-reveal grey-text"
                                                        id="iconPassNew1" data-user-type="Player"
                                                        @click="showHidePassword('NewUserPlayerPassword', 'iconPassNew1', 1)"></i>
                                                    <input type="password" id="NewUserPlayerPassword"
                                                        class="form-control new-player-input password-toggle modal-clear-val"
                                                        autocomplete="off" maxlength="16"
                                                        v-model="new_user_data.password">
                                                    <label for="NewUserPlayerPassword">Contraseña</label>
                                                    <small id="NewUserPlayerPasswordFormat"
                                                        class="form-text modal-clear-hide text-muted">La contraseña debe
                                                        contener entre 6 y 16 caracteres.</small>
                                                </div>
                                                <div class="font-size-custom modal-clear-hide" id="NewUserPlayerError">
                                                </div>
                                            </div>
                                            <!-- DATOS PERSONALES -->
                                            <div class="tab-pane fade in show col-10 mx-auto" id="NewUserTabPlayer2"
                                                role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerName"
                                                        class="form-control new-player-input modal-clear-val"
                                                        autocomplete="off" maxlength="32"
                                                        v-model="new_user_data.firstname">
                                                    <label for="NewUserPlayerName">Nombre completo</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-id-card prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerPassport"
                                                        class="form-control new-player-input modal-clear-val"
                                                        autocomplete="off" maxlength="32" v-model="new_user_data.dni">
                                                    <label for="NewUserPlayerPassport">Documento</label>
                                                </div>
                                                <div v-if="skins.register_fields.document" class="mb-3">
                                                    <label for="registerDocument">Sube el Documento de identidad</label>
                                                    <input type="file" id="registerDocument" class="form-control"
                                                        @change="handleFileUpload" accept=".pdf" required>
                                                    <small class="form-text text-muted">Sube tu documento en formato
                                                        PDF.</small>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-envelope prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerEmail"
                                                        class="form-control new-player-input modal-clear-val"
                                                        autocomplete="off" maxlength="32" v-model="new_user_data.email">
                                                    <label for="NewUserPlayerEmail">Email</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-mobile-alt prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerPhone"
                                                        class="form-control new-player-input modal-clear-val"
                                                        autocomplete="off" maxlength="16" v-model="new_user_data.phone">
                                                    <label for="NewUserPlayerPhone">Telefono</label>
                                                </div>
                                            </div>
                                            <!-- PERMISOS -->
                                            <div class="tab-pane fade in pt-3 show" id="NewUserTabPlayer3"
                                                role="tabpanel">
                                                <div class="tab-pane fade in pt-3 show active" id="NewUserTabPlayer3"
                                                    role="tabpanel">
                                                    <div class="clear-providers" id="NewUserPlayerProviders">
                                                        <div
                                                            class="col-10 offset-1 col-sm-6 offset-sm-0 d-inline-block">
                                                            <div
                                                                class="card mb-3 font-size-custom card-category card-category-1 border-warning">
                                                                <div
                                                                    class="card-body card-body-category card-body-category-1 text-warning">
                                                                    <div class="col-12 px-0">
                                                                        <div class="d-inline-block">
                                                                            <h6 class="card-title">Poker</h6>
                                                                        </div>
                                                                        <div class="d-inline-block float-right">
                                                                            <div class="form-check"> <input
                                                                                    type="checkbox"
                                                                                    class="form-check-input custom-form-check-input"
                                                                                    id="SelectAllNewPlayer1"
                                                                                    data-cat-id="1"
                                                                                    v-model="new_user_data.proveedores.poker.status">
                                                                                <label class="form-check-label"
                                                                                    for="SelectAllNewPlayer1">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card-text"
                                                                        id="NewUserPlayerProvidersCategory1Content">
                                                                        <div class="mb-3 font-size-custom">
                                                                            <div class="form-check"><input
                                                                                    type="checkbox"
                                                                                    v-model="new_user_data.proveedores.poker.status"
                                                                                    class="form-check-input poker-jugador"
                                                                                    id="NewUserPlayerProviderId120"
                                                                                    data-provider-id="120"><label
                                                                                    class="form-check-label"
                                                                                    for="NewUserPlayerProviderId120">Poker</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="card mb-3 font-size-custom card-category card-category-2 border-success">
                                                                <div
                                                                    class="card-body card-body-category card-body-category-2 text-success">
                                                                    <div class="col-12 px-0">
                                                                        <div class="d-inline-block">
                                                                            <h6 class="card-title">Deportes</h6>
                                                                        </div>
                                                                        <div class="d-inline-block float-right">
                                                                            <div class="form-check"> <input
                                                                                    type="checkbox"
                                                                                    class="form-check-input custom-form-check-input"
                                                                                    id="SelectAllNewPlayer2"
                                                                                    checked="true" data-cat-id="2"
                                                                                    v-model="new_user_data.proveedores.deportes.status">
                                                                                <label class="form-check-label"
                                                                                    for="SelectAllNewPlayer2">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card-text"
                                                                        id="NewUserPlayerProvidersCategory2Content">
                                                                        <div class="mb-3 font-size-custom">
                                                                            <div class="form-check"><input
                                                                                    type="checkbox"
                                                                                    class="form-check-input deportes-jugador"
                                                                                    id="NewUserPlayerProviderId210"
                                                                                    data-provider-id="210"
                                                                                    v-model="new_user_data.proveedores.deportes.status"><label
                                                                                    class="form-check-label"
                                                                                    for="NewUserPlayerProviderId210">Deportes</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-10 offset-1 col-sm-6 offset-sm-0 d-inline-block align-top">
                                                            <div
                                                                class="card mb-3 font-size-custom card-category card-category-3 border-primary">
                                                                <div
                                                                    class="card-body card-body-category card-body-category-3 text-primary">
                                                                    <div class="col-12 px-0">
                                                                        <div class="d-inline-block">
                                                                            <h6 class="card-title">Casino</h6>
                                                                        </div>
                                                                        <div class="d-inline-block float-right">
                                                                            <div class="form-check"> <input
                                                                                    type="checkbox"
                                                                                    class="form-check-input custom-form-check-input"
                                                                                    id="SelectAllNewPlayer3"
                                                                                    :checked="new_user_data.proveedores.casino.filter(brand => brand.status).length == new_user_data.proveedores.casino.length ? true : false"
                                                                                    data-cat-id="3"
                                                                                    @change="checkAll('casino-jugador', 'SelectAllNewPlayer3')">
                                                                                <label class="form-check-label"
                                                                                    for="SelectAllNewPlayer3">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card-text"
                                                                        id="NewUserPlayerProvidersCategory3Content">
                                                                        <div v-for="(brand, index) in new_user_data.proveedores.casino"
                                                                            :key="index" class="mb-3 font-size-custom">
                                                                            <div class="form-check"><input
                                                                                    type="checkbox"
                                                                                    class="form-check-input casino-jugador"
                                                                                    :id="'NewUserPlayerProviderId' + index"
                                                                                    data-provider-id="303"
                                                                                    v-model="new_user_data.proveedores.casino[index].status"><label
                                                                                    class="form-check-label"
                                                                                    :for="'NewUserPlayerProviderId' + index">{{
                                                                                        brand.id }}</label></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="new_user_data.error != ''"
                                        class="font-size-custom modal-clear-hide font-size-custom text-center pb-4">
                                        <span style="color:red">{{ new_user_data.error }}</span>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-center py-2">
                                        <button type="button" class="btn btn-outline-cyan px-4 waves-effect waves-light"
                                            data-dismiss="modal" @click="closeModal">Cancelar</button>
                                        <button type="button" class="btn btn-cyan px-4 waves-effect waves-light"
                                            @click="create_user" id="ModalNewUserPlayerSubmit"
                                            data-loading="<i class='fa fa-spinner fa-spin '></i> Creando...">Aceptar</button>
                                        <button data-bs-target="#infofastPlay1" data-bs-toggle="modal"
                                            data-bs-dismiss="modal" style="display:none;" id="infofastPlay"></button>
                                    </div>
                                </div>
                                <!-- CREAR AGENTE -->
                                <div class="tab-pane fade" :class="new_user_data.type == 'agente' ? 'show active' : ''"
                                    id="NewUserTabAffiliate" role="tabpanel">
                                    <div style="max-height:65vh;overflow-y:scroll;overflow-x:hidden"
                                        class="modal-body mx-1 px-1">
                                        <ul class="nav md-pills pills-danger pills-affiliate">
                                            <li class="nav-item">
                                                <a class="nav-link modal-clear-tab agenteItem active" data-toggle="tab"
                                                    id="NewUserTabAffiliate1Link" href="#NewUserTabAffiliate1"
                                                    role="tab">Ingreso</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link agenteItem" data-toggle="tab"
                                                    id="NewUserTabAffiliate2Link" href="#NewUserTabAffiliate2"
                                                    role="tab">Datos personales</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link agenteItem" data-toggle="tab"
                                                    id="NewUserTabAffiliate3Link" href="#NewUserTabAffiliate3"
                                                    role="tab">Permisos</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link agenteItem" data-toggle="tab"
                                                    id="NewUserTabAffiliate4Link" href="#NewUserTabAffiliate4"
                                                    role="tab">Comisiones</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <!-- NOMBRE Y PASSWOR -->
                                            <div class="tab-pane agenteTab fade in show active col-8 col-sm-6 mx-auto"
                                                id="NewUserTabAffiliate1" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliateUsername"
                                                        class="form-control new-affiliate-input modal-clear-val"
                                                        autocomplete="off" maxlength="16"
                                                        v-model="new_user_data.username">
                                                    <label for="NewUserAffiliateUsername">Nombre de Usuario</label>
                                                    <small id="NewUserAffiliateUsernameFormat"
                                                        class="form-text modal-clear-hide text-muted">El nombre de
                                                        usuario
                                                        debe contener entre 4 y 16 caracteres.</small>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-eye prefix password-reveal grey-text"
                                                        id="iconPassNew2" data-user-type="Affiliate"
                                                        @click="showHidePassword('NewUserAffiliatePassword', 'iconPassNew2', 2)"></i>
                                                    <input type="password" id="NewUserAffiliatePassword"
                                                        class="form-control new-affiliate-input password-toggle modal-clear-val"
                                                        autocomplete="off" maxlength="16"
                                                        v-model="new_user_data.password">
                                                    <label for="NewUserAffiliatePassword">Contraseña</label>
                                                    <small id="NewUserAffiliatePasswordFormat"
                                                        class="form-text modal-clear-hide text-muted">La contraseña debe
                                                        contener entre 6 y 16 caracteres.</small>
                                                </div>
                                            </div>
                                            <!-- DATOS PERSONALES -->
                                            <div class="tab-pane agenteTab fade in show col-10 mx-auto pb-4"
                                                id="NewUserTabAffiliate2" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliateName"
                                                        class="form-control new-affiliate-input modal-clear-val"
                                                        autocomplete="off" maxlength="32"
                                                        v-model="new_user_data.firstname">
                                                    <label for="NewUserAffiliateName">Nombre completo</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-id-card prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliatePassport"
                                                        class="form-control new-player-input modal-clear-val"
                                                        autocomplete="off" maxlength="32" v-model="new_user_data.dni">
                                                    <label for="NewUserAffiliatePassport">Documento</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-envelope prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliateEmail"
                                                        class="form-control new-affiliate-input modal-clear-val"
                                                        autocomplete="off" maxlength="32" v-model="new_user_data.email">
                                                    <label for="NewUserAffiliateEmail">Email</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-mobile-alt prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliatePhone"
                                                        class="form-control new-affiliate-input modal-clear-val"
                                                        autocomplete="off" maxlength="16" v-model="new_user_data.phone">
                                                    <label for="NewUserAffiliatePhone">Telefono</label>
                                                </div>
                                            </div>
                                            <!-- PERMISOS -->
                                            <div class="tab-pane agenteTab fade in show pt-2 pt-sm-4"
                                                id="NewUserTabAffiliate3" role="tabpanel">
                                                <div class="clear-providers" id="NewUserAffiliateProviders">
                                                    <div class="col-10 offset-1 col-sm-6 offset-sm-0 d-inline-block">
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-1 border-warning">
                                                            <div
                                                                class="card-body card-body-category card-body-category-1 text-warning">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Poker</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> <input type="checkbox"
                                                                                class="form-check-input custom-form-check-input"
                                                                                id="SelectAllNewAffiliate1"
                                                                                data-cat-id="1"
                                                                                v-model="new_user_data.proveedores.poker.status"><label
                                                                                class="form-check-label"
                                                                                for="SelectAllNewAffiliate1">Todos</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserAffiliateProvidersCategory1Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                v-model="new_user_data.proveedores.poker.status"
                                                                                class="form-check-input poker-agente"
                                                                                id="NewUserAffiliateProviderId120"
                                                                                data-provider-id="120"><label
                                                                                class="form-check-label"
                                                                                for="NewUserAffiliateProviderId120">Poker</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-2 border-success">
                                                            <div
                                                                class="card-body card-body-category card-body-category-2 text-success">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Deportes</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> <input type="checkbox"
                                                                                class="form-check-input custom-form-check-input"
                                                                                id="SelectAllNewAffiliate2"
                                                                                data-cat-id="2"
                                                                                v-model="new_user_data.proveedores.deportes.status">
                                                                            <label class="form-check-label"
                                                                                for="SelectAllNewAffiliate2">Todos</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserAffiliateProvidersCategory2Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                v-model="new_user_data.proveedores.deportes.status"
                                                                                class="form-check-input deportes-agente"
                                                                                id="NewUserAffiliateProviderId210"
                                                                                data-provider-id="210"><label
                                                                                class="form-check-label"
                                                                                for="NewUserAffiliateProviderId210">Deportes</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-10 offset-1 col-sm-6 offset-sm-0 d-inline-block align-top">
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-3 border-primary">
                                                            <div
                                                                class="card-body card-body-category card-body-category-3 text-primary">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Casino</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> <input type="checkbox"
                                                                                class="form-check-input custom-form-check-input"
                                                                                id="SelectAllNewAffiliate3"
                                                                                :checked="new_user_data.proveedores.casino.filter(brand => brand.status).length == new_user_data.proveedores.casino.length ? true : false"
                                                                                data-cat-id="3"
                                                                                @click="checkAll('casino-agente', 'SelectAllNewAffiliate3')">
                                                                            <label class="form-check-label"
                                                                                for="SelectAllNewAffiliate3">Todos</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserAffiliateProvidersCategory3Content">
                                                                    <div class="mb-3 font-size-custom"
                                                                        v-for="(brand, index) in new_user_data.proveedores.casino"
                                                                        :key="index">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                v-model="new_user_data.proveedores.casino[index].status"
                                                                                class="form-check-input casino-agente"
                                                                                :id="'NewUserAffiliateProviderId' + index"
                                                                                data-provider-id="303"
                                                                                checked="true"><label
                                                                                class="form-check-label"
                                                                                :for="'NewUserAffiliateProviderId' + index">{{
                                                                                    brand.id }}</label></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- COMISIONES -->
                                            <div class="tab-pane agenteTab fade in show pt-2" id="NewUserTabAffiliate4"
                                                role="tabpanel">
                                                <div class="row pb-1">
                                                    <div class="col-6 offset-3 col-md-4 offset-md-4">
                                                        <section class="section-preview">
                                                            <div class="" style="font-size: small;min-width: 200px;">
                                                                Liquidar automaticamente</div>
                                                            <div class="select-wrapper mdb-select col-12">
                                                                <span class="caret">▼</span>
                                                                <input type="text" class="select-dropdown w-100 active"
                                                                    @click="showTargetOptions" readonly="true" value=""
                                                                    v-model="new_user_data.liquidacion">
                                                                <ul id="selectTargets"
                                                                    class="dropdown-content select-dropdown w-100 text-center active"
                                                                    style="width: 82.125px; position: absolute; top: -73.391px; left: 15px; opacity: 1; 
                                                                    display: none;">
                                                                    <li @click="setLiquidacion('Mensual')">
                                                                        <span
                                                                            :style="new_user_data.liquidacion == 'Mensual' ? 'background-color:#4285f4;color:white !important;' : ''">Mensual</span>
                                                                    </li>
                                                                    <li @click="setLiquidacion('Semanal')">
                                                                        <span
                                                                            :style="new_user_data.liquidacion == 'Semanal' ? 'background-color:#4285f4;color:white !important;' : ''">Semanal</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                                <div class="clear-providers" id="NewUserAffiliateCommissions">
                                                    <div class="col-10 offset-1 col-sm-6 offset-sm-0 d-inline-block">
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-1 border-warning">
                                                            <div
                                                                class="card-body card-body-category card-body-category-1 text-warning">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Poker</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check">
                                                                            <div
                                                                                class="md-form input-group font-size-custom">
                                                                                <input
                                                                                    v-model="new_user_data.proveedores.pokerTotal"
                                                                                    @input="setPokerComision('create')"
                                                                                    type="text"
                                                                                    class="form-control modal-clear-val text-right percent-format select-all-commissions"
                                                                                    cat-id="1"
                                                                                    id="SelectAllCommissions1"
                                                                                    autocomplete="off" value="">
                                                                                <label for="SelectAllCommissions1"
                                                                                    aria-describedby="material-addonall">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserAffiliateCommissionsCategory1Content">
                                                                    <div
                                                                        class="col-10 offset-1 md-form input-group mb-5 font-size-custom">
                                                                        <input readonly type="text"
                                                                            class="form-control new-affiliate-input modal-clear-val percent-format text-right"
                                                                            id="NewUserAffiliateCommissionId120"
                                                                            autocomplete="off"
                                                                            v-model="new_user_data.proveedores.poker.comision">
                                                                        <label for="NewUserAffiliateCommissionId120"
                                                                            aria-describedby="material-addon120">Poker</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-2 border-success">
                                                            <div
                                                                class="card-body card-body-category card-body-category-2 text-success">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Deportes</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check">
                                                                            <div
                                                                                class="md-form input-group font-size-custom">
                                                                                <input
                                                                                    v-model="new_user_data.proveedores.deportesTotal"
                                                                                    @input="setDeportesComision('create')"
                                                                                    type="text"
                                                                                    class="form-control modal-clear-val text-right percent-format select-all-commissions"
                                                                                    cat-id="2"
                                                                                    id="SelectAllCommissions2"
                                                                                    autocomplete="off" value="">
                                                                                <label for="SelectAllCommissions2"
                                                                                    aria-describedby="material-addonall">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserAffiliateCommissionsCategory2Content">
                                                                    <div
                                                                        class="col-10 offset-1 md-form input-group mb-5 font-size-custom">
                                                                        <input readonly type="text"
                                                                            class="form-control new-affiliate-input modal-clear-val percent-format text-right"
                                                                            id="NewUserAffiliateCommissionId210"
                                                                            autocomplete="off"
                                                                            v-model="new_user_data.proveedores.deportes.comision">
                                                                        <label for="NewUserAffiliateCommissionId210"
                                                                            aria-describedby="material-addon210">Deportes</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-10 offset-1 col-sm-6 offset-sm-0 d-inline-block align-top">
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-3 border-primary">
                                                            <div
                                                                class="card-body card-body-category card-body-category-3 text-primary">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Casino</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check">
                                                                            <div
                                                                                class="md-form input-group font-size-custom">
                                                                                <input
                                                                                    v-model="new_user_data.proveedores.casinoTotal"
                                                                                    @input="setCasinoComision('create')"
                                                                                    type="text"
                                                                                    class="form-control modal-clear-val text-right percent-format select-all-commissions"
                                                                                    cat-id="3"
                                                                                    id="SelectAllCommissions3"
                                                                                    autocomplete="off" value="">
                                                                                <label for="SelectAllCommissions3"
                                                                                    aria-describedby="material-addonall">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserAffiliateCommissionsCategory3Content">
                                                                    <div class="col-10 offset-1 md-form input-group mb-5 font-size-custom"
                                                                        v-for="(brand, index) in new_user_data.proveedores.casino"
                                                                        :key="index">
                                                                        <input readonly
                                                                            v-model="new_user_data.proveedores.casino[index].comision"
                                                                            type="text"
                                                                            class="form-control new-affiliate-input modal-clear-val percent-format text-right"
                                                                            :id="'NewUserAffiliateCommissionId' + index"
                                                                            autocomplete="off">
                                                                        <label
                                                                            :for="'NewUserAffiliateCommissionId' + index"
                                                                            aria-describedby="material-addon303">{{
                                                                                brand.id }}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-center py-2">
                                        <button type="button" class="btn btn-outline-cyan px-4 waves-effect waves-light"
                                            data-dismiss="modal" @click="closeModal">Cancelar</button>
                                        <button type="button" class="btn btn-cyan px-4 waves-effect waves-light"
                                            @click="create_user" id="ModalNewUserAffiliateSubmit"
                                            data-loading="<i class='fa fa-spinner fa-spin '></i> Creando...">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="infofastPlay1" aria-hidden="true" aria-labelledby="infofastPlaylabel1"
                tabindex="-1" data-bs-backdrop="false" style="background-color:rgba(0, 0, 0, 0.5);">
                <div class="modal-dialog cascading-modal modal-sm">
                    <div class="modal-content" style="background: #ffffff;">
                        <div class="d-flex justify-content-end align-items-start">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                style="background: none;color:black;">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center p-2">
                                <span style="font-size:64px;color:green;"><i class="fas fa-check-circle"></i></span><br>
                                <span>Tu usuario es: {{ this.infoFastPlay.username }}</span><br>
                                <span>Tu contraseña es: {{ this.infoFastPlay.password }}</span><br>
                                <span>Login Url: {{ this.infoFastPlay.loginUrl }}</span>
                                <div class="share-link-container">
                                    <button class="btn btn-primary btn-sm" @click="copyToClipboard">
                                        <i class="fas fa-copy"></i> Copiar Enlace
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalPreventDeleteConfirm" tabindex="-1" role="dialog"
                aria-labelledby="PreventDeleteConfirm" aria-modal="true">
                <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Conservar usuario</h6>
                        </div>
                        <div class="modal-body">
                            <div class="md-form font-size-custom pt-1">
                                ¿Desea evitar que el usuario sea eliminado?
                                <input type="hidden" id="PreventDeleteConfirmId" class="modal-clear-val">
                                <input type="hidden" id="PreventDeleteConfirmRole" class="modal-clear-val">
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-sm btn-outline-cyan waves-effect"
                                data-dismiss="modal">No</button>
                            <button type="button" class="btn btn-sm btn-cyan waves-effect waves-light"
                                id="ModalPreventDeleteConfirmSubmit">Si</button>
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
export default {
    name: 'statsComponent',
    props: ["view_type"],
    data() {
        return {
            infoFastPlay: [],
            target_user_id: "",
            search: "",
            new_user_data: {
                document: null,
                type: "",
                username: "",
                email: "",
                firstname: "",
                dni: "",
                password: "",
                phone: "",
                login_Id: 0,
                poker: 0,
                casino: 0,
                deportes: 0,
                proveedores: {
                    poker: { status: true, comision: "0%" }, casino: [], deportes: { status: true, comision: "0%" }, bingo: { status: true, comision: "0%" },
                    casinoTotal: "", pokerTotal: "", deportesTotal: "", bingoTotal: ""
                },
                error: "",
                liquidacion: "Mensual"
            },
            credit_modal: {
                action: "",
                value: "0,00",
                username: "",
                balance: 0,
                role: "",
                id: 0,
                loading: false
            },
            render: 0
        }
    },
    components: {
    },
    computed: {
        state() {
            return this.$store.state.user;
        },
        skins() {
            return this.$store.state.skins;
        },
        apiUrl() {
            return this.$store.getters['getApiUrl'];
        },
        site() {
            return this.$store.getters['getSite'];
        },
        all_casino_brands() {
            return this.$store.getters["getAllCasinoBrands"];
        },
        casino_brands() {
            return this.$store.getters["getCasinoBrands"];
        },
        userInfo() {
            return this.$store.getters["getUserData"];
        },
        apiUrlnew() {
            return this.$store.getters['getApiUrlnew'];
        },
        chartDataNetwinTotal() {
            return this.$store.getters["getChartDataNetwinTotal"];
        },
        chartDataNetwinMonth() {
            return this.$store.getters["getChartDataNetwinMonth"];
        },
        chartDataNetwinDay() {
            return this.$store.getters["getChartDataNetwinDay"];
        },
        chartDataTopAgentes() {
            return this.$store.getters["getChartTopAgentes"];
        },
        main_tree() {
            return this.$store.getters["getMainTree"];
        },
        users_capital() {
            let MainData = this.$store.getters["getUsersCapital"];
            let data = MainData.sort(function (a, b) {
                if (a.role == "ROLE_PROMOTOR") {
                    return -1
                }
                if (b.role == "ROLE_APOSTADOR") {
                    return 1
                }
                return 0
            })
            if (this.search != "") {
                return data.filter(user => user.username.toLowerCase() == this.search.toLowerCase());
            }
            return data.filter(user => user.show == true).sort();
        },
    },
    methods: {
        copyToClipboard() {
            const nuevaUrl = this.infoFastPlay.loginUrl;

            if (!nuevaUrl) {
                alert("No hay URL para copiar.");
                return;
            }

            navigator.clipboard.writeText(nuevaUrl)
                .then(() => {
                    console.log("Enlace copiado:", nuevaUrl);
                    alert("¡Enlace copiado al portapapeles!");
                })
                .catch(err => {
                    console.error("Error al copiar:", err);
                    alert("No se pudo copiar el enlace.");
                });
        },
        crearJugador() {
            const data = {
                loginId: this.target_user_id,
            };

            const headers = {
                token: "qCpxTbvkZBePznR",
            };

            axios.post(this.apiUrlnew + 'crear_jugador_simple', data, { headers })
                .then(response => {
                    console.log('Jugador creado:', response.data);
                    if (response.data.status == "success") {
                        this.closeModal();
                        this.infoFastPlay = response.data;
                        document.getElementById('infofastPlay').click();
                    }
                })
                .catch(error => {
                    this.new_user_data.error = "Hubo un error al realizar la solicitud.";
                    console.error('Error al crear jugador:', error);
                });
        },
        handleFileUpload(event) {
            this.new_user_data.document = event.target.files[0]; // Captura el archivo seleccionado
        },
        setLiquidacion(type) {
            this.new_user_data.liquidacion = type;
            document.getElementById("selectTargets").style.display = "none";
        },
        showTargetOptions() {
            document.getElementById("selectTargets").style.display = "block";
        },
        loadCharts() {
            const ctx = document.getElementById('netwinChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.chartDataNetwinMonth.casino.map(item => item.month),
                    datasets: [{
                        label: '',
                        data: this.chartDataNetwinMonth.casino.map(item => item.netwin),
                        fill: true,
                        borderColor: 'rgba(93, 173, 226, 1)',
                        backgroundColor: "rgba(93, 173, 226, 0.3)",
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        label: '',
                        data: this.chartDataNetwinMonth.deportes.map(item => item.netwin),
                        fill: true,
                        borderColor: 'rgba(175, 122, 197, 1)',
                        borderWidth: 1,
                        backgroundColor: "rgba(232, 218, 239, 0.3)",
                        tension: 0.4
                    }]
                }
            }
            );
            const ctx2 = document.getElementById('netwin2Chart');
            new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: this.chartDataNetwinDay.casino.map(item => item.day),
                    datasets: [{
                        label: '',
                        data: this.chartDataNetwinDay.casino.map(item => item.netwin),
                        fill: true,
                        borderColor: 'rgba(93, 173, 226, 1)',
                        borderWidth: 1,
                        backgroundColor: "rgba(93, 173, 226, 0.3)",
                        tension: 0.4
                    },
                    {
                        label: '',
                        data: this.chartDataNetwinDay.deportes.map(item => item.netwin),
                        fill: true,
                        borderColor: 'rgba(175, 122, 197, 1)',
                        borderWidth: 1,
                        backgroundColor: "rgba(232, 218, 239, 0.3)",
                        tension: 0.4
                    }]
                }
            }
            );
            const ctx3 = document.getElementById('agentesChart');
            new Chart(ctx3, {
                type: 'pie',
                data: {
                    labels: this.chartDataTopAgentes.map(item => item.username),
                    datasets: [{
                        label: 'My First Dataset',
                        data: this.chartDataTopAgentes.map(item => item.valor),
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(82, 190, 128 )',
                            'rgb(175, 122, 197)',
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            );
        },
        parseNumbers(number, target) {
            if (Number.isNaN(number)) {
                return 0;
            }
            if (target) {
                const actualBalance = parseFloat(this.credit_modal.balance.replaceAll('.', '').replace(',', '.'));
                let element = document.getElementById(target);
                let selection1 = element.selectionStart
                let digits = element.value.includes(".") ? (element.value.split(".")[1].length < 1 ? 0 : element.value.split(".")[1].length) : 0;
                number = element.value == "" ? 0 : this.textToFloat(element.value);
                if (number > actualBalance && this.credit_modal.action === 'Descargar Fichas') { number = actualBalance }
                element.value = digits > 0 ? this.floatToText(number, digits) : (element.value.includes(".") ? this.floatToText(number, digits) + "." : this.floatToText(number, digits));
                element.setSelectionRange(element.value.includes(" ") ? selection1 + 1 : selection1, element.value.includes(" ") ? selection1 + 1 : selection1);
                this.credit_modal.value = number;
                return
            }
            return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
        },
        floatToText(number, digits) {
            let text1 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(number);
            let parsed = text1.replaceAll(".", " ").replace(",", ".");
            return parsed
        },
        textToFloat(text) {
            let dot_qty = 0;
            let parsed = "";
            for (let index = 0; index < text.length; index++) {
                const char = text[index];
                if (char == " ") {
                    dot_qty++;
                }
            }
            if (dot_qty >= 1) {
                parsed = text.replaceAll(" ", "").replace(",", ".");
            }
            else {
                parsed = text.replace(",", ".");
            }
            return parseFloat(parsed);
        },
        addValue(target, val) {
            const actualBalance = parseFloat(this.credit_modal.balance.replaceAll('.', '').replace(',', '.'));
            let element = document.getElementById(target);
            let floatNumber = this.textToFloat(element.value);
            let newVal = floatNumber + val > actualBalance && this.credit_modal.action === 'Descargar Fichas' ? actualBalance : floatNumber + val;
            element.value = this.floatToText(newVal);
            this.parseNumbers('', target);
        },
        removeValue(target, val) {
            let element = document.getElementById(target);
            let floatNumber = this.textToFloat(element.value);
            let newVal = floatNumber - val < 0 ? 0 : floatNumber - val;
            element.value = this.floatToText(newVal);
            this.parseNumbers('', target);
        },
        openModal(target, id, type) {
            try {
                this.new_user_data.type = type;
                this.backdrop(true);
                this.target_user_id = id;
                let modal = document.getElementById(target);
                modal.classList.add("show");
                modal.style.display = "block";
                if (target == "ModalNewUser") {
                    let brandsCopy = JSON.parse(JSON.stringify(this.casino_brands));
                    this.new_user_data.proveedores.casino = brandsCopy.map(brand => {
                        return {
                            id: brand.id,
                            name: brand.name,
                            comision: "0%",
                            status: brand.status
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        openModalCredit(target, title) {
            try {
                if (this.search != "" && this.users_capital[0]) {
                    this.backdrop(true);
                    let modal = document.getElementById(target);
                    modal.classList.add("show");
                    modal.style.display = "block";
                    if (title) {
                        let data = this.users_capital[0];
                        this.credit_modal.action = title;
                        this.credit_modal.username = data.username;
                        this.credit_modal.balance = this.parseNumbers(data.capital_total);
                        this.credit_modal.role = data.role;
                        this.credit_modal.id = data.user;
                    }
                }

            } catch (error) {
                console.log(error);
            }
        },
        async cargar_descargar_Fichas() {
            let response = null;
            try {
                this.credit_modal.loading = true;
                if (this.credit_modal.action != "") {
                    document.getElementById("ModalCreditSubmit").disabled = true;
                    let reason = "";

                    if (this.credit_modal.action == "Cargar Fichas") {
                        reason = document.getElementById("ModalCreditRegisterFinanceCollect")?.checked
                            ? "Cobrado"
                            : document.getElementById("ModalCreditRegisterFinanceBonification")?.checked
                                ? "Bonificacion"
                                : "";

                        // Intentar la petición con la URL original
                        response = await axios.post(this.apiUrlnew + "addcapitaljugador", {
                            "capital": this.credit_modal.value,
                            "user": this.credit_modal.id, // al que se le ejecuta la acción
                            "login_Id": this.main_tree.id, // el que esta logueado
                            "motivo": reason,
                            "token": this.userInfo.token,
                            "site": this.site
                        });

                    } else {
                        reason = document.getElementById("ModalCreditRegisterFinancePaid")?.checked ? "Pagado" : "";

                        // Intentar la petición con la URL original
                        response = await axios.post(this.apiUrlnew + "retirarcapitaljugador", {
                            "capital": this.credit_modal.value,
                            "user": this.credit_modal.id, // al que se le ejecuta la acción
                            "login_Id": this.main_tree.id, // el que esta logueado
                            "motivo": reason,
                            "token": this.userInfo.token,
                            "site": this.site
                        });
                    }
                    if (response.data.error) {
                        this.showAlert("alert-danger", "Error ", (response?.data?.error == "You do not have sufficient balance for this transaction") ? ": No dispone de saldo para la transacción, te invitamos a recargar" : "Error en el proceso");
                        this.closeModal();
                    }
                    if (response.data.status !== "success") {
                        throw new Error("Error en la respuesta de la URL");
                    }

                    // Procesar la respuesta exitosa
                    if (this.credit_modal.action == "Cargar Fichas") {
                        this.$store.dispatch("getChildrenCapital2", this.$store.getters["getTargetUser"]);
                        this.showAlert("alert-success", "Proceso correcto", "Carga de fichas exitosa");
                    } else {
                        this.$store.dispatch("getChildrenCapital", this.$store.getters["getTargetUser"]);
                        this.showAlert("alert-success", "Proceso correcto", "Descarga de fichas exitosa");
                    }

                    // Refrescar saldo
                    let userdata = {
                        token: this.userInfo.token,
                        site_id: this.userInfo.site_id,
                        prefix: this.userInfo.prefix,
                        site: this.userInfo.site,
                        origin: "dashboard"
                    };
                    this.$store.dispatch("getUserData", userdata);
                    this.closeModal();

                }
            } catch (error) {
                this.showAlert("alert-danger", "Error", error.response?.data?.error ?? "Error en el proceso");
                this.closeModal();
            } finally {
                this.credit_modal.loading = false;
                document.getElementById("ModalCreditSubmit").disabled = false;
            }
        },
        showAlert(type, title, message) {
            let alert = '<div id="mainAlert" class="alert ' + type + ' alert-dismissible fade show" role="alert">' +
                '<strong id="alertTitle">' + title + '</strong> <span id="alertMessage">' + message + '</span>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>';
            document.getElementById("mainAlert").innerHTML = alert;
        },
        closeModal() {
            let modals = document.getElementsByClassName("modal");
            [...modals].forEach(modal => {
                modal.classList.remove("show");
                modal.style.display = "none";
            })
            document.getElementById("modalBackdrop").style.display = "none";
            document.getElementById("modalBackdrop").classList.remove("show");
            this.new_user_data = {
                type: "",
                username: "",
                email: "",
                firstname: "",
                dni: "",
                password: "",
                phone: "",
                login_Id: 0,
                poker: 0,
                casino: 0,
                deportes: 0,
                proveedores: {
                    poker: { status: true, comision: "0%" }, casino: [], deportes: { status: true, comision: "0%" }, bingo: { status: true, comision: "0%" },
                    casinoTotal: "", pokerTotal: "", deportesTotal: "", bingoTotal: ""
                },
                error: "",
                liquidacion: "Mensual"
            }
            this.credit_modal = {
                action: "",
                value: "0,00",
                username: "",
                balance: 0,
                role: "",
                id: 0,
                loading: false
            }
            const modalCreditInput = document.getElementById('ModalCreditAmount')
            if (modalCreditInput) { modalCreditInput.value = '0.00' }
            this.search = ""
            document.getElementById('NewUserTabAffiliate1Link').click()
            document.getElementById('NewUserTabPlayer1Link').click()
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
        async create_user() {
            let createBtn = this.new_user_data.type == "agente" ? document.getElementById("ModalNewUserAffiliateSubmit") : document.getElementById("ModalNewUserPlayerSubmit");
            createBtn.innerHTML = createBtn.dataset.loading;
            createBtn.disabled = true;
            try {
                let loginInfo = this.new_user_data.username != "" && this.new_user_data.password != "" ? true : false;

                // let comisions = this.new_user_data.proveedores.pokerTotal == "" && this.new_user_data.proveedores.casinoTotal == "" && this.new_user_data.proveedores.deportesTotal == "" ? false : true;

                if (!loginInfo) {
                    this.new_user_data.error = "Debes completar los datos de Ingreso";
                    createBtn.innerHTML = "Aceptar";
                    createBtn.disabled = false;
                }

                else {
                    let data = {};
                    let allCasinoBrandsCopy = JSON.parse(JSON.stringify(this.all_casino_brands));
                    let parsedCasino = this.new_user_data.proveedores.casino.map(brand => {
                        return {
                            id: brand.id,
                            name: brand.name,
                            comision: parseFloat(brand.comision.split("%")[0]) / 100,
                            status: brand.status
                        };
                    });

                    let casinoBrandsConfig = allCasinoBrandsCopy.map(brand => {
                        return {
                            id: brand.id,
                            name: brand.name,
                            comision: parsedCasino.find(item => item.id == brand.id && item.name == brand.name)?.comision ?? parsedCasino[0]?.comision ?? 0,
                            status: parsedCasino.find(item => item.id == brand.id && item.name == brand.name)?.status ?? false
                        };
                    });

                    data.username = this.new_user_data.username;
                    data.email = this.new_user_data.email;
                    data.firstname = this.new_user_data.firstname + "-" + this.new_user_data.dni;
                    data.password = this.new_user_data.password;
                    data.phone = this.new_user_data.phone;
                    data.login_Id = this.main_tree.id;
                    data.token = this.userInfo.token;
                    data.site = this.site;

                    if (this.new_user_data.type == "agente") {
                        data.poker = parseFloat(this.new_user_data.proveedores.poker?.comision.split("%")[0] ?? 0) / 100;
                        data.casino = parseFloat(this.new_user_data.proveedores.casino[0]?.comision.split("%")[0] ?? 0) / 100;
                        data.deportes = parseFloat(this.new_user_data.proveedores.deportes?.comision.split("%")[0] ?? 0) / 100;
                        data.tipo_cierre = this.new_user_data.liquidacion;
                        data.proveedores = {
                            "poker": {
                                "comision": parseFloat(this.new_user_data.proveedores.poker.comision.split("%")[0]) / 100,
                                "status": this.new_user_data.proveedores.poker.status
                            },
                            "deportes": {
                                "comision": parseFloat(this.new_user_data.proveedores.deportes.comision.split("%")[0]) / 100,
                                "status": this.new_user_data.proveedores.deportes.status
                            },
                            "casino": casinoBrandsConfig
                        }
                    } else {
                        data.proveedores = {
                            "poker": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.poker.status
                            },
                            "deportes": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.deportes.status
                            },
                            "casino": parsedCasino
                        }
                    }

                    let endpoint = this.new_user_data.type == "agente" ? "crear_agente" : "crear_jugador";
                    let response;
                    response = await axios.post(this.apiUrlnew + endpoint, data);


                    if (response.data.error) {
                        this.new_user_data.error = response.data.error;
                        createBtn.innerHTML = "Aceptar";
                        createBtn.disabled = false;
                    }
                    else if (this.new_user_data.type == "jugador" && this.skins.register_fields.document) {
                        const userId = response.data.userId;
                        await this.uploadDocument(userId);
                        this.$store.dispatch("getChildrenCapital2", this.$store.getters["getTargetUser"]);
                        this.showAlert("alert-success", "Proceso correcto", "Usuario creado con éxito");
                        createBtn.innerHTML = "Aceptar";
                        createBtn.disabled = false;
                        this.closeModal();
                    }
                    else {
                        this.$store.dispatch("getChildrenCapital2", this.$store.getters["getTargetUser"]);
                        this.showAlert("alert-success", "Proceso correcto", "Usuario creado con éxito");
                        createBtn.innerHTML = "Aceptar";
                        createBtn.disabled = false;
                        this.closeModal();
                    }
                }
            } catch (error) {
                console.log(error);
                this.new_user_data.error = error.response?.data?.error ?? "Error en el proceso";
                createBtn.innerHTML = "Aceptar";
                createBtn.disabled = false;
            }
        },
        async uploadDocument(userId) {
            try {
                let formData = new FormData();
                formData.append('document', this.new_user_data.document);
                formData.append('userId', userId); // Agrega el ID al FormData si es necesario
                formData.append('site', this.site);

                let response = await axios.post(this.apiUrlnew + "document", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Asegúrate de enviar el tipo de contenido correcto
                    }
                });

                if (response.data.error) {
                    this.new_user_data.error = response.data.error;
                }
            } catch (error) {
                console.error('Error uploading document:', error);
                // Manejo de errores adicional
            }
        },
        setCasinoComision(target) {
            if (target == "edit") {
                let number = parseFloat(this.edit_user_data.proveedores.casinoTotal || 0);
                if (number > 100) number = 100;
                this.edit_user_data.proveedores.casino.forEach(brand => {
                    brand.comision = number + "%"
                })
            }
            else {
                let number = parseFloat(this.new_user_data.proveedores.casinoTotal || 0);
                if (number > 100) number = 100;
                this.new_user_data.proveedores.casino.forEach(brand => {
                    brand.comision = number + "%"
                })
            }
        },
        setPokerComision(target) {
            if (target == "edit") {
                let number = parseFloat(this.edit_user_data.proveedores.pokerTotal || 0);
                if (number > 100) number = 100;
                this.edit_user_data.proveedores.poker.comision = number + "%"
            }
            else {
                let number = parseFloat(this.new_user_data.proveedores.pokerTotal || 0);
                if (number > 100) number = 100;
                this.new_user_data.proveedores.poker.comision = number + "%"
            }
        },
        setDeportesComision(target) {
            if (target == "edit") {
                let number = parseFloat(this.edit_user_data.proveedores.deportesTotal || 0);
                if (number > 100) number = 100;
                this.edit_user_data.proveedores.deportes.comision = number + "%"
            }
            else {
                let number = parseFloat(this.new_user_data.proveedores.deportesTotal || 0);
                if (number > 100) number = 100;
                this.new_user_data.proveedores.deportes.comision = number + "%"
            }
        },
        checkAll(targetClass, mainTarget) {
            let type = targetClass.split("-")[0];
            let main = document.getElementById(mainTarget);
            if (type == "poker") {
                this.new_user_data.proveedores.poker.status = !this.new_user_data.proveedores.poker.status;
            }
            else if (type == "deportes") {
                this.new_user_data.proveedores.deportes.status = !this.new_user_data.proveedores.deportes.status;
            }
            else if (type == "casino") {
                this.new_user_data.proveedores.casino.forEach(brand => {
                    brand.status = main.checked
                })
            }
            // let targets = document.getElementsByClassName(targetClass);
            // [...targets].forEach(target => {
            //     target.checked = main.checked;
            // })
        },
    },
    async mounted() {
        this.loadCharts()
    }
}
</script>
<style scoped></style>