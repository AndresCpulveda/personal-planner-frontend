import { createSelector } from "@reduxjs/toolkit";

const selectSelectedDay = (state) => state.days.selectedDay;

const selectTasksReducer = (state) => state.tasks;

export const selectTasksTasks = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.tasks,
);

export const selectTodayDueTasks = createSelector(
  [selectTasksTasks, selectSelectedDay],
  (allTasks, day) =>
    allTasks.filter((task) => {
      const modifiedTask = { ...task, due: task.due.split("T")[0] };
      if (
        modifiedTask.due == day &&
        !modifiedTask.completed &&
        !modifiedTask.dismissed
      ) {
        return modifiedTask;
      }
    }),
);

export const selectTodayCompletedTasks = createSelector(
  [selectTasksTasks, selectSelectedDay],
  (allTasks, day) =>
    allTasks.filter((task) => {
      const modifiedTask = { ...task };
      if (
        modifiedTask.completedAt &&
        modifiedTask.completedAt.split("T")[0] == day &&
        !modifiedTask.dismissed
      ) {
        return modifiedTask;
      }
    }),
);

export const selectAddingTask = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.addingTask,
);

export const selectTasksCategories = createSelector(
  [selectTasksTasks],
  (allTasks) => {
    const categories = [];
    for (let i = 0; i < allTasks.length; i++) {
      const exists = categories.find(
        (category) => category === allTasks[i].category,
      );
      if (!exists) {
        if (allTasks[i].category !== "") {
          categories.push(allTasks[i].category);
        }
      }
    }
    return categories;
  },
);
