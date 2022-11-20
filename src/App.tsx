import { useState } from 'react'
import Notification from './components/Notification'
import Select, { SelectOption } from './components/Select'
import { useAppSelector,useAppDispatch } from './hook/hooks'
import { setNotification } from './redux/features/notificationSlice'



const options=[
{label:"First",value:1},
{label:"Second",value:2},
{label:"Third",value:3},
{label:"Fourth",value:4},
{label:"Fifth",value:5},

]


function App() {
  const [counter,setCounter] =useState(1)
  const {message,type}=useAppSelector(state=>state.notification)
  const [value1, setValue1] = useState<SelectOption[]>([options[0]])
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0])
  const dispatch =useAppDispatch()
  const btnClickhandler =(type:'success' | 'danger' | 'warning',msg:any) =>{
    dispatch(setNotification({message:`${msg}-${counter} `,type}))
    setCounter(prevCounter=>prevCounter+1)
  }


  return (
    <div className="w-[100%] h-min-[100vh] flex flex-col justify-start items-center ">
      {message && <Notification message={message} type={type}/>}
      <div className="w-[100%] flex flex-col justify-center items-center">
        <h1 className='text-[2rem]'>Test Notification</h1>
        <div className='flex gap-3'>
          <button className='w-[150px] h-[50px] border-[1px] rounded-[15px] bg-green-400'  onClick={()=>btnClickhandler('success',value2?.label)}>Add success</button>
          <button className='w-[150px] h-[50px] border-[1px] rounded-[15px] bg-red-500 ' onClick={()=>btnClickhandler('danger',value2?.label)}>Add danger</button>
          <button className='w-[150px] h-[50px] border-[1px] rounded-[15px] bg-yellow-400 ' onClick={()=>btnClickhandler('warning',value2?.label)}>Add warning</button>
        </div>
        <div className='mt-[100px]'>
        <Select
          multiple
          options={options}
          value={value1}
          onChange={o => setValue1(o)}
         />
       <br />

        <Select options={options} value={value2} onChange={o => setValue2(o)} />
        
        </div>
        
      </div>
    </div>
  )
}

export default App
