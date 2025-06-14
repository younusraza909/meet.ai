"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: () => {
          window.alert("Success");
        },
        onError: () => {
          window.alert("Something went wrong");
        },
      }
    );
  };
  const onSignIn = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert("Success");
        },
        onError: () => {
          window.alert("Something went wrong");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col gap-y-4 p-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sing out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4 ">
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4 ">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onSignIn}>Sign In</Button>
      </div>
    </div>
  );
}
