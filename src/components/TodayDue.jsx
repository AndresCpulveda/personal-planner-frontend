import React from 'react'

import Task from './Task'
import AddTask from './AddTask';
import { sortPriority } from '../helpers/helpers';
import { useSelector } from 'react-redux'
import { selectAddingTask, selectTodayDueTasks } from '../store/tasks/tasks.selectors.js'

function TodayDue() {
    const addingTask = useSelector(selectAddingTask)
    const todayDueTasks = useSelector(selectTodayDueTasks)

    const orderedList = sortPriority(todayDueTasks, true)


    return (
      <>
        <div className="">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-50">
              <tr className=''>
                <th className="px-5 py-4 font-medium text-gray-900">
                  <span className={`flex`}>Task</span>
                </th>
                <th className="px-5  py-4 font-medium text-gray-900">
                  <span className={`flex`}>Due Date</span>
                </th>
                <th className="px-5 py-4 font-medium text-gray-900">
                  <span className={`flex`}>Category</span>
                </th>
                <th className="px-5 py-4 font-medium text-gray-900">
                  <span className={`flex`}>State</span>
                </th>
                <th className="px-5 py-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {orderedList.map( task => <Task task={task} key={task.id} />)}
            </tbody>
          </table>
          {addingTask ? <AddTask /> : null}
        </div>
      </>
    )
}

export default TodayDue