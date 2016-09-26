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
        type: Sequelize.STRING, allowNull: false, isUrl: true, defaultValue: "This_should_be_a_URL",
        get: function () {
            var wikiUrl = this.getDataValue('urlTitle');
            return '/wiki/' + wikiUrl;
        }
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
// }, {
//     hooks: {
//         beforeValidate: function (page) {
//             page.urlTitle = generateUrlTitle(page.title);
//         }
//     }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false, defaultValue: "Guest"
    },
    email: {
        type: Sequelize.STRING, allowNull: false, isEmail: true, defaultValue: "guest@hotmail.co"
    }
});

Page.hook('beforeValidate', function (page) {
    page.urlTitle = generateUrlTitle(page.title);
    return page;
  });

Page.belongsTo(User, { as: 'author' });

function generateUrlTitle (title) {
  if (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}

module.exports = {
  Page: Page,
  User: User,
  generateUrlTitle: generateUrlTitle
};