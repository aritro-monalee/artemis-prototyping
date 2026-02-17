export const examples = {
  Default: `const [open, setOpen] = useState(false);

<MLButton onClick={() => setOpen(true)}>Open Dialog</MLButton>
<MLDialog
  open={open}
  onOpenChange={setOpen}
  title="Dialog Title"
  description="This is a description of what this dialog does."
  onConfirm={() => {
    console.log('Confirmed');
    setOpen(false);
  }}
  onCancel={() => console.log('Cancelled')}
>
  <p>This is the dialog content.</p>
</MLDialog>`,

  WithForm: `const [open, setOpen] = useState(false);

<MLButton onClick={() => setOpen(true)}>Edit Profile</MLButton>
<MLDialog
  open={open}
  onOpenChange={setOpen}
  title="Edit profile"
  description="Make changes to your profile here."
  confirmText="Save changes"
  onConfirm={() => setOpen(false)}
>
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" defaultValue="John Doe" />
    </div>
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" defaultValue="john@example.com" />
    </div>
  </div>
</MLDialog>`,

  Sizes: `<MLDialog size="sm" title="Small Dialog">
  <p>This is a small dialog (400px max width).</p>
</MLDialog>

<MLDialog size="md" title="Medium Dialog">
  <p>This is a medium dialog (500px max width).</p>
</MLDialog>

<MLDialog size="lg" title="Large Dialog">
  <p>This is a large dialog (650px max width).</p>
</MLDialog>

<MLDialog size="xl" title="Extra Large Dialog">
  <p>This is an extra large dialog (800px max width).</p>
</MLDialog>`,

  DestructiveAction: `const [open, setOpen] = useState(false);

<MLButton variant="destructive" onClick={() => setOpen(true)}>
  <Trash2 className="size-4 mr-2" />
  Delete Item
</MLButton>
<MLDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete Item"
  description="Are you sure? This action cannot be undone."
  confirmText="Delete"
  confirmVariant="destructive"
  onConfirm={() => setOpen(false)}
>
  <div className="bg-red-50 border border-red-200 rounded p-3">
    <p className="text-red-700 text-sm">
      This will permanently remove the item.
    </p>
  </div>
</MLDialog>`,

  NoButtons: `const [open, setOpen] = useState(false);

<MLDialog
  open={open}
  onOpenChange={setOpen}
  title="Information"
  showConfirm={false}
  showCancel={false}
>
  <p>This dialog only has a close button.</p>
</MLDialog>`,

  BlurBackdrop: `<MLDialog
  open={open}
  onOpenChange={setOpen}
  title="Blur Backdrop"
  description="This dialog has a blur backdrop effect."
  backdrop="blur"
  onConfirm={() => setOpen(false)}
>
  <p>The backdrop has a blur effect.</p>
</MLDialog>`,

  WithTrigger: `<MLDialog
  title="Dialog with Trigger"
  description="This uses the trigger prop for uncontrolled behavior."
  trigger={<MLButton>Open Dialog (Trigger)</MLButton>}
  onConfirm={() => console.log('Confirmed')}
>
  <p>This dialog can be opened without managing state.</p>
</MLDialog>`,

  LongContent: `<MLDialog
  open={open}
  onOpenChange={setOpen}
  title="Terms of Service"
  description="Please read our terms carefully."
  showConfirm={false}
  cancelText="Close"
  size="lg"
>
  <div className="flex flex-col gap-4">
    <h4 className="font-medium text-lg">Lorem ipsum</h4>
    <p className="text-base leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
  </div>
</MLDialog>`,
};
