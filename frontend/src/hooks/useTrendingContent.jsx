import React, { useEffect, useState } from 'react'
import useContentStore from '../store/content.store'
import axios from 'axios'

const useTrendingContent = () => {

    const [trendingContent, settrendingContent] = useState(null)
    const { contentType } = useContentStore()

    useEffect(() => {
      const getTrendingContent =async () => {
        const res = await axios.get(`/api/user/${contentType}/trending`)
        const content = res?.data?.data
        settrendingContent(content)
      }
    
      getTrendingContent()
    }, [contentType])
    
    return{ trendingContent }
}

export default useTrendingContent