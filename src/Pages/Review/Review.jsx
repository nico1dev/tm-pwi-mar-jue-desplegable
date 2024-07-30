import React, { useEffect, useState } from 'react'

const Review = () => {
    const[posts, setPosts] = useState(null)
    const[isLoading, setIsLoading] = useState(true)
    const obtenerPosts = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
            method: "GET",
        })
        const post = await response.json()
        setPosts(post)
        setIsLoading(false)
        
    }
    useEffect(() => {
        obtenerPosts()
    }, [])
  return (
    <div>
        {
            isLoading
            ?
            <h1>Cargando</h1>
            :
            <h1>Posts</h1>
        }
        {posts && posts.map(posts=>
            <div key= {posts.id}>
                <h3>{posts.title}</h3>
                <p>{posts.body}</p>
                <hr />
            </div>
        )}
    </div>
  )
}

export default Review