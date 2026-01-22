"use client"

import dynamic from 'next/dynamic'

const ModuleScreen = dynamic(() => import('@/views/front-pages/all-modules'), { ssr: false })

const Modules = () => {
  return (<ModuleScreen />)
}

export default Modules