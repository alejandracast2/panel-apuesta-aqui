<template>
  <div>
    <main :class="view_type">
      <div class="container-fluid mb-5">
        <section>
          <div class="col-md-12 p-0">
            <div class="row mt-4 mb-3">
              <div class="pt-2 pl-3">
                <h5 class="white-text font-weight-bold">Solicitudes de Retiros</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-xl-9">
                <div class="card">
                  <div class="card-body p-1 px-sm-4">
                    <!-- Spinner de carga -->
                    <div v-if="loading" class="text-center">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Cargando...</span>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-4">
                        <div class="md-form font-size-custom2 mt-2 mb-md-1 my-lg-2">
                          <input type="text" v-model="bankFilter" placeholder="Buscar"
                            class="form-control search-username" maxlength="16">
                        </div>
                      </div>
                      <div class="col-md-3 my-lg-2">
                        <section class="section-preview">
                          <div class="select-wrapper mdb-select col-8">
                            <span class="caret">▼</span>
                            <input type="text" class="select-dropdown w-100 text-center active" @click="showMoreoption"
                              readonly="true" value="" v-model="estado_filter">
                            <ul id="selectEstado" class="dropdown-content select-dropdown w-100 text-center active"
                              style="width: 82.125px; position: absolute; top: 100%; left: 15px; opacity: 1; 
                                                                display: none;">
                              <li :class="estado_filter == 'Todo' ? 'active' : ''"  @click="filterSolicitudes(3)">
                                <span class="filtrable">Todos</span>
                              </li>
                              <li :class="estado_filter ==  'Pendiente' ? 'active' : ''"  @click="filterSolicitudes(0)">
                                <span class="filtrable">Pendientes</span>
                              </li>
                              <li :class="estado_filter == 'Aprobado' ? 'active' : ''"  @click="filterSolicitudes(1)">
                                <span class="filtrable">Aprobados</span>
                              </li>
                              <li :class="estado_filter == 'Rechazado' ? 'active' : ''"  @click="filterSolicitudes(2)">
                                <span class="filtrable">Rechazados</span>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </div>
                    </div>
                    <!-- <div>
                      <input type="text" v-model="bankFilter">
                    </div> -->
                    <table v-if="!loading && solicitudes.length > 0"
                      class="table table-striped table-hover table-borderless table-sm w-100 dataTable no-footer"
                      cellspacing="0" role="grid" style="width: 1193px;">
                      <thead>
                        <th class="sorting_disabled text-center users-rows users-row-balance" rowspan="1" colspan="1"
                          style="width: 298.25px;">Usuario</th>
                        <th class="sorting_disabled text-center users-rows users-row-balance" rowspan="1" colspan="1"
                          style="width: 298.25px;">Valor de retiro</th>
                        <th class="sorting_disabled text-center users-rows users-row-balance" rowspan="1" colspan="1"
                          style="width: 298.25px;">Estado</th>
                        <th class="sorting_disabled text-center users-rows users-row-balance" rowspan="1" colspan="1"
                          style="width: 298.25px;">Acciones</th>
                      </thead>
                      <tbody>
                        <tr v-for="solicitud in paginarArray(solicitudesFiltered, registers_per_page)[actual_page - 1]"
                          :key="solicitud.id" role="row" class="even">
                          <td style="width: 298.25px;" class="users-rows users-row-username text-center text-danger">
                            {{ solicitud.nombre }}</td>
                          <td style="width: 298.25px;" class="users-rows users-row-balance text-center">
                            {{ solicitud.valor }}
                          </td>
                          <td style="width: 298.25px;" class="users-rows users-row-balance text-center">
                            {{ mapEstado(solicitud.estado) }}
                          </td>
                          <td style="width: 298.25px;" class="users-rows users-row-actions text-center">
                            <button
                              class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                              alt="Información de la cuenta" title="Información de la cuenta"
                              @click="openModal(solicitud)">
                              <i class="fas fa-info" aria-hidden="true">
                              </i>
                            </button>
                            <button
                              class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                              alt="Aprobar" title="Aprobar" @click="aprobarSolicitud(solicitud)"
                              :disabled="solicitud.estado != 0" :class="{ 'disabled-btn': solicitud.estado != 0 }">
                              <i class="fas fa-check" aria-hidden="true">
                              </i>
                            </button>
                            <button
                              class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                              alt="Rechazar" title="Rechazar" @click="rechazarSolicitud(solicitud)"
                              :disabled="solicitud.estado != 0" :class="{ 'disabled-btn': solicitud.estado != 0 }">
                              <i class="fas fa-times" aria-hidden="true">
                              </i>
                            </button>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                    <div class="bottom row">
                      <div class="col-12 col-md-6 d-flex" id="">
                        <label class="py-2">Mostrar registros</label>
                        <section class="section-preview">
                          <div class="select-wrapper mdb-select col-8">
                            <span class="caret">▼</span>
                            <input type="text" class="select-dropdown w-100 text-center active"
                              @click="showMaxRegisterSelection" readonly="true" value="" v-model="registers_per_page">
                            <ul id="selectPage" class="dropdown-content select-dropdown w-100 text-center active" style="width: 82.125px; position: absolute; top: -73.391px; left: 15px; opacity: 1; 
                                                                display: none;">
                              <li :class="registers_per_page == 10 ? 'active' : ''" @click="setRegistersPerPage(10)">
                                <span class="filtrable">10</span>
                              </li>
                              <li :class="registers_per_page == 25 ? 'active' : ''" @click="setRegistersPerPage(25)">
                                <span class="filtrable">25</span>
                              </li>
                              <li :class="registers_per_page == 50 ? 'active' : ''" @click="setRegistersPerPage(50)">
                                <span class="filtrable">50</span>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </div>
                      <div class="dataTables_paginate paging_simple_numbers col-12 col-md-6">
                        <pagination :options="{ texts: { count: '' } }" v-model="actual_page" :records="records"
                          :per-page="registers_per_page" @paginate="paginate" />
                      </div>
                    </div>
                    <!-- Mensaje cuando no hay datos -->
                    <div v-if="!loading && solicitudes.length === 0" class="alert alert-warning">
                      No se encontraron solicitudes.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="modal fade show" id="ModalViewInfo" tabindex="-1" role="dialog" aria-labelledby="ViewInfo"
          aria-modal="true">
          <div class="modal-dialog modal-md cascading-modal" role="document">
            <div class="modal-content">
              <div class="modal-header text-center gradient-card-header blue-gradient">
                <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalViewInfoTitle">
                  Información de la cuenta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- <div v-if="errorMessage" class="alert alert-warning alert-dismissible fade show"
                                role="alert">
                                {{ errorMessage }}
                            </div> -->
                <div v-if="Object.keys(info).length < 1" class="col text-center" id="ModalViewInfoLoading">
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
                <div v-else>
                  <div class="col-12 col-sm-12 border-right">
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-2">Nombre del titular:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInfouserid">{{ this.descripcion.name }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-2">Banco:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInfousername">{{ this.descripcion.banco }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-2">Tipo de cuenta:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInfoparent">{{
                        this.descripcion.tipo_cuenta }}</div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-2">Numero de cuenta:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInforole_text">{{ this.descripcion.cuenta
                        }}</div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-2">Valor:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInforole_text">{{ this.info.valor }}</div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-2">Estado:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInforole_text">{{
                        mapEstado(this.info.estado) }}</div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-2">País:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInfobrand">{{ this.descripcion.country }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-3">Fecha de Solicitud:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInfoname">{{
                        formatDate(this.info.created_at) }} </div>
                    </div>
                    <div class="row">
                      <div class="col-5 modal-view-info-data mb-3">Fecha de aceptación:</div>
                      <div class="col-7 modal-view-info-content" id="ModalViewInfoname">{{
                        formatDate(this.info.updated_at) }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer d-flex justify-content-center py-2">
                <button type="button" class="btn btn-cyan px-4 waves-effect waves-light" data-dismiss="modal"
                  @click="closeModal">Cerrar</button>
              </div>
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
export default {
  name: 'miResumen',
  components: { Pagination },
  data() {
    return {
      info: {},
      descripcion: {},
      solicitudes: [],
      solicitudesFiltered: [],
      loading: true,
      main_data: [],
      bankFilter: "",
      actual_page: 1,
      registers_per_page: 10,
      estado_filter: "Todos",
      pages: [],
      records: 0,
    }
  },
  props: ["view_type"],
  computed: {
    apiUrl() {
      return this.$store.getters['getApiUrl'];
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
    filterSolicitudes(estadoSeleccionado) {
    this.estado_filter=estadoSeleccionado;
    this.estado_filter= this.mapEstado(this.estado_filter);
    if (estadoSeleccionado === 3) {
      // Si se selecciona "Todo", no se aplica ningún filtro
      this.solicitudesFiltered = this.solicitudes;
    } else {
      // Filtra las solicitudes basadas en el estado
      this.solicitudesFiltered = this.solicitudes.filter(
        (solicitud) => solicitud.estado === estadoSeleccionado
      );
    }
    this.showMoreoption(); // Cierra el dropdown después de aplicar el filtro
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
    showMoreoption() {
      const dropdown = document.getElementById("selectEstado");
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none"; // Cierra el dropdown si está abierto
      } else {
        dropdown.style.display = "block"; // Abre el dropdown si está cerrado
      }
    },
    showMaxRegisterSelection() {
      document.getElementById("selectPage").style.display = "block";
    },
    setRegistersPerPage(max) {
      document.getElementById("selectPage").style.display = "none";
      this.registers_per_page = max;
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
    closeModal() {
      let modals = document.getElementsByClassName("modal");
      [...modals].forEach(modal => {
        modal.classList.remove("show");
        modal.style.display = "none";
      })
      document.getElementById("modalBackdrop").style.display = "none";
      document.getElementById("modalBackdrop").classList.remove("show");

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
    openModal(solicitud) {
      try {
        this.info = solicitud;
        this.backdrop(true);
        let modal = document.getElementById("ModalViewInfo");
        modal.classList.add("show");
        modal.style.display = "block";
        this.descripcion = this.parseDescripcion(this.info.descripcion);
      } catch (error) {
        console.log(error);
      }
    },
    paginate(page) {
      this.actual_page = page;
    },
    async fetchSolicitudes() {
      try {
        const response = await axios.get(this.apiUrlnew + 'get_solicitud', {
          params: {
            "login_Id": this.userInfo.id,
            "token": this.userInfo.token,
          }
        });
        this.solicitudes = response.data;// Asigna los datos de la API
        this.solicitudesFiltered = response.data;
        console.log(this.solicitudes)

      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
      } finally {
        this.loading = false; // Finaliza la carga
      }
    },
    parseDescripcion(descripcion) {
      try {
        // Intenta parsear la descripción como JSON
        const parsed = JSON.parse(descripcion);
        return parsed;
      } catch {
        // Si no es JSON válido, devuelve la descripción como está
        return descripcion;
      }
    },
    formatDate(dateString) {
      if (!dateString) return "No disponible";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    mapEstado(estado) {
      switch (estado) {
        case 0:
          return "Pendiente";
        case 1:
          return "Aprobado";
        case 2:
          return "Rechazado";
        case 3:
          return "Todos";
        default:
          return "Desconocido"; // Opcional, por si se recibe un estado no esperado
      }
    },
    async aprobarSolicitud(solicitud) {
      try {
        const payload = {
          id: solicitud.id,
          user: solicitud.user,
          name: solicitud.nombre,
          descripcion: this.parseDescripcion(solicitud.descripcion),
          fecha: new Date().toISOString().split("T")[0], // Fecha en formato YYYY-MM-DD
          puntos: solicitud.puntos,
          valor: solicitud.valor,
          estado: 1, // Estado aprobado
          login_Id: this.userInfo.id,
          token: this.userInfo.token
        };

        const response = await axios.post(this.apiUrlnew + "solicitud_respuesta", payload);
        if (response.status === 200) {
          this.$store.dispatch("getUsersCapital", { id: this.userInfo.id });
          alert("Solicitud aprobada con éxito.");
          this.fetchSolicitudes(); // Refrescar las solicitudes
        }
      } catch (error) {
        console.error("Error al aprobar la solicitud:", error);
        alert("Ocurrió un error al aprobar la solicitud.");
      }
    },
    async rechazarSolicitud(solicitud) {
      try {
        const payload = {
          id: solicitud.id,
          user: solicitud.user,
          name: solicitud.nombre,
          descripcion: this.parseDescripcion(solicitud.descripcion),
          fecha: new Date().toISOString().split("T")[0], // Fecha en formato YYYY-MM-DD
          puntos: solicitud.puntos,
          valor: solicitud.valor,
          estado: 2, // Estado rechazado
          login_Id: this.userInfo.id,
          token: this.userInfo.token
        };

        const response = await axios.post(this.apiUrlnew + "solicitud_respuesta", payload);
        if (response.status === 200) {
          this.$store.dispatch("getUsersCapital", { id: this.userInfo.id });
          alert("Solicitud rechazada con éxito.");
          this.fetchSolicitudes(); // Refrescar las solicitudes
        }
      } catch (error) {
        console.error("Error al rechazar la solicitud:", error);
        alert("Ocurrió un error al rechazar la solicitud.");
      }
    }

  },
  watch: {
    bankFilter(oldValue, newValue) {
      if (newValue != "") {
        this.solicitudesFiltered = this.solicitudes.filter(solicitud => solicitud.descripcion.toLowerCase().includes(this.bankFilter.toLowerCase()))
      }
      else {
        this.solicitudesFiltered = this.solicitudes;
      }
    }
  },
  mounted() {
    this.fetchSolicitudes();
  },
}
</script>

<style>
.disabled-btn {
  background-color: #b0bec5 !important;
  color: #ffffff !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}
</style>