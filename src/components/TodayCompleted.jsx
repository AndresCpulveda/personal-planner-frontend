import { useSelector } from 'react-redux'
import { selectTodayCompletedTasks } from '../store/tasks/tasks.selectors.js'

import Task from './Task'

function TodayCompleted() {
  const todayCompleted = useSelector(selectTodayCompletedTasks)
  
  return (
    <>
      <div className="w-full border-collapse bg-white text-left text-sm">
        <ul className="bg-gray-50 flex w-full">
          <li className="px-3 py-4 font-medium text-gray-900 w-3/12">
            <span className={`flex`}>Task</span>
          </li>
          <li className="px-3 py-4 font-medium text-gray-900 w-2/12">
            <span className={`flex`}>Due Date</span>
          </li>
          <li className="px-3 py-4 font-medium text-gray-900 w-2/12">
            <span className={`flex`}>Category</span>
          </li>
          <li className="px-3 py-4 font-medium text-gray-900 w-2/12">
            <span className={`flex`}>State</span>
          </li>
          <li className="px-3 py-4 font-medium text-gray-900 w-3/12">Actions</li>
        </ul>
        <ul className="divide-y divide-gray-100 border-t border-gray-100">
          {todayCompleted.map( task => <Task task={task} key={task.id} />)}
        </ul>
      </div>
    </>
  )
}

export default TodayCompleted