'use client'

import Add from '../public/Add'
import { SelectProps, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { Button, Drawer, Flex, Grid, IconButton, Modal, Select, TextField } from '@/libs/primitives'
import { FormAction } from '@/libs/shared'

export default function Home() {
  const [state, setState] = useState(false)
  const [open, setOpen] = useState(false)

  const handleChange: SelectProps['onChange'] = (event) => {
    setValue(event.target.value as string)
  }
  const [value, setValue] = useState('')
  const toggleDrawer = (open: boolean) => () => {
    setState(open)
  }

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
    </Grid>
  )
}

const AddStyle = styled(Add)`
  path {
    fill: red;
  }
`
