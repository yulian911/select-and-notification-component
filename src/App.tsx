import { FormEvent, useState } from 'react'
import { AccountForm } from './components/AccountForm'
import { AddressForm } from './components/AdressForm'
import Notification from './components/Notification'
import Select, { SelectOption } from './components/Select'
import UserForm from './components/UserForm'
import { useAppSelector,useAppDispatch } from './hook/hooks'
import { useMultiStepForm } from './hook/useMultiStepForm'
import { setNotification } from './redux/features/notificationSlice'

type FormData = {
  firstName: string
  lastName: string
  age: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const options=[
{label:"First",value:1},
{label:"Second",value:2},
{label:"Third",value:3},
{label:"Fourth",value:4},
{label:"Fifth",value:5},

]


const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}

function App() {
  const [counter,setCounter] =useState(1)
  const [data, setData] = useState(INITIAL_DATA)

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const {message,type}=useAppSelector(state=>state.notification)
  const [value1, setValue1] = useState<SelectOption[]>([options[0]])
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0])
  const {steps,currentStepIndex,step,isFirstStep,back,next,goTo,isLastStep } =useMultiStepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ])
  const dispatch =useAppDispatch()

  const btnClickhandler =(type:'success' | 'danger' | 'warning',msg:any) =>{
    dispatch(setNotification({message:`${msg}-${counter} `,type}))
    setCounter(prevCounter=>prevCounter+1)
  }


  const onSubmit =(e:FormEvent)=>{
    e.preventDefault()
    if (!isLastStep) return next()
    console.log(data)
    alert("Successful Account Creation")
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
        <div className='mt-[100px] relative bg-white border-[1px] border-[black] p-[2rem] m-[1rem] rounded-[0.5rem] max-w-[max-content]'>
          <form onSubmit={onSubmit}>
              <div className='absolute top-[0.5rem] right-[0.5rem] '>
                {currentStepIndex+1}/{steps.length}
              </div>
              {step}
              <div className='mt-[1rem] flex gap-[0.5rem] justify-end '>
                {!isFirstStep && <button type='button' onClick={back} className='bg-[purple] w-[80px] text-white rounded-[2rem]'>Back</button>}
                <button type='submit' className='bg-[blue] w-[80px] text-white rounded-[2rem]' >
                  {isLastStep ?"Finish":"Next"}
                </button>
              </div>
          </form>

        </div>
        
      </div>
    </div>
  )
}

export default App
