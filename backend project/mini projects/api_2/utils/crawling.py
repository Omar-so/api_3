import requests
from bs4 import BeautifulSoup
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

server_url = 'http://localhost:3000/api/quotes/quotes_script'  # Replace with your actual server URL
file_path = 'data.txt'
start_page = 1
all_quotes = []  # collect all quotes here

# Determine where to start from
if os.path.exists(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()
        if lines:
            last_line = lines[-1]
            if "Page:" in last_line:
                try:
                    start_page = int(last_line.strip().split("Page:")[-1]) + 1
                except:
                    pass

# Open file to save locally
f = open(file_path, 'a', encoding='utf-8')


def extract_quotes(data, page):
    src = data.content
    soup = BeautifulSoup(src, 'lxml')
    quotes = soup.find_all('div', {'class': 'quote'})

    for q in quotes:
        quote_text_div = q.find('div', class_='quoteText')
        if quote_text_div:
            quote = quote_text_div.text.strip().split('\n')[0].strip('“”').strip()
        else:
            quote = 'N/A'

        author_span = quote_text_div.find('span', class_='authorOrTitle') if quote_text_div else None
        author = author_span.text.strip() if author_span else 'N/A'

        img_tag = q.find('img')
        image_url = img_tag['src'] if img_tag else 'N/A'

        # Append to all_quotes list
        all_quotes.append({
            'quote': quote,
            'author': author,
            'image_url': image_url
        })

        # Optional: save to file for local tracking
        f.write(f"Quote: {quote} | Author: {author} | Image URL: {image_url}\n")

    f.write(f"--- Page: {page} ---\n")


# Scrape multiple pages
for i in range(start_page, start_page + 10):  
    print(f"Processing page {i}")
    url = f"https://www.goodreads.com/quotes?page={i}"
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            extract_quotes(response, i)
        else:
            print(f"❌ Failed to fetch page {i}")
    except Exception as e:
        print(f"⚠️ Error on page {i}: {str(e)}")

# Send all collected quotes in one POST request
try:
    print(f"Sending {len(all_quotes)} quotes to server...")
    res = requests.post(server_url, json=all_quotes)
    if res.status_code == 200:
        print("✅ Successfully sent all quotes.")
    else:
        print(f"❌ Failed to send data: {res.status_code}")
except Exception as e:
    print(f"⚠️ Error sending data: {str(e)}")

f.close()
