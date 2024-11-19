<template>
  <div class="my-2" v-if="(node.show || showHiddenTree)">
    <a href="#">
      <span class="collapsible-header collapsible-header-custom waves-effect collapsed"
        :class="node.hijosflag ? 'mr-2' : 'mr-3'" data-toggle="collapse" :href="'#c' + node.id" aria-expanded="false"
        :aria-controls="'c' + node.id" style="color:black">
        <i v-if="node.hijosflag" class="fas fa-angle-down rotate-icon" @click="appendChildren(node)"></i>
      </span>
      <span :class="(selectedUserName == node.user_name ? 'selected-user':'') " class="py-1"
         @click="showChildrenCapital(node.id, node.user_name)">{{ node.user_name }}</span>
    </a>
    <div v-if="hasChildren" class="collapse px-3" :id="'c' + node.id"
      :class="main_tree.user_name == node.user_name ? 'show' : ''">
      <reasignarAgente v-for="child in node.hijos" :key="child.id" :node="child" :startDate="startDate"
        :endDate="endDate" :startHour="startHour" :endHour="endHour" :provider="provider" />
    </div>
  </div>
</template>
<script>
import { mapState,mapActions } from 'vuex';
import reasignarAgente from './reasignarAgente.vue';
export default {
  name: 'reasignarAgente',
  components: { reasignarAgente },
  props: ["node", "startDate", "endDate", "startHour", "endHour", "provider"],
  computed: {
    ...mapState(['selectedUserName']),
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
    ...mapActions(['updateSelectedUserAction']),
    showChildrenCapital(id, userName) {
      // Llama a la acción para actualizar el estado en la store
      this.updateSelectedUserAction({ id, userName });
    }
  },
}
</script>
<style>
.selected-user {
  color: red;
}
</style>