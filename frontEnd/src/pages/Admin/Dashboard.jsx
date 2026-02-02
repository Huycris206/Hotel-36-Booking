const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tổng quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
          <h3>Tổng User</h3> <p className="text-2xl font-bold">1,250</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
          <h3>Doanh thu</h3> <p className="text-2xl font-bold">50tr</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-orange-500">
          <h3>Booking</h3> <p className="text-2xl font-bold">18</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;