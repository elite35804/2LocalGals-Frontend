import store from 'store/dist/store.modern';

export default {
  async saveData(data, suffix) {
    await store.set(`2LocalGals_${suffix}`, JSON.stringify(data));

  },
  async getData(suffix) {
    try {
      return await JSON.parse(store.get(`2LocalGals_${suffix}`) || "{}");
    } catch (e) {
      console.log(e);
      return {}
    }
  }
}
