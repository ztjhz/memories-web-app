import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { login } from '../../actions/login';
import { useSelector } from 'react-redux';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const [user, setUser] = useState({
    username: '',
    password: '',
    auth: false,
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const storeUser = useSelector((state) => state.user);
  const storePosts = useSelector((state) => state.posts);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
    if (storeUser) {
      setUser(storeUser);
    }
  }, [post, storeUser, storePosts]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clearPostForm();
  };

  const clearPostForm = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  const clearLoginForm = () => {
    setUser({
      username: '',
      password: '',
      auth: false,
    });
  };

  return (
    <>
      {/* login */}
      {user.auth || (
        <Paper className={classes.paper}>
          <form
            autoComplete='off'
            noValidate
            className={`${classes.form} ${classes.root}`}
            onSubmit={handleLogin}
          >
            <TextField
              name='username'
              variant='outlined'
              label='Username'
              fullWidth
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <TextField
              name='password'
              variant='outlined'
              label='Password'
              type='password'
              fullWidth
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Button
              className={classes.buttonSubmit}
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              fullWidth
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              onClick={clearLoginForm}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      )}

      {/* create post */}
      {user.auth && (
        <Paper className={classes.paper}>
          <form
            autoComplete='off'
            noValidate
            className={`${classes.form} ${classes.root}`}
            onSubmit={handleSubmit}
          >
            <Typography variant='h6'>
              {currentId ? 'Editing' : 'Creating'} a memory
            </Typography>
            <TextField
              name='creator'
              variant='outlined'
              label='Creator'
              fullWidth
              value={postData.creator}
              onChange={(e) =>
                setPostData({ ...postData, creator: e.target.value })
              }
            />
            <TextField
              name='title'
              variant='outlined'
              label='Title'
              fullWidth
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <TextField
              name='message'
              variant='outlined'
              label='Message'
              fullWidth
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <TextField
              name='tags'
              variant='outlined'
              label='Tags'
              fullWidth
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(',') })
              }
            />
            <div className={classes.fileInput}>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>
            <Button
              className={classes.buttonSubmit}
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              fullWidth
            >
              Submit
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              onClick={clearPostForm}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};

export default Form;
