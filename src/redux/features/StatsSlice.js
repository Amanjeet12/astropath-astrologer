import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  chat: null,
  video_call: null,
  voice_call: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchChatStats = createAsyncThunk(
  'fetchChatStats',
  async (token, thunkApi) => {
    console.log(token);
    try {
      const response = await API.get(WebUrls.url.chat_stats, {
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

export const fetchVoiceStats = createAsyncThunk(
  'fetchVoiceStats',
  async (token, thunkApi) => {
    console.log(token);
    try {
      const response = await API.get(WebUrls.url.call_stats, {
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

export const fetchVideoStats = createAsyncThunk(
  'fetchVideoStats',
  async (token, thunkApi) => {
    console.log(token);
    try {
      const response = await API.get(WebUrls.url.video_stats, {
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

const StatsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(fetchChatStats.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchChatStats.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.chat = action.payload;
    });
    builder.addCase(fetchChatStats.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchVoiceStats.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchVoiceStats.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.voice_call = action.payload;
    });
    builder.addCase(fetchVoiceStats.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchVideoStats.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchVideoStats.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.video_stats = action.payload;
    });
    builder.addCase(fetchVideoStats.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default StatsSlice.reducer;
