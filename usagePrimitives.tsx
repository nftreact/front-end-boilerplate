'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as Yup from 'yup';

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
  Typography,
} from '@/libs/primitives';
import { BottomsheetHeader, FormAction } from '@/libs/shared';

import Add from './public/Add';

const formSchema = Yup.object({
  name: Yup.string().required('وارد کردن نام الزامی است'),
  title: Yup.string().required('Title is required'),
});

export type FormSchemaType = Yup.InferType<typeof formSchema>;

export default function Home() {
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('option1');
  const [checked, setChecked] = useState(false);

  const [value, setValue] = useState('');
  const toggleDrawer = (open: boolean) => () => {
    setState(open);
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const [selected1, setSelected1] = useState<string[]>([]);

  const handleChange1 = (values: string[]) => {
    setSelected1(values);
    console.log('Selected values:', values);
  };

  const [error, setError] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    console.log('Form Data:', data);
  };

  return (
    <Grid style={{ padding: '24px', display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Flex direction={{ mobile: 'row' }} gap={{ mobile: '16px' }} wrap={{ mobile: 'wrap' }}>
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

      <Flex>
        <Select
          placeholder='سمپل تست '
          label='سمپل تست '
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
          ]}
          className='my-custom-class'
          onMouseEnter={() => console.log('hovered')}
        />
      </Flex>

      <Flex direction={{ mobile: 'row' }} gap={{ mobile: '16px' }}>
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
      <Flex gap={{ mobile: '16px' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            // startAdornment={<AddStyle />}
            // endAdornment={<AddStyle />}
            id='name'
            {...register('name')}
            error={Boolean(errors.name?.message)}
            errorText={errors.name?.message}
            placeholder='تست شماره efraewrwer '
            lable='تست شماره یک'
          />
          <Button type='submit'>submit</Button>
        </form>
      </Flex>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Flex>dsfdf</Flex>
        <FormAction
          onClose={() => {
            toggleDrawer(false);
            setOpen(false);
          }}
        />
      </Modal>
      <Drawer isFullHeight isOpen={state} slideDirection='down' onClose={toggleDrawer(false)}>
        <BottomsheetHeader title='تست شماره یک' onClose={toggleDrawer(false)} />
        <form
          onSubmit={e => {
            e.preventDefault(); // prevent page reload
            console.log('dfad');
          }}
        >
          <Flex height={{ mobile: '100%' }} direction={{ mobile: 'column' }} gap={{ mobile: '24px' }}>
            sample
            <FormAction onClose={toggleDrawer(false)} />
          </Flex>
        </form>
      </Drawer>

      <Flex direction={{ mobile: 'column', tablet: 'row', laptop: 'column' }} gap={{ mobile: '16px' }}>
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
          onChange={e => {
            setChecked(e.target.checked);
            setError(true);
          }}
        />
      </div>
      <div>
        <h2>Choose options:</h2>
        <MultiCheckbox isRow options={options} defaultValues={['option2']} onChange={handleChange1} />
      </div>

      <Typography variant='h1'>سمپل تست</Typography>
      <Typography variant='body1' fontWeight={{ mobile: 400, laptop: 600 }}>
        سمپل تست
      </Typography>
    </Grid>
  );
}

const AddStyle = styled(Add)`
  path {
    fill: red;
  }
`;
