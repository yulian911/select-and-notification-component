import React,{FC,useState,useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'
import { iNotification } from '../redux/types'
import {TiDelete} from 'react-icons/ti'
import { useAppDispatch } from '../hook/hooks'
import { setNotification } from '../redux/features/notificationSlice'

const Notification:FC<iNotification> = ({message,type}) => {
    const containerEl = document.getElementById('notification-root')
    const [notificationMsg,setNotificationMsg]=useState('')
    const [notificationClass,setNotificationClass]=useState('notification w-[250px] h-[60px] mb-2')
    const dispatch =useAppDispatch()
    const notificationEl =useRef<HTMLDivElement>(null)
    const timeout =useRef<ReturnType<typeof setTimeout>>()
    // Add class to element based on type 
    const addTypeClass =()=>{
        if(type==='success'){
            setNotificationClass('notification  bg-[green] mb-2')
        }
        if(type==='danger'){
            setNotificationClass('notification  bg-[red] mb-2')
        }
        if(type==='warning'){
            setNotificationClass('notification   bg-[orange] mb-2')
        }
    }

    //update notification 

    useEffect(() => {
        if(timeout.current){
            clearTimeout(timeout.current)
            if(notificationEl.current){
                notificationEl.current.style.opacity='0'
            }
            setTimeout(()=>{
                setNotification(message)
                addTypeClass()
                if(notificationEl.current){
                    notificationEl.current.style.opacity='1'
                    timeout.current =setTimeout(()=>{
                        removeNotification()
                    },5000)
                }
            },300)
        }else{
            setNotificationMsg(message)
            addTypeClass()
            setTimeout(()=>{
                    if(notificationEl.current){
                        notificationEl.current.style.opacity='1'
                        timeout.current =setTimeout(()=>{
                            removeNotification()
                        },5000)
                    }
                },20)
        }
    }, [message])
    //Remove Notification
    const removeNotification = () => {
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        if(notificationEl.current){
            notificationEl.current.style.opacity='0'
        }
        setTimeout(() => {
            dispatch(setNotification({message:'',type:'success'}))
        }, 300);
    }
    const output = (
        <div className={`${notificationClass} w-[250px] h-[60px] rounded-[15px] flex flex-col`} ref={notificationEl}>
            <button onClick={removeNotification} className='self-end pr-1'>
                <TiDelete size={30}/>
            </button>
            <p className='text-center text-[20px]'>
            {notificationMsg}   
            </p>
        </div>
    )

 return containerEl ? ReactDOM.createPortal(output,containerEl):null
}

export default Notification






