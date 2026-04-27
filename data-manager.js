// Sistema de persistência de dados
const DataManager = {
  async load() {
    try {
      const res = await fetch('/api/data');
      return await res.json();
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
      return { users: [], rooms: [] };
    }
  },

  async save(data) {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
    }
  },

  async saveUsers(users) {
    const data = await this.load();
    data.users = users;
    await this.save(data);
  },

  async saveRooms(rooms) {
    const data = await this.load();
    data.rooms = rooms;
    await this.save(data);
  }
};
