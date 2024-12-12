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
import { useToast } from "@/components/ui/use-toast";

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
  // Toast hook
  const { toast } = useToast();

  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hooks
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

  // Local states
  const [roles, setRoles] = useState<Role[]>([]);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(true);

  // Submission handler
  const onSubmit = async (data: FormData) => {
    try {
      setCreatingUser(true);
      const res = await addUser(data);

      // Success toast
      toast({
        title: "User Created",
        description: "New user has been successfully created.",
        variant: "default",
      });

      refreshUsers();
      reset();
    } catch (err) {
      // Error toast
      toast({
        title: "Error Creating User",
        description:
          err instanceof ApiError
            ? err.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setCreatingUser(false);
    }
  };

  // Fetch roles
  const fetchRolesData = useCallback(async () => {
    try {
      setLoadingRoles(true);
      const response = await fetchRoles({
        page: 1,
        pageSize: 999,
        sortBy: "name",
        order: "ASC",
      });
      setRoles(response);
    } catch (err) {
      toast({
        title: "Error Fetching Roles",
        description: "Unable to load roles",
        variant: "destructive",
      });
    } finally {
      setLoadingRoles(false);
    }
  }, []);

  // Effects
  useEffect(() => {
    fetchRolesData();
  }, [fetchRolesData]);

  // Form validation
  const formValues = watch();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
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

  // Form fields configuration
  const formFields = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "John",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Doe",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "johndoe@example.com",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "********",
      type: "password",
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "98XXXXXX00",
      type: "text",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="default"
          className={isMobile ? "text-xs h-8" : ""}
        >
          <UserPlus
            className={`${isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2"}`}
          />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`
          ${isMobile ? "min-w-[95%] max-w-[95%] rounded-lg" : "w-[800px]"}
          ${!isMobile ? "p-6 space-y-4" : ""}
        `}
      >
        <DialogHeader>
          <DialogTitle
            className={`
              ${isMobile ? "text-lg" : "text-xl"}
            `}
          >
            Create New User
          </DialogTitle>
          <DialogDescription
            className={`
              ${isMobile ? "text-xs" : ""}
            `}
          >
            Please fill in the details to create a new user profile.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`
            space-y-4
            ${isMobile ? "space-y-2" : ""}
          `}
        >
          {formFields.map((field) => (
            <div
              key={field.name}
              className={`
                flex flex-col
                ${isMobile ? "gap-1" : "gap-2"}
              `}
            >
              <Label
                htmlFor={field.name}
                className={`
                  ${isMobile ? "text-sm" : ""}
                `}
              >
                {field.label}
              </Label>
              <Controller
                name={field.name as keyof FormData}
                control={control}
                render={({ field: inputField }) => (
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...inputField}
                    className={`
                      ${isMobile ? "text-sm h-9" : ""}
                    `}
                  />
                )}
              />
              {errors[field.name as keyof typeof errors] && (
                <p className="text-red-400 text-xs">
                  {errors[field.name as keyof typeof errors]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Role Selection */}
          <div
            className={`
              flex flex-col
              ${isMobile ? "gap-1" : "gap-2"}
            `}
          >
            <Label
              htmlFor="roleId"
              className={`
                ${isMobile ? "text-sm" : ""}
              `}
            >
              Role
            </Label>
            {loadingRoles ? (
              <Card
                className={`
                  w-full
                  ${isMobile ? "h-9" : "h-12"}
                  flex items-center justify-center
                `}
              >
                <Loader2
                  className={`
                    animate-spin
                    ${isMobile ? "h-4 w-4" : ""}
                  `}
                />
              </Card>
            ) : (
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`
                        ${isMobile ? "text-sm h-9" : ""}
                      `}
                    >
                      <div>
                        {field.value
                          ? roles.find((role) => role.id === field.value)
                              ?.name || "Select Role"
                          : "Select Role"}
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem
                          key={role.id}
                          value={role.id}
                          className={`
                            ${isMobile ? "text-sm" : ""}
                          `}
                        >
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
            {errors.roleId && (
              <p className="text-red-400 text-xs">{errors.roleId.message}</p>
            )}
          </div>

          <DialogFooter>
            <div
              className={`
                flex
                ${isMobile ? "flex-col" : "flex-row"}
                w-full
                justify-between
                ${isMobile ? "gap-2" : "gap-4"}
              `}
            >
              <div
                className={`
                  flex
                  ${isMobile ? "flex-col" : "flex-row"}
                  ${isMobile ? "gap-2" : "gap-2"}
                  w-full
                `}
              >
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className={`
                      ${isMobile ? "w-full text-xs h-8" : ""}
                    `}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  className={`
                    ${isMobile ? "w-full text-xs h-8" : ""}
                  `}
                >
                  Clear
                </Button>
              </div>
              <Button
                variant="default"
                type="submit"
                disabled={!isFormValid || creatingUser}
                className={`
                  ${isMobile ? "w-full text-xs h-8" : ""}
                `}
              >
                {creatingUser ? (
                  <Loader2
                    className={`
                      animate-spin
                      ${isMobile ? "h-4 w-4" : ""}
                    `}
                  />
                ) : (
                  <>
                    <UserPlus
                      className={`${
                        isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2"
                      }`}
                    />
                    Create
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
