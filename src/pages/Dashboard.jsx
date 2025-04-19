import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabseClient";
import { toast } from "react-toastify";
import Button from "../components/Button";
const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);


  const handleLogout = (()=>{

    localStorage.removeItem("Session");
    navigate("/login")
  })


const checkSession = () => {
  const session = localStorage.getItem("Session");
  if (!session) {
    navigate("/login");
  }
};

useEffect(() => {
  checkSession();
}, []);



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-72 bg-white text-black p-2 space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-blue-400 m-5">Customer Portal</h2>
        <hr />
        <nav className="space-y-3">
          <button onClick={() => setActivePage("dashboard")} className="w-full  flex items-center gap-3 text-left text-xl font-bold hover:shadow-lg py-2 px-6 rounded transition-all  duration-200 "> <img src="https://cdn-icons-png.flaticon.com/128/1828/1828765.png" width={20} alt="" />  Dashboard</button>
          <button onClick={() => setActivePage("loanRequests")} className="w-full flex items-center gap-3 text-left text-xl font-bold hover:shadow-lg py-2 px-6 rounded transition-all duration-200"> <img src="https://cdn-icons-png.flaticon.com/128/3130/3130453.png" width={20} alt="" />Loan Requests</button>
          <button onClick={() => setActivePage("createLoan")} className="w-full flex items-center gap-3 text-left text-xl font-bold ml-3 hover:shadow-lg py-2 px-3 rounded transition-all duration-200"> <img src="https://cdn-icons-png.flaticon.com/128/983/983901.png" width={20} alt="" /> Create Loan Request</button>
          <button onClick={() => setActivePage("profile")} className="w-full flex items-center gap-3 text-left text-xl font-bold hover:shadow-lg py-2 px-6 rounded transition-all duration-200"> <img src="https://cdn-icons-png.flaticon.com/128/9308/9308008.png" width={20} alt="" />My Profile</button>
          <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 hover:shadow-lg py-2 px-6 rounded transition-all duration-200  font-bold text-xl mt-8"> <img src="https://cdn-icons-png.flaticon.com/128/9650/9650243.png" width={20} alt="" />Logout</button>
        </nav>
      </aside>

      <button
  className="md:hidden absolute top-4 left-4 z-50 bg-white px-3 py-2 rounded shadow"
  onClick={() => setShowSidebar(!showSidebar)}
>
  ☰
</button>

{showSidebar && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowSidebar(false)}>
    <aside className="absolute left-0 top-0 w-60 h-full bg-white p-6 z-50">
    <h2 className="text-2xl font-bold mb-6 text-blue-600 sm:mx-4" >Customer Portal</h2>
        <nav className="space-y-3">
          <button onClick={() => setActivePage("dashboard")} className="w-full text-left text-xl font-bold hover:text-yellow-400">Dashboard</button>
          <button onClick={() => setActivePage("loanRequests")} className="w-full text-left text-xl font-bold hover:text-yellow-400">Loan Requests</button>
          <button onClick={() => setActivePage("createLoan")} className="w-full text-left text-xl font-bold hover:text-yellow-400">Create Loan Request</button>
          <button onClick={() => setActivePage("profile")} className="w-full text-left text-xl font-bold hover:text-yellow-400">My Profile</button>
          <button onClick={handleLogout} className="w-full text-left hover:text-red-400  font-bold text-xl mt-8">Logout</button>
        </nav>
    </aside>
  </div>
)}
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activePage === "dashboard" && <DashboardOverview />}
        {activePage === "loanRequests" && <LoanRequestsTable />}
        {activePage === "createLoan" && <CreateLoanForm />}
        {activePage === "profile" && <UserProfile />}
      </main>
    </div>
  );
};

// ---------------------- Pages ------------------------

const DashboardOverview = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4 text-center text-white bg-blue-400 p-7 rounded">Dashboard Overview</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card title="Active Loan" value="12" />
      <Card title="Approved Loan" value="7" />
      <Card title="Pending Request" value="5" />
      
      
    </div>
  </div>
);



const LoanRequestsTable = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not logged in');
        }

        // Fetch loans for this user
        const { data, error } = await supabase
          .from('loan_request') // Your table name
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setLoans(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching loans:', err);
      } finally {
        setLoading(false);
      }
    };





    fetchLoans();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading your loan requests...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  if (loans.length === 0) {
    return <div className="text-center py-8">No loan requests found</div>;
  }

  // Format date for display
  const formatDate = (supabaseDate) => {
    const options = { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
     
    };
    return new Date(supabaseDate).toLocaleString('en-PK', options);
  };
  // Output: "16/04/2025, 17:32"

  return (
    <div className="p-4">
      <h1 className="text-4xl rounded font-bold mb-6 text-center bg-blue-400 p-7 text-white"> Loan Requests</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow text-center">
          <thead className="bg-blue-400 text-white text-xl">
            <tr >
              <th className="p-4">Request Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Loan Type</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan,index) => (
               
               
              <tr key={loan.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{formatDate(loan.created_at)}</td>
                <td className="p-3">${loan.amount}</td>
                <td className="p-3">{loan.loan_type}</td>
                <td className="p-3">{loan.duration} months</td>
               
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    loan.status === 'approved' ? 'bg-green-100 text-green-800' :
                    loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {"Approved"}
                  </span>
                </td>
              </tr>
             
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




  
  const CreateLoanForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      amount: "",
      loanType: "",
      duration: "",
      fullName: "",
      contact: "",
      employment: "",
    });
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        alert("User not logged in");
        setLoading(false);
        return;
      }
  
      const { id: user_id } = userData.user;
  
      const { error } = await supabase.from("loan_request").insert([
        {
          user_id,
          amount: formData.amount,
          loan_type: formData.loanType,
          duration: formData.duration,
          full_name: formData.fullName,
          contact: formData.contact,
          employment: formData.employment,
         
        },
      ]);
  
      setLoading(false);
  
      if (error) {
        console.error("Insert error:", error);
        toast.error("Submission failed: " + error.message);
      } else {
        toast.success("Loan request submitted!");
        window.location.href = "/dashboard"; // redirect after success
      }
    };
  
    return (
      <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create Loan Request</h2>
        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <input type="number" name="amount" placeholder="Loan Amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <select name="loanType" value={formData.loanType} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Select Loan Type</option>
                <option value="Personal">Personal</option>
                <option value="Home">Home</option>
                <option value="Education">Education</option>
              </select>
              <input type="text" name="duration" placeholder="Duration (e.g., 12 months)" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          )}
  
          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="text" name="employment" placeholder="Employment Status" value={formData.employment} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          )}
  
          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-2 text-gray-700">
              <p><strong>Amount:</strong> {formData.amount}</p>
              <p><strong>Type:</strong> {formData.loanType}</p>
              <p><strong>Duration:</strong> {formData.duration}</p>
              <p><strong>Name:</strong> {formData.fullName}</p>
              <p><strong>Contact:</strong> {formData.contact}</p>
              <p><strong>Employment:</strong> {formData.employment}</p>
            </div>
          )}
  
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Back
            </button>
             
            )}
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
               Next
              </button>
            ) : (
              <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  

;

const UserProfile = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">My Profile</h1>
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
      <p><strong>Name:</strong> User Name</p>
      <p><strong>Email:</strong> user@email.com</p>
      <p className="mt-4 text-sm text-gray-500">[Edit Profile functionality can be added]</p>
    </div>
  </div>
);

// Card Component
const Card = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <div className="">
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  </div>
);

export default Dashboard;
