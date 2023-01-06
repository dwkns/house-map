// CustomStringInput.tsx
import {useCallback} from 'react'
import {Box, Stack, Text, TextInput} from '@sanity/ui'
import {StringInputProps, set, unset} from 'sanity'

export function CustomStringInput(props: StringInputProps) {
  const {onChange, value = '', elementProps} = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset()),
    [onChange]
  )
  return (
    <Stack space={3}>
      <TextInput {...elementProps} onChange={handleChange} value={value} />
      <img src={value} alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />
    </Stack>
  )
}
