export const examples = {
  Default: `<MLAlertDialog>
  <MLAlertDialogTrigger asChild>
    <MLButton variant="outline">Delete Account</MLButton>
  </MLAlertDialogTrigger>
  <MLAlertDialogContent>
    <MLAlertDialogHeader>
      <MLAlertDialogTitle>Are you absolutely sure?</MLAlertDialogTitle>
      <MLAlertDialogDescription>
        This action cannot be undone. This will permanently delete your account.
      </MLAlertDialogDescription>
    </MLAlertDialogHeader>
    <MLAlertDialogFooter>
      <MLAlertDialogCancel>Cancel</MLAlertDialogCancel>
      <MLAlertDialogAction>Continue</MLAlertDialogAction>
    </MLAlertDialogFooter>
  </MLAlertDialogContent>
</MLAlertDialog>`,

  Destructive: `<MLAlertDialog>
  <MLAlertDialogTrigger asChild>
    <MLButton variant="destructive">Delete Project</MLButton>
  </MLAlertDialogTrigger>
  <MLAlertDialogContent>
    <MLAlertDialogHeader>
      <MLAlertDialogTitle>Delete Project?</MLAlertDialogTitle>
      <MLAlertDialogDescription>
        This will permanently delete the project and all associated data.
      </MLAlertDialogDescription>
    </MLAlertDialogHeader>
    <MLAlertDialogFooter>
      <MLAlertDialogCancel>Cancel</MLAlertDialogCancel>
      <MLAlertDialogAction className="bg-red-600 hover:bg-red-700">
        Delete
      </MLAlertDialogAction>
    </MLAlertDialogFooter>
  </MLAlertDialogContent>
</MLAlertDialog>`,

  WithLongContent: `<MLAlertDialog>
  <MLAlertDialogTrigger asChild>
    <MLButton variant="outline">Terms and Conditions</MLButton>
  </MLAlertDialogTrigger>
  <MLAlertDialogContent className="max-w-2xl">
    <MLAlertDialogHeader>
      <MLAlertDialogTitle>Terms of Service</MLAlertDialogTitle>
      <MLAlertDialogDescription className="max-h-80 overflow-y-auto">
        <p className="mb-4">By using this service, you agree to be bound by these terms.</p>
        <p className="mb-4"><strong>1. Acceptance of Terms</strong><br />...</p>
      </MLAlertDialogDescription>
    </MLAlertDialogHeader>
    <MLAlertDialogFooter>
      <MLAlertDialogCancel>Decline</MLAlertDialogCancel>
      <MLAlertDialogAction>Accept</MLAlertDialogAction>
    </MLAlertDialogFooter>
  </MLAlertDialogContent>
</MLAlertDialog>`,

  ConfirmSubscription: `<MLAlertDialog>
  <MLAlertDialogTrigger asChild>
    <MLButton>Upgrade Plan</MLButton>
  </MLAlertDialogTrigger>
  <MLAlertDialogContent>
    <MLAlertDialogHeader>
      <MLAlertDialogTitle>Upgrade to Pro?</MLAlertDialogTitle>
      <MLAlertDialogDescription>
        You are about to upgrade to the Pro plan at $29/month.
      </MLAlertDialogDescription>
    </MLAlertDialogHeader>
    <MLAlertDialogFooter>
      <MLAlertDialogCancel>Cancel</MLAlertDialogCancel>
      <MLAlertDialogAction>Confirm Upgrade</MLAlertDialogAction>
    </MLAlertDialogFooter>
  </MLAlertDialogContent>
</MLAlertDialog>`,

  LogoutConfirmation: `<MLAlertDialog>
  <MLAlertDialogTrigger asChild>
    <MLButton variant="ghost">Sign Out</MLButton>
  </MLAlertDialogTrigger>
  <MLAlertDialogContent>
    <MLAlertDialogHeader>
      <MLAlertDialogTitle>Sign out?</MLAlertDialogTitle>
      <MLAlertDialogDescription>
        Are you sure you want to sign out?
      </MLAlertDialogDescription>
    </MLAlertDialogHeader>
    <MLAlertDialogFooter>
      <MLAlertDialogCancel>Stay signed in</MLAlertDialogCancel>
      <MLAlertDialogAction>Sign out</MLAlertDialogAction>
    </MLAlertDialogFooter>
  </MLAlertDialogContent>
</MLAlertDialog>`,

  DiscardChanges: `<MLAlertDialog>
  <MLAlertDialogTrigger asChild>
    <MLButton variant="outline">Close Editor</MLButton>
  </MLAlertDialogTrigger>
  <MLAlertDialogContent>
    <MLAlertDialogHeader>
      <MLAlertDialogTitle>Discard unsaved changes?</MLAlertDialogTitle>
      <MLAlertDialogDescription>
        You have unsaved changes that will be lost.
      </MLAlertDialogDescription>
    </MLAlertDialogHeader>
    <MLAlertDialogFooter>
      <MLAlertDialogCancel>Keep editing</MLAlertDialogCancel>
      <MLAlertDialogAction className="bg-red-600 hover:bg-red-700">
        Discard changes
      </MLAlertDialogAction>
    </MLAlertDialogFooter>
  </MLAlertDialogContent>
</MLAlertDialog>`,
};
