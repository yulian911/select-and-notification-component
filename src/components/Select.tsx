import React,{useState,useEffect,useRef} from 'react'

export type SelectOption ={
    label: string,
    value: string |number,
}
type MultipleSelectProps={
    multiple:true,
    value: SelectOption[]
    onChange: (value: SelectOption[]) =>void,
}

type SingleSelectProps={
    multiple?:false,
    value?: SelectOption 
    onChange: (value: SelectOption | undefined) =>void,
}


type SelectProps={

    options: SelectOption[]
}&(SingleSelectProps | MultipleSelectProps)



const Select = ({multiple,value,onChange,options}:SelectProps) => {
    const [show,setShow]=useState(false)
    const [highlightedIndex,setHighlightedIndex]=useState(0)
    const containerRef=useRef<HTMLDivElement>(null)
    const clearOptions =()=>{
        multiple ? onChange([]) : onChange(undefined)
    }
    const selectOption=(option:SelectOption)=>{
        if(multiple){
            if(value.includes(option)){
                onChange(value.filter(o=>o !==option))
            }else{
                onChange([...value,option])
            }
        }else{

            if(option !==value) onChange(option)
        }
    }
    const isOptionSelected = (option:SelectOption)=>{

        return multiple? value.includes(option): option ===value
    }
    
    useEffect(() => {
   
        if(show) setHighlightedIndex(0)

    }, [show])
    
    useEffect(() => {
     const handler =(e:KeyboardEvent)=>{
        if(e.target != containerRef.current) return
        switch (e.code){
            case 'Enter':
            case 'Space':
                setShow(!show)
                if(show) selectOption(options[highlightedIndex])
                break;
            case "ArrowUp":
            case "ArrowDown":
            {
                if(!show){
                    setShow(true)
                    break;
                }
                const newValue=highlightedIndex +(e.code === "ArrowDown" ?1:-1)
                if(newValue >=0 && newValue <options.length){
                    setHighlightedIndex(newValue)
                }
                break;
            }
            case "Escape":
                setShow(false)
                break;

        }
     }
     containerRef.current?.addEventListener("keydown",handler)

     return ()=>{
        containerRef.current?.removeEventListener("keydown",handler)
     }
    }, [show,highlightedIndex,options])
    

  return (
    <>
    <div 
        ref={containerRef}
        onBlur={()=>setShow(false)} 
        onClick={()=>setShow(!show)} 
        tabIndex={0} 
        className='relative w-[20em] h-min-[1.5em] 
        border-[0.05em] border-[#777] 
        flex items-center gap-[0.5em] 
        p-[0.5em] rounded-[0.25rem] 
        outline-none focus:border-[hsl(200,100%,50%)] '
        >
        <span className='value flex-grow flex gap-[0.5rem] flex-wrap'>{multiple? value.map(v=>(
            <button 
                className='option-badge flex items-center border-[0.05em] border-[#777] rounded-[0.25rem] py-[0.15em] px-[0.25em] cursor-pointer bg-none outline-none hover:bg-[hsl(0,100%,90%)] hover:border-[hsl(0,100%,50%)]   focus:bg-[hsl(0,100%,90%) ] focus:border-[hsl(0,100%,50%)]'
                key={v.value} 
                onClick={(e)=>{
                e.stopPropagation();
                selectOption(v)
            }}>{v.label}
            <span className='remove-btn'>&times;</span>
            </button>
        )) :value?.label}</span>
        <button 
            onClick={(e)=>{
                e.stopPropagation()
                clearOptions()
            }}
            className='close-buttom bg-none 
            text-[#777] border-none 
            outline-none cursor-pointer 
            p-0 text-[1.25em] focus:text-[#333]
            hover:text-[#333]'
         >
            &times;
        </button>
        <div className="divider bg-[#777] self-stretch w-[0.05em]"></div>
        <div className="caret translate-y-[50%] border-[0.25em] border-[transparent]  border-t-[#777]"></div>
        <ul className={`absolute m-0 p-0 ${show ?"visible":'hidden'}  max-h-[15em] overflow-y-auto border-[0.05em] border-[#777] rounded-[0.25em] w-[100%] left-0 top-[calc(100%+0.25em)] bg-white z-[100]`}>
            {options.map((option,index) =>(
                <li 
                    onClick={e=>{e.stopPropagation(); selectOption(option)}}
                    onMouseEnter={()=>setHighlightedIndex(index)}  
                    key={option.value} 
                    className={`py-[0.25em] px-[0.5em] 
                    ${ isOptionSelected(option)?'bg-[hsl(200,100%,70%)]':''}
                    ${index===highlightedIndex?'bg-[hsl(200,100%,70%)] text-white':''}
                    `} 
                >
                    {option.label}
                </li>
            ) )}
        </ul>
    </div>
    </>

  )
}

export default Select