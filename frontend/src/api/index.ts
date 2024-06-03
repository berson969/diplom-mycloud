import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';


const baseQuery = retry(fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}), {
	maxRetries: 5,
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
				return {
					url: '/login/',
					method: 'POST',
					body: data,
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

export const {
	useGetAllUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useLoginUserMutation,
	useLogoutUserMutation
} = userApi
