import React,{useEffect,createContext,useReducer,useContext} from "react";
import Navbar from "./components/navbar";
import { BrowserRouter, Route ,Switch,useHistory} from "react-router-dom";
import "./stylesheets/styles.css";
import "./stylesheets/profile.css";
import "./stylesheets/home.css";
import "./stylesheets/createPost.css";

import Home from "./components/screens/home";
import Login from "./components/screens/login";
import Signup from "./components/screens/signup";
import Profile from "./components/screens/profile";
import CreatePost from "./components/screens/createPost";
import UserProfile from "./components/screens/userProfile";
import EditProfile from "./components/screens/editProfile";
import AllPosts from "./components/screens/allPosts";
import {initialState,reducer} from "./reducers/userReducer";

export const UserContext=createContext();

const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push("/login")
    }
  },[])

  return(
    <>
    <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="/createPost">
          <CreatePost />
        </Route>
        <Route path="/profile/:userId">
          <UserProfile/>
        </Route>
        <Route path="/editProfile">
          <EditProfile />
        </Route>
        <Route path="/allPosts">
          <AllPosts />
        </Route>
    </Switch>
    </>
  )
}

function App() {

    const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}} >
    <>
      <BrowserRouter>
        <Navbar />
        <Routing/>
      </BrowserRouter>
    </>
    </UserContext.Provider>
  );
}

export default App;
