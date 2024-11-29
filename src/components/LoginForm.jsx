import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase_client } from '../App';

export default function LoginForm() {
  return (
    <>
      <Auth
        supabaseClient={supabase_client}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </>
  );
}
