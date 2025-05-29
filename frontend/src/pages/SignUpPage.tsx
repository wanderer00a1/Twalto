import { useState } from "react";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  return (
    <div>
      <h2>Sign UP</h2>
    </div>
  );
}

export default SignUpPage;
