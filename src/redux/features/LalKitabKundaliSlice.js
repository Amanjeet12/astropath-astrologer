import {API} from '../../api';
import WebUrls from '../../api/WebUrl';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  lalKitabPlanet: null,
  lalKitab: null,
  numerology: null,
  isLoading: false,
  isError: false,
};

export const fetchLalKitabPlanet = createAsyncThunk(
  'fetchLalKitabPlanet',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.lalkitab_planet, params, {
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
export const fetchLalKitab = createAsyncThunk(
  'fetchLalKitab',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.lalkitab, params, {
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

export const fetchNumerology = createAsyncThunk(
  'fetchNumerology',
  async ({params, token}, thunkApi) => {
    try {
      const response = await API.post(WebUrls.url.neuro_report, params, {
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

const LalKitabKundaliSlice = createSlice({
  name: 'basickundali',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder.addCase(fetchLalKitabPlanet.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchLalKitabPlanet.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.lalKitabPlanet = action.payload;
    });
    builder.addCase(fetchLalKitabPlanet.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(fetchLalKitab.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchLalKitab.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.lalKitab = action.payload;
    });
    builder.addCase(fetchLalKitab.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(fetchNumerology.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchNumerology.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.numerology = action.payload;
    });
    builder.addCase(fetchNumerology.rejected, state => {
      state.isloading = false;
      state.isError = true;
    });
  },
});

export default LalKitabKundaliSlice.reducer;
