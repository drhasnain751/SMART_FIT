// src/pages/Registration/index.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../../components/InputField";
import { registrationValidationSchema } from "./components/validation-schema";
import { register as apiRegister } from "../../lib/services/authService";
import { Typography } from "../../components/Typography";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: registrationValidationSchema,
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    
    // --- THIS IS THE UPDATED ONSUBMIT FUNCTION ---
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null); // Clear previous errors
      try {
        await apiRegister(values.email, values.password);
        alert("Registration successful! Please proceed to log in.");
        navigate("/login");
      } catch (error) {
        // This new logic handles both simple string errors and complex validation error objects.
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (error.response?.data?.detail) {
          const detail = error.response.data.detail;
          if (typeof detail === 'string') {
            // This handles errors like "Email already registered".
            errorMessage = detail;
          } else if (Array.isArray(detail) && detail.length > 0) {
            // This handles 422 Validation Errors from FastAPI.
            // We'll display the message from the first validation issue found.
            errorMessage = detail[0].msg || "A validation error occurred.";
          }
        }
        setApiError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="space-y-6 w-full sm:max-w-xl">
      <h2 className="text-xl font-semibold text-center">Create your account</h2>
      <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
        
        {apiError && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-center">
            {/* Now it safely displays a string, never an object */}
            <Typography variant="body">{apiError}</Typography>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex max-sm:flex-col gap-4">
            <InputField 
              id="name" name="name" type="text" placeholder="Full Name" 
              value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} 
              helperText={formik.touched.name && formik.errors.name} label="Full Name" 
            />
            <InputField 
              id="email" name="email" type="email" placeholder="Email address" 
              value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} 
              helperText={formik.touched.email && formik.errors.email} label="Email" 
            />
          </div>
          <div className="flex max-sm:flex-col gap-4">
            <InputField 
              id="password" name="password" type={showPassword ? "text" : "password"} 
              placeholder="Password (min 8 characters)" // Make sure this placeholder is accurate
              value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} 
              helperText={formik.touched.password && formik.errors.password} label="Password" 
              onRightAdornmentClick={() => setShowPassword((prev) => !prev)} 
              rightAdornment={showPassword ? <FaEyeSlash /> : <FaEye />} 
            />
            <InputField 
              id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm Password" 
              value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} 
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} label="Confirm Password" 
              onRightAdornmentClick={() => setShowConfirmPassword((prev) => !prev)} 
              rightAdornment={showConfirmPassword ? <FaEyeSlash /> : <FaEye />} 
            />
          </div>
        </div>

        <div>
          <button 
            type="submit" disabled={formik.isSubmitting} 
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-black/90 cursor-pointer disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Creating account..." : "Create Account"}
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
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black transition-colors duration-200 underline hover:text-black/70">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;