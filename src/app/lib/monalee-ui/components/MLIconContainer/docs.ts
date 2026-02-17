export const examples = {
  Default: `<MLIconContainer icon={<Star />} size="base" />`,

  SizesLucide: `<div className="flex items-end gap-6">
  <MLIconContainer icon={<Star />} size="xs" className="text-gray-700" />
  <MLIconContainer icon={<Star />} size="sm" className="text-gray-700" />
  <MLIconContainer icon={<Star />} size="base" className="text-gray-700" />
  <MLIconContainer icon={<Star />} size="lg" className="text-gray-700" />
  <MLIconContainer icon={<Star />} size="xl" className="text-gray-700" />
  <MLIconContainer icon={<Star />} size="2xl" className="text-gray-700" />
</div>`,

  SizesFontAwesomeSolid: `<div className="flex items-end gap-6">
  <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="xs" />
  <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="sm" />
  <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="base" />
  <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="lg" />
  <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="xl" />
  <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="2xl" />
</div>`,

  IconLibraryComparison: `<div className="flex flex-col gap-8">
  <div>
    <h3 className="text-sm font-medium mb-3">Lucide (Stroke-based)</h3>
    <div className="flex items-center gap-4">
      <MLIconContainer icon={<Star />} size="xl" />
      <MLIconContainer icon={<Bell />} size="xl" />
      <MLIconContainer icon={<Heart />} size="xl" />
    </div>
  </div>

  <div>
    <h3 className="text-sm font-medium mb-3">FontAwesome Solid (Fill-based)</h3>
    <div className="flex items-center gap-4">
      <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="xl" />
      <MLIconContainer icon={<FontAwesomeIcon icon={faBell} />} size="xl" />
      <MLIconContainer icon={<FontAwesomeIcon icon={faHeart} />} size="xl" />
    </div>
  </div>
</div>`,

  WithCustomStyling: `<div className="flex items-center gap-4">
  <MLIconContainer icon={<Settings />} size="lg" className="p-2 bg-gray-200 text-gray-700 rounded-md" />
  <MLIconContainer icon={<User />} size="lg" className="p-2 bg-purple-100 text-purple-600 rounded-full" />
  <MLIconContainer icon={<FontAwesomeIcon icon={faBell} />} size="lg" className="p-2 bg-blue-100 text-blue-600 rounded-lg" />
  <MLIconContainer icon={<Check />} size="lg" className="p-2 bg-green-100 text-green-600 rounded-full" />
</div>`,

  InContext: `<div className="flex flex-col gap-6">
  {/* Button-like usage */}
  <button className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md">
    <MLIconContainer icon={<FontAwesomeIcon icon={faCheck} />} size="base" />
    <span>Confirm</span>
  </button>

  {/* List item with avatar-style icon */}
  <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
    <MLIconContainer icon={<User />} size="lg" className="p-2 bg-purple-100 text-purple-600 rounded-full" />
    <div>
      <div className="font-medium">John Doe</div>
      <div className="text-sm text-gray-500">john@example.com</div>
    </div>
  </div>
</div>`,
};
