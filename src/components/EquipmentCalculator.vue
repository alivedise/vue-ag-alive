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
          label="攻擊%(a)"
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
          label="爆擊傷害(x)"
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
          label="速度(s)"
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
          label="固定生命(h)"
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
          label="生命%(hp)"
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
          label="防禦(d)"
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
          label="防禦%(d)"
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
          label="狀態命中%(t)"
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
          label="狀態抵抗%(r)"
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
          label="快速輸入(範例:a10 a10.9 c10.9 x20.1)=(固定攻擊10 百分攻擊10.9 爆擊10.9 暴傷20.1)可不照順序 有小數一定要輸入 不用打%"
          hint="a攻擊/攻擊% c爆擊 x暴傷 s速度 h生命/生命% d防禦/防禦% t命中 r抵抗"
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

function isInt(n) {
  return n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

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
      SHORT_GUESS: {
        a: 'atk',
        af: 'atkp',
        cf: 'cri',
        xf: 'crid',
        cdf: 'crid',
        s: 'spd',
        h: 'hp',
        hf: 'hpp',
        d: 'def',
        df: 'defp',
        t: 'shit',
        r: 'res',
        tf: 'shit',
        rf: 'sres',
      },
      GUESS: {
        a: 'a',
        ap: 'atkp',
        c: 'cri',
        cd: 'crid',
        s: 'spd',
        h: 'hp',
        hp: 'hpp',
        d: 'def',
        dp: 'defp',
        sh: 'shit',
        sr: 'sres',
      },
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
      if (this.fast.trim() === '') {
        return;
      }
      const a = this.fast.split(' ');
      a.forEach((i) => {
        const result = new RegExp(/([A-Za-z]+)([0-9]*[.]*[0-9]*)/).exec(i);
        if (!result) {
          return;
        }
        const appendix = result[2].includes('.') ? 'f' : '';
        if (this.SHORT_GUESS[`${result[1]}${appendix}`] in this.equipment) {
          this.equipment[this.SHORT_GUESS[`${result[1]}${appendix}`]] = result[2];
        } else if (this.GUESS[result[1]] in this.equipment) {
          this.equipment[this.GUESS[result[1]]] = result[2];
        } else if (this.FAST[result[1]] in this.equipment) {
          this.equipment[this.FAST[result[1]]] = result[2];
        }
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
