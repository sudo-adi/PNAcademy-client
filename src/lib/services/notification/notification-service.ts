import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { AddGroupToNotificationProps, AddGroupToNotificationResponse, CreateNotificationProps, DeleteNotificationProps, DeleteNotificationResponse, GetNotificationsProps, GetNotificationsResponse, NotificationResponse, RemoveGroupFromNotificationProps, RemoveGroupFromNotificationResponse } from '@/lib/types/notifications';


// Function to create a notification
export const createNotification = async (data: CreateNotificationProps): Promise<NotificationResponse> => {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.file) {
      formData.append('file', data.file);
    }

    const response = await axiosInstance.post<NotificationResponse>('/v1/notification/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    throw new ApiError(response.status!, 'An unexpected error occurred', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// Function to delete a notification
export const deleteNotification = async ({ id }: DeleteNotificationProps): Promise<DeleteNotificationResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteNotificationResponse>('/v1/notification/delete-notification', {
      data: { id },
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Notification deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// Function to get all notifications
export const getNotifications = async (data: GetNotificationsProps): Promise<GetNotificationsResponse | null> => {
  try {
    const response = await axiosInstance.get<GetNotificationsResponse>('/v1/notification/all', {
      params: data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Notifications retrieved successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid query parameters', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// Function to add a group to a notification
export const addGroupToNotification = async (data: AddGroupToNotificationProps): Promise<AddGroupToNotificationResponse | null> => {
  try {
    const response = await axiosInstance.post<AddGroupToNotificationResponse>('/v1/notification/add-group', data);

    if (response.status === 200 || response.status === 201) {
      console.info('Group added to notification successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Notification or Group not found', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// Function to remove a group from a notification
export const removeGroupFromNotification = async (data: RemoveGroupFromNotificationProps): Promise<RemoveGroupFromNotificationResponse | null> => {
  try {
    const response = await axiosInstance.delete<RemoveGroupFromNotificationResponse>('/v1/notification/remove-group', {
      data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Group removed from notification successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Notification or Group not found', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// Function to get assigned notifications
export const getAssignedNotifications = async (data: GetNotificationsProps): Promise<GetNotificationsResponse | null> => {
  try {
    const response = await axiosInstance.get<GetNotificationsResponse>(
      `/v1/notification/assigned?page=${data.page}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&order=${data.order}`
    );

    if (response.status === 200 || response.status === 201) {
      console.info('Assigned notifications retrieved successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid query parameters', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};
