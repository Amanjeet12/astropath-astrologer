import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  islogin: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const verifyOtp = createAsyncThunk(
  'verifyOtp',
  async (params, thunkApi) => {
    console.log(params);
    try {
      const response = await API.post(WebUrls.url.verify_otp, params);
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      thunkApi.rejectWithValue(error);
    }
  },
);

const UserSlice = createSlice({
  name: 'userAuthentication',
  initialState,
  reducers: {
    resetUserState: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(verifyOtp.pending, state => {
      state.isloading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.islogin = action.payload;
    });
    builder.addCase(verifyOtp.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export const {resetUserState} = UserSlice.actions;

export default UserSlice.reducer;
