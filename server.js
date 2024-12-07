const http= require('http');
const app= require('../railway-management/app')


const server= http.createServer(app)  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
