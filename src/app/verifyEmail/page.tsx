import router from "next/router";

export default function verifyEmail() {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Please verify your email</h1>
          <p>
            We've sent a verification link to your email. After verifying, click the following button to complete onboarding.
          </p>
          <button
            onClick={() => router.push("/onboarding")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Proceed to Onboarding
          </button>
        </div>
      </div>
    );
  }
  