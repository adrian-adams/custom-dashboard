import React from 'react'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'

export const InputTitle = ({value, onChange}) => {
  return ( 
    <>
      <div className="grid w-full items-center gap-3 text-white">
        <Label htmlFor="title">Title</Label>
        <Input 
          id={value} 
          value={value} 
          onChange={onChange} 
          type="text" 
          placeholder="Add Title" 
          className='text-white' 
          required />
      </div>
    </>
  )
}
export default InputTitle
