import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  allQueue: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchAllQueue = createAsyncThunk(
  'fetchAllQueue',
  async (token, thunkApi) => {
    console.log(token);
    try {
      const response = await API.get(WebUrls.url.fetch_All_Queue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      thunkApi.rejectWithValue(error);
    }
  },
);
export const deleteQueue = createAsyncThunk(
  'deleteQueue',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.reject_Queue, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      thunkApi.rejectWithValue(error);
    }
  },
);
const QueueSlice = createSlice({
  name: 'allqueue',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(fetchAllQueue.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchAllQueue.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.allQueue = action.payload;
    });
    builder.addCase(fetchAllQueue.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default QueueSlice.reducer;
