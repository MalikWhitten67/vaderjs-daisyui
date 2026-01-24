'use client';

import { component } from "vaderjs"; 
import Button from "vaderjs-daisyui/Components/Actions/Button";
import { useState, useCallback } from "vaderjs";
import { Badge } from "vaderjs-daisyui/Components/Data/Display/Badge";
const ApiPage = component(() => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    button: true,
    modal: false,
    card: false,
    badge: false,
    table: false,
    stats: false,
    dropdown: false,
    accordion: false,
    swap: false,
    themectrl: false,
    countdown: false,
    avatar: false,
    carousel: false,
    chat: false,
    collapse: false,
    diff: false,
    hover3d: false,
    hovergallery: false,
    kbd: false,
    list: false,
    textrotate: false,
    timeline: false,
    breadcrumbs: false,
    dock: false,
    link: false,
  });

  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const componentDocs = [
    {
      id: "button",
      name: "Button",
      import: 'import Button from "vaderjs-daisyui/Components/Actions/Button"',
      description: "Versatile button component with multiple colors and styles",
      props: [
        { name: "color", type: "string", default: "default", desc: "Color variant: primary, secondary, accent, success, warning, error" },
        { name: "size", type: "string", default: "md", desc: "Size: xs, sm, md, lg" },
        { name: "style", type: "string", default: "default", desc: "Style: outline, ghost, link" },
        { name: "modifier", type: "string", default: "", desc: "Modifier: circle, square, wide, block" },
        { name: "disabled", type: "boolean", default: "false", desc: "Disable the button" },
        { name: "loading", type: "boolean", default: "false", desc: "Show loading state" },
        { name: "onClick", type: "function", default: "", desc: "Click handler" },
        { name: "children", type: "ReactNode", default: "", desc: "Button content" },
      ],
      examples: [
        {
          title: "Basic",
          code: `<Button>Default</Button>
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>`,
        },
        {
          title: "Styles",
          code: `<Button style="outline">Outline</Button>
<Button style="ghost">Ghost</Button>
<Button style="link">Link</Button>`,
        },
        {
          title: "Sizes",
          code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
        },
        {
          title: "With Handler",
          code: `<Button 
  color="primary"
  onClick={() => alert('Clicked!')}
>
  Click Me
</Button>`,
        },
      ],
    },
    {
      id: "modal",
      name: "Modal",
      import: 'import { Modal, ModalAction, useModal } from "vaderjs-daisyui/Components/Actions/Modal"',
      description: "Overlay dialog component for displaying important content or forms",
      props: [
        { name: "isOpen", type: "boolean", default: "", desc: "Control modal visibility" },
        { name: "onClose", type: "function", default: "", desc: "Callback when modal closes" },
        { name: "title", type: "string", default: "", desc: "Modal title" },
        { name: "size", type: "string", default: "max-w-md", desc: "Modal width class" },
        { name: "children", type: "ReactNode", default: "", desc: "Modal content" },
      ],
      examples: [
        {
          title: "Basic Setup",
          code: `import { Modal, useModal } from "vaderjs-daisyui/Components/Actions/Modal"

function MyComponent() {
  const modal = useModal()

  return (
    <>
      <Button onClick={modal.open}>Open Modal</Button>
      <Modal 
        isOpen={modal.isOpen} 
        onClose={modal.close}
        title="Welcome"
      >
        <p>Your content here</p>
      </Modal>
    </>
  )
}`,
        },
        {
          title: "With Actions",
          code: `<Modal 
  isOpen={modal.isOpen} 
  onClose={modal.close}
  title="Confirm Action"
>
  <p>Are you sure?</p>
  <div className="modal-action">
    <ModalAction 
      onClick={handleConfirm} 
      close={modal.close}
    >
      Confirm
    </ModalAction>
    <Button style="outline" onClick={modal.close}>
      Cancel
    </Button>
  </div>
</Modal>`,
        },
      ],
    },
    {
      id: "card",
      name: "Card",
      import: 'import { Card } from "vaderjs-daisyui/Components/Data/Display/Card"',
      description: "Container component for organizing content with title, body, and actions",
      props: [
        { name: "title", type: "ReactNode", default: "", desc: "Card title or header element" },
        { name: "body", type: "string | ReactNode", default: "", desc: "Card content" },
        { name: "actions", type: "ReactNode", default: "", desc: "Action buttons" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
      ],
      examples: [
        {
          title: "Basic Card",
          code: `<Card
  title="Project Dashboard"
  body="Manage your projects and tasks in one place."
/>`,
        },
        {
          title: "With Badge",
          code: `<Card
  title={
    <div className="flex items-center justify-between">
      <span>Status</span>
      <Badge color="success">Active</Badge>
    </div>
  }
  body="Your content here"
/>`,
        },
        {
          title: "With Actions",
          code: `<Card
  title="Project"
  body="Description"
  actions={
    <div className="card-actions justify-end">
      <Button size="sm">Edit</Button>
      <Button size="sm" style="outline">Delete</Button>
    </div>
  }
/>`,
        },
      ],
    },
    {
      id: "badge",
      name: "Badge",
      import: 'import { Badge } from "vaderjs-daisyui/Components/Data/Display/Badge"',
      description: "Small label component for highlighting status or categories",
      props: [
        { name: "color", type: "string", default: "default", desc: "Color: primary, secondary, accent, success, warning, error" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "children", type: "ReactNode", default: "", desc: "Badge content" },
      ],
      examples: [
        {
          title: "Colors",
          code: `<Badge>Default</Badge>
<Badge color="primary">Primary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="error">Error</Badge>`,
        },
        {
          title: "In Cards",
          code: `<Badge color="success">Active</Badge>
<Badge color="warning">Pending</Badge>
<Badge color="error">Inactive</Badge>`,
        },
      ],
    },
    {
      id: "table",
      name: "Table",
      import: 'import Table from "vaderjs-daisyui/Components/Data/Display/Table"',
      description: "Data table component with optional zebra striping and responsive sizing",
      props: [
        { name: "zebra", type: "boolean", default: "false", desc: "Alternate row colors" },
        { name: "size", type: "string", default: "md", desc: "Size: xs, sm, md, lg" },
        { name: "children", type: "ReactNode", default: "", desc: "Table content (thead, tbody)" },
      ],
      examples: [
        {
          title: "Basic Table",
          code: `<Table zebra>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>Admin</td>
      <td><Badge color="success">Active</Badge></td>
    </tr>
  </tbody>
</Table>`,
        },
        {
          title: "Compact Size",
          code: `<Table zebra size="sm">
  {/* content */}
</Table>`,
        },
      ],
    },
    {
      id: "stats",
      name: "Stats",
      import: 'import { Stats, Stat, StatTitle, StatValue, StatDesc } from "vaderjs-daisyui/Components/Data/Display/Stat"',
      description: "Display metrics and KPIs with values and descriptions",
      props: [
        { name: "children", type: "ReactNode", default: "", desc: "Stat components" },
      ],
      examples: [
        {
          title: "Basic Stats",
          code: `<Stats>
  <Stat centered>
    <StatTitle>Total Users</StatTitle>
    <StatValue className="text-primary">4,200</StatValue>
    <StatDesc>↗ 400 (22%)</StatDesc>
  </Stat>
  <Stat centered>
    <StatTitle>Revenue</StatTitle>
    <StatValue className="text-green-400">$89,400</StatValue>
    <StatDesc>↗ $1,800 (12%)</StatDesc>
  </Stat>
</Stats>`,
        },
      ],
    },
    {
      id: "dropdown",
      name: "Dropdown",
      import: 'import Dropdown from "vaderjs-daisyui/Components/Actions/Dropdown"',
      description: "Menu dropdown component for navigation and actions",
      props: [
        { name: "buttonContent", type: "ReactNode", default: "", desc: "Button label or content" },
        { name: "contentClass", type: "string", default: "", desc: "Classes for dropdown content" },
        { name: "children", type: "ReactNode", default: "", desc: "Menu items (li > a)" },
      ],
      examples: [
        {
          title: "Basic Dropdown",
          code: `<Dropdown
  buttonContent={<span>Menu</span>}
  contentClass="dropdown-content menu bg-base-100 rounded-box w-52"
>
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><a>Item 3</a></li>
</Dropdown>`,
        },
      ],
    },
    {
      id: "accordion",
      name: "Accordion",
      import: 'import { Accordion } from "vaderjs-daisyui/Components/Data/Display/Accordion"',
      description: "Collapsible content panels for FAQs and grouped information",
      props: [
        { name: "items", type: "Array", default: "", desc: "Array of {title, content, open}" },
      ],
      examples: [
        {
          title: "Basic Accordion",
          code: `<Accordion items={[
  { 
    title: "What is VaderJS?", 
    content: "A DaisyUI wrapper library",
    open: true 
  },
  { 
    title: "Is it free?", 
    content: "100% free and open source" 
  }
]} />`,
        },
      ],
    },
    {
      id: "swap",
      name: "Swap",
      import: 'import { Swap } from "vaderjs-daisyui/Components/Data/Display/Swap"',
      description: "Toggle between two states with smooth transitions",
      props: [
        { name: "on", type: "VNode | VNode[] | string", default: "", desc: "Content to show when active" },
        { name: "off", type: "VNode | VNode[] | string", default: "", desc: "Content to show when inactive" },
        { name: "indeterminate", type: "VNode | VNode[] | string", default: "", desc: "Content for indeterminate state" },
        { name: "active", type: "boolean", default: "false", desc: "Controlled toggle state" },
        { name: "rotate", type: "boolean", default: "false", desc: "Add rotate animation" },
        { name: "flip", type: "boolean", default: "false", desc: "Add flip animation" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "onChange", type: "function", default: "", desc: "Callback when state changes" },
        { name: "clickable", type: "boolean", default: "true", desc: "If true, label click toggles state" },
      ],
      examples: [
        {
          title: "Basic Swap",
          code: `<Swap 
  on="🌞"
  off="🌙"
  onChange={(active) => console.log('Active:', active)}
/>`,
        },
        {
          title: "With Icons",
          code: `<Swap 
  on={<SunIcon />}
  off={<MoonIcon />}
  rotate
  className="w-12 h-12"
/>`,
        },
      ],
    },
    {
      id: "themectrl",
      name: "ThemeController",
      import: 'import { ThemeController } from "vaderjs-daisyui/Components/Data/Display/ThemeController"',
      description: "Theme selector with multiple input types",
      props: [
        { name: "type", type: "string", default: "checkbox", desc: "Type of input: checkbox, radio, toggle, swap, buttons, dropdown" },
        { name: "value", type: "string | boolean", default: "", desc: "Initial value" },
        { name: "options", type: "ThemeOption[]", default: "", desc: "Options for radios, buttons, dropdown" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "direction", type: "string", default: "horizontal", desc: "Direction for buttons/radios: vertical or horizontal" },
        { name: "onChange", type: "function", default: "", desc: "Callback when value changes" },
        { name: "swapRotate", type: "boolean", default: "false", desc: "Add rotate animation for swap type" },
        { name: "swapFlip", type: "boolean", default: "false", desc: "Add flip animation for swap type" },
      ],
      examples: [
        {
          title: "Theme Selector",
          code: `<ThemeController
  type="dropdown"
  options={[
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "cupcake", label: "Cupcake" }
  ]}
  onChange={(theme) => setTheme(theme)}
/>`,
        },
      ],
    },
    {
      id: "countdown",
      name: "Countdown",
      import: 'import Countdown from "vaderjs-daisyui/Components/Data/Display/Countdown"',
      description: "Animated countdown timer with multiple units",
      props: [
        { name: "units", type: "CountdownUnit[]", default: "", desc: "Array of countdown units" },
        { name: "interval", type: "number", default: "1000", desc: "Milliseconds per tick" },
        { name: "loop", type: "boolean", default: "true", desc: "Whether to loop after completion" },
      ],
      examples: [
        {
          title: "Basic Countdown",
          code: `<Countdown
  units={[
    { label: "Days", value: 5 },
    { label: "Hours", value: 12 },
    { label: "Minutes", value: 30 },
    { label: "Seconds", value: 45 }
  ]}
/>`,
        },
      ],
    },
    {
      id: "avatar",
      name: "Avatar",
      import: 'import { Avatar, AvatarGroup } from "vaderjs-daisyui/Components/Data/Display/Avatar"',
      description: "User avatar with optional status indicators and grouping",
      props: [
        { name: "src", type: "string", default: "", desc: "Image source URL" },
        { name: "size", type: "string", default: "w-12", desc: "Size class: w-8, w-12, w-16, w-24, etc." },
        { name: "rounded", type: "string", default: "full", desc: "Border radius: none, sm, md, xl, full" },
        { name: "mask", type: "string", default: "", desc: "Mask shape: mask-heart, mask-squircle, mask-hexagon-2" },
        { name: "ring", type: "string", default: "", desc: "Ring color: ring-primary, ring-secondary, etc." },
        { name: "ringOffset", type: "string", default: "", desc: "Ring offset background" },
        { name: "online", type: "boolean", default: "false", desc: "Show online status indicator" },
        { name: "offline", type: "boolean", default: "false", desc: "Show offline status indicator" },
        { name: "placeholder", type: "string", default: "", desc: "Placeholder text if no image" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
      ],
      examples: [
        {
          title: "Basic Avatar",
          code: `<Avatar src="/avatar.jpg" online />`,
        },
        {
          title: "Avatar Group",
          code: `<AvatarGroup>
  <Avatar src="/avatar1.jpg" />
  <Avatar src="/avatar2.jpg" />
  <Avatar src="/avatar3.jpg" />
</AvatarGroup>`,
        },
      ],
    },
    {
      id: "carousel",
      name: "Carousel",
      import: 'import Carousel from "vaderjs-daisyui/Components/Data/Display/Carousel"',
      description: "Image carousel with navigation controls",
      props: [
        { name: "images", type: "string[]", default: "", desc: "Array of image URLs" },
        { name: "snap", type: "string", default: "start", desc: "Snap position: start, center, end" },
        { name: "width", type: "string", default: "full", desc: "Item width: full or half" },
        { name: "vertical", type: "boolean", default: "false", desc: "Vertical layout" },
        { name: "containerWidth", type: "string", default: "w-64", desc: "Container width class" },
        { name: "fullBleed", type: "boolean", default: "false", desc: "Full-bleed layout" },
        { name: "indicators", type: "boolean", default: "false", desc: "Show indicator buttons" },
        { name: "controls", type: "boolean", default: "false", desc: "Show next/prev buttons" },
      ],
      examples: [
        {
          title: "Basic Carousel",
          code: `<Carousel
  images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]}
  indicators
/>`,
        },
      ],
    },
    {
      id: "chat",
      name: "ChatBubbles",
      import: 'import ChatBubbles from "vaderjs-daisyui/Components/Data/Display/ChatBubbles"',
      description: "Chat message bubbles with avatars and timestamps",
      props: [
        { name: "messages", type: "ChatMessage[]", default: "", desc: "Array of chat messages" },
      ],
      examples: [
        {
          title: "Chat Conversation",
          code: `<ChatBubbles
  messages={[
    {
      id: 1,
      author: "Alice",
      avatar: "/alice.jpg",
      content: "Hello!",
      placement: "start",
      time: "12:45"
    },
    {
      id: 2,
      author: "Bob",
      avatar: "/bob.jpg",
      content: "Hi there!",
      placement: "end",
      time: "12:46"
    }
  ]}
/>`,
        },
      ],
    },
    {
      id: "collapse",
      name: "Collapse",
      import: 'import Collapse from "vaderjs-daisyui/Components/Data/Display/Collapse"',
      description: "Collapsible content sections",
      props: [
        { name: "items", type: "CollapseItem[]", default: "", desc: "Array of collapse items" },
      ],
      examples: [
        {
          title: "Collapsible Sections",
          code: `<Collapse
  items={[
    {
      id: 1,
      title: "Section 1",
      content: "Content for section 1",
      arrow: true
    },
    {
      id: 2,
      title: "Section 2",
      content: "Content for section 2",
      plus: true
    }
  ]}
/>`,
        },
      ],
    },
    {
      id: "diff",
      name: "Diff",
      import: 'import Diff from "vaderjs-daisyui/Components/Data/Display/Diff"',
      description: "Image comparison slider",
      props: [
        { name: "item1", type: "any", default: "", desc: "First item to compare" },
        { name: "item2", type: "any", default: "", desc: "Second item to compare" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "initial", type: "number", default: "50", desc: "Initial slider position (0-100)" },
      ],
      examples: [
        {
          title: "Image Comparison",
          code: `<Diff
  item1={<img src="/before.jpg" alt="Before" />}
  item2={<img src="/after.jpg" alt="After" />}
/>`,
        },
      ],
    },
    {
      id: "hover3d",
      name: "Hover3D",
      import: 'import Hover3D from "vaderjs-daisyui/Components/Data/Display/Hover3D"',
      description: "3D hover effect component",
      props: [
        { name: "children", type: "any", default: "", desc: "Content to apply 3D effect to" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "as", type: "string", default: "div", desc: "HTML element type: div or a" },
        { name: "href", type: "string", default: "", desc: "URL if using as='a'" },
      ],
      examples: [
        {
          title: "3D Hover Card",
          code: `<Hover3D className="card">
  <div className="card-body">
    <h2 className="card-title">Hover me!</h2>
  </div>
</Hover3D>`,
        },
      ],
    },
    {
      id: "hovergallery",
      name: "HoverGallery",
      import: 'import HoverGallery from "vaderjs-daisyui/Components/Data/Display/HoverGallery"',
      description: "Image gallery with hover-based navigation",
      props: [
        { name: "images", type: "(string | JSX.Element)[]", default: "", desc: "Array of images or elements" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "as", type: "string", default: "figure", desc: "Container element type" },
        { name: "altPrefix", type: "string", default: "Gallery image", desc: "Alt text prefix for images" },
      ],
      examples: [
        {
          title: "Hover Image Gallery",
          code: `<HoverGallery
  images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]}
  className="w-96 h-64"
/>`,
        },
      ],
    },
    {
      id: "kbd",
      name: "Kbd",
      import: 'import Kbd from "vaderjs-daisyui/Components/Data/Display/Kbd"',
      description: "Keyboard key/shortcut display",
      props: [
        { name: "children", type: "any", default: "", desc: "Key label" },
        { name: "size", type: "string", default: "md", desc: "Size: xs, sm, md, lg, xl" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
      ],
      examples: [
        {
          title: "Keyboard Shortcuts",
          code: `<div>
  <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
</div>`,
        },
      ],
    },
    {
      id: "list",
      name: "List",
      import: 'import { List, ListRow, ListCol } from "vaderjs-daisyui/Components/Data/Display/List"',
      description: "Structured list component with rows and columns",
      props: [
        { name: "children", type: "any", default: "", desc: "List content" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "as", type: "string", default: "ul", desc: "Container element: ul, ol, or div" },
      ],
      examples: [
        {
          title: "Structured List",
          code: `<List>
  <ListRow>
    <ListCol>Item 1</ListCol>
    <ListCol grow>Description 1</ListCol>
  </ListRow>
  <ListRow>
    <ListCol>Item 2</ListCol>
    <ListCol grow>Description 2</ListCol>
  </ListRow>
</List>`,
        },
      ],
    },
    {
      id: "textrotate",
      name: "TextRotate",
      import: 'import { TextRotate, TextRotateInline } from "vaderjs-daisyui/Components/Data/Display/TextRotate"',
      description: "Text rotation animation with multiple words",
      props: [
        { name: "words", type: "string[] | VNode[]", default: "", desc: "Array of words to rotate" },
        { name: "duration", type: "number", default: "10000", desc: "Animation duration in milliseconds" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "wordClassName", type: "string", default: "", desc: "Classes for individual words" },
        { name: "containerClassName", type: "string", default: "", desc: "Classes for inner container" },
        { name: "pauseOnHover", type: "boolean", default: "true", desc: "Pause animation on hover" },
        { name: "lineHeight", type: "string", default: "", desc: "Line height class" },
        { name: "colorVariant", type: "string", default: "single", desc: "Color variant: single, gradient, individual" },
      ],
      examples: [
        {
          title: "Rotating Text",
          code: `<TextRotate
  words={["React", "Vue", "Svelte", "Solid"]}
  duration={5000}
  colorVariant="gradient"
/>`,
        },
      ],
    },
    {
      id: "timeline",
      name: "Timeline",
      import: 'import Timeline from "vaderjs-daisyui/Components/Data/Display/Timeline"',
      description: "Timeline component for displaying chronological events",
      props: [
        { name: "items", type: "TimelineItem[]", default: "", desc: "Array of timeline items" },
        { name: "vertical", type: "boolean", default: "false", desc: "Vertical layout" },
        { name: "snapIcon", type: "boolean", default: "false", desc: "Snap icons to center" },
        { name: "compact", type: "boolean", default: "false", desc: "Compact layout" },
        { name: "responsive", type: "boolean", default: "false", desc: "Responsive layout (vertical on mobile)" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "direction", type: "string", default: "", desc: "Direction: vertical or horizontal" },
        { name: "reverse", type: "boolean", default: "false", desc: "Reverse item order" },
      ],
      examples: [
        {
          title: "Project Timeline",
          code: `<Timeline
  items={[
    {
      start: "Jan 2024",
      middle: "🚀",
      end: "Project Launch",
      box: true
    },
    {
      start: "Mar 2024",
      middle: "✨",
      end: "Version 2.0 Release",
      box: true
    }
  ]}
  vertical
/>`,
        },
      ],
    },
    {
      id: "breadcrumbs",
      name: "Breadcrumbs",
      import: 'import { Breadcrumbs, BreadcrumbIcons } from "vaderjs-daisyui/Components/Data/Display/Breadcrumbs"',
      description: "Navigation breadcrumb component with icons and separators",
      props: [
        { name: "items", type: "BreadcrumbItem[]", default: "", desc: "Array of breadcrumb items" },
        { name: "maxWidth", type: "string", default: "", desc: "Maximum width class: max-w-xs, max-w-md, etc." },
        { name: "size", type: "string", default: "sm", desc: "Size: xs, sm, md, lg, xl" },
        { name: "separator", type: "string", default: "slash", desc: "Separator type: slash, chevron, arrow, bullet, custom" },
        { name: "customSeparator", type: "VNode | string", default: "", desc: "Custom separator element" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "scrollable", type: "boolean", default: "false", desc: "Make breadcrumbs horizontally scrollable" },
      ],
      examples: [
        {
          title: "Basic Breadcrumbs",
          code: `<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Documents", href: "/docs" },
    { label: "API Reference", active: true }
  ]}
/>`,
        },
        {
          title: "With Icons",
          code: `<Breadcrumbs
  items={[
    { label: "Home", icon: BreadcrumbIcons.Home(), href: "/" },
    { label: "Settings", icon: BreadcrumbIcons.Settings(), href: "/settings" },
    { label: "Profile", active: true }
  ]}
  separator="chevron"
/>`,
        },
      ],
    },
    {
      id: "dock",
      name: "Dock",
      import: 'import { Dock, DockIcons, DockExamples } from "vaderjs-daisyui/Components/Data/Display/Dock"',
      description: "Application dock component for navigation and quick actions",
      props: [
        { name: "items", type: "DockItem[]", default: "", desc: "Array of dock items" },
        { name: "size", type: "string", default: "md", desc: "Size: xs, sm, md, lg, xl" },
        { name: "position", type: "string", default: "bottom", desc: "Dock position: bottom, top, left, right" },
        { name: "fixed", type: "boolean", default: "false", desc: "Fixed positioning" },
        { name: "rounded", type: "boolean", default: "true", desc: "Rounded corners" },
        { name: "border", type: "boolean", default: "true", desc: "Show border" },
        { name: "shadow", type: "boolean", default: "true", desc: "Show shadow" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "color", type: "string", default: "base", desc: "Color variant: neutral, primary, secondary, accent, info, success, warning, error, base, ghost" },
        { name: "maxWidth", type: "string", default: "", desc: "Maximum width class: max-w-sm, max-w-md, etc." },
        { name: "showLabels", type: "boolean", default: "true", desc: "Show labels for all items" },
        { name: "compact", type: "boolean", default: "false", desc: "Compact mode (hide labels)" },
      ],
      examples: [
        {
          title: "Basic Dock",
          code: `<Dock
  items={[
    { label: "Home", icon: DockIcons.Home(), onClick: () => console.log("Home clicked") },
    { label: "Inbox", icon: DockIcons.Inbox(), active: true, badge: "3" },
    { label: "Settings", icon: DockIcons.Settings() }
  ]}
  maxWidth="max-w-sm"
/>`,
        },
        {
          title: "Compact Dock",
          code: `<Dock
  items={[
    { icon: DockIcons.Home(), tooltip: "Home" },
    { icon: DockIcons.Inbox(), active: true, tooltip: "Inbox (3)", badge: "3" },
    { icon: DockIcons.Settings(), tooltip: "Settings" }
  ]}
  size="sm"
  compact={true}
  maxWidth="max-w-sm"
/>`,
        },
      ],
    },
    {
      id: "link",
      name: "Link",
      import: 'import { Link, LinkPresets } from "vaderjs-daisyui/Components/Data/Display/Link"',
      description: "Link component with various styles and presets",
      props: [
        { name: "href", type: "string", default: "", desc: "URL destination" },
        { name: "children", type: "VNode | VNode[] | string", default: "", desc: "Link content" },
        { name: "color", type: "string", default: "", desc: "Color variant: neutral, primary, secondary, accent, info, success, warning, error" },
        { name: "hover", type: "boolean", default: "false", desc: "Only show underline on hover" },
        { name: "className", type: "string", default: "", desc: "Additional classes" },
        { name: "onClick", type: "function", default: "", desc: "Click handler" },
        { name: "target", type: "string", default: "", desc: "Link target: _blank, _self, _parent, _top" },
        { name: "rel", type: "string", default: "", desc: "Link relation attribute" },
        { name: "disabled", type: "boolean", default: "false", desc: "Disable the link" },
        { name: "external", type: "boolean", default: "false", desc: "External link (adds noopener noreferrer)" },
        { name: "icon", type: "VNode | string", default: "", desc: "Icon before text" },
        { name: "iconAfter", type: "VNode | string", default: "", desc: "Icon after text" },
        { name: "noUnderline", type: "boolean", default: "false", desc: "Remove underline completely" },
        { name: "active", type: "boolean", default: "false", desc: "Active state" },
        { name: "block", type: "boolean", default: "false", desc: "Display as block" },
        { name: "size", type: "string", default: "", desc: "Text size: xs, sm, md, lg, xl" },
      ],
      examples: [
        {
          title: "Basic Links",
          code: `<Link href="/about">About Us</Link>
<Link href="https://example.com" external>External Link</Link>`,
        },
        {
          title: "Styled Links",
          code: `<Link color="primary" hover>Primary Link</Link>
<Link color="success" noUnderline>Success Link</Link>`,
        },
        {
          title: "Using Presets",
          code: `<LinkPresets.Primary href="/dashboard">Dashboard</LinkPresets.Primary>
<LinkPresets.External href="https://github.com">GitHub</LinkPresets.External>`,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 sticky top-0 z-50 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-bold text-xl tracking-tight">VaderJS</div>
            <Badge color="accent" className="text-xs">API Reference</Badge>
          </div>
          <Button 
            size="sm" 
            style="outline"
            onClick={() => window.location.href = '/'}
          >
            Back to Demo
          </Button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto p-4 md:p-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 px-4">Components</h3>
            <nav className="space-y-1">
              {componentDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => toggleSection(doc.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                    expandedSections[doc.id]
                      ? "bg-slate-800 text-slate-100 font-medium"
                      : "text-slate-400 hover:text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  {doc.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-12">
          {componentDocs.map((doc) => (
            expandedSections[doc.id] && (
              <div key={doc.id} className="border border-slate-800 rounded-xl overflow-hidden">
                <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{doc.name}</h2>
                    <p className="text-slate-400">{doc.description}</p>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Import</h3>
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm overflow-x-auto text-emerald-400">
                      <code>{doc.import}</code>
                    </div>
                  </div>

                  {doc.props.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Props</h3>
                      <div className="overflow-x-auto border border-slate-800 rounded-lg bg-slate-900">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-800 border-b border-slate-700">
                            <tr>
                              <th className="text-left px-4 py-3 text-slate-300">Name</th>
                              <th className="text-left px-4 py-3 text-slate-300">Type</th>
                              <th className="text-left px-4 py-3 text-slate-300">Default</th>
                              <th className="text-left px-4 py-3 text-slate-300">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {doc.props.map((prop, idx) => (
                              <tr key={idx} className="border-t border-slate-800 hover:bg-slate-800/50">
                                <td className="px-4 py-3 font-mono text-blue-400">{prop.name}</td>
                                <td className="px-4 py-3 font-mono text-yellow-400 text-xs">{prop.type}</td>
                                <td className="px-4 py-3 font-mono text-slate-500">{prop.default || "-"}</td>
                                <td className="px-4 py-3 text-slate-400">{prop.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {doc.examples.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Examples</h3>
                      <div className="space-y-4">
                        {doc.examples.map((example, idx) => (
                          <div key={idx} className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-300">{example.title}</h4>
                            <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-slate-300">
                              <code>{example.code}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
});

export default ApiPage;