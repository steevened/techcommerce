import { UIContext } from '@/context/ui/UIContext';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Dialog,
  Input,
  Typography,
} from '@material-tailwind/react';
import React, { useContext } from 'react';

export const LoginDialog = () => {
  const { loginDialogOpen, setLoginDialogOpen } = useContext(UIContext);

  return (
    <>
      <Dialog
        size="xs"
        open={loginDialogOpen}
        handler={setLoginDialogOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Log In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" />
            <Input label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => setLoginDialogOpen(false)}
              fullWidth
            >
              Sign In
            </Button>
            <Typography variant="small" className="flex justify-center mt-6">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={() => setLoginDialogOpen(false)}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
