
import ChartJual from '../components/ChartJual';
import ChartBeli from '../components/ChartBeli';

function Dashboard() {

  return (
    <div className="grid mt-5">
      <div className="col-12 md:col-4">
        <ChartJual />
      </div>
      <div className="col-12 md:col-4">
        <ChartBeli />
      </div>
    </div>
  );
}

export default Dashboard;