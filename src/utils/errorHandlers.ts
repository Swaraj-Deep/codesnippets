import { toast } from '@/components/organisms/toaster';

const onError = ({
  success,
  error,
}: {
  success: boolean;
  error: { message: string; title: string };
}) => {
  const { message, title } = error;
  if (!success) {
    toast({ title, description: message, variant: 'destructive' });
  }
};

export default onError;
