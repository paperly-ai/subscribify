from app.core.Gemini import init_query_model
from app.utils.logger import Logger

class GeminiServie():
  def __init__(self):
    self.model=init_query_model()
    self.log=Logger(__name__)

  def get_usage_metadata(self, response):
        try:
            usage_metadata = response.usage_metadata
            self.log.info(f"Prompt Token Count: {usage_metadata.prompt_token_count}")
            self.log.info(f"Candidates Token Count: {usage_metadata.candidates_token_count}")
            self.log.info(f"Total Token Count: {usage_metadata.total_token_count}")
        except Exception as e:
            self.log.error(f"Error getting usage metadata: {e}")
            raise
    
  def get_response(self, text_chunk, query_text):
        try:
            response = self.model.generate_content([text_chunk,query_text])
            if response is None:
                raise Exception("Failed to get a response from the model.")
            self.get_usage_metadata(response)
            return response.text
        except Exception as e:
            self.log.error(f"Error generating response: {e}")
            raise
