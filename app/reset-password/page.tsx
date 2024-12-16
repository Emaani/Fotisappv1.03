import ResetPasswordForm from '@/app/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
