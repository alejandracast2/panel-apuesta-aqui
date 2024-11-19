<template>
  <div>
    <main :class="view_type" id="agentesReportMain">
      <div class="container-fluid mb-2 px-1 px-md-3">
        <section>
          <div class="col-md-12 p-0">
            <div class="row mt-4 mb-3">
              <div class="col-6 col-lg-9 pt-2 pl-4">
                <h5 class="white-text font-weight-bold">Reporte Global</h5>
              </div>
              <div class="col-6 d-lg-none text-center">
                <button class="d-lg-none btn btn-sm btn-danger waves-effect waves-light" @click="openModal('affiliates_tree_modal')"
                  id="ShowAffiliatesModal">Estructura</button>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-xl-9" id="main_container">
                  <div class="card">
                    <div class="card-body p-1 px-sm-2">
                      <div class="row col-12 col-xl-11 mx-auto px-0 px-md-2 px-lg-0 mb-2">
                        <div class="col-9 col-sm-5 col-xl-4 mx-auto order-sm-1">
                          <section class="section-preview">
                              <div class="select-wrapper mdb-select col-12">
                                  <span class="caret">▼</span>
                                  <input type="text"
                                  id="datesInput"
                                      class="select-dropdown w-100 active"
                                      @click="showDateOptions" readonly="true" value=""
                                      v-model="selectedDate">
                                  <ul id="selectDates"
                                      class="dropdown-content select-dropdown w-100 text-center active"
                                      style="width: 82.125px; position: absolute; top: -73.391px; left: 15px; opacity: 1; 
                                      display: none;">
                                      <li @click="setDate('Hoy')">
                                          <span :style="selectedDate=='Hoy'?'background-color:#4285f4;color:white !important;':''">Hoy</span>
                                      </li>
                                      <li @click="setDate('Ayer')">
                                          <span :style="selectedDate=='Ayer'?'background-color:#4285f4;color:white !important;':''">Ayer</span>
                                      </li>
                                      <li @click="setDate('Semana actual')">
                                          <span :style="selectedDate=='Semana actual'?'background-color:#4285f4;color:white !important;':''">Semana actual</span>
                                      </li>
                                      <li @click="setDate('Semana previa')">
                                          <span :style="selectedDate=='Semana previa'?'background-color:#4285f4;color:white !important;':''">Semana previa</span>
                                      </li>
                                      <li @click="setDate('Mes actual')">
                                          <span :style="selectedDate=='Mes actual'?'background-color:#4285f4;color:white !important;':''">Mes actual</span>
                                      </li>
                                      <li @click="setDate('Mes previo')">
                                          <span :style="selectedDate=='Mes previo'?'background-color:#4285f4;color:white !important;':''">Mes previo</span>
                                      </li>
                                      <li @click="setDate('Personalizado')">
                                          <span :style="selectedDate=='Personalizado'?'background-color:#4285f4;color:white !important;':''">Personalizado</span>
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
                        <div class="col-6 col-sm-3 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-4">
                          <div class="md-form">
                            <!-- <input v-model="startDate" type="date" id="start_date" value="" class="form-control datepicker picker__input">  -->
                            <customCalendar class="form-control" :reference="1" :date="startDate" id="start_date" @updateData="event => startDate = event" style="border-color: transparent;"/>
                            <label for="start_date" class="active">Fecha Inicial</label>
                            <!-- <VuePersianDatetimePicker v-model="startDate" locale="es" custom-input=".datepicker" format="YYYY-MM-DD"/> -->
                        </div>
                      </div>
                      <div class="col-4 col-sm-2 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-5">
                        <div class="md-form">
                          <vue-clock-picker2 v-model="startHour" :active-color="'#417df4'" :input-class="'form-control picker__input'"></vue-clock-picker2>
                          <label for="start_time" class="active">Hora Inicial</label>
                        </div>
                      </div>
                      <div class="col-6 col-sm-3 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-6">
                        <div class="md-form">
                          <!-- <input v-model="endDate" type="date" id="end_date" class="form-control datepicker2 picker__input"> -->
                          <customCalendar class="form-control" :reference="2" :date="endDate" id="start_date" @updateData="event => endDate = event" style="border-color: transparent;"/>
                          <label for="end_date" class="active">Fecha Final</label>
                          <!-- <VuePersianDatetimePicker v-model="endDate" locale="es" custom-input=".datepicker2" format="YYYY-MM-DD"/> -->
                        </div>
                      </div>
                      <div class="col-4 col-sm-2 px-sm-2 px-lg-0 px-xl-2 mx-auto custom-date order-sm-7">
                        <div class="md-form">
                          <vue-clock-picker2 v-model="endHour" :active-color="'#417df4'" :input-class="'form-control picker__input'"></vue-clock-picker2>
                          <label for="end_time" class="active">Hora Final</label>
                        </div>
                      </div>
                      <div class="col-6 col-sm-3 text-center order-sm-2">
                        <button class="btn btn-sm btn-cyan waves-effect waves-light" id="search" @click="getReport">Buscar</button>
                      </div>
                      <div class="col-6 col-sm-3 mx-auto text-center order-sm-3">
                        <button class="btn btn-sm btn-cyan waves-effect waves-light" id="change_view" @click="detalles=!detalles">detalles</button>
                      </div>
                    </div>
                    <div id="history_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div class="top"></div>
                      <div v-if="loadingReport" id="users_processing" class="dataTables_processing card"
                          >Procesando...
                      </div>
                      <table id="history" class="table table-hover w-100 dataTable no-footer" cellspacing="0" role="grid"
                        style="width: 1247px;">
                        <thead>
                          <tr role="row">
                            <th scope="col" class="sorting_disabled text-center" rowspan="1" colspan="1"
                              style="width: 294px;">Categoria</th>
                            <th scope="col" class="sorting_disabled  d-md-block text-center d-none d-xl-block" rowspan="1" colspan="1"
                              style="width: 165px;">Apuestas</th>
                            <th scope="col" class="sorting_disabled  d-sm-block text-center d-none d-xl-block" rowspan="1" colspan="1"
                              style="width: 165px;">Apostado</th>
                            <th scope="col" class="sorting_disabled  d-sm-block text-center d-none d-xl-block" rowspan="1" colspan="1"
                              style="width: 165px;">Ganado</th>
                            <th scope="col" class="sorting_disabled text-center" rowspan="1" colspan="1"
                              style="width: 165px;">Netwin</th>
                            <th scope="col" class="sorting_disabled text-center" rowspan="1" colspan="1"
                              style="width: 149px;">Comision</th>
                            <th scope="col" class="sorting_disabled " rowspan="1" colspan="1" style="width: 0px;">
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr role="row" class="odd row-no-toggle">
                            <td class="text-left dt-category category3"><span class="ml-0 ml-sm-1"></span> Casino</td>
                            <td class="d-none d-xl-block d-md-block text-right category3">{{ parseNumbers(reportData.casino?.total_bets??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category3">{{ parseNumbers(reportData.casino?.bet_amount??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category3">{{ parseNumbers(reportData.casino?.win_amount??0) }}</td>
                            <td class="text-right dt-balance text-nowrap category3">{{ parseNumbers(reportData.casino?.netwin??0) }}</td>
                            <td class="text-right category3">{{ parseNumbers(reportData.casino?.comision??0) }}</td>
                          </tr>
                          <!-- DETALLES DE CASINO -->
                          <template v-for="(provider, index) in reportData.casino.providers">
                            <tr role="row" class="even  row-toggle" :class="detalles?'':'d-none'" :key="index">
                              <td class="text-left dt-category" style="background-color: rgb(230, 230, 250);"><span
                                  class="ml-0 ml-sm-2"></span> {{ index }}</td>
                              <td class="d-none d-xl-block d-md-block text-right" style="background-color: rgb(230, 230, 250);">{{ parseNumbers(provider.total_bets) }}</td>
                              <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(230, 230, 250);">{{ parseNumbers(provider.bet_amount) }}</td>
                              <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(230, 230, 250);">{{ parseNumbers(provider.win_amount) }}</td>
                              <td class="text-right dt-balance text-nowrap" style="background-color: rgb(230, 230, 250);">{{ parseNumbers(provider.netwin) }}</td>
                              <td class="text-right" style="background-color: rgb(230, 230, 250);">{{ parseNumbers(provider.comision) }}</td>
                            </tr>
                            <tr role="row" class="odd  row-toggle" :class="detalles?'':'d-none'" v-for="(brand, bindex) in provider.brands" :key="bindex+'-'+brand.provider">
                              <td class="text-left dt-category" style="background-color: rgb(250, 250, 250);"><span
                                  class="ml-1 ml-sm-3"></span>{{ bindex }}</td>
                              <td class="d-none d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(brand.total_bets) }}</td>
                              <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(brand.bet_amount) }}</td>
                              <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(brand.win_amount) }}</td>
                              <td class="text-right dt-balance text-nowrap" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(brand.netwin) }}</td>
                              <td class="text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(brand.comision) }}</td>
                            </tr>
                          </template>
                          <tr role="row" class="odd row-no-toggle">
                            <td class="text-left dt-category category2"><span class="ml-0 ml-sm-1"></span> Deportes</td>
                            <td class="d-none d-xl-block d-md-block text-right category2">{{ parseNumbers(reportData.deportes?.total_bets??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category2">{{ parseNumbers(reportData.deportes?.bet_amount??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category2">{{ parseNumbers(reportData.deportes?.win_amount??0) }}</td>
                            <td class="text-right dt-balance text-nowrap category2">{{ parseNumbers(reportData.deportes?.netwin??0) }}</td>
                            <td class="text-right category2">{{ parseNumbers(reportData.deportes?.comision??0) }}</td>
                          </tr>
                          <!-- DETALLES DE DEPORTES -->
                          <tr role="row" class="even  row-toggle" :class="detalles?'':'d-none'" v-if="Object.keys(reportData.deportes).length>0">
                            <td class="text-left dt-category" style="background-color: rgb(250, 250, 250);"><span
                                class="ml-1 ml-sm-3"></span> Deportes</td>
                            <td class="d-none d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.deportes?.total_bets) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.deportes?.bet_amount) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.deportes?.win_amount) }}</td>
                            <td class="text-right dt-balance text-nowrap" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.deportes?.netwin) }}</td>
                            <td class="text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.deportes?.comision) }}</td>
                          </tr>
                          <tr role="row" class="odd row-no-toggle">
                            <td class="text-left dt-category category1"><span class="ml-0 ml-sm-1"></span> Poker</td>
                            <td class="d-none d-xl-block d-md-block text-right category1">{{ parseNumbers(reportData.poker?.total_bets??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category1">{{ parseNumbers(reportData.poker?.bet_amount??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category1">{{ parseNumbers(reportData.poker?.win_amount??0) }}</td>
                            <td class="text-right dt-balance text-nowrap category1">{{ parseNumbers(reportData.poker?.netwin??0) }}</td>
                            <td class="text-right category1" @mouseenter="showPopover('#rake','#popoverdata',parseNumbers(reportData.poker?.rake??0))">
                              <div data-toggle="popover" data-placement="top" title="" data-html="true" @mouseout="showPopover2=false"
                                data-content="Rake: 9.291,94" data-original-title=""><span id="rake">{{ parseNumbers(reportData.poker?.comision??0) }}</span></div>
                            </td>
                          </tr>
                          <!-- DETALLES DE POKER -->
                          <tr role="row" class="even  row-toggle" :class="detalles?'':'d-none'" v-if="Object.keys(reportData.poker).length>0">
                            <td class="text-left dt-category" style="background-color: rgb(250, 250, 250);"><span
                                class="ml-1 ml-sm-3"></span> Poker</td>
                            <td class="d-none d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.poker?.total_bets) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.poker?.bet_amount) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.poker?.win_amount) }}</td>
                            <td class="text-right dt-balance text-nowrap" style="background-color: rgb(250, 250, 250);">{{ parseNumbers(reportData.poker?.netwin) }}</td>
                            <td class="text-right" style="background-color: rgb(250, 250, 250);">
                              <div data-toggle="popover" data-placement="top" title="" data-html="true"
                                data-content="Rake: 9.291,94" data-original-title="">{{ parseNumbers(reportData.poker?.comision) }}</div>
                            </td>
                            
                          </tr>
                          <tr role="row" class="odd row-no-toggle">
                            <td class="text-left dt-category category5"><span class="ml-0 ml-sm-1"></span> Bingo en vivo
                            </td>
                            <td class="d-none d-xl-block d-md-block text-right category5">{{ parseNumbers(reportData.bingo?.total_bets??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category5">{{ parseNumbers(reportData.bingo?.bet_amount??0) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category5">{{ parseNumbers(reportData.bingo?.win_amount??0) }}</td>
                            <td class="text-right dt-balance text-nowrap category5">{{ parseNumbers(reportData.bingo?.netwin??0) }}</td>
                            <td class="text-right category5">{{ parseNumbers(reportData.bingo?.comision??0) }}</td>
                          </tr>
                          <tr role="row" class="even row-no-toggle">
                            <td class="text-left dt-category category4"><span class="ml-0 ml-sm-1"></span> Bonus</td>
                            <td class="d-none d-xl-block d-md-block text-right category4">0,00</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category4">0,00</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right category4">0,00</td>
                            <td class="text-right dt-balance text-nowrap category4">0,00</td>
                            <td class="text-right category4">0,00</td>
                          </tr>

                          <!-- TOTALES -->
                          <tr role="row" class="odd  row-toggle" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap" style="font-style: italic;">Total Casino</td>
                            <td class="text-right" style="font-style: italic;">{{ parseNumbers(reportData.totales.casino - reportData.casino.comision) }}</td>
                            
                            
                          </tr>
                          <tr role="row" class="even  row-toggle" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap" style="font-style: italic;">Total Deportes</td>
                            <td class="text-right" style="font-style: italic;">{{ parseNumbers(reportData.totales.deportes - reportData.deportes.comision) }}</td>
                            
                            
                          </tr>
                          <tr role="row" class="odd  row-toggle" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap" style="font-style: italic;">Total Poker</td>
                            <td class="text-right" style="font-style: italic;">{{ parseNumbers((reportData.totales?.poker??0) - (reportData.poker?.comision??0)) }}</td>
                            
                            
                          </tr>
                          <tr role="row" class="even  row-toggle" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap" style="font-style: italic;">Total Bingo en vivo
                            </td>
                            <td class="text-right" style="font-style: italic;">{{ parseNumbers((reportData.totales?.bingo??0) - (reportData.bingo?.comision??0)) }}</td>
                            
                            
                          </tr>
                          <tr role="row" class="odd  row-toggle" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap" style="font-style: italic;">Total Bonus</td>
                            <td class="text-right" style="font-style: italic;">0,00</td>
                            
                            
                          </tr>
                          <tr role="row" class="even row-no-toggle" style="line-height: 30px;">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap"
                              style="font-weight: bold; background-color: rgb(242, 242, 242);">Total a pagar:</td>
                            <td class="text-right" style="font-weight: bold; background-color: rgb(242, 242, 242);">{{ parseNumbers(
                              totalizar([
                                Number.isNaN(reportData.casino.netwin-reportData.casino.comision)?0:reportData.casino.netwin-reportData.casino.comision,
                                Number.isNaN(reportData.deportes.netwin-reportData.deportes.comision)?0:reportData.deportes.netwin-reportData.deportes.comision,
                                Number.isNaN(reportData.poker.netwin-reportData.poker.comision)?0:reportData.poker.netwin-reportData.poker.comision,
                                Number.isNaN(reportData.bingo.netwin-reportData.bingo.comision)?0:reportData.bingo.netwin-reportData.bingo.comision,
                              ])
                           )}}</td>
                            
                            
                          </tr>
                          <tr role="row" class="odd  row-toggle" style="line-height: 1.5;" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap"></td>
                            <td class="text-right">&nbsp;</td>
                            
                            
                          </tr>
                          <tr role="row" class="even  row-toggle" style="background-color: rgb(242, 242, 242);" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category">Venta Fichas</td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right">{{ parseNumbers(reportData.fichas.ingreso) }}</td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right">{{ parseNumbers(reportData.fichas.salida) }}</td>
                            <td class="text-right dt-balance text-nowrap">{{ parseNumbers(reportData.fichas.total) }}</td>
                            <td class="text-right"></td>
                            
                            
                          </tr>
                          <tr role="row" class="odd  row-toggle" style="line-height: 30px;" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap"
                              style="font-weight: bold; background-color: rgb(242, 242, 242);">Total por ventas:</td>
                            <td class="text-right" style="font-weight: bold; background-color: rgb(242, 242, 242);">
                              {{ parseNumbers(reportData.fichas.total - (reportData.casino.comision??0 - reportData.poker.comision??0 - reportData.bingo.comision??0) - (reportData.deportes?.comision??0)) }}</td>
                            
                          </tr>
                          <tr role="row" class="even  row-toggle" style="line-height: 1.5;" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category"></td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap"></td>
                            <td class="text-right">&nbsp;</td>
                            
                            
                          </tr>
                          <tr role="row" class="odd  row-toggle" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category">Fichas en Paneles:</td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap">{{ parseNumbers(reportData.paneles.ROLE_PROMOTOR) }}</td>
                            <td class="text-right"></td>
                            
                          </tr>
                          <tr role="row" class="even  row-toggle" :class="detalles?'':'d-none'">
                            <td class="text-left dt-category">Fichas en Jugadores:</td>
                            <td class="d-none d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="d-none d-sm-block d-xl-block d-md-block text-right"></td>
                            <td class="text-right dt-balance text-nowrap">{{ parseNumbers(reportData.paneles.ROLE_APOSTADOR) }}</td>
                            <td class="text-right"></td>
                            
                          </tr>
                        </tbody>
                      </table>
                      <div class="bottom row"></div>
                      <div class="clear"></div>
                    </div>
                  </div>
                  <!-- <div class="card-footer ">
                    <div class="card-footer-missing font-size-custom red-text ">
                      * No se puede procesar el reporte. Por favor configurar las comisiones de los Proveedores:
                      <span class="font-italic"></span>
                    </div>
                    <div class="card-footer-fix-time font-size-custom blue-text ">
                      * El rango de busqueda fue ajustado a:
                      <span class="font-italic"></span>
                    </div>
                  </div> -->
                </div>
              </div>
              <div class="d-none d-xl-block col-xl-3 offset-xl-0 pt-4 pt-xl-0 pl-md-0"
                  id="affiliates_tree_container">
                  <div class="tree card py-3 px-0 jstree-default" id="affiliates_tree" role="tree">
                      <div class="switch font-size-custom py-1"><label>Incluir ocultos<input id="TreeShowHidden"
                          type="checkbox" @change="showHiddenTree"><span class="lever"></span></label>
                      </div>
                      <ul class="px-1 py-0" style="font-size: small;">
                          <treeNode :node="main_tree" :startDate="getFechaFormated(startDate)" :endDate="getFechaFormated(endDate)" :startHour="startHour" :endHour="endHour" />
                      </ul>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="p-1" role="tooltip" id="popoverdata" style="z-index: 7;background-color: white;font-size:small;" :style="showPopover2?'display:block':'display:none'">
        Rake: {{ popoverData }}  
        <div id="arrow" data-popper-arrow></div> 
      </div>
      <div class="modal fade left" id="affiliates_tree_modal" tabindex="-1" role="dialog"
          aria-labelledby="affTreeModal" aria-hidden="true">
          <div class="modal-dialog modal-full-height modal-left" role="document">
              <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                      <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalViewInfoTitle">
                          Listado de Agentes</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                          <span aria-hidden="true">×</span>
                      </button>
                  </div>
                  <div style="max-height:65vh;overflow-y:scroll;overflow-x:hidden" class="tree py-3 px-0 jstree-default" id="affiliates_tree" role="tree">
                      <div class="switch font-size-custom py-1"><label>Incluir ocultos<input id="TreeShowHidden"
                          type="checkbox" @change="showHiddenTree"><span class="lever"></span></label>
                      </div>
                      <ul class="px-1 py-0" style="font-size: small;">
                        <treeNode :node="main_tree" :startDate="getFechaFormated(startDate)" :endDate="getFechaFormated(endDate)" :startHour="startHour" :endHour="endHour" />
                      </ul>
                  </div>
                  <div class="modal-footer justify-content-center">
                      <button type="button" class="btn btn-danger waves-effect waves-light" @click="closeModal">Cerrar</button>
                  </div>
              </div>
          </div>
      </div>
  </main>
</div></template>
<script>
/* eslint-disable */
import treeNode from './treeNode.vue';
import customCalendar from '../customCalendar.vue';
import { createPopper } from '@popperjs/core';
let VueClockPicker2 = VueClockPicker;
export default {
  name: 'reporteAgente',
  components: {treeNode,VueClockPicker2, customCalendar},
  data() {
    return {
      selectedDate:"Hoy",
      startDate:"",
      startHour:"",
      endDate:"",
      endHour:"",
      firstLoadReport: false,
      detalles:false,
      showPopover2:false,
      popoverData:""
    }
  },
  props: ["view_type"],
  computed: {
    main_tree() {
      return this.$store.getters["getMainTree"];
    },
    reportData(){
      return this.$store.getters["getReportData"];
    },
    loadingReport(){
      return this.$store.getters["getLoadingReport"];
    },
    targetUser(){
      return this.$store.getters["getTargetUser"];
    },
  },
  methods: {
    showPopover(source,data,item){
        this.popoverData = item
        this.showPopover2 = true;
        const popcorn = document.querySelector(source);
        const tooltip = document.querySelector(data);
        createPopper(popcorn, tooltip, {
            placement: 'top'
        });
    },
    openModal(target){
      try {
          this.backdrop(true);
          let modal = document.getElementById(target);
          modal.classList.add("show");
          modal.style.display = "block";
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
        },
    totalizar(numbers){
      return numbers.reduce((a, b) => a + b, 0);
    },
    parseNumbers(number){
      return new Intl.NumberFormat("de-DE",{minimumFractionDigits:2, maximumFractionDigits: 2}).format(number)
    },
    setDate(date){
      document.getElementById("selectDates").style.display = "none";
      this.selectedDate = date
      this.setDateRanges(date)
    },
    showDateOptions(){
      document.getElementById("selectDates").style.display = "block";
    },
    showHiddenTree() {
        let checked = document.getElementById("TreeShowHidden").checked;
        this.$store.dispatch("showHiddenTree", checked);
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
        // const year = date.getFullYear();
        // const month = String(date.getMonth() + 1).padStart(2, '0');
        // const day = String(date.getDate()).padStart(2, '0');
        // const fechaFormateada = `${year}-${month}-${day}`;
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
    getReport(){
      // console.log(this.targetUser)
      this.detalles = false;
      this.$store.dispatch("getReport",{
        startDate:this.getFechaFormated(this.startDate),
        endDate:this.getFechaFormated(this.endDate),
        startHour:this.startHour + ":00",
        endHour:this.endHour + ":00",
        id:this.targetUser
      })
    }
  },
  watch:{
    targetUser(newVal){
      if (newVal.id && !this.firstLoadReport) {
        this.getReport()
        this.firstLoadReport = true
      }
    }
  },
  mounted() {
    if(this.selectedDate == "Hoy"){
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.startDate = this.getFecha(new Date());
      this.startHour = "00:00"
      this.endDate = this.getFecha(tomorrow);
      this.endHour = "00:00"
      if (this.targetUser.id && !this.firstLoadReport) {
        this.getReport()
        this.firstLoadReport = true
      }
    }
    const handleClick = event => {
        if (event.target.id != "datesInput") {
          document.getElementById("selectDates").style.display = "none";
        }
    }
    document.getElementById("agentesReportMain").addEventListener('click',handleClick)
  },
}
</script>
<style>
#popoverdata {
  display: inline-block;
  background: #ffffff;
  color: #000000;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
}
#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}
</style>