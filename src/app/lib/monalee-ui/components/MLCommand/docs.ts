export const examples = {
  Default: `<MLCommand className="rounded-lg border shadow-md w-[450px]">
  <MLCommandInput placeholder="Type a command or search..." />
  <MLCommandList>
    <MLCommandEmpty>No results found.</MLCommandEmpty>
    <MLCommandGroup heading="Suggestions">
      <MLCommandItem icon={Calendar} value="calendar">
        Calendar
      </MLCommandItem>
      <MLCommandItem icon={Smile} value="search-emoji">
        Search Emoji
      </MLCommandItem>
      <MLCommandItem icon={Calculator} value="calculator">
        Calculator
      </MLCommandItem>
    </MLCommandGroup>
    <MLCommandSeparator />
    <MLCommandGroup heading="Settings">
      <MLCommandItem icon={User} shortcut="⌘P" value="profile">
        Profile
      </MLCommandItem>
      <MLCommandItem icon={CreditCard} shortcut="⌘B" value="billing">
        Billing
      </MLCommandItem>
      <MLCommandItem icon={Settings} shortcut="⌘S" value="settings">
        Settings
      </MLCommandItem>
    </MLCommandGroup>
  </MLCommandList>
</MLCommand>`,

  Empty: `<MLCommand className="rounded-lg border shadow-md w-[450px]">
  <MLCommandInput placeholder="Search..." />
  <MLCommandList>
    <MLCommandEmpty>No results found.</MLCommandEmpty>
  </MLCommandList>
</MLCommand>`,

  WithManyGroups: `<MLCommand className="rounded-lg border shadow-md w-[450px]">
  <MLCommandInput placeholder="Type a command or search..." />
  <MLCommandList>
    <MLCommandEmpty>No results found.</MLCommandEmpty>
    <MLCommandGroup heading="Mail">
      <MLCommandItem icon={Mail} value="compose-email">
        Compose New Email
      </MLCommandItem>
    </MLCommandGroup>
    <MLCommandSeparator />
    <MLCommandGroup heading="Social">
      <MLCommandItem icon={Github} value="github">
        GitHub
      </MLCommandItem>
    </MLCommandGroup>
    <MLCommandSeparator />
    <MLCommandGroup heading="Account">
      <MLCommandItem icon={User} shortcut="⌘P" value="profile">
        Profile
      </MLCommandItem>
    </MLCommandGroup>
  </MLCommandList>
</MLCommand>`,

  Dialog: `const [open, setOpen] = useState(false);

<>
  <p className="text-sm text-muted-foreground">
    Press <kbd className="border rounded px-1.5 font-mono text-xs">⌘K</kbd> or{' '}
    <button onClick={() => setOpen(true)} className="underline">click here</button>
  </p>
  <MLCommandDialog open={open} onOpenChange={setOpen}>
    <MLCommandInput placeholder="Type a command or search..." />
    <MLCommandList>
      <MLCommandEmpty>No results found.</MLCommandEmpty>
      <MLCommandGroup heading="Suggestions">
        <MLCommandItem icon={Calendar} value="calendar">Calendar</MLCommandItem>
        <MLCommandItem icon={Smile} value="emoji">Search Emoji</MLCommandItem>
      </MLCommandGroup>
    </MLCommandList>
  </MLCommandDialog>
</>`,

  NoIcons: `<MLCommand className="rounded-lg border shadow-md w-[450px]">
  <MLCommandInput placeholder="Search..." />
  <MLCommandList>
    <MLCommandEmpty>No results found.</MLCommandEmpty>
    <MLCommandGroup heading="Fruits">
      <MLCommandItem value="apple">Apple</MLCommandItem>
      <MLCommandItem value="banana">Banana</MLCommandItem>
      <MLCommandItem value="orange">Orange</MLCommandItem>
    </MLCommandGroup>
    <MLCommandSeparator />
    <MLCommandGroup heading="Vegetables">
      <MLCommandItem value="carrot">Carrot</MLCommandItem>
      <MLCommandItem value="broccoli">Broccoli</MLCommandItem>
    </MLCommandGroup>
  </MLCommandList>
</MLCommand>`,

  Interactive: `const [selected, setSelected] = useState(null);

<MLCommand className="rounded-lg border shadow-md w-[450px]">
  <MLCommandInput placeholder="Select an action..." />
  <MLCommandList>
    <MLCommandEmpty>No results found.</MLCommandEmpty>
    <MLCommandGroup heading="Actions">
      <MLCommandItem icon={Calendar} value="calendar" onSelect={() => setSelected('Calendar')}>
        Open Calendar
      </MLCommandItem>
      <MLCommandItem icon={Mail} value="mail" onSelect={() => setSelected('Mail')}>
        Compose Email
      </MLCommandItem>
      <MLCommandItem icon={Settings} value="settings" onSelect={() => setSelected('Settings')}>
        Open Settings
      </MLCommandItem>
    </MLCommandGroup>
  </MLCommandList>
</MLCommand>`,
};
