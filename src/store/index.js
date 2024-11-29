/* eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _get from 'lodash.get';
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        months:{
            "01":"Jan",
            "02":"Feb",
            "03":"Mar",
            "04":"Apr",
            "05":"May",
            "06":"Jun",
            "07":"Jul",
            "08":"Aug",
            "09":"Sep",
            "10":"Oct",
            "11":"Nov",
            "12":"Dec",
        },
        renderStats:false,
        chartDataNetwinMonth:{casino:[],deportes:[]},
        chartDataNetwinDay:{casino:[],deportes:[]},
        chartDataTopAgentes:[],
        chartDataNetwinTotal:{},
        jivoElement1: null,
        desktopButton: null,
        mobileButton: null,
        globalClass: null,
        skins:{},
        arbolJerarquia:{},
        dashboard_view:"stats",
        main_tree:{},
        target_user:0,
        users_capital:[],
        casinoBrands:[],
        allCasinoBrands:[],
        loading_capital:false,
        show_hidden_tree:false,
        loadingReport:false,
        reportData:{casino:{},deportes:{},poker:{},bingo:{},fichas:{},paneles:{},totales:{casino:0,poker:0,deportes:0,bingo:0}},
        reportDataCargas:{},
        reportDeportes:[],
        reportCasino:[],
        reportPoker:[],
        hostName:'',
        apiHost: '',
        apiHostnew:'',
        domain: '',
        site_id: '',
        showChangePassword:false,
        user:{
            token:"",
            id:0,
            name:"",
            balance:0,
            currency:"",
            site_id:0,
            site:"",
            prefix:"",
        },
        widget_load:false,
        jivo_modal_flag:false,
        message_recived:false,
        selectedUserId: 0,
        selectedUserName: '',
    },
    mutations:{
        updateSelectedUser(state, payload) {
            state.selectedUserId = payload.id;
            state.selectedUserName = payload.userName;
        },
        setDomain(state,payload){
            state.domain = payload.domain;
            state.site_id = payload.site_id
          },
        setHostName(state,payload){
            state.hostName = payload;
          },
        setApiHost(state,payload){
            state.apiHost = payload;
          },
          setApiHostnew(state,payload){
            state.apiHostnew = payload;
          },
        setShowChangePassword(state,payload){
            state.showChangePassword = payload
          },
        setRenderStats(state,payload){
            state.renderStats = payload
        },
        SET_JIVO_ELEMENT1(state, payload) {
            state.jivoElement1 = payload;
        },
        SET_DESKTOP_BUTTON(state, payload) {
            state.desktopButton = payload;
        },
        SET_MOBILE_BUTTON(state, payload) {
            state.mobileButton = payload;
        },
        SET_GLOBAL_CLASS(state, payload) {
            state.globalClass = payload;
        },
        setMainView(state,payload){
            state.skins = payload[0];
        },
        logout(state){
            state.user = {
                token:"",
                id:0,
                name:"",
                balance:0,
                currency:"",
                site_id:0,
                site:"",
                prefix:"",
            }
            state.chartDataNetwinMonth = {casino:[],deportes:[]}
            state.chartDataNetwinDay = {casino:[],deportes:[]}
            state.chartDataTopAgentes = []
            state.chartDataNetwinTotal = {}
            state.target_user = 0
            state.arbolJerarquia = {}
            state.main_tree = {}
            state.users_capital = []
            localStorage.removeItem("loginToken")
            localStorage.removeItem("supportId")
            localStorage.removeItem("apiHost")
            if(router.currentRoute.name!="login"){
                router.push({ name: 'login' })
            }
            const jivoElement1 = document.getElementById('jcont');
            const jivoElement2 = document.querySelector('.wrap_ace7._orientationLeft_f7c0.__jivoDesktopButton');
            if (jivoElement1) {
                jivoElement1.style.display = 'none';
            }
            else if (jivoElement2) {
                jivoElement2.style.display = 'none';
            }
            const jivoMobileElemen1 = document.querySelector('.wrap_ace7._orientationLeft_f7c0.__jivoMobileButton');
            const jivoMobileElement2 = document.querySelector('.globalClass_ff86.global_f973.__light_a48c.__grey_d0b1');

            if (jivoMobileElemen1 ) {
                jivoMobileElemen1.style.display = 'none'; // Ocultar el elemento móvil
            }else if (jivoMobileElement2 ) {
                jivoMobileElement2.style.display = 'none'; // Ocultar el elemento móvil
            }

            state.jivo_modal_flag = false
        },
        setJivo_modal_flag(state,payload){
            state.jivo_modal_flag = payload;
        },
        setJivo_modal_flag(state,payload){
            state.jivo_modal_flag = payload;
        },
        setMessage(state,payload){
            state.message_recived = payload;
        },
          setWidget(state,payload){
            state.widget_load=payload;
        },
        setchartDataNetwinMonth(state,payload){
            state.chartDataNetwinMonth = payload
        },
        setchartDataNetwinDay(state,payload){
            state.chartDataNetwinDay = payload
        },
        setchartDataNetwinTotal(state,payload){
            state.chartDataNetwinTotal = payload
        },
        setchartDataTopAgentes(state,payload){
            state.chartDataTopAgentes = payload
        },
        setReportDataCargas(state,payload){
            state.reportDataCargas = payload
        },
        setReportDeportes(state,payload){
            state.reportDeportes = payload
        },
        setReportCasino(state,payload){
            state.reportCasino = payload
        },
        setReportPoker(state,payload){
            state.reportPoker = payload
        },
        setMainTree(state,payload){
            state.main_tree = payload;
        },
        setLoadingReport(state,payload){
            state.loadingReport = payload;
        },
        setUsersCapital(state,payload){
            state.users_capital = payload
        },
        setDashboardView(state,payload){
            state.dashboard_view = payload
        },
        setToken(state,payload){
            state.user.token = payload.token;
            state.user.site_id = payload.site_id;
            state.user.site = payload.site;
            state.user.prefix = payload.prefix;
        },
        setBalance(state,payload){
            state.user.name = payload.data.username;
            state.user.id = payload.data.id;
            state.user.balance = payload.data.balance;
            state.user.currency = payload.data.currency;
            state.user.providers = payload.data.proveedores;
            setTimeout(() => {
                if(state.user.token != ""){
                state.widget_load = true
        
                jivo_api.setCustomData([
                {
                    "content": "User Name: "+payload.data.username,
                },
                {
                    "content": "User id: "+payload.data.id,
                },
                {
                    "content": "Rol: Agente",
                },
                {
                    "content": "Balance: "+payload.data.balance,
                },
                {
                    "content": "Currency: "+payload.data.currency,
                },
                {
                    "content": "Site: "+ state.user.site,
                },
                ])
            }
        }, 5000);
        },
        setLoadingCapital(state,payload){
            state.loading_capital = payload;
        },
        setTargetUser(state,payload){
            state.target_user = payload;
        },
        hideUser(state,payload){
            state.main_tree.hijos.forEach(children=>{
                if(children.id == payload){
                    children.show = false;
                }
            })
            state.users_capital.forEach(children=>{
                if(children.user == payload){
                    children.show = false;
                }
            })
            let hiddenIds = state.users_capital.filter(children=>!children.show).map(user=>user.user);
            localStorage.setItem("hiddenUsers",JSON.stringify(hiddenIds))
        },
        showUser(state,payload){
            state.main_tree.hijos.forEach(children=>{
                if(children.id == payload){
                    children.show = true;
                }
            })
            state.users_capital.forEach(children=>{
                if(children.user == payload){
                    children.show = true;
                }
            })
            let hiddenIds = state.users_capital.filter(children=>!children.show).map(user=>user.user);
            localStorage.setItem("hiddenUsers",JSON.stringify(hiddenIds))
        },
        showHiddenTree(state,payload){
            state.show_hidden_tree = payload
        },
        refreshReport(state){
            state.reportData = {casino:{},deportes:{},poker:{},bingo:{},fichas:{},paneles:{},totales:{casino:0,poker:0,deportes:0,bingo:0}}
        },
        setReportData(state,payload){
            state.reportData.casino = payload.casino;
            state.reportData.deportes = payload.main.filter(item=>item.tipo_apuesta.toLowerCase()=="deportes")[0]??{};
            state.reportData.poker = payload.main.filter(item=>item.tipo_apuesta.toLowerCase()=="poker")[0]??{};
            state.reportData.bingo = payload.main.filter(item=>item.tipo_apuesta.toLowerCase()=="bingo")[0]??{};
            state.reportData.fichas = payload.fichas;
            state.reportData.paneles = payload.paneles;
            state.reportData.totales.deportes = state.reportData.deportes.netwin||0 - state.reportData.deportes.comision||0;
            state.reportData.totales.casino = state.reportData.casino.netwin||0 - state.reportData.casino.comision||0;
            state.reportData.totales.poker = state.reportData.poker.netwin||0 - state.reportData.poker.comision||0;
            state.reportData.totales.bingo = state.reportData.bingo.netwin||0 - state.reportData.bingo.comision||0;
        },
        setCasinoBrands(state,payload){
            state.allCasinoBrands = payload;
            state.casinoBrands = payload.filter(brand => brand.status);
        },
        setArbolJerarquia(state,payload){
            state.arbolJerarquia = payload;
        }
    },
    actions:{
        updateSelectedUserAction({ commit }, payload) {
            // Llama a la mutación desde la acción
            commit('updateSelectedUser', payload);
        },
        idleLogout(state){
            var t;
            window.onload = resetTimer;
            window.onmousemove = resetTimer;
            window.onmousedown = resetTimer;    // catches touchscreen presses as well
            window.ontouchstart = resetTimer;   // catches touchscreen swipes as well
            window.ontouchmove = resetTimer;    // required by some devices
            window.onclick = resetTimer;        // catches touchpad clicks as well
            window.onkeydown = resetTimer;
            window.addEventListener('scroll', resetTimer, true); // improved; see comments

            function logOut() {
                state.commit("logout");
            }

            function resetTimer() {
                clearTimeout(t);
                t = setTimeout(logOut, 600000*3);  // time is in milliseconds 30min
            }
        },
        async setMessage(state, payload){
            await state.commit("setMessage", payload)
        },
        setDashboardView(state,payload){
            state.commit("setDashboardView",payload);
        },
        showHiddenTree(state,payload){
            state.commit("showHiddenTree",payload);
        },
        async getWidget(state) {
            const jivoScript = document.createElement('script');
            const existsJivoId = localStorage.getItem('supportId')
            if(existsJivoId){
                jivoScript.src = "//code.jivosite.com/widget/BUVOIAx1s8";
            }
            else{
                jivoScript.src = "//code.jivosite.com/widget/BUVOIAx1s8";
                localStorage.setItem('supportId','BUVOIAx1s8')
            }
            
            jivoScript.async = true;
            document.head.appendChild(jivoScript);
        },
        async getMainTree(state, payload) {
            state.commit("setLoadingCapital", true);
            let hiddenUsers = localStorage.getItem("hiddenUsers") ? JSON.parse(localStorage.getItem("hiddenUsers")) : [];
            
            try {
                // Intentar la primera petición con GET
                let response = await axios.get(
                    localStorage.getItem('setApiHostnew') + "new_jerarquia", {
                        params: {
                            "user_id": payload.data.id,
                            "token": state.state.user.token,
                            "site": localStorage.getItem('site_id')
                        }
                    }
                );
        
                // Verificar si la respuesta es válida
                if (response.data.status !== "success") {
                    throw new Error("Datos no válidos en la respuesta GET");
                }
        
                // Procesar los datos si la respuesta es válida
                await state.dispatch("processMainTreeData", { payload, response, hiddenUsers });
        
            } catch (error) {
                console.log(error);
                try {
                    // Si la primera petición falla, intentar la segunda con POST
                    let response = await axios.post(
                        state.state.apiHost + "/new_jerarquia", {
                            "user_id": payload.data.id,
                            "token": state.state.user.token
                        }
                    );
        
                    // Verificar si la respuesta es válida
                    if (response.data.status === "success") {
                        await state.dispatch("processMainTreeData", { payload, response, hiddenUsers });
                    }
                } catch (error) {
                    console.log(error);
                    state.commit("logout");
                }
            } finally {
                state.commit("setLoadingCapital", false);
            }
        },
        async processMainTreeData(state, { payload, response, hiddenUsers }) {
            response.data.data = response.data.data[0];
        
            if (!payload.data.flag) {
                state.commit("setArbolJerarquia", response.data);
            }
        
            let main_tree = {
                id: response.data.data.id,
                user_name: response.data.data.name,
                rol: response.data.data.roles.split('"')[1],
                show: true,
                hijosflag: true,
                enabled: response.data.data.enabled,
                hijos: []
            };
        
            let address = "hijos";
            const getHijos = (obj, addr) => {
                try {
                    let role = obj.roles?.split('"')[1];
                    (obj.hijos ?? []).forEach((hijo, index) => {
                        if (hijo.id != response.data.data.id) {
                            let target = _get(main_tree, addr);
                            target.push({
                                id: hijo.id,
                                user_name: hijo.name,
                                role: role,
                                show: hiddenUsers.includes(hijo.id) ? false : true,
                                enabled: hijo.enabled,
                                tree_addr: "data." + addr + "[" + index + "]",
                                hijosflag: hijo.hijos !== undefined ? true : false,
                                hijos: []
                            });
                        }
                    });
                } catch (error) {
                    console.log(error, addr);
                }
            };
        
            getHijos(response.data.data, address);
        
            main_tree.hijos.sort((a, b) => a.user_name?.localeCompare(b.user_name));
            main_tree.hijos.forEach((hijo, index) => {
                hijo.main_addr = "hijos[" + index + "]";
            });
        
            state.commit("setTargetUser", { id: payload.data.id, name: payload.data.username ?? payload.data.name });
            state.dispatch("getUsersCapital", response.data.data);
        
            if (!payload.data.flag || payload.data.id === state.state.main_tree.id) {
                state.commit("setMainTree", main_tree);
            }
        },
        addChildrenToTree(state,payload){
            let originalTree = state.state.arbolJerarquia;
            let mainTree = state.state.main_tree;
            let target = _get(mainTree,payload.main_addr+'.hijos');
            let children = _get(originalTree,payload.tree_addr);
            let hiddenUsers = localStorage.getItem("hiddenUsers") ? JSON.parse(localStorage.getItem("hiddenUsers")) : [];
            if(target && children){
                target = Vue.set(_get(mainTree,payload.main_addr) ,'hijos',children.hijos.map((hijo,index)=>{
                    let role = hijo.roles?.split('"')[1];
                    return {
                        id:hijo.id,
                        user_name:hijo.name,
                        role:role,
                        show:hiddenUsers.includes(hijo.id)?false:true,
                        enabled: hijo.enabled,
                        tree_addr: payload.tree_addr+".hijos["+index+"]",
                        hijosflag: hijo.hijos !== undefined ? true : false,
                        hijos:[]
                    }
                }))
                target.sort((a,b)=>a.user_name.localeCompare(b.user_name))
                target.forEach((hijo,index)=>{
                    hijo.main_addr = payload.main_addr+".hijos["+index+"]"
                })
                state.commit("setMainTree",mainTree);
            }
        },
        async getChildrenCapital(state,payload){
            try {
                state.commit("setLoadingCapital",true);
                state.commit("setTargetUser",payload);
                if(!state.state.arbolJerarquia.status){
                    state.dispatch("getMainTree", {data:{id: payload.id, username: state.state.target_user.name, flag: false}})
                }
                if(state.state.arbolJerarquia.status=="success"){
                    state.dispatch("getMainTree", {data:{id: payload.id, username: state.state.target_user.name, flag: true}})
                }
                else{
                    state.commit("setUsersCapital",[])
                    state.commit("setLoadingCapital",false);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getChildrenCapital2(state,payload){
            try {
                state.commit("setLoadingCapital",true);
                state.commit("setTargetUser",payload);
                state.dispatch("getMainTree", {data:{id: payload.id, username: state.state.target_user.name, flag: true}})
            } catch (error) {
                console.log(error);
            }
        },
        async getChildrenTree(state, payload){
            state.commit("setLoadingCapital",true);
            state.commit("setTargetUser",payload);
            const mainTree = state.state.arbolJerarquia.data;
            let childrenTree = {};
            const getTree = (obj)=>{
                try {
                    let role = obj.roles?.split('"')[1];
                    if(role!="ROLE_PROMOTOR"){
                        return false
                    }
                    else{
                        if(obj.id === payload.id){
                            childrenTree = obj
                            return false
                        }
                        if (obj.hijos !== undefined) {
                            obj.hijos.forEach(hijo=>{
                                getTree(hijo);
                            })
                        }
                    }
                } catch (error) {
                    console.log(error);
                }  
            }
            getTree(mainTree);
            state.dispatch("getUsersCapital",childrenTree);
            state.commit("setLoadingCapital",false);
        },
        async getChildrenByName(state, payload){
            state.commit("setLoadingCapital",true);
            if(payload !== "") {
                let result = await axios.post(state.state.apiHostnew+"buscar_capital", {
                    "username": payload,
                    "login_Id": state.state.main_tree.id,
                    "token": state.state.user.token
                })
                let children = result.data.map(user=>{
                    return {
                        user: user.user,
                        username: user.username,
                        role: user.roles.split('"')[1],
                        capital_total: user.capital_total,
                        enabled: user.enabled,
                        show: true
                    }
                })
                state.commit("setUsersCapital",children)
                state.commit("setLoadingCapital",false);
            }
            else {
                const mainTree = state.state.arbolJerarquia.data;
                state.dispatch("getUsersCapital",mainTree);
            }
        },
        async login(state,payload){
            try {
                if(!payload.token){
                    const response = await axios.get(
                        state.state.domain+'/oauth/v2/token?username='+payload.username+'&password='+payload.password+'&client_id=1_5i50wo24kpcscc0okw0ww4gsc8kwg0k8gs0ok44skooww4swcg&client_secret=18qxs6584gw08scg8wsk8gow44oc4gcw40c4o8w44880g0gkcg&grant_type=password&source=pn');
                    let token = response.data.access_token;
                    let user_data = {
                        token:token,
                        site_id:state.state.site_id,
                        prefix:'api',
                        site:'jugar'
                    }
                    localStorage.setItem("loginToken",token);
                    localStorage.setItem("apiHost",state.state.apiHost);
                    state.commit("setToken",user_data);
                    state.dispatch("getUserData",user_data);
                    state.commit("setDashboardView","users");
                    return "success";
                }
                else{
                    let user_data = {
                        token:payload.token,
                        site_id:state.state.site_id,
                        prefix:'api',
                        site:'jugar'
                    }
                    state.commit("setApiHost",localStorage.getItem('apiHost'))
                    localStorage.setItem("loginToken",payload.token);
                    state.commit("setToken",user_data);
                    state.dispatch("idleLogout");
                    state.dispatch("getUserData",user_data);
                    if (router.currentRoute !== 'dashboard') router.push({ name: 'dashboard' })
                    
                    return "success";
                }
            } catch (error) {
            console.log(error);
                localStorage.removeItem("loginToken")
                return 'Usuario o clave invalidos! Intenta nuevamente.';
            }
        },
        async getAuditoria(state, payload) {
            try {
                // Intentar la primera petición con GET
                let data = await axios.get(localStorage.getItem('setApiHostnew') + "auditoria", {
                    params: {
                        "login_Id": payload.id,
                        "site": localStorage.getItem('site_id'),
                        "token": state.state.user.token
                    }
                });
        
                // Verificar si los datos son válidos
                if (data.data && data.data.length > 0) {
                    if (data.data[0].descripcion == "Agente cambio su clave") {
                        state.commit("setShowChangePassword", true);
                    }
                    return data.data;
                } else {
                    throw new Error("Datos no válidos en la respuesta GET");
                }
            } catch (error) {
                try {
                    // Si la primera petición falla o los datos no son válidos, intentar la segunda con POST
                    let data = await axios.post(state.state.apiHost + "/auditoria", {
                        "login_Id": payload.id
                    });
        
                    // Verificar si los datos son válidos
                    if (data.data && data.data.length > 0 && data.data[0].descripcion == "Agente cambio su clave") {
                        state.commit("setShowChangePassword", true);
                    }
                    return data.data;
                } catch (error) {
                    // Si ambas peticiones fallan, retornar un array vacío
                    return [];
                }
            }
        },
        async getUserData(state, payload) {
            try {

                let site_id = localStorage.getItem('site_id');
                // Intentar la primera petición con GET
                const response2 = await axios.get(
                    localStorage.getItem('setApiHostnew') + 'balance',
                    {
                        params: {
                            "site": site_id,
                            "token": payload.token
                        }
                    }
                );
        
                // Verificar si la respuesta es válida
                if (response2.data.code) {
                    throw new Error("Datos no válidos en la respuesta GET");
                }
        
                // Procesar los datos si la respuesta es válida
                await state.dispatch("processUserData", { response2, payload });
        
            } catch (error) {
                console.log(error);
                try {
                    // Si la primera petición falla, intentar la segunda con POST
                    const response2 = await axios.post(
                        state.state.apiHost + '/balance',
                        { "token": payload.token }
                    );
        
                    // Verificar si la respuesta es válida
                    if (!response2.data.code) {
                        await state.dispatch("processUserData", { response2, payload });
                    } else {
                        throw new Error("Datos no válidos en la respuesta POST");
                    }
                } catch (error) {
                    console.log(error);
                    localStorage.removeItem("loginToken");
                    state.commit("setToken", {
                        token: "",
                        site_id: payload.site_id,
                        site: payload.site,
                        prefix: payload.prefix
                    });
                    state.commit("logout");
                }
            } finally {
                state.commit("setLoadingCapital", false);
            }
        },
        
        async processUserData(state, { response2, payload }) {
            state.commit("setBalance", { data: response2.data });
            state.dispatch("getAuditoria", response2.data);
            state.commit("setCasinoBrands", response2.data.proveedores.casino);
        
            if (!payload.origin) {
                console.log(response2.data);
                state.dispatch("getChartsData",response2.data.id) 
                state.dispatch("getMainTree", { data: response2.data });
            }
        }
        ,
        async getUsersCapital(state, payload) {
            try {
                // Intentar la primera petición con GET
                let capitales = await axios.get(localStorage.getItem('setApiHostnew')+ "capitales", {
                    params: {
                        "user_id": payload.id,
                        "site": localStorage.getItem('site_id'),
                        "token": state.state.user.token
                    }
                });
        
                // Verificar si la respuesta es válida
                if (!capitales.data || capitales.data.length === 0) {
                    throw new Error("Datos no válidos en la respuesta GET");
                }
        
                // Despachar acción para procesar los datos
                state.dispatch("processCapitalData", { payload, capitalData: capitales.data });
        
            } catch (error) {
                try {
                    // Si la primera petición falla, intentar la segunda con POST
                    let capitales = await axios.post(state.state.apiHost + "/capitales", {
                        "user_id": payload.id,
                        "token": state.state.user.token
                    });
        
                    // Despachar acción para procesar los datos
                    if (capitales.data && capitales.data.length > 0) {
                        state.dispatch("processCapitalData", { payload, capitalData: capitales.data });
                    }
                } catch (error) {
                    console.log(error);
                }
            } finally {
                state.commit("setLoadingCapital", false);
            }
        },
        async processCapitalData(state, { payload, capitalData }) {
            let hiddenUsers = localStorage.getItem("hiddenUsers") ? JSON.parse(localStorage.getItem("hiddenUsers")) : [];
            let hijosArray = [];
        
            if (payload.hijos) {
                payload.hijos.forEach(hijo => {
                    try {
                        if (hijo.roles.includes("ROLE_PROMOTOR")) {
                            const userCapital = capitalData.find(user => user.user === hijo.id);
                            hijosArray.push({
                                user: hijo.id,
                                username: hijo.name,
                                role: hijo.roles.split('"')[1],
                                capital_total: userCapital.capital_total,
                                enabled: hijo.enabled,
                                secondaryRole: userCapital.secondaryRole,
                                show: true
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        
            capitalData.forEach(user => {
                if (user.role === "ROLE_APOSTADOR") {
                    hijosArray.push({
                        user: user.user,
                        username: user.username,
                        role: user.role,
                        capital_total: user.capital_total,
                        enabled: user.enabled,
                        show: true
                    });
                }
            });
        
            let filtered = hijosArray.filter(user => (user.role == "ROLE_PROMOTOR" || user.role == "ROLE_APOSTADOR") && user.user != state.state.target_user.id);
            filtered = filtered.map(function(user) {
                user.show = !hiddenUsers.includes(user.user);
                return user;
            });
        
            state.commit("setUsersCapital", filtered);
        },
        async getReport(state,payload){
            try {
                // console.log(payload.id)
                state.commit("setTargetUser",payload.id)
                state.commit("setLoadingReport",true);
                state.commit("refreshReport");
                let report = {data:{}}
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                // Configuración de las tres peticiones
                const request1 = axios.post(state.state.apiHostnew + "casino_reporte_provider", {
                    "startDate": payload.startDate + " " + payload.startHour,
                    "endDate": payload.endDate + " " + payload.endHour,
                    "login_Id": payload.id.id,
                    "timezone": timezoneFormated,
                    "dateType": payload.dateType || null,
                    "site": localStorage.getItem('site_id'),
                    "token": state.state.user.token
                });

                const request2 = axios.post(state.state.apiHostnew + "fichas_paneles_provider", {
                    "login_Id": payload.id.id,
                    "site": localStorage.getItem('site_id'),
                    "token": state.state.user.token
                });

                const request3 = axios.post(state.state.apiHostnew + "movimiento_fichas_provider", {
                    "startDate": payload.startDate + " " + payload.startHour,
                    "endDate": payload.endDate + " " + payload.endHour,
                    "login_Id": payload.id.id,
                    "timezone": timezoneFormated,
                    "dateType": payload.dateType || null,
                    "site": localStorage.getItem('site_id'),
                    "token": state.state.user.token
                });

                // Ejecutar las tres peticiones en paralelo
                const [report1, report2, report3] = await Promise.all([request1, request2, request3]);

                // Procesar las respuestas
                report.data.casinoYDeportes = report1.data.casinoYDeportes;
                report.data.fichas_paneles = report2.data.fichas_paneles;
                report.data.movimientoFichas = report3.data.movimientoFichas;

                // console.log(report.data)
                if(report.data){
                let casino = report.data.casinoYDeportes.filter(item=>item.tipo_apuesta=="Casino"&&!item.provider)[0];
                casino.providers= {};
                let mainProviders = report.data.casinoYDeportes.filter(item=>item.tipo_apuesta=="Casino"&&item.provider).map(item=>item.provider);
                mainProviders = mainProviders.filter((item,index) => mainProviders.indexOf(item) === index);
                mainProviders.forEach(provider=>{
                    let brands = report.data.casinoYDeportes.filter(item=>item.tipo_apuesta=="Casino"&&item.provider&&item.provider==provider);
                    let provObj = {
                        "bet_amount": brands.map(brand=>brand.bet_amount).reduce((a, b) => a + b, 0),
                        "total_bets": brands.map(brand=>brand.total_bets).reduce((a, b) => a + b, 0),
                        "win_amount": brands.map(brand=>brand.win_amount).reduce((a, b) => a + b, 0),
                        "total_win": brands.map(brand=>brand.total_win).reduce((a, b) => a + b, 0),
                        "netwin": brands.map(brand=>brand.netwin).reduce((a, b) => a + b, 0),
                        "comision": brands.map(brand=>brand.comision).reduce((a, b) => a + b, 0),
                        "brands":{}
                    }
                    brands.forEach(brand=>{
                        try {
                            provObj.brands[brand.casa] = brand
                        } catch (error) {
                            console.log(brand.provider.toUpperCase());
                        }
                        })
                    casino.providers[provider.toUpperCase()] = provObj;
                })
                let panelesData = {}
                Object.keys(report.data.fichas_paneles ?? {}).forEach(panel=>{
                    let role = panel.split('"')[1];
                    panelesData[role] = report.data.fichas_paneles[panel];
                })
                state.commit("setReportData",{
                    main:report.data.casinoYDeportes,
                    casino:casino,
                    fichas:report.data.movimientoFichas,
                    paneles:panelesData
                })
                }
                state.commit("setLoadingReport",false);
            } catch (error) {
                console.log(error);
                state.commit("logout");
            }
        },
        async getReportCargas(state, payload) {
            try {
                if (!isNaN(Number(payload.id)) && payload.id.trim() !== "") {
                    state.commit("setTargetUser",payload.id)
    
                    }                
                    state.commit("setLoadingReport", true);
        
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset) < 9 ? 
                    ((-1 * (timeZoneOffset)) < 0 ? '-0' + timeZoneOffset : '0' + timeZoneOffset) : 
                    (-1 * (timeZoneOffset)))) + ":00";
        
                let report = await axios.post(state.state.apiHostnew + "movimiento_fichas", {
                    "username": payload.id,
                    "startDate": payload.startDate + " " + payload.startHour,
                    "endDate": payload.endDate + " " + payload.endHour,
                    "timezone": timezoneFormated,
                    "token": state.state.user.token,
                    "site": state.state.site_id
                });
        
                if (report && report.data) {
                    state.commit("setReportDataCargas", report.data);
                } else {
                    console.log("No se encontró 'data' en la respuesta");
                }
        
                state.commit("setLoadingReport", false);
            } catch (error) {
                state.commit("setLoadingReport", false);
            }
        },        
        async getReportDeportes(state,payload){
            try {
                state.commit("setTargetUser",payload.id)
                state.commit("setLoadingReport",true);
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                let bets = await axios.post(state.state.apiHostnew + "apuestas",{
                    "users": [payload.id.id],
                    "startDate": payload.startDate,
                    "endDate": payload.endDate,
                    "timezone": timezoneFormated,
                    "token":state.state.user.token
                })
                if(bets.data){
                    state.commit("setReportDeportes",bets.data);
                }
                state.commit("setLoadingReport",false);
            } catch (error) {
                console.log(error);
                state.commit("setLoadingReport",false);
            }
        },
        async getReportCasino(state,payload){
            try {
                state.commit("setTargetUser",payload.id)
                state.commit("setLoadingReport",true);
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                let bets = await axios.post(state.state.apiHostnew + "casino_casa_jugador",{
                    "users": [payload.id.id],
                    "startDate": payload.startDate,
                    "endDate": payload.endDate,
                    "provider": payload.provider,
                    "timezone": timezoneFormated
                })
                if(bets.data){
                    state.commit("setReportCasino",bets.data);
                }
                state.commit("setLoadingReport",false);
            } catch (error) {
                console.log(error);
                state.commit("setLoadingReport",false);
            }
        },
        async getReportPoker(state,payload){
            try {
                state.commit("setTargetUser",payload.id)
                state.commit("setLoadingReport",true);
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                let bets = await axios.post(state.state.apiHostnew + "poker_jugador",{
                    "users": [payload.id.id],
                    "startDate": payload.startDate,
                    "endDate": payload.endDate,
                    "timezone": timezoneFormated
                })
                if(bets.data){
                    state.commit("setReportPoker",bets.data);
                }
                state.commit("setLoadingReport",false);
            } catch (error) {
                console.log(error);
                state.commit("setLoadingReport",false);
            }
        },
        async getChartsData(state,payload){
            try {
                const timeZoneOffset = new Date().getTimezoneOffset() / 60;
                const timezoneFormated = ((Math.abs(timeZoneOffset)<9 ?((-1*(timeZoneOffset)) < 0 ? '-0'+timeZoneOffset: '0'+timeZoneOffset):(-1*(timeZoneOffset))))+":00";
                let response = await axios.get(localStorage.getItem('setApiHostnew')+"resumen_mensual",{params:{
                    "login_Id": payload,
                    "timezone": timezoneFormated,
                    "token":state.state.user.token
                }})
                if(response.data){
                    let data = response.data.netwin_mensual.map(item=>{
                        return {
                            "month":state.state.months[item.month.split("-")[1]] + "-" + item.month.split("-")[0].slice(-2),
                            "netwin":item.netwin.toFixed(2),
                            "type":item.tipo_apuesta
                        }
                    });
                    state.commit("setchartDataNetwinMonth",{
                        "casino":data.filter(item=>item.type=="Casino"),
                        "deportes":data.filter(item=>item.type=="Deportes")
                    })
                    let data2 = response.data.netwin_diario.map(item=>{
                        return {
                            "day":item.day.split("-")[2],
                            "netwin":item.netwin.toFixed(2),
                            "type":item.tipo_apuesta
                        }
                    }
                    );
                    state.commit("setchartDataNetwinDay",{
                        "casino":data2.filter(item=>item.type=="Casino"),
                        "deportes":data2.filter(item=>item.type=="Deportes")
                    })
                    let data3 = response.data.top_agentes.map(item=>{
                        return {
                            username:item.username,
                            valor:Math.abs(item.total_valor)
                        }
                    })
                    state.commit("setchartDataTopAgentes",data3)
                    state.commit("setchartDataNetwinTotal",response.data.ganancia_neta)
                }
            } catch (error) {
                console.log(error);
            }
            state.commit("setRenderStats",true);
            state.commit("setDashboardView","stats");
        },
        async setJivo_modal_flag(state, payload){
            state.commit("setJivo_modal_flag", payload)
        },
        logOut(state){
            state.commit("setRenderStats",false);
            state.commit("logout");
        },
        hideUser(state,payload){
            state.commit("hideUser",payload);
        },
        showUser(state,payload){
            state.commit("showUser",payload);
        },
        async getSkin(state){
            try {
                let formated = 'apuestaaqui-86230-owned';
                state.commit('setHostName',formated);
                let site_id = formated.split("-")[0]+"-"+formated.split("-")[1];
                localStorage.setItem("site_id",formated.split("-")[1]);
                const response = await axios.get(process.env.VUE_APP_DATA_SERVER+"get_skin?site_id="+site_id);
                state.commit("setMainView",response.data);
                state.dispatch('getSiteDomain',site_id.split('-')[1])
                state.dispatch('getWidget')
            } catch (error) {
                console.log(error);
            }
        },
        async getSiteDomain(state,payload){
            try {
              const response = await axios.get(
                process.env.VUE_APP_DATA_SERVER+"get_domain?site_id="+payload
              );
              let domain = response.data.domain;
              // state.commit("setDomain",{domain:domain,site_id:payload});
              state.commit("setDomain",{domain:'https://admin.apuestaaqui.club',site_id:'86230'});
              let apiHost = `https://reportes.${domain.split('//')[1].split('admin.')[1]}`;
              let apiHostnew = `https://local-admin.${domain.split('//')[1].split('admin.')[1]}/`;
              localStorage.setItem("setApiHostnew",apiHostnew)
              state.commit("setApiHostnew",apiHostnew);
                state.commit("setApiHost",apiHost);
            } catch (error) {
              console.log(error);
            }
          },
          updateJivoElements(state, payload) {
            state.commit('SET_JIVO_ELEMENT1', payload);
          }
    },
    getters:{
        getSite: state => state.site_id,
        getApiUrl: state => state.apiHost,
        getApiUrlnew: state => state.apiHostnew,
        getSkin: state => state.skins,
        getShowChangePassword: state => state.showChangePassword,
        getModalFlag: state => state.jivo_modal_flag,
        getMessage: state => state.message_recived,
        getDashboardView: state => state.dashboard_view,
        getUserData: state => state.user,
        getMainTree: state => state.main_tree,
        getUsersCapital: state => state.users_capital,
        getLoadingCapital: state => state.loading_capital,
        getTargetUser: state => state.target_user,
        getShowHiddenTree: state => state.show_hidden_tree,
        getReportData: state => state.reportData,
        getReportDataCargas: state => state.reportDataCargas,
        getLoadingReport: state => state.loadingReport,
        getReportDeportes: state => state.reportDeportes,
        getReportCasino: state => state.reportCasino,
        getReportPoker: state => state.reportPoker,
        getChartDataNetwinMonth: state=>state.chartDataNetwinMonth,
        getCurrentSkin: state => state.skins[state.currentSkin],
        jivoElement1: state => state.jivoElement1,
        desktopButton: state => state.desktopButton,
        mobileButton: state => state.mobileButton,
        globalClass: state => state.globalClass,
        getChartDataNetwinDay: state=>state.chartDataNetwinDay,
        getChartTopAgentes: state=>state.chartDataTopAgentes,
        getChartDataNetwinTotal: state=>state.chartDataNetwinTotal,
        getRenderStats: state=>state.renderStats,
        getCasinoBrands: state=>state.casinoBrands,
        getAllCasinoBrands: state=>state.allCasinoBrands
    }
})