import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  orderId: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const sendOtp = createAsyncThunk('sendOtp', async (params, thunkApi) => {
  console.log(params, WebUrls.url.sendOtp);
  try {
    const response = await API.post(WebUrls.url.otp_send, params);
    console.log('response===>', response.data);
    return response.data;
  } catch (error) {
    console.log('error===>', error);
    thunkApi.rejectWithValue(error);
  }
});

export const resendOtp = createAsyncThunk(
  'resendOtp',
  async (params, thunkApi) => {
    console.log(params);
    try {
      const response = await API.post(WebUrls.url.resend_otp, params);
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      thunkApi.rejectWithValue(error);
    }
  },
);

const AuthSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(sendOtp.pending, state => {
      state.isloading = true;
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.orderId = action.payload;
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
      state.orderId = action.payload;
    });
  },
});

export default AuthSlice.reducer;
