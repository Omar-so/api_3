fetch('http://127.0.0.1:8000/index.php?action=create_news_admin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title_news: 'Sample Title',
        content_news: 'Sample Content'
    }),
    credentials: 'include'  // Include cookies (e.g., PHPSESSID)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
