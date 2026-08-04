import { SignIn } from '@clerk/clerk-react';
import { clerkAppearance } from '../../../clerkTheme';
import './SignInPage.scss';
import '../../../styles/clerkOverrides.scss';

const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <SignIn 
      appearance={clerkAppearance}
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;