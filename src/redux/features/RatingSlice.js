import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  rating: null,
  allRating: null,
  allOrders: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchDashboardRating = createAsyncThunk(
  'fetchDashboardRating',
  async (token, thunkApi) => {
    console.log(token);
    try {
      const response = await API.get(WebUrls.url.fetch_dashboard_rating, {
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

export const fetchAllRating = createAsyncThunk(
  'fetchAllRating',
  async (token, thunkApi) => {
    console.log(token);
    try {
      const response = await API.get(WebUrls.url.fetch_allRating, {
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

export const fetchAllOrder = createAsyncThunk(
  'fetchAllOrder',
  async (token, thunkApi) => {
    console.log(token);
    try {
      const response = await API.get(WebUrls.url.fetch_All_orders, {
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

const RatingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(fetchDashboardRating.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchDashboardRating.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.rating = action.payload;
    });
    builder.addCase(fetchDashboardRating.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchAllRating.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchAllRating.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.allRating = action.payload;
    });
    builder.addCase(fetchAllRating.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchAllOrder.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchAllOrder.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.allOrders = action.payload;
    });
    builder.addCase(fetchAllOrder.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default RatingSlice.reducer;
