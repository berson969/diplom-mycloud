import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const getErrorMessage = (error: string): string => {
    if (error) {
        if ('status' in error) {
            // FetchBaseQueryError
            if (typeof error.data === 'string') {
                return error.data;
            } else if (typeof error.data === 'object' && error.data !== null) {
                return JSON.stringify(error.data);
            } else {
                return 'Произошла неизвестная ошибка';
            }
        } else if ('message' in error) {
            // SerializedError
            return error.message || 'Произошла неизвестная ошибка';
        }
    }
    // Undefined
    return '';

}

export default getErrorMessage;
