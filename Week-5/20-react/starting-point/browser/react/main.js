const React = require('react');
const ReactDOM = require('react-dom');
const Sidebar = require('./components/sidebar');
const Footer = require('./components/footer');
const Album = require('./components/album');

class Root extends React.Component {
  render() {
    return (
      <div id="main" className="container-fluid">
        <Sidebar />
        <Album />
        <Footer />
      </div>
    )
  }
}



module.exports = {Root: Root};
