<template>
    <div>
        <main :class="view_type">
            <div class="container-fluid mb-5">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row mt-4 mb-3">
                            <div class="pt-2 ml-3">
                                <h5 class="white-text font-weight-bold">Finanzas Jugadores</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-9">
                                <div class="card">
                                    <div class="card-body p-1 p-sm-3">
                                        <div class="row mb-sm-3 text-center">
                                            <div class="col-6 offset-1 col-sm-3 offset-sm-3 col-md-3 offset-md-0 col-lg-3">
                                                <div class="md-form font-size-custom2">
                                                    <input type="text" id="UserSearch" class="form-control search-username"
                                                        maxlength="16">
                                                    <label for="UserSearch">Nombre de usuario</label>
                                                </div>
                                            </div>
                                            <div class="col-4 col-sm-3 col-md-2 col-lg-2 mt-1">
                                                <div class="md-form mt-3">
                                                    <button class="btn btn-sm btn-cyan waves-effect waves-light" @click="searchText()"
                                                        id="SearchButton">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="operation_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                            <div class="top"></div>
                                            <div id="operation_processing" class="dataTables_processing card"
                                                style="display: none;">Procesando...</div>
                                            <table id="operation"
                                                class="table table-striped table-hover table-borderless table-sm w-100 dataTable"
                                                cellspacing="0" role="grid" style="width: 852px;">
                                                <thead>
                                                    <tr role="row">
                                                        <th class="sorting_disabled dt-username text-center users-rows users-row-username"
                                                            rowspan="1" colspan="1" style="width: 144.4px;">Usuario</th>
                                                        <th class="sorting_disabled dt-balance text-center users-rows users-row-balance"
                                                            rowspan="1" colspan="1" style="width: 243.4px;">Saldo</th>
                                                        <th class="sorting_disabled dt-actions text-center users-rows users-row-actions"
                                                            rowspan="1" colspan="1" style="width: 435.4px;">Acciones</th>
                                                        <th class="sorting_disabled text-center users-rows users-row-user-id d-none"
                                                            rowspan="1" colspan="1" style="width: 0px;"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr role="row" v-for="(user, index) in paginarArray(main_data, registers_per_page)[actual_page - 1]" :key="index">
                                                        <td style="color:#e42323"
                                                            class="dt-username users-rows users-row-username text-left">
                                                            {{ user.username }}</td>
                                                        <td class="dt-balance users-rows users-row-balance text-right">
                                                            <div>{{ parseNumbers(user.saldo) }} &nbsp; <i class="fas fa-info font-size-custom"
                                                                    style="opacity:0;"></i></div>
                                                        </td>
                                                        <td class=" dt-actions text-center users-rows users-row-actions">
                                                            <div class="d-inline-block">
                                                                <button @click="openModal('ModalMoney','Cobro',user)"
                                                                    class="mb-1 mt-1 ml-0 mr-1 ml-md-2 btn btn-floating green waves-effect waves-light btn-action btn-money btn-collect"
                                                                    title="Cobro (entrada)"><i class="bag-plus-icon"
                                                                        aria-hidden="true"></i>
                                                                </button> 
                                                                <button @click="openModal('ModalMoney','Pago',user)"
                                                                    class="mb-1 mt-1 mx-0 mx-sm-2 btn btn-floating green waves-effect waves-light btn-action btn-money btn-payout"
                                                                    title="Pago (salida)"><i class="bag-minus-icon"
                                                                        aria-hidden="true"></i>
                                                                </button> 
                                                            </div>
                                                            <div class="d-none d-sm-inline-block pl-3">
                                                                <button @click="openModal('ModalMoney','Bonificacion',user)"
                                                                    class="mb-1 mt-1 ml-0 mr-1 ml-md-2 btn btn-floating green waves-effect waves-light btn-action btn-money btn-discount"
                                                                    title="Bonificacion"><i class="fas fa-minus-square"
                                                                        aria-hidden="true"></i>
                                                                </button> 
                                                                <button @click="openModal('ModalMoney','Recargo',user)"
                                                                    class="mb-1 mt-1 mx-0 mx-sm-2 btn btn-floating green waves-effect waves-light btn-action btn-money btn-surcharge"
                                                                    title="Recargo"><i class="far fa-plus-square"
                                                                        aria-hidden="true"></i>
                                                                </button> 
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th scope="col"
                                                            class="dt-username users-rows users-row-username text-right"
                                                            id="FooterTotalText" rowspan="1" colspan="1">Total:</th>
                                                        <th scope="col"
                                                            class="dt-balance users-rows users-row-balance text-right"
                                                            id="FooterTotalAmount" rowspan="1" colspan="1">
                                                            <div data-toggle="popover" data-placement="top" title=""
                                                                data-html="true"
                                                                data-content="Memoria: 45.551,40<br>A pagar: 18.114.608,65"
                                                                data-original-title="">{{ parseNumbers(total) }} &nbsp; <i
                                                                    class="fas fa-info font-size-custom d-none"
                                                                    style="opacity:1;"></i></div>
                                                        </th>
                                                        <th scope="col"
                                                            class="dt-actions text-center users-rows users-row-actions"
                                                            rowspan="1" colspan="1"></th>
                                                        <th scope="col"
                                                            class="text-center users-rows users-row-user-id d-none"
                                                            rowspan="1" colspan="1"></th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <div class="bottom row">
                                                <div class="dataTables_length col-12 col-md-5 order-2 order-md-1"
                                                    id="operation_length">
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
                                                <div class="dataTables_paginate paging_simple_numbers col-12 col-md-7 order-1 order-md-2"
                                                    id="operation_paginate">
                                                    <pagination :options="{texts:{count:''}}" v-model="actual_page" :records="records" :per-page="registers_per_page" @paginate="paginate"/>
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
        <div class="modal fade" id="ModalMoney" tabindex="-1" role="dialog" aria-labelledby="Money" aria-hidden="true">
            <div class="modal-dialog modal-sm cascading-modal" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center gradient-card-header green-gradient">
                        <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalMoneyTitle">
                            {{ actions.type }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3 px-1">
                        <div class="col text-center px-0" id="ModalMoneyContent">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-modal-addon">
                                        <i class="fas fa-user" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input type="text" v-model="actions.user.username" style="color:#e42323;" class="d-inline-block form-control form-modal-input modal-clear-val"
                                    id="" readonly="">
                                <input type="text" :value="parseNumbers(actions.user.saldo)"
                                    class="d-inline-block form-control form-modal-input modal-clear-val text-right"
                                    id="ModalMoneyDestinationBalance" readonly="">
                                <input type="hidden" class="modal-clear-val" id="ModalCreditDestinationId">
                            </div>
                            <div class="row mb-4 px-0">
                                <div class="input-group col-8 col-xl-8 pr-1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text input-modal-addon">
                                            <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="text" @input="parseNumbers('','ModalMoneyAmount')" class="form-control form-modal-input text-right"
                                        id="ModalMoneyAmount" autocomplete="off" value="0">
                                </div>
                                <div class="input-group col-4 col-xl-4 p-0 text-center">
                                    <!-- CONDITION NumberFormat1 BEGIN -->
                                    <button @click="addValue('ModalMoneyAmount',50)"
                                        class="mb-1 mt-1 mr-1 btn btn-floating green waves-effect waves-light btn-action btn-money-mod btn-add"
                                        step="50" id="ModalMoneyAdd" title="Aumentar"><i class="fas fa-plus"
                                            aria-hidden="true"></i></button>
                                    <button @click="removeValue('ModalMoneyAmount',50)"
                                        class="mb-1 mt-1 btn btn-floating green waves-effect waves-light btn-action btn-money-mod btn-deduct"
                                        step="-50" id="ModalMoneyDeduct" title="Disminuir"><i class="fas fa-minus"
                                            aria-hidden="true"></i></button>
                                    <!-- CONDITION NumberFormat1 END -->
                                </div>
                            </div>
                            <div class="row px-4 px-sm-2 mb-2 px-xl-2">
                                <div class="input-group col-12 p-0 text-center">
                                    <!-- CONDITION NumberFormat1 BEGIN -->
                                    <button @click="addValue('ModalMoneyAmount',100)"
                                        class="mb-1 mt-1 mr-4 mr-sm-2 mr-xl-2 btn btn-outline-green btn-sm px-3 waves-effect waves-light btn-action-sub btn-money-mod btn-add100"
                                        step="100" id="ModalMoneyAdd100" title="Aumentar 100"><i class="fas fa-plus"
                                            aria-hidden="true"></i> 100</button>
                                    <button @click="addValue('ModalMoneyAmount',1000)"
                                        class="mb-1 mt-1 mr-4 mr-sm-2 mr-xl-2 btn btn-outline-green btn-sm px-3 waves-effect waves-light btn-action-sub btn-money-mod btn-add1000"
                                        step="1000" id="ModalMoneyAdd1000" title="Aumentar 1.000"><i class="fas fa-plus"
                                            aria-hidden="true"></i> 1.000</button>
                                    <button @click="addValue('ModalMoneyAmount',10000)"
                                        class="mb-1 mt-1 btn btn-outline-green btn-sm px-3 waves-effect waves-light btn-action-sub btn-money-mod btn-add10000"
                                        step="10000" id="ModalMoneyAdd10000" title="Aumentar 10.000"><i
                                            class="fas fa-plus" aria-hidden="true"></i> 10.000</button>
                                    <!-- CONDITION NumberFormat1 END -->
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div v-if="showCommentInput"
                                    class="col-12 text-center md-form  font-size-custom2">
                                    <input v-model="actions.comment" type="text" class="modal-clear-val form-control form-modal-input"
                                        id="ModalMoneyComment" aria-label="Comment" maxlength="128">
                                    <label class="px-3" for="ModalMoneyComment">Comentario...</label>
                                </div>
                            </div>
                            <div class="row pt-1 pb-1">
                                <div class="col-4 offset-2 input-group text-center ticket-button file-field">
                                    <div class="btn btn-floating green-gradient float-left waves-effect waves-light" style="display: none;">
                                        <i class="far fa-file-image" aria-hidden="true"></i>
                                        <input type="file" class="modal-clear-val" id="ModalMoneyTicket"
                                            accept="image/*" title="Adjuntar comprobante">
                                    </div>
                                </div>
                                <div class="col-6 input-group text-center comment-button">
                                    <button type="button" @click="showCommentInput = !showCommentInput"
                                        class="btn btn-floating green-gradient waves-effect waves-light"
                                        id="ModalMoneyCommentButton" title="Añadir un comentario">
                                        <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div v-if="error != ''">
                                <span style="color:red;">{{ error }}</span>
                            </div>
                            <div class="row">
                                <div class="col-12 text-center modal-clear-hide ticket-image">
                                    <div class="z-depth-1-half align-items-center mb-4">
                                        <div class="modal-clear-hide ticket-image-delete">
                                            <i class="fas fa-times-circle mx-2"></i>
                                        </div>
                                        <img src="" id="TicketPreview">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 modal-clear-hide text-center" id="ModalMoneyError"></div>
                                <div class="col modal-clear-hide text-center" id="ModalMoneyLoading">
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
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center py-2">
                        <button type="button" class="btn btn-outline-green px-3 waves-effect waves-light" @click="closeModal()"
                            data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-green px-3 waves-effect waves-light" @click="dispatchAction()"
                            id="ModalMoneySubmit">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div></template>
<script>
import axios from 'axios';
import Pagination from 'vue-pagination-2';
export default {
    name: 'finanzasJugadorOperaciones',
    components: {Pagination},
    data() {
        return {
            showCommentInput:false,
            main_data: [],
            total:0,
            actual_page: 1,
            registers_per_page: 50,
            pages:[],
            records:0,
            actions:{
                type:"",
                user:{},
                capital:0,
                comment:""
            },
            error:'',
            search:""
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
        site(){
            return this.$store.getters['getSite'];
        },        
        apiUrlnew(){
            return this.$store.getters['getApiUrlnew'];
        },
        userInfo(){
            return this.$store.getters["getUserData"];
        }
    },
    methods: {
        async get_data() {
            this.total = 0;
            function ordered(a, b) {
                if (a.username[0].toLowerCase() < b.username[0].toLowerCase()) {
                    return -1;
                }
                if (a.username[0].toLowerCase() > b.username[0].toLowerCase()) {
                    return 1;
                }
                return 0;
            }
            let response = await axios.post(this.apiUrlnew + "saldosfinanzas", {
                "login_Id": this.main_tree.id,
                "token":this.userInfo.token,
                "site":this.site
            })
            if (response.data) {
                if (this.search != "") {
                    this.main_data = response.data.filter(user => user.username.toLowerCase().includes(this.search.toLowerCase())).sort((a,b)=>ordered(a,b));
                    this.main_data.forEach(user => {
                        this.total += user.saldo
                    });
                }
                else{
                    this.main_data = response.data.filter(item => item.roles.includes('APOSTADOR')).sort((a, b) => ordered(a, b))
                    this.main_data.forEach(user => {
                        this.total += user.saldo
                    });
                }
            }
        },
        openModal(target,action,user){
            try {
                this.backdrop(true);
                let modal = document.getElementById(target);
                modal.classList.add("show");
                modal.style.display = "block";
                this.actions.type = action;
                this.actions.user = user;
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
            this.actions = {
                type:"",
                user:{},
                capital:0,
                comment:""
            }
            this.error = '';
        },
        searchText() {
            this.actual_page=1;
            this.search = document.getElementById("UserSearch").value;
            this.get_data();
        },
        paginate(page){
            this.actual_page = page;
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
        floatToText(number,digits){
            let text1 = new Intl.NumberFormat("de-DE",{minimumFractionDigits:digits, maximumFractionDigits: digits}).format(number);
            let parsed = text1.replaceAll("."," ").replace(",",".");
            return parsed
        },
        textToFloat(text){
            let dot_qty = 0;
            let parsed = "";
            for (let index = 0; index < text.length; index++) {
                const char = text[index];
                if(char == " "){
                    dot_qty++;
                }
            }
            if(dot_qty>=1){
                parsed = text.replaceAll(" ","").replace(",",".");
            }
            else{
                parsed = text.replace(",",".");
            }
            return parseFloat(parsed);
        },
        addValue(target,val){
            let element =  document.getElementById(target);
            let floatNumber = this.textToFloat(element.value);
            let newVal = floatNumber + val;
            element.value = this.floatToText(newVal);
            this.parseNumbers('',target);
        },
        removeValue(target,val){
            let element =  document.getElementById(target);
            let floatNumber = this.textToFloat(element.value);
            let newVal = floatNumber - val < 0 ? 0 : floatNumber - val;
            element.value = this.floatToText(newVal);
            this.parseNumbers('',target);
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
        async dispatchAction(){
            try {
                let endpoint = "";
                if(this.actions.type == "Cobro"){
                    endpoint = "cobro";
                }
                else if(this.actions.type == "Pago"){
                    endpoint = "pago"
                }
                else if(this.actions.type == "Bonificacion"){
                    endpoint = "bono"
                }
                else if(this.actions.type == "Recargo"){
                    endpoint = "recargo"
                }
                document.getElementById("ModalMoneySubmit").disabled = true
                let response = await axios.post(this.apiUrlnew+endpoint,{
                    "capital": this.actions.capital,
                    "motivo":this.actions.type,
                    "user": this.actions.user.user,
                    "comentario": this.actions.comment,
                    "login_Id": this.main_tree.id,
                    "token": this.userInfo.token,
                    "site": this.site
                });
                if(response.data){
                    if(response.data.status == 'success'){
                        this.closeModal()
                        this.get_data();
                        document.getElementById('ModalMoneyAmount').value = '0';
                    }
                    else{
                        this.error = response.data
                    }
                }
                else{
                    this.error = "Error en el proceso, intente nuevamente o contacte a soporte"
                }
                document.getElementById("ModalMoneySubmit").disabled = false
            } 
            catch (error) {
                console.log(error);
                this.error = "Error en el proceso, intente nuevamente o contacte a soporte"
                document.getElementById("ModalMoneySubmit").disabled = false
            }
        }
    },
    mounted() {
        this.get_data();
    },
}
</script>