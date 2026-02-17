export const examples = {
  Default: `<MLDrawer direction="bottom">
  <MLDrawerTrigger asChild>
    <Button>Open Bottom Drawer</Button>
  </MLDrawerTrigger>
  <MLDrawerContent>
    <MLDrawerHeader>
      <MLDrawerTitle>Drawer Title</MLDrawerTitle>
      <MLDrawerDescription>
        This is a drawer component that slides in from the bottom.
      </MLDrawerDescription>
    </MLDrawerHeader>
    <MLDrawerBody>
      <p>This is the drawer content.</p>
    </MLDrawerBody>
    <MLDrawerFooter>
      <MLButton>Submit</MLButton>
      <MLButton variant="outline">Cancel</MLButton>
    </MLDrawerFooter>
  </MLDrawerContent>
</MLDrawer>`,

  MoveGoal: `const [goal, setGoal] = useState(350);

<MLDrawer direction="bottom">
  <MLDrawerTrigger asChild>
    <Button>Move Goal</Button>
  </MLDrawerTrigger>
  <MLDrawerContent showClose={false}>
    <MLDrawerHeader>
      <MLDrawerTitle>Move Goal</MLDrawerTitle>
      <MLDrawerDescription>Set your daily activity goal.</MLDrawerDescription>
    </MLDrawerHeader>
    <MLDrawerBody>
      <div className="flex items-center gap-2">
        <button onClick={() => setGoal((g) => Math.max(0, g - 10))}>-</button>
        <div className="text-center">
          <p className="text-7xl font-bold">{goal}</p>
          <p className="text-xs text-muted-foreground">Calories/day</p>
        </div>
        <button onClick={() => setGoal((g) => g + 10)}>+</button>
      </div>
    </MLDrawerBody>
    <MLDrawerFooter>
      <MLButton>Submit</MLButton>
      <MLButton variant="outline">Cancel</MLButton>
    </MLDrawerFooter>
  </MLDrawerContent>
</MLDrawer>`,

  EditProfile: `<MLDrawer direction="bottom">
  <MLDrawerTrigger asChild>
    <Button>Edit Profile</Button>
  </MLDrawerTrigger>
  <MLDrawerContent showClose={false}>
    <MLDrawerHeader>
      <MLDrawerTitle>Edit profile</MLDrawerTitle>
      <MLDrawerDescription>
        Make changes to your profile here.
      </MLDrawerDescription>
    </MLDrawerHeader>
    <MLDrawerBody className="gap-4">
      <MLInput label="Name" placeholder="Enter your name" />
      <MLInput label="Username" placeholder="@username" />
    </MLDrawerBody>
    <MLDrawerFooter>
      <MLButton>Save changes</MLButton>
      <MLButton variant="outline">Cancel</MLButton>
    </MLDrawerFooter>
  </MLDrawerContent>
</MLDrawer>`,

  Top: `<MLDrawer direction="top">
  <MLDrawerTrigger asChild>
    <Button>Open Top Drawer</Button>
  </MLDrawerTrigger>
  <MLDrawerContent>
    <MLDrawerHeader>
      <MLDrawerTitle>Top Drawer</MLDrawerTitle>
      <MLDrawerDescription>
        This drawer slides in from the top.
      </MLDrawerDescription>
    </MLDrawerHeader>
    <MLDrawerBody>
      <p>Content for the top drawer.</p>
    </MLDrawerBody>
  </MLDrawerContent>
</MLDrawer>`,

  Right: `<MLDrawer direction="right">
  <MLDrawerTrigger asChild>
    <Button>Open Right Drawer</Button>
  </MLDrawerTrigger>
  <MLDrawerContent showHandle={false}>
    <MLDrawerHeader>
      <MLDrawerTitle>Right Drawer</MLDrawerTitle>
      <MLDrawerDescription>
        This drawer slides in from the right.
      </MLDrawerDescription>
    </MLDrawerHeader>
    <MLDrawerBody className="gap-4">
      <MLInput label="Name" placeholder="Enter name" />
      <MLInput label="Description" placeholder="Enter description" />
    </MLDrawerBody>
    <MLDrawerFooter>
      <MLButton>Create Item</MLButton>
      <MLButton variant="outline">Cancel</MLButton>
    </MLDrawerFooter>
  </MLDrawerContent>
</MLDrawer>`,

  Left: `<MLDrawer direction="left">
  <MLDrawerTrigger asChild>
    <Button>Open Left Drawer</Button>
  </MLDrawerTrigger>
  <MLDrawerContent showHandle={false}>
    <MLDrawerHeader>
      <MLDrawerTitle>Left Drawer</MLDrawerTitle>
      <MLDrawerDescription>
        This drawer slides in from the left.
      </MLDrawerDescription>
    </MLDrawerHeader>
    <MLDrawerBody>
      <p>Content for the left drawer.</p>
    </MLDrawerBody>
  </MLDrawerContent>
</MLDrawer>`,

  NoCloseButton: `<MLDrawer direction="bottom">
  <MLDrawerTrigger asChild>
    <Button>Open Drawer (No Close Button)</Button>
  </MLDrawerTrigger>
  <MLDrawerContent showClose={false}>
    <MLDrawerHeader>
      <MLDrawerTitle>No Close Button</MLDrawerTitle>
    </MLDrawerHeader>
    <MLDrawerBody>
      <p>Close this drawer using Cancel or clicking outside.</p>
    </MLDrawerBody>
    <MLDrawerFooter>
      <MLButton>Confirm</MLButton>
      <MLButton variant="outline">Cancel</MLButton>
    </MLDrawerFooter>
  </MLDrawerContent>
</MLDrawer>`,

  NoHandle: `<MLDrawer direction="bottom">
  <MLDrawerTrigger asChild>
    <Button>Open Drawer (No Handle)</Button>
  </MLDrawerTrigger>
  <MLDrawerContent showHandle={false}>
    <MLDrawerHeader>
      <MLDrawerTitle>No Handle</MLDrawerTitle>
    </MLDrawerHeader>
    <MLDrawerBody>
      <p>This drawer has no drag handle at the top.</p>
    </MLDrawerBody>
  </MLDrawerContent>
</MLDrawer>`,
};
