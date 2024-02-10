import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    updateLike(state, action) {
      const updatedBlog = action.payload
      return state.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
    appendComment(state, action) {
      const updatedBlog = action.payload
      return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
    }
  },
})

export const { setBlog, appendBlog, updateLike, deleteBlog, appendComment } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createNewBlog = await blogsService.create(newBlog)
    dispatch(appendBlog(createNewBlog))
    const blogs = await blogsService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const giveLike = (blog) => {
  return async (dispatch) => {
    const likeBlog = { ...blog, likes: blog.likes + 1 }
    await blogsService.update(blog.id)
    dispatch(updateLike(likeBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const addComment = (blog, { comment }) => {
  return async dispatch => {
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
    await blogsService.createComment(blog.id, { comment: comment })
    dispatch(appendComment(updatedBlog))
  }
}

export default blogsSlice.reducer
