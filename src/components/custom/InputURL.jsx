import React from 'react'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'

export const InputURL = ({ value, onChange }) => {
  return ( 
    <>
      <div className="grid w-full items-center gap-3 text-white">
        <Label htmlFor="url">URL</Label>
        <Input 
          id="url" 
          type="text" 
          onChange={onChange} 
          value={value}
          placeholder="Add URL" 
          className='text-white' 
         />
      </div>
    </>
  )
}

export default InputURL