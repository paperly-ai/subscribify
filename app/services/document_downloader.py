import requests
import logging
from app.utils.logger import Logger

log = Logger(name=__name__)

def get_document_content_from_url(url: str):
    """Fetches document content from the given URL."""
    try:
        response = requests.get(url)
        response.raise_for_status() 
        log.info(f"Successfully retrieved document")
        return response.content
    except requests.exceptions.HTTPError as http_err:
        log.error(f"HTTP error occurred: {http_err} - Status code: {response.status_code}")
    except Exception as e:
        log.error(f"An error occurred while retrieving the document: {e}")
    return None

