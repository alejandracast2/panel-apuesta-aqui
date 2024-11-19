<template>
  <div>
    <input type="text" :id="'dateInputContainer'+reference" v-model="value" @click="showCalendar()" @change="updateData($event.target.value)" />
    <div class="modalCalendar" :id="'modal_calendar'+reference">
      <div :id="'calendar-container'+reference" class="calendar-container" style="display: block">
        <div :id="'display-container'+reference" class="display-date-container">
          <span :id="'display-date'+reference">{{ value }}</span>
        </div>
        <div :id="'calendar-header'+reference" class="calendar-header">
          <button :id="'prev-month'+reference">
            <i class="fas fa-caret-left fa-lg"></i>
          </button>
          <select :id="'year-select'+reference" style="display: block !important;"></select>
          <select :id="'month-select'+reference" style="display: block !important;"></select>
          <button :id="'next-month'+reference">
            <i class="fas fa-caret-right fa-lg"></i>
          </button>
        </div>
        <!-- Tabla del calendario -->
        <table :id="'calendar'+reference" class="calendar" style="width: 100%;">
          <thead>
            <tr>
              <th>lun</th>
              <th>mar</th>
              <th>mié</th>
              <th>jue</th>
              <th>vie</th>
              <th>sáb</th>
              <th>dom</th>
            </tr>
          </thead>
          <tbody :id="'calendar-body'+reference">
            <!-- Los días del calendario se generarán con JavaScript -->
          </tbody>
        </table>

        <div class="action-buttons">
          <button :id="'today-button'+reference" class="today-button">
            <i class="fa fa-caret-up" style="color: #0040ff"></i> HOY
          </button>
          <button :id="'delete-button'+reference" class="delete-button">
            <i class="fa fa-minus" style="color: #f00f0f"></i> BORRAR
          </button>
          <button :id="'close-button'+reference" class="close-button">
            <i class="fas fa-times fa-xs"></i> CERRAR
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "customCalendar",
  props:['reference','date'],
  components: {},
  data() {
    return {
      value: ''
    };
  },
  methods: {
    updateData(data){
      console.log(data)
      this.$emit('input', data)
    },
    showCalendar() {
      document.getElementById("modal_calendar"+this.reference).style.display = "block";
      document.getElementById("dateInputContainer"+this.reference).blur();
    },
    updateSelectedDateDisplay2(date) {
      var displayDateElement = document.getElementById("display-date"+this.reference);
      var formattedDay = ("0" + date.getDate()).slice(-2); // Añade un cero si es necesario
      var formattedMonth = date
        .toLocaleString("es", { month: "long" })
        .toUpperCase();
      var formattedYear = date.getFullYear();
      displayDateElement.textContent = `${formattedDay} ${formattedMonth} ${formattedYear}`;
      document.getElementById(
        "dateInputContainer"+this.reference
      ).value = `${formattedDay} ${formattedMonth} ${formattedYear}`;
    },
    getFechaFormated(date){
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
      var mes = partesFecha[1];
      var anio = partesFecha[2];

      // Formatear la fecha en el formato deseado (YYYY-MM-DD)
      var fechaFormateada = anio + "-" + meses[mes] + "-" + dia;

      // Resultado
      return fechaFormateada
    }
  },
  watch:{
    value(newVal){
      this.$emit('updateData', newVal)
    },
    date(newVal){
      this.value = newVal
      let date = this.getFechaFormated(newVal)
      let days = document.getElementsByClassName('day'+this.reference)
      Array.from(days).forEach(day => {
        day?.classList.remove("selected");
      })
      document.getElementById(date+'-'+this.reference)?.classList.add('selected')
    }
  },
  mounted() {
    const self = this
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDay;

    const monthSelect = document.getElementById("month-select"+self.reference);
    const yearSelect = document.getElementById("year-select"+self.reference);
    const calendarBody = document.getElementById("calendar-body"+self.reference);
    //updateSelectedDateDisplay(today);

    // Población inicial de los selects de mes y año
    for (let i = 0; i < 12; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = new Date(0, i).toLocaleString("es", {
        month: "long",
      });
      if (i === currentMonth) {
        option.selected = true;
      }
      monthSelect.appendChild(option);
    }

    for (let i = currentYear - 3; i <= currentYear; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (i === currentYear) {
        option.selected = true;
      }
      yearSelect.appendChild(option);
    }

    // Funciones para construir el calendario
    function clearCalendar() {
      calendarBody.innerHTML = "";
    }
    function updateSelectedDateDisplay(date) {
      var displayDateElement = document.getElementById("display-date"+self.reference);
      var formattedDay = ("0" + date.getDate()).slice(-2); // Añade un cero si es necesario
      var formattedMonth = date
        .toLocaleString("es", { month: "long" })
        .toLowerCase();
      var formattedYear = date.getFullYear();
      displayDateElement.textContent = `${formattedDay} ${formattedMonth} ${formattedYear}`;
      self.value = `${formattedDay} ${formattedMonth} ${formattedYear}`;
    }
    function setCalendar(year, month) {
      clearCalendar();
      const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let date = 1;
      for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfMonth) {
            row.insertCell(-1);
          } else if (date > daysInMonth) {
            break;
          } else {
            const cell = row.insertCell(-1);
            cell.textContent = date;
            let dateObject = new Date(year, month, date);
            if (dateObject > today) {
              cell.classList.add("future-date"); // Añade la clase a los días futuros
            }
            if (
              date === today.getDate() &&
              year === today.getFullYear() &&
              month === today.getMonth()
            ) {
              cell.classList.add("today"); // Marca el día actual
            }

            // Añade la fila al cuerpo del calendario
            calendarBody.appendChild(row);
            cell.id = `${year}-${("0" + (month+1)).slice(-2)}-${("0" + (date)).slice(-2)}-${self.reference}`
            cell.classList.add('day'+self.reference)
            cell.addEventListener("click", function () {
              // Elimina la clase 'selected' de todos los días previamente seleccionados
              // Obtiene la fecha del día clickeado
              let day = parseInt(this.textContent, 10);
              let month = currentMonth;
              let year = currentYear;
              let selectedDate = new Date(year, month, day);

              // Elimina la clase 'selected' de todos los días previamente seleccionados
              document
                .querySelectorAll("#calendar-body"+self.reference+ " td.selected")
                .forEach(function (selected) {
                  selected.classList.remove("selected");
                });

              // Añade la clase 'selected' al día clickeado
              this.classList.add("selected");

              // Actualiza el contenedor de la fecha seleccionada con la fecha clickeada
              updateSelectedDateDisplay(selectedDate);

              // Luego, asegúrate de que esta función se llame cada vez que se selecciona un día
              document
                .querySelectorAll("#calendar-body"+self.reference+ " td")
                .forEach(function (cell) {
                  cell.addEventListener("click", function () {
                    // Obtiene la fecha del día clickeado
                    let day = parseInt(this.textContent, 10);
                    let month = currentMonth;
                    let year = currentYear;
                    let selectedDate = new Date(year, month, day);

                    // Elimina la clase 'selected' de todos los días previamente seleccionados
                    document
                      .querySelectorAll("#calendar-body"+self.reference+ " td.selected")
                      .forEach(function (selected) {
                        selected.classList.remove("selected");
                      });

                    // Añade la clase 'selected' al día clickeado
                    this.classList.add("selected");

                    // Actualiza el contenedor de la fecha seleccionada con la fecha clickeada
                    updateSelectedDateDisplay(selectedDate);
                  });
                });

              cell.classList.add("selected");
              selectedDate.setFullYear(year, month, date);
              selectedDay = cell.textContent;
              document.getElementById("modal_calendar"+self.reference).style.display = "none";
            });
            date++;
          }
        }
        calendarBody.appendChild(row);
      }
    }

    setCalendar(currentYear, currentMonth);

    // Event listeners para los botones y selects
    document
      .getElementById("today-button"+self.reference)
      .addEventListener("click", function () {
        const today = new Date();
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
        selectedDay = today.getDate();

        updateSelectedDateDisplay(today);
        setCalendar(currentYear, currentMonth);

        // Encuentra y selecciona la celda correspondiente al día actual
        const cells = document.querySelectorAll("#calendar-body"+self.reference+ " td");
        cells.forEach((cell) => {
          cell.classList.remove("selected");
          if (cell.textContent == selectedDay) {
            cell.classList.add("selected");
          }
        });

        document.getElementById("modal_calendar"+self.reference).style.display = "none"; // // Oculta el contenedor del calendario
      });

    document
      .getElementById("close-button"+self.reference)
      .addEventListener("click", function () {
        document.getElementById("modal_calendar"+self.reference).style.display = "none"; // // Oculta el contenedor del calendario
      });
    document
      .getElementById("delete-button"+self.reference)
      .addEventListener("click", function () {
        // Limpia el contenedor de la fecha seleccionada
        document.getElementById("display-date"+self.reference).textContent = "";

        // Opcional: Elimina la selección del día actual en el calendario
        const selectedDayElement = document.querySelector(
          "#calendar-body"+self.reference+ " .selected"
        );
        if (selectedDayElement) {
          selectedDayElement.classList.remove("selected");
        }
        document.getElementById("dateInputContainer"+self.reference).value = "";
        document.getElementById("modal_calendar"+self.reference).style.display = "none"; // // Oculta el contenedor del calendario
      });
    document
      .getElementById("prev-month"+self.reference)
      .addEventListener("click", function () {
        if (currentMonth === 0) {
          currentYear--;
          currentMonth = 11;
        } else {
          currentMonth--;
        }
        setCalendar(currentYear, currentMonth);
        yearSelect.value = currentYear;
        monthSelect.value = currentMonth;
      });

    document
      .getElementById("next-month"+self.reference)
      .addEventListener("click", function () {
        if (currentMonth === 11) {
          currentYear++;
          currentMonth = 0;
        } else {
          currentMonth++;
        }
        setCalendar(currentYear, currentMonth);
        yearSelect.value = currentYear;
        monthSelect.value = currentMonth;
      });

    monthSelect.addEventListener("change", function () {
      currentMonth = parseInt(this.value);
      setCalendar(currentYear, currentMonth);
    });

    yearSelect.addEventListener("change", function () {
      currentYear = parseInt(this.value);
      setCalendar(currentYear, currentMonth);
    });
  }
};
</script>

