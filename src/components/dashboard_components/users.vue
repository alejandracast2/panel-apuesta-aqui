<template>
    <div>
        <main :class="view_type" id="usersMain">
            <div class="container-fluid mb-2 px-1 px-md-3">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row my-1 my-sm-1 mt-lg-2 mb-lg-3">
                            <!-- CONDITION OperationAddUser BEGIN -->
                            <div class="col-6 col-xl-3 pl-1 my-1 mt-lg-2 pr-0 text-center order-2 order-xl-1"
                                :style="targetUser.id == main_tree.id ? 'display:block;' : 'display:none;'">
                                <button class="btn btn-sm btn-danger waves-effect waves-light"
                                    @click="openModal('ModalNewUser', main_tree.id)"><i class="fas fa-user-plus"></i>
                                    Nuevo
                                    Usuario</button>
                            </div>
                            <div class="col-6 d-xl-none pr-1 my-1 mt-lg-2 pl-0 text-center order-3 order-xl-2">
                                <button class="btn btn-sm btn-danger waves-effect waves-light"
                                    @click="openModal('affiliates_tree_modal')"
                                    id="ShowAffiliatesModal">Estructura</button>
                            </div>
                        </div>
                        <div id="mainAlert"></div>
                        <div class="row">
                            <div class="col-12 col-xl-9">
                                <div class="card">
                                    <div class="card-body p-1 p-lg-3">
                                        <div class="row mb-1 text-center">
                                            <div
                                                class="col-6 offset-1 col-sm-4 offset-sm-3 col-md-3 offset-md-0 col-lg-3 pl-md-4">
                                                <div class="md-form font-size-custom2 mt-2 mb-md-1 my-lg-2">
                                                    <input type="text" id="UserSearch"
                                                        class="form-control search-username" maxlength="16">
                                                    <label for="UserSearch">Nombre de usuario</label>
                                                </div>
                                            </div>
                                            <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-1 mb-md-0">
                                                <div class="md-form my-2 mt-md-1">
                                                    <button @click="searchText()"
                                                        class="btn btn-sm btn-cyan waves-effect waves-light"
                                                        id="UserSearchButton">Buscar</button>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-12 col-md-7 col-lg-7 my-1 mt-md-3 mb-md-1">
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <button @click="changeFilter('todos')"
                                                        class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select active">
                                                        <input type="radio" name="section_select" id="all"
                                                            checked="">Todos
                                                    </button>
                                                    <button @click="changeFilter('agentes')"
                                                        class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select">
                                                        <input type="radio" name="section_select"
                                                            id="affiliates">Agentes
                                                    </button>
                                                    <button @click="changeFilter('jugadores')"
                                                        class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select">
                                                        <input type="radio" name="section_select" id="players">Jugadores
                                                    </button>
                                                    <button @click="changeFilter('ocultos')"
                                                        class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select">
                                                        <input type="radio" name="section_select" id="hidden">Ocultos
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="users_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div class="top"></div>
                                            <div id="users_processing" class="dataTables_processing card"
                                                style="display: none;">Procesando...
                                            </div>
                                            <table id="users"
                                                class="table table-striped table-hover table-borderless table-sm w-100 dataTable no-footer"
                                                cellspacing="0" role="grid" style="width: 1193px;">
                                                <thead>
                                                    <tr role="row">
                                                        <th class="sorting_disabled text-center users-rows users-row-username"
                                                            rowspan="1" colspan="1" style="width: 220.4px;">Usuario</th>
                                                        <th class="sorting_disabled text-center users-rows users-row-balance"
                                                            rowspan="1" colspan="1" style="width: 190.4px;">Fichas</th>
                                                        <th class="sorting_disabled text-center users-rows users-row-actions"
                                                            rowspan="1" colspan="1" style="width: 237.4px;">Acciones
                                                        </th>
                                                        <th class="sorting_disabled text-center d-none d-sm-block users-rows users-row-actions2"
                                                            rowspan="1" colspan="1" style="width: 506.4px;"></th>
                                                        <th class="sorting_disabled text-center users-rows users-row-user-id d-none"
                                                            rowspan="1" colspan="1" style="width: 0px;"></th>
                                                        <th class="sorting_disabled text-center d-none" rowspan="1"
                                                            colspan="1" style="width: 0px;"></th>
                                                        <th class="sorting_disabled text-center users-rows users-row-user-role d-none"
                                                            rowspan="1" colspan="1" style="width: 0px;"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(user, index) in paginarArray(users_capital, registers_per_page)[actual_page - 1]"
                                                        :key="index" role="row" class="even">
                                                        <td class="users-rows users-row-username text-left text-primary"
                                                            :style="user.role == 'ROLE_APOSTADOR' ? 'color:red !important;' : ''">
                                                            {{ user.username }}</td>
                                                        <td class="users-rows users-row-balance text-right">{{
                                                            parseNumbers(user.capital_total) }}</td>
                                                        <td class="users-rows users-row-actions text-right"><a
                                                                :style="user.user in blocked_users || user.enabled != 1 ? 'visibility: hidden;' : 'visibility: visible;'"
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-add-credit mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan btn-credit"
                                                                alt="Cargar Fichas" title="Cargar Fichas"
                                                                @click="openModal('ModalCredit', user.user, 'Cargar Fichas')"><i
                                                                    class="fas fa-plus" aria-hidden="true"></i></a><a
                                                                :style="user.user in blocked_users || user.enabled != 1 ? 'visibility: hidden;' : 'visibility: visible;'"
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-deduct-credit mb-1 mt-1 mx-0 mx-sm-2 cyan btn-credit"
                                                                alt="Descargar Fichas" title="Descargar Fichas"
                                                                @click="openModal('ModalCredit', user.user, 'Descargar Fichas')"><i
                                                                    class="fas fa-minus" aria-hidden="true"></i></a>
                                                            <a class="btn btn-floating waves-effect waves-light btn-action btn-more-actions mb-1 mt-1 ml-1 mr-0 mx-sm-2 d-sm-none cyan"
                                                                @click="showPopover('#more' + index, '#popoverdata', user)">
                                                                <i :id="'more' + index" class="fas fa-bars"
                                                                    aria-hidden="true"></i>

                                                            </a>
                                                        </td>
                                                        <td
                                                            class=" text-center d-none d-sm-block users-rows users-row-actions2">
                                                            <a class="btn btn-floating waves-effect waves-light btn-action btn-view-info mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Ver informacion" title="Ver informacion"
                                                                @click="openUserInfoModal(user.user)"><i
                                                                    class="fas fa-info" aria-hidden="true"></i></a><a
                                                                :style="user.user in blocked_users || user.enabled != 1 ? 'visibility: hidden;' : 'visibility: visible;'"
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-change-password mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Cambiar Contraseña" title="Cambiar Contraseña"
                                                                @click="openModal('ModalChangePassword', user.user)"><i
                                                                    class="fas fa-key" aria-hidden="true"></i></a><a
                                                                :style="user.user in blocked_users || user.enabled != 1 ? 'visibility: hidden;' : 'visibility: visible;'"
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-edit mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Modificar" title="Modificar"
                                                                @click="openModalEditUser(user.user)"><i
                                                                    class="fas fa-user-edit" aria-hidden="true"></i></a>
                                                            <a v-if="user.enabled == 1"
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-lock mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Bloquear" title="Bloquear"
                                                                @click="openModal('ModalLockUserConfirm', user.user)"><i
                                                                    class="fas fa-lock-open" aria-hidden="true"></i>
                                                            </a>
                                                            <a v-else
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-lock mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Bloquear" title="Desbloquear"
                                                                @click="openModal('ModalUnlockUserConfirm', user.user)"><i
                                                                    class="fas fa-lock" aria-hidden="true"></i>
                                                            </a>
                                                            <a v-if="user.show"
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Ocultar" title="Ocultar">
                                                                <i class="fas fa-eye" aria-hidden="true"
                                                                    @click="hideChildren(user.user)">
                                                                </i>
                                                            </a>
                                                            <a v-else
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Ocultar" title="Mostrar">
                                                                <i class="fas fa-eye-slash" aria-hidden="true"
                                                                    @click="showChildren(user.user)">
                                                                </i>
                                                            </a>
                                                            <a v-if="user.role && user.role.includes('ROLE_PROMOTOR') && (skins.register_fields.root == state.id || skins.register_fields.root1 == state.id)"
                                                                class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                                                                alt="Reasignar" title="Reasignar">
                                                                <i class="fas fa-sitemap" aria-hidden="true"
                                                                    @click="siteMap('Modal_reasignar', user.user, user.username)">
                                                                </i>
                                                            </a>
                                                        </td>
                                                        <td class=" text-center users-rows users-row-user-id d-none">
                                                            14212
                                                        </td>
                                                        <td class=" text-center d-none">0</td>
                                                        <td class=" text-center users-rows users-row-user-role d-none">
                                                            affiliate</td>
                                                    </tr>
                                                    <tr v-if="users_capital.length < 1" class="odd">
                                                        <td valign="top" colspan="4" class="dataTables_empty">No se
                                                            encontraron resultados</td>
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
                                                                @click="showMaxRegisterSelection" readonly="true"
                                                                value="" v-model="registers_per_page">
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
                                                    <pagination :options="{ texts: { count: '' } }"
                                                        v-model="actual_page" :records="records"
                                                        :per-page="registers_per_page" @paginate="paginate" />
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-none d-xl-block col-xl-3 offset-xl-0 pt-4 pt-xl-0 pl-md-0"
                                id="affiliates_tree_container">
                                <div class="tree card py-3 px-0 jstree-default" id="affiliates_tree" role="tree">
                                    <div class="switch font-size-custom py-1"><label>Incluir ocultos<input
                                                id="TreeShowHidden" type="checkbox" @change="showHiddenTree"><span
                                                class="lever"></span></label>
                                    </div>
                                    <ul class="px-1 py-0" style="font-size: small;">
                                        <treeNode :node="main_tree" />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="" id="popoverdata" style="z-index: 7;background-color: white;"
                :style="showPopover2 ? 'display:block' : 'display:none'">
                <div class="p-2" style="background-color:rgb(232, 232, 232);"><span>Mas Accciones</span></div>
                <div class="p-2">
                    <tr>
                        <a class="btn btn-floating waves-effect waves-light btn-action btn-view-info mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Ver informacion" title="Ver informacion" @click="openUserInfoModal(user.user)"><i
                                class="fas fa-info" aria-hidden="true"></i></a><a
                            :style="user.user in blocked_users || user.enabled != 1 ? 'visibility: hidden;' : 'visibility: visible;'"
                            class="btn btn-floating waves-effect waves-light btn-action btn-change-password mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Cambiar Contraseña" title="Cambiar Contraseña"
                            @click="openModal('ModalChangePassword', user.user)"><i class="fas fa-key"
                                aria-hidden="true"></i></a><a
                            :style="!(user.user in blocked_users) ? 'visibility: visible;' : 'visibility: hidden;'"
                            class="btn btn-floating waves-effect waves-light btn-action btn-edit mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Modificar" title="Modificar" @click="openModalEditUser(user.user)"><i
                                class="fas fa-user-edit" aria-hidden="true"></i></a>
                        <a v-if="user.enabled == 1"
                            class="btn btn-floating waves-effect waves-light btn-action btn-lock mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Bloquear" title="Bloquear" @click="openModal('ModalLockUserConfirm', user.user)"><i
                                class="fas fa-lock-open" aria-hidden="true"></i>
                        </a>
                        <a v-else
                            class="btn btn-floating waves-effect waves-light btn-action btn-lock mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Bloquear" title="Desbloquear"
                            @click="openModal('ModalUnlockUserConfirm', user.user)"><i class="fas fa-lock"
                                aria-hidden="true"></i>
                        </a>
                        <a v-if="user.show"
                            class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Ocultar" title="Ocultar">
                            <i class="fas fa-eye" aria-hidden="true" @click="hideChildren(user.user)">
                            </i>
                        </a>
                        <a v-else
                            class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Ocultar" title="Mostrar">
                            <i class="fas fa-eye-slash" aria-hidden="true" @click="showChildren(user.user)">
                            </i>
                        </a>
                        <a v-if="user.role && user.role.includes('ROLE_PROMOTOR') && (skins.register_fields.root == state.id || skins.register_fields.root1 == state.id)"
                            class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                            alt="Reasignar" title="Reasignar">
                            <i class="fas fa-sitemap" aria-hidden="true"
                                @click="siteMap('Modal_reasignar', user.user, user.username)">
                            </i>
                        </a>
                    </tr>
                </div>
            </div>
            <div class="modal fade left" id="affiliates_tree_modal" tabindex="-1" role="dialog"
                aria-labelledby="affTreeModal" aria-hidden="true">
                <div class="modal-dialog modal-full-height modal-left" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalViewInfoTitle">
                                Listado de Agentes</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="closeModal">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div style="max-height:65vh;overflow-y:scroll;overflow-x:hidden"
                            class="tree py-3 px-0 jstree-default" id="affiliates_tree" role="tree">
                            <div class="switch font-size-custom py-1"><label>Incluir ocultos<input id="TreeShowHidden"
                                        type="checkbox" @change="showHiddenTree"><span class="lever"></span></label>
                            </div>
                            <ul class="px-1 py-0" style="font-size: small;">
                                <treeNode :node="main_tree" />
                            </ul>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-danger waves-effect waves-light"
                                @click="closeModal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade show" id="ModalViewInfo" tabindex="-1" role="dialog" aria-labelledby="ViewInfo"
                aria-modal="true">
                <div class="modal-dialog modal-md cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalViewInfoTitle">
                                Informacion del Usuario</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="closeModal">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div v-if="errorMessage" class="alert alert-warning alert-dismissible fade show"
                                role="alert">
                                {{ errorMessage }}
                            </div>
                            <div v-if="Object.keys(target_user_info).length < 1" class="col text-center"
                                id="ModalViewInfoLoading">
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
                                <div class="col-12 col-sm-6 border-right" id="ModalViewInfoData"
                                    :style="Object.keys(target_user_info).length < 1 ? 'display:none;' : 'display:block;'">
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">ID:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfouserid">{{
                                            target_user_info.id }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Usuario:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfousername">{{
                                            target_user_info.username }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Padre:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfoparent">{{
                                            target_user_info.padre }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Rol:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInforole_text">{{
                                            parseRole(target_user_info.roles) }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Marca:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfobrand">{{
                                            target_user_info.marca }}</div>
                                    </div>
                                    <div class="row" style="display: flex;">
                                        <div class="col-5 modal-view-info-data mb-2">Agentes:</div>
                                        <div class="col-7 modal-view-info-content">
                                            <a href="" id="ModalViewInfoaffiliatesLink" user-id="14212">
                                                <div id="ModalViewInfoaffiliates">{{ target_user_info.agentes }}</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row" style="display: flex;">
                                        <div class="col-5 modal-view-info-data mb-2">Jugadores:</div>
                                        <div class="col-7 modal-view-info-content">
                                            <a href="" id="ModalViewInfoplayersLink" user-id="14212">
                                                <div id="ModalViewInfoplayers">{{ target_user_info.jugadores }}</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Creado:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfocreated">{{
                                            formatearFecha(target_user_info.created_at) }}</div>
                                    </div>
                                    <div v-if="parseRole(target_user_info.roles) == 'Jugador' && (skins.register_fields.root == state.id || skins.register_fields.root1 == state.id)"
                                        class="row">
                                        <div class="col-5 modal-view-info-data mb-3">Nombre y id:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfoname">
                                            {{ target_user_info.firstname }}</div>
                                    </div>
                                    <div v-if="parseRole(target_user_info.roles) == 'Jugador' && (skins.register_fields.root == state.id || skins.register_fields.root1 == state.id) && this.updocumento"
                                        class="row">
                                        <div class="col-12 text-center">
                                            <button type="button" class="btn btn-primary btn-sm" id="viewDocumentButton"
                                                @click="verDocumento(target_user_info.id)">
                                                <i class="fas fa-file-pdf"></i> Visualizar Documento
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6" id="ModalViewInfoAncestry" style="display: block;">
                                    <div class="row">
                                        <div class="col-12 mb-1">Estructura:</div>
                                        <div class="col-12" id="ModalViewInfoAncestryData">
                                            <ul id="ViewInfoTree" v-for="(user, index) in target_user_info.estructura"
                                                :key="index" class="nested tree-leaf-second" style="margin:3px;">
                                                <li :style="'margin-left:' + (index * 3) + 'px;'">
                                                    <a href="#" @click="showUsersCapital(user.id, user.username)"
                                                        v-if="user.roles.includes('ROLE_PROMOTOR') && index != 0">
                                                        {{ user.username }}
                                                    </a>
                                                    <span v-else>{{ user.username }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 pt-3 border-top" id="ModalViewInfoblocked" style="display: none;">
                                    <div class="row">
                                        <div class="col-4 modal-view-info-data mb-2 pr-0">Detalle de bloqueo:</div>
                                        <div class="col-8 modal-view-info-content" id="ModalViewInfoblocked_reason">
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!this.updocumento">
                                    <input type="file" id="registerDocument" class="form-control"
                                        style="margin-bottom: 5px;" @change="handleFileUpload" accept=".pdf" required>
                                    <small class="form-text text-muted">Sube tu documento en formato
                                        PDF.</small>
                                    <button class="btn btn-outline-primary form-control" type="button" id="inputGroupFileAddon04"
                                        style="margin: 0px !important;"
                                        @click="uploadDocument(target_user_info.id)">Sube el
                                        documento de identidad</button>
                                </div>


                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center py-2">
                            <button type="button" class="btn btn-cyan px-4 waves-effect waves-light"
                                data-dismiss="modal" @click="closeModal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalEditUser" tabindex="-1" role="dialog" aria-labelledby="EditUser"
                aria-hidden="true">
                <div class="modal-dialog cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2"><i
                                    class="fas fa-user-edit mr-1"></i>
                                Editar Usuario</h5>
                        </div>
                        <div class="modal-c-tabs">
                            <div class="tab-content">
                                <div class="tab-pane fade in show active" id="EditUserTab" role="tabpanel">
                                    <div style="max-height:65vh;overflow-y:scroll;overflow-x:hidden"
                                        class="modal-body mx-1 px-1">
                                        <ul class="nav md-pills pills-danger">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" id="EditUserTab2Link"
                                                    href="#EditUserTab2" role="tab">Datos personales</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link modal-clear-tab" data-toggle="tab"
                                                    id="EditUserTab3Link" href="#EditUserTab3" role="tab">Permisos</a>
                                            </li>
                                            <li class="nav-item" v-if="parseRole(target_user_info.roles) == 'Agente'">
                                                <a class="nav-link" data-toggle="tab" id="EditUserTab4Link"
                                                    href="#EditUserTab4" role="tab">Comisiones</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane fade in show col-sm-8 offset-sm-2 active"
                                                id="EditUserTab2" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="EditUserName"
                                                        v-model="edit_user_data.firstname"
                                                        class="form-control edit-user-input modal-clear-val"
                                                        autocomplete="off" maxlength="32">
                                                    <label for="EditUserName"
                                                        :class="edit_user_data.firstname ? 'active' : ''">Nombre
                                                        completo</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="EditUserPassport"
                                                        v-model="edit_user_data.dni"
                                                        class="form-control edit-user-input modal-clear-val"
                                                        autocomplete="off" maxlength="32">
                                                    <label for="EditUserPassport"
                                                        :class="edit_user_data.dni ? 'active' : ''">Documento</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-envelope prefix grey-text"></i>
                                                    <input type="text" id="EditUserEmail" v-model="edit_user_data.email"
                                                        class="form-control edit-user-input modal-clear-val"
                                                        autocomplete="off" maxlength="64">
                                                    <label for="EditUserEmail"
                                                        :class="edit_user_data.email ? 'active' : ''">Email</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-mobile-alt prefix grey-text"></i>
                                                    <input type="text" id="EditUserPhone" v-model="edit_user_data.phone"
                                                        class="form-control edit-user-input modal-clear-val"
                                                        autocomplete="off" maxlength="16">
                                                    <label for="EditUserPhone"
                                                        :class="edit_user_data.phone ? 'active' : ''">Telefono</label>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in mb-2 pt-4 show" id="EditUserTab3"
                                                role="tabpanel">
                                                <div class="clear-providers" id="EditUserProviders">
                                                    <div class="col-10 offset-1 col-sm-6 offset-sm-0 d-inline-block">
                                                        <div v-if="userInfo.providers.poker !== undefined ? userInfo.providers.poker.status : true"
                                                            class="card mb-3 font-size-custom card-category card-category-1 border-warning">
                                                            <div
                                                                class="card-body card-body-category card-body-category-1 text-warning">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Poker</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserProvidersCategory1Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                class="form-check-input"
                                                                                id="EditUserProviderId120"
                                                                                data-provider-id="120"
                                                                                v-model="edit_user_data.proveedores.poker.status"><label
                                                                                class="form-check-label"
                                                                                for="EditUserProviderId120">Poker</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-if="userInfo.providers.deportes !== undefined ? userInfo.providers.deportes.status : true"
                                                            class="card mb-3 font-size-custom card-category card-category-2 border-success">
                                                            <div
                                                                class="card-body card-body-category card-body-category-2 text-success">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Deportes</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserProvidersCategory2Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                class="form-check-input"
                                                                                id="EditUserProviderId210"
                                                                                data-provider-id="210"
                                                                                v-model="edit_user_data.proveedores.deportes.status"><label
                                                                                class="form-check-label"
                                                                                for="EditUserProviderId210">Deportes</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-if="userInfo.providers.casinolive !== undefined ? userInfo.providers.casinolive.status : true"
                                                            class="card mb-3 font-size-custom card-category card-category-1 border-secondary">
                                                            <div
                                                                class="card-body card-body-category card-body-category-1 text-secondary">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Casino en vivo</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserProvidersCategory1Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                class="form-check-input"
                                                                                id="EditUserProviderId89"
                                                                                data-provider-id="120"
                                                                                v-model="edit_user_data.proveedores.casinoLive.status"><label
                                                                                class="form-check-label"
                                                                                for="EditUserProviderId89">Casino en
                                                                                vivo</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-if="userInfo.providers.hipicas !== undefined ? userInfo.providers.hipicas.status : true"
                                                            class="card mb-3 font-size-custom card-category card-category-1 border-danger">
                                                            <div
                                                                class="card-body card-body-category card-body-category-1 text-danger">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Hipicas</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserProvidersCategory1Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                class="form-check-input"
                                                                                id="EditUserProviderId90"
                                                                                data-provider-id="120"
                                                                                v-model="edit_user_data.proveedores.hipicas.status"><label
                                                                                class="form-check-label"
                                                                                for="EditUserProviderId90">HIpicas</label>
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
                                                                        <div class="form-check"> </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserProvidersCategory3Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"
                                                                            v-for="(brand, index) in edit_user_data.proveedores.casino"
                                                                            :key="index">
                                                                            <input type="checkbox"
                                                                                class="form-check-input"
                                                                                :id="'EditUserProviderBrandId' + index"
                                                                                data-provider-id="303"
                                                                                v-model="edit_user_data.proveedores.casino[index].status">
                                                                            <label class="form-check-label"
                                                                                :for="'EditUserProviderBrandId' + index">{{
                                                                                    brand.id }}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in show pt-2" id="EditUserTab4" role="tabpanel">
                                                <div class="row pb-1">
                                                    <div class="d-none">Periodo de liquidacion</div>
                                                    <div class="col-6 offset-3 col-md-4 offset-md-4">
                                                        <div class="" style="font-size: small;min-width: 200px;">
                                                            Liquidar automaticamente</div>
                                                        <div class="select-wrapper mdb-select col-12">
                                                            <span class="caret">▼</span>
                                                            <input type="text" class="select-dropdown w-100 active"
                                                                @click="showTargetOptions" readonly="true" value=""
                                                                v-model="edit_user_data.liquidacion">
                                                            <ul id="selectTargets"
                                                                class="dropdown-content select-dropdown w-100 text-center active"
                                                                style="width: 82.125px; position: absolute; top: -73.391px; left: 15px; opacity: 1; 
                                                                display: none;">
                                                                <li @click="setLiquidacion('Mensual', 'edit')">
                                                                    <span
                                                                        :style="edit_user_data.liquidacion == 'Mensual' ? 'background-color:#4285f4;color:white !important;' : ''">Mensual</span>
                                                                </li>
                                                                <li @click="setLiquidacion('Semanal', 'edit')">
                                                                    <span
                                                                        :style="edit_user_data.liquidacion == 'Semanal' ? 'background-color:#4285f4;color:white !important;' : ''">Semanal</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="clear-providers" id="EditUserCommissions">
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
                                                                                <input type="text"
                                                                                    v-model="edit_user_data.proveedores.pokerTotal"
                                                                                    @input="setPokerComision('edit')"
                                                                                    class="form-control modal-clear-val text-right percent-format select-all-commissions"
                                                                                    cat-id="1"
                                                                                    id="SelectAllCommissions1a"
                                                                                    autocomplete="off" value=""><label
                                                                                    for="SelectAllCommissions1"
                                                                                    aria-describedby="material-addonall">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserCommissionsCategory1Content">
                                                                    <div
                                                                        class="col-10 offset-1 md-form input-group mb-5 font-size-custom">
                                                                        <input type="text"
                                                                            class="form-control edit-affiliate-input modal-clear-val percent-format text-right"
                                                                            id="EditUserCommissionId120"
                                                                            autocomplete="off"
                                                                            v-model="edit_user_data.proveedores.poker.comision"
                                                                            readonly><label
                                                                            class="active modal-always-active"
                                                                            for="EditUserCommissionId120"
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
                                                                                <input type="text"
                                                                                    v-model="edit_user_data.proveedores.deportesTotal"
                                                                                    @input="setDeportesComision('edit')"
                                                                                    class="form-control modal-clear-val text-right percent-format select-all-commissions"
                                                                                    cat-id="2"
                                                                                    id="SelectAllCommissions2a"
                                                                                    autocomplete="off" value=""><label
                                                                                    for="SelectAllCommissions2"
                                                                                    aria-describedby="material-addonall">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserCommissionsCategory2Content">
                                                                    <div
                                                                        class="col-10 offset-1 md-form input-group mb-5 font-size-custom">
                                                                        <input type="text"
                                                                            class="form-control edit-affiliate-input modal-clear-val percent-format text-right"
                                                                            id="EditUserCommissionId210"
                                                                            autocomplete="off"
                                                                            v-model="edit_user_data.proveedores.deportes.comision"
                                                                            readonly><label
                                                                            class="active modal-always-active"
                                                                            for="EditUserCommissionId210"
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
                                                                                <input type="text"
                                                                                    v-model="edit_user_data.proveedores.casinoTotal"
                                                                                    @input="setCasinoComision('edit')"
                                                                                    class="form-control modal-clear-val text-right percent-format select-all-commissions"
                                                                                    cat-id="3"
                                                                                    id="SelectAllCommissions3a"
                                                                                    autocomplete="off" value=""><label
                                                                                    for="SelectAllCommissions3"
                                                                                    aria-describedby="material-addonall">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="EditUserCommissionsCategory3Content">
                                                                    <div v-for="(brand, index) in edit_user_data.proveedores.casino"
                                                                        :key="index"
                                                                        class="col-10 offset-1 md-form input-group mb-5 font-size-custom">
                                                                        <input readonly type="text"
                                                                            class="form-control edit-affiliate-input modal-clear-val percent-format text-right"
                                                                            :id="'EditUserCommissionId' + index"
                                                                            autocomplete="off"
                                                                            v-model="edit_user_data.proveedores.casino[index].comision"><label
                                                                            class="active modal-always-active"
                                                                            :for="'EditUserCommissionId' + index"
                                                                            :aria-describedby="'material-addon' + index">{{
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
                                    <div class="font-size-custom modal-clear-hide text-center mb-4" id="EditUserError">
                                    </div>
                                    <div class="col modal-clear-hide text-center text-center mb-4" id="EditUserLoading">
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
                                    <div class="modal-footer d-flex justify-content-center py-2">
                                        <input type="hidden" class="modal-clear-val" id="EditUserId">
                                        <input type="hidden" class="modal-clear-val" id="EditUserRole">
                                        <button type="button" class="btn btn-sm btn-outline-cyan waves-effect"
                                            data-dismiss="modal" @click="closeModal">Cancelar</button>
                                        <button type="button" :disabled="edit_loading"
                                            class="btn btn-sm btn-cyan waves-effect waves-light"
                                            @click="updateUserInfo">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalEditUserConfirm" tabindex="-1" role="dialog"
                aria-labelledby="EditUserConfirm" aria-modal="true">
                <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2"
                                id="EditUserConfirmTitleEnable">
                                Habilitar Permiso</h6>
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2"
                                id="EditUserConfirmTitleDisable">
                                Deshabilitar Permiso</h6>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <p>Se modifica el permiso para</p>
                            </div>
                            <div class="edit-user-confirm-children font-size-custom pt-1">
                                <fieldset class="form-check pl-1">
                                    <input class="form-check-input" name="EditUserConfirmChildren" type="radio"
                                        data-id="1" id="EditUserConfirmChildrenAffiliate" checked="checked">
                                    <label class="form-check-label"
                                        for="EditUserConfirmChildrenAffiliate">Agente</label>
                                </fieldset>
                                <fieldset class="form-check pl-1">
                                    <input class="form-check-input" name="EditUserConfirmChildren" type="radio"
                                        data-id="2" id="EditUserConfirmChildrenPlayers">
                                    <label class="form-check-label" for="EditUserConfirmChildrenPlayers">Agente y
                                        Jugadores
                                        directos</label>
                                </fieldset>
                                <fieldset class="form-check pl-1">
                                    <input class="form-check-input" name="EditUserConfirmChildren" type="radio"
                                        data-id="3" id="EditUserConfirmChildrenAll">
                                    <label class="form-check-label" for="EditUserConfirmChildrenAll">Todos (Agente,
                                        SubAgentes y Jugadores)</label>
                                </fieldset>
                            </div>
                            <div class="edit-user-confirm-notify font-size-custom pt-3 text-center">
                                Todos los SubAgentes y Jugadores
                            </div>
                            <div class="col modal-clear-hide text-center text-center mb-4" id="EditUserConfirmLoading">
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
                                <div class="text-center font-size-custom">
                                    Por favor aguarde. Esta modificacion puede demorar algunos instantes.
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <input type="hidden" class="modal-clear-val" id="EditUserConfirmProviderId">
                            <input type="hidden" class="modal-clear-val" id="EditUserConfirmProviderStatus">
                            <button type="button" class="btn btn-sm btn-outline-warning waves-effect"
                                data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-sm btn-warning waves-effect waves-light"
                                id="ModalEditUserConfirmSubmit">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalLockUserConfirm" tabindex="-1" role="dialog"
                aria-labelledby="LockUserConfirm" aria-modal="true">
                <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Bloquear usuario</h6>
                        </div>
                        <div class="modal-body">
                            <div class="md-form font-size-custom pt-1">
                                <input type="hidden" id="LockUserRole" class="modal-clear-val">
                                <input type="hidden" id="LockUserConfirmId" class="modal-clear-val">
                                <input type="text" v-model="block_reason" id="LockUserConfirmReason"
                                    class="form-control modal-clear-val" maxlength="128">
                                <label for="LockUserConfirmReason">Motivo de bloqueo (opcional)</label>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-sm btn-outline-cyan waves-effect" data-dismiss="modal"
                                @click="closeModal">Cancelar</button>
                            <button type="button" class="btn btn-sm btn-cyan waves-effect waves-light"
                                id="ModalLockUserConfirmSubmit" @click="blockUser">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalUnlockUserConfirm" tabindex="-1" role="dialog"
                aria-labelledby="UnlockUserConfirm" aria-modal="true">
                <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Desbloquear usuario</h6>
                        </div>
                        <div class="modal-body">
                            <div v-if="blocked_users[target_user_id]?.reason">Se especifico un motivo de bloqueo</div>
                            <div v-else>No se especifico un motivo de bloqueo</div>
                            <div class="font-italic font-size-custom2 mt-3" id="UnlockUserConfirmReason">{{
                                blocked_users[target_user_id]?.reason }}</div>
                            <input type="hidden" id="UnlockUserConfirmId" class="modal-clear-val">
                            <input type="hidden" id="UnlockUserRole" class="modal-clear-val">
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-sm btn-outline-cyan waves-effect" data-dismiss="modal"
                                @click="closeModal">Cancelar</button>
                            <button type="button" class="btn btn-sm btn-cyan waves-effect waves-light"
                                id="ModalUnlockUserConfirmSubmit" @click="unBlockUser">Aceptar</button>
                        </div>
                    </div>
                </div>
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
                                id="ModalCreditSubmit" :disabled="credit_modal.value == '0,00'"
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
                                    <a class="nav-link modal-clear-tab active" data-toggle="tab"
                                        href="#NewUserTabPlayer" id="NewUserTabPlayerPanel" role="tab"
                                        @click="new_user_data.type = 'jugador'"><i class="fas fa-user-plus mr-1"></i>
                                        Jugador</a>
                                </li>
                                <li v-if="skins.register_fields.root == state.id || skins.register_fields.root1 == state.id"
                                    class="nav-item waves-effect waves-light">
                                    <a class="nav-link" data-toggle="tab" href="#NewUserTabAffiliate"
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
                                <div class="tab-pane fade in show active" id="NewUserTabPlayer" role="tabpanel">
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
                                                                                    v-model="new_user_data.proveedores.deportes.status"
                                                                                    data-cat-id="2">
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
                                                            <div
                                                                class="card mb-3 font-size-custom card-category card-category-1 border-secondary">
                                                                <div
                                                                    class="card-body card-body-category card-body-category-1 text-secondary">
                                                                    <div class="col-12 px-0">
                                                                        <div class="d-inline-block">
                                                                            <h6 class="card-title">Casino en Vivo</h6>
                                                                        </div>
                                                                        <div class="d-inline-block float-right">
                                                                            <div class="form-check"> <input
                                                                                    type="checkbox"
                                                                                    class="form-check-input custom-form-check-input"
                                                                                    id="SelectAllNewPlayer5"
                                                                                    data-cat-id="1"
                                                                                    v-model="new_user_data.proveedores.casinoLive.status">
                                                                                <label class="form-check-label"
                                                                                    for="SelectAllNewPlayer5">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card-text"
                                                                        id="NewUserPlayerProvidersCategory1Content">
                                                                        <div class="mb-3 font-size-custom">
                                                                            <div class="form-check"><input
                                                                                    type="checkbox"
                                                                                    v-model="new_user_data.proveedores.casinoLive.status"
                                                                                    class="form-check-input casinolive-jugador"
                                                                                    id="NewUserPlayerProviderId121"><label
                                                                                    class="form-check-label"
                                                                                    for="NewUserPlayerProviderId121">Casino
                                                                                    en Vivo</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="card mb-3 font-size-custom card-category card-category-1 border-danger">
                                                                <div
                                                                    class="card-body card-body-category card-body-category-1 text-danger">
                                                                    <div class="col-12 px-0">
                                                                        <div class="d-inline-block">
                                                                            <h6 class="card-title">Hipicas</h6>
                                                                        </div>
                                                                        <div class="d-inline-block float-right">
                                                                            <div class="form-check"> <input
                                                                                    type="checkbox"
                                                                                    class="form-check-input custom-form-check-input"
                                                                                    id="SelectAllNewPlayer4"
                                                                                    data-cat-id="1"
                                                                                    v-model="new_user_data.proveedores.hipicas.status">
                                                                                <label class="form-check-label"
                                                                                    for="SelectAllNewPlayer4">Todos</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card-text"
                                                                        id="NewUserPlayerProvidersCategory1Content">
                                                                        <div class="mb-3 font-size-custom">
                                                                            <div class="form-check"><input
                                                                                    type="checkbox"
                                                                                    v-model="new_user_data.proveedores.hipicas.status"
                                                                                    class="form-check-input hipicas-jugador"
                                                                                    id="NewUserPlayerProviderId122"><label
                                                                                    class="form-check-label"
                                                                                    for="NewUserPlayerProviderId122">Hipicas</label>
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
                                <div class="tab-pane fade" id="NewUserTabAffiliate" role="tabpanel">
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
                                                                                v-model="new_user_data.proveedores.deportes.status"
                                                                                data-cat-id="2"> <label
                                                                                class="form-check-label"
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
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-1 border-secondary">
                                                            <div
                                                                class="card-body card-body-category card-body-category-1 text-secondary">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Casino en Vivo</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> <input type="checkbox"
                                                                                class="form-check-input custom-form-check-input"
                                                                                id="SelectAllNewPlayer5" data-cat-id="1"
                                                                                v-model="new_user_data.proveedores.casinoLive.status">
                                                                            <label class="form-check-label"
                                                                                for="SelectAllNewPlayer5">Todos</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserPlayerProvidersCategory1Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                v-model="new_user_data.proveedores.casinoLive.status"
                                                                                class="form-check-input casinolive-jugador"
                                                                                id="NewUserPlayerProviderId121"><label
                                                                                class="form-check-label"
                                                                                for="NewUserPlayerProviderId121">Casino
                                                                                en Vivo</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="card mb-3 font-size-custom card-category card-category-1 border-danger">
                                                            <div
                                                                class="card-body card-body-category card-body-category-1 text-danger">
                                                                <div class="col-12 px-0">
                                                                    <div class="d-inline-block">
                                                                        <h6 class="card-title">Hipicas</h6>
                                                                    </div>
                                                                    <div class="d-inline-block float-right">
                                                                        <div class="form-check"> <input type="checkbox"
                                                                                class="form-check-input custom-form-check-input"
                                                                                id="SelectAllNewPlayer4" data-cat-id="1"
                                                                                v-model="new_user_data.proveedores.hipicas.status">
                                                                            <label class="form-check-label"
                                                                                for="SelectAllNewPlayer4">Todos</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-text"
                                                                    id="NewUserPlayerProvidersCategory1Content">
                                                                    <div class="mb-3 font-size-custom">
                                                                        <div class="form-check"><input type="checkbox"
                                                                                v-model="new_user_data.proveedores.hipicas.status"
                                                                                class="form-check-input hipicas-jugador"
                                                                                id="NewUserPlayerProviderId122"><label
                                                                                class="form-check-label"
                                                                                for="NewUserPlayerProviderId122">Hipicas</label>
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
                                                                    <li @click="setLiquidacion('Mensual', 'create')">
                                                                        <span
                                                                            :style="new_user_data.liquidacion == 'Mensual' ? 'background-color:#4285f4;color:white !important;' : ''">Mensual</span>
                                                                    </li>
                                                                    <li @click="setLiquidacion('Semanal', 'create')">
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
            <!-- <div class="modal fade" id="ModalEditUser" tabindex="-1" role="dialog" aria-labelledby="EditUser"
                aria-hidden="true">
                <div class="modal-dialog cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2"><i
                                    class="fas fa-user-edit mr-1"></i>
                                Editar Usuario</h5>
                        </div> -->
            <div class="modal fade" id="Modal_reasignar" tabindex="-1" role="dialog" aria-labelledby=""
                aria-hidden="true">
                <div class="modal-dialog cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2"><i
                                    class="fas fa-sitemap mr-1"></i>
                                Reasignar Agente</h5>
                        </div>
                        <div class="tab-content">
                            <!--REASIGNAR AGENTE-->
                            <div class="tab-pane fade in show active modal-body1" id="NewUserTabPlayer" role="tabpanel">
                                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                                    {{ errorMessage }}
                                </div>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Nuevo padre</th>
                                            <td>{{ selectedUserName }}</td>
                                            <td>{{ selectedUserId }}</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">Hijo</th>
                                            <td>{{ target_user_name }}</td>
                                            <td>{{ target_user_id }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span>Selecciona el nuevo padre para el agente</span>
                                <ul class="px-1 py-0" style="font-size: small;">
                                    <reasignarAgente :node="main_tree" />
                                </ul>
                                <div class="modal-footer d-flex justify-content-center py-2">
                                    <button type="button" class="btn btn-outline-cyan px-4 waves-effect waves-light"
                                        data-dismiss="modal" @click="closeModal">Cancelar</button>
                                    <button type="button" class="btn btn-cyan px-4 waves-effect waves-light"
                                        @click="cambiodepapa" id="ModalNewUserPlayerSubmit"
                                        data-loading="<i class='fa fa-spinner fa-spin '></i> Creando...">Aceptar</button>
                                </div>
                                <button data-bs-target="#registerModalToggle3" data-bs-toggle="modal"
                                    data-bs-dismiss="modal" style="display:none;" id="registerSuccessfull"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="registerModalToggle3" aria-hidden="true"
                aria-labelledby="registerModalToggleLabel3" tabindex="-1" data-bs-backdrop="false"
                style="background-color:rgba(0, 0, 0, 0.5);">
                <div class="modal-dialog cascading-modal modal-sm">
                    <div class="modal-content" style="background: #ffffff;">
                        <div class="d-flex justify-content-end align-items-start">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                style="background: none;color:black;" @click="recargarinfo">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center p-2">
                                <span style="font-size:64px;color:green;"><i class="fas fa-check-circle"></i></span><br>
                                <span>Reasignación Exitosa !!</span><br>
                                <span>Verifica en la Jerarquía</span>
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
            <div class="modal fade show" id="ModalChangePassword" tabindex="-1" role="dialog"
                aria-labelledby="ChangePassword" aria-modal="true">
                <div class="modal-dialog cascading-modal modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Cambiar Contraseña</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="closeModal">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="font-size-custom modal-clear-hide py-2" id="ChangePasswdForce"
                                style="display: none;">Para preversar la seguridad de su cuenta, le aconsejamos cambiar
                                su
                                contraseña.</div>
                            <div class="md-form pb-2 font-size-custom">
                                <i class="fas fa-eye prefix change-password-reveal grey-text" id="iconPass1"
                                    title="Mostrar" @click="showHidePassword('ChangePasswordNew1', 'iconPass1', 1)"></i>
                                <input type="password" v-model="new_password" id="ChangePasswordNew1"
                                    class="form-control change-password-toggle change-password-input modal-clear-val"
                                    maxlength="16">
                                <label for="ChangePasswordNew1" class="">Nueva Contraseña</label>
                            </div>
                            <div class="md-form pb-2 font-size-custom">
                                <i class="fas fa-eye prefix change-password-reveal grey-text" id="iconPass2"
                                    title="mostrar" @click="showHidePassword('ChangePasswordNew2', 'iconPass2', 2)"></i>
                                <input type="password" v-model="new_password2" id="ChangePasswordNew2"
                                    class="form-control change-password-toggle change-password-input modal-clear-val"
                                    maxlength="16">
                                <label for="ChangePasswordNew2" class="">Ingrese Nuevamente</label>
                            </div>
                            <div v-if="changePasswordMessage.message != ''" class="font-size-custom text-center pb-4"
                                id="ChangePasswordError" style="display: block;"
                                :style="changePasswordMessage.type == 'error' ? 'color:red;' : 'color:green;'">{{
                                    changePasswordMessage.message }}</div>
                            <div class="col modal-clear-hide text-center text-center mb-4" id="ChangePasswordLoading"
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
                                data-dismiss="modal" @click="closeModal">Cancelar</button>
                            <button type="button" class="btn btn-cyan px-3 waves-effect waves-light waves-light"
                                id="ModalChangePasswordSubmit" @click="changePassword">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import treeNode from './treeNode.vue';
import reasignarAgente from './reasignarAgente.vue';
import Pagination from 'vue-pagination-2';
import { createPopper } from '@popperjs/core';
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'usersComponent',
    components: {
        treeNode,
        reasignarAgente,
        Pagination
    },
    props: ["view_type"],
    data() {
        return {
            infoFastPlay: [],
            updocumento: false,
            errorMessage: '',
            user: {},
            showPopover2: false,
            filter: "todos",
            search: "",
            actual_page: 1,
            registers_per_page: 10,
            target_user_info: {},
            target_user_id: 0,
            target_user_name: "",
            new_password: "",
            new_password2: "",
            showPassword: false,
            showPassword2: false,
            changePasswordMessage: { type: "", message: "" },
            blocked_users: {},
            block_reason: "",
            casino_comision_all: "",
            poker_comision_all: "",
            deportes_comision_all: "",
            credit_modal: {
                action: "",
                value: "0,00",
                username: "",
                balance: 0,
                role: "",
                id: 0,
                loading: false
            },
            edit_loading: false,
            edit_user_data: {
                username: "",
                firstname: "",
                dni: "",
                email: "",
                phone: "",
                proveedores: {
                    poker: { status: true, comision: 0 }, casino: [], deportes: { status: true, comision: 0 }, bingo: { status: true, comision: 0 },
                    casinoLive: { status: true, comision: "0%" }, hipicas: { status: true, comision: "0%" },
                    casinoTotal: 0, pokerTotal: 0, deportesTotal: 0, bingoTotal: 0
                },
                liquidacion: ""
            },
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
                    casinoLive: { status: true, comision: "0%" }, hipicas: { status: true, comision: "0%" },
                    casinoTotal: "", pokerTotal: "", deportesTotal: "", bingoTotal: "", casinoLiveTotal: "", hipicasTotal: ""
                },
                error: "",
                liquidacion: "Mensual"
            },
            pages: [],
            records: 0
        }
    },
    computed: {
        ...mapState(['selectedUserId', 'selectedUserName', 'domain', 'site_id']),
        state() {
            return this.$store.state.user;
        },
        skins() {
            return this.$store.state.skins;
        },
        apiUrl() {
            return this.$store.getters['getApiUrl'];
        },
        all_casino_brands() {
            return this.$store.getters["getAllCasinoBrands"];
        },
        casino_brands() {
            return this.$store.getters["getCasinoBrands"];
        },
        main_tree() {
            return this.$store.getters["getMainTree"];
        },

        users_capital() {
            let MainData = this.$store.getters["getUsersCapital"];
            function ordered(a, b) {
                return a.username.localeCompare(b.username)
            }
            let agentesArray = MainData.filter(user => user.role == "ROLE_PROMOTOR").sort((a, b) => ordered(a, b));
            let jugadoresArray = MainData.filter(user => user.role == "ROLE_APOSTADOR").sort((a, b) => ordered(a, b));
            let all = agentesArray.concat(jugadoresArray);
            if (this.filter == "agentes") {
                return agentesArray;
            }
            if (this.filter == "jugadores") {
                return jugadoresArray;
            }
            if (this.filter == "ocultos") {
                return all.filter(user => user.show == false).sort((a, b) => ordered(a, b));
            }
            return all.filter(user => user.show == true);
        },
        loadingCapital() {
            return this.$store.getters["getLoadingCapital"];
        },
        targetUser() {
            return this.$store.getters["getTargetUser"];
        },
        apiUrlnew() {
            return this.$store.getters['getApiUrlnew'];
        },
        site() {
            return this.$store.getters['getSite'];
        },
        userInfo() {
            return this.$store.getters["getUserData"];
        }
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
        async uploadDocument(userId) {
            try {
                if (this.new_user_data.document == null) {
                    this.errorMessage = "Sube el documento de identidad";
                }
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
                    this.errorMessage = response.data.error;
                }
                else if(response.data.status == "success"){
                    this.closeModal();
                    this.showAlert("alert-success", "Proceso correcto", "Documento subido correctamente");
                }
            } catch (error) {
                console.error('Error uploading document:', error);
                // Manejo de errores adicional
            }
        },
        handleFileUpload(event) {
            this.new_user_data.document = event.target.files[0]; // Captura el archivo seleccionado
        },
        showUsersCapital(id, name) {
            this.$store.dispatch("getChildrenTree", { id: id, name: name });
            this.closeModal()
        },
        setLiquidacion(type, target) {
            if (target == "create") {
                this.new_user_data.liquidacion = type;
            }
            else {
                this.edit_user_data.liquidacion = type;
            }
            document.getElementById("selectTargets").style.display = "none";
        },
        showTargetOptions() {
            document.getElementById("selectTargets").style.display = "block";
        },
        showPopover(source, data, user) {
            this.user = user;
            this.showPopover2 = true;
            const popcorn = document.querySelector(source);
            const tooltip = document.querySelector(data);
            createPopper(popcorn, tooltip, {
                placement: 'left',
            });
        },
        paginate(page) {
            this.actual_page = page;
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
            else if (type == "casinolive") {
                this.new_user_data.proveedores.casinoLive.status = !this.new_user_data.proveedores.casinoLive.status;
            }
            else if (type == "hipicas") {
                this.new_user_data.proveedores.hipicas.status = !this.new_user_data.proveedores.hipicas.status;
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
        searchText() {
            this.actual_page = 1;
            this.search = document.getElementById("UserSearch").value;
            this.$store.dispatch("getChildrenByName", this.search)
        },
        changeFilter(filter) {
            this.filter = filter;
        },
        hideChildren(id) {
            this.$store.dispatch("hideUser", id);
        },
        showChildren(id) {
            this.$store.dispatch("showUser", id);
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
            if (this.records < this.registers_per_page) this.actual_page = 1
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
        showHiddenTree() {
            let checked = document.getElementById("TreeShowHidden").checked;
            this.$store.dispatch("showHiddenTree", checked);
        },
        async cambiodepapa() {
            // Resetear el mensaje de error antes de realizar la operación
            this.errorMessage = '';

            try {
                // Validación para evitar que el padre y el hijo sean el mismo
                if (this.target_user_id === this.selectedUserId) {
                    this.errorMessage = "El padre y el hijo no pueden ser el mismo usuario.";
                    return; // Salir de la función si hay un error
                }

                // Validar las variables necesarias
                if (!this.domain || !this.userInfo.token || !this.target_user_id || !this.selectedUserId) {
                    this.errorMessage = "Faltan variables necesarias. No se puede realizar la solicitud.";
                    return; // Salir si falta alguna variable
                }

                // Realizar la solicitud al API
                let response = await axios.post(this.domain + "/api/scommand?access_token=" + this.userInfo.token, {
                    "command": "move_user",
                    "params": {
                        "userId": this.target_user_id,
                        "parentId": this.selectedUserId,
                    }
                });
                if (response.data.data.data.result == "ok") {
                    this.closeModal();
                    document.getElementById('registerSuccessfull').click();
                    return response.data;
                }

                // Si no hay respuesta o algún error, se regresa null
                return null;

            } catch (error) {
                // Capturar cualquier error que pueda ocurrir durante la solicitud
                this.errorMessage = "Hubo un error al realizar la solicitud.";
                console.error(error);
                return null;
            }
        },
        recargarinfo() {
            let user_data = {
                token: this.userInfo.token,
                site_id: this.site_id,
                prefix: 'api',
                site: 'jugar'
            }
            this.$store.dispatch("getUserData", user_data);
        },
        async getUserServerData(id) {
            try {
                let response = await axios.get(this.apiUrlnew + "informacion", {
                    params: {
                        "users": id,
                        "login_Id": this.main_tree.id,
                        "token": this.userInfo.token,
                        "site": this.site

                    }
                })
                if (response.data) {
                    // response.data[0].estructura = response.data[1].estructura
                    return response.data
                }
                return null
            } catch (error) {
                return null
            }
        },
        async verDocumento(id) {
            try {
                let response = await axios.get(this.apiUrlnew + "documento", {
                    params: {
                        "users": id,
                        "token": this.userInfo.token,
                        "autorizado": this.state.id

                    }
                })
                if (response.data.error) {
                    this.errorMessage = response.data.error;
                }
                if (response.data.status == "success") {
                    window.open(response.data.ftpUrl, "_blank");
                }
                return response.data.error;
            } catch (error) {
                this.errorMessage = 'Ha ocurrido un error al procesar la solicitud.';
                console.error(error);
                return null;
            }
        },
        async openUserInfoModal(id) {
            try {
                this.errorMessage = '';
                this.target_user_id = id;
                this.target_user_info = {};
                this.backdrop(true)
                let modal = document.getElementById("ModalViewInfo");
                this.target_user_info = await this.getUserServerData(id);
                if (this.target_user_info.roles.split('"')[1].split("_")[1] == "APOSTADOR") {
                    let response = await axios.get(this.apiUrlnew + "documento", {
                        params: {
                            "users": id,
                            "token": this.userInfo.token,
                            "autorizado": this.state.id
                        }
                    })
                    this.updocumento = response.data.error == "Archivo no encontrado o no disponible" ? false : true;
                }
                modal.classList.add("show");
                modal.style.display = "block"
            } catch (error) {
                console.log(error);
            }
        },
        getUserData(id) {
            return this.users_capital.filter(user => user.user == id)[0];
        },
        openModal(target, id, title) {
            try {
                this.backdrop(true);
                this.target_user_id = id;
                let modal = document.getElementById(target);
                modal.classList.add("show");
                modal.style.display = "block";
                if (title) {
                    let data = this.getUserData(id);
                    this.credit_modal.action = title;
                    this.credit_modal.username = data.username;
                    this.credit_modal.balance = this.parseNumbers(data.capital_total);
                    this.credit_modal.role = data.role;
                    this.credit_modal.id = data.user;
                }
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
        siteMap(target, id, title) {
            try {
                this.backdrop(true);
                this.target_user_id = id;
                this.target_user_name = title;
                let modal = document.getElementById(target);
                modal.classList.add("show");
                modal.style.display = "block";

            } catch (error) {
                console.log(error);
            }
        },
        async openModalEditUser(id) {
            try {
                document.getElementById("EditUserTab2Link")?.click();
                this.backdrop(true);
                this.target_user_id = id;
                let userData = await this.getUserServerData(id);
                this.edit_user_data.firstname = userData.firstname.split("-")[0];
                this.edit_user_data.dni = userData.firstname.split("-")[1];
                this.edit_user_data.username = userData.username;
                this.edit_user_data.email = userData.email;
                this.edit_user_data.phone = userData.phone;
                if (Object.keys(userData.proveedores).length < 1) {
                    userData.proveedores = {
                        "poker": 0,
                        "casino": 0,
                        "deportes": 0
                    };
                }
                this.edit_user_data.proveedores.poker = userData.proveedores.poker?.comision !== undefined ? { comision: (userData.proveedores.poker.comision * 100) + "%", status: userData.proveedores.poker.status } : { comision: (userData.proveedores.poker * 100) + "%", status: true };
                this.edit_user_data.proveedores.hipicas = userData.proveedores.hipicas?.comision !== undefined ? { comision: (userData.proveedores.hipicas.comision * 100) + "%", status: userData.proveedores.hipicas.status } : { comision: (userData.proveedores.hipicas * 100) + "%", status: true };
                this.edit_user_data.proveedores.casinoLive = userData.proveedores.casinolive?.comision !== undefined ? { comision: (userData.proveedores.casinolive.comision * 100) + "%", status: userData.proveedores.casinolive.status } : { comision: (userData.proveedores.casinolive * 100) + "%", status: true };
                this.edit_user_data.proveedores.deportes = userData.proveedores.deportes?.comision !== undefined ? { comision: (userData.proveedores.deportes.comision * 100) + "%", status: userData.proveedores.deportes.status } : { comision: (userData.proveedores.deportes * 100) + "%", status: true };
                let casino_brands = JSON.parse(JSON.stringify(this.casino_brands));
                if (!Array.isArray(userData.proveedores.casino)) {
                    casino_brands.forEach(brand => {
                        brand.comision = (userData.proveedores.casino * 100) + "%";
                    })
                }
                this.edit_user_data.proveedores.casino = !Array.isArray(userData.proveedores.casino) ? casino_brands : userData.proveedores.casino.map(brand => {
                    return {
                        id: brand.id,
                        name: brand.name,
                        comision: (brand.comision * 100) + "%",
                        status: brand.status
                    }
                }).filter(brand => casino_brands.filter(Ubrand => Ubrand.id === brand.id)[0]?.status);
                this.edit_user_data.proveedores.casinoTotal = !Array.isArray(userData.proveedores.casino) ? (userData.proveedores.casino * 100) + "%" : (userData.proveedores.casino[0].comision * 100) + "%";
                this.edit_user_data.proveedores.pokerTotal = userData.proveedores.poker.comision !== undefined ? (userData.proveedores.poker.comision * 100) + "%" : (userData.proveedores.poker * 100) + "%";
                this.edit_user_data.proveedores.deportesTotal = userData.proveedores.deportes.comision !== undefined ? (userData.proveedores.deportes.comision * 100) + "%" : (userData.proveedores.deportes * 100) + "%";
                this.edit_user_data.liquidacion = userData.tipo_cierre ?? "Mensual";
                this.target_user_info = userData
                let modal = document.getElementById("ModalEditUser");
                modal.classList.add("show");
                modal.style.display = "block";
            } catch (error) {
                console.log(error);
            }
        },
        async updateUserInfo() {
            try {
                this.edit_loading = true;
                let allCasinoBrandsCopy = JSON.parse(JSON.stringify(this.all_casino_brands));
                let parsedCasino = this.edit_user_data.proveedores.casino.map(brand => {
                    return {
                        id: brand.id,
                        name: brand.name,
                        comision: parseFloat(brand.comision.split("%")[0]) / 100,
                        status: brand.status
                    }
                })
                let casinoBrandsConfig = allCasinoBrandsCopy.map(brand => {
                    return {
                        id: brand.id,
                        name: brand.name,
                        comision: parsedCasino.find(item => item.id == brand.id && item.name == brand.name)?.comision ?? parsedCasino[0].comision,
                        status: parsedCasino.find(item => item.id == brand.id && item.name == brand.name)?.status ?? false
                    }
                })
                let response = await axios.post(this.apiUrlnew + "actualizarinfo", {
                    "username": this.edit_user_data.username,
                    "email": this.edit_user_data.email,
                    "firstname": this.edit_user_data.firstname + "-" + this.edit_user_data.dni,
                    "phone": this.edit_user_data.phone,
                    "token": this.userInfo.token,
                    "site": this.site,
                    "login_Id": this.target_user_id,
                    "casino": parseFloat(this.edit_user_data.proveedores.casino[0].comision.split("%")[0]) / 100,
                    "poker": parseFloat(this.edit_user_data.proveedores.poker.comision.split("%")[0]) / 100,
                    "deportes": parseFloat(this.edit_user_data.proveedores.deportes.comision.split("%")[0]) / 100,
                    "bingo": 0,
                    "tipo_cierre": this.edit_user_data.liquidacion,
                    "proveedores": {
                        "poker": {
                            "comision": parseFloat(this.edit_user_data.proveedores.poker.comision.split("%")[0]) / 100,
                            "status": this.edit_user_data.proveedores.poker.status
                        },
                        "casinolive": {
                            "comision": parseFloat(this.edit_user_data.proveedores.casinoLive.comision.split("%")[0]) / 100,
                            "status": this.edit_user_data.proveedores.casinoLive.status
                        },
                        "hipicas": {
                            "comision": parseFloat(this.edit_user_data.proveedores.hipicas.comision.split("%")[0]) / 100,
                            "status": this.edit_user_data.proveedores.hipicas.status
                        },
                        "deportes": {
                            "comision": parseFloat(this.edit_user_data.proveedores.deportes.comision.split("%")[0]) / 100,
                            "status": this.edit_user_data.proveedores.deportes.status
                        },
                        "casino": casinoBrandsConfig
                    }
                });
                if (response.data.message) {
                    // this.$store.dispatch("getChildrenCapital",this.$store.getters["getTargetUser"]);
                    this.showAlert("alert-success", "Proceso correcto", "Usuario actualizado.")
                }
                this.edit_loading = false;
                this.closeModal();
            } catch (error) {
                this.edit_loading = false;
                this.showAlert("alert-danger", "Error", error.response?.data?.error)
            }
        },
        async blockUser() {
            let data = {
                id: this.target_user_id,
                reason: this.block_reason
            }
            await axios.post(this.apiUrlnew + "bloquear_usuario", {
                "users": [this.target_user_id],
                "site": this.site,
                "token": this.userInfo.token
            })
            this.blocked_users[this.target_user_id] = data
            localStorage.setItem("blocked_users", JSON.stringify(this.blocked_users));
            this.$store.dispatch("getChildrenCapital", { id: this.main_tree.id, name: this.main_tree.user_name });
            this.closeModal()
        },
        async unBlockUser() {
            let data = this.getUserData(this.target_user_id);
            if (data.enabled == 0) {
                delete this.blocked_users[this.target_user_id];
                await axios.post(this.apiUrlnew + "bloquear_usuario", {
                    "users": [this.target_user_id],
                    "site": this.site,
                    "token": this.userInfo.token
                })
                this.$store.dispatch("getChildrenCapital", { id: this.main_tree.id, name: this.main_tree.user_name });
                localStorage.setItem("blocked_users", JSON.stringify(this.blocked_users));
            }
            this.closeModal()
        },
        // async changePassword() {
        //     try {
        //         document.getElementById("ChangePasswordLoading").style.display = "block";
        //         document.getElementById("ModalChangePasswordSubmit").disabled = true;
        //         let response = await axios.post(this.apiUrlnew + "cambiar_password", {
        //             "users": [this.target_user_id],
        //             "password": this.new_password,
        //             "password1": this.new_password2,
        //             "token": this.userInfo.token,
        //             "login_id": this.main_tree.id,
        //             "site": this.site
        //         }
        //         )
        //         if (response.data) {
        //             if (response.data.message) {
        //                 this.showAlert("alert-success", "Proceso correcto", "Contraseña actualizada.");
        //                 document.getElementById("ChangePasswordLoading").style.display = "none";
        //                 document.getElementById("ModalChangePasswordSubmit").disabled = false;
        //                 this.closeModal();
        //             }
        //             else {
        //                 this.changePasswordMessage = {
        //                     message: response.data.error,
        //                     type: 'error'
        //                 };
        //                 document.getElementById("ChangePasswordLoading").style.display = "none";
        //                 document.getElementById("ModalChangePasswordSubmit").disabled = false;
        //             }
        //         }
        //     } catch (error) {
        //         this.changePasswordMessage = {
        //             message: error.response?.data?.error ?? "Error en el proceso",
        //             type: 'error'
        //         };
        //         document.getElementById("ChangePasswordLoading").style.display = "none";
        //         document.getElementById("ModalChangePasswordSubmit").disabled = false;
        //     }
        // },
        async changePassword() {
            try {
                document.getElementById("ChangePasswordLoading").style.display = "block";
                document.getElementById("ModalChangePasswordSubmit").disabled = true;
                let response = await axios.post(this.apiUrlnew + "cambiar_password", {
                    "users": [this.target_user_id],
                    "password": this.new_password,
                    "password1": this.new_password2,
                    "token": this.userInfo.token,
                    "login_id": this.main_tree.id,
                    "site": this.site
                }
                )
                if (response.data) {
                    if (response.data.message) {
                        this.showAlert("alert-success", "Proceso correcto", "Contraseña actualizada.");
                        document.getElementById("ChangePasswordLoading").style.display = "none";
                        document.getElementById("ModalChangePasswordSubmit").disabled = false;
                        this.closeModal();
                    }
                    else {
                        this.changePasswordMessage = {
                            message: response.data.error,
                            type: 'error'
                        };
                        document.getElementById("ChangePasswordLoading").style.display = "none";
                        document.getElementById("ModalChangePasswordSubmit").disabled = false;
                    }
                }
            } catch (error) {
                this.changePasswordMessage = {
                    message: error.response?.data?.error ?? "Error en el proceso",
                    type: 'error'
                };
                document.getElementById("ChangePasswordLoading").style.display = "none";
                document.getElementById("ModalChangePasswordSubmit").disabled = false;
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
            this.target_user_id = 0;
            this.new_password = "";
            this.new_password2 = "";
            this.changePasswordMessage = { type: "", message: "" }
            this.credit_modal = {
                action: "",
                value: "0,00",
                username: "",
                balance: 0,
                role: "",
                id: 0,
                loading: false
            }
            this.edit_user_data = {
                username: "",
                firstname: "",
                dni: "",
                email: "",
                phone: "",
                proveedores: {
                    poker: { status: true, comision: 0 }, casino: [], deportes: { status: true, comision: 0 }, bingo: { status: true, comision: 0 },
                    casinoLive: { status: true, comision: "0%" }, hipicas: { status: true, comision: "0%" },
                    casinoTotal: 0, pokerTotal: 0, deportesTotal: 0, bingoTotal: 0
                },
                liquidacion: ""
            }
            const modalCreditInput = document.getElementById('ModalCreditAmount')
            if (modalCreditInput) { modalCreditInput.value = '0.00' }
            this.new_user_data = {
                type: "jugador",
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
                    casinoLive: { status: true, comision: "0%" }, hipicas: { status: true, comision: "0%" },
                    casinoTotal: "", pokerTotal: "", deportesTotal: "", bingoTotal: "", casinoLiveTotal: "", hipicasTotal: ""
                },
                error: "",
                liquidacion: "Mensual"
            }
            document.getElementById('NewUserTabPlayerPanel').click()
            document.getElementById('NewUserTabAffiliate1Link').click()
            document.getElementById('NewUserTabPlayer1Link').click()
        },
        formatearFecha(fechaString) {
            const fecha = new Date(fechaString);
            const anio = fecha.getFullYear();
            const mes = this.agregarCeroDelante(fecha.getMonth() + 1);
            const dia = this.agregarCeroDelante(fecha.getDate());
            return `${anio}/${mes}/${dia}`;
        },
        agregarCeroDelante(numero) {
            return numero < 10 ? '0' + numero : numero;
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
        makeOneCheck(target1, target2) {
            if (document.getElementById(target1).checked) {
                document.getElementById(target2).checked = false
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
                            "casinolive": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.casinoLive.status
                            },
                            "hipicas": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.hipicas.status
                            },
                            "deportes": {
                                "comision": parseFloat(this.new_user_data.proveedores.deportes.comision.split("%")[0]) / 100,
                                "status": this.new_user_data.proveedores.deportes.status
                            },
                            "casino": casinoBrandsConfig
                        };
                    } else {
                        data.proveedores = {
                            "poker": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.poker.status
                            },
                            "casinolive": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.casinoLive.status
                            },
                            "hipicas": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.hipicas.status
                            },
                            "deportes": {
                                "comision": 0,
                                "status": this.new_user_data.proveedores.deportes.status
                            },
                            "casino": casinoBrandsConfig
                        };
                    }

                    let endpoint = this.new_user_data.type == "agente" ? "crear_agente" : "crear_jugador";
                    let response;
                    response = await axios.post(this.apiUrlnew + endpoint, data);
                    if (response.data.error) {
                        this.new_user_data.error = response.data.error;
                        createBtn.innerHTML = "Aceptar";
                        createBtn.disabled = false;
                    }
                    else if(this.new_user_data.type=="jugador" && this.skins.register_fields.document){
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
        }
    },
    mounted() {
        let restoreBlockedUsers = JSON.parse(localStorage.getItem("blocked_users"));
        if (restoreBlockedUsers) {
            this.blocked_users = restoreBlockedUsers;
        }
        const handleClick = event => {
            if (event.target.id != "popoverdata" && !event.target.id.includes("more") && this.showPopover2) {
                this.showPopover2 = false
            }
        }
        document.getElementById("usersMain").addEventListener('click', handleClick)
    },
    created() {
        //this.$store.dispatch("getChildrenCapital",{id:this.main_tree.id,name:this.main_tree.user_name});
    },
}
</script>
<style scoped>
.form-check {
    padding-left: 0px !important
}

.modal-body1 {
    max-height: 63vh;
    overflow-y: auto;
}

.custom-btn {
    padding: 4px 12px;
    /* Controla el espacio dentro del botón */
    font-size: 12px;
    /* Ajusta el tamaño del texto */
}
</style>