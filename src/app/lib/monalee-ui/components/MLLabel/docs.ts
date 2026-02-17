export const examples = {
  Default: `<MLLabel>Email address</MLLabel>`,

  Required: `<MLLabel required>Full name</MLLabel>`,

  WithInput: `<div className="flex flex-col gap-2 w-[300px]">
  <MLLabel htmlFor="email">Email address</MLLabel>
  <MLInput id="email" type="email" placeholder="Enter your email" />
</div>`,

  RequiredWithInput: `<div className="flex flex-col gap-2 w-[300px]">
  <MLLabel htmlFor="name" required>Full name</MLLabel>
  <MLInput id="name" placeholder="Enter your full name" />
</div>`,

  MultipleLabels: `<div className="flex flex-col gap-6 w-[300px]">
  <div className="flex flex-col gap-2">
    <MLLabel htmlFor="firstName" required>First name</MLLabel>
    <MLInput id="firstName" placeholder="John" />
  </div>
  <div className="flex flex-col gap-2">
    <MLLabel htmlFor="lastName" required>Last name</MLLabel>
    <MLInput id="lastName" placeholder="Doe" />
  </div>
  <div className="flex flex-col gap-2">
    <MLLabel htmlFor="nickname">Nickname (optional)</MLLabel>
    <MLInput id="nickname" placeholder="Johnny" />
  </div>
</div>`,
};
