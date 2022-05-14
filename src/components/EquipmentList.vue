<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="mappedParts"
      :items-per-page="20"
      item-key="key"
      class="elevation-1"
      :sort-by="'timestamp'"
      :sort-desc="true"
      :footer-props="{
        itemsPerPageOptions: [20, 30, 50, -1],
      }"
    >
      <template v-slot:item.set="{ item }">
        <span :style="{color: getColor(item.atk, 'set')}">
          {{ SET_MAP[item.set] }}
        </span>
      </template>
      <template v-slot:item.atk="{ item }">
        <span :style="{color: getColor(item.atk, 'atk')}">
          {{ item.atk }}
        </span>
      </template>
      <template v-slot:item.atkp="{ item }">
        <span :style="{color: getColor(item.atkp, 'atkp')}">
          {{ item.atkp }}
        </span>
      </template>
      <template v-slot:item.cri="{ item }">
        <span :style="{color: getColor(item.cri, 'cri')}">
          {{ item.cri }}
        </span>
      </template>
      <template v-slot:item.crid="{ item }">
        <span :style="{color: getColor(item.crid, 'crid')}">
          {{ item.crid }}
        </span>
      </template>
      <template v-slot:item.spd="{ item }">
        <span :style="{color: getColor(item.spd, 'spd')}">
          {{ item.spd }}
        </span>
      </template>
      <template v-slot:item.hp="{ item }">
        <span :style="{color: getColor(item.hp, 'hp')}">
          {{ item.hp }}
        </span>
      </template>
      <template v-slot:item.hpp="{ item }">
        <span :style="{color: getColor(item.hpp, 'hpp')}">
          {{ item.hpp }}
        </span>
      </template>
      <template v-slot:item.def="{ item }">
        <span :style="{color: getColor(item.def, 'def')}">
          {{ item.def }}
        </span>
      </template>
      <template v-slot:item.defp="{ item }">
        <span :style="{color: getColor(item.defp, 'defp')}">
          {{ item.defp }}
        </span>
      </template>
      <template v-slot:item.shit="{ item }">
        <span :style="{color: getColor(item.shit, 'shit')}">
          {{ item.shit }}
        </span>
      </template>
      <template v-slot:item.sres="{ item }">
        <span :style="{color: getColor(item.sres, 'sres')}">
          {{ item.sres }}
        </span>
      </template>
      <template v-slot:item.atkpower="{ item }">
        <v-chip
          class="ma-2"
          label
        >
          {{ Math.ceil(item.atkpower) }}
        </v-chip>
      </template>
      <template v-slot:item.defpower="{ item }">
        <v-chip
          class="ma-2"
          label
        >
          {{ Math.ceil(item.defpower) }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'EquipmentList',

  props: {
    equipments: {
      type: Array,
    },
  },

  data: () => ({
    SET_MAP: ['火', '木', '水', '新火'],
    headers: [
      { text: '套裝', value: 'set', sort: true },
      { text: '攻擊', value: 'atk', sortable: true },
      { text: '攻擊%', value: 'atkp', sortable: true },
      { text: '爆擊', value: 'cri', sortable: true },
      { text: '暴傷', value: 'crid', sortable: true },
      { text: '速度', value: 'spd', sortable: true },
      { text: '生命', value: 'hp', sortable: true },
      { text: '生命%', value: 'hpp', sortable: true },
      { text: '防禦', value: 'def', sortable: true },
      { text: '防禦%', value: 'defp', sortable: true },
      { text: '狀態命中', value: 'shit', sortable: true },
      { text: '狀態抵抗', value: 'sres', sortable: true },
      { text: '攻擊向加成', value: 'atkpower', sortable: true },
      { text: '防禦向加成', value: 'defpower', sortable: true },
      { text: '動作', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    mappedParts() {
      const a = this.equipments.map((part) => ({
        ...part,
        atkpower: Number(part.atk) / 4 + 1 * Number(part.atkp) + 1.5 * Number(part.cri) + 1 * Number(part.crid) + 1.75 * Number(part.spd),
        defpower: Number(part.def) / 8 + 1 * Number(part.defp) + Number(part.hp) / 4 + Number(part.hpp) + 1 * Number(part.sres),
      }));
      return a;
    },
  },

  methods: {
    ...mapMutations(['removeEquipment']),
    getColor(value, key) {
      switch (key) {
        case 'atk':
          if (value > 184) {
            return '#ccac00';
          } else if (value > 136) {
            return 'blueviolet';
          } else {
            return 'blue';
          }
        case 'atkp':
        case 'defp':
        case 'hpp':
        case 'shit':
        case 'sres':
          if (value > 20) {
            return '#ccac00';
          } else if (value > 14) {
            return 'blueviolet';
          } else {
            return 'blue';
          }
        case 'hp':
          if (value > 794) {
            return '#ccac00';
          } else if (value > 560) {
            return 'blueviolet';
          } else {
            return 'blue';
          }
        case 'spd':
          if (value > 12) {
            return '#ccac00';
          } else if (value > 8) {
            return 'blueviolet';
          } else {
            return 'blue';
          }
        case 'cri':
          if (value > 12) {
            return '#ccac00';
          } else if (value > 9) {
            return 'blueviolet';
          } else {
            return 'blue';
          }
        case 'crid':
          if (value > 19) {
            return '#ccac00';
          } else if (value > 13) {
            return 'blueviolet';
          } else {
            return 'blue';
          }
      }
      return '';
    },
    editItem() {},
    deleteItem(item) {
      console.log(item);
      this.removeEquipment(item);
    },
  },

  mounted() {
    window.appa = this;
  },
};
</script>

<style lang="less" scoped>
</style>
