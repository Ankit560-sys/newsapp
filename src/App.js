import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {  Routes, Route,  BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';





export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0

  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }






  render() {

    return (
      <>
        

        <BrowserRouter>

        <NavBar/>
        <LoadingBar
            color='#f11946'
            height={3}
            background='transparent'
            shadow={true}
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />

          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} country="in" category="technology" />} />


          </Routes>


        </BrowserRouter>



      </>
    );
  }
}

