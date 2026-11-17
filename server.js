const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Map TMDB IDs to your hosted MP4 files (using Google's sample video for testing)
const mediaDatabase = {
    'movie_550': 'https://googleapis.com',
    'tv_1399_1_1': 'https://googleapis.com'
};

app.get('/stream/movie/:tmdb_id.mp4', (req, res) => {
    const mp4Url = mediaDatabase[`movie_${req.params.tmdb_id}`];
    if (!mp4Url) return res.status(404).send('MP4 not found');
    res.redirect(302, mp4Url);
});

app.get('/stream/tv/:tmdb_id/:season/:episode.mp4', (req, res) => {
    const { tmdb_id, season, episode } = req.params;
    const mp4Url = mediaDatabase[`tv_${tmdb_id}_${season}_${episode}`];
    if (!mp4Url) return res.status(404).send('Episode MP4 not found');
    res.redirect(302, mp4Url);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
