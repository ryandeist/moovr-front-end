import React from 'react';
import axios from 'axios';
import './App.css'

class App extends React.Component {
  state = {
    details: [],
  }

  componentDidMount() {

    let data;

    axios.get('http://localhost:8000/jobs/')
      .then(res => {
        data = res.data;
        this.setState({
          details: data
        });
      })
      .catch(err => { })
  }

  render() {
    return (
      <div>
        {this.state.details.map((detail, id) => (
          <div key={id}>
            <div >
              <div >
                <h1>{detail.start_location} </h1>
                <h1>{detail.end_location} </h1>
                <footer >--- by
                  <cite title="Source Title">
                    {detail.name}</cite>
                </footer>
              </div>
            </div>
          </div>
        )
        )}
      </div>
    );
  }
}


export default App
