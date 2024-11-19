<template>
  <div class="my-2" v-if="(node.show || showHiddenTree)">
    <a href="#">
      <span class="collapsible-header collapsible-header-custom waves-effect collapsed"
        :class="node.hijosflag ? 'mr-2' : 'mr-3'" data-toggle="collapse" :href="'#c' + node.id" aria-expanded="false"
        :aria-controls="'c' + node.id" style="color:black">
        <i v-if="node.hijosflag" class="fas fa-angle-down rotate-icon" @click="appendChildren(node)"></i>
      </span>
      <span :class="targetUser.id == node.id ? 'jstree-clicked' : ''" class="py-1"
        @click="showChildrenCapital(node.id, node.user_name)">{{ node.user_name }}</span>
    </a>
    <div v-if="hasChildren" class="collapse px-3" :id="'c' + node.id"
      :class="main_tree.user_name == node.user_name ? 'show' : ''">
      <treeNode v-for="child in node.hijos" :key="child.id" :node="child" :startDate="startDate" :endDate="endDate"
        :startHour="startHour" :endHour="endHour" :provider="provider" />
    </div>
  </div>
</template>
<script>
import treeNode from './treeNode.vue';
export default {
  name: 'treeNode',
  components: { treeNode },
  props: ["node", "startDate", "endDate", "startHour", "endHour", "provider"],
  computed: {
    main_tree() {
      return this.$store.getters["getMainTree"];
    },
    hasChildren() {
      return this.$props.node && this.$props.node.hijos.length > 0
    },
    user() {
      return this.$store.getters["getUserData"];
    },
    showHiddenTree() {
      return this.$store.getters["getShowHiddenTree"];
    },
    targetUser() {
      return this.$store.getters["getTargetUser"];
    },
    getActualView() {
      return this.$store.getters['getDashboardView'];
    },
  },
  methods: {
    appendChildren(target) {
      this.$store.dispatch('addChildrenToTree', target)
    },
    showChildrenCapital(id, name) {
      if (this.getActualView == "users") {
        this.$store.dispatch("getChildrenTree", { id: id, name: name });
      }
      else if (this.getActualView == "reporteAgente") {
        this.$store.dispatch("getReport", {
          startDate: this.$props.startDate,
          endDate: this.$props.endDate,
          startHour: this.$props.startHour + ":00",
          endHour: this.$props.endHour + ":00",
          id: { id: this.$props.node.id, name: this.$props.node.user_name }
        })
      }
      else if (this.getActualView == "reporteCargas") {
        this.$store.dispatch("getReportCargas", {
          startDate: this.$props.startDate,
          endDate: this.$props.endDate,
          startHour: this.$props.startHour + ":00",
          endHour: this.$props.endHour + ":00",
          id: this.$props.node.user_name
        })
      }
      else if (this.getActualView == "reporteDeportes") {
        this.$store.dispatch("getReportDeportes", {
          startDate: this.$props.startDate + " " + this.$props.startHour + ":00",
          endDate: this.$props.endDate + " " + this.$props.endHour + ":00",
          id: { id: this.$props.node.id, name: this.$props.node.user_name }
        })
      }
      else if (this.getActualView == "reporteCasino" && this.$props.provider) {
        this.$store.dispatch("getReportCasino", {
          startDate: this.$props.startDate + " " + this.$props.startHour + ":00",
          endDate: this.$props.endDate + " " + this.$props.endHour + ":00",
          id: { id: this.$props.node.id, name: this.$props.node.user_name },
          provider: this.$props.provider
        })
      }
      else if (this.getActualView == "reportePoker") {
        this.$store.dispatch("getReportPoker", {
          startDate: this.$props.startDate + " " + this.$props.startHour + ":00",
          endDate: this.$props.endDate + " " + this.$props.endHour + ":00",
          id: { id: this.$props.node.id, name: this.$props.node.user_name }
        })
      }
    }
  },
}
</script>