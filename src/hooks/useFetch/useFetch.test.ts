import { renderHook } from '@testing-library/react-hooks'
import Providers from 'providers'
import createServer from 'testSetup/CreateServer'
import {
  afterAll, afterEach, beforeAll, describe, expect, it
} from 'vitest'
import useFetch from './index'

const server = createServer({ response: { todo: 'foo', completed: false } })

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('useFetch', () => {
  it('should return the quired data, isLoading, isError and error object', async () => {
    const {
      result, waitForNextUpdate
    } = renderHook(() => useFetch('https://jsonplaceholder.typicode.com/todos/1',
      ['todos'], true), { wrapper: Providers })

    await waitForNextUpdate()

    expect(result.current.data).toEqual({ todo: 'foo', completed: false })
  })
})
