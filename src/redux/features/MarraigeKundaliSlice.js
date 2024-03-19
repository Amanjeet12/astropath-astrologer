import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  marraigePoint: null,
  mangalikReport: null,
  isLoading: false,
  isError: false,
};

export const fetchMarraigePoint = createAsyncThunk(
  'fetchMarraigePoint',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(
        WebUrls.url.match_ashtakoot_points,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      thunkApi.rejectWithValue(error);
    }
  },
);
export const fetchMangalikReport = createAsyncThunk(
  'astro',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(
        WebUrls.url.match_manglik_report,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      thunkApi.rejectWithValue(error);
    }
  },
);

const MarraigeKundaliSlice = createSlice({
  name: 'marraigekundali',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(fetchMarraigePoint.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchMarraigePoint.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.marraigePoint = action.payload;
    });
    builder.addCase(fetchMarraigePoint.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(fetchMangalikReport.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchMangalikReport.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.mangalikReport = action.payload;
    });
    builder.addCase(fetchMangalikReport.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
  },
});

export default MarraigeKundaliSlice.reducer;
