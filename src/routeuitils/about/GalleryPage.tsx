import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Gallery from './Gallery'
import Images from './Images'
import Videos from './Videos'
import InnerImages from './InnerImages'

const GalleryPage:React.FC = () => {
  return (
    <main className='gallery-page'>
     <Routes>
          <Route path='/' element={<Gallery />} />
          <Route path='/images' element={<Images />} />
          <Route path='/images/:imagename' element={<InnerImages />} />
          <Route path='/videos' element={<Videos />} />
     </Routes>
    </main>
  )
}

export default GalleryPage