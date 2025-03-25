"use client";
import useAuth from "@/app/features/auth/presentation/hooks/useAuth";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProfile } from "@/app/features/profile/presentation/hooks/useProfile.hook";

export default function Login() {
  const { signIn } = useAuth();
  const { profile, isLoading: isLoadingProfile } = useSelector(
    (state: any) => state.profile
  );
  const { user } = useSelector((state: any) => state.auth);

  if (user && !profile) return <CreateAccountForm />;

  return <button onClick={signIn}>Sign in with Google</button>;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
});

function CreateAccountForm() {
  const { createProfile } = useProfile();

  const handleSubmit = async (
    values: { username: string; name: string },
    { setSubmitting }: any
  ) => {
    try {
      console.log("Account created with:", values);
      await createProfile(values.username, values.name);
    } catch (error) {
      console.error("Error in submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", name: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Create Account
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Create Account"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
