import React from "react";

import Task from "./Task";
import AddTask from "./AddTask";
import { sortPriority } from "../helpers/helpers";
import { useSelector } from "react-redux";
import {
  selectAddingTask,
  selectTodayDueTasks,
} from "../store/tasks/tasks.selectors.js";
import { signInWithGooglePopup } from "../utils/firebase/firebase.utils.js";

function TodayDue() {
  const addingTask = useSelector(selectAddingTask);
  const todayDueTasks = useSelector(selectTodayDueTasks);

  const orderedList = sortPriority(todayDueTasks, true);

  return (
    <>
      <div className="w-full border-collapse bg-white text-left text-sm">
        <ul className="flex w-full bg-gray-50">
          <li className="w-3/12 px-3 py-4 font-medium text-gray-900">
            <span className={`flex`}>Task</span>
          </li>
          <li className="w-2/12 px-3 py-4 font-medium text-gray-900">
            <span className={`flex`}>Due Date</span>
          </li>
          <li className="w-2/12 px-3 py-4 font-medium text-gray-900">
            <span className={`flex`}>Category</span>
          </li>
          <li className="w-2/12 px-3 py-4 font-medium text-gray-900">
            <span className={`flex`}>State</span>
          </li>
          <li className="w-3/12 px-3 py-4 font-medium text-gray-900">
            Actions
          </li>
        </ul>
        <ul className="divide-y divide-gray-100 border-t border-gray-100">
          {orderedList.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </ul>
        {addingTask ? <AddTask /> : null}
      </div>
    </>
  );
}

export default TodayDue;
