<template>
  <v-container>
    <v-row align-content="center" justify="center">
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-select
          :items="SET"
          v-model="equipment.set"
          dense
          solo
        >
          <template slot="label">
            套裝
          </template>
          <template v-slot:selection="{ item }">
            <span class="d-flex justify-center" style="width: 100%;">
              {{ $t(item.text) }}
            </span>
          </template>
          <template v-slot:item="{ item }">
            <span class="d-flex justify-center" style="width: 100%;">
              {{ $t(item.text) }}
            </span>
          </template>
        </v-select>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="固定攻擊(a)"
          v-model.lazy="equipment.atk"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="攻擊%(b)"
          v-model.lazy="equipment.atkp"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="爆擊(c)"
          v-model.lazy="equipment.cri"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="爆擊傷害(d)"
          v-model.lazy="equipment.crid"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="速度(e)"
          v-model.lazy="equipment.spd"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="固定生命(f)"
          v-model.lazy="equipment.hp"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="生命%(g)"
          v-model.lazy="equipment.hpp"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="防禦(h)"
          v-model.lazy="equipment.def"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          label="防禦%(i)"
          v-model.lazy="equipment.defp"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="1"
      >
        <v-text-field
          label="狀態命中%(j)"
          v-model.lazy="equipment.shit"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="1"
      >
        <v-text-field
          label="狀態抵抗%(k)"
          v-model.lazy="equipment.sres"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-btn @click="add" width="100%">Add</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          v-model="fast"
          label="快速輸入(範例:a10 b10.9 c10.9 d20.1)可不照順序"
          hint="a攻擊 b攻擊% c爆擊 d暴傷 e速度 f生命 g生命% h防禦 i防禦% j命中 k抵抗"
          @change="tryParse"
          filled
        ></v-text-field>
      </v-col>
    </v-row>
    <EquipmentList :equipments="equipments" />
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import EquipmentList from '@/components/EquipmentList.vue';

export default {
  name: 'CalculatorContainer',
  components: {
    EquipmentList,
  },
  data() {
    return {
      SET: [
        { text: '速度系列（火）', value: 0},
        { text: '攻擊系列（木）', value: 1},
        { text: '爆擊系列（水）', value: 2},
        { text: '暴傷系列（章魚）', value: 3},
      ],
      FAST: {
        a: 'atk',
        b: 'atkp',
        c: 'cri',
        d: 'crid',
        e: 'spd',
        f: 'hp',
        g: 'hpp',
        h: 'def',
        i: 'defp',
        j: 'shit',
        k: 'sres',
      },
      drawer: false,
      forceRefresed: false,
      copied: false,
      name: '',
      fast: '',
      equipment: {
        set: 0,
        atk: '',
        atkp: '',
        def: '',
        defp: '',
        hp: '',
        hpp: '',
        spd: '',
        shit: '',
        sres: '',
        cri: '',
        crid: '',
      },
    };
  },
  computed: {
    ...mapState(['equipments']),
  },
  methods: {
    ...mapActions(['fetchData']),
    ...mapMutations(['save']),
    tryParse() {
      const a = this.fast.split(' ');
      a.forEach((i) => {
        const result = new RegExp(/(\w)([0-9]*[.]*[0-9]*)/).exec(i);
        if (!result) {
          return;
        }
        this.equipment[this.FAST[result[1]]] = result[2];
      });
      this.fast = '';
      this.add();
    },
    add() {
      this.save(this.equipment);
      this.$set(this, 'equipment', {
        set: 0,
        atk: '',
        atkp: '',
        def: '',
        defp: '',
        hp: '',
        hpp: '',
        spd: '',
        shit: '',
        sres: '',
        cri: '',
        crid: '',
      });
    },
  },
  mounted() {
    window.appc = this;
    this.fetchData();
  },
};
</script>

<style>

</style>
