'use client'

import Add from '../public/Add'
import { SelectProps, styled, Typography } from '@mui/material'
import { useState } from 'react'
import {
  Button,
  Drawer,
  Flex,
  Grid,
  IconButton,
  Modal,
  MultiCheckbox,
  RadioButton,
  Select,
  SingleCheckbox,
  TextField,
} from '@/libs/primitives'
import { FormAction } from '@/libs/shared'

export default function Home() {
  const [state, setState] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('option1')
  const [checked, setChecked] = useState(false)

  const handleChange: SelectProps['onChange'] = (event) => {
    setValue(event.target.value as string)
  }
  const [value, setValue] = useState('')
  const toggleDrawer = (open: boolean) => () => {
    setState(open)
  }

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]

  const [selected1, setSelected1] = useState<string[]>([])

  const handleChange1 = (values: string[]) => {
    setSelected1(values)
    console.log('Selected values:', values)
  }

  console.log(selected1, 'selected1selected1selected1')

  return (
    <Grid style={{ padding: '24px', display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Select
        label='مقصد'
        variant='outlined'
        onChange={handleChange}
        value={value}
        options={[
          { value: 10, label: 'سمپل تست ۱' },
          { value: 20, label: 'سمپل تست ۱' },
          { value: 30, label: 'سمپل تست ۱' },
        ]}
      />
      <Flex direction={'row'} gap={'16px'} flexWrap={'wrap'}>
        <Button variant='soft' size='medium' onClick={toggleDrawer(true)}>
          سمپل تست ۱
        </Button>
        <Button variant='solid' size='medium' onClick={() => setOpen(true)}>
          سمپل تست ۱
        </Button>
        <Button variant='text' size='medium'>
          سمپل تست ۱
        </Button>
      </Flex>

      <Flex direction={'row'} gap={'16px'}>
        <IconButton variant='soft' size='medium'>
          <AddStyle />
        </IconButton>
        <IconButton variant='solid' size='medium'>
          <AddStyle />
        </IconButton>
        <IconButton variant='text' size='medium'>
          <AddStyle />
        </IconButton>
      </Flex>
      <Flex gap={'16px'}>
        <TextField startAdornment={<AddStyle />} endAdornment={<AddStyle />} placeholder='تست شماره یک ' />
      </Flex>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Flex padding={'16px'}>dsfdf</Flex>
        <FormAction
          onClose={() => {
            toggleDrawer(false)
            setOpen(false)
          }}
        />
      </Modal>
      <Drawer anchor={'bottom'} open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <form
          onSubmit={(e) => {
            e.preventDefault() // prevent page reload
            console.log('dfad')
          }}
        >
          <Flex>
            <Typography>dfasdfsdfsd سمپل تست ۱</Typography>
          </Flex>
          <FormAction onClose={toggleDrawer(false)} />
        </form>
      </Drawer>

      <Flex direction={'row'} gap={'16px'}>
        <RadioButton
          label='Option 1'
          name='example'
          value='option1'
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
        />
        <RadioButton
          label='Option 2'
          name='example'
          value='option2'
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
        />
      </Flex>
      <div>
        <SingleCheckbox
          label='Accept Terms & Conditions'
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
      <div>
        <h2>Choose options:</h2>
        <MultiCheckbox isRow options={options} defaultValues={['option2']} onChange={handleChange1} />
      </div>
    </Grid>
  )
}

const AddStyle = styled(Add)`
  path {
    fill: red;
  }
`
