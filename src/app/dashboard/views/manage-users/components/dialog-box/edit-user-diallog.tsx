"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Edit, Loader2 } from 'lucide-react'; // Import Lucide loader icon
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '../../hooks/useUsers'; // Adjust import as needed
import { useRoles } from '../../hooks/useRoles'; // Adjust import as needed
import { SingleUser } from '@/lib/types/userTypes'; // Adjust import as needed
import useRolesTableStore from '@/lib/stores/manage-users-store/roles-table-store';

// Define schema using zod
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .length(10, 'Phone number must be exactly 10 digits long')
    .regex(/^\d{10}$/, 'Phone number must be numeric'),
  roleId: z.string().min(1, 'Role is required'),
});

type FormData = z.infer<typeof schema>;
interface EditUserDialogProps {
  user: SingleUser;
  refreshUsers: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, refreshUsers }) => {
  const { activePageIndex, displayNumberOfRows } = useRolesTableStore();
  const { fetchRoles, roles } = useRoles(); // Fetch roles using your custom hook
  const { editUser, error } = useUsers(); // Use your custom hook for user operations
  const [loading, setLoading] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      roleId: user.role_id,
    },
  });

  useEffect(() => {
    fetchRoles({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy: "name", order: "ASC" });
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await editUser({
        ...data,
        id: user.id, // User ID
        dataToUpdate: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          role_id: data.roleId,
        },
      });
      setStatusDialogOpen(true);
      reset();
      refreshUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent'>
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the details for the user profile.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...field}
                  />
                )}
              />
              {errors.firstName && <p className="text-red-400">{errors.firstName.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...field}
                  />
                )}
              />
              {errors.lastName && <p className="text-red-400">{errors.lastName.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                  />
                )}
              />
              {errors.email && <p className="text-red-400">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    placeholder="98XXXXXX00"
                    {...field}
                  />
                )}
              />
              {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="roleId">Role</Label>
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <div>
                        {field.value
                          ? roles.find(role => role.id === field.value)?.name || "Select Role"
                          : "Select Role"}
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.roleId && <p className="text-red-400">{errors.roleId.message}</p>}
            </div>

            <DialogFooter>
              <div className="flex w-full justify-between gap-2">
                <div className="flex gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </div>
                <Button variant="default" type="submit">
                  {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{error?.status || 'Success'}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{error?.message || 'User updated successfully.'}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserDialog;
