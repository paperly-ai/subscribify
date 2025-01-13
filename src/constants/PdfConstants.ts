export interface IpdfFormat {
  pdfName: string;
  pdfUrl: string;
  pdfIndex: string;
  userId: string;
}

export interface UpsertDocumentPayload {
  user_id: string,
  document_id: string,
  document_url: string
}

export interface QueryDocumentPayload {
  user_id: string,
  document_id: string,
  query: string
}
