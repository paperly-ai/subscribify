import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store';
import { Document } from '@/constants/constants';
import { SERVER_URL } from '@/api/config';

const DOCUMENT_URL = `${SERVER_URL}/api/pdf/all`;

export interface PDFState {
  documents: Document[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PDFState = {
  documents: [],
  status: 'idle',
  error: null,
};

export const fetchDocuments = createAsyncThunk<Document[], void, { rejectValue: string }>(
  'documents/fetchDocuments',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error('Access token not found');
      return rejectWithValue('Access token not found');
    }

    try {
      const response = await axios.get<Document[]>(DOCUMENT_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching documents:', error);
      return rejectWithValue(error.message);
    }
  }
);

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument(state, action: PayloadAction<Document>) {
      state.documents.push(action.payload);
    },
    removeDocument(state, action: PayloadAction<string>) {
      state.documents = state.documents.filter(doc => doc._id !== action.payload);
    },
    updateDocument(state, action: PayloadAction<Document>) {
      const index = state.documents.findIndex(doc => doc._id === action.payload._id);
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addDocument, removeDocument, updateDocument } = documentsSlice.actions;

export const selectDocuments = (state: RootState) => state.documents.documents;
export const selectDocumentById = (id: string) => (state: RootState): Document | undefined =>
  state.documents.documents.find((doc: Document) => doc._id === id);
export const selectDocumentsStatus = (state: RootState) => state.documents.status;
export const selectDocumentsError = (state: RootState) => state.documents.error;

export default documentsSlice.reducer;
