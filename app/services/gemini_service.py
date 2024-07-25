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
        prompt_template = f"""

        Context:\n{text_chunk}\n
        Question:\n{query_text}\n
        Answer the question as detailed as possible from the provided context .If the context is noisy try to answer as best as you can. If the answer is not in
        the provided context, just say, "The possible answer can be " provide your solution. Do not provide an incorrect answer. Do not complain about the text quality.return response without markdown\n\n
        Answer:
        """
        try:
            response = self.model.generate_content([prompt_template])
            if response is None:
                raise Exception("Failed to get a response from the model.")
            self.get_usage_metadata(response)
            return response.text
        except Exception as e:
            self.log.error(f"Error generating response: {e}")
            raise
    
  def get_response_stream(self, text_chunk, query_text):
        prompt_template = f"""
        Context:\n{text_chunk}\n
        Question:\n{query_text}\n
        Answer the question as detailed as possible from the provided context with markdown .If the context is noisy try to answer as best as you can. If the answer is not in
        the provided context, just say, "The possible answer can be " provide your solution. Do not provide an incorrect answer. Do not complain about the text quality.return response without markdown\n\n
        Answer:
        """
        
        try:
            response = self.model.generate_content([prompt_template], stream=True)
            if response is None:
                raise Exception("Failed to get a response from the model.")
            for chunk in response:
                yield f"data: {chunk.text}\n\n"
        except Exception as e:
            self.log.error(f"Error generating response: {e}")
            raise
