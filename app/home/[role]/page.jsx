export default async function RoleHomePage({ params }) {
    const { role } = params; // Get the role from the URL
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Welcome to the {role.charAt(0).toUpperCase() + role.slice(1)} Home Page!</h1>
        <p className="text-lg">This is a dedicated page for {role} users.</p>
      </div>
    );
  }
  