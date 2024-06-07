const FtpDeploy = require('ftp-deploy');
const path = require('path');
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: path.join(__dirname),
  remoteRoot: './public_html/building-u-feedback-api', 
  include: ['*', '**/*'], 
  exclude: ['.git', '.github', 'views/**', 'node_modules/**', 'deploy-backend.js', '.env'],
  deleteRemote: false,
  forcePasv: true,
  sftp: false,
};

ftpDeploy.deploy(config)
  .then(res => console.log('Finished:', res))
  .catch(err => console.error('Error:', err));
