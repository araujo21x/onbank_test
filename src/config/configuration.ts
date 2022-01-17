export default () => ({
  port: process.env.PORT,
  database_url: process.env.URL_DATABASE,
  jwt_expire: process.env.JWT_EXPIRE,
  jwt_secret: process.env.JWT_SECRET,
});
