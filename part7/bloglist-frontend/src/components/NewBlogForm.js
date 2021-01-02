import React, { useState } from 'react'
import { FormWrapper, InputRow } from './styled'

const NewBlogForm = ({ handleBlogCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleBlogCreated({ title, author, url })
    clearForm()
  }

  return (
    <FormWrapper>
      <form id="new-blog" onSubmit={handleSubmit}>
        <h2>Create New Blog</h2>
        <InputRow>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={({ target }) => { setTitle(target.value) }}
          />
        </InputRow>
        <InputRow>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={({ target }) => { setAuthor(target.value) }}
          />
        </InputRow>
        <InputRow>
          <label htmlFor="url">URL</label>
          <input
            id="url"
            value={url}
            onChange={({ target }) => { setUrl(target.value) }}
          />
        </InputRow>
        <input type="submit" value="Create" />
      </form>
    </FormWrapper>
  )
}

export default NewBlogForm
