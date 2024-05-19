import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Register</h1>
    </div>
  );
}

