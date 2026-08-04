import { SignUp } from '@clerk/clerk-react';
import { clerkAppearance } from '../../../clerkTheme';
import './SignUpPage.scss';
import '../../../styles/clerkOverrides.scss';

const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      <SignUp 
      appearance={clerkAppearance}
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignUpPage;