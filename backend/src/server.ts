import app from './app';
// const port = 4000;
const PORT = process.env.PORT || 4000;
require('dotenv').config();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// app.listen(port, () => {
// 	console.log(`Listening on port ${port}`);
// });