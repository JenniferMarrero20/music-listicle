const express = require('express');
const venues = require('./data');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// 1. Home Page Route - List of all venues
app.get('/', (req, res) => {
  const venueListHtml = venues.map(venue => `
    <article>
      <img src="${venue.image}" alt="${venue.name}" style="width:100%; max-height:250px; object-fit:cover;">
      <h3>${venue.name}</h3>
      <p><strong>Genre:</strong> ${venue.genre}</p>
      <p><strong>Location:</strong> ${venue.location}</p>
      <p>${venue.description}</p>
      <a href="/venues/${venue.id}" role="button">View Venue Details</a>
    </article>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Local Music Venue Guide</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    </head>
    <body>
      <main class="container">
        <h1>🎵 Local Music Venue Guide</h1>
        <p>Discover the best spots for live music in town.</p>
        ${venueListHtml}
      </main>
    </body>
    </html>
  `);
});

// 2. Individual Venue Detail Route
app.get('/venues/:id', (req, res) => {
  const venue = venues.find(v => v.id === req.params.id);

  if (!venue) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Venue Not Found</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
      </head>
      <body>
        <main class="container">
          <h1>404 - Venue Not Found</h1>
          <p>We couldn't find a music venue with that ID.</p>
          <a href="/" role="button">Back to All Venues</a>
        </main>
      </body>
      </html>
    `);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${venue.name}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    </head>
    <body>
      <main class="container">
        <p><a href="/">← Back to All Venues</a></p>
        <article>
          <h1>${venue.name}</h1>
          <img src="${venue.image}" alt="${venue.name}" style="width:100%; max-height:400px; object-fit:cover;">
          <p><strong>Genre:</strong> ${venue.genre}</p>
          <p><strong>Location:</strong> ${venue.location}</p>
          <p><strong>Capacity:</strong> ${venue.capacity}</p>
          <p><strong>About:</strong> ${venue.description}</p>
        </article>
      </main>
    </body>
    </html>
  `);
});

// 3. 404 Catch-All Route
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>404 Page Not Found</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    </head>
    <body>
      <main class="container">
        <h1>404 - Page Not Found</h1>
        <a href="/" role="button">Back to Home</a>
      </main>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});