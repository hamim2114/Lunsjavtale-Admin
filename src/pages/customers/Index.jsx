import { Add, BorderColor, DeleteForeverOutlined, LockOpenOutlined, LockOutlined, ModeEditOutlineOutlined, MoreHoriz, Remove, Search } from '@mui/icons-material'
import { Avatar, Box, Button, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DataTable from '../../common/datatable/DataTable';

const rows = [
  { id: '987654', customerName: 'Atlas Freight', email: 'deanna.curtis@example.com', status: 'Active', company: 'Brekke-Willms ' },
  { id: '987324', customerName: 'Atlas Freight', email: 'deanna.curtis@example.com', status: 'lock', company: 'Brekke-Willms ' },
];


const Customers = () => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const [statusFilter, setStatusFilter] = useState('');

  const handleChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const navigate = useNavigate()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  function handleEdit(row) {
    navigate(`/dashboard/orders/edit/${row.id}`)
  }
  function OrderIdClick(row) {
    navigate(`/dashboard/orders/details/${row.id}`)
  }
  const columns = [
    {
      field: 'customerDetails', width: 300,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Customer Name</Typography>
      ),
      renderCell: (params) => {
        const { row } = params;
        return (
          <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
            <Avatar />
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{params.row.customerName}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'status', width: 150,
      renderHeader: (params) => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Status </Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography sx={{ fontSize: { xs: '12px', md: '16px' } }}>{params.row.status}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'companyName', headerName: '', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Company Name</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography sx={{ fontSize: '14px' }}>{params.row.company}</Typography>
        </Stack>
      )
    },
    {
      field: 'email', headerName: '', width: 350,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' }, ml: '20px' }}>Email Address</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%', ml: '20px' }} direction='row' alignItems='center'>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{params.row.email}</Typography>
        </Stack>
      )
    },
    {
      field: 'delete', headerName: '', width: 50,
      renderCell: (params) => {
        return (
          <IconButton sx={{
            borderRadius: '5px',
            width: { xs: '30px', md: '40px' },
            height: { xs: '30px', md: '40px' },
          }} onClick={() => handleEdit(params.row)}>
            <DeleteForeverOutlined />
          </IconButton>
        )
      },
    },
    {
      field: 'lock', headerName: '', width: 50,
      renderCell: (params) => {
        return (
          <IconButton sx={{
            borderRadius: '5px',
            width: { xs: '30px', md: '40px' },
            height: { xs: '30px', md: '40px' },
          }} onClick={() => handleEdit(params.row)}>
            <LockOutlined sx={{
              color:params.row.status === 'lock' ? 'red': 'gray'
            }} />
          </IconButton>
        )
      },
    },
    {
      field: 'edit', headerName: '', width: 50,
      renderCell: (params) => {
        return (
          <IconButton sx={{
            borderRadius: '5px',
            width: { xs: '30px', md: '40px' },
            height: { xs: '30px', md: '40px' },
          }} onClick={() => handleEdit(params.row)}>
            <ModeEditOutlineOutlined />
          </IconButton>
        )
      },
    },
  ];

  // useEffect(() => {
  //   setColumnVisibilityModel({
  //     paymentInfo: isMobile ? false : true,
  //     status: isMobile ? false : true,
  //     deliveryDate: isMobile ? false : true,
  //   })
  // }, [isMobile])

  return (
    <Box maxWidth='xxl'>
      <Stack direction='row' gap={1} alignItems='center'>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Customers</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'primary.main', bgcolor: 'light.main', borderRadius: '4px', px: 1 }}>3 users</Typography>
      </Stack>
      <Stack direction='row' justifyContent='space-between' mt={3} sx={{ height: '40px' }}>
        <Stack direction='row' gap={2}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '480px',
            bgcolor: '#fff',
            width: '100%',
            border: '1px solid lightgray',
            borderRadius: '4px',
            pl: 2
          }}>
            <Input fullWidth disableUnderline placeholder='Search.. ' />
            <IconButton><Search /></IconButton>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <FormControl size='small' fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={5}>All </MenuItem>
                <MenuItem value={10}>New</MenuItem>
                <MenuItem value={20}>Active</MenuItem>
                <MenuItem value={30}>Locked</MenuItem>
                <MenuItem value={30}>Deleted</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Button variant='contained' startIcon={<Add />}>New Customer</Button>
      </Stack>
      <Box mt={3}>
        <DataTable
          columns={columns}
          rows={rows}
          columnVisibilityModel={columnVisibilityModel}
        />
      </Box>
    </Box>
  )
}

export default Customers