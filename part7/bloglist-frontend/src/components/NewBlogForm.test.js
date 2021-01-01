import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  let component
  let createMock

  beforeEach(() => {
    createMock = jest.fn()
    component = render(
      <NewBlogForm handleBlogCreated={createMock} />
    )
  })

  test('calls creation handle with proper values', () => {
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('#new-blog')

    expect(titleInput).toBeDefined()
    expect(authorInput).toBeDefined()
    expect(urlInput).toBeDefined()

    fireEvent.change(titleInput, { target: { value: 'idea' } })
    fireEvent.change(authorInput, { target: { value: 'genius' } })
    fireEvent.change(urlInput, { target: { value: 'internet' } })

    fireEvent.submit(form)

    expect(createMock.mock.calls).toHaveLength(1)
    expect(createMock.mock.calls[0][0]).toEqual({ title: 'idea', author: 'genius', url: 'internet' })
  })
})