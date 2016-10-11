const React = require('react');

class Sidebar extends React.Component {
  render () {
    return (
      <div className="col-xs-2">
        <div className="main">
          <img src="juke.svg" className="logo" />
          <section>
            <h4 className="menu-item active">
              <a href="#">ALBUMS</a>
            </h4>
          </section>
        </div>
      </div>
    );
  }
}

module.exports = Sidebar;