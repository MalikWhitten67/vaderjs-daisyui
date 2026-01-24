'use client';

import { component } from "vaderjs";
import Button from "vaderjs-daisyui/Components/Actions/Button";  
import Dropdown from "vaderjs-daisyui/Components/Actions/Dropdown";
import { Fab, FabItem } from "vaderjs-daisyui/Components/Actions/Fab";
import { Modal, ModalAction, useModal } from "vaderjs-daisyui/Components/Actions/Modal";
import { Swap } from "vaderjs-daisyui/Components/Actions/Swap";
import { ThemeController } from "vaderjs-daisyui/Components/Actions/ThemeController";
import Table from "vaderjs-daisyui/Components/Data/Display/Table";
import Diff from "vaderjs-daisyui/Components/Data/Display/Diff";
import List, { ListRow, ListCol } from "vaderjs-daisyui/Components/Data/Display/List";
import { Stats, Stat, StatTitle, StatValue, StatDesc } from "vaderjs-daisyui/Components/Data/Display/Stat";
import { Accordion } from "vaderjs-daisyui/Components/Data/Display/Accordion";
import { Avatar, AvatarGroup } from "vaderjs-daisyui/Components/Data/Display/Avatar";
import { Badge } from "vaderjs-daisyui/Components/Data/Display/Badge";
import { Card } from "vaderjs-daisyui/Components/Data/Display/Card";
import ChatBubbles from "vaderjs-daisyui/Components/Data/Display/ChatBubble";
import Collapse from "vaderjs-daisyui/Components/Data/Display/Collapse";
import Kbd from "vaderjs-daisyui/Components/Data/Display/Keyboard";
import TextRotate, { TextRotateInline } from "vaderjs-daisyui/Components/Data/Display/TextRotate";
import Timeline from "vaderjs-daisyui/Components/Data/Display/Timeline";
import { TimelineExample } from "vaderjs-daisyui/Components/Data/Display/Timeline";
import { Breadcrumbs, BreadcrumbIcons  } from "vaderjs-daisyui/Components/Navigation/BreadCrumbs";
import Dock from "vaderjs-daisyui/Components/Navigation/Doc";
import { DockIcons } from "vaderjs-daisyui/Components/Navigation/Doc";
import Link from "vaderjs-daisyui/Components/Navigation/Link";
import { LinkPresets } from "vaderjs-daisyui/Components/Navigation/Link";

