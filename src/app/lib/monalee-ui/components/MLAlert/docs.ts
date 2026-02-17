export const examples = {
  Default: `<MLAlert
  icon={CircleCheck}
  title="Success! Your changes have been saved."
  description="This is an alert with icon, title and description."
/>`,

  WithIconAndDescription: `<MLAlert
  icon={BookmarkCheck}
  description="This one has an icon and a description only."
/>`,

  DescriptionOnly: `<MLAlert 
  description="This one has a description only. No title. No icon." 
/>`,

  IconAndTitle: `<MLAlert 
  icon={Gift} 
  title="Let's try one with icon and title." 
/>`,

  LongDescription: `<MLAlert
  icon={ShieldAlert}
  description="This is a very long alert description that demonstrates how the component handles extended text content."
/>`,

  LongTitleAndDescription: `<MLAlert
  icon={CircleAlert}
  title="This is an extremely long alert title..."
  description="This is an equally long description that contains detailed information about the alert."
/>`,

  Destructive: `<MLAlert
  variant="destructive"
  icon={CircleAlert}
  title="Something went wrong!"
  description="Your session has expired. Please log in again."
/>`,

  DestructiveWithList: `<MLAlert
  variant="destructive"
  icon={CircleAlert}
  title="Unable to process your payment."
  description={
    <div>
      <p className="mb-2">Please verify your billing information.</p>
      <ul className="list-disc list-inside">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
      </ul>
    </div>
  }
/>`,

  WithAction: `<MLAlert
  icon={CircleCheck}
  title="The selected emails have been marked as spam."
  action={
    <MLButton variant="outline" size="sm">
      Undo
    </MLButton>
  }
/>`,

  AllVariants: `<div className="space-y-4">
  <MLAlert variant="default" icon={Info} title="Default Alert" />
  <MLAlert variant="success" icon={CircleCheck} title="Success Alert" />
  <MLAlert variant="warning" icon={AlertTriangle} title="Warning Alert" />
  <MLAlert variant="destructive" icon={CircleAlert} title="Destructive Alert" />
  <MLAlert variant="info" icon={Info} title="Info Alert" />
</div>`,

  CompoundPattern: `<MLAlert>
  <MLAlertIcon icon={CircleCheck} />
  <div className="flex flex-col flex-1 gap-1">
    <MLAlertTitle>Using compound pattern</MLAlertTitle>
    <MLAlertDescription>
      You can also use the compound pattern for more control.
    </MLAlertDescription>
  </div>
  <MLAlertAction>
    <MLButton variant="outline" size="sm">Action</MLButton>
  </MLAlertAction>
</MLAlert>`,
};
