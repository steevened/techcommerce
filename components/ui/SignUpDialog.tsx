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
import { useContext } from 'react';

export const SignUpDialog = () => {
  const { setSignupDialogOpen, signupDialogOpen } = useContext(UIContext);
  return (
    <>
      <Dialog
        size="xs"
        open={signupDialogOpen}
        handler={setSignupDialogOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
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
              onClick={() => setSignupDialogOpen(false)}
              fullWidth
            >
              Sign Up
            </Button>
            <Typography variant="small" className="flex justify-center mt-6">
              Already have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={() => setSignupDialogOpen(false)}
              >
                Log In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
