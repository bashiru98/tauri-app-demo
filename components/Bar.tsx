"use client"

import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'

const Bar = () => {

    useEffect(() => {
        invoke('my_custom_command', { _name: "Kelvin Sowah"})
    }, [])
    
    
  return (
    <div>
        <h1>hello there</h1>
    </div>
  )
}

export default Bar