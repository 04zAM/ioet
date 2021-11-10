const fs = require("fs");
const Schedule = require("./Schedule");

function main() {
  // Read the data given from a schedule.txt file
  fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let regexp = /[=\n]/;
    // Removing blank spaces and spliting the data
    let splited_data = data.toString().replace(" ", "").split(regexp);
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
    // Showing a table with the output array
    console.table(outputTable(schedules));
  });
}

/**
 * Iterates around the stack of schedules searching similarities
 * @param {Array} data Stack of Schedules
 * @returns Array of pairs with a counter of similarities between schedules
 */
function outputTable(data) {
  let output_table = new Array();
  // Iterating between the shedules array twice
  data.map((sch1) => {
    const name1 = sch1.getName;
    data.map((sch2) => {
      const name2 = sch2.getName;
      let counter = 0;
      // Comparing if the names are not the same ones
      if (name1 !== name2) {
        // Iterating between the shedule array twice to comparing
        sch1.getSchedule.map((days1) => {
          const day1 = days1.toString().substring(0, 2);
          const entrance1 = days1.toString().substring(2).split("-")[0];
          const exit1 = days1.toString().substring(2).split("-")[1];
          sch2.getSchedule.map((days2) => {
            const day2 = days2.toString().substring(0, 2);
            const entrance2 = days2.toString().substring(2).split("-")[0];
            const exit2 = days2.toString().substring(2).split("-")[1];
            // Comparing the day for skiping
            if (day1 === day2) {
              // Comparing the hours of entrance and exit for every day
              if (
                (entrance1 >= entrance2 && entrance1 < exit2) ||
                (entrance2 >= entrance1 && entrance2 < exit1)
              ) {
                // If so a counter sums one coincidence between schedules
                counter++;
              }
            }
          });
        });
        // Pushing to the output array
        output_table.push({
          pair: name1 + "-" + name2,
          counter,
        });
      }
    });
    data.shift();
  });
  return output_table;
}

main();

module.exports = {
  outputTable,
  main,
};
