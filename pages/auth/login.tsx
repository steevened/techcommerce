import {
  FormEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { Card, Typography, Button, Input } from '@material-tailwind/react';
import Link from 'next/link';
import { techApi } from '@/lib/api/techApi';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { UIContext } from '@/context/ui/UIContext';
import { useRouter } from 'next/router';

interface Data {
  email: string;
  password: string;
}

const logIn = async (data: Data): Promise<any> => {
  const res = await techApi.post('/users/login', data);
  return res;
};

const LoginPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
  });

  const [isTouched, setIsTouched] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  // console.log(isError);
  const { setUserLoggedIn } = useContext(UIContext);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const promise = async () => await logIn(data);
    try {
      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Logged in successfully',
        error: 'Invalid credentials, please try again',
      });
      const response = await logIn(data);
      if (response.status === 200) {
        setData({
          email: '',
          password: '',
        });
        setIsError(false);
        setUserLoggedIn(true);
        Cookies.set('token', response.data.token);
        router.push('/');
      } else {
        setIsError(true);
        setData({
          email: '',
          password: '',
        });
      }
      // if (response.status === 401) {
      //   setIsError(true);
      //   setData({
      //     email: '',
      //     password: '',
      //   });
      // } else {
      //   setIsError(false);
      // }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-82px)] px-5 ">
      <Card color="transparent" shadow={false} className="w-full max-w-md ">
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your credentials to log in.
        </Typography>
        <form onSubmit={onSubmit} className="mt-8 mb-2">
          <div className="flex flex-col gap-6 mb-4">
            <Input
              size="lg"
              label="Email"
              type="email"
              value={data.email}
              error={isTouched.email && data.email.length === 0 && isError}
              onBlur={() => setIsTouched({ ...isTouched, email: true })}
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={data.password}
              error={
                isTouched.password && data.password.length === 0 && isError
              }
              onBlur={() => setIsTouched({ ...isTouched, password: true })}
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <Button
            type="submit"
            className="mt-6"
            fullWidth
            disabled={data.email.length === 0 || data.password.length === 0}
          >
            Log In
          </Button>
          <Typography color="gray" className="mt-4 font-normal text-center">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

LoginPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
