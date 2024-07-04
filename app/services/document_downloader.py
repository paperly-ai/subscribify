import requests

def get_document_content_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        pdf_content = response.content
        return pdf_content
    else:
        print(f"Failed to retrieve the file. Status code: {response.status_code}")
        return None
