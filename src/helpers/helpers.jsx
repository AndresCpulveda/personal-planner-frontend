import moment from "moment";
import generarId from "./generarId";

export function makeFormattedDate(date) {
  const momentObjDate = moment(date);
  const formattedSaved = moment.utc(momentObjDate).format("MMM Do, YYYY");
  return formattedSaved;
}

export function toFormattedDate(date) {
  return moment(date, "YYYY-MM-DD").format("MMM Do, YYYY");
}

export function toRawDate(date) {
  return moment(date, "MMM Do, YYYY").format("YYYY-MM-DD");
}

export function timeFormatter(timer) {
  if (timer < 0) {
    return "00:00:00";
  }
  const hours = `${Math.floor(timer / 3600)}`;
  const minutes = `${Math.floor((timer - hours * 3600) / 60)}`;
  const seconds = `0${timer % 60}`.slice(-2);
  if (timer < 599) {
    return `0${hours}:0${minutes}:${seconds}`;
  }
  return `0${hours}:${minutes}:${seconds}`;
}

export function timeDeFormatter(timer) {
  const seconds = Number(timer.split(":")[2]);
  const minutes = Number(timer.split(":")[1]);
  const hours = Number(timer.split(":")[0]);
  return hours * 3600 + minutes * 60 + seconds;
}

export function sortPriority(list, boolean) {
  // OPTIMIZAR
  const completed = list.filter((task) => task.completed);
  const uncompleted = list.filter((task) => !task.completed);
  const sorted = uncompleted.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    if (boolean) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
  });
  let result;
  if (boolean) {
    result = [...sorted, ...completed];
  } else {
    result = [...completed, ...sorted];
  }
  return result;
}

export function sortByBoolean(list, boolean) {
  // OPTIMIZAR
  if (boolean) {
    const sorted = list.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    return sorted;
  } else {
    const sorted = list.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
    return sorted;
  }
}

export function sortDueBoolean(list, boolean) {
  // OPTIMIZAR
  if (boolean) {
    const sorted = list.sort((a, b) => {
      const dateA = moment(a.due, "YYYY-MM-DD");
      const dateB = moment(b.due, "YYYY-MM-DD");
      if (!dateA.isAfter(dateB, "day")) {
        return -1;
      }
      if (dateA.isAfter(dateB, "day")) {
        return 1;
      }
      return 0;
    });
    return sorted;
  }
  const sorted = list.sort((a, b) => {
    const dateA = moment(a.due, "YYYY-MM-DD");
    const dateB = moment(b.due, "YYYY-MM-DD");
    if (!dateA.isAfter(dateB, "day")) {
      return 1;
    }
    if (dateA.isAfter(dateB, "day")) {
      return -1;
    }
    return 0;
  });
  return sorted;
}

export function sortCreatedBoolean(list, boolean) {
  // OPTIMIZAR
  if (boolean) {
    const sorted = list.sort((a, b) => {
      const dateA = moment(a.createdAt, "MMM Do, YYYY");
      const dateB = moment(b.createdAt, "MMM Do, YYYY");
      if (!dateA.isAfter(dateB, "day")) {
        return -1;
      }
      if (dateA.isAfter(dateB, "day")) {
        return 1;
      }
      return 0;
    });
    return sorted;
  }
  const sorted = list.sort((a, b) => {
    const dateA = moment(a.createdAt, "MMM Do, YYYY");
    const dateB = moment(b.createdAt, "MMM Do, YYYY");
    if (!dateA.isAfter(dateB, "day")) {
      return 1;
    }
    if (dateA.isAfter(dateB, "day")) {
      return -1;
    }
    return 0;
  });
  return sorted;
}

export function sortTime(list, boolean) {
  const sorted = list.sort((a, b) => {
    const aTime = timeDeFormatter(a.time);
    const bTime = timeDeFormatter(b.time);
    if (boolean) {
      if (aTime < bTime) {
        return -1;
      }
      if (aTime > bTime) {
        return 1;
      }
      return 0;
    } else {
      if (aTime > bTime) {
        return -1;
      }
      if (aTime < bTime) {
        return 1;
      }
      return 0;
    }
  });
  return sorted;
}

export function sortCategory(list, boolean) {
  const sorted = list.sort((a, b) => {
    if (boolean) {
      if (a.category > b.category) {
        return 1;
      }
      if (a.category < b.category) {
        return -1;
      }
      return 0;
    } else {
      if (a.category > b.category) {
        return -1;
      }
      if (a.category < b.category) {
        return 1;
      }
      return 0;
    }
  });
  return sorted;
}

