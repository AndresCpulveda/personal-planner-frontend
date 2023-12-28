import {useState} from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Alert from './Alert'
import {timeFormatter } from '../helpers/helpers';
import { toRawDate } from '../helpers/helpers';
import { useUpdateTaskMutation } from '../store/tasks/tasks.api'
import { setAllTasks } from '../store/tasks/tasks.slice'
import { modifyTask } from '../store/tasks/tasks.utils'
import { selectTasksTasks } from '../store/tasks/tasks.selectors';
import { deactivateTaskRecurrence } from '../helpers/helpers';

function EditTask({editing, setEditingTask}) {
  const dispatch = useDispatch()

  const [postUpdatedTask, {isLoadingUpdate, updateError}] = useUpdateTaskMutation()
  const allTasks = useSelector(selectTasksTasks)

  const [name, setName] = useState(editing.name)
  const [due, setDue] = useState(editing.due)
  const [priority, setPriority] = useState(editing.priority)
  const [isRecurring, setIsRecurring] = useState(editing.isRecurring || false)
  const [frequencyInterval, setFrequencyInterval] = useState(editing.frequencyInterval || "")
  const [intervalUnit, setIntervalUnit] = useState(editing.intervalUnit || "")
  const [category, setCategory] = useState(editing.category || "")
  const [hoursToComplete, setHoursToComplete] = useState(editing.hoursToComplete || 0)
  const [minutesToComplete, setMinutesToComplete] = useState(editing.minutesToComplete || 0)

  const [alert, setAlert] = useState({})

  const updateTaskOnDB = async (taskToUpdate) => {
    try {
      await postUpdatedTask(taskToUpdate)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleEditTask = async (e) => {
    e.preventDefault()
    //Validate the fields
    if([name, due, priority].includes('')) {
      setAlert({msg: 'Use all the fields', error: true})
      setTimeout(() => {
        setAlert({})
      }, 3000);
      return
    }

    //Clone object to mutate
    const editedTask = {...editing}
    //Assign input data to object (Optimizable by using object state and spread operator)
    editedTask.name = name
    editedTask.due = due
    editedTask.priority = priority
    editedTask.time = timeFormatter(hoursToComplete * 3600 + minutesToComplete * 60)
    editedTask.isRecurring = isRecurring
    editedTask.frequencyInterval = frequencyInterval
    editedTask.category = category

    //If task is recurring, all recurrings must be changed
    if(editing.isRecurring) {
      const [modifiedList, changedTasks] = deactivateTaskRecurrence(editedTask, allTasks)
      dispatch(setAllTasks(modifyTask(editedTask, modifiedList)))
      changedTasks.map(iTask => {
        updateTaskOnDB(iTask)
      })
    }else {
      dispatch(setAllTasks(modifyTask(editedTask, allTasks)))
      updateTaskOnDB(editedTask)
    }

    setEditingTask(false)
  }


  return (
  <>
    <div
      className='fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-95 out-modal p-8 flex place-content-center'
      onClick={e => {
        if(e.target.classList.contains('out-modal')){
          setEditingTask(false)
        }}
      }
    >
      <form
        className='w-2/4 bg-white rounded py-8 px-24 flex flex-col justify-evenly'
        onSubmit={handleEditTask}
      >
        <div className='grid grid-cols-2'>
          <div className='grid gap-8 text-gray-900 font-semibold'>
            <label className='uppercase'>Name</label>
            <label className='uppercase'>Due Date</label>
            <label className='uppercase'>Priority</label>
            <label className='uppercase'>Recurring Task?</label>
            <label className={`flex ${isRecurring ? '' : 'text-gray-500'} uppercase`}>Frequency</label>
            <label className='uppercase'>Category</label>
            <label className='uppercase'>time to complete</label>
          </div>

          <div className='grid gap-8'>
            <input
              autoFocus
              className='bg-gray-300 rounded-md h-8 px-2'
              defaultValue={editing?.name || ''}
              onChange={e => setName(e.target.value)}
            ></input>

            <input
              // defaultValue={due}
              defaultValue={editing?.due ? editing.due.split('T')[0] : due}
              type='date'
              className='bg-gray-300 rounded-md h-8 px-2'
              onChange={e => setDue(e.target.value)}
            ></input>

            <select required defaultValue={editing?.priority || "empty"} className='bg-gray-300 rounded-md h-8 p-2' onChange={e => setPriority(e.target.value)}>
              <option value="empty"></option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select required defaultValue={editing?.isRecurring || "no"} className='bg-gray-300 rounded-md h-8 p-2' onChange={e => setIsRecurring(e.target.value === "no" ? false : true)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <div className={`flex ${isRecurring ? '' : 'text-gray-500'}`}>
              <span className='mr-2 pt-1'>Every:</span>
              <input type='number' defaultValue={editing?.frequencyInterval || frequencyInterval} disabled={!isRecurring} className='bg-gray-300 rounded-md h-8 w-12 p-2' onChange={e => setFrequencyInterval(e.target.value)}></input>
              <select disabled={!isRecurring} defaultValue={editing?.intervalUnit || intervalUnit} onChange={e => {setIntervalUnit(e.target.value)}}>
                <option value='days'>Days</option>
                <option value='weeks'>Weeks</option>
                <option value='months'>Months</option>
              </select>
            </div>

            <input className='bg-gray-300 rounded-md h-8 p-2' defaultValue={editing?.category || category} onChange={e => setCategory(e.target.value)}></input>

            <div className={`flex`}>
              <input type='number' className='bg-gray-300 rounded-md h-8 w-12 p-2' defaultValue={editing?.hoursToComplete || hoursToComplete} onChange={e => setHoursToComplete(parseInt(e.target.value))}></input>
              <span className='ml-1 mr-4 pt-1'>Hours</span>
              <input type='number' className='bg-gray-300 rounded-md h-8 w-12 p-2' defaultValue={editing?.minutesToComplete || minutesToComplete} onChange={e => setMinutesToComplete(parseInt(e.target.value))}></input>
              <span className='ml-1 mr-4 pt-1'>minutes</span>
            </div>
          </div>
        </div>
        {alert.msg ? <Alert alert={alert} />
          :
          <input
            type='submit'
            value='agregar'
            className={`bg-blue-700 uppercase text-lg text-white border border-white py-2 rounded-md w-full font-bold text-center cursor-pointer`}
          ></input>
        }
      </form>
    </div>
  </>
  )
}

export default EditTask