import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  currentDasha: null,
  majorvDasha: null,
  planet: null,
  isLoading: false,
  isError: false,
};

export const fetchCurrentDasha = createAsyncThunk(
  'fetchCurrentDasha',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.current_dasha, params, {
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
export const fetchMajorvDasha = createAsyncThunk(
  'fetchMajorvDasha',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.major_vdasha, params, {
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
export const fetchPlanet = createAsyncThunk(
  'fetchPlanet',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.planets, params, {
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

const DashaKundaliSlice = createSlice({
  name: 'dashaKundali',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(fetchCurrentDasha.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchCurrentDasha.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.currentDasha = action.payload;
    });
    builder.addCase(fetchCurrentDasha.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(fetchMajorvDasha.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchMajorvDasha.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.majorvDasha = action.payload;
    });
    builder.addCase(fetchMajorvDasha.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(fetchPlanet.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchPlanet.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.planet = action.payload;
    });
    builder.addCase(fetchPlanet.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
  },
});

export default DashaKundaliSlice.reducer;
