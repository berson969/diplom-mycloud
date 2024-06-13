import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import {FileType} from "../models";

// Функция для получения CSRF токена из куки
function getCookie(name: string) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
 			const cookie = cookies[i].trim();
 			if (cookie.substring(0, name.length + 1) === (name + '=')) {
 				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
 				break;
 			}
		}
 	}
 	return cookieValue;
}


const baseQuery = retry(fetchBaseQuery(
	{
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			const csrftoken = getCookie('csrftoken')
			// const csrfToken = (getState() as RootState).currentUser.csrfToken;
			if (csrftoken) {
				headers.set('X-CSRFToken', csrftoken);
			}
			return headers;
		},
	}),
	{
	maxRetries: 1,
});

export const userApi = createApi({
	reducerPath: 'userQuery',
	baseQuery,

	endpoints: (builder) => ({
		getAllUsers: builder.query({
			query: () => `/users/`,
		}),
		createUser: builder.mutation({
			query: (data) => {
				console.log('data', data)
				return {
					url: '/users/',
					method: 'POST',
					body: data,
				}},
		}),
		updateUser: builder.mutation({
			query: ({ id, data }) => {
				console.log('body', id, data)
				return {
					url: `/users/${id}/`,
					method: 'PATCH',
					body: data
				}},
		}),
		deleteUser: builder.mutation({
			query: (id) => {
				console.log('id', id)
				return {
					url: `/users/${id}/`,
					method: 'DELETE',
				}},
		}),
		loginUser: builder.mutation({
			query: (data) => {
				console.log('Login data:', data);
				const formData = new URLSearchParams();
				for (const key in data) {
					formData.append(key, data[key]);
				}
				return {
					url: '/login/',
					method: 'POST',
					body: formData.toString(),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				};
			},
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: '/logout/',
				method: 'POST',
			}),
		}),
	})
})

export const  fileApi = createApi({
	reducerPath: 'fileQuery',
	baseQuery,
	tagTypes: ['File'],

	endpoints: (builder) => ({
		getUsersFiles: builder.query<FileType[], string>({
			query: (userFolder) => `/files/${userFolder}`,
			providesTags: (result) =>
				result
					? [
						...result.map(({ id }) => ({ type: 'File' as const, id })),
						{ type: 'File', id: 'LIST' },
					]
					: [{ type: 'File', id: 'LIST' }]
		}),
		downloadFile: builder.mutation({
			query: (uniqueId) => `download/${uniqueId}`,
			invalidatesTags:  [{ type: 'File', id: 'LIST' }],
		}),
		uploadFile: builder.mutation({
			query: (data) => ({
				url: `/files/${data.user_folder}/`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags:  [{ type: 'File', id: 'LIST' }],
		}),
		updateFile: builder.mutation({
			query: (data) => ({
				url: `/files/${data.user_folder}/${data.id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ({ id }) => [{ type: 'File', id }],
		}),
		deleteFile: builder.mutation({
			query: (data) => ({
				url: `/files/${data.user_folder}/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ( { id }) => [{ type: 'File', id }],
		}),

	})
})

export const {
	useGetAllUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useLoginUserMutation,
	useLogoutUserMutation,
} = userApi;

export const {
	useGetUsersFilesQuery,
	useDownloadFileMutation,
	useUploadFileMutation,
	useUpdateFileMutation,
	useDeleteFileMutation,
} = fileApi;
