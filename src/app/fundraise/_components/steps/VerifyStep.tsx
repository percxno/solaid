'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Twitter, Mail } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function VerifyStep() {
  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <div className="space-y-6">
      {/* <h2 className="text-xl font-semibold">Verify your identity</h2>
      <p className="text-sm text-muted-foreground">
        Choose a provider to verify yourself before launching your fundraiser.
      </p> */}

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => signIn('google', { callbackUrl: '/fundraise' })}
        >
          <Mail size={16} />
          Connect with Google
        </Button>

        {/* <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => signIn('twitter', { callbackUrl: '/fundraise' })}
        >
          <Twitter size={16} />
          Continue with Twitter
        </Button> */}
      </div>
    </div>
  );
}