export function extractRecentRecurrings(list) {
  const filtered = list.filter((task) => task.isRecurring); // Extract only the tasks which are recurring
  const recurrings = filtered.reduce((acc, cur) => {
    // Use reduce to iterate each of the array elements while saving in the array accumulator the desired elements (initial value set to [] so the acc is considered an array)
    const alreadyExists = acc.find((task) => task.name === cur.name); // Check if the iterating element already exists in the array accumulator

    if (!alreadyExists) {
      // If not already in the acc then it is added
      const clone = { ...cur };
      acc.push(clone);
    } else {
      // Transform the dates to numbers so they can be compared
      const dateA = moment(alreadyExists.due, "YYYY-MM-DD");
      const dateB = moment(cur.due, "YYYY-MM-DD");
      if (dateB.isAfter(dateA, "day")) {
        // If already in the acc then check if its due value is greater than the interating elements due value
        alreadyExists.due = cur.due; // If iterating element has greater value, previously saved elements due value is updated
      }
    }
    return acc; // Return the accumulated array with unrepeated tasks and each tasks has the greatest due value
  }, []);
  return recurrings;
}

export function createRecurrings(list) {
  const increments = {
    // Create an object with the equivalent increments of days for each intervalUnit
    days: 1,
    weeks: 7,
    Days: 1,
    Weeks: 7,
  };

  const toCreate = list.filter((task) => {
    // Filter out all the tasks which its due date is further than todays date
    task.due = task.due.split("T")[0];
    if (!moment(task.due, "YYYY-MM-DD").isAfter(moment(), "day")) {
      return task;
    }
  });

  const tasksToAdd = toCreate.map((task) => {
    // Use map to iterate on each task to be cloned
    const {
      name,
      priority,
      isRecurring,
      intervalUnit,
      frequencyInterval,
      category,
      time,
      stopWatch,
    } = task; // Destructure object of task
    let latestDue = moment(task.due, "YYYY-MM-DD"); // Calculate (in days) the due date of the task (which is the task with the latest due date)
    const newTasks = []; // Array where the tasks to be created will be stored
    while (moment().add(1, "days").isAfter(latestDue, "day")) {
      // Check if todays date is further in time than the latestDue so we know if more tasks must be created {
      let newDueDays; /// /Variable where the new due date of each task being created will be stored (as days)
      if (intervalUnit === "months") {
        // If the tasks interval unit is months we have to add months instead of days (cause every month has different amount of days)
        newDueDays = latestDue.clone().add(frequencyInterval, "month"); // Create a new date with the corresponding amount of months added (as a string formatted date)
      } else {
        newDueDays = latestDue
          .clone()
          .add(increments[intervalUnit] * frequencyInterval, "day"); // If the tasks interval unit is not months, calculate the increment in days and add it to the last due date
      }
      const newDue = moment(newDueDays)
        .format("YYYY-MM-DD")
        .concat("", "T00:00:00.000Z"); // Formatt (to string date) the newDue date
      const newTask = {
        // CREATE TASK OBJECT TO BE SENT
        name,
        due: newDue,
        priority,
        isRecurring,
        intervalUnit,
        frequencyInterval,
        category,
        time: timeDeFormatter(time),
        completed: false,
        id: generarId(),
        dismissed: false,
        stopWatch,
      };
      newTasks.push(newTask); // Push the created task to the array
      latestDue = newDueDays; // Update the latestDue to the due date of the task recently created
    }
    return newTasks;
  });
  return tasksToAdd.flat();
}

export const deactivateTaskRecurrence = (task, allTasks) => {
  const changedTasks = [];
  const name = allTasks.find((iTask) => iTask.id == task.id).name;
  const modifiedList = allTasks.map((iTask) => {
    if (iTask.name == name) {
      if (iTask.id === task.id) {
        changedTasks.push(task);
        return task;
      }
      const modTask = {
        ...task,
        due: iTask.due,
        completed: iTask.completed,
        createdAt: iTask.createdAt,
        updatedAt: iTask.updatedAt,
        time: iTask.time,
        id: iTask.id,
      };
      changedTasks.push(modTask);
      return modTask;
    }
    return iTask;
  });
  return [modifiedList, changedTasks];
};
