"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useRoles } from '../dashboard/views/manage-users/hooks/useRoles';

const testHooks = () => {
  const { roles, loading, error, fetchRoles } = useRoles();
  useEffect(() => {
    fetchRoles({ page: 1, pageSize: 10, sortBy: 'createdAt', order: 'DESC' });
  }, [fetchRoles]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Button>
        Test
      </Button>
      {roles.map((role) => (
        <div key={role.id}>
          <p>{role.name}</p>
        </div>

      ))}

      <p className='text-white'>
        {loading}
      </p>
    </>
  )
}

export default testHooks