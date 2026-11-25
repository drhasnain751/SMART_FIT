// src/pages/Login/index.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider"; // This import is correct
import InputField from "../../components/InputField";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginValidationSchema } from "./components/validation-schema";
import { Typography } from "../../components/Typography";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  const { login } = useAuth(); // This call is safe because Login is rendered in a public route
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: { email: "", password: "" },
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      try {
        await login(values.email, values.password);
        // Navigation is handled by the login function in AuthProvider
      } catch (error) {
        const errorMessage = error.response?.data?.detail || "An unexpected error occurred.";
        setApiError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="space-y-6 w-full sm:max-w-md">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
        
        {apiError && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-center">
            <Typography variant="body">{apiError}</Typography>
          </div>
        )}
        
        <div className="space-y-4">
          <InputField
            id="email" name="email" type="email" placeholder="Email address"
            value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email} label="Email"
          />

          <InputField
            id="password" name="password" type={showPassword ? "text" : "password"}
            placeholder="Password" value={formik.values.password}
            onChange={formik.handleChange} onBlur={formik.handleBlur}
            helperText={formik.touched.password && formik.errors.password} label="Password"
            onRightAdornmentClick={() => setShowPassword((prev) => !prev)}
            rightAdornment={showPassword ? <FaEyeSlash /> : <FaEye />}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-black/90 cursor-pointer disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-light-gray" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray">Or</span></div>
        </div>
        <div className="mt-6">
          <p className="text-center text-sm text-gray">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-black transition-colors duration-200 underline hover:text-black/70">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;