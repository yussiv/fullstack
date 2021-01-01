import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blog'

const CommentForm = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog, content))
    setContent('')
  }

  return (
    <form id="new-comment" onSubmit={handleSubmit}>
      <input
        id="comment-content"
        value={content}
        onChange={({ target }) => { setContent(target.value) }}
      />
      <input type="submit" value="add comment" />
    </form>
  )
}

export default CommentForm
