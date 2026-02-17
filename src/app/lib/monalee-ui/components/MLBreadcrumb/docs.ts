export const examples = {
  Default: `<MLBreadcrumb>
  <MLBreadcrumbList>
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Home</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Components</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbPage>Breadcrumb</MLBreadcrumbPage>
    </MLBreadcrumbItem>
  </MLBreadcrumbList>
</MLBreadcrumb>`,

  WithSlashSeparator: `<MLBreadcrumb>
  <MLBreadcrumbList>
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Home</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSlash />
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Components</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSlash />
    <MLBreadcrumbItem>
      <MLBreadcrumbPage>Breadcrumb</MLBreadcrumbPage>
    </MLBreadcrumbItem>
  </MLBreadcrumbList>
</MLBreadcrumb>`,

  WithEllipsis: `<MLBreadcrumb>
  <MLBreadcrumbList>
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Home</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbEllipsis />
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#" hasDropdown>Components</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbPage>Breadcrumb</MLBreadcrumbPage>
    </MLBreadcrumbItem>
  </MLBreadcrumbList>
</MLBreadcrumb>`,

  WithEllipsisAndSlash: `<MLBreadcrumb>
  <MLBreadcrumbList>
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Home</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSlash />
    <MLBreadcrumbItem>
      <MLBreadcrumbEllipsis />
    </MLBreadcrumbItem>
    <MLBreadcrumbSlash />
    <MLBreadcrumbItem>
      <MLBreadcrumbPage>Breadcrumb</MLBreadcrumbPage>
    </MLBreadcrumbItem>
  </MLBreadcrumbList>
</MLBreadcrumb>`,

  WithDropdown: `<MLBreadcrumb>
  <MLBreadcrumbList>
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Home</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#" hasDropdown>Products</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbPage>Item</MLBreadcrumbPage>
    </MLBreadcrumbItem>
  </MLBreadcrumbList>
</MLBreadcrumb>`,

  LongBreadcrumb: `<MLBreadcrumb>
  <MLBreadcrumbList>
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Home</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Dashboard</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbLink href="#">Settings</MLBreadcrumbLink>
    </MLBreadcrumbItem>
    <MLBreadcrumbSeparator />
    <MLBreadcrumbItem>
      <MLBreadcrumbPage>Profile</MLBreadcrumbPage>
    </MLBreadcrumbItem>
  </MLBreadcrumbList>
</MLBreadcrumb>`,
};
