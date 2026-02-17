export const examples = {
  Default: `<MLButton onClick={() => toast('Event has been created')}>
  Show Toast
</MLButton>`,

  WithDescription: `<MLButton
  onClick={() =>
    toast('Event has been created', {
      description: 'Monday, January 3rd at 6:00pm',
    })
  }
>
  Show Toast with Description
</MLButton>`,

  WithAction: `<MLButton
  onClick={() =>
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
      },
    })
  }
>
  Show Toast with Action
</MLButton>`,

  Success: `<MLButton onClick={() => toast.success('Event has been created')}>
  Show Success Toast
</MLButton>`,

  Info: `<MLButton onClick={() => toast.info('Be at the area 10 minutes before the event time')}>
  Show Info Toast
</MLButton>`,

  Warning: `<MLButton onClick={() => toast.warning('Event start time cannot be earlier than 8am')}>
  Show Warning Toast
</MLButton>`,

  Error: `<MLButton onClick={() => toast.error('Event has not been created')}>
  Show Error Toast
</MLButton>`,

  Loading: `<MLButton
  onClick={() => {
    const toastId = toast.loading('Loading...');
    setTimeout(() => {
      toast.success('Event has been created', { id: toastId });
    }, 2000);
  }}
>
  Show Loading Toast
</MLButton>`,

  PromiseToast: `<MLButton
  onClick={() => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: 'Creating event...',
      success: 'Event has been created',
      error: 'Failed to create event',
    });
  }}
>
  Show Promise Toast
</MLButton>`,

  AllVariants: `<div className="flex flex-col gap-4">
  <MLButton variant="outline" onClick={() => toast('Event has been created')}>
    Simple Toast
  </MLButton>
  <MLButton variant="outline" onClick={() => toast.success('Event has been created')}>
    Success
  </MLButton>
  <MLButton variant="outline" onClick={() => toast.info('Important information')}>
    Info
  </MLButton>
  <MLButton variant="outline" onClick={() => toast.warning('Be careful')}>
    Warning
  </MLButton>
  <MLButton variant="outline" onClick={() => toast.error('Something went wrong')}>
    Error
  </MLButton>
  <MLButton variant="outline" onClick={() => toast.loading('Loading...')}>
    Loading
  </MLButton>
</div>`,
};
