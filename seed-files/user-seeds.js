const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = [
  {
    name: 'Admin',
    email: 'admin@my-forum.me',
    password: bcrypt.hashSync('AdminPassword', salt),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'John Doe',
    email: 'john@doe.com',
    password: bcrypt.hashSync('WdkwJDi', salt),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Jane Doe',
    email: 'Jane@doe.com',
    password: bcrypt.hashSync('NdwJD1', salt),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'James Ray',
    email: 'j-ray@domain.tld',
    password: bcrypt.hashSync('TooBrightForYou', salt),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Tiffany La',
    email: 'La-Tiff@domain.tld',
    password: bcrypt.hashSync('AntfSew', salt),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
