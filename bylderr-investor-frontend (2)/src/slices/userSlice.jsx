import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch user data');
        }
    }
);

const initialState = {
    user: {
        id: '10',
        name: 'Lionel Messi',
        role: 'Investor',
        permissions: ['read', 'write'],
        preferences: {
            theme: 'light',
            language: 'en',
        },
    },
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.user = initialState.user;
            state.status = 'idle';
            state.error = null;
        },
        updateUserPreferences: (state, action) => {
            state.user.preferences = {
                ...state.user.preferences,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = {
                    id: action.payload.id,
                    name: action.payload.name,
                    role: action.payload.role,
                    permissions: action.payload.permissions,
                    preferences: action.payload.preferences,
                };
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearUserData, updateUserPreferences } = userSlice.actions;
export default userSlice.reducer;