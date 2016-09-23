var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikihopper');


// When we want to turn off Sequelize's constant stupid logging to Terminal
// var db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });



var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, allowNull: false, defaultValue: "Page Title"
    },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false, isUrl: true, defaultValue: "This should be a URL"
    },
    content: {
        type: Sequelize.TEXT, allowNull: false, defaultValue: "This is an example of content"
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE, defaultValue: Sequelize.NOW
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false, defaultValue: "Guest"
    },
    email: {
        type: Sequelize.STRING, allowNull: false, isEmail: true, defaultValue: "guest@hotmail.co"
    }
});

module.exports = {
  Page: Page,
  User: User
};