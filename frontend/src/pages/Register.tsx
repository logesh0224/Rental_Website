import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
};

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Registration successful", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg" onSubmit={onSubmit} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <h2 className="text-3xl font-bold text-gray-800 mb-5 text-center">Create an Account</h2>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="firstName" className="text-gray-700 text-sm font-semibold mb-2">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            className={`border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            {...register("firstName", { required: "This field is required" })}
                        />
                        {errors.firstName && (
                            <span className="text-red-500 text-xs italic">{errors.firstName.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="lastName" className="text-gray-700 text-sm font-semibold mb-2">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            className={`border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            {...register("lastName", { required: "This field is required" })}
                        />
                        {errors.lastName && (
                            <span className="text-red-500 text-xs italic">{errors.lastName.message}</span>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={`border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        {...register("email", { required: "This field is required" })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs italic">{errors.email.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        className={`border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                        {...register("phoneNumber", {
                            required: "This field is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be 10 digits",
                            },
                        })}
                    />
                    {errors.phoneNumber && (
                        <span className="text-red-500 text-xs italic">{errors.phoneNumber.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-gray-700 text-sm font-semibold mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        className={`border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-xs italic">{errors.password.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className={`border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (!val) {
                                    return "This field is required";
                                } else if (watch("password") !== val) {
                                    return "Your passwords do not match";
                                }
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-xs italic">{errors.confirmPassword.message}</span>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring w-full transition-colors duration-300"
                >
                    Create Account
                </button>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Already have an account? <Link to="/sign-in" className="text-teal-700 font-semibold hover:underline">Sign in</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
