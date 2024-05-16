import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from 'api/axiosConfig';
import { IRootState } from "./root-reducer";
import { selectCurrentID } from "./authSlice";

interface UserProfileData {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    age: number;
    gender: number;
    phone: string;
    email: string;
    image_id: number;
    created_at: string;
    lastOnline: string;
}

interface UserSliceState {
    profile: UserProfileData | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserSliceState = {
    profile: null,
    loading: false,
    error: null,
};

export const fetchUserProfile = createAsyncThunk<UserProfileData, void, { state: IRootState }>(
    'user/fetchUserProfile',
    async (_, { getState }) => {
        const state = getState();
        const currentID = selectCurrentID(state);
        if (!currentID) throw new Error('No current ID available');
        const response = await axiosInstance.get(`/users/${currentID}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserProfileLocally(state, action: PayloadAction<UserProfileData>) {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load profile';
            })
    },
});

export const { updateUserProfileLocally } = userSlice.actions;


export const selectUserProfile = (state: IRootState) => state.user.profile;
export const selectUserLoading = (state: IRootState) => state.user.loading;
export const selectUserError = (state: IRootState) => state.user.error;

export default userSlice.reducer;
