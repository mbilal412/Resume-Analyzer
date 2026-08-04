import { clerkAppearance } from '../../../clerkTheme';

export const navbarUserButtonAppearance = {
  ...clerkAppearance,
  elements: {
    ...clerkAppearance.elements,
    userButtonPopoverCard: 'navbar__user-popover',
    userButtonPopoverActionButton: 'navbar__user-action',
    userButtonPopoverActionButtonText: 'navbar__user-action-text',
    userButtonPopoverFooter: 'navbar__user-footer',
    userButtonBox: 'navbar__user-box',
    userButtonTrigger: 'navbar__user-trigger',
    userButtonOuterIdentifier: 'navbar__user-name',
    userButtonAvatarBox: 'navbar__avatar-box',
    avatarBox: 'navbar__avatar-box',
  },
};
