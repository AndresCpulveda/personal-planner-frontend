import React from 'react'

import Task from './Task'
import useTasks from './hooks/useTasks';
import AddTask from './AddTask';

function TodayDue() {
   const {addingTask, tasks} = useTasks();

  return (
    <>
      <div className='flex flex-col'>
        <ul className='grid grid-cols-10'>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>done</p></li>
          <li className='col-span-3 border text-center border-white'><p className='text-white uppercase'>name</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>due</p></li>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>priority</p></li>
          <li className='col-span-3 border text-center border-white'><p className='text-white uppercase'>time spent</p></li>
        </ul>
        <div className=''>
          {tasks.map( task => <Task task={task} />)}
          {addingTask ? <AddTask /> : null}
        </div>
      </div>
    </>
  )
}

export default TodayDue