'use client';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import React from 'react';

import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchBar from '@components/searchbar';
import { ICustomer } from '@constant/constant.interface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigation } from '@refinedev/core';
import { useDataGrid } from '@refinedev/mui';

const CustomerList = () => {
  const { show } = useNavigation();
  const { dataGridProps } = useDataGrid<ICustomer>();

  const columns = React.useMemo<GridColDef<ICustomer>[]>(
    () => [
      {
        field: 'customer_id',
        headerName: 'ID',
        type: 'string',
        flex: 3
      },
      {
        field: 'image',
        headerName: 'Image',
        minWidth: 50,
        flex: 2
      },
      {
        field: 'username',
        headerName: 'Username',
        flex: 3
      },
      {
        field: 'account.email',
        headerName: 'Email',
        flex: 4,
        renderCell: ({ row }) => {
          return (
            <Typography className="h-full flex items-center">
              {row.account.email}
            </Typography>
          );
        }
      },
      {
        field: 'phone_number',
        headerName: 'Phone Number',
        flex: 3
      },
      {
        field: 'date_joined',
        headerName: 'Created at',
        flex: 3
      }
    ],
    []
  );

  const searchCustomerHandle = async (query: string) => {
    console.log('searchCustomerHandle', query);
  };

  return (
    <>
      <div className="pb-4 px-2">
        <Stack className="py-6 bg-white rounded-lg px-4">
          <Box className="flex flex-row justify-between items-center">
            <Box className="flex flex-row items-center gap-2">
              <InventoryIcon className="text-2xl" />
              <Typography variant="h2" className="text-2xl font-bold">
                Customers
              </Typography>
              <SearchBar title="Product" handleSubmit={searchCustomerHandle} />
            </Box>
          </Box>
          <Box className="flex flex-col">
            <DataGrid
              {...dataGridProps}
              rows={generateCustomers(10)}
              getRowId={(row) => row.customer_id}
              onCellClick={(cell) => {
                if (cell.field !== 'actions') {
                  show('customers', cell.row.customer_id);
                }
              }}
              columns={columns}
              sx={{
                color: 'black',
                fontSize: '14px',
                '& .MuiDataGrid-row': {
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }
              }}
              className="text-accent my-4"
            />
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default CustomerList;

function generateCustomers(loop: number): ICustomer[] {
  const customers: ICustomer[] = [];

  for (let i = 0; i < loop; i++) {
    customers.push({
      customer_id: `customer-${i + 1}`,
      username: `user${i + 1}`,
      full_name: `Customer Full Name ${i + 1}`,
      phone_number: `+1234567890${i}`,
      date_joined: new Date().toISOString(),
      account: {
        email: `customer${i + 1}@example.com`
      }
    });
  }

  return customers;
}