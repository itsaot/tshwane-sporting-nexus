// index.js
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ API server running at http://localhost:${PORT}`);
});
