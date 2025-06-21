import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
// import type { LoginResponse } from '../interfaces/auth.interface';
// import axios, { AxiosError } from 'axios';
// import { PREFIX } from '../helpers/API';
import type { Profile } from '../interfaces/user.interface';
import type { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
	loginErrorMessage?: string;
	registerErrorMessage?: string;
	profile?: Profile;
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login',
	async (params: { email: string, password: string }) => {
		// try {
		// 	const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
		// 		email: params.email,
		// 		password: params.password
		// 	});
		// 	return data;
		// } catch (e) {
		// 	if (e instanceof AxiosError) {
		// 		throw new Error(e.response?.data.message);
		// 	}
		// }
		const data = { access_token: 'mocked_access_token2' }; // Mocked response for demonstration
		console.log(params);
		return data;
	}
);

export const register = createAsyncThunk('user/register',
	async (params: { email: string, password: string, name: string }) => {
		// try {
		// 	const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
		// 		email: params.email,
		// 		password: params.password,
		// 		name: params.name
		// 	});
		// 	return data;
		// } catch (e) {
		// 	if (e instanceof AxiosError) {
		// 		throw new Error(e.response?.data.message);
		// 	}
		// }
		const data = { }; // Mocked response for demonstration
		console.log(params);
		return data;
	}
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/getProfile',
	async (_, thunkApi) => {
		// const jwt = thunkApi.getState().user.jwt;
		// const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
		// 	headers: {
		// 		Authorization: `Bearer ${jwt}`
		// 	}
		// });
		console.log(thunkApi);
		const data: Profile = {
			id: 1,
			email: 'test@gmail.com',
			address: 'address',
			name: 'Name',
			phone: '1234567890'

		}; // Mocked response for demonstration
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;