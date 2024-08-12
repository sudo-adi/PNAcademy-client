"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "./hooks/useLogin";
import DisableRightClick from "./disablerightclick";

const LoginPage = () => {
  const { isLoggedIn, handleLogin, loading, error } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on component mount
    isLoggedIn();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleLogin({ email: username, password });
    if (success) {
      router.push("/dashboard");
    }
  };

  return (

    <>
      <DisableRightClick />
      {loading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center h-screen">
            <div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
              <div className="hidden lg:block bg-muted">
                <Image
                  src="/base-img.jpg"
                  alt="Image"
                  width="1920"
                  height="1080"
                  className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
              <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                  <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-muted-foreground">
                      Enter your credentials to login to your account
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@pna.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginPage;
