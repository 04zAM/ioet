class Schedule {
  /**
   * 
   * @param {String} name name
   * @param {Array} schedule schedule
   */
  constructor(name, schedule) {
    this.name = name;
    this.schedule = schedule;
  }

  get getName() {
    return this.name;
  }

  get getSchedule() {
    return this.schedule;
  }
}

module.exports = Schedule;
