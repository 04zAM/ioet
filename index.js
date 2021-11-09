// Third party modules
const fs = require("fs");
// Clases
const Schedule = require("./Schedule");
// Consts
const regexp = /[=\n]/;

/**
 * Read the data given from a schedule.txt file
 */
function readData() {
  fs.readFile("./schedule.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // Removing blank spaces and spliting the data
    let splited_data = data.toString().replace(" ", "").split(regexp);
    pushData(splited_data);
  });
}

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
  // Iterating between the array
  for (let i = 0; i < data.length; i++) {
    const name1 = data[i].getName;
    for (let j = 0; j < data.length; j++) {
      const name2 = data[j].getName;
      // Comparing if the names are not the same ones
      if (name1 !== name2) {
        var counter = 0;
        for (let k = 0; k < data[i].getSchedule.length; k++) {
          // Comparing if i schedule contains any of j schedule
          if (data[i].getSchedule.includes(data[j].getSchedule[k])) {
            counter++;
          }
        }
        // Pushing to the output array
        output_table.push({
          pair: name1 + "-" + name2,
          counter,
        });
      }
    }
    // Removing the first element of the stack
    data.shift();
  }
  return output_table;
}

readData();
