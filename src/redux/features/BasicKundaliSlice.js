import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  basicPanchang: null,
  astroDetail: null,
  manglik: null,
  isLoading: false,
  isError: false,
};

export const panchang = createAsyncThunk(
  'panchang',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.basic_panchang, params, {
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
export const astro = createAsyncThunk(
  'astro',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.astro_details, params, {
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
export const manglik = createAsyncThunk(
  'manglik',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.manglik_report, params, {
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

const BasicKundaliSlice = createSlice({
  name: 'basickundali',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(panchang.pending, state => {
      state.isloading = true;
    });
    builder.addCase(panchang.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.basicPanchang = action.payload;
    });
    builder.addCase(panchang.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(astro.pending, state => {
      state.isloading = true;
    });
    builder.addCase(astro.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.astroDetail = action.payload;
    });
    builder.addCase(astro.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(manglik.pending, state => {
      state.isloading = true;
    });
    builder.addCase(manglik.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.manglik = action.payload;
    });
    builder.addCase(manglik.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
  },
});

export default BasicKundaliSlice.reducer;
