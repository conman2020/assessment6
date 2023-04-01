const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/', async (req, res, next) => {
 
  try {
    console.log(req.body);
    const { developers } = req.body;
    console.log(developers);

    if (!developers || !Array.isArray(developers)) {
      return res.status(400).send({ message: 'Invalid payload format' });
    }

    const results = await Promise.all(
      developers.map(async (d) => {
        console.log(d);
        const response = await axios.get(`https://api.github.com/users/${d}`);

        console.log(response.data);
        return response.data;
      })
    );
    
    const out = results.filter((r)=>r.hireable).map((r) => ({ name: r.name, bio: r.bio }));
    return res.send(out);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