const DocumentationPage = component(() => {
  const modal = useModal(false);
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-800 sticky top-0 z-50 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">VaderJS</div>
          <div className="flex gap-3 items-center">
            <a 
              href="/api"
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              API Docs
            </a>
            <Badge color="primary" className="text-xs">Component Library</Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Header */}
        <header className="mb-16">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Build with VaderJS
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl">
                Lightweight React-like components wrapping DaisyUI classes. Zero dependencies, fully typed, and ready to ship.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Zero Dependencies</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>TypeScript Ready</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-sm">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span>~1KB Bundle</span>
              </div>
            </div>
          </div>
        </header>

        {/* Installation */}
        <section className="mb-20 border border-slate-800 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="p-8 md:p-12 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Getting Started</h2>
              <p className="text-slate-400">Install DaisyUI and start building immediately</p>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <span className="text-slate-500">$ </span><span className="text-slate-100">bun vaderjs add daisyui</span>
              </div>
              <p className="text-sm text-slate-400">Copy the components into your project and you're ready to go.</p>
            </div>
          </div>
        </section>

        {/* Button Examples */}
        <section className="mb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Button Component</h2>
              <p className="text-slate-400">Versatile button component with multiple colors and styles</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-900">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Live Examples</h3>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button color="primary">Primary</Button>
                  <Button color="secondary">Secondary</Button>
                  <Button color="accent" style="outline">Outline</Button>
                  <Button color="success" style="ghost">Ghost</Button>
                  <Button size="lg" color="warning">Large</Button>
                  <Button size="sm" color="error">Small</Button>
                  <Button modifier="circle">○</Button>
                </div>
              </div>
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Usage</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-2">
                  <div><span className="text-slate-500">import</span> Button <span className="text-slate-500">from</span> <span className="text-emerald-400">{'\'./Button\''}</span></div>
                  <div className="text-slate-600">// Primary button</div>
                  <div>{`<Button color="primary">Click</Button>`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Example */}
        <section className="mb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Modal Component</h2>
              <p className="text-slate-400">Overlay dialogs for critical user interactions</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-900">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Demo</h3>
                <Button onClick={modal.open} color="primary">Open Modal</Button>
                
                <Modal 
                  isOpen={modal.isOpen} 
                  onClose={modal.close}
                  title="Welcome to VaderJS"
                  size="w-11/12 max-w-md"
                >
                  <p className="py-4 text-slate-300">This is a modal powered by DaisyUI and styled beautifully!</p>
                  <div className="modal-action">
                    <ModalAction onClick={() => alert('Confirmed!')} closeModal close={modal.close}>
                      Confirm
                    </ModalAction>
                    <Button style="outline" onClick={modal.close}>Close</Button>
                  </div>
                </Modal>
              </div>
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Usage</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-1">
                  <div><span className="text-slate-500">const</span> modal = <span className="text-blue-400">useModal</span>()</div>
                  <div><span className="text-slate-600">// Open with button</span></div>
                  <div>{`<Button onClick={modal.open}>`}</div>
                  <div className="text-slate-600 pl-4">Open</div>
                  <div>{`</Button>`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card & Badge */}
        <section className="mb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Card & Badge Components</h2>
              <p className="text-slate-400">Display content in organized, responsive containers</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Card
                  title={
                    <div className="flex items-center justify-between">
                      <span>Project Dashboard</span>
                      <Badge color="success">Active</Badge>
                    </div>
                  }
                  body="Manage your projects and tasks in one place. Real-time updates and team collaboration features included."
                  actions={
                    <div className="card-actions justify-end">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" style="outline">Share</Button>
                    </div>
                  }
                />
              </div>
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Usage</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-1">
                  <div><span className="text-slate-500">import</span> {`{ Card }`} <span className="text-slate-500">from</span> <span className="text-emerald-400">{'\'./Card\''}</span></div>
                  <div className="text-slate-600">// Card with badge</div>
                  <div>{`<Card title="Title" body="Content" />`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats & Table */}
        <section className="mb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Stats & Table Components</h2>
              <p className="text-slate-400">Display metrics and tabular data beautifully</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border border-slate-800 rounded-xl p-6 bg-slate-900">
                  <Stats>
                    <Stat centered>
                      <StatTitle>Total Users</StatTitle>
                      <StatValue className="text-blue-400">4,200</StatValue>
                      <StatDesc>↗︎ 400 (22%)</StatDesc>
                    </Stat>
                    <Stat centered>
                      <StatTitle>Revenue</StatTitle>
                      <StatValue className="text-emerald-400">$89,400</StatValue>
                      <StatDesc>↗︎ $1,800 (12%)</StatDesc>
                    </Stat>
                  </Stats>
                </div>
                
                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                  <Table zebra size="sm">
                    <thead className="bg-slate-800">
                      <tr>
                        <th className="text-slate-300">User</th>
                        <th className="text-slate-300">Role</th>
                        <th className="text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-800">
                        <td className="text-slate-300">Alex Johnson</td>
                        <td className="text-slate-400">Admin</td>
                        <td><Badge color="success">Active</Badge></td>
                      </tr>
                      <tr className="border-t border-slate-800">
                        <td className="text-slate-300">Sam Wilson</td>
                        <td className="text-slate-400">User</td>
                        <td><Badge color="warning">Pending</Badge></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Usage</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-1">
                  <div><span className="text-slate-500">import</span> {`{ Stats }`} <span className="text-slate-500">from</span> <span className="text-emerald-400">{'\'./Stat\''}</span></div>
                  <div className="text-slate-600">// Metrics display</div>
                  <div>{`<Stats>`}</div>
                  <div className="text-slate-600 pl-4">{`<Stat>...</Stat>`}</div>
                  <div>{`</Stats>`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Components */}
        <section className="mb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Form & Input Components</h2>
              <p className="text-slate-400">Interactive form controls with smooth interactions</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6 border border-slate-800 rounded-xl p-6 bg-slate-900">
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-slate-300">Theme Selector</span>
                  </label>
                  <ThemeController
                    type="buttons"
                    value="light"
                    options={[
                      { value: "light", label: "🌞 Light" },
                      { value: "dark", label: "🌙 Dark" },
                      { value: "cupcake", label: "🧁 Cupcake" }
                    ]}
                    onChange={(val) => console.log('Theme:', val)}
                  />
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer py-2">
                    <span className="label-text text-slate-300">Toggle Switch</span>
                    <Swap
                      on="ON"
                      off="OFF"
                      clickable
                      onChange={(active) => console.log('Toggle:', active)}
                    />
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-slate-300">Keyboard Shortcuts</span>
                  </label>
                  <div className="flex gap-2">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                    <span className="text-slate-500">+</span>
                    <Kbd>D</Kbd>
                  </div>
                </div>
              </div>
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Usage</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-1">
                  <div><span className="text-slate-500">import</span> {`{ ThemeController }`}</div>
                  <div className="text-slate-600">// Theme switcher</div>
                  <div>{`<ThemeController type="buttons" />`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Display Components */}
        <section className="mb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Data Display Components</h2>
              <p className="text-slate-400">Showcase users, lists, and more elegantly</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-900 space-y-4">
                <h3 className="font-semibold text-slate-300">Avatar Groups</h3>
                <AvatarGroup>
                  <Avatar src="https://i.pravatar.cc/150?img=1" />
                  <Avatar src="https://i.pravatar.cc/150?img=2" />
                  <Avatar placeholder="+3" />
                </AvatarGroup>
              </div>
              
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-900 space-y-4">
                <h3 className="font-semibold text-slate-300">Lists</h3>
                <List>
                  <ListRow>
                    <ListCol grow>
                      <div className="font-medium text-slate-300">Inbox</div>
                      <div className="text-sm text-slate-500">5 unread messages</div>
                    </ListCol>
                    <Badge>5</Badge>
                  </ListRow>
                  <ListRow>
                    <ListCol grow className="text-slate-300">Drafts</ListCol>
                    <Badge color="warning">2</Badge>
                  </ListRow>
                </List>
              </div>
              
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-900 space-y-4">
                <h3 className="font-semibold text-slate-300">FAQ</h3>
                <Accordion items={[
                  { title: "What is VaderJS?", content: "A DaisyUI wrapper library", open: true },
                  { title: "Is it free?", content: "100% free and open source" },
                  { title: "Browser support?", content: "All modern browsers" }
                ]} />
              </div>
            </div>
          </div>
        </section>

        {/* Action Components */}
        <section className="mb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Action Components</h2>
              <p className="text-slate-400">Interactive controls for user input and navigation</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6 border border-slate-800 rounded-xl p-6 bg-slate-900">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-300">Dropdown Menu</h3>
                  <Dropdown
                    buttonContent={<span>Open Menu</span>}
                    contentClass="dropdown-content menu bg-slate-900 border border-slate-700 rounded-lg w-52 p-2 shadow-xl"
                  >
                    <li><a className="text-slate-300 hover:bg-slate-800">Item 1</a></li>
                    <li><a className="text-slate-300 hover:bg-slate-800">Item 2</a></li>
                    <li><a className="text-slate-300 hover:bg-slate-800">Item 3</a></li>
                  </Dropdown>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <h3 className="font-semibold text-slate-300">Floating Action Button</h3>
                  <Fab
                    mainIcon="+"
                    position="bottom-right"
                    direction="up"
                  >
                    <FabItem icon="📧" label="Email" />
                    <FabItem icon="📷" label="Camera" />
                    <FabItem icon="📁" label="File" />
                  </Fab>
                </div>
              </div>
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Usage</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-1">
                  <div><span className="text-slate-500">import</span> {`{ Dropdown }`} <span className="text-slate-500">from</span> <span className="text-emerald-400">{'\'./Dropdown\''}</span></div>
                  <div className="text-slate-600">// Menu dropdown</div>
                  <div>{`<Dropdown buttonContent="Menu">`}</div>
                  <div className="text-slate-600 pl-4">{`<a>Item</a>`}</div>
                  <div>{`</Dropdown>`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 border-t border-slate-800">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold">Ready to build?</h2>
            <p className="text-slate-400">Start using VaderJS components in your project today</p>
            <div className="flex justify-center gap-4 pt-4">
              <Button color="primary">Get Started</Button>
              <Button style="outline">View Docs</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export default DocumentationPage;
