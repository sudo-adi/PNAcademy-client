"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoles } from "../../hooks/useRoles";
import { ApiError } from "@/lib/api/apiError";
import { useUsers } from "../../hooks/useUsers";
import { Card } from "@/components/ui/card";
import { Role } from "@/lib/types/roleTypes";
import { SingleUser } from "@/lib/types/userTypes";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { set } from "lodash";

// Define schema using zod
const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits long")
    .regex(/^\d{10}$/, "Phone number must be numeric"),
  roleId: z.string().min(1, "Role is required"),
});
type FormData = z.infer<typeof schema>;

interface CreateUserDialogProps {
  refreshUsers: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  refreshUsers,
}) => {
  // all hooks here
  const { fetchRoles } = useRoles();
  const { addUser } = useUsers();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      roleId: "",
    },
  });

  // global states here

  // local states here
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [createdUser, setCreatedUser] = useState<SingleUser>();

  // loading states
  const [loadingRoles, setLoadingRoles] = useState<boolean>(true);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);

  // error states
  const [createError, setCreateError] = useState<ApiError | null>(null);
  const [rolesError, setRolesError] = useState<ApiError | Error>();

  // disable states
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // local functions here
  const onSubmit = async (data: FormData) => {
    try {
      setCreateError(null);
      setCreatedUser(undefined);
      setCreatingUser(true);
      setStatusDialogOpen(true);
      reset();
      const res = await addUser(data);
      setCreatedUser(res);
      refreshUsers();
    } catch (err) {
      if (err instanceof ApiError) {
        setCreateError(err);
      } else {
        setCreateError(new ApiError(500, "An unexpected error occurred", err));
      }
    } finally {
      setCreatingUser(false);
    }
  };

  const fetchRolesData = useCallback(async () => {
    try {
      setLoadingRoles(true);
      const response = await fetchRoles({
        page: 1,
        pageSize: 999,
        sortBy: "name",
        order: "ASC",
      });
      console.log(response);
      setRoles(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setRolesError(err);
      } else {
        setRolesError(err as Error);
      }
    } finally {
      setLoadingRoles(false);
    }
  }, []);

  // handlers here
  const handleClear = () => {
    reset(); // Clear form values
  };

  // useEffects here
  useEffect(() => {
    fetchRolesData();
  }, [fetchRolesData]);

  const formValues = watch();
  useEffect(() => {
    const isFormValid = !!(
      formValues.firstName &&
      formValues.lastName &&
      formValues.email &&
      formValues.password &&
      formValues.phone &&
      formValues.roleId &&
      Object.keys(errors).length === 0
    );
    setIsFormValid(isFormValid);
  }, [formValues, errors]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <UserPlus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Please fill in the details to create a new user profile.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input id="firstName" placeholder="John" {...field} />
                )}
              />
              {errors.firstName && (
                <p className="text-red-400">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input id="lastName" placeholder="Doe" {...field} />
                )}
              />
              {errors.lastName && (
                <p className="text-red-400">{errors.lastName.message}</p>
              )}
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
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input id="phone" placeholder="98XXXXXX00" {...field} />
                )}
              />
              {errors.phone && (
                <p className="text-red-400">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="roleId">Role</Label>
              {loadingRoles ? (
                <Card className="w-full h-12 flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </Card>
              ) : (
                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <div>
                          {field.value
                            ? roles.find((role) => role.id === field.value)
                                ?.name || "Select Role"
                            : "Select Role"}
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
              {errors.roleId && (
                <p className="text-red-400">{errors.roleId.message}</p>
              )}
            </div>

            <DialogFooter>
              <div className="flex w-full justify-between gap-2">
                <div className="flex gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="button" variant="outline" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
                <Button
                  variant="default"
                  type="submit"
                  disabled={!isFormValid || creatingUser}
                >
                  {creatingUser ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create User"
                  )}
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
            <DialogTitle>
              {creatingUser
                ? "Creating User"
                : createError
                ? "Error"
                : "Success"}{" "}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-row justify-between w-full">
            <div>
              {creatingUser ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : createError ? (
                createError.message
              ) : (
                "User Created Successfully"
              )}
            </div>

            {createdUser && (
              <Badge>
                {createdUser?.createdAt
                  ? formatDateInIST(createdUser.createdAt)
                  : ""}
              </Badge>
            )}
          </DialogDescription>
          {createdUser && (
            <Card className="flex flex-col gap-2 w-full p-4">
              First Name : {createdUser?.first_name}
              <Separator />
              Last Name : {createdUser?.last_name}
              <Separator />
              Email : {createdUser?.email}
              <Separator />
              Phone Number : {createdUser?.phone}
            </Card>
          )}
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

export default CreateUserDialog;
