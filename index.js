// Third party modules
const fs = require("fs");
// Clases
const Schedule = require("./Schedule");
// Consts
const regexp = /[=\n]/;

/**
 * Read the data given from a schedule.txt file
 */
fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // Removing blank spaces and spliting the data
  let splited_data = data.toString().replace(" ", "").split(regexp);
  pushData(splited_data);
});

/**
 * Iterates between the read data and creating an array of schedules
 * @param {*} data splited data
 */
function pushData(data) {
  let schedules = new Array();
  // Iterating between the array
  for (let i = 0; i < data.length; i += 2) {
    // Instancing the schedule object
    let sch = new Schedule(
      data[i], // name
      data[i + 1].toString().replace("\r", "").split(",") // array of schedules
    );
    // Pushing to the array of schedules
    schedules.push(sch);
  }
  console.table(outputTable(schedules));
}

/**
 * Iterates around the stack of schedules searching similarities
 * @param {Array} data Stack of Schedules
 * @returns Array of pairs with a counter of similarities between schedules
 */
function outputTable(data) {
  var output_table = new Array();
  // Iterating between the shedule array twice
  data.map((sch1) => {
    const name1 = sch1.getName;
    data.map((sch2) => {
      const name2 = sch2.getName;
      let counter = 0;
      // Comparing if the names are not the same ones
      if (name1 !== name2) {
        sch1.getSchedule.map((days1) => {
          const day1 = days1.toString().substring(0, 2);
          const entrance1 = days1.toString().substring(2).split("-")[0];
          const exit1 = days1.toString().substring(2).split("-")[1];
          sch2.getSchedule.map((days2) => {
            const day2 = days2.toString().substring(0, 2);
            const entrance2 = days2.toString().substring(2).split("-")[0];
            const exit2 = days2.toString().substring(2).split("-")[1];
            if (day1 === day2) {
              if (
                (entrance1 >= entrance2 && entrance1 < exit2) ||
                (entrance2 >= entrance1 && entrance2 < exit1)
              ) {
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
