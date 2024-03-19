import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  panchangData: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchPanchang = createAsyncThunk(
  'fetchPanchang',
  async ({params, token}, thunkApi) => {
    console.log('params', params);
    console.log('token', token);
    try {
      const response = await API.post(WebUrls.url.advanced_panchang, params, {
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

const PanchangSlice = createSlice({
  name: 'DailyPanchang',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(fetchPanchang.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchPanchang.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.panchangData = action.payload;
    });
    builder.addCase(fetchPanchang.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default PanchangSlice.reducer;
