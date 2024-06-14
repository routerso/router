import requests
import streamlit as st
import os
import uuid

def scrape_jina_ai(url: str) -> str:
  response = requests.get("https://r.jina.ai/" + url)
  return response.text

st.title("Jina AI Scraper")
urls = st.text_area("Enter the URLs to scrape (one per line):")

if st.button("Scrape"):
  if urls:
    url_list = urls.split("\n")
    for url in url_list:
      if url.strip():  # Skip empty lines
        scraped_text = scrape_jina_ai(url.strip())
        unique_id = str(uuid.uuid4())
        file_name = f"{url.replace('/', '_')}_{unique_id}.txt"
        file_path = os.path.join("data", file_name)
        with open(file_path, "w") as file:
          file.write(scraped_text)
        st.success(f"Scraped text from {url} saved to {file_path}")
  else:
    st.warning("Please enter at least one URL.")
