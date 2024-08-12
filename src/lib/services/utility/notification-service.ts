import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { AxiosError } from 'axios';

interface CreateNotificationProps {
  title: string;
  description: string;
  image: string;
  file: string;
}

export const createNotification = async (data: CreateNotificationProps): Promise<void> => {
  try {
    const response = await axiosInstance.post('/v1/notification/create', data);

    if (response.status === 200 || response.status === 201) {
      console.info('Notification created successfully', response.data);
      return;
    }
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


interface GetNotificationProps {
  page: number,
  pageSize: number,
  sortBy: string,
  order: string
}


export const getAllNotifications = async (data: GetNotificationProps) => {
  try {
    const response = await axiosInstance.get('/v1/notification/all', {
      params: data
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Notifications retrieved successfully', response.data);
      return response.data;
    }
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


interface DeleteNotificationProps {
  id: string;
}

export const deleteNotification = async (data: DeleteNotificationProps): Promise<void> => {
  try {
    const response = await axiosInstance.delete('/v1/notification/delete-notification', {
      data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Notification deleted successfully', response.data);
      return;
    }
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


interface AddGroupToNotificationProps {
  notificationId: string;
  groupId: string;
}

export const addGroupToNotification = async (data: AddGroupToNotificationProps): Promise<void> => {
  try {
    const response = await axiosInstance.post('/v1/notification/add-group', data);

    if (response.status === 200 || response.status === 201) {
      console.info('Group added to notification successfully', response.data);
      return;
    }
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


interface RemoveGroupFromNotificationProps {
  notificationId: string;
  groupId: string;
}

export const removeGroupFromNotification = async (data: RemoveGroupFromNotificationProps): Promise<void> => {
  try {
    const response = await axiosInstance.delete('/v1/notification/remove-group', {
      data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Group removed from notification successfully', response.data);
      return;
    }
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


interface GetAssignedNotificationsProps {
  page: number,
  pageSize: number,
  sortBy: string,
  order: string
}

export const getAssignedNotifications = async (data: GetAssignedNotificationsProps) => {
  try {
    const response = await axiosInstance.get('/v1/notification/assigned', {
      params: data,
    });

    if (response.status === 200 || 201) {
      console.info('Assigned notifications retrieved successfully', response.data);
      return response.data;
    }
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
