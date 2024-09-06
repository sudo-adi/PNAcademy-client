import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/api/axiosInstance';
import {
  AddGroupToNotificationProps,
  AddGroupToNotificationResponse,
  CreateNotificationProps,
  DeleteNotificationProps,
  DeleteNotificationResponse,
  GetNotificationsProps,
  GetNotificationsResponse,
  NotificationResponse,
  RemoveGroupFromNotificationProps,
  RemoveGroupFromNotificationResponse,
} from '@/lib/types/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<GetNotificationsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createNotification = useCallback(async (data: CreateNotificationProps): Promise<NotificationResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (data.image) formData.append('image', data.image);
      if (data.file) formData.append('file', data.file);

      const response = await axiosInstance.post<NotificationResponse>('/v1/notification/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            setError('Bad Request: Invalid data provided');
            break;
          case 500:
            setError('Internal Server Error');
            break;
          default:
            setError('An unexpected error occurred');
            break;
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNotification = useCallback(async ({ id }: DeleteNotificationProps): Promise<DeleteNotificationResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.delete<DeleteNotificationResponse>('/v1/notification/delete-notification', {
        data: { id },
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            setError('Bad Request: Invalid data provided');
            break;
          case 500:
            setError('Internal Server Error');
            break;
          default:
            setError('An unexpected error occurred');
            break;
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getNotifications = useCallback(async (data: GetNotificationsProps): Promise<GetNotificationsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<GetNotificationsResponse>('/v1/notification/all', {
        params: data,
      });

      if (response.status === 200 || response.status === 201) {
        setNotifications(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            setError('Bad Request: Invalid query parameters');
            break;
          case 500:
            setError('Internal Server Error');
            break;
          default:
            setError('An unexpected error occurred');
            break;
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addGroupToNotification = useCallback(async (data: AddGroupToNotificationProps): Promise<AddGroupToNotificationResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<AddGroupToNotificationResponse>('/v1/notification/add-group', data);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            setError('Bad Request: Invalid data provided');
            break;
          case 404:
            setError('Not Found: Notification or Group not found');
            break;
          case 500:
            setError('Internal Server Error');
            break;
          default:
            setError('An unexpected error occurred');
            break;
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeGroupFromNotification = useCallback(async (data: RemoveGroupFromNotificationProps): Promise<RemoveGroupFromNotificationResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.delete<RemoveGroupFromNotificationResponse>('/v1/notification/remove-group', {
        data,
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            setError('Bad Request: Invalid data provided');
            break;
          case 404:
            setError('Not Found: Notification or Group not found');
            break;
          case 500:
            setError('Internal Server Error');
            break;
          default:
            setError('An unexpected error occurred');
            break;
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAssignedNotifications = useCallback(async (data: GetNotificationsProps): Promise<GetNotificationsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<GetNotificationsResponse>(
        `/v1/notification/assigned?page=${data.page}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&order=${data.order}`
      );

      if (response.status === 200 || response.status === 201) {
        setNotifications(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            setError('Bad Request: Invalid query parameters');
            break;
          case 500:
            setError('Internal Server Error');
            break;
          default:
            setError('An unexpected error occurred');
            break;
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    notifications,
    loading,
    error,
    createNotification,
    deleteNotification,
    getNotifications,
    addGroupToNotification,
    removeGroupFromNotification,
    getAssignedNotifications,
  };
};
