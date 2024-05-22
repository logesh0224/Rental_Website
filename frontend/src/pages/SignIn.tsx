import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
    email: string;
    password: string;
};



const SignIn = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
const location =useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Login successful", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={onSubmit} style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <h2 className="text-3xl font-bold text-teal-700 mb-5 text-center">Sign In</h2>
            <div className="mb-4">
                <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    id="email"
                    type="email"
                    className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                    <span className="text-red-500 text-xs italic">{errors.email.message}</span>
                )}
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    id="password"
                    type="password"
                    className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            >
                Sign In
            </button>
            <div className="mt-4 text-center">
                <p>Don't have an account? <Link to="/register" className="text-teal-700 font-bold">Create one</Link>.</p>
            </div>
        </form>
    );
};

export default SignIn;
