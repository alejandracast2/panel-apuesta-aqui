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
              <div class="col-12 col-xl-12">
                <div class="card">
                  <div class="card-body p-1 px-sm-4">
                    <!-- Spinner de carga -->
                    <div v-if="loading" class="text-center">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Cargando...</span>
                      </div>
                    </div>

                    <!-- Tabla de datos -->
                    <table v-if="!loading && solicitudes.length > 0" class="table table-striped table-bordered">
                      <thead class="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Usuario</th>
                          <th>Nombre</th>
                          <th>Descripción</th>
                          <th>Fecha de Creación</th>
                          <th>Última Actualización</th>
                          <th>Valor</th>
                          <th>Estado</th>
                          <th>Aprobar</th>
                          <th>Rechazar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="solicitud in solicitudes" :key="solicitud.id">
                          <td>{{ solicitud.id }}</td>
                          <td>{{ solicitud.user }}</td>
                          <td>{{ solicitud.nombre }}</td>
                          <td>{{ parseDescripcion(solicitud.descripcion) }}</td>
                          <td>{{ formatDate(solicitud.created_at) }}</td>
                          <td>{{ formatDate(solicitud.updated_at) }}</td>
                          <td>{{ solicitud.valor }}</td>
                          <td>{{ mapEstado(solicitud.estado) }}</td>
                          <td v-if="solicitud.estado == 0"> <a
                              class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                              alt="Aprobar" title="Aprobar" @click="aprobarSolicitud(solicitud)"
                              :disabled="solicitud.estado !== 0">
                              <i class="fas fa-check" aria-hidden="true">
                              </i>
                            </a> </td>
                            <td v-if="solicitud.estado == 0"> <a 
                              class="btn btn-floating waves-effect waves-light btn-action btn-hide mb-1 mt-1 ml-0 mr-1 ml-md-2 cyan"
                              alt="Rechazar" title="Rechazar"  @click="rechazarSolicitud(solicitud)"
                              :disabled="solicitud.estado != 0" >
                              <i class="fas fa-times" aria-hidden="true">
                              </i>
                            </a> </td>  
                        </tr>
                      </tbody>
                    </table>

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
              <a type="button" class="btn btn-outline-success waves-effect modal-view-ticket-download">Descargar</a>
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
export default {
  name: 'miResumen',
  components: { Pagination },
  data() {
    return {
      solicitudes: [],
      loading: true,
      main_data: [],
      actual_page: 1,
      registers_per_page: 10,
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
              this.$store.dispatch("getUsersCapital", {id:this.userInfo.id});
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
              this.$store.dispatch("getUsersCapital", {id:this.userInfo.id});
                alert("Solicitud rechazada con éxito.");
                this.fetchSolicitudes(); // Refrescar las solicitudes
            }
        } catch (error) {
            console.error("Error al rechazar la solicitud:", error);
            alert("Ocurrió un error al rechazar la solicitud.");
        }
    }

  },
  mounted() {
    this.fetchSolicitudes();
  },
}
</script>