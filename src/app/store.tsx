// TODO
//creates the Redux store instance

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    //TODO
  }
})

//eks
// import { configureStore } from '@reduxjs/toolkit'
// import usersReducer from '../features/users/usersSlice'
// import postsReducer from '../features/posts/postsSlice'
// import commentsReducer from '../features/comments/commentsSlice'
// 
// export default configureStore({
//   reducer: {
//     users: usersReducer,
//     posts: postsReducer,
//     comments: commentsReducer
//   }
// })