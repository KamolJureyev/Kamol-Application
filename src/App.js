import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Main, Login, Register, Navbar, ArticleDetail, CreateArticle, EditArticles } from './components/allComponents'
import AuthService from './service/auth';
import { useDispatch } from 'react-redux'
import { signUserFailure, signUserSuccess } from './slice/auth';
import { getItem } from './helpers/persistance-storage';

const App = () => {
  const dispatch = useDispatch()


  const getUser = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSuccess(response.user))
      console.log(response);
    } catch (error) {
      dispatch(signUserFailure())
    }
  }

  useEffect(() => {
    const token = getItem()
    if (token) {
      getUser()
    }
  }, []);

  return (
    <div className=''>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/edit-article/:slug" element={<EditArticles />} />
          </Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
