import MainCard from "./MainCard";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <div>
      <div>Universita Libera di Livorno</div>
      <MainCard title="Courses" />
      <MainCard title="Communication" />
      <MainCard title="Announcements" />
      <MainCard title="Grade Center" />
      <Dashboard />
    </div>
  );
}
export default App;
