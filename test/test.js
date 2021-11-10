const { outputTable } = require("../index");
const Schedule = require("../Schedule");
var assert = require("assert");
var expect = require("chai").expect;

describe("Iterates around the stack of schedules searching similarities", () => {
  describe("First Test: Three pairs expected", function () {
    it("Should return 2, 2, and 3 respectively", () => {
      let splited_data = [
        "RENE",
        "MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\r",
        "ASTRID",
        "MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
        "ANDRES",
        "MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
      ];
      // Pushing the data
      let schedules = new Array();
      // Iterating between the array
      for (let i = 0; i < splited_data.length; i += 2) {
        // Instancing the schedule object
        let sch = new Schedule(
          splited_data[i], // name
          splited_data[i + 1].toString().replace("\r", "").split(",") // array of schedules
        );
        // Pushing to the stack of schedules
        schedules.push(sch);
      }
      let table = outputTable(schedules);
      let first_pair = table[0].counter;
      let second_pair = table[1].counter;
      let third_pair = table[2].counter;
      // With chai
      expect(first_pair).to.equal(2);
      expect(second_pair).to.equal(2);
      expect(third_pair).to.equal(3);
    });
  });

  describe("Second Test: One pair expected", () => {
    it("Should return 3 times", function () {
      let splited_data = [
        "RENE",
        "MO10:15-12:00,TU10:00-12:00,TH013:00-13:15,SA14:00-18:00,SU20:00-21:00\r",
        "ASTRID",
        "MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
      ];
      // Pushing the data
      let schedules = new Array();
      // Iterating between the array
      for (let i = 0; i < splited_data.length; i += 2) {
        // Instancing the schedule object
        let sch = new Schedule(
          splited_data[i], // name
          splited_data[i + 1].toString().replace("\r", "").split(",") // array of schedules
        );
        // Pushing to the stack of schedules
        schedules.push(sch);
      }
      let table = outputTable(schedules);
      assert.equal(table[0].counter, 3);
    });
  });
});
