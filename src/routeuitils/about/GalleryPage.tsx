import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Gallery from './Gallery'
import Images from './Images'
import Videos from './Videos'
import InnerImages from './InnerImages'
import { useRecoilValue } from 'recoil'
import { SelectedLanguageState } from '../../recoil/Atoms'
import { DefaultMeta, MetaDataType } from '../../routes/Home'
import { Baseurl } from '../../Baseurl'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { HelmetTag } from '../../main'

const GalleryPage: React.FC = () => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_qalereya_key', selectedLang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-qalereya-front`, {
        headers: {
          "Accept-Language": selectedLang,
        }
      });
      return res.data[0];
    }
  });

  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;

  return (
    <main className='gallery-page'>
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
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