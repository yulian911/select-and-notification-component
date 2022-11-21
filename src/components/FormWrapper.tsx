import { ReactNode } from "react"

type FormWrapperProps = {
  title: string
  children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2  className='text-center m-0 mb-[2rem]'>
        {title}
      </h2>
      <div
        className="grid gap-y-[1rem]
         gap-x-[0.5rem] justify-start 
         grid-cols-[auto,minmax(auto,400px)] "
      >
        {children}
      </div>
    </>
  )
}