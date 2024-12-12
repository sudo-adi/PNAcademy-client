import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define badge variants
const badgeVariants = cva(
  "flex items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border hover:bg-accent",
        subtle: "bg-accent text-accent-foreground hover:bg-accent/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "bg-green-500 text-white hover:bg-green-600",
      },
      size: {
        default: "text-[10px] px-2 py-1",
        sm: "text-[9px] px-1 py-0.5",
        lg: "text-xs px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface RoleBadgeProps extends VariantProps<typeof badgeVariants> {
  text?: string;
  icon: React.ReactElement;
  className?: string;
  onClick?: () => void;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ text, icon, variant }) => {
  const iconWithClass = React.cloneElement(icon, {
    className: cn(
      icon.props.className,
      "h-3 w-3",
      variant === "destructive" ? "text-white" : ""
    ),
  });

  return (
    <Badge
      className="
    flex flex-row gap-2"
    >
      {iconWithClass}

      {text}
    </Badge>
  );
};

export default RoleBadge;
