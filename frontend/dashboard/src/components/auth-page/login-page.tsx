'use client';

import CommonContainer from '@components/common-container';
import { IAccountWithPassword } from '@constant/interface.constant';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import React from 'react';

const LoginPage = () => {
  const [autoComplete, setAutocomplete] = React.useState('on');
  const [account, setAccount] = React.useState<IAccountWithPassword>({
    email: '',
    password: ''
  });

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('account:', account);
    },
    [account]
  );

  return (
    <div className="w-full h-dvh overflow-hidden flex items-center justify-center">
      <CommonContainer className="w-1/3 flex flex-col gap-10 px-6 py-16 border-solid border-[1px] border-primary-100">
        <Typography
          variant="h1"
          className="text-4xl px-6 font-bold text-accent"
        >
          Login
        </Typography>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 px-4"
          autoComplete={autoComplete === 'on' ? 'on' : 'off'}
          onFocus={() => setAutocomplete('on')}
        >
          <FormControl>
            <TextField
              type="email"
              id="email"
              label="Email"
              value={account.email}
              onInput={(e) =>
                setAccount({
                  ...account,
                  email: e.currentTarget.textContent || ''
                })
              }
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
              sx={{
                '& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                  color: 'accent'
                }
              }}
            />
          </FormControl>

          <FormControl>
            <TextField
              type="password"
              id="password"
              label="Password"
              value={account.password}
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            className="rounded-lg bg-accent text-white font-bold mt-8 py-4"
          >
            Login
          </Button>
        </form>

        <Typography className="text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-accent underline font-semibold">
            Join us here
          </a>
        </Typography>
      </CommonContainer>
    </div>
  );
};

export default LoginPage;
