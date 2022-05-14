class EquipmentDataManager {
  MAX_SLOT = 1000;

  PREFIX = 'agac-equipment-';

  constructor() {
    this.$equipments = [];
    this.getEquipmentList();
  }

  getEquipmentList() {
    new Array(this.MAX_SLOT).fill('x').some((_, i) => {
      const equipment = window.localStorage.getItem(`${this.PREFIX}${i}`);
      if (equipment) {
        this.$equipments.push(JSON.parse(equipment));
      }
    });
  }

  clear() {
    this.$equipments = [];
    new Array(this.MAX_SLOT).fill('x').some((_, i) => {
      window.localStorage.removeItem(`${this.PREFIX}${i}`);
    });
  }

  getSavingDataKey() {
    let emptyId = this.$equipments.length;
    const sorted = this.$equipments.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });
    if (emptyId >= this.MAX_SLOT) {
      emptyId = sorted.length ? sorted[0].id : 0;
    } else {
      new Array(this.MAX_SLOT).fill('x').some((_, i) => {
        if (sorted.findIndex((item) => item.id === i) < 0) {
          emptyId = i;
          return true;
        }
        return false;
      });
    }
    return emptyId;
  }

  get data() {
    return this.$equipments;
  }

  remove(data) {
    this.$equipments.splice(this.$equipments.findIndex((item) => data.id === item.id), 1);
    window.localStorage.removeItem(`${this.PREFIX}${data.id}`);
  }

  save(data) {
    let id = data.id >= 0 ? data.id : this.getSavingDataKey();
    data.id = id;
    data.timestamp = new Date().getTime();
    window.localStorage.setItem(`${this.PREFIX}${id}`, JSON.stringify(data));
    this.$equipments.push(data);
    return data;
  }
}

const instance = new EquipmentDataManager();
window.iii = instance;
export default instance;
