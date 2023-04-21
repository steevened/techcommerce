import {
  Card,
  Typography,
  Checkbox,
  Button,
  Input,
} from '@material-tailwind/react';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import { FormEvent, ReactElement, useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { techApi } from '@/lib/api/techApi';

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const signUp = async (data: Data) => {
  const result = await techApi.post('/users', data);
  return result;
};

const SignupPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Data>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '12345678',
  });

  const [isTouched, setIsTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signUp(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-82px)] px-5 ">
      <Card color="transparent" shadow={false} className="w-full max-w-md ">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form onSubmit={onSubmit} className="mt-8 mb-2">
          <div className="flex flex-col gap-6 mb-4">
            <div className="flex flex-col items-center space-y-6 sm:space-y-0 sm:flex-row sm:gap-2">
              <Input
                required
                size="lg"
                label="First Name"
                value={data.firstName}
                error={isTouched.firstName && data.firstName.length === 0}
                onBlur={() => setIsTouched({ ...isTouched, firstName: true })}
                onChange={(e) =>
                  setData({
                    ...data,
                    firstName: e.target.value,
                  })
                }
              />
              <Input
                required
                size="lg"
                label="Name"
                value={data.lastName}
                error={isTouched.lastName && data.lastName.length === 0}
                onBlur={() => setIsTouched({ ...isTouched, lastName: true })}
                onChange={(e) =>
                  setData({
                    ...data,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
            <Input
              required
              size="lg"
              label="Email"
              type="email"
              value={data.email}
              error={isTouched.email && data.email.length === 0}
              onBlur={() => setIsTouched({ ...isTouched, email: true })}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />
            <Input
              required
              type="password"
              size="lg"
              label="Password"
              value={data.password}
              error={isTouched.password && data.password.length === 0}
              onBlur={() => setIsTouched({ ...isTouched, password: true })}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 font-normal text-center">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Log In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

SignupPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default SignupPage;