<style>
.modalCalendar {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
.display-date-container {
    background-color: #007bff; /* Azul */
    color: white; /* Blanco */
    text-align: center;
    padding: 10px;
    border-top-left-radius: 8px; /* Redondea las esquinas superiores */
    border-top-right-radius: 8px;
    font-size: 18px;
    font-weight: bold; /* Negrilla */
}
/* Contenedor del calendario */
.calendar-container {
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 8% auto;
    background-color: white;
    z-index: 1; /* Sit on top */
    overflow: auto; /* Enable scroll if needed */
}

.today {
    font-weight: bold;
    color: rgba(32, 0, 238, 0);
}
/* Encabezado del calendario */
.calendar-header {
    background-color: #ffffff;
   
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.calendar-header div {
    display: flex;
    align-items: center;
}

.calendar-header select {
    margin: 0 5px;
    font-family: "Helvetica";
    padding: 5px;
    border-radius: 4px;
    
    font-size: inherit;
    line-height: inherit;
    margin-left: 0.25em;
    margin-right: 0.25em;
    height: 2em;
    
}

/* Botones de navegación */
.calendar-header button {
    background: none;
    border: none;
    color: rgb(118, 118, 118);
    cursor: pointer;
    
}

.calendar-header button:disabled {
    color: #bbbbbb;
}

/* Estilos para los nombres de los días */
.calendar thead {
    background-color: #ffffff;
    color: rgb(197, 191, 191);
}

.calendar thead th {
    padding: 5px 0;
    text-align: center;
    font-size: 14px;
}

/* Estilos de los días del calendario */
.calendar tbody td {
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
    border: none;
}

/* Días fuera de rango (futuros) */
.calendar tbody td.out-of-range {
    color: #cccccc;
    cursor: default;
    border: none;
}
.calendar tbody td {
    border: none; /* Elimina los bordes de las celdas */
}

.calendar tbody tr {
    border-collapse: collapse; /* Asegura que las celdas estén pegadas */
}
.future-date {
    background-color: #f0f0f0; /* Fondo gris claro para días futuros */
    color: #e0dddd; /* Texto gris para días futuros */
    pointer-events: none; /* Desactiva la interacción con estos días */
    
}
/* Días pasados y actual */
.calendar tbody td:not(.out-of-range) {
    color: rgb(159, 157, 157);
}

/* Día seleccionado */
.calendar tbody td.selected {
    background-color: #007bff; /* Fondo azul para día seleccionado */
    color: white; /* Texto blanco para día seleccionado */
    border-radius: 50%; /* Redondea los bordes para formar un círculo */
    font-weight: bold;
}

/* Contenedor para los botones de acción */
.action-buttons {
    display: flex; /* Esto hará que los botones se alineen horizontalmente */
    justify-content: space-between; /* Esto los separará equitativamente */
    padding: 0 10px; /* Añade un poco de espacio en los lados */
}

/* Estilo general para los botones */
.action-buttons button {
    flex: 1; /* Esto hará que cada botón tome un tercio del espacio disponible */
    margin: 5px; /* Añade un poco de espacio entre los botones */
    padding: 10px 0; /* Añade un poco de espacio vertical */
    border-radius: 4px; /* Bordes redondeados como en la imagen */
    border: none; /* Remueve el borde */
    color: rgb(37, 36, 36); /* Texto blanco */
    font-weight: bold; /* Hace el texto en negritas */
    cursor: pointer;
    transition: background-color 0.2s;
    text-transform: uppercase
}

/* Estilos específicos para cada botón según su id */
.today-button {
    background-color: #ffffff; /* Azul */
    text-transform: uppercase
}

.today-button:hover {
    background-color: #ffffff; /* Azul más oscuro al pasar el ratón */
    
}

.delete-button {
    background-color: #ffffff; /* Rojo */
    text-transform: uppercase
}

.delete-button:hover {
    background-color: #ffffff; /* Rojo más oscuro al pasar el ratón */
}

.close-button {
    background-color: #ffffff; /* Gris */
    text-transform: uppercase
}

.close-button:hover {
    background-color: #ffffff; /* Gris más oscuro al pasar el ratón */
}


/* Puedes añadir más estilos personalizados aquí */
</style>
