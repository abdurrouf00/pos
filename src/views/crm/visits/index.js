'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function FullScreenSections() {
  const sections = [
    {
      id: 1,
      type: 'imageOnly',
      image: '/castomer.png',
    },
    {
      id: 2,
      image: '/castomer1.png',
      title: 'Generate More Qualified Leads',
      text: 'Identify important prospects on your website, engage them in real time and convert them to leads-all without leaving your HR-360 CRM window.',
      button: 'Learn More',
    },
    {
      id: 3,
      image: '/castomer2.png',
      title: 'Equip Your Sales Team with Customer Context',
      text: "Help your sales team convert more deals by giving them detailed insights about your visitors' behavior on your website.",
    },
    {
      id: 4,
      image: '/castomer3.png',
      title: 'Capture Leads 24/7',
      text: 'Never miss a lead! Capture, qualify and engage them with Zobot, pushing their data and conversations into HR-360 CRM, syncing the whole process.',
    },
    {
      id: 5,
      image: '/castomer4.png',
      title: 'Shorten Your Sales Cycle with Audio Calls',
      text: "When your prospects have a concern, what could be better than talking it out? Address your prospective customers' questions quickly and more effectively by calling them up right from within your chat window.",
    },
    {
      id: 6,
      image: '/castomer5.png',
      title: 'Scale Your Sales Team with Self Service Articles',
      text: 'Add answers to frequently asked questions as articles that prospects can access right from your chat window, so your team can spend more time addressing bigger and more unique concerns.',
    },
  ]

  return (
    <div className="w-full">
      {sections.map((sec) => (
        <section
          key={sec.id}
          className={`w-full h-screen flex items-center justify-center ${
            sec.type === 'imageOnly' ? '' : 'bg-gray-50'
          }`}
        >
          {/* ===== Hero Section (Image Only) ===== */}
          {sec.type === 'imageOnly' ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={sec.image}
                alt="Hero Image"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-white text-5xl font-bold text-center px-4">
                  Welcome to Our Platform
                </h1>
              </div>
            </div>
          ) : (
            /* ===== Normal Sections (Image + Text) ===== */
            <div className="flex flex-col md:flex-row items-center justify-center w-full h-full px-6 md:px-20 gap-10">
              {/* Left Image */}
              <div className="relative w-full  overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={sec.image}
                  alt={sec.title}
                  width={800}
                  height={1800}
                  className="object-cover object-center"
                />
              </div>

              {/* Right Text */}
              <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-snug">
                  {sec.title}
                </h1>
                <p className="text-gray-600 mb-6 text-lg md:text-xl">
                  {sec.text}
                </p>
                <Button type="button"> Get Started</Button>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
