import { useState } from 'react'

const useInput = (defalutValue: string = '') => {
  const [value, setValue] = useState<string>(defalutValue)

  const onChange = (e: any) => setValue(e.target.value)

  return { value, setValue, onChange }
}

export default useInput
