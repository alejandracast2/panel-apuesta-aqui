<template>
  <div>
    <main :class="view_type">
      <div class="container-fluid mb-5">
        <section>
          <div class="col-md-12 p-0">
            <div class="row mt-4 mb-3">
              <div class="pt-2 pl-3">
                <h5 class="white-text font-weight-bold">Mi resumen</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-xl-9">
                <div class="card">
                  <div class="card-body p-1 px-sm-4">
                    <div class="row">
                      <div class="col-8 col-sm-5 col-md-4 mx-auto py-sm-2 mt-2 mb-1 mb-sm-4">
                        <div class="card transparent text-center z-depth-2 py-2 py-sm-3">
                          <p class="darkgrey-text mb-0">Memoria: <span id="Memory">0,00</span></p>
                        </div>
                      </div>
                      <div class="col-8 col-sm-5 col-md-4 mx-auto py-2 mt-2 mb-2 mb-sm-4">
                        <div class="card transparent text-center z-depth-2 py-2 py-sm-3">
                          <p class="darkgrey-text mb-0">A pagar: <span id="Payment">{{ parseNumbers(main_data[0]?main_data[0].saldo:0) }}</span></p>
                        </div>
                      </div>
                    </div>
                    <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div class="top"></div>
                      <div id="history_processing" class="dataTables_processing card" style="display: none;">Procesando...
                      </div>
                      <table id="history" class="table table-striped table-hover w-100 dataTable no-footer"
                        cellspacing="0" role="grid" style="width: 837px;">
                        <thead>
                          <tr role="row">
                            <th scope="col" class="sorting_disabled dt-date text-center" rowspan="1" colspan="1"
                              style="width: 221px;">Fecha</th>
                            <th scope="col" class="sorting_disabled d-none" rowspan="1" colspan="1" style="width: 0px;">
                            </th>
                            <th scope="col" class="sorting_disabled dt-operation text-center" rowspan="1" colspan="1"
                              style="width: 148px;">Operacion</th>
                            <th scope="col" class="sorting_disabled dt-provider d-none text-center" rowspan="1"
                              colspan="1" style="width: 0px;">Categoria</th>
                            <th scope="col" class="sorting_disabled dt-amount text-center" rowspan="1" colspan="1"
                              style="width: 151px;">Importe</th>
                            <th scope="col" class="sorting_disabled dt-balance d-none d-sm-block col-toggle text-center"
                              rowspan="1" colspan="1" style="width: 145px;">Saldo</th>
                            <th scope="col" class="sorting_disabled dt-details d-none text-center" rowspan="1" colspan="1"
                              style="width: 0px;">Detalles</th>
                            <th scope="col" class="sorting_disabled dt-comment d-none text-center" rowspan="1" colspan="1"
                              style="width: 0px;">Comentarios</th>
                            <th scope="col" class="sorting_disabled dt-ticket d-none text-center" rowspan="1" colspan="1"
                              style="width: 0px;"></th>
                            <th scope="col" class="sorting_disabled dt-more text-center" rowspan="1" colspan="1"
                              style="width: 52px;"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr role="row" class="odd" :data-index="index"
                            v-for="(item, index) in paginarArray(main_data, registers_per_page)[actual_page - 1]"
                            :key="index">
                            <td class="dt-date text-center operation-6">
                              <div class="d-inline-block">{{ formatearFecha(item.fecha) }}</div>
                            </td>
                            <td class="dt-operation text-left operation-6">{{ item.operacion }}</td>
                            <td class="dt-operation text-left operation-6">{{ parseNumbers(item.importe) }}</td>
                            <td class="dt-amount operation-6 text-right">{{ parseNumbers(item.saldo) }}</td>
                            <td class="dt-more text-center operation-6">
                              <div class="fixed-action-btn" :data-custom-fixed="index"> <a
                                  class="btn-floating btn-lg red"><i class="fas fa-paperclip"></i></a>
                                <ul class="list-unstyled">
                                  <li><a class="btn-floating custom-floating-details blue"
                                      :class="'custom-fixed-floating-' + index" data-toggle="popover" data-placement="top"
                                      title="" data-html="true"
                                      data-content="01-06-2023 - 01-07-2023<br>EvoPlay: -1412.8<br>Vivo: 4960.25<br>Spinomenal 2: 9253.5<br>Tom Horn 2: 5720.75<br>Bet Soft: -10.75<br>Platipus 2: 9733<br>Crash V: 3649.88<br>Pragmatic LC: -6999.11<br>Pragmatic 2: 129186.38<br>Red Rake 3: 13983.56<br>Horses 2: 401.25<br>Vibra G: -6776.63<br>Ezugi 3: 114456.25<br>Salsa: 208<br>Game Art: 65.23<br>Triple Cherry: -4.45<br>Hacksaw: 9260.08<br>High5: 20860<br>Amatic: -2308.75<br>Novomatic: 0.44<br>Microgaming: 2.38<br>Netent: 723.25<br>Playtech: 6212<br>Quickspin: 1975<br>Wazdan: 72.23<br>PlayNgo: 872.13"
                                      data-original-title=""><i class="fas fa-info"></i></a></li>
                                  <li><a class="btn-floating custom-floating-comment yellow darken-1 custom-disabled"
                                      :class="'custom-fixed-floating-' + index" data-toggle="popover" data-placement="top"
                                      title="" data-content="" data-original-title=""><i class="fas fa-comment"></i></a>
                                  </li>
                                  <li><a class="btn-floating custom-floating-img green custom-disabled"
                                      :class="'custom-fixed-floating-' + index"><i class="fas fa-image"></i></a></li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="bottom row">
                        <section class="section-preview col-6">
                          <div class="select-wrapper mdb-select">
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
                              <li :class="registers_per_page == 100 ? 'active' : ''" @click="setRegistersPerPage(100)">
                                <span class="filtrable">100</span>
                              </li>
                            </ul>
                            <select name="users_length" aria-controls="users" class="mdb-select col-4 initialized">
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="50">100</option>
                            </select>
                          </div>
                        </section>
                        <div class="dataTables_paginate paging_simple_numbers col-12 col-md-6 order-1 order-md-2"
                          id="history_paginate">
                          <pagination :options="{ texts: { count: '' } }" v-model="actual_page" :records="records"
                            :per-page="registers_per_page" @paginate="paginate" />
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
  components: {Pagination},
  data() {
    return {
      main_data: [],
      actual_page: 1,
      registers_per_page: 10,
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
    apiUrlnew(){
            return this.$store.getters['getApiUrlnew'];
        },
        site(){
            return this.$store.getters['getSite'];
        },
  },
  methods: {
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
    getFecha(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const fechaFormateada = `${year}-${month}-${day}`;
      return fechaFormateada
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
    parseNumbers(number) {
      return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
    },
    async get_data() {
      try {
        this.showOperaciones = false;
        this.showSelectAgentes = false;
        let response = await axios.post(this.apiUrlnew + "miresumen", {
          "login_Id": this.main_tree.id
        })
        if (response.data) {
          this.main_data = response.data
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.get_data()
  },
}
</script>