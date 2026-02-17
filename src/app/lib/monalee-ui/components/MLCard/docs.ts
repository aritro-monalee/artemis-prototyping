// Code examples for MLCard component documentation

export const examples = {
  Default: `<Card className="w-[420px]">
  <CardHeader>
    <CardTitle>Title Text</CardTitle>
    <CardDescription>This is a card description.</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="p-6 text-sm">
      Your content here
    </div>
  </CardContent>
  <CardFooter>
    <div className="p-6 text-sm">
      Footer content
    </div>
  </CardFooter>
</Card>`,

  LoginForm: `<Card className="w-[420px]">
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardDescription>
      Enter your email below to login to your account
    </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Email</label>
      <MLInput placeholder="m@example.com" type="email" />
    </div>
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Password</label>
      <MLInput placeholder="Password" type="password" />
    </div>
  </CardContent>
  <CardFooter className="flex-col gap-2">
    <MLButton fullwidth>Login</MLButton>
    <MLButton variant="secondary" fullwidth>
      Login with Google
    </MLButton>
  </CardFooter>
</Card>`,

  MeetingNotes: `<Card className="w-[420px]">
  <CardHeader>
    <CardTitle>Meeting Notes</CardTitle>
    <CardDescription>
      Transcript from the meeting with the client.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-sm leading-5">
      <p>Client requested dashboard redesign.</p>
      <p>1. New analytics widgets</p>
      <p>2. Simplified navigation</p>
      <p>3. Dark mode support</p>
    </div>
  </CardContent>
  <CardFooter>
    <AvatarGroup max={5}>
      <Avatar src="..." fallback="JD" />
      <Avatar src="..." fallback="SM" />
    </AvatarGroup>
  </CardFooter>
</Card>`,

  WithImage: `<Card className="w-[420px]">
  <CardHeader>
    <CardTitle>Property Listing</CardTitle>
    <CardDescription>Beautiful house for sale.</CardDescription>
  </CardHeader>
  <CardContent className="p-0">
    <img
      src="https://images.unsplash.com/photo-..."
      alt="House"
      className="aspect-video w-full object-cover"
    />
  </CardContent>
  <CardFooter className="justify-between">
    <div className="flex gap-2">
      <MLBadge variant="outline" icon={<Bed />}>4</MLBadge>
      <MLBadge variant="outline" icon={<Bath />}>2</MLBadge>
    </div>
    <span className="font-medium">$135,000</span>
  </CardFooter>
</Card>`,

  WithHeaderAction: `<Card className="w-[420px]">
  <CardHeader>
    <div className="flex flex-col gap-1.5">
      <CardTitle>Notifications</CardTitle>
      <CardDescription>You have 3 unread messages.</CardDescription>
    </div>
    <CardAction>
      <MLButton variant="outline" size="sm">
        Mark all read
      </MLButton>
    </CardAction>
  </CardHeader>
  <CardContent>
    {/* Notification list */}
  </CardContent>
  <CardFooter>
    <MLButton variant="ghost" fullwidth>
      View all notifications
    </MLButton>
  </CardFooter>
</Card>`,

  Simple: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>
      Deploy your new project in one-click.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Name</label>
        <MLInput placeholder="Project name" />
      </div>
    </div>
  </CardContent>
  <CardFooter className="justify-between">
    <MLButton variant="outline">Cancel</MLButton>
    <MLButton>Create</MLButton>
  </CardFooter>
</Card>`,
};
